import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED***
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
***REMOVED*** from 'redux-saga/effects';

import request from 'utils/request';

import ***REMOVED*** selectLocale ***REMOVED*** from '../LanguageProvider/selectors';
import ***REMOVED***
  downloadPluginError,
  downloadPluginSucceeded,
  getAvailablePluginsSucceeded,
  getInstalledPluginsSucceeded,
***REMOVED*** from './actions';
import ***REMOVED*** DOWNLOAD_PLUGIN, GET_AVAILABLE_PLUGINS, GET_INSTALLED_PLUGINS ***REMOVED*** from './constants';
import ***REMOVED*** makeSelectPluginToDownload ***REMOVED*** from './selectors';


export function* pluginDownload() ***REMOVED***
  try ***REMOVED***
    const pluginToDownload = yield select(makeSelectPluginToDownload());
    const opts = ***REMOVED***
      method: 'POST',
      body: ***REMOVED***
        plugin: pluginToDownload,
        port: window.location.port,
***REMOVED***
***REMOVED***;
    const response = yield call(request, '/admin/plugins/install', opts, true);

    if (response.ok) ***REMOVED***

      yield new Promise(resolve => ***REMOVED***
        setTimeout(() => ***REMOVED***
          resolve();
  ***REMOVED*** 8000);
***REMOVED***);

      yield put(downloadPluginSucceeded());
      window.location.reload();
***REMOVED***
***REMOVED*** catch(err) ***REMOVED***
    yield put(downloadPluginError());
***REMOVED***
***REMOVED***

export function* getAvailablePlugins() ***REMOVED***
  try ***REMOVED***
    // Get current locale.
    const locale = yield select(selectLocale());

    const opts = ***REMOVED***
      method: 'GET',
      headers: ***REMOVED***
        'Content-Type': 'application/json',
***REMOVED***
      params: ***REMOVED***
        lang: locale,
***REMOVED***
***REMOVED***;

    let availablePlugins;

    try ***REMOVED***
      // Retrieve plugins list.
      availablePlugins = yield call(request, 'https://marketplace.strapi.io/plugins', opts);
***REMOVED*** catch (e) ***REMOVED***
      availablePlugins = [];
***REMOVED***

    yield put(getAvailablePluginsSucceeded(availablePlugins));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

export function* getInstalledPlugins() ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
      headers: ***REMOVED***
        'Content-Type': 'application/json',
***REMOVED***
***REMOVED***;

    let installedPlugins;

    try ***REMOVED***
      // Retrieve plugins list.
      installedPlugins = yield call(request, '/admin/plugins', opts);
***REMOVED*** catch (e) ***REMOVED***
      installedPlugins = [];
***REMOVED***

    yield put(getInstalledPluginsSucceeded(Object.keys(installedPlugins.plugins)));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

// Individual exports for testing
export default function* defaultSaga() ***REMOVED***
  const loadAvailablePluginsWatcher = yield fork(takeLatest, GET_AVAILABLE_PLUGINS, getAvailablePlugins);
  const loadInstalledPluginsWatcher = yield fork(takeLatest, GET_INSTALLED_PLUGINS, getInstalledPlugins);
  yield fork(takeLatest, DOWNLOAD_PLUGIN, pluginDownload);

  yield take(LOCATION_CHANGE);

  yield cancel(loadAvailablePluginsWatcher);
  yield cancel(loadInstalledPluginsWatcher);
***REMOVED***
