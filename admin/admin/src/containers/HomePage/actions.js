import ***REMOVED***
  GET_ARTICLES,
  GET_ARTICLES_SUCCEEDED,
  ON_CHANGE,
  SUBMIT,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

export function getArticles() ***REMOVED***
  return ***REMOVED***
    type: GET_ARTICLES,
***REMOVED***;
***REMOVED***

export function getArticlesSucceeded(articles) ***REMOVED***
  return ***REMOVED***
    type: GET_ARTICLES_SUCCEEDED,
    articles,
***REMOVED***;
***REMOVED***

export function onChange(***REMOVED*** target ***REMOVED***) ***REMOVED***
  return ***REMOVED***
    type: ON_CHANGE,
    value: target.value,
***REMOVED***;
***REMOVED***

export function submit() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
***REMOVED***;
***REMOVED***

export function submitSucceeded() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCEEDED,
***REMOVED***;
***REMOVED***
