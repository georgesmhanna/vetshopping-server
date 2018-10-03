import 'whatwg-fetch';
import ***REMOVED*** dropRight, take ***REMOVED*** from 'lodash';
import removeMd from 'remove-markdown';
import ***REMOVED***
  call,
  fork,
  put,
  select,
  takeLatest,
***REMOVED*** from 'redux-saga/effects';

import request from 'utils/request';

import ***REMOVED*** getArticlesSucceeded, submitSucceeded ***REMOVED*** from './actions';
import ***REMOVED*** GET_ARTICLES, SUBMIT ***REMOVED*** from './constants';
import ***REMOVED*** makeSelectBody ***REMOVED*** from './selectors';

function* getArticles() ***REMOVED***
  try ***REMOVED***
    const articles = yield call(fetchArticles);
    const posts = articles.posts.reduce((acc, curr) => ***REMOVED***
      // Limit to 200 characters and remove last word.
      const content = dropRight(take(removeMd(curr.markdown), 250).join('').split(' ')).join(' ');

      acc.push(***REMOVED***
        title: curr.title,
        link: curr.slug,
        content: `$***REMOVED***content***REMOVED*** [...]`,
***REMOVED***);

      return acc;
***REMOVED***, []);

    yield put(getArticlesSucceeded(posts));
***REMOVED*** catch(err) ***REMOVED***
    // Silent
***REMOVED***
***REMOVED***


function* submit() ***REMOVED***
  try ***REMOVED***
    const body = yield select(makeSelectBody());
    yield call(request, 'https://analytics.strapi.io/register', ***REMOVED*** method: 'POST', body ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
    // silent
***REMOVED*** finally ***REMOVED***
    strapi.notification.success('HomePage.notification.newsLetter.success');
    yield put(submitSucceeded());
***REMOVED***
***REMOVED***

function* defaultSaga() ***REMOVED***
  yield fork(takeLatest, SUBMIT, submit);
  yield fork(takeLatest, GET_ARTICLES, getArticles);
***REMOVED***


function fetchArticles() ***REMOVED***
  return fetch('https://blog.strapi.io/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=1f260788b4ec&limit=2', ***REMOVED******REMOVED***)
    .then(resp => ***REMOVED***
      return resp.json ? resp.json() : resp;
***REMOVED***);
***REMOVED***
export default defaultSaga;
