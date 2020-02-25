import React from 'react';
import { InputAccessoryView, ScrollView } from 'react-native';

import { ToolbarProps } from '../componentTypes';

import ToolbarItem from './ToolbarItem';
import { CONTROLS, inputAccessoryViewID } from './MarkdownInput';

const Toolbar = ({ handleItemPress }: ToolbarProps) => {
  return (
    <InputAccessoryView nativeID={inputAccessoryViewID}>
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
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
