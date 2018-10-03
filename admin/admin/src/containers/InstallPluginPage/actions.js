/*
 *
 * InstallPluginPage actions
 *
 */

import ***REMOVED***
  DOWNLOAD_PLUGIN,
  DOWNLOAD_PLUGIN_ERROR,
  DOWNLOAD_PLUGIN_SUCCEEDED,
  GET_AVAILABLE_PLUGINS,
  GET_AVAILABLE_PLUGINS_SUCCEEDED,
  GET_INSTALLED_PLUGINS,
  GET_INSTALLED_PLUGINS_SUCCEEDED,
  ON_CHANGE,
***REMOVED*** from './constants';

export function downloadPlugin(pluginToDownload) ***REMOVED***
  return ***REMOVED***
    type: DOWNLOAD_PLUGIN,
    pluginToDownload,
***REMOVED***;
***REMOVED***

export function downloadPluginError() ***REMOVED***
  return ***REMOVED***
    type: DOWNLOAD_PLUGIN_ERROR,
***REMOVED***;
***REMOVED***

export function downloadPluginSucceeded() ***REMOVED***
  return ***REMOVED***
    type: DOWNLOAD_PLUGIN_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function getAvailablePlugins() ***REMOVED***
  return ***REMOVED***
    type: GET_AVAILABLE_PLUGINS,
***REMOVED***;
***REMOVED***

export function getAvailablePluginsSucceeded(availablePlugins) ***REMOVED***
  return ***REMOVED***
    type: GET_AVAILABLE_PLUGINS_SUCCEEDED,
    availablePlugins,
***REMOVED***;
***REMOVED***

export function getInstalledPlugins() ***REMOVED***
  return ***REMOVED***
    type: GET_INSTALLED_PLUGINS,
***REMOVED***;
***REMOVED***

export function getInstalledPluginsSucceeded(installedPlugins) ***REMOVED***
  return ***REMOVED***
    type: GET_INSTALLED_PLUGINS_SUCCEEDED,
    installedPlugins,
***REMOVED***;
***REMOVED***

export function onChange(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_CHANGE,
    keys: target.name.split('.'),
    value: target.value,
***REMOVED***;
***REMOVED***
