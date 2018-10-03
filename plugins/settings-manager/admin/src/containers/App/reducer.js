/*
 *
 * App reducer
 *
 */

import ***REMOVED*** fromJS, List ***REMOVED*** from 'immutable';
import ***REMOVED***
  ENVIRONMENTS_FETCH_SUCCEEDED,
  MENU_FETCH_SUCCEEDED,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  sections: List([]),
  environments: List([]),
  loading: true,
***REMOVED***);

function appReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case ENVIRONMENTS_FETCH_SUCCEEDED:
      return state
        .set('environments', List(action.environments.environments));
    case MENU_FETCH_SUCCEEDED:
      return state.set('sections', List(action.menu.sections)).set('loading', false);
    default:
      return state;
***REMOVED***
***REMOVED***

export default appReducer;
