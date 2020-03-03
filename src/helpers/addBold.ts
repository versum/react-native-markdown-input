import { Selection } from '../types';

import { MarkdownSymbols } from './markdownSymbols';
import splitTextBy from './splitTextBy';

const addBold = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  return `${beforeSelection}${MarkdownSymbols.bold}${selectedValue}${MarkdownSymbols.bold}${afterSelection}`;
};

export default addBold;
