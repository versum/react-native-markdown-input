import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { MarkdownInputProps } from './componentTypes';
//@ts-ignore
// eslint-disable-next-line import/no-unresolved
import Toolbar from './Toolbar';

const MarkdownInput = ({
  testID = 'markdownInput',
  inputAccessoryViewID,
  style,
}: MarkdownInputProps) => {
  return (
    <>
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
        onFocus={() => {}}
        style={[styles.inputStyle, style]}
        testID={testID}
      />
      <Toolbar nativeID={inputAccessoryViewID} testID="toolbar" />
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
