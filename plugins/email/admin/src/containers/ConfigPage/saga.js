// import ***REMOVED*** LOCATION_CHANGE ***REMOVED*** from 'react-router-redux';
import ***REMOVED*** call, fork, put, select, takeLatest ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';

import ***REMOVED***
  getSettingsSucceeded,
  submitSucceeded,
***REMOVED*** from './actions';
import ***REMOVED***
  GET_SETTINGS,
  SUBMIT,
***REMOVED*** from './constants';
import ***REMOVED***
  makeSelectEnv,
  makeSelectModifiedData,
***REMOVED*** from './selectors';

export function* settingsGet(action) ***REMOVED***
  try ***REMOVED***
    const requestURL = `/email/settings/$***REMOVED***action.env***REMOVED***`;
    const response = yield [
      call(request, requestURL, ***REMOVED*** method: 'GET' ***REMOVED***),
      call(request, '/email/environments', ***REMOVED*** method: 'GET' ***REMOVED***),
    ];

    yield put(getSettingsSucceeded(response[0], response[1].environments));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

export function* submit() ***REMOVED***
  try ***REMOVED***
    const env = yield select(makeSelectEnv());
    let body = yield select(makeSelectModifiedData());

    if (body.provider === 'local') ***REMOVED***
      body = ***REMOVED***
        enabled: body.enabled,
        provider: 'local',
        sizeLimit: body.sizeLimit,
***REMOVED***;
***REMOVED***
    const requestURL = `/email/settings/$***REMOVED***env***REMOVED***`;
    yield call(request, requestURL, ***REMOVED*** method: 'PUT', body ***REMOVED***);

    // Update reducer with optimisticResponse
    strapi.notification.success('email.notification.config.success');
    yield put(submitSucceeded(body));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
    // TODO handle error PUT
***REMOVED***
***REMOVED***

function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, GET_SETTINGS, settingsGet);
  yield fork(takeLatest, SUBMIT, submit);
***REMOVED***

export default defaultSaga;
