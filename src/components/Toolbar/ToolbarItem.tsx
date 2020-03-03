import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

import { ToolbarItemProps } from '../componentTypes';

import bold from '../../assets/bold.png';
import heading from '../../assets/heading.png';
import italic from '../../assets/italic.png';
import link from '../../assets/link.png';
import unorderedList from '../../assets/unordered-list.png';
import orderedList from '../../assets/ordered-list.png';

const iconMapping = {
  bold,
  heading,
  italic,
  link,
  orderedList,
  unorderedList,
} as const;

const ToolbarItem = ({
  controlName,
  handleItemPress,
  accessibilityHint,
  accessibilityLabel,
}: ToolbarItemProps) => {
  return (
    <TouchableOpacity
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessible
      onPress={() => handleItemPress(controlName)}
      style={styles.container}
      testID={`${controlName}Touchable`}
    >
      <Image
        accessibilityIgnoresInvertColors
        accessibilityRole="image"
        source={iconMapping[controlName]}
        style={styles[controlName]}
      />
    </TouchableOpacity>
  );
};

const icon = {
  height: 24,
  width: 24,
};

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  bold: icon,
  container: {
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 10,
  },
  heading: {
    height: 20,
    width: 20,
  },
  italic: icon,
  link: icon,
  orderedList: icon,
  unorderedList: icon,
});
/* eslint-enable react-native/no-unused-styles */

export default ToolbarItem;
