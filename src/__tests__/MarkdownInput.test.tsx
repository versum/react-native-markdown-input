import React from 'react';
import { View } from 'react-native';
import {
  render,
  fireEvent,
  act,
  waitForElement,
} from 'react-native-testing-library';

import MarkdownInput from '../MarkdownInput';
import { ToolbarItemProps } from '../componentTypes';

const selectionChangeEvent = (start: number, end: number) => ({
  nativeEvent: { selection: { start, end } },
});

describe('MarkdownInput', () => {
  test('should render multiline input', () => {
    const { getByTestId } = render(
      <MarkdownInput onChangeText={jest.fn()} testID="markdownInput" />
    );

    expect(getByTestId('markdownInputComponent')).not.toBeNull();
    expect(getByTestId('markdownInputComponent').props.multiline).toBe(true);
  });

  test('should render toolbar when keyboard is visible', async () => {
    const { getByTestId, queryByTestId } = render(
      <MarkdownInput onChangeText={jest.fn()} testID="markdownInput" />
    );

    await act(async () => {
      fireEvent(getByTestId('markdownInputComponent'), 'focus');
      await waitForElement(() => getByTestId('toolbar'));
    });

    expect(queryByTestId('toolbar')).not.toBeNull();
  });

  test('should render controls for markdown syntax', async () => {
    const { getByTestId, queryByTestId } = render(
      <MarkdownInput onChangeText={jest.fn()} testID="markdownInput" />
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

  test('should be able to render custom toolbar item', () => {
    const TestToolbarItem = ({ controlName }: ToolbarItemProps) => (
      <View testID={`custom${controlName}Item`} />
    );
    const { queryByTestId } = render(
      <MarkdownInput
        CustomToolbarItem={TestToolbarItem}
        onChangeText={jest.fn()}
        testID="markdownInput"
      />
    );
    const visibleControls = [
      'bold',
      'italic',
      'link',
      'heading',
      'orderedList',
      'unorderedList',
    ];
    visibleControls.forEach(control => {
      expect(queryByTestId(`custom${control}Item`)).not.toBeNull();
    });
  });

  test('should handle press on control in toolbar', async () => {
    const { getByTestId } = render(
      <MarkdownInput onChangeText={jest.fn()} testID="markdownInput" />
    );

    await act(async () => {
      fireEvent(getByTestId('markdownInputComponent'), 'focus');
      await waitForElement(() => getByTestId('toolbar'));
      fireEvent.press(getByTestId('boldTouchable'));
    });

    expect(
      getByTestId('markdownInputComponent').props.onChangeText
    ).toHaveBeenCalledWith('****');
  });

  describe('On toolbar item press', () => {
    let inputValue = '';

    afterEach(() => {
      inputValue = '';
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
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(9, 9)
          );
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
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(9, 9)
          );
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
      });

      test('should add link symbol on link control press', async () => {
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
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(9, 9)
          );
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
      });

      test('should add heading symbol on heading control press', async () => {
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
      });

      test('should add unordered list element symbol on unordered list control press', async () => {
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
          fireEvent.press(getByTestId('unorderedListTouchable'));
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
          '- test text'
        );
      });

      test('should add ordered list element symbol on ordered list control press', async () => {
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
          fireEvent.press(getByTestId('orderedListTouchable'));
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
          '1. test text'
        );
      });

      describe('on value with new line symbol', () => {
        test('should add ordered list symbol at the beginning of line when ordered list control is pressed', async () => {
          const { getByTestId, update } = render(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={`test text\nsecond line`}
            />
          );

          await act(async () => {
            fireEvent(getByTestId('markdownInputComponent'), 'focus');
            await waitForElement(() => getByTestId('toolbar'));
            fireEvent(
              getByTestId('markdownInputComponent'),
              'selectionChange',
              selectionChangeEvent(11, 11)
            );

            fireEvent.press(getByTestId('orderedListTouchable'));

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
            'test text\n1. second line'
          );
        });

        test('should add unordered list symbol at the beginning of line when unordered list control is pressed', async () => {
          const { getByTestId, update } = render(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={`test text\nsecond line`}
            />
          );

          await act(async () => {
            fireEvent(getByTestId('markdownInputComponent'), 'focus');
            await waitForElement(() => getByTestId('toolbar'));
            fireEvent(
              getByTestId('markdownInputComponent'),
              'selectionChange',
              selectionChangeEvent(11, 11)
            );

            fireEvent.press(getByTestId('unorderedListTouchable'));

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
            'test text\n- second line'
          );
        });

        test('should add heading symbol at the beginning of line when heading control is pressed', async () => {
          const { getByTestId, update } = render(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={`test text\nsecond line`}
            />
          );

          await act(async () => {
            fireEvent(getByTestId('markdownInputComponent'), 'focus');
            await waitForElement(() => getByTestId('toolbar'));
            fireEvent(
              getByTestId('markdownInputComponent'),
              'selectionChange',
              selectionChangeEvent(11, 11)
            );

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
            'test text\n#second line'
          );
        });
      });
    });

    describe('has selected text', () => {
      test('should add bold symbol when bold control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value="test text"
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(0, 4)
          );

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
          '**test** text'
        );
      });

      test('should add italic symbol when italic control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value="test text"
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(0, 4)
          );

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
          '_test_ text'
        );
      });

      test('should add heading symbol when heading control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value="test text"
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(0, 4)
          );

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
      });

      test('should add link symbol when link control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value="test text"
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(0, 4)
          );

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
          '[test]() text'
        );
      });

      test('should add unordered list symbol when unordered list control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value="test text"
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(0, 4)
          );

          fireEvent.press(getByTestId('unorderedListTouchable'));

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
          '- test text'
        );
      });

      test('should add ordered list symbol when ordered list control is pressed', async () => {
        const { getByTestId, update } = render(
          <MarkdownInput
            onChangeText={changeText => {
              inputValue = changeText;
            }}
            testID="markdownInput"
            value="test text"
          />
        );

        await act(async () => {
          fireEvent(getByTestId('markdownInputComponent'), 'focus');
          await waitForElement(() => getByTestId('toolbar'));
          fireEvent(
            getByTestId('markdownInputComponent'),
            'selectionChange',
            selectionChangeEvent(0, 4)
          );

          fireEvent.press(getByTestId('orderedListTouchable'));

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
          '1. test text'
        );
      });

      describe('on value with new line symbol', () => {
        test('should add ordered list symbol at the beginning of selected line when ordered list control is pressed', async () => {
          const { getByTestId, update } = render(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={`test text\nsecond line`}
            />
          );

          await act(async () => {
            fireEvent(getByTestId('markdownInputComponent'), 'focus');
            await waitForElement(() => getByTestId('toolbar'));
            fireEvent(
              getByTestId('markdownInputComponent'),
              'selectionChange',
              selectionChangeEvent(11, 12)
            );

            fireEvent.press(getByTestId('orderedListTouchable'));

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
            'test text\n1. second line'
          );
        });

        test('should add unordered list symbol at the beginning of selected line when unordered list control is pressed', async () => {
          const { getByTestId, update } = render(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={`test text\nsecond line`}
            />
          );

          await act(async () => {
            fireEvent(getByTestId('markdownInputComponent'), 'focus');
            await waitForElement(() => getByTestId('toolbar'));
            fireEvent(
              getByTestId('markdownInputComponent'),
              'selectionChange',
              selectionChangeEvent(11, 12)
            );

            fireEvent.press(getByTestId('unorderedListTouchable'));

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
            'test text\n- second line'
          );
        });

        test('should add heading symbol at the beginning of selected line when heading control is pressed', async () => {
          const { getByTestId, update } = render(
            <MarkdownInput
              onChangeText={changeText => {
                inputValue = changeText;
              }}
              testID="markdownInput"
              value={`test text\nsecond line`}
            />
          );

          await act(async () => {
            fireEvent(getByTestId('markdownInputComponent'), 'focus');
            await waitForElement(() => getByTestId('toolbar'));
            fireEvent(
              getByTestId('markdownInputComponent'),
              'selectionChange',
              selectionChangeEvent(11, 12)
            );

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
            'test text\n#second line'
          );
        });
      });
    });
  });
});
