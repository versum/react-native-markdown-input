import textFormatter from '../textFormatter';

describe('textFormatter', () => {
  describe('one line value with no selected text', () => {
    const endValueSelection = { start: 9, end: 9 };
    const middleValueSelection = { start: 4, end: 4 };
    const inputValue = 'test text';
    test('should return value with bold symbol and selection inside it', () => {
      const controlName = 'bold';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: 'test text****',
        newSelection: { start: 11, end: 11 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: 'test**** text',
        newSelection: { start: 6, end: 6 },
      });
    });

    test('should return value with italic symbol and selection inside it', () => {
      const controlName = 'italic';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: 'test text__',
        newSelection: { start: 10, end: 10 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: 'test__ text',
        newSelection: { start: 5, end: 5 },
      });
    });

    test('should add heading at the beginning of the line and preserve cursor in the same place', () => {
      const controlName = 'heading';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: '#test text',
        newSelection: { start: 10, end: 10 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '#test text',
        newSelection: { start: 5, end: 5 },
      });
    });

    test('should add link symbol and move cursor inside square bracket', () => {
      const controlName = 'link';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: 'test text[]()',
        newSelection: { start: 10, end: 10 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: 'test[]() text',
        newSelection: { start: 5, end: 5 },
      });
    });

    test('should ordered list', () => {
      const controlName = 'orderedList';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: '1. test text',
        newSelection: { start: 12, end: 12 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '1. test text',
        newSelection: { start: 7, end: 7 },
      });
    });

    test('should  unordered lis', () => {
      const controlName = 'unorderedList';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: '- test text',
        newSelection: { start: 11, end: 11 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '- test text',
        newSelection: { start: 6, end: 6 },
      });
    });
  });

  describe('one line value with selected text', () => {
    const endValueSelection = { start: 5, end: 9 };
    const middleValueSelection = { start: 0, end: 4 };
    const inputValue = 'test text';

    test('should wrap selected text in bold symbol and move cursor at the end of bold symbol', () => {
      const controlName = 'bold';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: 'test **text**',
        newSelection: { start: 13, end: 13 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '**test** text',
        newSelection: { start: 8, end: 8 },
      });
    });

    test('should wrap selected text in italic symbol and move cursor at the end of italic symbol', () => {
      const controlName = 'italic';

      expect(
        textFormatter({ controlName, inputValue, selection: endValueSelection })
      ).toEqual({
        formattedValue: 'test _text_',
        newSelection: { start: 11, end: 11 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '_test_ text',
        newSelection: { start: 6, end: 6 },
      });
    });

    test('should add heading symbol at the beginning of the line and remove selection', () => {
      const controlName = 'heading';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endValueSelection,
        })
      ).toEqual({
        formattedValue: '#test text',
        newSelection: { start: 10, end: 10 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '#test text',
        newSelection: { start: 5, end: 5 },
      });
    });

    test('should wrap selected text in square bracket and move cursor to round brackets', () => {
      const controlName = 'link';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endValueSelection,
        })
      ).toEqual({
        formattedValue: 'test [text]()',
        newSelection: { start: 12, end: 12 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '[test]() text',
        newSelection: { start: 7, end: 7 },
      });
    });

    test('should add ordered list symbol at the beggining of the line and remove selection', () => {
      const controlName = 'orderedList';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endValueSelection,
        })
      ).toEqual({
        formattedValue: '1. test text',
        newSelection: { start: 12, end: 12 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '1. test text',
        newSelection: { start: 7, end: 7 },
      });
    });

    test('should unordered lis', () => {
      const controlName = 'unorderedList';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endValueSelection,
        })
      ).toEqual({
        formattedValue: '- test text',
        newSelection: { start: 11, end: 11 },
      });
      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: middleValueSelection,
        })
      ).toEqual({
        formattedValue: '- test text',
        newSelection: { start: 6, end: 6 },
      });
    });
  });

  describe('multiline value with no selected text', () => {
    const inputValue = 'first line\nsecond line\nthird line';
    const startLineSelection = { start: 11, end: 11 };
    const endLineSelection = { start: 22, end: 22 };

    test('should add bold symbol in the line where cursor is and move it inside bold symbol', () => {
      const controlName = 'bold';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n****second line\nthird line',
        newSelection: { start: 13, end: 13 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\nsecond line****\nthird line',
        newSelection: { start: 24, end: 24 },
      });
    });

    test('should add italic symbol in the line where cursor is and move it inside italic symbol', () => {
      const controlName = 'italic';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n__second line\nthird line',
        newSelection: { start: 12, end: 12 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\nsecond line__\nthird line',
        newSelection: { start: 23, end: 23 },
      });
    });

    test('should add heading at the beginning of the line where cursor is and preserve cursor position', () => {
      const controlName = 'heading';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n#second line\nthird line',
        newSelection: { start: 12, end: 12 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n#second line\nthird line',
        newSelection: { start: 23, end: 23 },
      });
    });

    test('should add link symbol where cursor is and preserve cursor position', () => {
      const controlName = 'link';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n[]()second line\nthird line',
        newSelection: { start: 12, end: 12 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\nsecond line[]()\nthird line',
        newSelection: { start: 23, end: 23 },
      });
    });

    test('should add ordered list symbol to line where cursor is and preserve cursor position', () => {
      const controlName = 'orderedList';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n1. second line\nthird line',
        newSelection: { start: 14, end: 14 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n1. second line\nthird line',
        newSelection: { start: 25, end: 25 },
      });
    });

    test('should add unordered list symbol to line where cursor is and reserve cursor position', () => {
      const controlName = 'unorderedList';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n- second line\nthird line',
        newSelection: { start: 13, end: 13 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: endLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n- second line\nthird line',
        newSelection: { start: 24, end: 24 },
      });
    });
  });

  describe('multiline value with selected text', () => {
    const inputValue = 'first line\nsecond line\nthird line';
    const startLineSelection = { start: 11, end: 17 };
    const twoLinesSelection = { start: 18, end: 28 };

    test('should wrap selected text in bold symbol and move cursor at the end of bold symbol', () => {
      const controlName = 'bold';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n**second** line\nthird line',
        newSelection: { start: 21, end: 21 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: twoLinesSelection,
        })
      ).toEqual({
        formattedValue: 'first line\nsecond **line\nthird** line',
        newSelection: { start: 32, end: 32 },
      });
    });

    test('should wrap selected text in italic symbol and move cursor at the end of italic symbol', () => {
      const controlName = 'italic';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n_second_ line\nthird line',
        newSelection: { start: 19, end: 19 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: twoLinesSelection,
        })
      ).toEqual({
        formattedValue: 'first line\nsecond _line\nthird_ line',
        newSelection: { start: 30, end: 30 },
      });
    });

    test('should add heading symbol at the beggining of the line where selection starts', () => {
      const controlName = 'heading';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n#second line\nthird line',
        newSelection: { start: 18, end: 18 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: twoLinesSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n#second line\nthird line',
        newSelection: { start: 29, end: 29 },
      });
    });

    test('should wrap selected text in link symbol and move cursor to round brackets', () => {
      const controlName = 'link';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n[second]() line\nthird line',
        newSelection: { start: 20, end: 20 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: twoLinesSelection,
        })
      ).toEqual({
        formattedValue: 'first line\nsecond [line\nthird]() line',
        newSelection: { start: 31, end: 31 },
      });
    });

    test('should add ordered list symbol at the beginning of line where selection starts', () => {
      const controlName = 'orderedList';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n1. second line\nthird line',
        newSelection: { start: 20, end: 20 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: twoLinesSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n1. second line\nthird line',
        newSelection: { start: 31, end: 31 },
      });
    });

    test('should add unordered list symbol at the beginning of line where selection starts', () => {
      const controlName = 'unorderedList';

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: startLineSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n- second line\nthird line',
        newSelection: { start: 19, end: 19 },
      });

      expect(
        textFormatter({
          controlName,
          inputValue,
          selection: twoLinesSelection,
        })
      ).toEqual({
        formattedValue: 'first line\n- second line\nthird line',
        newSelection: { start: 30, end: 30 },
      });
    });
  });
});
