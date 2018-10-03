/*
 *
 * HomePage actions
 *
 */

import ***REMOVED***
  CHANGE_PARAMS,
  DELETE_DATA,
  DELETE_SUCCESS,
  DROP_SUCCESS,
  GET_DATA,
  GET_DATA_SUCCESS,
  ON_DROP,
  ON_SEARCH,
  ON_SEARCH_SUCCESS,
  SET_LOADING,
  SET_PARAMS,
  UNSET_LOADING,
***REMOVED*** from './constants';

export function changeParams(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: CHANGE_PARAMS,
    keys: target.name.split('.'),
    value: target.value,
***REMOVED***;
***REMOVED***

export function deleteData(dataToDelete) ***REMOVED***
  return ***REMOVED***
    type: DELETE_DATA,
    dataToDelete,
***REMOVED***;
***REMOVED***

export function deleteSuccess() ***REMOVED***
  return ***REMOVED***
    type: DELETE_SUCCESS,
***REMOVED***;
***REMOVED***

export function dropSuccess(newFiles) ***REMOVED***
  return ***REMOVED***
    type: DROP_SUCCESS,
    newFiles,
***REMOVED***;
***REMOVED***

export function getData() ***REMOVED***
  return ***REMOVED***
    type: GET_DATA,
***REMOVED***;
***REMOVED***

export function getDataSuccess(data, entriesNumber) ***REMOVED***
  return ***REMOVED***
    type: GET_DATA_SUCCESS,
    data,
    entriesNumber,
***REMOVED***;
***REMOVED***

export function onDrop(***REMOVED*** dataTransfer: ***REMOVED*** files ***REMOVED*** ***REMOVED***) ***REMOVED***
  const formData = Object.keys(files).reduce((acc, current) => ***REMOVED***
    acc.append('files', files[current]);
    return acc;
***REMOVED***, new FormData());

  return ***REMOVED***
    type: ON_DROP,
    formData,
***REMOVED***;
***REMOVED***

export function onSearch(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_SEARCH,
    value: target.value,
***REMOVED***;
***REMOVED***

export function setLoading() ***REMOVED***
  return ***REMOVED***
    type: SET_LOADING,
***REMOVED***;
***REMOVED***

export function setParams(params) ***REMOVED***
  return ***REMOVED***
    type: SET_PARAMS,
    params,
***REMOVED***;
***REMOVED***

export function onSearchSuccess(data) ***REMOVED***
  return ***REMOVED***
    type: ON_SEARCH_SUCCESS,
    data,
***REMOVED***;
***REMOVED***

export function unsetLoading() ***REMOVED***
  return ***REMOVED***
    type: UNSET_LOADING,
***REMOVED***;
***REMOVED***
