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

import ***REMOVED***
  getPermissionsSucceeded,
  getPoliciesSucceeded,
  getRoleSucceeded,
  getRoutesSucceeded,
  getUserSucceeded,
  submitSucceeded,
***REMOVED*** from './actions';

import ***REMOVED***
  GET_PERMISSIONS,
  GET_POLICIES,
  GET_ROLE,
  GET_USER,
  SUBMIT,
***REMOVED*** from './constants';

import ***REMOVED***
  makeSelectActionType,
  makeSelectModifiedData,
  makeSelectRoleId,
***REMOVED*** from './selectors';

export function* fetchUser(action) ***REMOVED***
  try ***REMOVED***
    const data = yield call(request, `/users-permissions/search/$***REMOVED***action.user***REMOVED***`, ***REMOVED*** method: 'GET' ***REMOVED***);

    yield put(getUserSucceeded(data));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('users-permissions.notification.error.fetchUser');
***REMOVED***
***REMOVED***

export function* permissionsGet() ***REMOVED***
  try ***REMOVED***
    const response = yield call(request, '/users-permissions/permissions', ***REMOVED***
      method: 'GET',
      params: ***REMOVED***
        lang: strapi.currentLanguage,
***REMOVED***
***REMOVED***);

    yield put(getPermissionsSucceeded(response));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('users-permissions.EditPage.notification.permissions.error');
***REMOVED***
***REMOVED***

export function* policiesGet() ***REMOVED***
  try ***REMOVED***
    const response = yield [
      call(request, '/users-permissions/policies', ***REMOVED*** method: 'GET' ***REMOVED***),
      call(request, '/users-permissions/routes', ***REMOVED*** method: 'GET' ***REMOVED***),
    ];

    yield put(getPoliciesSucceeded(response[0]));
    yield put(getRoutesSucceeded(response[1]));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('users-permissions.EditPage.notification.policies.error');
***REMOVED***
***REMOVED***

export function* roleGet(action) ***REMOVED***
  try ***REMOVED***
    const role = yield call(request, `/users-permissions/roles/$***REMOVED***action.id***REMOVED***`, ***REMOVED***
      method: 'GET',
      params: ***REMOVED***
        lang: strapi.currentLanguage,
***REMOVED***
***REMOVED***);

    yield put(getRoleSucceeded(role));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('users-permissions.EditPage.notification.role.error');
***REMOVED***
***REMOVED***

export function* submit() ***REMOVED***
  try ***REMOVED***
    const actionType = yield select(makeSelectActionType());
    const body = yield select(makeSelectModifiedData());
    const roleId = yield select(makeSelectRoleId());
    const opts = ***REMOVED***
      method: actionType,
      body,
***REMOVED***;

    const requestURL = actionType === 'POST' ? '/users-permissions/roles' : `/users-permissions/roles/$***REMOVED***roleId***REMOVED***`;
    const response = yield call(request, requestURL, opts);

    if (response.ok) ***REMOVED***
      yield put(submitSucceeded());
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    console.log(error); // eslint-disable-line no-console
***REMOVED***
***REMOVED***

export default function* defaultSaga() ***REMOVED***
  const loadPermissionsWatcher = yield fork(takeLatest, GET_PERMISSIONS, permissionsGet);
  const loadPoliciesWatcher = yield fork(takeLatest, GET_POLICIES, policiesGet);
  const loadRoleWatcher = yield fork(takeLatest, GET_ROLE, roleGet);

  yield fork(takeLatest, GET_USER, fetchUser);
  yield fork(takeLatest, SUBMIT, submit);

  yield take(LOCATION_CHANGE);

  yield cancel(loadPermissionsWatcher);
  yield cancel(loadPoliciesWatcher);
  yield cancel(loadRoleWatcher);
***REMOVED***
