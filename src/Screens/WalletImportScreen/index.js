import React from 'react';
import { SafeAreaView } from 'react-native';
import { color } from '../../Theme/theme';
import { MainHeader } from '../../Components';

const WalletImportScreen = ({}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader title="Coin World" />
    </SafeAreaView>
  );
};

export default WalletImportScreen;
