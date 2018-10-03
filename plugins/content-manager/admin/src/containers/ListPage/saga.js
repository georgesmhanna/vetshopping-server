// Dependencies.
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

// Utils.
import request from 'utils/request';

// Actions
import ***REMOVED***
  deleteDataSuccess,
  deleteSeveralDataSuccess,
  getDataSucceeded,
***REMOVED*** from './actions';
// Constants
import ***REMOVED***
  DELETE_DATA,
  DELETE_SEVERAL_DATA,
  GET_DATA,
***REMOVED*** from './constants';
// Selectors
import ***REMOVED***
  makeSelectFilters,
  makeSelectParams,
***REMOVED*** from './selectors';

export function* dataGet(action) ***REMOVED***
  try ***REMOVED***
    const ***REMOVED*** _limit, _page, _sort, _q ***REMOVED*** = yield select(makeSelectParams());
    const filters = yield select(makeSelectFilters());
    const source = action.source;
    const currentModel = action.currentModel;
    const countURL = `/content-manager/explorer/$***REMOVED***currentModel***REMOVED***/count`;
    // Params to get the model's records
    const recordsURL = `/content-manager/explorer/$***REMOVED***currentModel***REMOVED***`;
    const filtersObj = filters.reduce((acc, curr) => ***REMOVED***
      const key = curr.filter === '=' ? curr.attr : `$***REMOVED***curr.attr***REMOVED***$***REMOVED***curr.filter***REMOVED***`;
      const filter = ***REMOVED***
        [key]: curr.value,
***REMOVED***;
      acc = Object.assign(acc, filter);

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    const _start = (_page - 1 ) * _limit;
    const sortValue = _sort.includes('-') ? `$***REMOVED***_sort.replace('-', '')***REMOVED***:DESC` : `$***REMOVED***_sort***REMOVED***:ASC`;
    const params = Object.assign(filtersObj, ***REMOVED***
      _limit,
      _start,
      _sort: sortValue,
      source,
***REMOVED***);

    if (_q !== '') ***REMOVED***
      params._q = _q;
***REMOVED***
    
    const response = yield [
      call(request, countURL, ***REMOVED*** method: 'GET', params ***REMOVED***),
      call(request, recordsURL, ***REMOVED*** method: 'GET', params ***REMOVED***),
    ];

    yield put(getDataSucceeded(response));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

export function* dataDelete(***REMOVED*** id, modelName, source ***REMOVED***) ***REMOVED***
  try ***REMOVED***
    const requestUrl = `/content-manager/explorer/$***REMOVED***modelName***REMOVED***/$***REMOVED***id***REMOVED***`;
    const params = ***REMOVED******REMOVED***;

    if (source !== undefined) ***REMOVED***
      params.source = source;
***REMOVED***

    yield call(request, requestUrl, ***REMOVED***
      method: 'DELETE',
      params,
***REMOVED***);

    strapi.notification.success('content-manager.success.record.delete');

    yield put(deleteDataSuccess(id));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('content-manager.error.record.delete');
***REMOVED***
***REMOVED***

export function* dataDeleteAll(***REMOVED*** entriesToDelete, model, source ***REMOVED***) ***REMOVED***
  try ***REMOVED***
    const params = Object.assign(entriesToDelete, source !== undefined ? ***REMOVED*** source ***REMOVED*** : ***REMOVED******REMOVED***);
    
    yield call(request, `/content-manager/explorer/deleteAll/$***REMOVED***model***REMOVED***`, ***REMOVED***
      method: 'DELETE',
      params,
***REMOVED***);

    yield put(deleteSeveralDataSuccess());
    yield call(dataGet, ***REMOVED*** currentModel: model, source ***REMOVED***);
    strapi.notification.success('content-manager.success.record.delete');
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('content-manager.error.record.delete');
***REMOVED***
***REMOVED***

// All sagas to be loaded
function* defaultSaga() ***REMOVED***
  const loadDataWatcher = yield fork(takeLatest, GET_DATA, dataGet);
  yield fork(takeLatest, DELETE_DATA, dataDelete);
  yield fork(takeLatest, DELETE_SEVERAL_DATA, dataDeleteAll);

  yield take(LOCATION_CHANGE);

  yield cancel(loadDataWatcher);
***REMOVED***

export default defaultSaga;
