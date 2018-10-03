import ***REMOVED*** findIndex, mapKeys, forEach, includes, has, isUndefined, reject, isEmpty, size, remove, union ***REMOVED*** from 'lodash';

/*
* @method : check invalid inputs
*
* @params ***REMOVED***object, object***REMOVED*** formData, formValidations
*
* @return ***REMOVED***array***REMOVED*** returns errors[***REMOVED*** target: inputTarget, errors: [***REMOVED***id: 'settings-manager.errorId'***REMOVED***]***REMOVED***]
*
*/

export function checkFormValidity(formData, formValidations, formErrors) ***REMOVED***
  const errors = [];
  forEach(formData, (value, key) => ***REMOVED*** // eslint-disable-line consistent-return
    let valueValidations = formValidations[findIndex(formValidations, ['target', key])];
    let inputErrors = [];

    if (!valueValidations) ***REMOVED***
      forEach(formValidations, (data) => ***REMOVED***

        if (data.nestedValidations) ***REMOVED***
          forEach(data.nestedValidations, (nestedData) => ***REMOVED***
            if (nestedData.target === key) valueValidations = nestedData;
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
***REMOVED***

    // If section is disabled don't need further checks
    if (includes(key, 'enabled') && !value || !valueValidations) return false;

    forEach(valueValidations.nestedValidations, (nestedValidations) => ***REMOVED***
      if (nestedValidations.validations.required && !has(formData, nestedValidations.target)) ***REMOVED***
        errors.push(***REMOVED*** target: nestedValidations.target, errors: [***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***] ***REMOVED***);
***REMOVED***
***REMOVED***);

    if (!isUndefined(valueValidations)) ***REMOVED***
      inputErrors = validate(value, valueValidations.validations);
***REMOVED***

    if (!isEmpty(inputErrors)) errors.push(***REMOVED*** target: key, errors: inputErrors ***REMOVED***);

    if (formData['security.xframe.value'] && formData['security.xframe.value'] === 'ALLOW-FROM' || formData['security.xframe.value'] === 'ALLOW-FROM.ALLOW-FROM ') ***REMOVED***
      errors.push(***REMOVED*** target: 'security.xframe.value.nested', errors: [***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***] ***REMOVED***);
***REMOVED***
***REMOVED***);

  return union(formErrors, errors);
***REMOVED***


function validate(value, validations) ***REMOVED***
  let errors = [];
  // Handle i18n
  const requiredError = ***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***;
  mapKeys(validations, (validationValue, validationKey) => ***REMOVED***
    switch (validationKey) ***REMOVED***
      case 'maxLength':
        if (value.length > validationValue) ***REMOVED***
          errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.maxLength' ***REMOVED***);
  ***REMOVED***
        break;
      case 'minLength':
        if (value.length < validationValue) ***REMOVED***
          errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.minLength' ***REMOVED***);
  ***REMOVED***
        break;
      case 'required':
        if (value.length === 0) ***REMOVED***
          errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***);
  ***REMOVED***
        break;
      case 'regex':
        if (!new RegExp(validationValue).test(value)) ***REMOVED***
          errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.regex' ***REMOVED***);
  ***REMOVED***
        break;
      default:
        errors = [];
***REMOVED***
***REMOVED***);

  if (includes(errors, requiredError)) ***REMOVED***
    errors = reject(errors, (error) => error !== requiredError);
***REMOVED***
  return errors;
***REMOVED***


/*
* @method : get input validations from configs
* @param ***REMOVED***object***REMOVED*** configs
*
* @return ***REMOVED***array***REMOVED*** returns formValidations
*/


export function getInputsValidationsFromConfigs(configs) ***REMOVED***
  const formValidations = [];

  forEach(configs.sections, (section) => ***REMOVED***
    forEach(section.items, (item) => ***REMOVED***

      if (!isUndefined(item.target)) ***REMOVED***
        const validations = ***REMOVED***
          target: item.target,
          validations: item.validations,
  ***REMOVED***;

        if (has(item, 'items') && item.type !== 'select') ***REMOVED***
          validations.nestedValidations = [];

          forEach(item.items, (subItem, key) => ***REMOVED***
            if (!isUndefined(subItem.target) && !isUndefined(subItem.validations)) ***REMOVED***
              if (has(subItem, 'items')) ***REMOVED***
                validations.nestedValidations.push(***REMOVED*** target: subItem.target, validations: subItem.validations, nestedValidations: [] ***REMOVED***);
                forEach(subItem.items, (nestedSubItem) => ***REMOVED***
                  if (!isUndefined(nestedSubItem.target)) ***REMOVED***
                    validations.nestedValidations[key].nestedValidations.push(***REMOVED*** target: nestedSubItem.target, validations: nestedSubItem.validations ***REMOVED***);
            ***REMOVED***
          ***REMOVED***);
        ***REMOVED*** else ***REMOVED***
                validations.nestedValidations.push(***REMOVED*** target: subItem.target, validations: subItem.validations ***REMOVED***);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***);
          formValidations.push(validations);
  ***REMOVED*** else ***REMOVED***
          formValidations.push(validations);
  ***REMOVED***
***REMOVED***
***REMOVED***);
***REMOVED***);

  return formValidations;
***REMOVED***

/* eslint-disable no-template-curly-in-string */

/*
*
* Specific to databasePost
*
* @method : check if all required inputs are filled for creating a new database
*
* @params ***REMOVED***object***REMOVED*** formData
*
* @return ***REMOVED***array***REMOVED*** returns errors[***REMOVED*** target: inputTarget, errors: [***REMOVED***id: 'settings-manager.errorId'***REMOVED***]***REMOVED***]
*
*/


export function getRequiredInputsDb(data, dbExistsErrors) ***REMOVED***
  const formErrors = [
    ***REMOVED*** target: 'database.connections.$***REMOVED***name***REMOVED***.name', errors: [***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***] ***REMOVED***,
    ***REMOVED*** target: 'database.connections.$***REMOVED***name***REMOVED***.settings.host', errors: [***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***] ***REMOVED***,
    ***REMOVED*** target: 'database.connections.$***REMOVED***name***REMOVED***.settings.port', errors: [***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***] ***REMOVED***,
    ***REMOVED*** target: 'database.connections.$***REMOVED***name***REMOVED***.settings.database', errors: [***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***] ***REMOVED***,
  ];

  // If size data === 2 user hasn't filled any input,
  if (size(data) === 2) return formErrors;

  forEach(data, (value, target) => ***REMOVED***
    if (value !== '') ***REMOVED***
      remove(formErrors, (object) => object.target === target);
***REMOVED***
***REMOVED***);

  return union(dbExistsErrors, formErrors);
***REMOVED***
