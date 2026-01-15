interface ApiError {
  message: string;
  status: number;
  code?: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  status_code: number;
}

// HTTP Methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API Endpoints
interface ApiEndpoints {
  auth: {
    login: string;
    refresh: string;
    logout: string;
  };
}

type ResponseHandler<T> = (response: T) => void;
