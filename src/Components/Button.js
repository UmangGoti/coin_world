import React from 'react';
import { Pressable, Text } from 'react-native';
import { color, Fonts, normalize, sizes } from '../Theme/theme';

const Button = ({
  btnTitle,
  borderRadius = normalize(24),
  borderWidth = 2,
  borderColor = color.paleBlue,
  height = normalize(65),
  bottom = normalize(30),
  fontFamily = Fonts.SFPRO_ROUNDED_Semibold,
  fontSize = sizes.body,
  fontColor = color.WHITE,
  onPress,
  disabled = false,
  backgroundColor = undefined,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        borderColor: borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        bottom: bottom,
        marginHorizontal: sizes.CONTAINER_PADDING,
        backgroundColor: backgroundColor,
      }}>
      <Text
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
          color: fontColor,
        }}>
        {btnTitle}
      </Text>
    </Pressable>
  );
};

export default Button;
