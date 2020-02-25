import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { ToolbarItemProps } from '../componentTypes';

const ToolbarItem = ({ controlName, handleItemPress }: ToolbarItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => handleItemPress(controlName)}
      style={styles.container}
      testID={`${controlName}Touchable`}
    >
      <Text>{controlName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 10,
  },
});

export default ToolbarItem;
