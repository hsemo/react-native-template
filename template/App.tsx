import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast, { ToastConfig } from 'react-native-toast-message';

import Routes from '@navigation/Routes';
import ErrorBoundary from '@components/ErrorBoundary';
import CustomToast from '@src/components/CustomToast';
import { NetworkProvider } from '@src/navigation/context/networkProvider';
import store from '@src/store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <GestureHandlerRootView>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <BottomSheetModalProvider>
                <NetworkProvider>
                  <Routes />
                </NetworkProvider>
              </BottomSheetModalProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
      </Provider>
    </>
  );
}

const toastConfig: ToastConfig = {
  success: props => <CustomToast {...props} />,
  info: props => <CustomToast {...props} />,
  error: props => <CustomToast {...props} />,
};

export default App;
