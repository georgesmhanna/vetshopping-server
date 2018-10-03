import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** get ***REMOVED*** from 'lodash';
import ***REMOVED*** fork, call, put, select, takeLatest, take, cancel ***REMOVED*** from 'redux-saga/effects';
import ***REMOVED*** pluginDeleted ***REMOVED*** from 'containers/App/actions';
import auth from 'utils/auth';
import request from 'utils/request';

import ***REMOVED*** selectLocale ***REMOVED*** from '../LanguageProvider/selectors';
import ***REMOVED*** deletePluginSucceeded, getAppCurrentEnvSucceeded, getPluginsSucceeded ***REMOVED*** from './actions';
import ***REMOVED*** GET_PLUGINS, ON_DELETE_PLUGIN_CONFIRM ***REMOVED*** from './constants';
import ***REMOVED*** makeSelectPluginToDelete ***REMOVED*** from './selectors';

export function* deletePlugin() ***REMOVED***
  try ***REMOVED***
    const plugin = yield select(makeSelectPluginToDelete());

    const requestUrl = `/admin/plugins/uninstall/$***REMOVED***plugin***REMOVED***`;

    const resp = yield call(request, requestUrl, ***REMOVED*** method: 'DELETE' ***REMOVED***);

    if (resp.ok) ***REMOVED***
      yield put(deletePluginSucceeded(plugin));
      yield put(pluginDeleted(plugin));

      if (plugin === 'users-permissions') ***REMOVED***
        auth.clearAppStorage();
***REMOVED***
***REMOVED***

***REMOVED*** catch(error) ***REMOVED***
    yield put(deletePluginSucceeded(false));
    strapi.notification.error('app.components.listPluginsPage.deletePlugin.error');
***REMOVED***
***REMOVED***

export function* pluginsGet() ***REMOVED***
  try ***REMOVED***
    // Fetch plugins.
    const response = yield [
      call(request, '/admin/plugins', ***REMOVED*** method: 'GET' ***REMOVED***),
      call(request, '/admin/currentEnvironment', ***REMOVED*** method: 'GET' ***REMOVED***),
    ];
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
      // Fetch plugins informations.
      availablePlugins = yield call(request, 'https://marketplace.strapi.io/plugins', opts);
***REMOVED*** catch (e) ***REMOVED***
      availablePlugins = [];
***REMOVED***

    // Add logo URL to object.
    Object.keys(response[0].plugins).map(name => ***REMOVED***
      response[0].plugins[name].logo = get(availablePlugins.find(plugin => plugin.id === name), 'logo', '');
***REMOVED***);

    yield put(getPluginsSucceeded(response[0]));
    yield put(getAppCurrentEnvSucceeded(response[1].currentEnvironment));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

// Individual exports for testing
export default function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, ON_DELETE_PLUGIN_CONFIRM, deletePlugin);
  const loadPluginsWatcher = yield fork(takeLatest, GET_PLUGINS, pluginsGet);

  yield take(LOCATION_CHANGE);

  yield cancel(loadPluginsWatcher);
***REMOVED***
