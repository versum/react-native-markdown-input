import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { ToolbarItemProps } from './componentTypes';

const ToolbarItem = ({ controlName }: ToolbarItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
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
