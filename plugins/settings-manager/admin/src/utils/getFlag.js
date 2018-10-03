import ***REMOVED*** toLower, size, forEach, upperCase, split ***REMOVED*** from 'lodash';

export default function getFlag(languageArray) ***REMOVED***
  return toLower(languageArray[size(languageArray) -1]);
***REMOVED***

export function formatLanguageLocale(data) ***REMOVED***
  const array = [];

  forEach(split(data, '_'), (value, key) => ***REMOVED***
    if (key === 0)***REMOVED***
      array.push(toLower(value));
***REMOVED*** else ***REMOVED***
      array.push(upperCase(value));
***REMOVED***
***REMOVED***);

  return array;
***REMOVED***
