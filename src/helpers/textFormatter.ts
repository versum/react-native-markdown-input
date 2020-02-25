enum MarkdownSymbols {
  bold = '**',
  italic = '_',
  link = '[]()',
  heading = '#',
}

export default (controlName: string, inputValue: string = '') => {
  switch (controlName) {
    case 'bold': {
      return addBold(inputValue);
    }
    case 'italic': {
      return addItalic(inputValue);
    }
    case 'link': {
      return addLink(inputValue);
    }
    case 'heading': {
      return addHeading(inputValue);
    }

    default: {
      return inputValue;
    }
  }
};

const addBold = (inputValue: string) => {
  return `${inputValue}${MarkdownSymbols.bold}${MarkdownSymbols.bold}`;
};

const addItalic = (inputValue: string) => {
  return `${inputValue}${MarkdownSymbols.italic}${MarkdownSymbols.italic}`;
};

const addLink = (inputValue: string) => {
  return `${inputValue}${MarkdownSymbols.link}`;
};

const addHeading = (inputValue: string) => {
  return `${MarkdownSymbols.heading}${inputValue}`;
};
