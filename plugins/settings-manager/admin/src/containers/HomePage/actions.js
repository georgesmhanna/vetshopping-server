/*
*
* HomePage actions
*
*/

import ***REMOVED*** includes, forEach, has, remove, get, split ***REMOVED*** from 'lodash';
import ***REMOVED*** getInputsValidationsFromConfigs ***REMOVED*** from '../../utils/inputValidations';
import translations from '../../translations/en.json';
import ***REMOVED***
  CONFIG_FETCH,
  LANGUAGES_FETCH,
  CONFIG_FETCH_SUCCEEDED,
  LANGUAGES_FETCH_SUCCEEDED,
  CHANGE_INPUT,
  CANCEL_CHANGES,
  CLOSE_MODAL,
  DEFAULT_ACTION,
  EDIT_SETTINGS,
  EDIT_SETTINGS_SUCCEEDED,
  CHANGE_DEFAULT_LANGUAGE,
  NEW_LANGUAGE_POST,
  LANGUAGE_ACTION_SUCCEEDED,
  LANGUAGE_DELETE,
  DATABASES_FETCH,
  DATABASES_FETCH_SUCCEEDED,
  NEW_DATABASE_POST,
  DATABASE_ACTION_SUCCEEDED,
  DATABASE_DELETE,
  SPECIFIC_DATABASE_FETCH,
  SPECIFIC_DATABASE_FETCH_SUCCEEDED,
  DATABASE_EDIT,
  LANGUAGE_ACTION_ERROR,
  DATABASE_ACTION_ERROR,
  EMPTY_DB_MODIFIED_DATA,
  SET_ERRORS,
  SET_LOADER,
  UNSET_LOADER,
***REMOVED*** from './constants';

export function defaultAction() ***REMOVED***
  return ***REMOVED***
    type: DEFAULT_ACTION,
***REMOVED***;
***REMOVED***

export function configFetch(endPoint) ***REMOVED***
  return ***REMOVED***
    type: CONFIG_FETCH,
    endPoint,
***REMOVED***;
***REMOVED***

export function configFetchSucceded(configs) ***REMOVED***
  const data = getDataFromConfigs(configs);
  const formValidations = getInputsValidationsFromConfigs(configs);
  return ***REMOVED***
    type: CONFIG_FETCH_SUCCEEDED,
    configs,
    data,
    formValidations,
***REMOVED***;
***REMOVED***

export function changeInput(key, value) ***REMOVED***
  return ***REMOVED***
    type: CHANGE_INPUT,
    key,
    value,
***REMOVED***;
***REMOVED***

export function cancelChanges() ***REMOVED***
  return ***REMOVED***
    type: CANCEL_CHANGES,
***REMOVED***;
***REMOVED***

export function closeModal() ***REMOVED***
  return ***REMOVED***
    type: CLOSE_MODAL,
***REMOVED***;
***REMOVED***

export function languagesFetch() ***REMOVED***
  return ***REMOVED***
    type: LANGUAGES_FETCH,
***REMOVED***;
***REMOVED***

export function languagesFetchSucceeded(appLanguages, listLanguages) ***REMOVED***
  const configs = ***REMOVED***
    name: listLanguages.name,
    description: listLanguages.description,
    sections: appLanguages.languages,
***REMOVED***;

  const selectOptionsObject = listLanguages.sections[0].items[0];

  const selectOptions = ***REMOVED***
    name: selectOptionsObject.name,
    target: selectOptionsObject.target,
    type: selectOptionsObject.type,
    options: [],
***REMOVED***;

  forEach(selectOptionsObject.items, (item) => ***REMOVED***
    selectOptions.options.push(***REMOVED***
      value: item.value,
      label: translations[item.name],
***REMOVED***);
***REMOVED***);

  // Init the react-select
  const selectedLanguage = ***REMOVED*** 'language.defaultLocale': selectOptionsObject.items[0].value ***REMOVED***;

  return ***REMOVED***
    type: LANGUAGES_FETCH_SUCCEEDED,
    configs,
    listLanguages,
    selectOptions,
    selectedLanguage,
***REMOVED***;
***REMOVED***


export function editSettings(newSettings, endPoint) ***REMOVED***
  return ***REMOVED***
    type: EDIT_SETTINGS,
    newSettings,
    endPoint,
***REMOVED***;
***REMOVED***

export function editSettingsSucceeded() ***REMOVED***
  return ***REMOVED***
    type: EDIT_SETTINGS_SUCCEEDED,
***REMOVED***;
***REMOVED***

function getDataFromConfigs(configs) ***REMOVED***
  const data = ***REMOVED******REMOVED***;

  forEach(configs.sections, (section) => ***REMOVED***
    forEach(section.items, (item) => ***REMOVED***
      data[item.target] = item.value;

      if (has(item, 'items')) ***REMOVED***
        forEach(item.items, (itemValue) => ***REMOVED***
          data[itemValue.target] = itemValue.value;
  ***REMOVED***);
***REMOVED***
***REMOVED***);
***REMOVED***);

  if (configs.name === 'form.security.name' && includes(split(get(data, 'security.xframe.value'), ' '), 'ALLOW-FROM')) ***REMOVED***
    const allowFromValue = split(get(data, 'security.xframe.value'), ' ')[0];
    const allowFromValueNested = split(get(data, 'security.xframe.value'), ' ')[1];
    data['security.xframe.value'] = allowFromValue;
    data['security.xframe.value.nested'] = allowFromValueNested;
***REMOVED***
  return data;
***REMOVED***

export function changeDefaultLanguage(configsDisplay, newLanguage) ***REMOVED***
  return ***REMOVED***
    type: CHANGE_DEFAULT_LANGUAGE,
    configsDisplay,
    newLanguage,
***REMOVED***;
***REMOVED***

export function newLanguagePost() ***REMOVED***
  return ***REMOVED***
    type: NEW_LANGUAGE_POST,
***REMOVED***;
***REMOVED***


export function languageActionSucceeded() ***REMOVED***
  return ***REMOVED***
    type: LANGUAGE_ACTION_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function languageActionError() ***REMOVED***
  return ***REMOVED***
    type: LANGUAGE_ACTION_ERROR,
***REMOVED***;
***REMOVED***

export function languageDelete(languageToDelete) ***REMOVED***
  return ***REMOVED***
    type: LANGUAGE_DELETE,
    languageToDelete,
***REMOVED***;
***REMOVED***

export function databasesFetch(environment) ***REMOVED***
  return ***REMOVED***
    type: DATABASES_FETCH,
    environment,
***REMOVED***;
***REMOVED***

export function databasesFetchSucceeded(listDatabases, availableDatabases) ***REMOVED***
  // form.database.item.connector
  const appDatabases = availableDatabases;
  remove(appDatabases.sections[0].items, (item) => item.name === 'form.database.item.connector');
  const configsDisplay = ***REMOVED***
    name: 'form.databases.name',
    description: 'form.databases.description',
    sections: listDatabases.databases,
***REMOVED***;

  const modifiedData = ***REMOVED***
    'database.defaultConnection': availableDatabases.sections[1].items[0].value,
***REMOVED***;

  const dbNameTarget = availableDatabases.sections[0].items[0].target;
  const formValidations = getInputsValidationsFromConfigs(availableDatabases);

  return ***REMOVED***
    type: DATABASES_FETCH_SUCCEEDED,
    configsDisplay,
    appDatabases,
    modifiedData,
    dbNameTarget,
    formValidations,
***REMOVED***;
***REMOVED***

export function newDatabasePost(endPoint, data) ***REMOVED***
  return ***REMOVED***
    type: NEW_DATABASE_POST,
    endPoint,
    data,
***REMOVED***;
***REMOVED***

export function databaseActionSucceeded() ***REMOVED***
  return ***REMOVED***
    type: DATABASE_ACTION_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function databaseActionError(formErrors) ***REMOVED***
  return ***REMOVED***
    type: DATABASE_ACTION_ERROR,
    formErrors,
***REMOVED***;
***REMOVED***

export function databaseDelete(databaseToDelete, endPoint, context) ***REMOVED***
  return ***REMOVED***
    type: DATABASE_DELETE,
    databaseToDelete,
    endPoint,
    context,
***REMOVED***;
***REMOVED***

export function specificDatabaseFetch(databaseName, endPoint) ***REMOVED***
  return ***REMOVED***
    type: SPECIFIC_DATABASE_FETCH,
    databaseName,
    endPoint,
***REMOVED***;
***REMOVED***

export function specificDatabaseFetchSucceeded(db) ***REMOVED***
  const database = db;
  const data = getDataFromConfigs(database);
  const name = database.sections[0].items[0].value;
  remove(database.sections[0].items, (item) => item.target === `database.connections.$***REMOVED***name***REMOVED***.connector`);
  const dbNameTarget = database.sections[0].items[0].target;
  const formValidations = getInputsValidationsFromConfigs(database);
  return ***REMOVED***
    type: SPECIFIC_DATABASE_FETCH_SUCCEEDED,
    database,
    data,
    dbNameTarget,
    formValidations,
***REMOVED***;
***REMOVED***

export function databaseEdit(data, apiUrl) ***REMOVED***
  return ***REMOVED***
    type: DATABASE_EDIT,
    data,
    apiUrl,
***REMOVED***;
***REMOVED***

export function emptyDbModifiedData() ***REMOVED***
  return ***REMOVED***
    type: EMPTY_DB_MODIFIED_DATA,
***REMOVED***;
***REMOVED***

export function setErrors(errors) ***REMOVED***
  return ***REMOVED***
    type: SET_ERRORS,
    errors,
***REMOVED***;
***REMOVED***

export function setLoader() ***REMOVED***
  return ***REMOVED***
    type: SET_LOADER,
***REMOVED***;
***REMOVED***

export function unsetLoader() ***REMOVED***
  return ***REMOVED***
    type: UNSET_LOADER,
***REMOVED***;
***REMOVED***
