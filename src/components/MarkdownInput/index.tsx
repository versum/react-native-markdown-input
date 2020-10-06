import React, { useMemo, useState, useRef, useCallback } from 'react';
import {
  TextInput,
  Platform,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSelectionChangeEventData,
} from 'react-native';

import textFormatter from '../../helpers/textFormatter';
import {
  defaultInputAccessibilityTraits,
  defaultToolbarAccessibilityTraits,
} from '../../helpers/defaultAccessibilityTraits';
import { MarkdownSymbols } from '../../helpers/markdownSymbols';
import { MarkdownInputProps } from '../componentTypes';
import { MarkdownSymbol } from '../../types';

import Toolbar from '../Toolbar';

const MarkdownInput = ({
  inputAccessoryViewID = 'inputAccessoryViewID',
  onBlur,
  onChangeText,
  onFocus,
  style,
  testID = 'markdownInput',
  value,
  CustomToolbarItem,
  toolbarStyle,
  toolbarContainerStyle,
  toolbarItemAccessibilityTraits = defaultToolbarAccessibilityTraits,
  ...restProps
}: MarkdownInputProps) => {
  const inputRef = useRef<TextInput>(null);
  const selection = useRef<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleItemPress = useCallback(
    (controlName: MarkdownSymbol) => {
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
    },
    [onChangeText, value],
  );

  const handleSelectionChange = useCallback(
    ({
      nativeEvent: {
        selection: { start, end },
      },
    }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      selection.current = { start, end };
    },
    [],
  );

  const restInputProps = useMemo(
    () => ({
      ...(Platform.OS === 'ios' && { value }),
      ...defaultInputAccessibilityTraits,
      ...restProps,
    }),
    [restProps, value],
  );

  const controls = useMemo(
    () => Object.keys(MarkdownSymbols) as Array<MarkdownSymbol>,
    [],
  );

  return (
    <>
      <TextInput
        {...restInputProps}
        accessible
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
        toolbarContainerStyle={toolbarContainerStyle}
        toolbarItemAccessibilityTraits={toolbarItemAccessibilityTraits}
        toolbarStyle={toolbarStyle}
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
