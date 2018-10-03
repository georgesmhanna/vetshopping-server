/**
 *
 * LeftMenuLink
 *
 */

import React from 'react';
import ***REMOVED*** startsWith, upperFirst ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom';

import en from 'translations/en.json';

import styles from './styles.scss';

class LeftMenuLink extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    // We need to create our own active url checker,
    // because of the two levels router.
    const isLinkActive = startsWith(
      window.location.pathname.replace('/admin', '').concat('/'),
      this.props.destination.concat('/'),
    );

    const plugin =
      this.props.source !== 'content-manager' && this.props.source !== '' ? (
        <div className=***REMOVED***styles.plugin***REMOVED***>
          <span>***REMOVED***upperFirst(this.props.source.split('-').join(' '))***REMOVED***</span>
        </div>
      ) : (
        ''
      );

    // Check if messageId exists in en locale to prevent warning messages
    const content = en[this.props.label] ? (
      <FormattedMessage
        id=***REMOVED***this.props.label***REMOVED***
        defaultMessage="***REMOVED***label***REMOVED***"
        values=***REMOVED******REMOVED***
          label: `$***REMOVED***this.props.label***REMOVED***`,
  ***REMOVED******REMOVED***
        className=***REMOVED***styles.linkLabel***REMOVED***
      />
    ) : (
      <span className=***REMOVED***styles.linkLabel***REMOVED***>***REMOVED***this.props.label***REMOVED***</span>
    );

    return (
      <li className=***REMOVED***styles.item***REMOVED***>
        <Link
          className=***REMOVED***`$***REMOVED***styles.link***REMOVED*** $***REMOVED***isLinkActive ? styles.linkActive : ''***REMOVED***`***REMOVED***
          to=***REMOVED******REMOVED***
            pathname: this.props.destination,
            search: this.props.source ? `?source=$***REMOVED***this.props.source***REMOVED***` : '',
    ***REMOVED******REMOVED***
        >
          <i className=***REMOVED***`$***REMOVED***styles.linkIcon***REMOVED*** fa-$***REMOVED***this.props.icon***REMOVED*** fa`***REMOVED*** />
          ***REMOVED***content***REMOVED***
        </Link>
        ***REMOVED***plugin***REMOVED***
      </li>
    );
***REMOVED***
***REMOVED***

LeftMenuLink.propTypes = ***REMOVED***
  destination: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  source: PropTypes.string,
***REMOVED***;

LeftMenuLink.defaultProps = ***REMOVED***
  source: '',
***REMOVED***;

export default LeftMenuLink;
