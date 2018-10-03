/**
 * 
 * TableLoading
 */
import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.scss';

function TableLoading(***REMOVED*** colspan ***REMOVED***) ***REMOVED***
  return (
    <tr className=***REMOVED***styles.tableLoading***REMOVED***>
      <td colSpan=***REMOVED***colspan + 1***REMOVED***>
        <LoadingIndicator />
      </td>
    </tr>
  );
***REMOVED***


TableLoading.propTypes = ***REMOVED***
  colspan: PropTypes.number.isRequired,
***REMOVED***;

export default TableLoading;