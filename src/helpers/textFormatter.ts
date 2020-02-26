import { Selection } from '../types';

import addLink from './addLink';
import addBold from './addBold';
import addItalic from './addItalic';
import addPrefix from './addPrefix';
import calculateSelection from './calculateSelection';

type TextFormatterParams = {
  controlName: string;
  inputValue: string | undefined;
  selection: Selection;
};

const formatValue = ({
  controlName,
  inputValue,
  selection,
}: {
  controlName: string;
  inputValue: string;
  selection: Selection;
}) => {
  switch (controlName) {
    case 'bold': {
      return addBold({ inputValue, selection });
    }
    case 'italic': {
      return addItalic({ inputValue, selection });
    }
    case 'link': {
      return addLink({ inputValue, selection });
    }
    case 'orderedList':
    case 'unorderedList':
    case 'heading': {
      return addPrefix({ inputValue, controlName });
    }

    default: {
      return inputValue;
    }
  }
};

export default ({
  controlName,
  inputValue = '',
  selection,
}: TextFormatterParams) => {
  const formattedValue = formatValue({ controlName, inputValue, selection });
  const newSelection = calculateSelection({ selection, controlName });

  return { formattedValue, newSelection };
};
