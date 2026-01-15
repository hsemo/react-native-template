import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  NetInfoState,
  fetch as fetchNetInfo,
} from '@react-native-community/netinfo';

import { API_BASE_URL, API_REQUEST_TIMEOUT } from '@env';
import { HTTP_STATUS, ERROR_MESSAGES } from '@src/constants/apiConstants';
import { authStorage } from '@src/storage/authStorage';

export class OfflineError extends Error {
  constructor(message = 'You are offline') {
    super(message);
    this.name = 'OfflineError';
  }
}

let logoutHandler: (() => void) | null = null;

// subscribe to logout event:
// use to perform some action on logout from API client, for example - clear Auth context
export const registerLogoutHandler = (cb: () => void) => {
  logoutHandler = cb;
};

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor() {
    const token = authStorage.getAccessToken();
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_REQUEST_TIMEOUT,
      headers: defaultHeaders,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (
          error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
          !originalRequest._retry
        ) {
          if (this.isRefreshing) {
            // save all failed requests while token is refreshing
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.client(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = authStorage.getRefreshToken();

            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await this.refreshToken(refreshToken);

            const { access_token, refresh_token: newRefreshToken } = response
              .data.data || { access_token: null, refresh_token: null };

            if (access_token && newRefreshToken) {
              authStorage.setTokens(access_token, newRefreshToken);
            }

            // Retry failed requests
            this.failedQueue.forEach(({ resolve }) => {
              resolve();
            });
            this.failedQueue = [];

            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh token failed, clear auth and redirect to login
            logoutHandler?.();
            authStorage.clearAuth();
            this.failedQueue.forEach(({ reject }) => {
              reject(refreshError);
            });
            this.failedQueue = [];

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      },
    );
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const responseData = (error.response.data as any) || {};
      return {
        message: responseData?.message || ERROR_MESSAGES.SERVER_ERROR,
        status: error.response.status,
        code: responseData?.code,
      };
    } else if (error.request) {
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      };
    } else {
      return {
        message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
        status: 0,
      };
    }
  }

  setAuthToken(token?: string | null) {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common.Authorization;
    }
  }

  // Generic request method
  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const state: NetInfoState = await fetchNetInfo();

      if (!state.isConnected) {
        throw new OfflineError();
      }

      return await this.client.request<T>(config);
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  // GET request
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  // POST request
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  // PUT request
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  // PATCH request
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }

  // DELETE request
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  async logout() {
    logoutHandler?.();
    authStorage.clearAuth();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const { get, post, put, patch, delete: del, logout } = apiClient;
