import { Selection } from '../types';
import { MarkdownSymbols } from '../markdownSymbols';

import splitTextBy from './splitTextBy';

const addBold = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    return `${inputValue}${MarkdownSymbols.bold}${MarkdownSymbols.bold}`;
  }

  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  return `${beforeSelection}${MarkdownSymbols.bold}${selectedValue}${MarkdownSymbols.bold}${afterSelection}`;
};

export default addBold;
