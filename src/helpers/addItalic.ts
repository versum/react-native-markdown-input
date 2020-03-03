import { Selection } from '../types';

import { MarkdownSymbols } from './markdownSymbols';
import splitTextBy from './splitTextBy';

const addItalic = ({
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

  return `${beforeSelection}${MarkdownSymbols.italic}${selectedValue}${MarkdownSymbols.italic}${afterSelection}`;
};

export default addItalic;
