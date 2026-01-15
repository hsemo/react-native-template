import React from 'react';
import { View, Text, Image } from 'react-native';

import useStyles from '@src/customHooks/useStyles';

import { UIButton } from '..';
import stylesFunc from './styles';

interface NoInternetScreenProps {
  onRetry: () => void;
}
const noWifiImg = require('@assets/images/wifi_off.png');

const NoInternetScreen: React.FC<NoInternetScreenProps> = ({ onRetry }) => {
  const styles = useStyles(stylesFunc);

  return (
    <View style={styles.container}>
      <Image source={noWifiImg} style={styles.image} />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.message}>
        Please check your internet connection and try again
      </Text>
      <UIButton
        title="Retry Connection"
        onPress={onRetry}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default NoInternetScreen;
