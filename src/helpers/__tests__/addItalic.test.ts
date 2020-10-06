import addItalic from '../addItalic';

describe('addItalic', () => {
  describe('with no selected text', () => {
    test('should add italic symbol add in current cursor place', () => {
      const oneLineValue = 'test text';
      const multilineValue = 'test\ntext';
      const selection = { start: 5, end: 5 };

      expect(addItalic({ inputValue: oneLineValue, selection })).toEqual(
        'test __text',
      );
      expect(addItalic({ inputValue: multilineValue, selection })).toEqual(
        'test\n__text',
      );
    });
  });

  describe('with selected text', () => {
    test('should wrap selected text in italic symbol', () => {
      const oneLineValue = 'test text';
      const multilineValue = 'test\ntext';
      const selection = { start: 5, end: 9 };

      expect(addItalic({ inputValue: oneLineValue, selection })).toEqual(
        'test _text_',
      );
      expect(addItalic({ inputValue: multilineValue, selection })).toEqual(
        'test\n_text_',
      );
    });
  });
});
