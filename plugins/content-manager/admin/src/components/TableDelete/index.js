/**
 *
 * TableDelete
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import styles from './styles.scss';

function TableDelete(***REMOVED*** colspan, number, onToggleDeleteAll ***REMOVED***) ***REMOVED***
  const suffix = number > 1 ? 'plural' : 'singular';

  return (
    <tr className=***REMOVED***styles.tableDelete***REMOVED***>
      <td colSpan=***REMOVED***colspan + 1***REMOVED***>
        <FormattedMessage
          id=***REMOVED***`content-manager.components.TableDelete.entries.$***REMOVED***suffix***REMOVED***`***REMOVED***
          values=***REMOVED******REMOVED*** number ***REMOVED******REMOVED***
        >
          ***REMOVED***message => <span className=***REMOVED***styles.tableDeleteSpan***REMOVED***>***REMOVED***message***REMOVED***</span>***REMOVED***
        </FormattedMessage>
        <FormattedMessage
          id="content-manager.components.TableDelete.delete"
        >
          ***REMOVED***message => <span className=***REMOVED***styles.deleteAll***REMOVED*** onClick=***REMOVED***onToggleDeleteAll***REMOVED***>***REMOVED***message***REMOVED***</span>***REMOVED***
        </FormattedMessage>
      </td>
    </tr>
  );
***REMOVED***

TableDelete.defaultProps = ***REMOVED***
  colspan: 0,
***REMOVED***;

TableDelete.propTypes = ***REMOVED***
  colspan: PropTypes.number,
  number: PropTypes.number.isRequired,
  onToggleDeleteAll: PropTypes.func.isRequired,
***REMOVED***;

export default TableDelete;
