import ***REMOVED*** get, isEmpty, isObject ***REMOVED*** from 'lodash';

export default function checkFormValidity(settingType, data, providerToEdit = '') ***REMOVED***
  const formErrors = [];

  switch (settingType) ***REMOVED***
    case 'providers': ***REMOVED***
      const isProviderEnabled = get(data, 'enabled');
      const keys = providerToEdit === 'email' ? [] : ['key', 'secret'];

      keys.map(key => ***REMOVED***
        if (isProviderEnabled && isEmpty(get(data, key))) ***REMOVED***
          formErrors.push(***REMOVED*** name: key, errors: [***REMOVED*** id: 'components.Input.error.validation.required' ***REMOVED***] ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    case 'email-templates': ***REMOVED***
      Object.keys(data.options).map((value) => ***REMOVED***
        if (isObject(data.options[value])) ***REMOVED***
          Object.keys(data.options[value]).map(subValue => ***REMOVED***
            if (isEmpty(get(data, ['options', value, subValue]))) ***REMOVED***
              formErrors.push(***REMOVED*** name: `options.$***REMOVED***value***REMOVED***.$***REMOVED***subValue***REMOVED***`, errors: [***REMOVED*** id: 'components.Input.error.validation.required' ***REMOVED***] ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***

        if (value !== 'response_email' && isEmpty(get(data, ['options', value]))) ***REMOVED***
          formErrors.push(***REMOVED*** name: `options.$***REMOVED***value***REMOVED***`, errors: [***REMOVED*** id: 'components.Input.error.validation.required' ***REMOVED***] ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    default:

***REMOVED***

  return formErrors;
***REMOVED***
