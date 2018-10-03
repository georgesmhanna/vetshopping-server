/*
*
* Form actions
*
*/

/* eslint-disable new-cap */

import ***REMOVED*** concat, includes, map, forEach, replace ***REMOVED*** from 'lodash';
import ***REMOVED*** Map, List, fromJS ***REMOVED*** from 'immutable';
import ***REMOVED*** getValidationsFromForm ***REMOVED*** from '../../utils/formValidations';
import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import ***REMOVED***
  CHANGE_INPUT,
  CHANGE_INPUT_ATTRIBUTE,
  CONNECTIONS_FETCH,
  CONNECTIONS_FETCH_SUCCEEDED,
  CONTENT_TYPE_ACTION_SUCCEEDED,
  CONTENT_TYPE_CREATE,
  CONTENT_TYPE_EDIT,
  CONTENT_TYPE_FETCH,
  CONTENT_TYPE_FETCH_SUCCEEDED,
  REMOVE_CONTENT_TYPE_REQUIRED_ERROR,
  RESET_DID_FETCH_MODEL_PROP,
  RESET_FORM_ERRORS,
  RESET_IS_FORM_SET,
  SET_ATTRIBUTE_FORM,
  SET_ATTRIBUTE_FORM_EDIT,
  SET_BUTTON_LOADING,
  SET_FORM,
  SET_FORM_ERRORS,
  UNSET_BUTTON_LOADING,
***REMOVED*** from './constants';

import forms from './forms.json';

export function changeInput(key, value, isEditing) ***REMOVED***
  const objectToModify = isEditing ? 'modifiedDataEdit' : 'modifiedData';
  return ***REMOVED***
    type: CHANGE_INPUT,
    key,
    value,
    objectToModify,
***REMOVED***;
***REMOVED***

export function changeInputAttribute(key, value) ***REMOVED***
  return ***REMOVED***
    type: CHANGE_INPUT_ATTRIBUTE,
    keys: ['modifiedDataAttribute'].concat(key.split('.')),
    value,
***REMOVED***;
***REMOVED***

export function connectionsFetch() ***REMOVED***
  return ***REMOVED***
    type: CONNECTIONS_FETCH,
***REMOVED***;
***REMOVED***

export function connectionsFetchSucceeded(data) ***REMOVED***
  const connections = map(data.connections, (connection) => (***REMOVED*** name: connection, value: connection ***REMOVED***));
  return ***REMOVED***
    type: CONNECTIONS_FETCH_SUCCEEDED,
    connections,
***REMOVED***;
***REMOVED***

export function contentTypeActionSucceeded() ***REMOVED***
  return ***REMOVED***
    type: CONTENT_TYPE_ACTION_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function contentTypeCreate(newModel) ***REMOVED***
  const shouldSetUpdatedContentTypeProp = storeData.getIsModelTemporary() || false;
  storeData.setContentType(newModel);

  return ***REMOVED***
    type: CONTENT_TYPE_CREATE,
    shouldSetUpdatedContentTypeProp,
***REMOVED***;
***REMOVED***

export function contentTypeEdit(context) ***REMOVED***
  return ***REMOVED***
    type: CONTENT_TYPE_EDIT,
    context,
***REMOVED***;
***REMOVED***

export function contentTypeFetch(contentTypeName) ***REMOVED***
  return ***REMOVED***
    type: CONTENT_TYPE_FETCH,
    contentTypeName,
***REMOVED***;
***REMOVED***

export function contentTypeFetchSucceeded(contentType) ***REMOVED***
  const dataArray = [['attributes', List(contentType.model.attributes)]];

  forEach(contentType.model, (value, key) => ***REMOVED***
    if (key !== 'attributes') ***REMOVED***
      dataArray.push([key, value]);
***REMOVED***
***REMOVED***);

  const data = Map(dataArray);
  return ***REMOVED***
    type: CONTENT_TYPE_FETCH_SUCCEEDED,
    data,
***REMOVED***;
***REMOVED***

export function removeContentTypeRequiredError() ***REMOVED***
  return ***REMOVED***
    type: REMOVE_CONTENT_TYPE_REQUIRED_ERROR,
***REMOVED***;
***REMOVED***

export function resetDidFetchModelProp() ***REMOVED***
  return ***REMOVED***
    type: RESET_DID_FETCH_MODEL_PROP,
***REMOVED***;
***REMOVED***

export function resetFormErrors() ***REMOVED***
  return ***REMOVED***
    type: RESET_FORM_ERRORS,
***REMOVED***;
***REMOVED***

export function resetIsFormSet() ***REMOVED***
  return ***REMOVED***
    type: RESET_IS_FORM_SET,
***REMOVED***;
***REMOVED***

export function setAttributeForm(hash) ***REMOVED***
  const data = setAttributeFormData(hash);
  const attributeRelation = Map(***REMOVED***
    name: '',
    params: Map(***REMOVED***
      columnName: '',
      target: '',
      targetColumnName: "",
      key: '',
      nature: 'oneToOne',
      required: false,
      unique: false,
      dominant: false,
***REMOVED***),
***REMOVED***);
  const attribute = includes(hash, 'attributerelation') ? attributeRelation : data.attribute;
  const formValidations = concat(getValidationsFromForm(data.form, []), ***REMOVED*** name: 'name', validations: ***REMOVED*** required: true ***REMOVED*** ***REMOVED***);

  return ***REMOVED***
    type: SET_ATTRIBUTE_FORM,
    form: data.form,
    attribute,
    formValidations,
***REMOVED***;
***REMOVED***

export function setAttributeFormEdit(hash, contentType) ***REMOVED***
  const form = setAttributeFormData(hash).form;
  const contentTypeAttribute = contentType.attributes[hash.split('::')[3]];
  const formValidations = getValidationsFromForm(form, []);

  const attribute = Map(***REMOVED***
    name: contentTypeAttribute.name,
    params: fromJS(contentTypeAttribute.params),
***REMOVED***);

  return ***REMOVED***
    type: SET_ATTRIBUTE_FORM_EDIT,
    form,
    attribute,
    formValidations,
***REMOVED***;
***REMOVED***

export function setButtonLoading() ***REMOVED***
  return ***REMOVED***
    type: SET_BUTTON_LOADING,
***REMOVED***;
***REMOVED***

export function setForm(hash) ***REMOVED***
  const form = forms[hash.split('::')[1]][hash.split('::')[2]];
  const data = getDataFromForm(forms[hash.split('::')[1]]);
  const formValidations = getValidationsFromForm(forms[hash.split('::')[1]], []);

  return ***REMOVED***
    type: SET_FORM,
    form,
    data,
    formValidations,
***REMOVED***;
***REMOVED***


export function setFormErrors(formErrors) ***REMOVED***
  return ***REMOVED***
    type: SET_FORM_ERRORS,
    formErrors,
***REMOVED***;
***REMOVED***

export function unsetButtonLoading() ***REMOVED***
  return ***REMOVED***
    type: UNSET_BUTTON_LOADING,
***REMOVED***;
***REMOVED***

/**
*
* @param  ***REMOVED***object***REMOVED*** form
* @return ***REMOVED***object***REMOVED*** data : An object ***REMOVED*** name: value ***REMOVED***
*/

function getDataFromForm(form) ***REMOVED***
  const dataArray = [['attributes', List()]];

  forEach(form, (formSection) => ***REMOVED***
    map(formSection.items, (item) => dataArray.push([item.name, item.value]));
***REMOVED***);

  const data = Map(dataArray);

  return data;
***REMOVED***

function setAttributeFormData(hash) ***REMOVED***
  const hashArray = hash.split('::');
  const formType = replace(hashArray[1], 'attribute', '');
  const settingsType = hashArray[2];
  const form = forms.attribute[formType][settingsType];
  const type = formType === 'number' ? 'integer' : formType;
  let defaultValue = type === 'number' ? 0 : '';

  if (type === 'boolean') ***REMOVED***
    defaultValue = false;
***REMOVED***

  const attribute = Map(***REMOVED***
    name: '',
    params: Map(***REMOVED***
      appearance: Map(***REMOVED***
        WYSIWYG: false,
***REMOVED***),
      type,
      default: defaultValue,
      required: false,
      unique: false,
      maxLength: false,
      minLength: false,
      multiple: false,
      min: false,
      max: false,
***REMOVED***),
***REMOVED***);

  return ***REMOVED***
    form,
    attribute,
***REMOVED***;
***REMOVED***
