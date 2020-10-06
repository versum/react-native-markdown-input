import addPrefix from '../addPrefix';

describe('addPrefix', () => {
  const oneLineValue = 'test text';
  const multiLineValue = 'test\ntext\nvalue';
  const withoutTextSelection = { start: 4, end: 4 };
  const withTextSelection = { start: 7, end: 14 };
  describe('heading', () => {
    const controlName = 'heading';

    test('should add heading symbol at the beginning of current line', () => {
      expect(
        addPrefix({
          controlName,
          inputValue: oneLineValue,
          selection: withoutTextSelection,
        }),
      ).toEqual('#test text');
      expect(
        addPrefix({
          controlName,
          inputValue: multiLineValue,
          selection: withoutTextSelection,
        }),
      ).toEqual('#test\ntext\nvalue');
      expect(
        addPrefix({
          controlName,
          inputValue: multiLineValue,
          selection: withTextSelection,
        }),
      ).toEqual('test\n#text\nvalue');
    });

    test('should add heading symbol at the beginning of current empty line', () => {
      const inputValue = 'test\n';
      const selection = { start: 5, end: 5 };
      expect(addPrefix({ controlName, selection, inputValue })).toEqual(
        'test\n#',
      );
    });
  });
  describe('ordered list', () => {
    const controlName = 'orderedList';

    test('should add ordered list symbol at the beginning of current line', () => {
      expect(
        addPrefix({
          controlName,
          inputValue: oneLineValue,
          selection: withoutTextSelection,
        }),
      ).toEqual('1. test text');
      expect(
        addPrefix({
          controlName,
          inputValue: multiLineValue,
          selection: withoutTextSelection,
        }),
      ).toEqual('1. test\ntext\nvalue');
      expect(
        addPrefix({
          controlName,
          inputValue: multiLineValue,
          selection: withTextSelection,
        }),
      ).toEqual('test\n1. text\nvalue');
    });

    test('should add ordered list symbol at the beginnig of current empty line', () => {
      const inputValue = 'test\n';
      const selection = { start: 5, end: 5 };
      expect(addPrefix({ controlName, selection, inputValue })).toEqual(
        'test\n1. ',
      );
    });
  });
  describe('unordered list', () => {
    const controlName = 'unorderedList';

    test('should add unordered list symbol at the beginning of current line', () => {
      expect(
        addPrefix({
          controlName,
          inputValue: oneLineValue,
          selection: withoutTextSelection,
        }),
      ).toEqual('- test text');
      expect(
        addPrefix({
          controlName,
          inputValue: multiLineValue,
          selection: withoutTextSelection,
        }),
      ).toEqual('- test\ntext\nvalue');
      expect(
        addPrefix({
          controlName,
          inputValue: multiLineValue,
          selection: withTextSelection,
        }),
      ).toEqual('test\n- text\nvalue');
    });

    test('should add unordered list symbol at the beginnig of current empty line', () => {
      const inputValue = 'test\n';
      const selection = { start: 5, end: 5 };
      expect(addPrefix({ controlName, selection, inputValue })).toEqual(
        'test\n- ',
      );
    });
  });
});
