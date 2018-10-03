import ***REMOVED*** takeLatest, call, put, fork ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';
import ***REMOVED*** DELETE_CONTENT_TYPE, MODELS_FETCH ***REMOVED*** from './constants';
import ***REMOVED*** modelsFetchSucceeded ***REMOVED*** from './actions';

export function* deleteContentType(action) ***REMOVED***
  try ***REMOVED***
    if (action.sendRequest) ***REMOVED***
      const requestUrl = `/content-type-builder/models/$***REMOVED***action.itemToDelete***REMOVED***`;
      const response = yield call(request, requestUrl, ***REMOVED*** method: 'DELETE' ***REMOVED***, true);

      if (response.ok && action.updateLeftMenu) ***REMOVED***
        action.updatePlugin('content-manager', 'leftMenuSections', action.leftMenuContentTypes);
        strapi.notification.success('content-type-builder.notification.success.contentTypeDeleted');
***REMOVED***
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('content-type-builder.notification.error.message');
***REMOVED***
***REMOVED***

export function* fetchModels() ***REMOVED***
  try ***REMOVED***
    const requestUrl = '/content-type-builder/models';
    const data = yield call(request, requestUrl, ***REMOVED*** method: 'GET' ***REMOVED***);

    yield put(modelsFetchSucceeded(data));
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('content-type-builder.notification.error.message');
***REMOVED***
***REMOVED***



// Individual exports for testing
function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, DELETE_CONTENT_TYPE, deleteContentType);
  yield fork(takeLatest, MODELS_FETCH, fetchModels);
***REMOVED***

export default defaultSaga;
