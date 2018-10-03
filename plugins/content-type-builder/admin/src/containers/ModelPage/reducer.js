/*
 *
 * ModelPage reducer
 *
 */

import ***REMOVED*** fromJS, Map, List ***REMOVED*** from 'immutable';
import ***REMOVED*** get, size, differenceBy, findIndex ***REMOVED*** from 'lodash';
import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';
/* eslint-disable new-cap */
import ***REMOVED***
  ADD_ATTRIBUTE_RELATION_TO_CONTENT_TYPE,
  ADD_ATTRIBUTE_TO_CONTENT_TYPE,
  CANCEL_CHANGES,
  EDIT_CONTENT_TYPE_ATTRIBUTE,
  EDIT_CONTENT_TYPE_ATTRIBUTE_RELATION,
  DELETE_ATTRIBUTE,
  MODEL_FETCH_SUCCEEDED,
  POST_CONTENT_TYPE_SUCCEEDED,
  RESET_SHOW_BUTTONS_PROPS,
  SET_BUTTON_LOADER,
  SUBMIT_ACTION_SUCCEEDED,
  UNSET_BUTTON_LOADER,
  UPDATE_CONTENT_TYPE,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  didFetchModel: false,
  initialModel: Map(***REMOVED***
    attributes: List(),
***REMOVED***),
  model: Map(***REMOVED***
    attributes: List(),
***REMOVED***),
  postContentTypeSuccess: false,
  showButtons: false,
  modelLoading: true,
  showButtonLoader: false,
***REMOVED***);

function modelPageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case ADD_ATTRIBUTE_RELATION_TO_CONTENT_TYPE:
      return state
        .updateIn(['model', 'attributes'], (list) => list.push(action.newAttribute, action.parallelAttribute))
        .set('showButtons', true);
    case ADD_ATTRIBUTE_TO_CONTENT_TYPE:
      return state
        .updateIn(['model', 'attributes'], (list) => list.push(action.newAttribute))
        .set('showButtons', true);
    case CANCEL_CHANGES:
      return state
        .set('showButtons', false)
        .set('model', state.get('initialModel'));
    case EDIT_CONTENT_TYPE_ATTRIBUTE: ***REMOVED***
      if (action.shouldAddParralAttribute) ***REMOVED***
        return state
          .set('showButtons', true)
          .updateIn(['model', 'attributes', action.attributePosition], () => action.modifiedAttribute)
          .updateIn(['model', 'attributes'], (list) => list.splice(action.attributePosition + 1, 0, action.parallelAttribute));
***REMOVED***

      return state
        .set('showButtons', true)
        .updateIn(['model', 'attributes', action.attributePosition], () => action.modifiedAttribute);
***REMOVED***
    case EDIT_CONTENT_TYPE_ATTRIBUTE_RELATION: ***REMOVED***
      if (action.shouldRemoveParallelAttribute) ***REMOVED***
        return state
          .set('showButtons', true)
          .updateIn(['model', 'attributes', action.attributePosition], () => action.modifiedAttribute)
          .updateIn(['model', 'attributes'], (list) => list.splice(action.parallelAttributePosition, 1));
***REMOVED***
      return state
        .set('showButtons', true)
        .updateIn(['model', 'attributes', action.attributePosition], () => action.modifiedAttribute)
        .updateIn(['model', 'attributes', action.parallelAttributePosition], () => action.parallelAttribute);
***REMOVED***
    case DELETE_ATTRIBUTE: ***REMOVED***
      const contentTypeAttributes = state.getIn(['model', 'attributes']).toJS();
      contentTypeAttributes.splice(action.position, 1);
      const updatedContentTypeAttributes = contentTypeAttributes;

      let showButtons = size(updatedContentTypeAttributes) !== size(state.getIn(['initialModel', 'attributes']).toJS())
        || size(differenceBy(state.getIn(['initialModel', 'attributes']).toJS(), updatedContentTypeAttributes, 'name')) > 0;

      if (get(storeData.getContentType(), 'name') === state.getIn(['initialModel', 'name'])) ***REMOVED***
        showButtons = size(get(storeData.getContentType(), 'attributes')) > 0;
***REMOVED***

      if (action.shouldRemoveParallelAttribute) ***REMOVED***
        const attributeKey = state.getIn(['model', 'attributes', action.position]).params.key;

        return state
          .set('showButtons', showButtons)
          .updateIn(['model', 'attributes'], (list) => list.splice(action.position, 1))
          .updateIn(['model', 'attributes'], (list) => list.splice(findIndex(list.toJS(), ['name', attributeKey]), 1));
***REMOVED***

      return state
        .set('showButtons', showButtons)
        .updateIn(['model', 'attributes'], (list) => list.splice(action.position, 1));
***REMOVED***
    case MODEL_FETCH_SUCCEEDED:
      return state
        .set('didFetchModel', !state.get('didFetchModel'))
        .set('modelLoading', false)
        .set('model', Map(action.model.model))
        .set('initialModel', Map(action.model.model))
        .setIn(['model', 'attributes'], List(action.model.model.attributes))
        .setIn(['initialModel', 'attributes'], List(action.model.model.attributes));
    case POST_CONTENT_TYPE_SUCCEEDED:
      return state.set('postContentTypeSuccess', !state.get('postContentTypeSuccess'));
    case RESET_SHOW_BUTTONS_PROPS:
      return state.set('showButtons', false);
    case SET_BUTTON_LOADER:
      return state.set('showButtonLoader', true);
    case SUBMIT_ACTION_SUCCEEDED:
      return state.set('initialModel', state.get('model'));
    case UNSET_BUTTON_LOADER:
      return state.set('showButtonLoader', false);
    case UPDATE_CONTENT_TYPE:
      return state
        .set('model', Map(action.data))
        .set('initialModel', Map(action.data))
        .setIn(['model', 'attributes'], List(action.data.attributes))
        .setIn(['initialModel', 'attributes'], List(action.data.attributes));
    default:
      return state;
***REMOVED***
***REMOVED***

export default modelPageReducer;
