/**
 *
 * AdminPage reducer
 *
 */

import ***REMOVED*** fromJS, Map ***REMOVED*** from 'immutable';

import ***REMOVED***
  GET_CURR_ENV_SUCCEEDED,
  GET_GA_STATUS_SUCCEEDED,
  GET_LAYOUT_SUCCEEDED,
  GET_STRAPI_VERSION_SUCCEEDED,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  allowGa: true,
  currentEnvironment: 'development',
  isLoading: true,
  layout: Map(***REMOVED******REMOVED***),
  strapiVersion: '3',
***REMOVED***);

function adminPageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case GET_CURR_ENV_SUCCEEDED:
      return state
        .update('isLoading', () => false)
        .update('currentEnvironment', () => action.currentEnvironment);
    case GET_GA_STATUS_SUCCEEDED:
      return state.update('allowGa', () => action.allowGa);
    case GET_LAYOUT_SUCCEEDED:
      return state.update('layout', () => Map(action.layout));
    case GET_STRAPI_VERSION_SUCCEEDED:
      return state.update('strapiVersion', () => action.strapiVersion);
    default:
      return state;
***REMOVED***
***REMOVED***

export default adminPageReducer;
