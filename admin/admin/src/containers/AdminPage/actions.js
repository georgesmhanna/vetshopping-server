/**
 *
 * AdminPage actions
 *
 */
import ***REMOVED***
  GET_CURR_ENV_SUCCEEDED,
  GET_GA_STATUS,
  GET_GA_STATUS_SUCCEEDED,
  GET_LAYOUT,
  GET_LAYOUT_SUCCEEDED,
  GET_STRAPI_VERSION_SUCCEEDED,
***REMOVED*** from './constants';

export function getCurrEnvSucceeded(currentEnvironment) ***REMOVED***
  return ***REMOVED***
    type: GET_CURR_ENV_SUCCEEDED,
    currentEnvironment,
***REMOVED***;
***REMOVED***

export function getGaStatus() ***REMOVED***
  return ***REMOVED***
    type: GET_GA_STATUS,
***REMOVED***;
***REMOVED***

export function getGaStatusSucceeded(allowGa) ***REMOVED***
  return ***REMOVED***
    type: GET_GA_STATUS_SUCCEEDED,
    allowGa,
***REMOVED***;
***REMOVED***

export function getLayout() ***REMOVED***
  return ***REMOVED***
    type: GET_LAYOUT,
***REMOVED***;
***REMOVED***

export function getLayoutSucceeded(layout) ***REMOVED***
  return ***REMOVED***
    type: GET_LAYOUT_SUCCEEDED,
    layout,
***REMOVED***;
***REMOVED***

export function getStrapiVersionSucceeded(strapiVersion) ***REMOVED***
  return ***REMOVED***
    type: GET_STRAPI_VERSION_SUCCEEDED,
    strapiVersion,
***REMOVED***;
***REMOVED***
