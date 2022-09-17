import React from 'react';
import { Image, Pressable, StatusBar, Text, View } from 'react-native';
import { color, Fonts, normalize, sizes } from '../Theme/theme';
const MainHeader = ({
  StatusBarColor = color.MAIN_DARK,
  title = 'Coin World',
  titleFontSize = sizes.body,
  titleColor = color.paleBlue,
  headerBottomColor = color.dark,
  headerBorderBottomWidth = 2,
  onPressLeft,
  onPressRight,
  sourceLeft,
  sourceRight,
  leftBorderRadius = undefined,
  leftBorderColor = undefined,
  leftBorderWidth = undefined,
  leftTintColor = undefined,
  leftWidth = undefined,
  leftHeight = undefined,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: headerBottomColor,
        borderBottomWidth: headerBorderBottomWidth,
        paddingLeft: normalize(20),
        paddingRight: normalize(20),
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={StatusBarColor} />
      <Pressable onPress={onPressLeft}>
        {sourceLeft !== '' && sourceLeft !== null && (
          <Image
            source={sourceLeft}
            style={{
              width: leftWidth || normalize(20),
              height: leftHeight || normalize(20),
              tintColor: leftTintColor,
              borderRadius: leftBorderRadius,
              borderWidth: leftBorderWidth,
              borderColor: leftBorderColor,
            }}
          />
        )}
      </Pressable>
      <Text
        style={{
          fontSize: titleFontSize,
          fontFamily: Fonts.SFPRO_ROUNDED_Bold,
          color: titleColor,
        }}>
        {title}
      </Text>
      <Pressable onPress={onPressRight}>
        {sourceRight !== '' && sourceRight !== null && (
          <Image
            source={sourceRight}
            style={{
              width: normalize(20),
              height: normalize(20),
              tintColor: color.paleBlue,
            }}
          />
        )}
      </Pressable>
    </View>
  );
};

export default MainHeader;
