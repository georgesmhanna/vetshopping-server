/*
 *
 * AuthPage reducer
 *
 */

import ***REMOVED*** fromJS, List, Map ***REMOVED*** from 'immutable';
import ***REMOVED***
  HIDE_LOGIN_ERRORS_INPUT,
  ON_CHANGE_INPUT,
  SET_ERRORS,
  SET_FORM,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  didCheckErrors: false,
  formErrors: List([]),
  formType: 'login',
  noErrorsDescription: false,
  modifiedData: Map(***REMOVED******REMOVED***),
  submitSuccess: false,
***REMOVED***);

function authPageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case HIDE_LOGIN_ERRORS_INPUT:
      return state.set('noErrorsDescription', action.value);
    case ON_CHANGE_INPUT:
      return state
        .updateIn(['modifiedData', action.key], () => action.value);
    case SET_ERRORS:
    case SUBMIT_ERROR:
      return state
        .set('didCheckErrors', !state.get('didCheckErrors'))
        .set('formErrors', List(action.formErrors));
    case SET_FORM:
      return state
        .set('formErrors', List([]))
        .set('noErrorsDescription', false)
        .set('formType', action.formType)
        .set('submitSuccess', false)
        .set('modifiedData', Map(action.data));
    case SUBMIT_SUCCEEDED:
      return state
        .set('noErrorsDescription', false)
        .set('submitSuccess', true);
    default:
      return state;
***REMOVED***
***REMOVED***

export default authPageReducer;
