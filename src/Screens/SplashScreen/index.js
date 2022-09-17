import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text, TSpan } from 'react-native-svg';
import { EncryptedData, PasswordHash } from '../../Helper/Storage';
import { isNullOrUndefined } from '../../Helper/Utils';
import { navigateAndSimpleReset } from '../../Navigators/NavigationUtils';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';

async function setupLocalStorage() {
  let encryptData = await AsyncStorage.getItem(EncryptedData);
  let pwdHash = await AsyncStorage.getItem(PasswordHash);
  console.log('PasswordHash', pwdHash, encryptData);
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
    }, 3000);
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
        <Svg viewBox="0 0 300 300" height="300" width="300">
          <Defs>
            <LinearGradient
              id="rainbow"
              x1="0"
              y1="0"
              x2="70%"
              y2="70%"
              gradientUnits="objectBoundingBox">
              <Stop stopColor={'#22FF22'} offset="0%" />
              <Stop stopColor={'#FFD33D'} offset="100%" />
            </LinearGradient>
          </Defs>
          <Text
            fill="url(#rainbow)"
            fontFamily={Fonts.SFPRO_ROUNDED_Bold}
            fontSize={normalize(40)}>
            <TSpan fonSize="80" x="20%" y="50%">
              Coin World
            </TSpan>
          </Text>
        </Svg>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
