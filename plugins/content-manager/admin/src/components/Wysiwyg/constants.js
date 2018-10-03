export const SELECT_OPTIONS = [
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.title', value: '' ***REMOVED***,
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.H1', value: '#' ***REMOVED***,
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.H2', value: '##' ***REMOVED***,
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.H3', value: '###' ***REMOVED***,
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.H4', value: '####' ***REMOVED***,
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.H5', value: '#####' ***REMOVED***,
  ***REMOVED*** id: 'components.Wysiwyg.selectOptions.H6', value: '######' ***REMOVED***,
];

export const CONTROLS = [
  [
    ***REMOVED***
      label: 'B',
      style: 'BOLD',
      className: 'styleButtonBold',
      hideLabel: true,
      handler: 'addContent',
      text: '**textToReplace**',
***REMOVED***,
    ***REMOVED***
      label: 'I',
      style: 'ITALIC',
      className: 'styleButtonItalic',
      hideLabel: true,
      handler: 'addContent',
      text: '*textToReplace*',
***REMOVED***,
    ***REMOVED***
      label: 'U',
      style: 'UNDERLINE',
      className: 'styleButtonUnderline',
      hideLabel: true,
      handler: 'addContent',
      text: '__textToReplace__',
***REMOVED***,
    ***REMOVED***
      label: 'S',
      style: 'STRIKED',
      className: 'styleButtonStrikedOut',
      hideLabel: true,
      handler: 'addContent',
      text: '~~textToReplace~~',
***REMOVED***,
    ***REMOVED***
      label: 'UL',
      style: 'unordered-list-item',
      className: 'styleButtonUL',
      hideLabel: true,
      handler: 'addUlBlock',
      text: '- textToReplace',
***REMOVED***,
    ***REMOVED***
      label: 'OL',
      style: 'ordered-list-item',
      className: 'styleButtonOL',
      hideLabel: true,
      handler: 'addOlBlock',
      text: '1. textToReplace',
***REMOVED***,
  ],
  [
    ***REMOVED***
      label: '<>',
      style: 'CODE',
      className: 'styleButtonCodeBlock',
      hideLabel: true,
      handler: 'addSimpleBlockWithSelection',
      text: '```textToReplace```',
***REMOVED***,
    ***REMOVED***
      label: 'img',
      style: 'IMG',
      className: 'styleButtonImg',
      hideLabel: true,
      handler: 'addSimpleBlockWithSelection',
      text: '![text](textToReplace)',
***REMOVED***,
    ***REMOVED***
      label: 'Link',
      style: 'LINK',
      className: 'styleButtonLink',
      hideLabel: true,
      handler: 'addContent',
      text: '[text](textToReplace)',
***REMOVED***,
    ***REMOVED***
      label: 'quotes',
      style: 'BLOCKQUOTE',
      className: 'styleButtonBlockQuote',
      hideLabel: true,
      handler: 'addSimpleBlockWithSelection',
      text: '> textToReplace',
***REMOVED***,
  ],
];

export const DEFAULT_INDENTATION = '  ';
