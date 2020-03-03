import { TextInputProps } from 'react-native';

import { MarkdownSymbol } from '../types';

export interface MarkdownInputProps
  extends Omit<TextInputProps, 'onChangeText' | 'multiline'> {
  /**
   * A description of the prop that you seem fit :)
   */
  onChangeText: (text: string) => void;
  CustomToolbarItem?: React.ComponentType<ToolbarItemProps>;
}

export interface ToolbarProps {
  controls: Array<MarkdownSymbol>;
  nativeID: string;
  testID: string;
  isFocused?: boolean;
  CustomToolbarItem?: React.ComponentType<ToolbarItemProps>;
  handleItemPress: (controlName: MarkdownSymbol) => void;
}

export interface ToolbarItemProps {
  controlName: MarkdownSymbol;
  testID: string;
  handleItemPress: (controlName: MarkdownSymbol) => void;
}
