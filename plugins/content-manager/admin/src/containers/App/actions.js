/*
 *
 * App actions
 *
 */

import ***REMOVED*** includes ***REMOVED*** from 'lodash';
import ***REMOVED***
  BEGIN_MOVE,
  EMPTY_STORE,
  END_MOVE,
  GET_MODEL_ENTRIES,
  GET_MODEL_ENTRIES_SUCCEEDED,
  LOAD_MODELS,
  LOADED_MODELS,
  MOVE_ATTR,
  MOVE_ATTR_EDIT_VIEW,
  MOVE_VARIABLE_ATTR_EDIT_VIEW,
  ON_CHANGE,
  ON_CHANGE_SETTINGS,
  ON_CLICK_ADD_ATTR,
  ON_CLICK_ADD_ATTR_FIELD,
  ON_REMOVE,
  ON_REMOVE_EDIT_VIEW_FIELD_ATTR,
  ON_REMOVE_EDIT_VIEW_RELATION_ATTR,
  ON_RESET,
  ON_SUBMIT,
  SET_LAYOUT,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

export function beginMove(name, index, keys) ***REMOVED***
  return ***REMOVED***
    type: BEGIN_MOVE,
    name,
    index,
    keys,
***REMOVED***;
***REMOVED***

export function emptyStore() ***REMOVED***
  return ***REMOVED***
    type: EMPTY_STORE,
***REMOVED***;
***REMOVED***

export function endMove(keys) ***REMOVED***
  return ***REMOVED***
    type: END_MOVE,
    keys,
***REMOVED***;
***REMOVED***

export function getModelEntries(modelName, source) ***REMOVED***
  return ***REMOVED***
    type: GET_MODEL_ENTRIES,
    modelName,
    source,
***REMOVED***;
***REMOVED***

export function getModelEntriesSucceeded(count) ***REMOVED***
  return ***REMOVED***
    type: GET_MODEL_ENTRIES_SUCCEEDED,
    count,
***REMOVED***;
***REMOVED***

export function loadModels() ***REMOVED***
  return ***REMOVED***
    type: LOAD_MODELS,
***REMOVED***;
***REMOVED***

export function loadedModels(models) ***REMOVED***
  return ***REMOVED***
    type: LOADED_MODELS,
    models,
***REMOVED***;
***REMOVED***

export function moveAttr(dragIndex, hoverIndex, keys) ***REMOVED***
  return ***REMOVED***
    type: MOVE_ATTR,
    dragIndex,
    hoverIndex,
    keys,
***REMOVED***;
***REMOVED***

export function moveAttrEditView(dragIndex, hoverIndex, keys) ***REMOVED***
  return ***REMOVED***
    type: MOVE_ATTR_EDIT_VIEW,
    dragIndex,
    hoverIndex,
    keys,
***REMOVED***;
***REMOVED***

export function moveVariableAttrEditView(dragIndex, hoverIndex, keys) ***REMOVED***
  return ***REMOVED***
    type: MOVE_VARIABLE_ATTR_EDIT_VIEW,
    dragIndex,
    hoverIndex,
    keys,
***REMOVED***;
***REMOVED***

export function onChange(***REMOVED*** target ***REMOVED***) ***REMOVED***
  const value = includes(target.name, 'pageEntries') ? parseInt(target.value, 10) : target.value;

  return ***REMOVED***
    type: ON_CHANGE,
    keys: target.name.split('.'),
    value,
***REMOVED***;
***REMOVED***

export function onChangeSettings(***REMOVED*** target ***REMOVED***) ***REMOVED***
  const value = includes(target.name, 'pageEntries') ? parseInt(target.value, 10) : target.value;

  return ***REMOVED***
    type: ON_CHANGE_SETTINGS,
    keys: target.name.split('.'),
    value,
***REMOVED***;
***REMOVED***

export function onClickAddAttr(data, keys) ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_ADD_ATTR,
    data,
    keys,
***REMOVED***;
***REMOVED***

export function onClickAddAttrField(data, keys) ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_ADD_ATTR_FIELD,
    data,
    keys,
***REMOVED***;
***REMOVED***

export function onRemove(index, keys) ***REMOVED***
  return ***REMOVED***
    type: ON_REMOVE,
    index,
    keys,
***REMOVED***;
***REMOVED***

export function onRemoveEditViewFieldAttr(index, keys) ***REMOVED***
  return ***REMOVED***
    type: ON_REMOVE_EDIT_VIEW_FIELD_ATTR,
    index,
    keys,
***REMOVED***;
***REMOVED***

export function onRemoveEditViewRelationAttr(index, keys) ***REMOVED***
  return ***REMOVED***
    type: ON_REMOVE_EDIT_VIEW_RELATION_ATTR,
    index,
    keys,
***REMOVED***;
***REMOVED***

export function onReset() ***REMOVED***
  return ***REMOVED***
    type: ON_RESET,
***REMOVED***;
***REMOVED***

export function onSubmit() ***REMOVED***
  return ***REMOVED***
    type: ON_SUBMIT,
***REMOVED***;
***REMOVED***

export function setLayout(keys) ***REMOVED***
  return ***REMOVED***
    type: SET_LAYOUT,
    keys,
***REMOVED***;
***REMOVED***

export function submitSucceeded() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCEEDED,
***REMOVED***;
***REMOVED***