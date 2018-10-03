import ***REMOVED*** trimEnd, trimStart ***REMOVED*** from 'lodash';
/**
 * Override the editor css
 * @param  ***REMOVED***[type]***REMOVED*** block [description]
 * @return ***REMOVED***[type]***REMOVED***       [description]
 */

export function getBlockStyle() ***REMOVED***
  return null;
***REMOVED***

export function getBlockContent(style) ***REMOVED***
  switch (style) ***REMOVED***
    case 'IMG':
      return ***REMOVED***
        innerContent: 'link',
        endReplacer: ')',
        startReplacer: '![text](',
***REMOVED***;
    case 'CODE':
      return ***REMOVED***
        innerContent: 'code block',
        endReplacer: '`',
        startReplacer: '`',
***REMOVED***;
    case 'BLOCKQUOTE':
      return ***REMOVED***
        innerContent: 'quote',
        endReplacer: '',
        startReplacer: '> ',
***REMOVED***;
    case 'BOLD':
      return ***REMOVED***
        innerContent: 'bold text',
        endReplacer: '*',
        startReplacer: '*',
***REMOVED***;
    case 'ITALIC':
      return ***REMOVED***
        innerContent: 'italic text',
        endReplacer: '*',
        startReplacer: '*',
***REMOVED***;
    case 'STRIKED':
      return ***REMOVED***
        innerContent: 'striked out',
        endReplacer: '~',
        startReplacer: '~',
***REMOVED***;
    case 'UNDERLINE':
      return ***REMOVED***
        innerContent: 'underlined text',
        endReplacer: '_',
        startReplacer: '_',
***REMOVED***;
    case 'LINK':
      return ***REMOVED***
        innerContent: 'link',
        endReplacer: ')',
        startReplacer: '[text](',
***REMOVED***;
    default:
      return ***REMOVED***
        innerContent: '',
        endReplacer: '',
        startReplacer: '',
***REMOVED***;
***REMOVED***
***REMOVED***

export const getDefaultSelectionOffsets = (
  content,
  startReplacer,
  endReplacer,
  initPosition = 0,
) => (***REMOVED***
  anchorOffset: initPosition + content.length - trimStart(content, startReplacer).length,
  focusOffset: initPosition + trimEnd(content, endReplacer).length,
***REMOVED***);

/**
 * Get the start and end offset
 * @param  ***REMOVED***Object***REMOVED*** selection
 * @return ***REMOVED***Object***REMOVED***
 */
export function getOffSets(selection) ***REMOVED***
  return ***REMOVED***
    end: selection.getEndOffset(),
    start: selection.getStartOffset(),
***REMOVED***;
***REMOVED***

export function getKeyCommandData(command) ***REMOVED***
  let content;
  let style;

  switch (command) ***REMOVED***
    case 'bold':
      content = '**textToReplace**';
      style = 'BOLD';
      break;
    case 'italic':
      content = '*textToReplace*';
      style = 'ITALIC';
      break;
    case 'underline':
      content = '__textToReplace__';
      style = 'UNDERLINE';
      break;
    default:
      content = '';
      style = '';
***REMOVED***

  return ***REMOVED*** content, style ***REMOVED***;
***REMOVED***
