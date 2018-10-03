const CONTENT_TYPE = 'contentType';
const IS_MODEL_TEMPORARY = 'isModelTemporay';
const MENU = 'menu';
const MODEL = 'model';
const parse = JSON.parse;
const stringify = JSON.stringify;
/* eslint-disable consistent-return */

export const storeData = ***REMOVED***
  clearAppStorage() ***REMOVED***
    if (localStorage) ***REMOVED***
      localStorage.removeItem(CONTENT_TYPE);
      localStorage.removeItem(IS_MODEL_TEMPORARY);
      localStorage.removeItem(MENU);
      return localStorage.removeItem(MODEL);
***REMOVED***
***REMOVED***,

  clearContentType(contentType = CONTENT_TYPE) ***REMOVED***
    if (localStorage) ***REMOVED***
      return localStorage.removeItem(contentType);
***REMOVED***
***REMOVED***,

  clearMenu(menu = MENU) ***REMOVED***
    if (localStorage) ***REMOVED***
      return localStorage.removeItem(menu);
***REMOVED***
***REMOVED***,

  getContentType(contentType = CONTENT_TYPE) ***REMOVED***
    return parse(localStorage.getItem(contentType)) || null;
***REMOVED***,


  getIsModelTemporary(isModelTemporay = IS_MODEL_TEMPORARY) ***REMOVED***
    return localStorage.getItem(isModelTemporay) || null;
***REMOVED***,

  getMenu(menu = MENU) ***REMOVED***
    return parse(localStorage.getItem(menu)) || null;
***REMOVED***,

  getModel(model = MODEL) ***REMOVED***
    return parse(localStorage.getItem(model)) || null;
***REMOVED***,

  setContentType(data, contentType = CONTENT_TYPE) ***REMOVED***
    if (localStorage) ***REMOVED***
      return localStorage.setItem(contentType, stringify(data));
***REMOVED***

    return strapi.notification.info('content-type-builder.notification.info.optimized');
***REMOVED***,

  setMenu(data, menu = MENU) ***REMOVED***
    if (localStorage) ***REMOVED***
      return localStorage.setItem(menu, stringify(data));
***REMOVED***

    return strapi.notification.info('content-type-builder.notification.info.optimized');
***REMOVED***,

  setModel(data, model = MODEL) ***REMOVED***
    if (localStorage) ***REMOVED***
      return localStorage.setItem(model, stringify(data));
***REMOVED***

    return strapi.notification.info('content-type-builder.notification.info.optimized');
***REMOVED***,

  setIsModelTemporary(isModelTemporay = IS_MODEL_TEMPORARY) ***REMOVED***
    if (localStorage) ***REMOVED***
      return localStorage.setItem(isModelTemporay, true);
***REMOVED***

    return strapi.notification.info('content-type-builder.notification.info.optimized');
***REMOVED***,
***REMOVED***;
