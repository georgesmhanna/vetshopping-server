/**
 *
 * HomePage reducer
 */

import ***REMOVED*** fromJS, List, Map ***REMOVED*** from 'immutable';

import ***REMOVED*** GET_ARTICLES_SUCCEEDED, ON_CHANGE, SUBMIT_SUCCEEDED ***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  articles: List([
    ***REMOVED***content: '', title: '', link: ''***REMOVED***,
    ***REMOVED***content: '', title: '', link: ''***REMOVED***,
  ]),
  body: Map(***REMOVED***
    email: '',
***REMOVED***),
***REMOVED***);

function homePageReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case GET_ARTICLES_SUCCEEDED:
      return state.update('articles', () => List(action.articles));
    case ON_CHANGE:
      return state.updateIn(['body', 'email'], () => action.value);
    case SUBMIT_SUCCEEDED:
      return state.updateIn(['body', 'email'], () => '');
    default:
      return state;
***REMOVED***
***REMOVED***

export default homePageReducer;
