/*
 *
 * HomePage reducer
 *
 */

import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';
import ***REMOVED***
  DEFAULT_ACTION,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED******REMOVED***);

function homePageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
***REMOVED***
***REMOVED***

export default homePageReducer;
