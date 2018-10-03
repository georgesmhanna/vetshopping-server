import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED***
  capitalize,
  cloneDeep,
  forEach,
  get,
  includes,
  map,
  replace,
  set,
  size,
  sortBy,
  unset,
***REMOVED*** from 'lodash';
import pluralize from 'pluralize';
import ***REMOVED*** takeLatest, call, take, put, fork, cancel, select ***REMOVED*** from 'redux-saga/effects';

import request from 'utils/request';

import ***REMOVED*** temporaryContentTypePosted ***REMOVED*** from 'containers/App/actions';

import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import ***REMOVED*** MODEL_FETCH, SUBMIT ***REMOVED*** from './constants';
import ***REMOVED***
  modelFetchSucceeded,
  postContentTypeSucceeded,
  resetShowButtonsProps,
  setButtonLoader,
  unsetButtonLoader,
  submitActionSucceeded,
***REMOVED*** from './actions';
import ***REMOVED*** makeSelectModel ***REMOVED*** from './selectors';

export function* fetchModel(action) ***REMOVED***
  try ***REMOVED***
    const requestUrl = `/content-type-builder/models/$***REMOVED***action.modelName.split('&source=')[0]***REMOVED***`;
    const params = ***REMOVED******REMOVED***;
    const source = action.modelName.split('&source=')[1];

    if (source) ***REMOVED***
      params.source = source;
***REMOVED***

    const data = yield call(request, requestUrl, ***REMOVED*** method: 'GET', params ***REMOVED***);

    yield put(modelFetchSucceeded(data));

    yield put(unsetButtonLoader());

***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

export function* submitChanges(action) ***REMOVED***
  try ***REMOVED***
    // Show button loader
    yield put(setButtonLoader());
    const modelName = get(storeData.getContentType(), 'name');
    const data = yield select(makeSelectModel());
    const body = cloneDeep(data);

    map(body.attributes, (attribute, index) => ***REMOVED***
      // Remove the connection key from attributes
      if (attribute.connection) ***REMOVED***
        unset(body.attributes[index], 'connection');
***REMOVED***

      forEach(attribute.params, (value, key) => ***REMOVED***
        if (key === 'dominant' && get(attribute.params, 'nature') !== 'manyToMany') ***REMOVED***
          delete body.attributes[index].params.dominant;
  ***REMOVED***

        if (includes(key, 'Value') && key !== 'pluginValue') ***REMOVED***
          // Remove and set needed keys for params
          set(body.attributes[index].params, replace(key, 'Value', ''), value);
          unset(body.attributes[index].params, key);
  ***REMOVED***

        if (key === 'pluginValue' && value) ***REMOVED***
          set(body.attributes[index].params, 'plugin', true);
  ***REMOVED***

        if (!value && key !== 'multiple' && key !== 'default') ***REMOVED***
          const paramsKey = includes(key, 'Value') ? replace(key,'Value', '') : key;
          unset(body.attributes[index].params, paramsKey);
  ***REMOVED***
***REMOVED***);
***REMOVED***);
    const pluginModel = action.modelName.split('&source=')[1];

    if (pluginModel) ***REMOVED***
      set(body, 'plugin', pluginModel);
***REMOVED***

    const method = modelName === body.name ? 'POST' : 'PUT';
    const baseUrl = '/content-type-builder/models/';
    const requestUrl = method === 'POST' ? baseUrl : `$***REMOVED***baseUrl***REMOVED***$***REMOVED***body.name***REMOVED***`;
    const opts = ***REMOVED*** method, body ***REMOVED***;
    const response = yield call(request, requestUrl, opts, true);

    if (response.ok) ***REMOVED***
      if (method === 'POST') ***REMOVED***
        storeData.clearAppStorage();
        yield put(temporaryContentTypePosted(size(get(body, 'attributes'))));
        yield put(postContentTypeSucceeded());

        const leftMenuContentTypes = get(action.context.plugins.toJS(), ['content-manager', 'leftMenuSections']);
        const newContentType = body.name.toLowerCase();

        if (leftMenuContentTypes) ***REMOVED***
          leftMenuContentTypes[0].links.push(***REMOVED*** destination: newContentType, label: capitalize(pluralize(newContentType)) ***REMOVED***);
          leftMenuContentTypes[0].links = sortBy(leftMenuContentTypes[0].links, 'label');
          action.context.updatePlugin('content-manager', 'leftMenuSections', leftMenuContentTypes);
  ***REMOVED***

        strapi.notification.success('content-type-builder.notification.success.message.contentType.create');

***REMOVED*** else ***REMOVED***
        strapi.notification.success('content-type-builder.notification.success.message.contentType.edit');
***REMOVED***

      yield put(submitActionSucceeded());
      yield put(resetShowButtonsProps());
      // Remove loader
      yield put(unsetButtonLoader());
***REMOVED***

***REMOVED*** catch(error) ***REMOVED***
    strapi.notification.error(get(error, ['response', 'payload', 'message', '0', 'messages', '0', 'id'], 'notification.error'));
    yield put(unsetButtonLoader());
***REMOVED***
***REMOVED***

function* defaultSaga() ***REMOVED***
  const loadModelWatcher = yield fork(takeLatest, MODEL_FETCH, fetchModel);
  const loadSubmitChanges = yield fork(takeLatest, SUBMIT, submitChanges);

  yield take(LOCATION_CHANGE);

  yield cancel(loadModelWatcher);
  yield cancel(loadSubmitChanges);
***REMOVED***

export default defaultSaga;
