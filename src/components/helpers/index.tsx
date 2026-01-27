// responsive.ts
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone X as reference)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale factor for width and height
const SCALE = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;

// Font configuration for responsive scaling
const fontConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};

/**
 * Determines if the device is a phone or tablet
 */
export const getDeviceType = (): 'phone' | 'tablet' => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return 'tablet';
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return 'tablet';
  } else {
    return 'phone';
  }
};

/**
 * Categorizes screen size as small, medium, or large
 */
const getScreenSizeCategory = (): 'small' | 'medium' | 'large' => {
  if (SCALE < 350) return 'small';
  if (SCALE > 500) return 'large';
  return 'medium';
};

/**
 * Responsive Width
 */
export const RW = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Responsive Height
 */
export const RH = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Responsive Font
 */
export const RF = (size: number, factor: number = 0.5): number => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[deviceType][screenCategory];
  const fontScale = PixelRatio.getFontScale();

  // base scaling
  const widthScale = SCALE / BASE_WIDTH;
  const moderateScale = size + (widthScale * size - size) * factor;
  const scaleFactor = Math.min(Math.max(widthScale, config.min), config.max);
  let newSize = Math.min(moderateScale, size * scaleFactor);

  // tablet adjustment
  if (deviceType === 'tablet') newSize *= 1.1;

  // normalize
  return Math.round(PixelRatio.roundToNearestPixel(newSize / fontScale));
};

/**
 * Responsive Spacing (for margins/paddings)
 */
export const RS = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
