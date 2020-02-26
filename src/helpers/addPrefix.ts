import { Selection } from '../types';
import { MarkdownSymbols } from '../markdownSymbols';

// We prefer `↵` sign to keep consistency with input value and to have just one character for new line symbol
const newLineChar = String.fromCharCode(10);
const newLineRegexp = new RegExp(/\n/);

const addPrefix = ({
  controlName,
  inputValue,
  selection,
}: {
  controlName: 'heading' | 'unorderedList' | 'orderedList';
  inputValue: string;
  selection: Selection;
}) => {
  if (newLineRegexp.test(inputValue)) {
    const splitByNewLine = inputValue.split(newLineRegexp);

    // Here we keep input value before currently selected line
    let valueBeforeSelection = '';
    let selectedLineIndex = 0;

    // Search for currently selected line index and concat previous lines into one string
    for (let index = 0; splitByNewLine.length > index; index++) {
      const line = splitByNewLine[index];
      if (valueBeforeSelection.length + line.length >= selection.start) {
        selectedLineIndex = index;
        break;
      }

      valueBeforeSelection += `${line}${newLineChar}`;
    }
    const [lineToModify, ...restOfString] = splitByNewLine.slice(
      selectedLineIndex
    );

    return `${valueBeforeSelection}${
      MarkdownSymbols[controlName]
    }${lineToModify}${newLineChar}${restOfString.join(newLineChar)}`.trim();
  }

  return `${MarkdownSymbols[controlName]}${inputValue}`;
};

export default addPrefix;
