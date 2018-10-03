import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** Map ***REMOVED*** from 'immutable';
import ***REMOVED*** isEmpty ***REMOVED*** from 'lodash';
import ***REMOVED*** call, fork, put, select, take, takeLatest ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';

import ***REMOVED***
  deleteSuccess,
  dropSuccess,
  getDataSuccess,
  onSearchSuccess,
  setLoading,
  unsetLoading,
***REMOVED*** from './actions';
import ***REMOVED***
  DELETE_DATA,
  GET_DATA,
  ON_DROP,
  ON_SEARCH,
***REMOVED*** from './constants';
import ***REMOVED***
  makeSelectParams,
  makeSelectSearch,
***REMOVED*** from './selectors';

function* dataDelete(action) ***REMOVED***
  try ***REMOVED***
    const dataId = action.dataToDelete.id || action.dataToDelete._id;
    const requestURL = `/upload/files/$***REMOVED***dataId***REMOVED***`;
    yield call(request, requestURL, ***REMOVED*** method: 'DELETE' ***REMOVED***);
    yield put(deleteSuccess());
    strapi.notification.success('upload.notification.delete.success');
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

function* dataGet() ***REMOVED***
  try ***REMOVED***
    const pageParams = yield select(makeSelectParams());
    const _start = ( pageParams._page - 1) * pageParams._limit;
    const params = ***REMOVED***
      _limit: pageParams._limit,
      _sort: pageParams._sort,
      _start,
***REMOVED***;
    const data = yield [
      call(request, '/upload/files', ***REMOVED*** method: 'GET', params ***REMOVED***),
      call(request, '/upload/files/count', ***REMOVED*** method: 'GET' ***REMOVED***),
    ];
    const entries = data[0].length === 0 ? [] : data[0].map(obj => Map(obj));
    yield put(getDataSuccess(entries, data[1].count));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

function* uploadFiles(action) ***REMOVED***
  try ***REMOVED***
    yield put(setLoading());
    const headers = ***REMOVED***
      'X-Forwarded-Host': 'strapi',
***REMOVED***;
    const response = yield call(request, '/upload', ***REMOVED*** method: 'POST', headers, body: action.formData ***REMOVED***, false, false);
    const newFiles = response.map(file => Map(file));

    yield put(dropSuccess(newFiles));

    if (newFiles.length > 1) ***REMOVED***
      strapi.notification.success(***REMOVED*** id: 'upload.notification.dropFile.success' ***REMOVED***);
***REMOVED*** else ***REMOVED***
      strapi.notification.success(***REMOVED*** id: 'upload.notification.dropFiles.success', values: ***REMOVED*** number: newFiles.length ***REMOVED*** ***REMOVED***);
***REMOVED***

***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED*** finally ***REMOVED***
    yield put(unsetLoading());
***REMOVED***
***REMOVED***

function* search() ***REMOVED***
  try ***REMOVED***
    const search = yield select(makeSelectSearch());
    const pageParams = yield select(makeSelectParams());
    const _start = ( pageParams._page - 1) * pageParams._limit;
    const requestURL = !isEmpty(search) ? `/upload/search/$***REMOVED***search***REMOVED***` : '/upload/files';
    const params = isEmpty(search) ? ***REMOVED***
      _limit: pageParams._limit,
      _sort: pageParams._sort,
      _start,
***REMOVED*** : ***REMOVED******REMOVED***;
    const response = yield call(request, requestURL, ***REMOVED*** method: 'GET', params ***REMOVED***);
    const entries = response.length === 0 ? [] : response.map(obj => Map(obj));

    yield put(onSearchSuccess(entries));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***


// Individual exports for testing
export function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, DELETE_DATA, dataDelete);
  yield fork(takeLatest, ON_DROP, uploadFiles);
  yield fork(takeLatest, ON_SEARCH, search);

  const loadDataWatcher = yield fork(takeLatest, GET_DATA, dataGet);

  yield take(LOCATION_CHANGE);

  yield cancel(loadDataWatcher);
***REMOVED***

// All sagas to be loaded
export default defaultSaga;
