import React, { useMemo, useState, useRef } from 'react';
import {
  TextInput,
  Platform,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSelectionChangeEventData,
} from 'react-native';

import textFormatter from './helpers/textFormatter';
import { MarkdownInputProps } from './componentTypes';
import { MarkdownSymbol } from './types';
import { MarkdownSymbols } from './markdownSymbols';

import Toolbar from './components/Toolbar';

const MarkdownInput = ({
  inputAccessoryViewID = 'inputAccessoryViewID',
  onBlur,
  onChangeText,
  onFocus,
  style,
  testID = 'markdownInput',
  value,
  CustomToolbarItem,
  ...restProps
}: MarkdownInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const controls = useMemo(
    () => Object.keys(MarkdownSymbols) as Array<MarkdownSymbol>,
    []
  );
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
        text: formattedValue,
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
  const restInputProps = {
    ...(Platform.OS === 'ios' && { value }),
    ...restProps,
  };

  return (
    <>
      <TextInput
        {...restInputProps}
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
        onBlur={handleBlur}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onSelectionChange={handleSelectionChange}
        ref={inputRef}
        style={style || styles.inputStyle}
        testID={`${testID}Component`}
      />

      <Toolbar
        controls={controls}
        CustomToolbarItem={CustomToolbarItem}
        handleItemPress={handleItemPress}
        isFocused={isFocused}
        nativeID={inputAccessoryViewID}
        testID="toolbar"
      />
    </>
  );
};

export default MarkdownInput;

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: '#000',
    borderWidth: 1,
    minHeight: 100,
    width: 300,
    ...Platform.select({
      android: {
        paddingTop: 5,
        textAlignVertical: 'top',
      },
    }),
  },
});
