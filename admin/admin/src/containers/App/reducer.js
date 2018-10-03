// Shared constants
import ***REMOVED***
  DISABLE_GLOBAL_OVERLAY_BLOCKER,
  ENABLE_GLOBAL_OVERLAY_BLOCKER,
***REMOVED*** from 'constants/overlayBlocker';

import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';

import ***REMOVED***
  FREEZE_APP,
  PLUGIN_DELETED,
  PLUGIN_LOADED,
  UNFREEZE_APP,
  UNSET_HAS_USERS_PLUGIN,
  UPDATE_PLUGIN,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  blockApp: false,
  hasUserPlugin: true,
  plugins: ***REMOVED******REMOVED***,
  showGlobalAppBlocker: true,
***REMOVED***);

function appReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case DISABLE_GLOBAL_OVERLAY_BLOCKER:
      return state.set('showGlobalAppBlocker', false);
    case ENABLE_GLOBAL_OVERLAY_BLOCKER:
      return state.set('showGlobalAppBlocker', true);
    case FREEZE_APP:
      return state.set('blockApp', true);
    case PLUGIN_LOADED:
      return state.setIn(['plugins', action.plugin.id], fromJS(action.plugin));
    case UPDATE_PLUGIN:
      return state.setIn(['plugins', action.pluginId, action.updatedKey], fromJS(action.updatedValue));
    case PLUGIN_DELETED:
      return state.deleteIn(['plugins', action.plugin]);
    case UNFREEZE_APP:
      return state.set('blockApp', false);
    case UNSET_HAS_USERS_PLUGIN:
      return state.set('hasUserPlugin', false);
    default:
      return state;
***REMOVED***
***REMOVED***

export default appReducer;
