import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import { MarkdownInputProps } from '../componentTypes';
import textFormatter from '../helpers/textFormatter';
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
  onFocus,
  onBlur,
  onChangeText,
  value,
  ...restProps
}: MarkdownInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setIsFocused(true);
    typeof onFocus === 'function' && onFocus(event);
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    typeof onBlur === 'function' && onBlur(event);
  };

  const handleItemPress = (controlName: string) => {
    const formattedValue = textFormatter(controlName, value);

    // TODO:
    if (formattedValue) {
      onChangeText(formattedValue);
    }
  };

  return (
    <>
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
        onBlur={handleBlur}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        style={[styles.inputStyle, style]}
        testID={`${testID}Component`}
        value={value}
        {...restProps}
      />
      <Toolbar
        handleItemPress={handleItemPress}
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
