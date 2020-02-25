import { TextInputProps } from 'react-native';

export type MarkdownInputProps = TextInputProps & {
  testID?: string;
  style?: FixMe;
};

export type ToolbarProps = {
  testID: string;
  isFocused?: boolean;
};

export type ToolbarItemProps = {
  controlName: string;
  testID: string;
};
