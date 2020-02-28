import { TextInputProps } from 'react-native';

import { MarkdownSymbol } from './types';

export type MarkdownInputProps = Omit<
  TextInputProps,
  'onChangeText' | 'multiline'
> & {
  onChangeText: (text: string) => void;
  CustomToolbarItem?: React.ComponentType<ToolbarItemProps>;
};

export type ToolbarProps = {
  controls: Array<MarkdownSymbol>;
  nativeID: string;
  testID: string;
  isFocused?: boolean;
  CustomToolbarItem?: React.ComponentType<ToolbarItemProps>;
  handleItemPress: (controlName: MarkdownSymbol) => void;
};

export type ToolbarItemProps = {
  controlName: MarkdownSymbol;
  testID: string;
  handleItemPress: (controlName: MarkdownSymbol) => void;
};
