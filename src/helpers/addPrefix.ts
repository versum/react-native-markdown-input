import { MarkdownSymbols } from '../types';

const addPrefix = ({
  controlName,
  inputValue,
}: {
  controlName: 'heading' | 'unorderedList' | 'orderedList';
  inputValue: string;
}) => {
  return `${MarkdownSymbols[controlName]}${inputValue}`;
};

export default addPrefix;
