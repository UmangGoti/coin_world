import React, { useState } from 'react';
import { Keyboard, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect, useDispatch } from 'react-redux';
import { ic_eye_close, ic_eye_open } from '../../Assets';
import { Button, MainHeader } from '../../Components';
import InputText from '../../Components/InputText';
import { privateKey } from '../../Helper/Constants';
import { VerifyPassword } from '../../Helper/CryptoFunction';
import { checkEmpty, isNullOrUndefined } from '../../Helper/Utils';
import { navigateAndSimpleReset } from '../../Navigators/NavigationUtils';
import { SetSigner } from '../../Store/SetSigner/actions';
import { color, sizes } from '../../Theme/theme';

const LoginScreen = ({}) => {
  const [password, setPassword] = useState('');
  const [pwdSecure, setPwdSecure] = useState(true);
  const dispatch = useDispatch();

  //-- Action
  const loginToWallet = password => {
    if (isNullOrUndefined(password) || checkEmpty(password)) {
      console.log('Enter Valid Password');
    } else {
      VerifyPassword(password).then(res => {
        console.log('privatekey', res);
        if (res) {
          dispatch(
            SetSigner(true, res, {
              SuccessCallback: res => {
                navigateAndSimpleReset('HomeScreen');
              },
              FailureCallback: res => {},
            }),
          );
        } else {
          console.log('Wrong Password');
        }
      });
    }
  };
  //-- end

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader title="Login To The Wallet" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: sizes.CONTAINER_PADDING,
          paddingVertical: sizes.CONTAINER_PADDING,
          height: '100%',
        }}>
        <InputText
          value={password}
          onChangeText={txt => {
            setPassword(txt);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            loginToWallet(password);
          }}
          secureTextEntry={pwdSecure}
          returnKeyType={'done'}
          title="Password"
          placeholder={'Enter Password'}
          placeholderTextColor={color.blueGreyDark}
          autoCapitalize="none"
          imgRight={pwdSecure ? ic_eye_close : ic_eye_open}
          onPressRightImage={() => {
            setPwdSecure(!pwdSecure);
          }}
        />
      </KeyboardAwareScrollView>
      <Button
        onPress={() => {
          loginToWallet(password);
        }}
        btnTitle={'Login'}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
