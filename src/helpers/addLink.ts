import { Selection } from '../types';

import { MarkdownSymbols } from './markdownSymbols';
import splitTextBy from './splitTextBy';

const addLink = ({
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

  const [openingBracket, ...rest] = MarkdownSymbols.link;

  // On web `...rest` is a string. With this guard we are sure that we pass proper value
  return `${beforeSelection}${openingBracket}${selectedValue}${rest.join?.(
    ''
  ) || rest}${afterSelection}`;
};

export default addLink;
