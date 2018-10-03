import ***REMOVED*** isPlainObject, isFunction ***REMOVED*** from 'lodash';

export const bindLayout = function (object) ***REMOVED***
  return Object.keys(object).reduce((acc, current) => ***REMOVED***
    if (isPlainObject(object[current])) ***REMOVED***
      acc[current] = bindLayout.call(this, object[current]);
***REMOVED*** else if (isFunction(object[current])) ***REMOVED***
      acc[current] = object[current].bind(this);
***REMOVED*** else ***REMOVED***
      acc[current] = object[current];
***REMOVED***

    return acc;
***REMOVED***, ***REMOVED******REMOVED***);
***REMOVED***;
