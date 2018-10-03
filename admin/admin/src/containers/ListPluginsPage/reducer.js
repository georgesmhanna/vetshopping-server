/*
 *
 * ListPluginsPage reducer
 *
 */

import ***REMOVED*** fromJS, Map ***REMOVED*** from 'immutable';
import ***REMOVED***
  DELETE_PLUGIN_SUCCEEDED,
  GET_APP_CURRENT_ENV_SUCCEEDED,
  GET_PLUGINS_SUCCEEDED,
  ON_DELETE_PLUGIN_CLICK,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  currentEnvironment: 'development',
  deleteActionSucceeded: false,
  isLoading: true,
  plugins: Map(***REMOVED******REMOVED***),
  pluginToDelete: '',
***REMOVED***);

function listPluginsPageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case DELETE_PLUGIN_SUCCEEDED: ***REMOVED***
      if (action.plugin) ***REMOVED***
        return state
          .deleteIn(['plugins', action.plugin])
          .set('deleteActionSucceeded', !state.get('deleteActionSucceeded'));
***REMOVED***

      return state
        .set('deleteActionSucceeded', !state.get('deleteActionSucceeded'));
***REMOVED***
    case GET_APP_CURRENT_ENV_SUCCEEDED:
      return state.update('currentEnvironment', () => action.currentEnvironment);
    case GET_PLUGINS_SUCCEEDED:
      return state
        .set('plugins', Map(action.plugins))
        .update('isLoading', () => false);
    case ON_DELETE_PLUGIN_CLICK:
      return state
        .set('pluginToDelete', action.pluginToDelete);
    default:
      return state;
***REMOVED***
***REMOVED***

export default listPluginsPageReducer;
