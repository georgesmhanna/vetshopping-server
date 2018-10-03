/**
 * Generate filters object from URI
 * @param  ***REMOVED***String***REMOVED*** search
 * @return ***REMOVED***Object***REMOVED***
 */
const generateFiltersFromSearch = search => search
  .split('&')
  .filter(x => !x.includes('_limit') && !x.includes('_page') && !x.includes('_sort') && !x.includes('source') && !x.includes('_q='))
  .reduce((acc, curr) => ***REMOVED***
    const arr = curr.split('=');
    const split = arr[0].split('_');
    const filter = split.length > 1 ? `_$***REMOVED***split[1]***REMOVED***` : '=';
    acc.push(***REMOVED*** attr: split[0], filter, value: decodeURIComponent(arr[1]) ***REMOVED***);

    return acc;
***REMOVED***, []);

/**
 * Generate the search URI from filters
 * @param  ***REMOVED***Array***REMOVED*** filters Array of filter
 * @return ***REMOVED***String***REMOVED***
 */
const generateSearchFromFilters = filters => ***REMOVED***
  const base = filters.reduce((acc, curr, index) => ***REMOVED***
    const separator = curr.filter === '=' ? '' : '=';
    const base = `$***REMOVED***curr.attr***REMOVED***$***REMOVED***curr.filter***REMOVED***$***REMOVED***separator***REMOVED***$***REMOVED***curr.value***REMOVED***`;
    acc = index === 0 ? base : `$***REMOVED***acc***REMOVED***&$***REMOVED***base***REMOVED***`;

    return acc;
***REMOVED***, '');

  return filters.length > 0 ? `&$***REMOVED***base***REMOVED***` : '';
***REMOVED***;


/**
 * Generate the search URI from params
 * @param  ***REMOVED***Object***REMOVED*** params
 * @return ***REMOVED***String***REMOVED***
 */
const generateSearchFromParams = params =>
  Object.keys(params).reduce((acc, curr, index) => ***REMOVED***
    if (params[curr] !== '') ***REMOVED***
      if (index === 0) ***REMOVED***
        acc = `$***REMOVED***curr***REMOVED***=$***REMOVED***params[curr]***REMOVED***`;
***REMOVED*** else ***REMOVED***
        acc = `$***REMOVED***acc***REMOVED***&$***REMOVED***curr***REMOVED***=$***REMOVED***params[curr]***REMOVED***`;
***REMOVED***
***REMOVED***
    return acc;
***REMOVED***, '');

  /**
* Generate the redirect URI when editing an entry
* @type ***REMOVED***String***REMOVED***
*/
const generateRedirectURI = function (***REMOVED*** model, search ***REMOVED*** = ***REMOVED******REMOVED***) ***REMOVED***
  return `?redirectUrl=/plugins/content-manager/$***REMOVED***(model || this.getCurrentModelName()).toLowerCase()***REMOVED***$***REMOVED***(search || this.generateSearch())***REMOVED***`;
***REMOVED***;

export ***REMOVED***
  generateFiltersFromSearch,
  generateSearchFromFilters,
  generateSearchFromParams,
  generateRedirectURI,
***REMOVED***;
