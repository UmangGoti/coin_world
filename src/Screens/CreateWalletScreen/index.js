import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { ic_eye_close, ic_eye_open } from '../../Assets';
import { Button, MainHeader } from '../../Components';
import InputText from '../../Components/InputText';
import { isNullOrUndefined } from '../../Helper/Utils';
import {
  navigate,
  navigateAndSimpleReset,
  navigateAndSimpleResetWithParam,
} from '../../Navigators/NavigationUtils';
import { CreateWallet } from '../../Store/CreateWallet/actions';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';

const CreateWalletScreen = ({ CreateWallet }) => {
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [newPwdSecure, setNewPwdSecure] = useState(true);
  const [confirmPwdSecure, setConfirmPwdSecure] = useState(true);
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
          height: sizes.SCREEN_HEIGHT,
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
          secureTextEntry={newPwdSecure}
          returnKeyType={'next'}
          title="New Password"
          placeholder={'Enter New Password'}
          placeholderTextColor={color.blueGreyDark}
          autoCapitalize="none"
          imgRight={newPwdSecure ? ic_eye_close : ic_eye_open}
          onPressRightImage={() => {
            setNewPwdSecure(!newPwdSecure);
          }}
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
          secureTextEntry={confirmPwdSecure}
          placeholder={'Enter Confirm Password'}
          placeholderTextColor={color.blueGreyDark}
          autoCapitalize="none"
          imgRight={confirmPwdSecure ? ic_eye_close : ic_eye_open}
          onPressRightImage={() => {
            setConfirmPwdSecure(!confirmPwdSecure);
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'visible',
          }}>
          <Button
            onPress={() => {
              generateWalletMnemonic();
            }}
            btnTitle={'Create Wallet'}
          />
          <View height={normalize(30)} />
          <Button
            btnTitle={'Import Wallet'}
            onPress={() => {
              navigate('WalletImportScreen');
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  CreateWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletScreen);
