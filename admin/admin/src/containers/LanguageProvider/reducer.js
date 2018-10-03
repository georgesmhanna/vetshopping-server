/*
 *
 * LanguageProvider reducer
 *
 */

import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';
import ***REMOVED*** first, get, includes, split ***REMOVED*** from 'lodash';

// Import supported languages from admin config.
import ***REMOVED*** languages ***REMOVED*** from '../../config/languages.json';

import ***REMOVED***
  CHANGE_LOCALE,
***REMOVED*** from './constants';

// Define a key to store and get user preferences in local storage.
const localStorageKey = 'strapi-admin-language';

// Detect user language.
const userLanguage = window.localStorage.getItem(localStorageKey) ||  window.navigator.language ||  window.navigator.userLanguage;

let foundLanguage = includes(languages, userLanguage) && userLanguage;
if (!foundLanguage) ***REMOVED***
  // Split user language in a correct format.
  const userLanguageShort = get(split(userLanguage, '-'), '0');

  // Check that the language is included in the admin configuration.
  foundLanguage = includes(languages, userLanguageShort) && userLanguageShort;
***REMOVED***

const initialState = fromJS(***REMOVED***
  locale: foundLanguage || first(languages) || 'en',
***REMOVED***);

function languageProviderReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case CHANGE_LOCALE:
      // Set user language in local storage.
      window.localStorage.setItem(localStorageKey, action.locale);
      strapi.currentLanguage = action.locale;
      
      return state
        .set('locale', action.locale);
    default:
      return state;
***REMOVED***
***REMOVED***

export default languageProviderReducer;
