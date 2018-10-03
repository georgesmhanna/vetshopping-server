/**
 *
 * Utils
 *
 */

import ***REMOVED*** ContentBlock, EditorState, genKey, Modifier ***REMOVED*** from 'draft-js';
import ***REMOVED*** List ***REMOVED*** from 'immutable';
import ***REMOVED*** DEFAULT_INDENTATION ***REMOVED*** from './constants';

export function createNewBlock(text = '', type = 'unstyled', key = genKey()) ***REMOVED***
  return new ContentBlock(***REMOVED*** key, type, text, charaterList: List([]) ***REMOVED***);
***REMOVED***

export function getNextBlocksList(editorState, startKey) ***REMOVED***
  return editorState
    .getCurrentContent()
    .getBlockMap()
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .toList()
    .shift()
    .concat([createNewBlock()]);
***REMOVED***


export function updateSelection(selection, blocks, offset) ***REMOVED***
  return selection.merge(***REMOVED***
    anchorKey: blocks.get(0).getKey(),
    focusKey: blocks.get(0).getKey(),
    anchorOffset: offset,
    focusOffset: offset,
***REMOVED***);
***REMOVED***

export function getSelectedBlocksList(editorState) ***REMOVED***
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]])
    .toList();
***REMOVED***

export function onTab(editorState) ***REMOVED***
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  let newContentState;

  if (selection.isCollapsed()) ***REMOVED***
    newContentState = Modifier.insertText(
      contentState,
      selection,
      DEFAULT_INDENTATION,
    );
***REMOVED*** else ***REMOVED***
    newContentState = Modifier.replaceText(
      contentState,
      selection,
      DEFAULT_INDENTATION,
    );
***REMOVED***

  return EditorState.push(
    editorState,
    newContentState,
    'insert-characters'
  );
***REMOVED***
