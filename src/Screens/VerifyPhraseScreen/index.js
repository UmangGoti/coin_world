import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { ic_left_arrow } from '../../Assets';
import { Button, MainHeader, TextInput } from '../../Components';
import {
  encrypt,
  generateAesKey,
  generatePasswordHash,
} from '../../Helper/CryptoFunction';
import { goBack, navigate } from '../../Navigators/NavigationUtils';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';

const VerifyPhraseScreen = ({ walletDetails, route }) => {
  const [phrase, setPhrase] = useState('');
  let array = walletDetails?.mnemonic?.phrase.split(' ');
  let phraseArray = shuffleArray(array);

  useEffect(() => {}, []);

  function validateMnemonic() {
    if (walletDetails?.mnemonic?.phrase == phrase) {
      /**
       * Generate Aes key
       */
      generateAesKey(route?.params?.newPwd, 'salt')
        .then(data => {
          console.log('Aes Key', data.key);

          /**
           * Encrypt Aes key
           */
          encrypt(walletDetails?.privateKey, data.key)
            .then(encryptData => {
              console.log('Encrypt Key', encryptData);
            })
            .catch(error => console.log(error));

          /**
           * Generate Password Hash
           */
          const hashData = generatePasswordHash(
            route?.params?.newPwd,
            data.key,
          );
          console.log('isPwdHashGenerated', hashData);
        })
        .catch(error => console.log(error));
      console.log('It is valid Mnemonic');
      navigate('LoginScreen');
    } else {
      console.log('Invalid valid Mnemonic');
    }
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader
        sourceLeft={ic_left_arrow}
        leftTintColor={color.paleBlue}
        onPressLeft={() => {
          goBack();
        }}
        title="Verify Secret Phrase"
      />
      <FlatList
        data={phraseArray}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{
          paddingHorizontal: sizes.CONTAINER_PADDING,
          paddingVertical: sizes.CONTAINER_PADDING,
        }}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              disabled={phrase.split(' ').length === 12}
              onPress={() => {
                setPhrase(prev => prev.trim() + ' ' + item);
              }}
              style={{
                flex: 1,
                width: normalize(100),
                padding: normalize(12),
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderRadius: normalize(12),
                borderColor: color.paleBlue,
                margin: normalize(10),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
                  color: color.WHITE,
                }}>
                {item}
              </Text>
            </Pressable>
          );
        }}
        ListHeaderComponent={
          <>
            <TextInput
              autoCapitalize={'none'}
              value={phrase.trim()}
              onChangeText={text => setPhrase(text)}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              numberOfLines={3}
              multiline={true}
            />
          </>
        }
        ListFooterComponent={
          <>
            <Text
              style={{
                fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
                color: color.brightRed,
              }}>
              {`Note - Enter phrases words with a single space between each of the words`}
            </Text>
          </>
        }
        ListFooterComponentStyle={{
          paddingHorizontal: sizes.CONTAINER_PADDING,
        }}
      />
      <Button
        btnTitle={'Next'}
        onPress={() => {
          validateMnemonic();
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  walletDetails: state.createWallet.walletDetails,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhraseScreen);
