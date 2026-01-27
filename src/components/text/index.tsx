import {RF} from '@helpers';
import MaskedView from '@react-native-masked-view/masked-view';
import {family, palette} from '@theme';
import React, {FC} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children?: React.ReactNode;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  s?: boolean;
  size?: TextStyle['fontSize'];
  fontSize?: TextStyle['fontSize'];
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  light?: boolean;
  italic?: boolean;
  weight?: TextStyle['fontWeight'];
  fontWeight?: TextStyle['fontWeight'];
  center?: boolean;
  color?: TextStyle['color'];
  opacity?: TextStyle['opacity'];
  font?: TextStyle['fontFamily'];
  fontFamily?: TextStyle['fontFamily'];
  align?: TextStyle['textAlign'];
  textAlign?: TextStyle['textAlign'];
  transform?: TextStyle['textTransform'];
  textTransform?: TextStyle['textTransform'];
  lineHeight?: TextStyle['lineHeight'];
  position?: TextStyle['position'];
  top?: TextStyle['top'];
  right?: TextStyle['right'];
  bottom?: TextStyle['bottom'];
  left?: TextStyle['left'];
  style?: any;
  onPress?: any;
  numberOfLines?: number;
  gradient?: boolean;
  colors?: string[];
  testID?: string;
}

export const Text: FC<Props> = ({
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  s,
  size,
  fontSize,
  italic,
  bold,
  semibold,
  light,
  weight,
  fontWeight,
  center,
  color = palette.madison,
  opacity,
  font,
  fontFamily = family.Regular,
  align,
  textAlign,
  transform,
  textTransform,
  lineHeight,
  position,
  top,
  right,
  bottom,
  left,
  style,
  medium,
  onPress,
  numberOfLines,
  gradient = false,
  testID,
  colors = ['#8591EF', '#66F4D7'],
  ...props
}) => {
  const textStyle = StyleSheet.flatten([
    h1 && {fontSize: RF(38), fontFamily: family.Bold},
    h2 && {fontSize: RF(32), fontFamily: family.Bold},
    h3 && {fontSize: RF(28), fontFamily: family.Bold},
    h4 && {fontSize: RF(24), fontFamily: family.Medium},
    h5 && {fontSize: RF(18), fontFamily: family.Medium},
    h6 && {fontSize: RF(14), fontFamily: family.SemiBold},
    p && {fontSize: RF(14), fontFamily: family.Regular},
    s && {fontSize: RF(12), fontFamily: family.Regular},
    center && {textAlign: 'center'},
    (align || textAlign) && {textAlign: textAlign || align},
    (weight || fontWeight) && {fontWeight: fontWeight || weight},
    (transform || textTransform) && {
      textTransform: textTransform || transform,
    },
    (font || fontFamily) && {fontFamily: fontFamily || font},
    bold && {fontFamily: family.Bold},
    semibold && {fontFamily: family.SemiBold},
    light && {fontFamily: family.Light},
    medium && {fontFamily: family.Medium},
    (size || fontSize) && {fontSize: RF(fontSize || size || 14)},
    color && {color},
    opacity && {opacity},
    lineHeight && {lineHeight},
    position && {position},
    right !== undefined && {right},
    left !== undefined && {left},
    top !== undefined && {top},
    bottom !== undefined && {bottom},
    style,
  ]);

  if (gradient) {
    return (
      <MaskedView
        maskElement={
          <RNText
            testID={testID}
            numberOfLines={numberOfLines}
            style={[textStyle]}
            onPress={onPress}
            allowFontScaling
            adjustsFontSizeToFit={false}
            maxFontSizeMultiplier={1.2}>
            {children}
          </RNText>
        }>
        <LinearGradient
          locations={[0, 0.8]}
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <RNText
            testID={testID}
            numberOfLines={numberOfLines}
            style={[textStyle, {opacity: 0}]}>
            {children}
          </RNText>
        </LinearGradient>
      </MaskedView>
    );
  }

  return (
    <RNText
      testID={testID}
      ellipsizeMode="tail"
      allowFontScaling
      adjustsFontSizeToFit={false}
      maxFontSizeMultiplier={1.2}
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={textStyle}
      {...props}>
      {children}
    </RNText>
  );
};
