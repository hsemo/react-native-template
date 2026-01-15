import React from 'react';

import { UIText } from '@src/components';
import CommonScreen from '@src/components/commenScreen';
import useStyles from '@src/customHooks/useStyles';

import stylesFunc from './styles';

const HomeScreen: React.FC = () => {
  const styles = useStyles(stylesFunc);

  return (
    <CommonScreen>
      <UIText style={styles.title}>Home Screen</UIText>
    </CommonScreen>
  );
};

export default HomeScreen;
