import React from 'react';
import { StyleSheet, InputAccessoryView, ScrollView } from 'react-native';

import { ToolbarProps } from '../componentTypes';

import ToolbarItem from './ToolbarItem';
import { CONTROLS, inputAccessoryViewID } from './MarkdownInput';

const Toolbar = ({ handleItemPress }: ToolbarProps) => {
  return (
    <InputAccessoryView nativeID={inputAccessoryViewID}>
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {CONTROLS.map(item => (
          <ToolbarItem
            controlName={item}
            handleItemPress={handleItemPress}
            key={item}
            testID={`${item}Item`}
          />
        ))}
      </ScrollView>
    </InputAccessoryView>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
});
