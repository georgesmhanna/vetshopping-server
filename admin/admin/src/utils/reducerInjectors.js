import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import createReducer from '../reducers';
import checkStore from './checkStore';

export function injectReducerFactory(store, isValid) ***REMOVED***
  return function injectReducer(key, reducer) ***REMOVED***
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
***REMOVED***;
***REMOVED***

export default function getInjectors(store) ***REMOVED***
  checkStore(store);

  return ***REMOVED***
    injectReducer: injectReducerFactory(store, true),
***REMOVED***;
***REMOVED***
