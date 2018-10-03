import ***REMOVED*** fork, call, put, takeLatest ***REMOVED*** from 'redux-saga/effects';
import request from 'utils/request';

import ***REMOVED***
  getCurrEnvSucceeded,
  getGaStatusSucceeded,
  getLayoutSucceeded,
  getStrapiVersionSucceeded,
***REMOVED*** from './actions';
import ***REMOVED*** GET_GA_STATUS, GET_LAYOUT ***REMOVED*** from './constants';

function* getGaStatus() ***REMOVED***
  try ***REMOVED***
    const [***REMOVED*** allowGa ***REMOVED***, ***REMOVED*** strapiVersion ***REMOVED***, ***REMOVED*** currentEnvironment ***REMOVED***] = yield [
      call(request, '/admin/gaConfig', ***REMOVED*** method: 'GET' ***REMOVED***),
      call(request, '/admin/strapiVersion', ***REMOVED*** method: 'GET' ***REMOVED***),
      call(request, '/admin/currentEnvironment', ***REMOVED*** method: 'GET' ***REMOVED***),
    ];

    yield put(getCurrEnvSucceeded(currentEnvironment));
    yield put(getGaStatusSucceeded(allowGa));
    yield put(getStrapiVersionSucceeded(strapiVersion));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***

function* getLayout() ***REMOVED***
  try ***REMOVED***
    const layout = yield call(request, '/admin/layout', ***REMOVED*** method: 'GET' ***REMOVED***);
    yield put(getLayoutSucceeded(layout));
***REMOVED*** catch(err) ***REMOVED***
    strapi.notification.error('notification.error.layout');
***REMOVED***
***REMOVED***

function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, GET_GA_STATUS, getGaStatus);
  yield fork(takeLatest, GET_LAYOUT, getLayout);
***REMOVED***

export default defaultSaga;
