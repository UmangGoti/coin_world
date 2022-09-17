import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, MainHeader } from '../../Components';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';
import { navigate } from '../../Navigators/NavigationUtils';

const ViewSecretPhraseScreen = ({ walletDetails, route }) => {
  let phraseArray = walletDetails?.mnemonic?.phrase.split(' ');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader title="Secret Phrase" />
      <FlatList
        data={phraseArray}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{}}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View
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
                {`${index + 1}.  ` + item}
              </Text>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return (
            <Text
              style={{
                fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
                color: color.brightRed,
              }}>
              {`* WARNING: Never disclose your Secret Recovery Phrase. Anyone with this phrase can take your Ether forever.`}
            </Text>
          );
        }}
        ListFooterComponentStyle={{
          paddingHorizontal: sizes.CONTAINER_PADDING,
        }}
      />

      <Button
        btnTitle={'Next'}
        onPress={() => {
          navigate('VerifyPhraseScreen', { newPwd: route?.params?.newPwd });
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  walletDetails: state.createWallet.walletDetails,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewSecretPhraseScreen);
