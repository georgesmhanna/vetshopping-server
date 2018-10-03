/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

/* eslint-disable */
import './public-path';
import 'babel-polyfill';
/* eslint-disable no-console */
// Import all the third party stuff
import ***REMOVED*** Provider ***REMOVED*** from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import ***REMOVED*** ConnectedRouter ***REMOVED*** from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import ***REMOVED*** merge, isFunction ***REMOVED*** from 'lodash';
import 'sanitize.css/sanitize.css';
import 'whatwg-fetch';

import LanguageProvider from 'containers/LanguageProvider';

import App from 'containers/App';
import ***REMOVED*** showNotification ***REMOVED*** from 'containers/NotificationProvider/actions';
import ***REMOVED***
  freezeApp,
  pluginLoaded,
  unfreezeApp,
  unsetHasUserPlugin,
  updatePlugin,
***REMOVED*** from 'containers/App/actions';

import auth from 'utils/auth';
import configureStore from './store';
import ***REMOVED*** translationMessages, languages ***REMOVED*** from './i18n';
import ***REMOVED*** findIndex ***REMOVED*** from 'lodash';

const plugins = (() => ***REMOVED***
  try ***REMOVED***
    return require('./config/plugins.json');
***REMOVED*** catch (e) ***REMOVED***
    return [];
***REMOVED***
***REMOVED***)();
/* eslint-enable */

// Create redux store with history
const basename = strapi.remoteURL.replace(window.location.origin, '');
const history = createHistory(***REMOVED***
  basename,
***REMOVED***);
const store = configureStore(***REMOVED******REMOVED***, history);

const render = (translatedMessages) => ***REMOVED***
  ReactDOM.render(
    <Provider store=***REMOVED***store***REMOVED***>
      <LanguageProvider messages=***REMOVED***translatedMessages***REMOVED***>
        <ConnectedRouter history=***REMOVED***history***REMOVED***>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
***REMOVED***;

// Hot reloadable translation json files
if (module.hot) ***REMOVED***
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => ***REMOVED***
    render(translationMessages);
***REMOVED***);
***REMOVED***

// Chunked polyfill for browsers without Intl support
window.onload = function onLoad() ***REMOVED***
  if (!window.Intl) ***REMOVED***
    Promise.all([
      System.import('intl'),
      System.import('intl/locale-data/jsonp/en.js'),
      System.import('intl/locale-data/jsonp/fr.js'),
    ]).then(() => render(translationMessages));
***REMOVED*** else ***REMOVED***
    render(translationMessages);
***REMOVED***
***REMOVED***;

// Don't inject plugins in development mode.
if (window.location.port !== '4000') ***REMOVED***
  fetch(`$***REMOVED***strapi.remoteURL***REMOVED***/config/plugins.json`)
    .then(response => ***REMOVED***
      return response.json();
***REMOVED***)
    .then(plugins => ***REMOVED***
      if (findIndex(plugins, ['id', 'users-permissions']) === -1) ***REMOVED***
        store.dispatch(unsetHasUserPlugin());
***REMOVED***

      const $body = document.getElementsByTagName('body')[0];

      (plugins || []).forEach(plugin => ***REMOVED***
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onerror = function (oError) ***REMOVED***
          const source = new URL(oError.target.src);
          const url = new URL(`$***REMOVED***strapi.remoteURL***REMOVED***`);

          if (!source || !url) ***REMOVED***
            throw new Error(`Impossible to load: $***REMOVED***oError.target.src***REMOVED***`);
    ***REMOVED***

          // Remove tag.
          $body.removeChild(script);

          // New attempt with new src.
          const newScript = document.createElement('script');
          newScript.type = 'text/javascript';
          newScript.src = `$***REMOVED***url.origin***REMOVED***$***REMOVED***source.pathname***REMOVED***`;
          $body.appendChild(newScript);
  ***REMOVED***;

        script.src = plugin.source[process.env.NODE_ENV].indexOf('://') === -1 ?
          `$***REMOVED***basename***REMOVED***$***REMOVED***plugin.source[process.env.NODE_ENV]***REMOVED***`.replace('//', '/'): // relative
          plugin.source[process.env.NODE_ENV]; // absolute

        $body.appendChild(script);
***REMOVED***);
***REMOVED***)
    .catch(err => ***REMOVED***
      console.log(err); // eslint-disable-line no-console
***REMOVED***);
***REMOVED*** else if (findIndex(plugins, ['id', 'users-permissions']) === -1) ***REMOVED***
  store.dispatch(unsetHasUserPlugin());
***REMOVED***

// const isPluginAllowedToRegister = (plugin) => true;
const isPluginAllowedToRegister = (plugin) => plugin.id === 'users-permissions' || plugin.id === 'email' || auth.getToken();

/**
 * Register a plugin
 *
 * @param params
 */
const registerPlugin = (plugin) => ***REMOVED***
  // Merge admin translation messages
  merge(translationMessages, plugin.translationMessages);

  plugin.leftMenuSections = plugin.leftMenuSections || [];
  const shouldAllowRegister = isPluginAllowedToRegister(plugin) !== null;

  switch (true) ***REMOVED***
    // Execute bootstrap function and check if plugin can be rendered
    case isFunction(plugin.bootstrap) && isFunction(plugin.pluginRequirements) && shouldAllowRegister:
      plugin.pluginRequirements(plugin)
        .then(plugin => ***REMOVED***
          return plugin.bootstrap(plugin);
  ***REMOVED***)
        .then(plugin => ***REMOVED***
          store.dispatch(pluginLoaded(plugin));
  ***REMOVED***);
      break;
    // Check if plugin can be rendered
    case isFunction(plugin.pluginRequirements):
      plugin.pluginRequirements(plugin).then(plugin => ***REMOVED***
        store.dispatch(pluginLoaded(plugin));
***REMOVED***);
      break;
    // Execute bootstrap function
    case isFunction(plugin.bootstrap) && shouldAllowRegister:
      plugin.bootstrap(plugin).then(plugin => ***REMOVED***
        store.dispatch(pluginLoaded(plugin));
***REMOVED***);
      break;
    default:
      store.dispatch(pluginLoaded(plugin));
***REMOVED***
***REMOVED***;

const displayNotification = (message, status) => ***REMOVED***
  store.dispatch(showNotification(message, status));
***REMOVED***;

const lockApp = () => ***REMOVED***
  store.dispatch(freezeApp());
***REMOVED***;

const unlockApp = () => ***REMOVED***
  store.dispatch(unfreezeApp());
***REMOVED***;

/**
 * Public Strapi object exposed to the `window` object
 */

window.strapi = Object.assign(window.strapi || ***REMOVED******REMOVED***, ***REMOVED***
  mode: process.env.MODE || 'host',
  registerPlugin,
  notification: ***REMOVED***
    success: (message) => ***REMOVED***
      displayNotification(message, 'success');
***REMOVED***,
    warning: (message) => ***REMOVED***
      displayNotification(message, 'warning');
***REMOVED***,
    error: (message) => ***REMOVED***
      displayNotification(message, 'error');
***REMOVED***,
    info: (message) => ***REMOVED***
      displayNotification(message, 'info');
***REMOVED***,
***REMOVED***,
  refresh: (pluginId) => (***REMOVED***
    translationMessages: (translationMessagesUpdated) => ***REMOVED***
      render(merge(***REMOVED******REMOVED***, translationMessages, translationMessagesUpdated));
***REMOVED***,
    leftMenuSections: (leftMenuSectionsUpdated) => ***REMOVED***
      store.dispatch(updatePlugin(pluginId, 'leftMenuSections', leftMenuSectionsUpdated));
***REMOVED***,
***REMOVED***),
  router: history,
  languages,
  currentLanguage: window.localStorage.getItem('strapi-admin-language') ||  window.navigator.language ||  window.navigator.userLanguage || 'en',
  lockApp,
  unlockApp,
***REMOVED***);

const dispatch = store.dispatch;
export ***REMOVED***
  dispatch,
***REMOVED***;
