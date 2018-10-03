import pluralize from 'pluralize';
import ***REMOVED*** capitalize, findIndex, get, isEmpty, sortBy ***REMOVED*** from 'lodash';
import ***REMOVED*** takeLatest, call, put, fork, select ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';

import ***REMOVED***
  connectionsFetchSucceeded,
  contentTypeActionSucceeded,
  contentTypeFetchSucceeded,
  setButtonLoading,
  unsetButtonLoading,
***REMOVED*** from './actions';

import ***REMOVED***
  CONNECTIONS_FETCH,
  CONTENT_TYPE_EDIT,
  CONTENT_TYPE_FETCH,
***REMOVED*** from './constants';

import ***REMOVED***
  makeSelectInitialDataEdit,
  makeSelectModifiedDataEdit,
***REMOVED*** from './selectors';

export function* editContentType(action) ***REMOVED***
  try ***REMOVED***
    const initialContentType = yield select(makeSelectInitialDataEdit());
    const requestUrl = `/content-type-builder/models/$***REMOVED***initialContentType.name***REMOVED***`;
    const body = yield select(makeSelectModifiedDataEdit());
    const opts = ***REMOVED***
      method: 'PUT',
      body,
***REMOVED***;

    yield put(setButtonLoading());

    const leftMenuContentTypes = get(action.context.plugins.toJS(), ['content-manager', 'leftMenuSections']);
    const leftMenuContentTypesIndex = !isEmpty(leftMenuContentTypes) ? findIndex(get(leftMenuContentTypes[0], 'links'), ['destination', initialContentType.name.toLowerCase()]) : -1;
    const response = yield call(request, requestUrl, opts, true);

    if (response.ok) ***REMOVED***
      yield put(contentTypeActionSucceeded());
      yield put(unsetButtonLoading());

      // Update admin left menu content types section
      if (leftMenuContentTypesIndex !== -1) ***REMOVED***
        const name = body.name.toLowerCase();
        const updatedSectionLink = ***REMOVED***
          destination: name,
          label: capitalize(pluralize(name)),
  ***REMOVED***;

        leftMenuContentTypes[0].links.splice(leftMenuContentTypesIndex, 1, updatedSectionLink);
        leftMenuContentTypes[0].links = sortBy(leftMenuContentTypes[0].links, 'label');
        action.context.updatePlugin('content-manager', 'leftMenuSections', leftMenuContentTypes);
***REMOVED***
      strapi.notification.success('content-type-builder.notification.success.message.contentType.edit');
***REMOVED***
***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error(get(error, ['response', 'payload', 'message'], 'notification.error'));
***REMOVED***
***REMOVED***

export function* fetchConnections() ***REMOVED***
  try ***REMOVED***
    const requestUrl = '/content-type-builder/connections';
    const data = yield call(request, requestUrl, ***REMOVED*** method: 'GET' ***REMOVED***);

    yield put(connectionsFetchSucceeded(data));

***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('content-type-builder.notification.error.message');
***REMOVED***
***REMOVED***

export function* fetchContentType(action) ***REMOVED***
  try ***REMOVED***
    const requestUrl = `/content-type-builder/models/$***REMOVED***action.contentTypeName.split('&source=')[0]***REMOVED***`;
    const params = ***REMOVED******REMOVED***;
    const source = action.contentTypeName.split('&source=')[1];

    if (source) ***REMOVED***
      params.source = source;
***REMOVED***

    const data = yield call(request, requestUrl, ***REMOVED*** method: 'GET', params ***REMOVED***);

    yield put(contentTypeFetchSucceeded(data));

***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('content-type-builder.notification.error.message');
***REMOVED***
***REMOVED***

// Individual exports for testing
function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, CONNECTIONS_FETCH, fetchConnections);
  yield fork(takeLatest, CONTENT_TYPE_EDIT, editContentType);
  yield fork(takeLatest, CONTENT_TYPE_FETCH, fetchContentType);
***REMOVED***

export default defaultSaga;
