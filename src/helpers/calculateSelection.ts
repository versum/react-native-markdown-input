import { Selection, MarkdownSymbol } from '../types';

const calculateSelection = ({
  controlName,
  selection,
}: {
  controlName: MarkdownSymbol;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    switch (controlName) {
      case 'bold': {
        return { start: selection.start + 2, end: selection.end + 2 };
      }
      case 'italic':
      case 'link':
      case 'heading': {
        return { start: selection.start + 1, end: selection.end + 1 };
      }
      case 'orderedList': {
        return { start: selection.start + 3, end: selection.end + 3 };
      }
      case 'unorderedList': {
        return { start: selection.start + 2, end: selection.end + 2 };
      }

      default:
        return selection;
    }
  }

  switch (controlName) {
    case 'bold': {
      return { start: selection.end + 4, end: selection.end + 4 };
    }
    case 'unorderedList':
    case 'italic': {
      return { start: selection.end + 2, end: selection.end + 2 };
    }
    case 'orderedList':
    case 'link': {
      return { start: selection.end + 3, end: selection.end + 3 };
    }
    case 'heading': {
      return { start: selection.end + 1, end: selection.end + 1 };
    }

    default:
      return selection;
  }
};

export default calculateSelection;
