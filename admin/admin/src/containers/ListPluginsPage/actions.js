/*
 *
 * ListPluginsPage actions
 *
 */

import ***REMOVED***
  GET_APP_CURRENT_ENV_SUCCEEDED,
  GET_PLUGINS,
  GET_PLUGINS_SUCCEEDED,
  ON_DELETE_PLUGIN_CLICK,
  ON_DELETE_PLUGIN_CONFIRM,
  DELETE_PLUGIN_SUCCEEDED,
***REMOVED*** from './constants';

export function getAppCurrentEnvSucceeded(currentEnvironment) ***REMOVED***
  return ***REMOVED***
    type: GET_APP_CURRENT_ENV_SUCCEEDED,
    currentEnvironment,
***REMOVED***;
***REMOVED***

export function getPlugins() ***REMOVED***
  return ***REMOVED***
    type: GET_PLUGINS,
***REMOVED***;
***REMOVED***

export function getPluginsSucceeded(***REMOVED*** plugins ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: GET_PLUGINS_SUCCEEDED,
    plugins,
***REMOVED***;
***REMOVED***

export function onDeletePluginClick(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_DELETE_PLUGIN_CLICK,
    pluginToDelete: target.id,
***REMOVED***;
***REMOVED***

export function onDeletePluginConfirm() ***REMOVED***
  return ***REMOVED***
    type: ON_DELETE_PLUGIN_CONFIRM,
***REMOVED***;
***REMOVED***

export function deletePluginSucceeded(plugin) ***REMOVED***
  return ***REMOVED***
    type: DELETE_PLUGIN_SUCCEEDED,
    plugin,
***REMOVED***;
***REMOVED***
