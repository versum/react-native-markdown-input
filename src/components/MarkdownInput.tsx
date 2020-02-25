import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { MarkdownInputProps } from '../componentTypes';
//@ts-ignore
// eslint-disable-next-line import/no-unresolved
import Toolbar from './Toolbar';

export const CONTROLS = [
  'bold',
  'italic',
  'heading',
  'link',
  'orderedList',
  'unorderedList',
] as const;

export const inputAccessoryViewID = 'markdownInputAccessoryId';

const MarkdownInput = ({
  testID = 'markdownInput',
  style,
}: MarkdownInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        style={[styles.inputStyle, style]}
        testID={`${testID}Component`}
      />
      <Toolbar
        isFocused={isFocused}
        nativeID={inputAccessoryViewID}
        testID="toolbar"
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: '#000',
    borderWidth: 1,
    minHeight: 100,
    width: 300,
  },
});

export default MarkdownInput;
