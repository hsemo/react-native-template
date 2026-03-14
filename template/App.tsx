import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'; // @if withRedux
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // @if withReactQuery
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast, { ToastConfig } from 'react-native-toast-message';

import Routes from '@navigation/Routes'; // @if withNavigation
import ErrorBoundary from '@components/ErrorBoundary';
import CustomToast from '@src/components/CustomToast';
import { NetworkProvider } from '@src/navigation/context/networkProvider';
import store from '@src/store'; // @if withRedux
import HomeScreen from '@src/screens/home/Home'; // @if !withNavigation

const queryClient = new QueryClient(); // @if withReactQuery

function App(): React.JSX.Element {
  return (
    <>
    /* @if withRedux */
      <Provider store={store}>
    /* @endif */
        <StatusBar barStyle="dark-content" />
        <GestureHandlerRootView>
          <ErrorBoundary>
          /* @if withReactQuery */
            <QueryClientProvider client={queryClient}>
          /* @endif */
              <BottomSheetModalProvider>
                <NetworkProvider>
                /* @if withNavigation */
                  <Routes />
                /* @else */
                  {/* Fallback UI if navigation is not selected */}
                  <HomeScreen />
                /* @endif */
                </NetworkProvider>
              </BottomSheetModalProvider>
          /* @if withReactQuery */
            </QueryClientProvider>
          /* @endif */
          </ErrorBoundary>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
    /* @if withRedux */
      </Provider>
    /* @endif */
    </>
  );
}

const toastConfig: ToastConfig = {
  success: props => <CustomToast {...props} />,
  info: props => <CustomToast {...props} />,
  error: props => <CustomToast {...props} />,
};

export default App;
