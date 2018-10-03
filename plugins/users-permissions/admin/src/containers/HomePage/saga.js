import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** findIndex, get ***REMOVED*** from 'lodash';
import ***REMOVED*** takeLatest, put, fork, take, cancel, select, call ***REMOVED*** from 'redux-saga/effects';

import request from 'utils/request';

import ***REMOVED***
  deleteDataSucceeded,
  fetchDataSucceeded,
  setForm,
  submitSucceeded,
***REMOVED*** from './actions';

import ***REMOVED***
  DELETE_DATA,
  FETCH_DATA,
  SUBMIT,
***REMOVED*** from './constants';

import ***REMOVED***
  makeSelectAllData,
  makeSelectDataToDelete,
  makeSelectDeleteEndPoint,
  makeSelectModifiedData,
***REMOVED*** from './selectors';

export function* dataDelete() ***REMOVED***
  try ***REMOVED***
    const allData = yield select(makeSelectAllData());
    const dataToDelete = yield select(makeSelectDataToDelete());
    const endPointAPI = yield select(makeSelectDeleteEndPoint());
    const indexDataToDelete = findIndex(allData[endPointAPI], ['name', dataToDelete.name]);

    if (indexDataToDelete !== -1) ***REMOVED***
      const id = dataToDelete.id;
      const requestURL = `/users-permissions/$***REMOVED***endPointAPI***REMOVED***/$***REMOVED***id***REMOVED***`;
      const response = yield call(request, requestURL, ***REMOVED*** method: 'DELETE' ***REMOVED***);

      if (response.ok) ***REMOVED***
        yield put(deleteDataSucceeded(indexDataToDelete));
        strapi.notification.success('users-permissions.notification.success.delete');
***REMOVED***
***REMOVED***
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('users-permissions.notification.error.delete');
***REMOVED***
***REMOVED***

export function* dataFetch(action) ***REMOVED***
  try ***REMOVED***
    const response = yield call(request, `/users-permissions/$***REMOVED***action.endPoint***REMOVED***`, ***REMOVED*** method: 'GET' ***REMOVED***);

    if (action.endPoint === 'advanced') ***REMOVED***
      yield put(setForm(response));
***REMOVED*** else ***REMOVED***
      const data = response[action.endPoint] || response;
      yield put(fetchDataSucceeded(data));
***REMOVED***
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('users-permissions.notification.error.fetch');
***REMOVED***
***REMOVED***

export function* submitData(action) ***REMOVED***
  try ***REMOVED***
    const body = yield select(makeSelectModifiedData());
    const opts = ***REMOVED*** method: 'PUT', body: (action.endPoint === 'advanced') ? get(body, ['advanced', 'settings'], ***REMOVED******REMOVED***) : body ***REMOVED***;

    yield call(request, `/users-permissions/$***REMOVED***action.endPoint***REMOVED***`, opts);
    yield put(submitSucceeded());
    strapi.notification.success('users-permissions.notification.success.submit');
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***
// Individual exports for testing
export function* defaultSaga() ***REMOVED***
  const loadDataWatcher = yield fork(takeLatest, FETCH_DATA, dataFetch);

  yield fork(takeLatest, DELETE_DATA, dataDelete);
  yield fork(takeLatest, SUBMIT, submitData);

  yield take(LOCATION_CHANGE);
  yield cancel(loadDataWatcher);
***REMOVED***

// All sagas to be loaded
export default defaultSaga;
