import React from 'react';
import { InputAccessoryView, ScrollView } from 'react-native';

import { ToolbarProps } from './componentTypes';
import ToolbarItem from './ToolbarItem';

const CONTROLS = [
  'bold',
  'italic',
  'heading',
  'link',
  'orderedList',
  'unorderedList',
];

const Toolbar = ({ nativeID }: ToolbarProps) => {
  return (
    <InputAccessoryView nativeID={nativeID}>
      <ScrollView
        horizontal
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
      >
        {CONTROLS.map(item => (
          <ToolbarItem controlName={item} key={item} testID={`${item}Item`} />
        ))}
      </ScrollView>
    </InputAccessoryView>
  );
};

export default Toolbar;
