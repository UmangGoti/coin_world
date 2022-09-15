import PropTypes from 'prop-types';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
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
  paddingLeft = normalize(10),
  paddingRight = normalize(10),
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
}) => {
  const [focus, setFocusState] = React.useState(false);
  return (
    <View style={{ marginBottom: marginBottom }}>
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
          borderWidth: borderWidth,
          borderRadius: borderRadius,
          height: height,
          width: width,
          borderColor: borderColor,
          alignSelf: alignSelf,
          paddingLeft: paddingLeft,
          paddingRight: paddingRight,
          fontFamily: fontFamily,
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onContentSizeChange={onContentSizeChange}
      />
    </View>
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
