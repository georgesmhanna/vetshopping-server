/*
 *
 * ModelPage actions
 *
 */
import ***REMOVED*** cloneDeep, findIndex, forEach, get, includes, map, set ***REMOVED*** from 'lodash';
import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import ***REMOVED***
  ADD_ATTRIBUTE_RELATION_TO_CONTENT_TYPE,
  ADD_ATTRIBUTE_TO_CONTENT_TYPE,
  CANCEL_CHANGES,
  EDIT_CONTENT_TYPE_ATTRIBUTE,
  EDIT_CONTENT_TYPE_ATTRIBUTE_RELATION,
  DEFAULT_ACTION,
  DELETE_ATTRIBUTE,
  MODEL_FETCH,
  MODEL_FETCH_SUCCEEDED,
  POST_CONTENT_TYPE_SUCCEEDED,
  SET_BUTTON_LOADER,
  SUBMIT,
  SUBMIT_ACTION_SUCCEEDED,
  RESET_SHOW_BUTTONS_PROPS,
  UNSET_BUTTON_LOADER,
  UPDATE_CONTENT_TYPE,
***REMOVED*** from './constants';

export function addAttributeRelationToContentType(newAttribute) ***REMOVED***
  return ***REMOVED***
    type: ADD_ATTRIBUTE_RELATION_TO_CONTENT_TYPE,
    newAttribute,
    parallelAttribute: setParallelAttribute(newAttribute),
***REMOVED***;
***REMOVED***

export function addAttributeToContentType(newAttribute) ***REMOVED***
  return ***REMOVED***
    type: ADD_ATTRIBUTE_TO_CONTENT_TYPE,
    newAttribute,
***REMOVED***;
***REMOVED***

export function cancelChanges() ***REMOVED***
  return ***REMOVED***
    type: CANCEL_CHANGES,
***REMOVED***;
***REMOVED***

export function editContentTypeAttribute(modifiedAttribute, attributePosition, shouldAddParralAttribute) ***REMOVED***
  return ***REMOVED***
    type: EDIT_CONTENT_TYPE_ATTRIBUTE,
    modifiedAttribute,
    attributePosition,
    shouldAddParralAttribute,
    parallelAttribute: setParallelAttribute(modifiedAttribute),
***REMOVED***;
***REMOVED***

export function editContentTypeAttributeRelation(modifiedAttribute, attributePosition, parallelAttributePosition, shouldRemoveParallelAttribute) ***REMOVED***
  return ***REMOVED***
    type: EDIT_CONTENT_TYPE_ATTRIBUTE_RELATION,
    modifiedAttribute,
    attributePosition,
    parallelAttribute: setParallelAttribute(modifiedAttribute),
    parallelAttributePosition,
    shouldRemoveParallelAttribute,
***REMOVED***;
***REMOVED***

export function deleteAttribute(position, modelName, shouldRemoveParallelAttribute) ***REMOVED***
  const temporaryContentType = storeData.getContentType();

  if (get(temporaryContentType, 'name') === modelName) ***REMOVED***
    const attributeKey = temporaryContentType.attributes[position].params.key;
    temporaryContentType.attributes.splice(position, 1);

    if (shouldRemoveParallelAttribute) ***REMOVED***
      temporaryContentType.attributes.splice(findIndex(temporaryContentType.attributes, ['name', attributeKey]), 1);
***REMOVED***

    const updatedContentType = temporaryContentType;
    storeData.setContentType(updatedContentType);
***REMOVED***

  return ***REMOVED***
    type: DELETE_ATTRIBUTE,
    position,
    modelName,
    shouldRemoveParallelAttribute,
***REMOVED***;
***REMOVED***

export function defaultAction() ***REMOVED***
  return ***REMOVED***
    type: DEFAULT_ACTION,
***REMOVED***;
***REMOVED***

export function modelFetch(modelName) ***REMOVED***
  return ***REMOVED***
    type: MODEL_FETCH,
    modelName,
***REMOVED***;
***REMOVED***

export function modelFetchSucceeded(data) ***REMOVED***
  const model = data;
  const defaultKeys = ['required', 'unique', 'type', 'key', 'target', 'nature', 'targetColumnName', 'columnName', 'multiple', 'default', 'appearance'];

  forEach(model.model.attributes, (attribute, index) => ***REMOVED***
    map(attribute.params, (value, key) => ***REMOVED***
      if (!includes(defaultKeys, key) && value) ***REMOVED***
        set(model.model.attributes[index].params, `$***REMOVED***key***REMOVED***Value`, value);
        set(model.model.attributes[index].params, key, true);
***REMOVED***
***REMOVED***);
***REMOVED***);

  return ***REMOVED***
    type: MODEL_FETCH_SUCCEEDED,
    model,
***REMOVED***;
***REMOVED***

export function postContentTypeSucceeded() ***REMOVED***
  return ***REMOVED***
    type: POST_CONTENT_TYPE_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function resetShowButtonsProps() ***REMOVED***
  return ***REMOVED***
    type: RESET_SHOW_BUTTONS_PROPS,
***REMOVED***;
***REMOVED***

export function setButtonLoader() ***REMOVED***
  return ***REMOVED***
    type: SET_BUTTON_LOADER,
***REMOVED***;
***REMOVED***

export function submit(context, modelName) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
    context,
    modelName,
***REMOVED***;
***REMOVED***

export function submitActionSucceeded() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_ACTION_SUCCEEDED,
***REMOVED***;
***REMOVED***

export function unsetButtonLoader() ***REMOVED***
  return ***REMOVED***
    type: UNSET_BUTTON_LOADER,
***REMOVED***;
***REMOVED***

export function updateContentType(data) ***REMOVED***
  return ***REMOVED***
    type: UPDATE_CONTENT_TYPE,
    data,
***REMOVED***;
***REMOVED***



function setParallelAttribute(data) ***REMOVED***
  const parallelAttribute = cloneDeep(data);

  parallelAttribute.params.key = data.name;
  parallelAttribute.name = data.params.key;
  parallelAttribute.params.columnName = data.params.targetColumnName;
  parallelAttribute.params.targetColumnName = data.params.columnName;
  parallelAttribute.params.dominant = false;
  
  switch (data.params.nature) ***REMOVED***
    case 'manyToOne':
      parallelAttribute.params.nature = 'oneToMany';
      break;
    case 'oneToMany':
      parallelAttribute.params.nature = 'manyToOne';
      break;
    default:
    //
***REMOVED***


  return parallelAttribute;
***REMOVED***
