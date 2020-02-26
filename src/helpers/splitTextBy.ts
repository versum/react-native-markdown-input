import { Selection } from '../types';

const splitTextBy = ({
  inputValue,
  selection,
}: {
  inputValue: string;
  selection: Selection;
}): [string, string, string] => {
  const beforeSelection = inputValue.substring(0, selection.start);
  const selectedValue = inputValue.slice(selection.start, selection.end);
  const afterSelection = inputValue.substring(selection.end);

  return [beforeSelection, selectedValue, afterSelection];
};

export default splitTextBy;
