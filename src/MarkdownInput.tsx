import React from 'react';
import { TextInput } from 'react-native';

import { MarkdownInputProps } from './componentTypes';

const MarkdownInput = ({ testID = 'markdownInput' }: MarkdownInputProps) => {
  return (
    <>
      <TextInput multiline testID={testID} />
    </>
  );
};

export default MarkdownInput;
