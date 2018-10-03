/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** IntlProvider ***REMOVED*** from 'react-intl';
import ***REMOVED*** defaultsDeep ***REMOVED*** from 'lodash';
import ***REMOVED*** selectLocale ***REMOVED*** from './selectors';

export class LanguageProvider extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const messages = defaultsDeep(this.props.messages[this.props.locale], this.props.messages.en);

    return (
      <IntlProvider locale=***REMOVED***this.props.locale***REMOVED*** defaultLocale="en" messages=***REMOVED***messages***REMOVED***>
        ***REMOVED***React.Children.only(this.props.children)***REMOVED***
      </IntlProvider>
    );
***REMOVED***
***REMOVED***

LanguageProvider.propTypes = ***REMOVED***
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
***REMOVED***;


const mapStateToProps = createSelector(
  selectLocale(),
  (locale) => (***REMOVED*** locale ***REMOVED***)
);

function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    dispatch,
***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
