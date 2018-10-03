import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** findIndex, get, isArray, isEmpty, includes, isNumber, isString, map ***REMOVED*** from 'lodash';
import ***REMOVED***
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
***REMOVED*** from 'redux-saga/effects';

import ***REMOVED*** makeSelectSchema ***REMOVED*** from 'containers/App/selectors';

// Utils.
import cleanData from 'utils/cleanData';
import request from 'utils/request';
import templateObject from 'utils/templateObject';

import ***REMOVED***
  getDataSucceeded,
  setFormErrors,
  setLoader,
  submitSuccess,
  unsetLoader,
***REMOVED*** from './actions';
import ***REMOVED*** GET_DATA, SUBMIT ***REMOVED*** from './constants';
import ***REMOVED***
  makeSelectFileRelations,
  makeSelectIsCreating,
  makeSelectModelName,
  makeSelectRecord,
  makeSelectSource,
***REMOVED*** from './selectors';

function* dataGet(action) ***REMOVED***
  try ***REMOVED***
    const modelName = yield select(makeSelectModelName());
    const params = ***REMOVED*** source: action.source ***REMOVED***;
    const [response] = yield [
      call(request, `/content-manager/explorer/$***REMOVED***modelName***REMOVED***/$***REMOVED***action.id***REMOVED***`, ***REMOVED*** method: 'GET', params ***REMOVED***),
    ];
    const pluginHeaderTitle = yield call(templateObject, ***REMOVED*** mainField: action.mainField ***REMOVED***, response);

    yield put(getDataSucceeded(action.id, response, pluginHeaderTitle.mainField));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('content-manager.error.record.fetch');
***REMOVED***
***REMOVED***

export function* submit() ***REMOVED***
  const currentModelName = yield select(makeSelectModelName());
  const fileRelations = yield select(makeSelectFileRelations());
  const isCreating = yield select(makeSelectIsCreating());
  const record = yield select(makeSelectRecord());
  const source = yield select(makeSelectSource());
  const schema = yield select(makeSelectSchema());
  let shouldAddTranslationSuffix = false;
  // Remove the updated_at & created_at fields so it is updated correctly when using Postgres or MySQL db
  if (record.updated_at) ***REMOVED***
    delete record.created_at;
    delete record.updated_at;
***REMOVED***

  // Remove the updatedAt & createdAt fields so it is updated correctly when using MongoDB
  if (record.updatedAt) ***REMOVED***
    delete record.createdAt;
    delete record.updatedAt;
***REMOVED***

  try ***REMOVED***
    // Show button loader
    yield put(setLoader());
    const recordCleaned = Object.keys(record).reduce((acc, current) => ***REMOVED***
      const attrType = source !== 'content-manager' ? get(schema, ['models', 'plugins', source, currentModelName, 'fields', current, 'type'], null) : get(schema, ['models', currentModelName, 'fields', current, 'type'], null);
      const cleanedData = attrType === 'json' ? record[current] : cleanData(record[current], 'value', 'id');


      if (isString(cleanedData) || isNumber(cleanedData)) ***REMOVED***
        acc.append(current, cleanedData);
***REMOVED*** else if (findIndex(fileRelations, ['name', current]) !== -1) ***REMOVED***
        // Don't stringify the file
        map(record[current], (file) => ***REMOVED***
          if (file instanceof File) ***REMOVED***
            return acc.append(current, file);
    ***REMOVED***

          return acc.append(current, JSON.stringify(file));
  ***REMOVED***);

        if (isEmpty(record[current])) ***REMOVED***
          // Send an empty array if relation is manyToManyMorph else an object
          const data = get(fileRelations, [findIndex(fileRelations, ['name', current]), 'multiple']) ? [] : ***REMOVED******REMOVED***;
          acc.append(current, JSON.stringify(data));
  ***REMOVED***
***REMOVED*** else ***REMOVED***
        acc.append(current,  JSON.stringify(cleanedData));
***REMOVED***

      return acc;
***REMOVED***, new FormData());

    // Helper to visualize FormData
    // for(var pair of recordCleaned.entries()) ***REMOVED***
    //   console.log(pair[0]+ ', '+ pair[1]);
    // ***REMOVED***

    const id = isCreating ? '' : record.id || record._id;
    const params = ***REMOVED*** source ***REMOVED***;
    // Change the request helper default headers so we can pass a FormData
    const headers = ***REMOVED***
      'X-Forwarded-Host': 'strapi',
***REMOVED***;

    const requestUrl = `/content-manager/explorer/$***REMOVED***currentModelName***REMOVED***/$***REMOVED***id***REMOVED***`;

    // Call our request helper (see 'utils/request')
    // Pass false and false as arguments so the request helper doesn't stringify
    // the body and doesn't watch for the server to restart
    yield call(request, requestUrl, ***REMOVED***
      method: isCreating ? 'POST' : 'PUT',
      headers,
      body: recordCleaned,
      params,
***REMOVED***, false, false);

    strapi.notification.success('content-manager.success.record.save');
    // Redirect the user to the ListPage container
    yield put(submitSuccess());

***REMOVED*** catch(err) ***REMOVED***
    if (isArray(err.response.payload.message)) ***REMOVED***
      const errors = err.response.payload.message.reduce((acc, current) => ***REMOVED***
        const error = current.messages.reduce((acc, current) => ***REMOVED***
          if (includes(current.id, 'Auth')) ***REMOVED***
            acc.id = `users-permissions.$***REMOVED***current.id***REMOVED***`;
            shouldAddTranslationSuffix = true;

            return acc;
    ***REMOVED***
          acc.errorMessage = current.id;

          return acc;
  ***REMOVED*** ***REMOVED*** id: 'components.Input.error.custom-error', errorMessage: '' ***REMOVED***);
        acc.push(error);

        return acc;
***REMOVED*** []);

      const name = get(err.response.payload.message, ['0', 'messages', '0', 'field', '0']);

      yield put(setFormErrors([***REMOVED*** name, errors ***REMOVED***]));
***REMOVED***

    const notifErrorPrefix = source === 'users-permissions' && shouldAddTranslationSuffix ? 'users-permissions.' : '';
    strapi.notification.error(`$***REMOVED***notifErrorPrefix***REMOVED***$***REMOVED***get(err.response, ['payload', 'message', '0', 'messages', '0', 'id'], isCreating ? 'content-manager.error.record.create' : 'content-manager.error.record.update')***REMOVED***`);
***REMOVED*** finally ***REMOVED***
    yield put(unsetLoader());
***REMOVED***
***REMOVED***

function* defaultSaga() ***REMOVED***
  const loadDataWatcher = yield fork(takeLatest, GET_DATA, dataGet);
  yield fork(takeLatest, SUBMIT, submit);

  yield take(LOCATION_CHANGE);

  yield cancel(loadDataWatcher);
***REMOVED***

export default defaultSaga;
