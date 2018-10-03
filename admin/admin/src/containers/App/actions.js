/*
 *
 * LanguageProvider actions
 *
 */

import ***REMOVED***
  FREEZE_APP,
  LOAD_PLUGIN,
  PLUGIN_DELETED,
  PLUGIN_LOADED,
  UNFREEZE_APP,
  UNSET_HAS_USERS_PLUGIN,
  UPDATE_PLUGIN,
***REMOVED*** from './constants';

export function freezeApp() ***REMOVED***
  return ***REMOVED***
    type: FREEZE_APP,
***REMOVED***;
***REMOVED***

export function loadPlugin(newPlugin) ***REMOVED***
  return ***REMOVED***
    type: LOAD_PLUGIN,
    plugin: newPlugin,
***REMOVED***;
***REMOVED***

export function pluginDeleted(plugin) ***REMOVED***
  return ***REMOVED***
    type: PLUGIN_DELETED,
    plugin,
***REMOVED***;
***REMOVED***

export function pluginLoaded(newPlugin) ***REMOVED***
  return ***REMOVED***
    type: PLUGIN_LOADED,
    plugin: newPlugin,
***REMOVED***;
***REMOVED***

export function unfreezeApp() ***REMOVED***
  return ***REMOVED***
    type: UNFREEZE_APP,
***REMOVED***;
***REMOVED***

export function unsetHasUserPlugin() ***REMOVED***
  return ***REMOVED***
    type: UNSET_HAS_USERS_PLUGIN,
***REMOVED***;
***REMOVED***

export function updatePlugin(pluginId, updatedKey, updatedValue) ***REMOVED***
  return ***REMOVED***
    type: UPDATE_PLUGIN,
    pluginId,
    updatedKey,
    updatedValue,
***REMOVED***;
***REMOVED***
