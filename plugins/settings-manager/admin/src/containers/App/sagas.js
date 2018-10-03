import ***REMOVED*** takeLatest, call, put, fork, take, cancel ***REMOVED*** from 'redux-saga/effects';

import request from 'utils/request';

import ***REMOVED*** fetchMenuSucceeded, environmentsFetchSucceeded ***REMOVED*** from './actions';
import ***REMOVED*** MENU_FETCH, MENU_FETCH_SUCCEEDED, ENVIRONMENTS_FETCH, ENVIRONMENTS_FETCH_SUCCEEDED ***REMOVED*** from './constants';

export function* fetchMenu() ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
***REMOVED***;

    const requestUrl = '/settings-manager/menu';
    const data = yield call(request, requestUrl, opts);

    yield put(fetchMenuSucceeded(data));

***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***

export function* fetchEnvironments() ***REMOVED***
  try ***REMOVED***
    const opts = ***REMOVED***
      method: 'GET',
***REMOVED***;

    const requestUrl = '/settings-manager/configurations/environments';
    const data  = yield call(request, requestUrl, opts);

    yield put(environmentsFetchSucceeded(data));

***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('settings-manager.strapi.notification.error');
***REMOVED***
***REMOVED***


function* defaultSaga() ***REMOVED***
  const loadMenu = yield fork(takeLatest, MENU_FETCH, fetchMenu);
  const loadEnvironments = yield fork(takeLatest, ENVIRONMENTS_FETCH, fetchEnvironments);
  yield take(MENU_FETCH_SUCCEEDED);
  yield cancel(loadMenu);
  yield take(ENVIRONMENTS_FETCH_SUCCEEDED);
  yield cancel(loadEnvironments);
***REMOVED***

export default defaultSaga;
