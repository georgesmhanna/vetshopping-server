/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your plugin.
 *
 */

import ***REMOVED*** addLocaleData ***REMOVED*** from 'react-intl';
import ***REMOVED*** reduce ***REMOVED*** from 'lodash';

// Import config
import ***REMOVED*** languages ***REMOVED*** from './config/languages.json';

/**
 * Try to require translation file.
 *
 * @param language ***REMOVED***String***REMOVED***
 */
const requireTranslations = language => ***REMOVED***
  try ***REMOVED***
    return require(`./translations/$***REMOVED***language***REMOVED***.json`); // eslint-disable-line global-require
***REMOVED*** catch (error) ***REMOVED***
    console.error(`Unable to load "$***REMOVED***language***REMOVED***" translation. Please make sure "$***REMOVED***language***REMOVED***.json" file exists in "admin/public/app/translations" folder.`); // eslint-disable-line no-console
    return false;
***REMOVED***
***REMOVED***;

/**
 * Try to require the language in `react-intl` locale data
 * and add locale data if it has been found.
 *
 * @param language ***REMOVED***String***REMOVED***
 */
const addLanguageLocaleData = language => ***REMOVED***
  try ***REMOVED***
    const localeData = require(`react-intl/locale-data/$***REMOVED***language***REMOVED***`); // eslint-disable-line global-require
    addLocaleData(localeData);
    return true;
***REMOVED*** catch (error) ***REMOVED***
    console.warn(`⚠️ It looks like the language "$***REMOVED***language***REMOVED***" is not supported by "react-intl" module.`); // eslint-disable-line no-console
    return false;
***REMOVED***
***REMOVED***;

/**
 * Dynamically generate `translationsMessages object`.
 */
const translationMessages = reduce(languages, (result, language) => ***REMOVED***
  const obj = result;
  obj[language] = requireTranslations(language);
  addLanguageLocaleData(language);
  return obj;
***REMOVED***, ***REMOVED******REMOVED***);

export ***REMOVED***
  languages,
  translationMessages,
***REMOVED***;
