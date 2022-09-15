import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { MainHeader } from '../../Components';
import { EncryptedData, PasswordHash } from '../../Helper/Storage';
import { isNullOrUndefined } from '../../Helper/Utils';
import { navigateAndSimpleReset } from '../../Navigators/NavigationUtils';
import { color, Fonts, sizes } from '../../Theme/theme';

async function setupLocalStorage() {
  let encryptData = await AsyncStorage.getItem(EncryptedData);
  let pwdHash = await AsyncStorage.getItem(PasswordHash);
  console.log('PasswordHash', pwdHash);
  if (!isNullOrUndefined(encryptData) && !isNullOrUndefined(pwdHash)) {
    navigateAndSimpleReset('LoginScreen');
  } else {
    navigateAndSimpleReset('CreateWalletScreen');
  }
}

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      setupLocalStorage();
    }, 1200);
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.MAIN_DARK,
        }}>
        <Text
          style={{
            fontFamily: Fonts.SFPRO_ROUNDED_Bold,
            fontSize: sizes.h1,
            color: color.WHITE,
          }}>
          Coin World
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
