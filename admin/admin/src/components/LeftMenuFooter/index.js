/**
*
* LeftMenuFooter
*
*/

import React from 'react';
import ***REMOVED*** defineMessages, FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** PropTypes ***REMOVED*** from 'prop-types';

import styles from './styles.scss';
import messages from './messages.json';
defineMessages(messages);

function LeftMenuFooter(***REMOVED*** version ***REMOVED***) ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  return (
    <div className=***REMOVED***styles.leftMenuFooter***REMOVED***>
      <div>
        <FormattedMessage ***REMOVED***...messages.poweredBy***REMOVED*** />
        <a href="https://strapi.io" target="_blank">v***REMOVED***version***REMOVED***</a>
      </div>
    </div>
  );
***REMOVED***

LeftMenuFooter.propTypes = ***REMOVED***
  version: PropTypes.string.isRequired,
***REMOVED***;

export default LeftMenuFooter;
