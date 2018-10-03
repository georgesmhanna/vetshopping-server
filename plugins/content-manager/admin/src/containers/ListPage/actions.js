/**
 *
 * ListPage actions
 *
 */

import ***REMOVED***
  ADD_ATTR,
  ADD_FILTER,
  CHANGE_PARAMS,
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_SEVERAL_DATA,
  DELETE_SEVERAL_DATA_SUCCESS,
  GET_DATA,
  GET_DATA_SUCCEEDED,
  ON_CHANGE,
  ON_CLICK_REMOVE,
  ON_CLICK_SELECT,
  ON_CLICK_SELECT_ALL,
  ON_TOGGLE_DELETE_ALL,
  ON_TOGGLE_FILTERS,
  OPEN_FILTERS_WITH_SELECTION,
  REMOVE_ALL_FILTERS,
  REMOVE_ATTR,
  REMOVE_FILTER,
  RESET_DISPLAYED_FIELDS,
  SET_DISPLAYED_FIELDS,
  SET_PARAMS,
  SUBMIT,
***REMOVED*** from './constants';

export function addAttr(attr, index) ***REMOVED***
  return ***REMOVED***
    type: ADD_ATTR,
    attr,
    index,
***REMOVED***;
***REMOVED***

export function addFilter(filter) ***REMOVED***
  return ***REMOVED***
    type: ADD_FILTER,
    filter,
***REMOVED***;
***REMOVED***

export function changeParams(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: CHANGE_PARAMS,
    keys: target.name.split('.'),
    value: target.value,
***REMOVED***;
***REMOVED***

export function deleteData(id, modelName, source) ***REMOVED***
  return ***REMOVED***
    type: DELETE_DATA,
    id,
    modelName,
    source,
***REMOVED***;
***REMOVED***

export function deleteDataSuccess(id) ***REMOVED***
  return ***REMOVED***
    type: DELETE_DATA_SUCCESS,
    id,
***REMOVED***;
***REMOVED***

export function deleteSeveralData(entriesToDelete, model, source) ***REMOVED***
  return ***REMOVED***
    type: DELETE_SEVERAL_DATA,
    entriesToDelete,
    model,
    source,
***REMOVED***;
***REMOVED***

export function deleteSeveralDataSuccess() ***REMOVED***
  return ***REMOVED***
    type: DELETE_SEVERAL_DATA_SUCCESS,
***REMOVED***;
***REMOVED***

export function getData(currentModel, source, setUpdatingParams = false) ***REMOVED***
  return ***REMOVED***
    type: GET_DATA,
    currentModel,
    setUpdatingParams,
    source,
***REMOVED***;
***REMOVED***

export function getDataSucceeded(data) ***REMOVED***
  return ***REMOVED***
    type: GET_DATA_SUCCEEDED,
    data,
***REMOVED***;
***REMOVED***

export function onChange(index, key, value) ***REMOVED***
  return ***REMOVED***
    type: ON_CHANGE,
    index,
    key,
    value,
***REMOVED***;
***REMOVED***

export function onClickRemove(index) ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_REMOVE,
    index,
***REMOVED***;
***REMOVED***

export function onClickSelect(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_SELECT,
    id: target.name,
***REMOVED***;
***REMOVED***

export function onClickSelectAll() ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_SELECT_ALL,
***REMOVED***;
***REMOVED***

export function openFiltersWithSelections(index) ***REMOVED***
  return ***REMOVED***
    type: OPEN_FILTERS_WITH_SELECTION,
    index,
***REMOVED***;
***REMOVED***

export function onToggleDeleteAll() ***REMOVED***
  return ***REMOVED***
    type: ON_TOGGLE_DELETE_ALL,
***REMOVED***;
***REMOVED***

export function onToggleFilters() ***REMOVED***
  return ***REMOVED***
    type: ON_TOGGLE_FILTERS,
***REMOVED***;
***REMOVED***

export function removeAllFilters() ***REMOVED***
  return ***REMOVED***
    type: REMOVE_ALL_FILTERS,
***REMOVED***;
***REMOVED***

export function removeAttr(index) ***REMOVED***
  return ***REMOVED***
    type: REMOVE_ATTR,
    index,
***REMOVED***;
***REMOVED***

export function removeFilter(index) ***REMOVED***
  return ***REMOVED***
    type: REMOVE_FILTER,
    index,
***REMOVED***;
***REMOVED***

export function resetDisplayedFields(fields) ***REMOVED***
  return ***REMOVED***
    type: RESET_DISPLAYED_FIELDS,
    fields,
***REMOVED***;
***REMOVED***

export function setDisplayedFields(fields) ***REMOVED***
  return ***REMOVED***
    type: SET_DISPLAYED_FIELDS,
    fields,
***REMOVED***;
***REMOVED***

export function setParams(params, filters) ***REMOVED***
  return ***REMOVED***
    type: SET_PARAMS,
    params,
    filters,
***REMOVED***;
***REMOVED***

export function submit() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
***REMOVED***;
***REMOVED***
