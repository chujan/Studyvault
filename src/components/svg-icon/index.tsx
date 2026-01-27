import { toUpperCaseFirstLetter } from '../../utils';
import { camelCase } from 'lodash';
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as config from '../../assets/svgs';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type Props = {
  onPress?: () => void;
  name: string;
  size?: number;
  height?: number;
  width?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  fill?: string;   // For filled icons
  color?: string;  // For stroke / currentColor
  [x: string]: any;
  testID?: string;
};

export const SvgIcon: FunctionComponent<Props> = ({
  onPress,
  name,
  size = 24,
  containerStyle,
  height,
  width,
  testID,
  fill,   // explicitly for filled icons
  color,  // stroke / currentColor
  ...otherProps
}) => {
  const pascalCaseName = name?.length
    ? toUpperCaseFirstLetter(camelCase(name))
    : 'Warning';

  // @ts-ignore
  const IconComponent = config[pascalCaseName] || config.Warning;

  const iconProps = {
    width: width || size,
    height: height || size,
    color: color,         // for currentColor in SVG paths
    stroke: color,        // outline icons
    ...(fill ? { fill } : {}), // only fill if explicitly passed
    ...otherProps,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        testID={testID}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={onPress}
        style={[styles.container, containerStyle]}
      >
        {React.createElement(IconComponent, iconProps)}
      </TouchableOpacity>
    );
  }

  return (
    <View testID={testID} style={[styles.container, containerStyle]}>
      {React.createElement(IconComponent, iconProps)}
    </View>
  );
};
