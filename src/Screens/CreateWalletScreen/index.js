import React, { useRef, useState } from 'react';
import { Keyboard, Pressable, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MainHeader } from '../../Components';
import InputText from '../../Components/InputText';
import { navigateAndSimpleReset } from '../../Navigators/NavigationUtils';
import { color, Fonts, normalize, sizes } from '../../Theme/theme';

const CreateWallet = () => {
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const newPwdInput = useRef(null);
  const confirmPwdInput = useRef(null);

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
          placeholder={'Enter Confirm Password'}
          placeholderTextColor={color.blueGreyDark}
          autoCapitalize="none"
        />
      </KeyboardAwareScrollView>
      <Pressable
        onPress={() => {
          navigateAndSimpleReset('HomeScreen');
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

export default CreateWallet;
