/**
 *
 * BlockLink
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

function BlockLink(***REMOVED*** content, isDocumentation, link, title ***REMOVED***) ***REMOVED***
  return (
    <a
      className=***REMOVED***cn(
        styles.blockLink,
        isDocumentation ? styles.blockLinkDocumentation : styles.blockLinkCode,
      )***REMOVED***
      href=***REMOVED***link***REMOVED***
      target="_blank"
    >
      <FormattedMessage ***REMOVED***...title***REMOVED*** />
      <FormattedMessage ***REMOVED***...content***REMOVED***>***REMOVED***message => <p>***REMOVED***message***REMOVED***</p>***REMOVED***</FormattedMessage>
    </a>
  );
***REMOVED***

BlockLink.propTypes = ***REMOVED***
  content: PropTypes.object.isRequired,
  isDocumentation: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.object.isRequired,
***REMOVED***;

export default BlockLink;
