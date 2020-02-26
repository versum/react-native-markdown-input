import { MarkdownSymbols, Selection } from '../types';
import splitTextBy from './splitTextBy';

const addItalic = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    return `${inputValue}${MarkdownSymbols.italic}${MarkdownSymbols.italic}`;
  }

  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  return `${beforeSelection}${MarkdownSymbols.italic}${selectedValue}${MarkdownSymbols.italic}${afterSelection}`;
};

export default addItalic;
