import ***REMOVED*** forEach, isObject, isArray, map, mapKeys, includes, reject, isEmpty, findIndex, isUndefined ***REMOVED*** from 'lodash';

/* eslint-disable consistent-return */
export function getValidationsFromForm(form, formValidations) ***REMOVED***
  map(form, (value, key) => ***REMOVED***

    // Check if the object
    if (isObject(value) && !isArray(value)) ***REMOVED***
      forEach(value, (subValue) => ***REMOVED***
        // Check if it has nestedInputs
        if (isArray(subValue) && value.type !== 'select') ***REMOVED***
          return getValidationsFromForm(subValue, formValidations);
  ***REMOVED***
***REMOVED***);
***REMOVED***


    if (isArray(value) && value.type !== 'select') ***REMOVED***
      return getValidationsFromForm(form[key], formValidations);
***REMOVED***


    // Push the target and the validation
    if (value.name) ***REMOVED***
      formValidations.push(***REMOVED*** name: value.name, validations: value.validations ***REMOVED***);
***REMOVED***
***REMOVED***);

  return formValidations;
***REMOVED***


export function checkFormValidity(formData, formValidations) ***REMOVED***
  const errors = [];

  forEach(formData, (value, key) => ***REMOVED***
    const validationValue = formValidations[findIndex(formValidations, ['name', key])];

    if (!isUndefined(validationValue)) ***REMOVED***
      const inputErrors = validate(value, validationValue.validations);

      if (!isEmpty(inputErrors)) ***REMOVED***
        errors.push(***REMOVED*** name: key, errors: inputErrors ***REMOVED***);
***REMOVED***

***REMOVED***
***REMOVED***);

  return errors;
***REMOVED***

function validate(value, validations) ***REMOVED***
  let errors = [];
  // Handle i18n
  const requiredError = ***REMOVED*** id: 'content-manager.error.validation.required' ***REMOVED***;
  mapKeys(validations, (validationValue, validationKey) => ***REMOVED***
    switch (validationKey) ***REMOVED***
      case 'max':
        if (parseInt(value, 10) > validationValue) ***REMOVED***
          errors.push(***REMOVED*** id: 'content-manager.error.validation.max' ***REMOVED***);
  ***REMOVED***
        break;
      case 'min':
        if (parseInt(value, 10) < validationValue) ***REMOVED***
          errors.push(***REMOVED*** id: 'content-manager.error.validation.min' ***REMOVED***);
  ***REMOVED***
        break;
      case 'maxLength':
        if (value.length > validationValue) ***REMOVED***
          errors.push(***REMOVED*** id: 'content-manager.error.validation.maxLength' ***REMOVED***);
  ***REMOVED***
        break;
      case 'minLength':
        if (value.length < validationValue) ***REMOVED***
          errors.push(***REMOVED*** id: 'content-manager.error.validation.minLength' ***REMOVED***);
  ***REMOVED***
        break;
      case 'required':
        if (validationValue === true && value.length === 0) ***REMOVED***
          errors.push(***REMOVED*** id: 'content-manager.error.validation.required' ***REMOVED***);
  ***REMOVED***
        break;
      case 'regex':
        if (!new RegExp(validationValue).test(value)) ***REMOVED***
          errors.push(***REMOVED*** id: 'content-manager.error.validation.regex' ***REMOVED***);
  ***REMOVED***
        break;
      case 'type':
        if (validationValue === 'json') ***REMOVED***
          try ***REMOVED***
            if (isObject(value)) ***REMOVED***
              value = JSON.parse(JSON.stringify(value));
      ***REMOVED*** else ***REMOVED***
              errors.push(***REMOVED*** id: 'content-manager.error.validation.json' ***REMOVED***);
      ***REMOVED***
    ***REMOVED*** catch(err) ***REMOVED***
            errors.push(***REMOVED*** id: 'content-manager.error.validation.json' ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
        break;
      default:
***REMOVED***
***REMOVED***);

  if (includes(errors, requiredError)) ***REMOVED***
    errors = reject(errors, (error) => error !== requiredError);
***REMOVED***
  return errors;
***REMOVED***
