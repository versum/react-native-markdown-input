import addBold from '../addBold';

describe('addBold', () => {
  describe('with no selected text', () => {
    test('should add bold symbol add in current cursor place', () => {
      const oneLineValue = 'test text';
      const multilineValue = 'test\ntext';
      const selection = { start: 5, end: 5 };

      expect(addBold({ inputValue: oneLineValue, selection })).toEqual(
        'test ****text'
      );
      expect(addBold({ inputValue: multilineValue, selection })).toEqual(
        'test\n****text'
      );
    });
  });

  describe('with selected text', () => {
    test('should wrap selected text in bold symbol', () => {
      const oneLineValue = 'test text';
      const multilineValue = 'test\ntext';
      const selection = { start: 5, end: 9 };

      expect(addBold({ inputValue: oneLineValue, selection })).toEqual(
        'test **text**'
      );
      expect(addBold({ inputValue: multilineValue, selection })).toEqual(
        'test\n**text**'
      );
    });
  });
});
