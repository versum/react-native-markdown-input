import React from 'react';
import { render } from 'react-native-testing-library';

import MarkdownInput from '../MarkdownInput';

describe('MarkdownInput', () => {
  test('should render multiline input', () => {
    const { getByTestId } = render(<MarkdownInput />);

    expect(getByTestId('markdownInput')).not.toBeNull();
    expect(getByTestId('markdownInput').props.multiline).toBe(true);
  });

  test.todo('should render toolbar when keyboard is visible');
});
