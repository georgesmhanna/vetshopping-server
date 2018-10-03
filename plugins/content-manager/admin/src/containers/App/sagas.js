import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** fork, put, call, takeLatest, take, cancel, select ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';


import ***REMOVED*** getModelEntriesSucceeded, loadedModels, submitSucceeded ***REMOVED*** from './actions';
import ***REMOVED*** GET_MODEL_ENTRIES, LOAD_MODELS, ON_SUBMIT ***REMOVED*** from './constants';
import ***REMOVED*** makeSelectModifiedSchema ***REMOVED*** from './selectors';

export function* modelEntriesGet(action) ***REMOVED***
  try ***REMOVED***
    const requestUrl = `/content-manager/explorer/$***REMOVED***action.modelName***REMOVED***/count$***REMOVED***action.source !== undefined ? `?source=$***REMOVED***action.source***REMOVED***`: ''***REMOVED***`;
    const response = yield call(request, requestUrl, ***REMOVED*** method: 'GET' ***REMOVED***);

    yield put(getModelEntriesSucceeded(response.count));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('content-manager.error.model.fetch');
***REMOVED***
***REMOVED***

export function* getModels() ***REMOVED***
  try ***REMOVED***
    const response = yield call(request, `/content-manager/models`, ***REMOVED***
      method: 'GET',
***REMOVED***);

    yield put(loadedModels(response));
***REMOVED*** catch (err) ***REMOVED***
    strapi.notification.error('content-manager.error.model.fetch');
***REMOVED***
***REMOVED***

export function* submit() ***REMOVED***
  try ***REMOVED***
    const schema = yield select(makeSelectModifiedSchema());
    yield call(request, '/content-manager/models', ***REMOVED*** method: 'PUT', body: ***REMOVED*** schema ***REMOVED*** ***REMOVED***);

    yield put(submitSucceeded());
***REMOVED*** catch(err) ***REMOVED***
    // Silent
    // NOTE: should we add another notification??
***REMOVED***
***REMOVED***

// Individual exports for testing
export function* defaultSaga() ***REMOVED***
  const loadModelsWatcher = yield fork(takeLatest, LOAD_MODELS, getModels);
  const loadEntriesWatcher = yield fork(takeLatest, GET_MODEL_ENTRIES, modelEntriesGet);
  yield fork(takeLatest, ON_SUBMIT, submit);

  yield take(LOCATION_CHANGE);

  yield cancel(loadModelsWatcher);
  yield cancel(loadedModelsWatcher);
  yield cancel(loadEntriesWatcher);
***REMOVED***

// All sagas to be loaded
export default defaultSaga;
