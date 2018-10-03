/**
 * 
 * SettingPage reducer
 */

import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';
import ***REMOVED***
  ON_CLICK_EDIT_FIELD,
  ON_CLICK_EDIT_LIST_ITEM,
  ON_CLICK_EDIT_RELATION,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  fieldToEdit: fromJS(***REMOVED******REMOVED***),
  listItemToEdit: fromJS(***REMOVED******REMOVED***),
  relationToEdit: fromJS(***REMOVED******REMOVED***),
***REMOVED***);

function settingPageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case ON_CLICK_EDIT_FIELD: 
      return state
        .update('fieldToEdit', () => fromJS(action.fieldToEdit))
        .update('relationToEdit', () => fromJS(***REMOVED******REMOVED***)); // Both these objects will be used to set the form in order to know which form needs to be displayed
    case ON_CLICK_EDIT_LIST_ITEM:
      return state.update('listItemToEdit', () => fromJS(action.listItemToEdit));
    case ON_CLICK_EDIT_RELATION:
      return state
        .update('fieldToEdit', () => fromJS(***REMOVED******REMOVED***))
        .update('relationToEdit', () => fromJS(action.relationToEdit));
    default:
      return state;
***REMOVED***
***REMOVED***

export default settingPageReducer;