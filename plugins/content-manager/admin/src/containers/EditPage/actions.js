/**
 *
 * EditPage actions
 *
 */

import ***REMOVED*** get ***REMOVED*** from 'lodash';
import ***REMOVED*** getValidationsFromForm ***REMOVED*** from 'utils/formValidations';

import ***REMOVED***
  ADD_RELATION_ITEM,
  CHANGE_DATA,
  GET_DATA,
  GET_DATA_SUCCEEDED,
  INIT_MODEL_PROPS,
  MOVE_ATTR,
  MOVE_ATTR_END,
  ON_CANCEL,
  ON_REMOVE_RELATION_ITEM,
  RESET_PROPS,
  SET_FILE_RELATIONS,
  SET_LOADER,
  SET_FORM_ERRORS,
  SUBMIT,
  SUBMIT_SUCCESS,
  UNSET_LOADER,
***REMOVED*** from './constants';

export function addRelationItem(***REMOVED*** key, value ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ADD_RELATION_ITEM,
    key,
    value,
***REMOVED***;
***REMOVED***

export function changeData(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: CHANGE_DATA,
    keys: target.name.split('.'),
    value: target.value,
***REMOVED***;
***REMOVED***

export function getData(id, source, mainField) ***REMOVED***
  return ***REMOVED***
    type: GET_DATA,
    id,
    source,
    mainField,
***REMOVED***;
***REMOVED***

export function getDataSucceeded(id, data, pluginHeaderTitle) ***REMOVED***
  return ***REMOVED***
    type: GET_DATA_SUCCEEDED,
    id,
    data,
    pluginHeaderTitle,
***REMOVED***;
***REMOVED***

export function initModelProps(modelName, isCreating, source, attributes, displayedAttributes) ***REMOVED***
  const formValidations = getValidationsFromForm(
    Object.keys(attributes).map(attr => (***REMOVED*** name: attr, validations: get(attributes, attr, ***REMOVED******REMOVED***) ***REMOVED***)),
    [],
  ).filter(field => ***REMOVED***
    if (get(field, ['validations', 'required'], false) === true) ***REMOVED***
      return displayedAttributes.indexOf(field.name) !== -1;
***REMOVED***

    return true;
***REMOVED***);

  const record = Object.keys(attributes).reduce((acc, current) => ***REMOVED***
    if (attributes[current].default) ***REMOVED***
      acc[current] = attributes[current].default;
***REMOVED*** else if (attributes[current].type === 'json') ***REMOVED***
      acc[current] = ***REMOVED******REMOVED***;
***REMOVED***

    return acc;
***REMOVED***, ***REMOVED******REMOVED***);

  return ***REMOVED***
    type: INIT_MODEL_PROPS,
    formValidations,
    isCreating,
    modelName,
    record,
    source,
***REMOVED***;
***REMOVED***

export function moveAttr(dragIndex, hoverIndex, keys) ***REMOVED***
  return ***REMOVED***
    type: MOVE_ATTR,
    dragIndex,
    hoverIndex,
    keys,
***REMOVED***;
***REMOVED***

export function moveAttrEnd() ***REMOVED***
  return ***REMOVED***
    type: MOVE_ATTR_END,
***REMOVED***;
***REMOVED***

export function onCancel() ***REMOVED***
  return ***REMOVED***
    type: ON_CANCEL,
***REMOVED***;
***REMOVED***

export function onRemoveRelationItem(***REMOVED*** key, index ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_REMOVE_RELATION_ITEM,
    key,
    index,
***REMOVED***;
***REMOVED***

export function resetProps() ***REMOVED***
  return ***REMOVED***
    type: RESET_PROPS,
***REMOVED***;
***REMOVED***

export function setFileRelations(fileRelations) ***REMOVED***
  return ***REMOVED***
    type: SET_FILE_RELATIONS,
    fileRelations,
***REMOVED***;
***REMOVED***

export function setFormErrors(formErrors) ***REMOVED***
  return ***REMOVED***
    type: SET_FORM_ERRORS,
    formErrors,
***REMOVED***;
***REMOVED***

export function setLoader() ***REMOVED***
  return ***REMOVED***
    type: SET_LOADER,
***REMOVED***;
***REMOVED***

export function submit() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
***REMOVED***;
***REMOVED***

export function submitSuccess() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCESS,
***REMOVED***;
***REMOVED***

export function unsetLoader() ***REMOVED***
  return ***REMOVED***
    type: UNSET_LOADER,
***REMOVED***;
***REMOVED***
