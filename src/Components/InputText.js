import PropTypes from 'prop-types';
import React from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { ic_eye_close, ic_eye_open } from '../Assets';
import { isNullOrUndefined } from '../Helper/Utils';
import { color, Fonts, normalize, sizes } from '../Theme/theme';

const InputText = ({
  titleFontFamily = Fonts.SFPRO_ROUNDED_Semibold,
  titleFontSize = sizes.body2,
  titleColor = color.WHITE,
  title = '',
  borderWidth = 2,
  borderRadius = 12,
  height = normalize(60),
  width = '100%',
  borderColor = color.paleBlue,
  alignSelf = 'center',
  paddingLeft = normalize(20),
  paddingRight = normalize(20),
  fontFamily = Fonts.SFPRO_ROUNDED_Semibold,
  placeholder,
  placeholderTextColor = color.blueGreyDark,
  value,
  onChangeText,
  onFocus,
  onSubmitEditing,
  editable,
  autoCapitalize,
  autoCorrect = false,
  inputRef,
  inputAccessoryViewID,
  secureTextEntry,
  focusable,
  autoFocus,
  keyboardType,
  onBlur,
  returnKeyType,
  onEndEditing,
  multiline,
  numberOfLines,
  marginBottom = normalize(30),
  onContentSizeChange,
  titleMarginBottom = normalize(5),
  inputTextColor = color.WHITE,
  imgRight,
  onPressRightImage,
}) => {
  const [focus, setFocusState] = React.useState(false);
  return (
    <>
      {!isNullOrUndefined(title) && (
        <Text
          style={{
            fontFamily: titleFontFamily,
            fontSize: titleFontSize,
            color: titleColor,
            marginBottom: titleMarginBottom,
          }}>
          {title}
        </Text>
      )}
      <View
        style={{
          marginBottom: marginBottom,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
          height: height,
          width: width,
          borderColor: borderColor,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: paddingLeft,
          paddingRight: paddingRight,
        }}>
        <TextInput
          caretHidden={false}
          editable={editable}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          ref={inputRef}
          inputAccessoryViewID={inputAccessoryViewID}
          secureTextEntry={secureTextEntry}
          focusable={focusable}
          autoFocus={autoFocus}
          onFocus={() => {
            setFocusState(true);
            onFocus;
          }}
          keyboardType={keyboardType}
          value={value}
          onBlur={() => {
            setFocusState(false);
            onBlur;
          }}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          style={{
            flex: 1,
            height: height,
            // width: width,
            alignSelf: alignSelf,

            fontFamily: fontFamily,
            color: inputTextColor,
          }}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onContentSizeChange={onContentSizeChange}
        />
        {imgRight && (
          <PressableImage onPress={onPressRightImage} source={imgRight} />
        )}
      </View>
    </>
  );
};

const PressableImage = ({ onPress, source, tintColor = color.WHITE }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: normalize(18), height: normalize(18) }}>
      <Image
        source={source}
        style={{
          width: normalize(18),
          height: normalize(18),
          tintColor: tintColor,
        }}
      />
    </Pressable>
  );
};

InputText.propTypes = {
  titleFontFamily: PropTypes.string,
  titleFontSize: PropTypes.number,
  titleColor: PropTypes.string,
  title: PropTypes.string,
  focusable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  marginBottom: PropTypes.number,
  autoCapitalize: PropTypes.oneOf([
    'none',
    'sentences',
    'words',
    'characters',
    undefined,
  ]),
  keyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'number-pad',
    'decimal-pad',
  ]),
  returnKeyType: PropTypes.oneOf([
    'default',
    'go',
    'google',
    'join',
    'next',
    'route',
    'search',
    'send',
    'yahoo',
    'done',
    'emergency-call',
  ]),
  titleMarginBottom: PropTypes.number,
  inputTextColor: PropTypes.string,
};

InputText.defaultProps = {
  keyboardType: 'default',
  returnKeyType: 'default',
  focusable: false,
  autoFocus: false,
  autoCapitalize: undefined,
  editable: true,
};

export default InputText;
