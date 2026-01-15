import React, { createContext, useContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import NoInternetScreen from '@src/components/NoInternet';

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  checkConnection: async () => {},
});

export const useNetwork = () => useContext(NetworkContext);

interface NetworkProviderProps {
  children: React.ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const checkConnection = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(!!state.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    checkConnection();

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return <NoInternetScreen onRetry={checkConnection} />;
  }

  return (
    <NetworkContext.Provider value={{ isConnected, checkConnection }}>
      {children}
    </NetworkContext.Provider>
  );
};
