import { Selection } from '../types';
import { MarkdownSymbols } from '../markdownSymbols';

import splitTextBy from './splitTextBy';

const addLink = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}) => {
  if (selection.start === selection.end) {
    return `${inputValue}${MarkdownSymbols.link}`;
  }

  const [beforeSelection, selectedValue, afterSelection] = splitTextBy({
    inputValue,
    selection,
  });

  const [openingBracket, ...rest] = MarkdownSymbols.link;

  return `${beforeSelection}${openingBracket}${selectedValue}${rest.join(
    ''
  )}${afterSelection}`;
};

export default addLink;
