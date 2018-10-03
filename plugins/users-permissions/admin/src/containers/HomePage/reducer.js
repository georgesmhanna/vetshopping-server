/*
 *
 * HomePage reducer
 *
 */

import ***REMOVED*** fromJS, List, Map ***REMOVED*** from 'immutable';

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
  SUBMIT_SUCCEEDED,
  UNSET_DATA_TO_EDIT,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  data: fromJS(***REMOVED******REMOVED***),
  dataToDelete: Map(***REMOVED******REMOVED***),
  dataToEdit: '',
  deleteEndPoint: '',
  didCheckErrors: false,
  formErrors: List([]),
  initialData: Map(***REMOVED******REMOVED***),
  isLoading: true,
  modifiedData: Map(***REMOVED******REMOVED***),
  showButtons: false,
  didDeleteData: false,
  endPoint: 'roles',
***REMOVED***);

function homePageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case CANCEL_CHANGES:
      return state
        .set('formErrors', List([]))
        .update('modifiedData', () => state.get('initialData'));
    case DELETE_DATA:
      return state
        .set('dataToDelete', Map(action.dataToDelete))
        .set('deleteEndPoint', action.deleteEndPoint);
    case DELETE_DATA_SUCCEEDED:
      return state
        .updateIn(['data', state.get('endPoint')], list => list.splice(action.indexDataToDelete, 1))
        .set('deleteEndPoint', '')
        .set('dataToDelete', Map(***REMOVED******REMOVED***))
        .update('didDeleteData', (v) => !v);
    case FETCH_DATA:
      return state
        .update('endPoint', () => action.endPoint)
        .update('isLoading', () => true);
    case FETCH_DATA_SUCCEEDED:
      return state
        .updateIn(['data', state.get('endPoint')], () => List(action.data))
        .updateIn(['initialData', state.get('endPoint')], () => action.modifiedData)
        .update('isLoading', () => false)
        .updateIn(['modifiedData', state.get('endPoint')], () => action.modifiedData);
    case ON_CHANGE:
      return state
        .updateIn(action.keys, () => action.value);
    case RESET_PROPS:
      return initialState
        .update('data', () => state.get('data'))
        .update('initialData', () => state.get('initialData'))
        .update('modifiedData', () => state.get('modifiedData'))
        .update('endPoint', () => 'roles');
    case SET_DATA_TO_EDIT:
      return state.update('dataToEdit', () => action.dataToEdit);
    case SET_FORM:
      return state
        .set('formErrors', List([]))
        .updateIn(['initialData', state.get('endPoint')], () => action.form)
        .updateIn(['modifiedData', state.get('endPoint')], () => action.form);
    case SET_FORM_ERRORS:
      return state
        .update('didCheckErrors', (v) => v = !v)
        .set('formErrors', List(action.formErrors));
    case SUBMIT_SUCCEEDED:
      return state
        .set('formErrors', List([]))
        .update('dataToEdit', () => '')
        .update('initialData', () => state.get('modifiedData'));
    case UNSET_DATA_TO_EDIT:
      return state
        .set('formErrors', List([]))
        .update('dataToEdit', () => '')
        .update('modifiedData', () => state.get('initialData'));
    default:
      return state;
***REMOVED***
***REMOVED***

export default homePageReducer;
