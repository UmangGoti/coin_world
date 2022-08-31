import { Dimensions, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Helper/ResponsiveSize';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isIOS = Platform.OS == 'ios';

// Logical Resolution of iphone-11 812*375
export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const _scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
  return Math.ceil(size * _scale);
}

export const sizes = {
  // global sizes
  base: isIOS ? 16 : wp('4.2'), //16
  font: isIOS ? 14 : wp('3.7'), //14
  border: 15,
  padding: isIOS ? 15 : wp('4'),
  radius: isIOS ? 10 : wp('2.8'),
  inputHeight: 43,

  // font sizes
  h1: isIOS ? 35 : wp('9'), //39
  h2: isIOS ? 29 : wp('7.2'), //29
  h3: isIOS ? 20 : wp('5.2'), //20
  title: isIOS ? 18 : wp('4.7'), //18
  header: isIOS ? 18 : wp('4.7'), //24
  medium: isIOS ? 22 : wp('5.7'), //24
  imgSize: isIOS ? 24 : wp('6.3'), //24
  body: isIOS ? 16 : wp('4.2'), //16
  body2: isIOS ? 14 : wp('3.7'), //14
  button: isIOS ? 16 : wp('4.2'), //14
  caption: isIOS ? 12 : wp('3.1'), //12
  small: isIOS ? 10 : wp('2.8'), //10
  imageIcon: isIOS ? 14 : wp('3.7'), //14,
  headerHeight: wp('13 %'), // 16
  searchView: 50,
  imageButtonSize: isIOS ? 20 : wp('5.2'), //20
  iconTitle: isIOS ? 50 : wp('18.9'), //78
  SCREEN_WIDTH: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT,
  SCREEN_HEIGHT: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH,
  CONTAINER_PADDING: normalize(20),
};

export const weight = {
  FONT_WEIGHT_NORMAL: 'normal',
  FONT_WEIGHT_REGULAR: '400',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_SEMIBOLD: '600',
  FONT_WEIGHT_BOLD: '700',
  FONT_WEIGHT_HEAVY: '800',
  FONT_WEIGHT_BLACK: '900',
  FONT_WEIGHT_NULL: null,
};

export const color = {
  WHITE: '#FFFFFF',
  MAIN_DARK: '#000000',
  placeholder: 'rgba(60, 66, 82, 0.6)',
  green: '#4BD166',
  brightRed: '#FF5252',
  dark: '#12121a',
  blueGreyDark30: '#C5C6CB',
  lightGrey: '#CDCFD4',
  blueGreyDarkLight: '#F3F4F5',
  blueGreyDark: '#3C4252',
};

export const Fonts = {
  SFPRO_ROUNDED_Bold: 'SF-Pro-Rounded-Bold',
  SFPRO_ROUNDED_Heavy: 'SF-Pro-Rounded-Heavy',
  SFPRO_ROUNDED_Medium: 'SF-Pro-Rounded-Medium',
  SFPRO_ROUNDED_Regular: 'SF-Pro-Rounded-Regular',
  SFPRO_ROUNDED_Semibold: 'SF-Pro-Rounded-Semibold',
  SFMONO_Medium: 'SFMono-Medium',
  SFMONO_Regular: 'SFMono-Regular',
};
