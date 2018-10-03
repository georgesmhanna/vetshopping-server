/*
 *
 * HomePage actions
 *
 */
import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';
import ***REMOVED*** isArray ***REMOVED*** from 'lodash';
import ***REMOVED***
  CANCEL_CHANGES,
  DELETE_DATA,
  DELETE_DATA_SUCCEEDED,
  FETCH_DATA,
  FETCH_DATA_SUCCEEDED,
  ON_CHANGE,
  RESET_PROPS,
  SET_DATA_TO_EDIT,
  SET_FORM,
  SET_FORM_ERRORS,
  SUBMIT,
  SUBMIT_SUCCEEDED,
  UNSET_DATA_TO_EDIT,
***REMOVED*** from './constants';

export function cancelChanges() ***REMOVED***
  return ***REMOVED***
    type: CANCEL_CHANGES,
***REMOVED***;
***REMOVED***

export function deleteData(dataToDelete, deleteEndPoint) ***REMOVED***
  return ***REMOVED***
    type: DELETE_DATA,
    dataToDelete,
    deleteEndPoint,
***REMOVED***;
***REMOVED***

export function deleteDataSucceeded(indexDataToDelete) ***REMOVED***
  return ***REMOVED***
    type: DELETE_DATA_SUCCEEDED,
    indexDataToDelete,
***REMOVED***;
***REMOVED***

export function fetchData(endPoint) ***REMOVED***
  return ***REMOVED***
    type: FETCH_DATA,
    endPoint,
***REMOVED***;
***REMOVED***

export function fetchDataSucceeded(data) ***REMOVED***
  if (!isArray(data)) ***REMOVED***
    const list = Object.keys(data).reduce((acc, current) => ***REMOVED***
      const obj = Object.assign(***REMOVED*** name: current***REMOVED***, data[current]);
      acc.push(obj);

      return acc;
***REMOVED***, []);

    return ***REMOVED***
      type: FETCH_DATA_SUCCEEDED,
      data: list,
      modifiedData: fromJS(data),
***REMOVED***;
***REMOVED***

  return ***REMOVED***
    type: FETCH_DATA_SUCCEEDED,
    data,
    modifiedData: fromJS(***REMOVED******REMOVED***),
***REMOVED***;
***REMOVED***

export function onChange(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_CHANGE,
    keys: ['modifiedData'].concat(target.name.split('.')),
    value: target.value,
***REMOVED***;
***REMOVED***

export function resetProps() ***REMOVED***
  return ***REMOVED***
    type: RESET_PROPS,
***REMOVED***;
***REMOVED***

export function setDataToEdit(dataToEdit) ***REMOVED***
  return ***REMOVED***
    type: SET_DATA_TO_EDIT,
    dataToEdit,
***REMOVED***;
***REMOVED***

export function setForm(data) ***REMOVED***
  return ***REMOVED***
    type: SET_FORM,
    form: fromJS(data),
***REMOVED***;
***REMOVED***

export function setFormErrors(formErrors) ***REMOVED***
  return ***REMOVED***
    type: SET_FORM_ERRORS,
    formErrors,
***REMOVED***;
***REMOVED***

export function submit(endPoint) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
    endPoint,
***REMOVED***;
***REMOVED***

export function submitSucceeded() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function unsetDataToEdit() ***REMOVED***
  return ***REMOVED***
    type: UNSET_DATA_TO_EDIT,
***REMOVED***;
***REMOVED***
