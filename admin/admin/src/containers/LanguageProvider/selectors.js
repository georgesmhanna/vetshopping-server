import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = () => (state) => state.get('language');

/**
 * Select the language locale
 */

const selectLocale = () => createSelector(
  selectLanguage(),
  (languageState) => languageState.get('locale')
);

export ***REMOVED***
  selectLanguage,
  selectLocale,
***REMOVED***;
