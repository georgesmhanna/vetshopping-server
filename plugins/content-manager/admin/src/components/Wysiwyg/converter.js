import showdown from 'showdown';

const converterOptions = ***REMOVED***
  backslashEscapesHTMLTags: true,
  emoji: true,
  parseImgDimensions: true,
  simpleLineBreaks: true,
  simplifiedAutoLink: true,
  smoothLivePreview: true,
  splitAdjacentBlockquotes: false,
  strikethrough: true,
  tables: true,
  tasklists: true,
  underline: true,
***REMOVED***;

const converter = new showdown.Converter(converterOptions);

export default converter;
