import React from 'react';
import { InputAccessoryView, ScrollView } from 'react-native';

import ToolbarItem from './ToolbarItem';
import { CONTROLS, inputAccessoryViewID } from './MarkdownInput';

const Toolbar = () => {
  return (
    <InputAccessoryView nativeID={inputAccessoryViewID}>
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
