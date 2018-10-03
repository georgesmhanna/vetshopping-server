import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** forEach, set, map, replace ***REMOVED*** from 'lodash';
import ***REMOVED*** call, take, put, fork, cancel, select, takeLatest ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';

// selectors
import ***REMOVED*** makeSelectModifiedData ***REMOVED*** from './selectors';

import ***REMOVED***
  CONFIG_FETCH,
  EDIT_SETTINGS,
  LANGUAGE_DELETE,
  LANGUAGES_FETCH,
  NEW_LANGUAGE_POST,
  DATABASES_FETCH,
  NEW_DATABASE_POST,
  DATABASE_DELETE,
  SPECIFIC_DATABASE_FETCH,
  DATABASE_EDIT,
***REMOVED*** from './constants';

import ***REMOVED***
  configFetchSucceded,
  databasesFetchSucceeded,
  editSettingsSucceeded,
  languagesFetchSucceeded,
  languageActionError,
  languageActionSucceeded,
  databaseActionSucceeded,
  specificDatabaseFetchSucceeded,
  databaseActionError,
  unsetLoader,
  setLoader,
***REMOVED*** from './actions';

/* eslint-disable no-template-curly-in-string */

export function* editDatabase(action) ***REMOVED***
  try ***REMOVED***
    const body = ***REMOVED******REMOVED***;

    forEach(action.data, (value, key) => ***REMOVED***
      set(body, key, value);
***REMOVED***);

    const opts = ***REMOVED***
      method: 'PUT',
      body,
***REMOVED***;
    const requestUrl = `/settings-manager/configurations/databases/$***REMOVED***action.apiUrl***REMOVED***`;

    const resp = yield call(request, requestUrl, opts, true);

    if (resp.ok) ***REMOVED***
      strapi.notification.success('settings-manager.strapi.notification.success.databaseEdit');
      yield put(databaseActionSucceeded());
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    const formErrors = map(error.response.payload.message, err => (***REMOVED*** target: err.target, errors: map(err.messages, mess => (***REMOVED*** id: `settings-manager.$***REMOVED***mess.id***REMOVED***`***REMOVED***)) ***REMOVED***));

    yield put(databaseActionError(formErrors));
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* deleteDatabase(action) ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED*** method: 'DELETE' ***REMOVED***;
    const requestUrl = `/settings-manager/configurations/databases/$***REMOVED***action.databaseToDelete***REMOVED***/$***REMOVED***action.endPoint***REMOVED***`;

    const resp = yield call(request, requestUrl, opts, true);

    if (resp.ok) ***REMOVED***
      yield call(action.context.disableGlobalOverlayBlocker);
      strapi.notification.success('settings-manager.strapi.notification.success.databaseDeleted');
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    yield call(action.context.disableGlobalOverlayBlocker);
    yield put(databaseActionError([]));
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* deleteLanguage(action) ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'DELETE',
***REMOVED***;
    const requestUrl = `/settings-manager/configurations/languages/$***REMOVED***action.languageToDelete***REMOVED***`;
    const resp = yield call(request, requestUrl, opts, true);

    if (resp.ok) ***REMOVED***
      strapi.notification.success('settings-manager.strapi.notification.success.languageDelete');
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    yield put(languageActionError());
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* fetchConfig(action) ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
***REMOVED***;
    const requestUrl = `/settings-manager/configurations/$***REMOVED***action.endPoint***REMOVED***`;

    const data = yield call(request, requestUrl, opts);
    yield put(configFetchSucceded(data));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***


export function* fetchDatabases(action) ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
***REMOVED***;
    const requestUrlListDatabases = `/settings-manager/configurations/databases/$***REMOVED***action.environment***REMOVED***`;
    const requestUrlAppDatabases = '/settings-manager/configurations/database/model';

    const [listDatabasesData, appDatabaseData] = yield [
      call(request, requestUrlListDatabases, opts),
      call(request, requestUrlAppDatabases, opts),
    ];
    yield put(databasesFetchSucceeded(listDatabasesData, appDatabaseData));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* fetchLanguages() ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
***REMOVED***;
    const requestUrlAppLanguages = '/settings-manager/configurations/languages';
    const requestUrlListLanguages = '/settings-manager/configurations/i18n';

    const [appLanguagesData, listLanguagesData] = yield [
      call(request, requestUrlAppLanguages, opts),
      call(request, requestUrlListLanguages, opts),
    ];
    yield put(languagesFetchSucceeded(appLanguagesData, listLanguagesData));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* postLanguage() ***REMOVED***
  try ***REMOVED***
    const newLanguage = yield select(makeSelectModifiedData());
    const body = ***REMOVED***
      name: newLanguage['language.defaultLocale'],
***REMOVED***;
    const opts = ***REMOVED***
      body,
      method: 'POST',
***REMOVED***;
    const requestUrl = '/settings-manager/configurations/languages';
    const resp = yield call(request, requestUrl, opts, true);

    if (resp.ok) ***REMOVED***
      yield put(languageActionSucceeded());
      strapi.notification.success('settings-manager.strapi.notification.success.languageAdd');
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    yield put(languageActionError());
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* postDatabase(action) ***REMOVED***
  try ***REMOVED***
    const body = ***REMOVED******REMOVED***;

    forEach(action.data, (value, key) => ***REMOVED***
      set(body, key, value);
***REMOVED***);

    const opts = ***REMOVED***
      method: 'POST',
      body,
***REMOVED***;
    const requestUrl = `/settings-manager/configurations/databases/$***REMOVED***action.endPoint***REMOVED***`;
    const resp = yield call(request, requestUrl, opts, true);

    if (resp.ok) ***REMOVED***
      yield put(databaseActionSucceeded());
      strapi.notification.success('settings-manager.strapi.notification.success.databaseAdd');
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    const formErrors = map(error.response.payload.message, (err) => ***REMOVED***
      const target = err.target ? replace(err.target, err.target.split('.')[2], '$***REMOVED***name***REMOVED***') : 'database.connections.$***REMOVED***name***REMOVED***.name';
      return (
        ***REMOVED*** target, errors: map(err.messages, mess => (***REMOVED*** id: `settings-manager.$***REMOVED***mess.id***REMOVED***`***REMOVED***)) ***REMOVED***
      );
***REMOVED***);

    yield put(databaseActionError(formErrors));
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* settingsEdit(action) ***REMOVED***
  try ***REMOVED***
    // Show button loader
    yield put(setLoader());

    const opts = ***REMOVED***
      body: action.newSettings,
      method: 'PUT',
***REMOVED***;
    const requestUrl = `/settings-manager/configurations/$***REMOVED***action.endPoint***REMOVED***`;
    const resp = yield  call(request, requestUrl, opts, true);

    if (resp.ok) ***REMOVED***
      yield put(editSettingsSucceeded());
      strapi.notification.success('settings-manager.strapi.notification.success.settingsEdit');
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED*** finally ***REMOVED***
    yield put(unsetLoader());
***REMOVED***
***REMOVED***

export function* fetchSpecificDatabase(action) ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
***REMOVED***;
    const requestUrl = `/settings-manager/configurations/databases/$***REMOVED***action.databaseName***REMOVED***/$***REMOVED***action.endPoint***REMOVED***`;
    const data = yield call(request, requestUrl, opts);

    yield put(specificDatabaseFetchSucceeded(data));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

// Individual exports for testing
export function* defaultSaga() ***REMOVED***
  const loadConfigWatcher = yield fork(takeLatest, CONFIG_FETCH, fetchConfig);
  const loadLanguagesWatcher = yield fork(takeLatest, LANGUAGES_FETCH, fetchLanguages);
  const editConfigWatcher = yield fork(takeLatest, EDIT_SETTINGS, settingsEdit);
  const postLanguageWatcher = yield fork(takeLatest, NEW_LANGUAGE_POST, postLanguage);
  const deleteLanguageWatcher = yield fork(takeLatest, LANGUAGE_DELETE, deleteLanguage);
  const loadDatabasesWatcher = yield fork(takeLatest, DATABASES_FETCH, fetchDatabases);
  const postDatabaseWatcher = yield fork(takeLatest, NEW_DATABASE_POST, postDatabase);
  const deleteDatabaseWatcher = yield fork(takeLatest, DATABASE_DELETE, deleteDatabase);
  const fetchSpecificDatabaseWatcher = yield fork(takeLatest, SPECIFIC_DATABASE_FETCH, fetchSpecificDatabase);
  const editDatabaseWatcher = yield fork(takeLatest, DATABASE_EDIT, editDatabase);

  yield take(LOCATION_CHANGE);
  yield cancel(loadConfigWatcher);
  yield cancel(loadLanguagesWatcher);
  yield cancel(editConfigWatcher);
  yield cancel(postLanguageWatcher);
  yield cancel(deleteLanguageWatcher);
  yield cancel(loadDatabasesWatcher);
  yield cancel(postDatabaseWatcher);
  yield cancel(deleteDatabaseWatcher);
  yield cancel(fetchSpecificDatabaseWatcher);
  yield cancel(editDatabaseWatcher);
***REMOVED***

// All sagas to be loaded
export default defaultSaga;
