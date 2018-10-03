/**
 *
 * EntriesNumber
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import styles from './styles.scss';

function EntriesNumber(***REMOVED*** number ***REMOVED***) ***REMOVED***
  const id = number > 1 ? 'number.plural' : 'number';

  return (
    <div className=***REMOVED***styles.entriesNumberContainer***REMOVED***>
      <FormattedMessage id=***REMOVED***`upload.EntriesNumber.$***REMOVED***id***REMOVED***`***REMOVED*** values=***REMOVED******REMOVED*** number ***REMOVED******REMOVED*** />
    </div>
  );
***REMOVED***

EntriesNumber.defaultProps = ***REMOVED***
  number: 0,
***REMOVED***;

EntriesNumber.propTypes = ***REMOVED***
  number: PropTypes.number,
***REMOVED***;

export default EntriesNumber;
