import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';

import MarkdownInput from '../components/MarkdownInput';
import * as textFormatter from '../helpers/textFormatter';

describe('MarkdownInput', () => {
  test('should render multiline input', () => {
    const { getByTestId } = render(<MarkdownInput testID="markdownInput" />);

    expect(getByTestId('markdownInputComponent')).not.toBeNull();
    expect(getByTestId('markdownInputComponent').props.multiline).toBe(true);
  });

  test('should render toolbar when keyboard is visible', async () => {
    const { getByTestId, queryByTestId } = render(
      <MarkdownInput testID="markdownInput" />
    );

    await act(async () => {
      fireEvent(getByTestId('markdownInputComponent'), 'focus');
      await waitForElement(() => getByTestId('toolbar'));
    });

    expect(queryByTestId('toolbar')).not.toBeNull();
  });

  test('should render controls for markdown syntax', async () => {
    const { getByTestId, queryByTestId } = render(
      <MarkdownInput testID="markdownInput" />
    );

    await act(async () => {
      fireEvent(getByTestId('markdownInputComponent'), 'focus');
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

  test('should handle press on control in toolbar', async () => {
    textFormatter.default = jest.fn();

    const { getByTestId } = render(<MarkdownInput testID="markdownInput" />);

    await act(async () => {
      fireEvent(getByTestId('markdownInputComponent'), 'focus');
      await waitForElement(() => getByTestId('toolbar'));
      fireEvent.press(getByTestId('boldTouchable'));
    });

    expect(textFormatter.default).toHaveBeenCalledWith('bold', undefined);
  });

  describe('On toolbar item press', () => {
    let inputValue = undefined;

    afterEach(() => {
      inputValue = undefined;
    });

    describe('not selected text', () => {
      test('should add bold symbol when bold control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value={inputValue}
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent.changeText(
            getByTestId('markdownInputComponent'),
            'test text'
          );
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text'
        );

        act(() => {
          fireEvent.press(getByTestId('boldTouchable'));
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text****'
        );
        expect(getByTestId('markdownInputComponent').props.selection).toEqual({
          start: 11,
          end: 11,
        });
      });

      test('should add italic symbol when italic control is presed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value={inputValue}
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent.changeText(
            getByTestId('markdownInputComponent'),
            'test text'
          );
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text'
        );

        act(() => {
          fireEvent.press(getByTestId('italicTouchable'));
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text__'
        );
        expect(getByTestId('markdownInputComponent').props.selection).toEqual({
          start: 10,
          end: 10,
        });
      });

      test('should add link symbol on link controll press', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value={inputValue}
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent.changeText(
            getByTestId('markdownInputComponent'),
            'test text'
          );
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text'
        );

        act(() => {
          fireEvent.press(getByTestId('linkTouchable'));
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text[]()'
        );
        expect(getByTestId('markdownInputComponent').props.selection).toEqual({
          start: 10,
          end: 10,
        });
      });
      test('should add heading symbol on heading controll press', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value={inputValue}
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent.changeText(
            getByTestId('markdownInputComponent'),
            'test text'
          );
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          'test text'
        );

        act(() => {
          fireEvent.press(getByTestId('headingTouchable'));
          update(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={inputValue}
            />
          );
        });

        expect(getByTestId('markdownInputComponent').props.value).toEqual(
          '#test text'
        );
        expect(getByTestId('markdownInputComponent').props.selection).toEqual({
          start: 10,
          end: 10,
        });
      });
    });
  });
});
