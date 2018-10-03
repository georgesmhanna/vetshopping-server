/*
 *
 * AuthPage actions
 *
 */

import ***REMOVED***
  HIDE_LOGIN_ERRORS_INPUT,
  ON_CHANGE_INPUT,
  SET_ERRORS,
  SET_FORM,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

export function hideLoginErrorsInput(value) ***REMOVED***
  return ***REMOVED***
    type: HIDE_LOGIN_ERRORS_INPUT,
    value,
***REMOVED***;
***REMOVED***

export function onChangeInput(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_CHANGE_INPUT,
    key: target.name,
    value: target.value,
***REMOVED***;
***REMOVED***

export function setErrors(formErrors) ***REMOVED***
  return ***REMOVED***
    type: SET_ERRORS,
    formErrors,
***REMOVED***;
***REMOVED***

export function setForm(formType, email) ***REMOVED***
  let data;

  switch (formType) ***REMOVED***
    case 'forgot-password':
      data = ***REMOVED***
        email: '',
***REMOVED***;

      break;
    case 'login':
      data = ***REMOVED***
        identifier: '',
        password: '',
        rememberMe: true,
***REMOVED***;

      break;
    case 'register':
      data = ***REMOVED***
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        news: false,
***REMOVED***;
      break;
    case 'register-success':
      data = ***REMOVED***
        email,
***REMOVED***;
      break;
    case 'reset-password':
      data = ***REMOVED***
        password: '',
        passwordConfirmation: '',
        code: email,
***REMOVED***;
      break;
    default:
      data = ***REMOVED******REMOVED***;
***REMOVED***

  return ***REMOVED***
    type: SET_FORM,
    data,
    formType,
***REMOVED***;
***REMOVED***

export function submit(context) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
    context,
***REMOVED***;
***REMOVED***

export function submitError(formErrors) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_ERROR,
    formErrors,
***REMOVED***;
***REMOVED***

export function submitSucceeded() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCEEDED,
***REMOVED***;
***REMOVED***
