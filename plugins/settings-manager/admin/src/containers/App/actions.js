/*
 *
 * App actions
 *
 */

import ***REMOVED***
  ENVIRONMENTS_FETCH,
  ENVIRONMENTS_FETCH_SUCCEEDED,
  MENU_FETCH_SUCCEEDED,
  MENU_FETCH,
***REMOVED*** from './constants';

export function environmentsFetch() ***REMOVED***
  return ***REMOVED***
    type: ENVIRONMENTS_FETCH,
***REMOVED***;
***REMOVED***

export function environmentsFetchSucceeded(environments) ***REMOVED***
  return ***REMOVED***
    type: ENVIRONMENTS_FETCH_SUCCEEDED,
    environments,
***REMOVED***;
***REMOVED***

export function fetchMenuSucceeded(menu) ***REMOVED***
  return ***REMOVED***
    type: MENU_FETCH_SUCCEEDED,
    menu,
***REMOVED***;
***REMOVED***

export function menuFetch() ***REMOVED***
  return ***REMOVED***
    type: MENU_FETCH,
***REMOVED***;
***REMOVED***
