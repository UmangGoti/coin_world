import React from 'react';
import { SafeAreaView } from 'react-native';

const ViewSecretPhraseScreen = ({}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader title="Secret Phrase" />
    </SafeAreaView>
  );
};

export default ViewSecretPhraseScreen;
