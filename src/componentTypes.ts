import { TextInputProps } from 'react-native';

import { MarkdownSymbol } from './types';

export type MarkdownInputProps = Omit<
  TextInputProps,
  'onChangeText' | 'multiline'
> & {
  onChangeText: (text: string) => void;
};

export type ToolbarProps = {
  controls: Array<MarkdownSymbol>;
  nativeID: string;
  testID: string;
  isFocused?: boolean;
  handleItemPress: (controlName: MarkdownSymbol) => void;
};

export type ToolbarItemProps = {
  controlName: MarkdownSymbol;
  testID: string;
  handleItemPress: (controlName: MarkdownSymbol) => void;
};
