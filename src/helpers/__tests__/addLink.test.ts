import addLink from '../addLink';

describe('addLink', () => {
  describe('with no selected text', () => {
    test('should add link symbol add in current cursor place', () => {
      const oneLineValue = 'test text';
      const multilineValue = 'test\ntext';
      const selection = { start: 5, end: 5 };

      expect(addLink({ inputValue: oneLineValue, selection })).toEqual(
        'test []()text'
      );
      expect(addLink({ inputValue: multilineValue, selection })).toEqual(
        'test\n[]()text'
      );
    });
  });

  describe('with selected text', () => {
    test('should wrap selected text in link symbol', () => {
      const oneLineValue = 'test text';
      const multilineValue = 'test\ntext';
      const selection = { start: 5, end: 9 };

      expect(addLink({ inputValue: oneLineValue, selection })).toEqual(
        'test [text]()'
      );
      expect(addLink({ inputValue: multilineValue, selection })).toEqual(
        'test\n[text]()'
      );
    });
  });
});
