import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';

import MarkdownInput from '../components/MarkdownInput';

describe('MarkdownInput', () => {
  test('should render multiline input', () => {
    const { getByTestId } = render(
      <MarkdownInput inputAccessoryViewID="testInput" />
    );

    expect(getByTestId('markdownInput')).not.toBeNull();
    expect(getByTestId('markdownInput').props.multiline).toBe(true);
  });

  test('should render toolbar when keyboard is visible', async () => {
    const { getByTestId, queryByTestId } = render(
      <MarkdownInput inputAccessoryViewID="testInput" />
    );

    await act(async () => {
      fireEvent(getByTestId('markdownInput'), 'focus');
      await waitForElement(() => getByTestId('toolbar'));
    });

    expect(queryByTestId('toolbar')).not.toBeNull();
  });

  test('should render controls for markdown syntax', async () => {
    const { getByTestId, queryByTestId } = render(
      <MarkdownInput inputAccessoryViewID="testInput" />
    );

    await act(async () => {
      fireEvent(getByTestId('markdownInput'), 'focus');
      await waitForElement(() => getByTestId('toolbar'));
    });

    const visibleControls = [
      'bold',
      'italic',
      'link',
      'heading',
      'orderedList',
      'unorderedList',
    ];

    visibleControls.forEach(control => {
      expect(queryByTestId(`${control}Item`)).not.toBeNull();
    });
  });
});
