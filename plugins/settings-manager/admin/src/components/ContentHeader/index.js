/**
*
* ContentHeader
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
function ContentHeader(***REMOVED*** name, description ***REMOVED***) ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  const title = name ? <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***name***REMOVED***`***REMOVED*** /> : <span />;
  const subTitle = description ? <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***description***REMOVED***`***REMOVED*** /> : <span />;
  return (
    <div className=***REMOVED***styles.contentHeader***REMOVED***>
      <div className=***REMOVED***styles.title***REMOVED***>
        ***REMOVED***title***REMOVED***
      </div>
      <div className=***REMOVED***styles.subTitle***REMOVED***>
        ***REMOVED***subTitle***REMOVED***
      </div>
    </div>
  );
***REMOVED***

ContentHeader.propTypes = ***REMOVED***
  description: PropTypes.string,
  name: PropTypes.string,
***REMOVED***;

export default ContentHeader;
