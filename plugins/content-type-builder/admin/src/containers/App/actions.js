/*
 *
 * App actions
 *
 */

/* eslint-disable new-cap */

import ***REMOVED*** List, Map ***REMOVED*** from 'immutable';
import ***REMOVED*** concat, get, size, map, findIndex, isEmpty ***REMOVED*** from 'lodash';

import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import ***REMOVED***
  DELETE_CONTENT_TYPE,
  MODELS_FETCH,
  MODELS_FETCH_SUCCEEDED,
  STORE_TEMPORARY_MENU,
  TEMPORARY_CONTENT_TYPE_FIELDS_UPDATED,
  TEMPORARY_CONTENT_TYPE_POSTED,
***REMOVED*** from './constants';

export function deleteContentType(itemToDelete, context) ***REMOVED***
  const oldMenu = storeData.getMenu();
  const leftMenuContentTypes = get(context.plugins.toJS(), ['content-manager', 'leftMenuSections']);
  const leftMenuContentTypesIndex = !isEmpty(leftMenuContentTypes) ? findIndex(leftMenuContentTypes[0].links, ['destination', itemToDelete]) : -1;

  let updateLeftMenu = false;
  let sendRequest = true;

  if (oldMenu) ***REMOVED***
    const index = findIndex(oldMenu, ['name', itemToDelete]);
    if (oldMenu[index].isTemporary) ***REMOVED***
      sendRequest = false;
      storeData.clearAppStorage();
***REMOVED***else ***REMOVED***
      oldMenu.splice(index, 1);
      const newMenu = oldMenu;
      storeData.setMenu(newMenu);
***REMOVED***
***REMOVED***

  // Update Admin left menu content types
  if (leftMenuContentTypesIndex !== -1) ***REMOVED***
    updateLeftMenu = true;
    leftMenuContentTypes[0].links.splice(leftMenuContentTypesIndex, 1);
***REMOVED***

  return ***REMOVED***
    type: DELETE_CONTENT_TYPE,
    itemToDelete,
    sendRequest,
    leftMenuContentTypes,
    updateLeftMenu,
    updatePlugin: context.updatePlugin,
***REMOVED***;
***REMOVED***

export function modelsFetch() ***REMOVED***
  return ***REMOVED***
    type: MODELS_FETCH,
***REMOVED***;
***REMOVED***

export function modelsFetchSucceeded(models) ***REMOVED***
  const modelNumber = size(models.models) > 1 ? 'plural' : 'singular';

  const sections = storeData.getMenu() || map(models.models, (model) => (***REMOVED***icon: 'fa-caret-square-o-right', name: model.name, source: model.source ***REMOVED***));

  if (!storeData.getMenu())***REMOVED***
    sections.push(***REMOVED*** icon: 'fa-plus', name: 'button.contentType.add' ***REMOVED***);
***REMOVED***

  const menu = ***REMOVED***
    sections: [
      Map(***REMOVED***
        name: `menu.section.contentTypeBuilder.name.$***REMOVED***modelNumber***REMOVED***`,
        items: List(sections),
***REMOVED***),
    ],
***REMOVED***;

  const data = storeData.getModel() ? ***REMOVED*** models: concat(models.models, storeData.getModel()) ***REMOVED*** : models;
  return ***REMOVED***
    type: MODELS_FETCH_SUCCEEDED,
    data,
    menu,
***REMOVED***;
***REMOVED***

export function storeTemporaryMenu(newMenu, position, nbElementToRemove) ***REMOVED***

  const newModel = newMenu[size(newMenu) - 2];
  const newLink = ***REMOVED*** icon: 'fa-caret-square-o-right', name: newModel.name, isTemporary: true ***REMOVED***;

  storeData.setMenu(newMenu);
  storeData.setModel(newModel);
  storeData.setIsModelTemporary();

  return ***REMOVED***
    type: STORE_TEMPORARY_MENU,
    newModel,
    newLink,
    position,
    nbElementToRemove,
***REMOVED***;
***REMOVED***

export function temporaryContentTypeFieldsUpdated(fieldNumber) ***REMOVED***
  return ***REMOVED***
    type: TEMPORARY_CONTENT_TYPE_FIELDS_UPDATED,
    fieldNumber,
***REMOVED***;
***REMOVED***

export function temporaryContentTypePosted(fieldNumber) ***REMOVED***
  return ***REMOVED***
    type: TEMPORARY_CONTENT_TYPE_POSTED,
    fieldNumber,
***REMOVED***;
***REMOVED***
