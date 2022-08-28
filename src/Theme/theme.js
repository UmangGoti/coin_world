import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Logical Resolution of iphone-11 812*375
export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const _scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
  return Math.ceil(size * _scale);
}

export const sizes = {
  SCREEN_WIDTH: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT,
  SCREEN_HEIGHT: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH,
  CONTAINER_PADDING: normalize(16),
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
  MAIN_DARK: '#0C0C0C',
};

export const Fonts = {};
