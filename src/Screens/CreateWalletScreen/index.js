import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { MainHeader } from '../../Components';
import InputText from '../../Components/InputText';
import { isNullOrUndefined } from '../../Helper/Utils';
import {
  navigateAndSimpleReset,
  navigateAndSimpleResetWithParam,
} from '../../Navigators/NavigationUtils';
import { CreateWallet } from '../../Store/CreateWallet/actions';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';

const CreateWalletScreen = ({ CreateWallet }) => {
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const newPwdInput = useRef(null);
  const confirmPwdInput = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loading
      ? CreateWallet(loading, {
          SuccessCallback: res => {
            setLoading(false);
            navigateAndSimpleResetWithParam('ViewSecretPhraseScreen', 0, {
              newPwd: newPwd,
            });
          },
          FailureCallback: res => {
            console.log('Something went wrong');
            setLoading(false);
          },
        })
      : setLoading(false);
  }, [loading]);

  //-- Action
  const generateWalletMnemonic = () => {
    if (isNullOrUndefined(newPwd)) {
      console.log('Enter Valid Password');
    } else if (newPwd !== confirmPwd) {
      console.log("Confirm password & New Password isn't Match");
    } else {
      setLoading(true);
    }
  };
  //-- end

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader title="Create New Wallet" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: sizes.CONTAINER_PADDING,
          paddingVertical: sizes.CONTAINER_PADDING,
          height: '100%',
        }}>
        <InputText
          inputRef={newPwdInput}
          value={newPwd}
          onChangeText={txt => {
            setNewPwd(txt);
          }}
          onSubmitEditing={() => {
            confirmPwdInput.current.focus();
          }}
          secureTextEntry={true}
          returnKeyType={'next'}
          title="New Password"
          placeholder={'Enter New Password'}
          placeholderTextColor={color.blueGreyDark}
          autoCapitalize="none"
        />
        <InputText
          inputRef={confirmPwdInput}
          value={confirmPwd}
          onChangeText={txt => {
            setConfirmPwd(txt);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          returnKeyType={'done'}
          title="Confirm Password"
          secureTextEntry={true}
          placeholder={'Enter Confirm Password'}
          placeholderTextColor={color.blueGreyDark}
          autoCapitalize="none"
        />
      </KeyboardAwareScrollView>
      <Pressable
        onPress={() => {
          generateWalletMnemonic();
        }}
        style={{
          borderRadius: normalize(24),
          borderWidth: 2,
          borderColor: color.paleBlue,
          justifyContent: 'center',
          alignItems: 'center',
          height: normalize(65),
          bottom: normalize(30),
          marginHorizontal: sizes.CONTAINER_PADDING,
        }}>
        <Text
          style={{
            fontFamily: Fonts.SFPRO_ROUNDED_Semibold,
            fontSize: sizes.body,
            color: color.WHITE,
          }}>
          Create Wallet
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  CreateWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletScreen);
