/**
 *
 * ConfigPage reducer
 *
 */

import ***REMOVED*** fromJS, List, Map ***REMOVED*** from 'immutable';

import ***REMOVED***
  GET_SETTINGS,
  GET_SETTINGS_SUCCEEDED,
  ON_CANCEL,
  ON_CHANGE,
  SET_ERRORS,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  appEnvironments: List([]),
  didCheckErrors: false,
  env: '',
  formErrors: List([]),
  initialData: Map(***REMOVED******REMOVED***),
  modifiedData: Map(***REMOVED******REMOVED***),
  settings: ***REMOVED******REMOVED***,
  submitSuccess: false,
***REMOVED***);

function configPageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case GET_SETTINGS:
      return state.update('env', () => action.env);
    case GET_SETTINGS_SUCCEEDED:
      return state
        .update('appEnvironments', () => List(action.appEnvironments))
        .update('didCheckErrors', (v) => v = !v)
        .update('formErrors', () => List([]))
        .update('initialData', () => Map(action.initialData))
        .update('modifiedData', () => Map(action.initialData))
        .update('settings', () => action.settings);
    case ON_CANCEL:
      return state
        .update('didCheckErrors', (v) => v = !v)
        .update('formErrors', () => List([]))
        .update('modifiedData', () => state.get('initialData'));
    case ON_CHANGE:
      return state
        .updateIn(action.keys, () => action.value);
    case SET_ERRORS:
    case SUBMIT_ERROR:
      return state
        .update('didCheckErrors', (v) => v = !v)
        .update('formErrors', () => List(action.errors));
    case SUBMIT_SUCCEEDED:
      return state
        .update('didCheckErrors', (v) => v = !v)
        .update('formErrors', () => List([]))
        .update('initialData', () => Map(action.data))
        .update('modifiedData', () => Map(action.data))
        .update('submitSuccess', (v) => v = !v);
    default:
      return state;
***REMOVED***
***REMOVED***

export default configPageReducer;
