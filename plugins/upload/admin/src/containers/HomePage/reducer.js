/*
 *
 * HomePage reducer
 *
 */

import ***REMOVED*** fromJS, List, Map ***REMOVED*** from 'immutable';

import ***REMOVED***
  CHANGE_PARAMS,
  DELETE_SUCCESS,
  DROP_SUCCESS,
  GET_DATA_SUCCESS,
  ON_SEARCH,
  ON_SEARCH_SUCCESS,
  SET_LOADING,
  SET_PARAMS,
  UNSET_LOADING,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  deleteSuccess: false,
  dataToDelete: '',
  entriesNumber: 0,
  uploadFilesLoading: false,
  search: '',
  uploadedFiles: List([]),
  params: Map(***REMOVED***
    _sort: 'hash',
    _limit: 10,
    _page: 1,
***REMOVED***),
***REMOVED***);

function homePageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case CHANGE_PARAMS:
      return state.updateIn(action.keys, () => action.value);
    case DELETE_SUCCESS:
      return state.update('deleteSuccess', (v) => v = !v);
    case DROP_SUCCESS:
      return state
        .update('uploadedFiles', (list) => List(action.newFiles).concat(list));
    case GET_DATA_SUCCESS:
      return state
        .update('uploadedFiles', () => List(action.data))
        .update('entriesNumber', () => action.entriesNumber);
    case ON_SEARCH:
      return state.update('search', () => action.value);
    case ON_SEARCH_SUCCESS:
      return state.update('uploadedFiles', () => List(action.data));
    case SET_LOADING:
      return state.update('uploadFilesLoading', () => true);
    case SET_PARAMS:
      return state.set('params', Map(action.params));
    case UNSET_LOADING:
      return state.update('uploadFilesLoading', () => false);
    default:
      return state;
***REMOVED***
***REMOVED***

export default homePageReducer;
