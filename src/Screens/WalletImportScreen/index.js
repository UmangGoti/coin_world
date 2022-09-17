import React, { useRef, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ic_eye_close, ic_eye_open, ic_left_arrow } from '../../Assets';
import { Button, MainHeader } from '../../Components';
import InputText from '../../Components/InputText';
import { checkEmpty, isNullOrUndefined } from '../../Helper/Utils';
import {
  goBack,
  navigateAndSimpleReset,
} from '../../Navigators/NavigationUtils';
import { ImportWallet } from '../../Store/ImportWallet/actions';
import { SetSigner } from '../../Store/SetSigner/actions';
import { color, sizes } from '../../Theme/theme';

const WalletImportScreen = ({ SetSigner, ImportWallet }) => {
  const [password, setPassword] = useState('');
  const [phrase, setPhrase] = useState('');
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const pwdInput = useRef(null);
  const phraseInput = useRef(null);

  const dispatch = useDispatch();

  const [height, setInputHeight] = useState();
  const updateSize = height => {
    setInputHeight(height);
  };

  // useEffect(() => {
  //   isLoading ? importWallet() : setLoading(false);
  // }, [isLoading]);

  //-- Action
  const importWallet = () => {
    let phraseArray = phrase.split(' ');
    if (isNullOrUndefined(phrase) || checkEmpty(phrase)) {
      console.log('Enter valid Phrase');
    } else if (phraseArray.length !== 12) {
      console.log('Max 12 keywords Allowed');
    } else if (isNullOrUndefined(password) || checkEmpty(password)) {
      console.log('Enter Valid Password');
    } else {
      ImportWallet(true, phrase, password, {
        SuccessCallback: response => {
          response !== false
            ? SetSigner(true, response, {
                SuccessCallback: res => {
                  navigateAndSimpleReset('HomeScreen');
                },
                FailureCallback: res => {},
              })
            : console.log('Invalid Password');
        },
        FailureCallback: response => {},
      });
    }
  };
  //-- end

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.MAIN_DARK }}>
      <MainHeader
        sourceLeft={ic_left_arrow}
        leftTintColor={color.paleBlue}
        onPressLeft={() => {
          goBack();
        }}
        title="Import An Wallet"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <InputText
              placeholder="Enter your Secret Recovery Phrase"
              autoCapitalize={'none'}
              value={phrase}
              returnKeyType={'next'}
              onChangeText={text => {
                setPhrase(text);
              }}
              inputRef={phraseInput}
              multiline={true}
              onSubmitEditing={() => pwdInput.current.focus()}
              onContentSizeChange={e =>
                updateSize(e.nativeEvent.contentSize.height)
              }
              height={height}
              title={'Enter Phrase'}
            />
            <InputText
              placeholder="Password"
              autoCapitalize={'none'}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              returnKeyType={'done'}
              inputRef={pwdInput}
              imgRight={isSecureTextEntry ? ic_eye_close : ic_eye_open}
              onPressRightImage={() => {
                setSecureTextEntry(!isSecureTextEntry);
              }}
              secureTextEntry={isSecureTextEntry}
            />
          </>
        }
        ListHeaderComponentStyle={{
          paddingHorizontal: sizes.CONTAINER_PADDING,
          paddingVertical: sizes.CONTAINER_PADDING,
        }}
        data={[]}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => {
          return <></>;
        }}
      />
      <Button
        btnTitle={'Import an Wallet'}
        onPress={() => {
          importWallet();
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  ImportWallet,
  SetSigner,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletImportScreen);
