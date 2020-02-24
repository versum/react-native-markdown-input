import React from 'react';
import { ScrollView } from 'react-native';
import ToolbarItem from './ToolbarItem';

const CONTROLS = [
  'bold',
  'italic',
  'heading',
  'link',
  'orderedList',
  'unorderedList',
];

const Toolbar = () => {
  return (
    <ScrollView horizontal keyboardShouldPersistTaps="always">
      {CONTROLS.map(item => (
        <ToolbarItem controlName={item} key={item} testID={`${item}Item`} />
      ))}
    </ScrollView>
  );
};

export default Toolbar;
