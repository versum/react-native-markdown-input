import { TextInputProps } from 'react-native';

import { MarkdownSymbol } from './types';

export type MarkdownInputProps = TextInputProps & {
  testID?: string;
  style?: FixMe;
  onChangeText: (text: string) => void;
};

export type ToolbarProps = {
  testID: string;
  isFocused?: boolean;
  handleItemPress: (controlName: MarkdownSymbol) => void;
};

export type ToolbarItemProps = {
  controlName: MarkdownSymbol;
  testID: string;
  handleItemPress: (controlName: MarkdownSymbol) => void;
};
