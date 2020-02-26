import React, { useState, useRef } from 'react';
import {
  TextInput,
  Platform,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSelectionChangeEventData,
} from 'react-native';

import { MarkdownInputProps } from '../componentTypes';
import textFormatter from '../helpers/textFormatter';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import Toolbar from './Toolbar';
import { MarkdownSymbol } from '../types';

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
  const inputRef = useRef<TextInput>(null);
  const selection = useRef<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

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

  const handleItemPress = (controlName: MarkdownSymbol) => {
    const { formattedValue, newSelection } = textFormatter({
      controlName,
      inputValue: value,
      selection: selection.current,
    });

    onChangeText(formattedValue);

    setTimeout(() => {
      selection.current = newSelection;
      inputRef.current?.setNativeProps({
        selection: newSelection,
      });
    }, 10);
  };

  const handleSelectionChange = ({
    nativeEvent: {
      selection: { start, end },
    },
  }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    selection.current = { start, end };
  };

  return (
    <>
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
        onBlur={handleBlur}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onSelectionChange={handleSelectionChange}
        ref={inputRef}
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
    ...Platform.select({
      android: {
        textAlignVertical: 'top',
      },
    }),
  },
});

export default MarkdownInput;
