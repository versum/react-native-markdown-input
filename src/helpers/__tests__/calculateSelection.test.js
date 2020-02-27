import calculateSelection from '../calculateSelection';

describe('calculateSelection', () => {
  describe('with no selected text', () => {
    const selection = { start: 5, end: 5 };

    test('should move cursor inside bold symbol for bold', () => {
      const controlName = 'bold';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 7,
        end: 7,
      });
    });

    test('should move cursor inside italic symbol for italic', () => {
      const controlName = 'italic';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 6,
        end: 6,
      });
    });

    test('should move cursor inside square bracket for link', () => {
      controlName = 'link';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 6,
        end: 6,
      });
    });

    test('should move cursor number of heading symbols for heading', () => {
      const controlName = 'heading';

      const firstHeading = calculateSelection({ controlName, selection });
      const secondHeading = calculateSelection({
        controlName,
        selection: firstHeading,
      });

      expect(firstHeading).toEqual({ start: 6, end: 6 });
      expect(secondHeading).toEqual({ start: 7, end: 7 });
    });

    test('should move cursor by ordered list symbol length for ordered list', () => {
      const controlName = 'orderedList';
      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 8,
        end: 8,
      });
    });

    test('should move cursor by unordered list symbol length for unordered list', () => {
      const controlName = 'unorderedList';
      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 7,
        end: 7,
      });
    });
  });

  describe('with selected text', () => {
    const selection = { start: 5, end: 10 };

    test('should move cursor at the end of selected value for bold', () => {
      const controlName = 'bold';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 14,
        end: 14,
      });
    });

    test('should move cursor at the end of selected value for italic', () => {
      const controlName = 'italic';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 12,
        end: 12,
      });
    });

    test('should remove text selection and move cursor to end of selection for heading', () => {
      const controlName = 'heading';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 11,
        end: 11,
      });
    });

    test('should wrap selected text in square bracket and move cursor to round bracket', () => {
      const controlName = 'link';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 13,
        end: 13,
      });
    });

    test('should remove selection and move cursor to end of selection for ordered list', () => {
      const controlName = 'orderedList';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 13,
        end: 13,
      });
    });

    test('should remove selection and move cursor to end of selection for unordered list', () => {
      const controlName = 'unorderedList';

      expect(calculateSelection({ controlName, selection })).toEqual({
        start: 12,
        end: 12,
      });
    });
  });
});
