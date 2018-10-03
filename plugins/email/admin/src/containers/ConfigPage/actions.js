/**
 *
 *
 * ConfigPage actions
 *
 */

import ***REMOVED***
  GET_SETTINGS,
  GET_SETTINGS_SUCCEEDED,
  ON_CANCEL,
  ON_CHANGE,
  SET_ERRORS,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

export function getSettings(env) ***REMOVED***
  return ***REMOVED***
    type: GET_SETTINGS,
    env,
***REMOVED***;
***REMOVED***

export function getSettingsSucceeded(settings, appEnvironments) ***REMOVED***
  return ***REMOVED***
    type: GET_SETTINGS_SUCCEEDED,
    appEnvironments,
    settings,
    initialData: settings.config,
***REMOVED***;
***REMOVED***

export function onCancel() ***REMOVED***
  return ***REMOVED***
    type: ON_CANCEL,
***REMOVED***;
***REMOVED***

export function onChange(***REMOVED*** target ***REMOVED***) ***REMOVED***
  const keys = ['modifiedData'].concat(target.name.split('.'));
  const value = target.value;

  return ***REMOVED***
    type: ON_CHANGE,
    keys,
    value,
***REMOVED***;
***REMOVED***

export function setErrors(errors) ***REMOVED***
  return ***REMOVED***
    type: SET_ERRORS,
    errors,
***REMOVED***;
***REMOVED***

export function submit() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
***REMOVED***;
***REMOVED***

export function submitError(errors) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_ERROR,
    errors,
***REMOVED***;
***REMOVED***

export function submitSucceeded(data) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCEEDED,
    data,
***REMOVED***;
***REMOVED***
