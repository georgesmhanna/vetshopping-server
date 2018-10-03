import ***REMOVED*** get, includes, isArray, set, omit ***REMOVED*** from 'lodash';
import ***REMOVED*** call, fork, takeLatest, put, select ***REMOVED*** from 'redux-saga/effects';
import auth from 'utils/auth';
import request from 'utils/request';

import ***REMOVED*** makeSelectFormType, makeSelectModifiedData ***REMOVED*** from './selectors';
import ***REMOVED*** hideLoginErrorsInput, submitError, submitSucceeded ***REMOVED*** from './actions';
import ***REMOVED*** SUBMIT ***REMOVED*** from './constants';

export function* submitForm(action) ***REMOVED***
  try ***REMOVED***
    const formType = yield select(makeSelectFormType());
    const body = yield select(makeSelectModifiedData());
    let requestURL;

    switch (formType) ***REMOVED***
      case 'login':
        requestURL = '/auth/local';
        break;
      case 'register':
        requestURL = '/auth/local/register';
        break;
      case 'reset-password':
        requestURL = '/auth/reset-password';
        break;
      case 'forgot-password':
        requestURL = '/auth/forgot-password';
        set(body, 'url', `$***REMOVED***strapi.backendURL***REMOVED***/admin/plugins/users-permissions/auth/reset-password`);
        break;
      default:

***REMOVED***

    const response = yield call(request, requestURL, ***REMOVED*** method: 'POST', body: omit(body, 'news') ***REMOVED***);

    if (response.jwt) ***REMOVED***
      yield call(auth.setToken, response.jwt, body.rememberMe);
      yield call(auth.setUserInfo, response.user, body.rememberMe);
***REMOVED***

    if (formType === 'register') ***REMOVED***
      action.context.updatePlugin('users-permissions', 'hasAdminUser', true);

      if (body.news) ***REMOVED***
        try ***REMOVED***
          yield call(request, 'https://analytics.strapi.io/register', ***REMOVED***
            method: 'POST',
            body: omit(body, ['password', 'confirmPassword']),
    ***REMOVED***);
  ***REMOVED*** catch (e) ***REMOVED***
          // Silent.
  ***REMOVED***
***REMOVED***
***REMOVED***

    yield put(submitSucceeded());
***REMOVED*** catch(error) ***REMOVED***
    const formType = yield select(makeSelectFormType());

    if (isArray(get(error, ['response', 'payload', 'message']))) ***REMOVED***

      const errors = error.response.payload.message.reduce((acc, key) => ***REMOVED***
        const err = key.messages.reduce((acc, key) => ***REMOVED***
          acc.id = `users-permissions.$***REMOVED***key.id***REMOVED***`;

          return acc;
  ***REMOVED*** ***REMOVED*** id: '' ***REMOVED***);

        acc.push(err);

        return acc;
***REMOVED*** []);

      let formErrors;

      switch (formType) ***REMOVED***
        case 'forgot-password':
          formErrors = [***REMOVED*** name: 'email', errors ***REMOVED***];
          break;
        case 'login':
          formErrors = [***REMOVED*** name: 'identifier', errors ***REMOVED***, ***REMOVED*** name: 'password', errors ***REMOVED***];
          yield put(hideLoginErrorsInput(true));
          break;
        case 'reset-password':
          formErrors = [***REMOVED*** name: 'password', errors: [***REMOVED*** id: 'users-permissions.Auth.form.error.password.matching' ***REMOVED***] ***REMOVED***];
          break;
        case 'register': ***REMOVED***
          const target = includes(get(errors, ['0', 'id']), 'username') ? 'username' : 'email';
          formErrors = [***REMOVED*** name: target, errors ***REMOVED***];
          break;
  ***REMOVED***
        default:

***REMOVED***

      yield put(submitError(formErrors));
***REMOVED*** else ***REMOVED***
      strapi.notification.error('notification.error');
***REMOVED***
***REMOVED***
***REMOVED***

export default function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, SUBMIT, submitForm);
***REMOVED***
