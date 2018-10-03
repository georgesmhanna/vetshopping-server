/**
 * Combine all reducers in this file and export the combined reducers.
 */

import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';
import ***REMOVED*** combineReducers ***REMOVED*** from 'redux-immutable';
import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import notificationProviderReducer from 'containers/NotificationProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS(***REMOVED***
  location: null,
***REMOVED***);

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge(***REMOVED***
        location: action.payload,
***REMOVED***);
    default:
      return state;
***REMOVED***
***REMOVED***

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) ***REMOVED***
  return combineReducers(***REMOVED***
    route: routeReducer,
    app: globalReducer,
    language: languageProviderReducer,
    notification: notificationProviderReducer,
    ...injectedReducers,
***REMOVED***);
***REMOVED***
