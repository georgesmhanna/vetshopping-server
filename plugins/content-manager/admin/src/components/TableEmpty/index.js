/**
 *
 * TableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** upperFirst ***REMOVED*** from 'lodash';

import styles from './styles.scss';

function TableEmpty(***REMOVED*** colspan, contentType, filters, search ***REMOVED***) ***REMOVED***
  let id, values;
  const model = upperFirst(contentType);

  if (search !== '') ***REMOVED***
    id = 'withSearch';
    values = ***REMOVED*** contentType: model, search ***REMOVED***;
***REMOVED*** else ***REMOVED***
    id = filters.length > 0 ? 'withFilters' : 'withoutFilter';
    values = ***REMOVED*** contentType: model || 'entry' ***REMOVED***;
***REMOVED***

  return (
    <tr className=***REMOVED***styles.tableEmpty***REMOVED***>
      <td colSpan=***REMOVED***colspan + 1***REMOVED***>
        <FormattedMessage id=***REMOVED***`content-manager.components.TableEmpty.$***REMOVED***id***REMOVED***`***REMOVED*** values=***REMOVED***values***REMOVED*** />
      </td>
    </tr>
  );
***REMOVED***

TableEmpty.defaultProps = ***REMOVED***
  search: '',
***REMOVED***;

TableEmpty.propTypes = ***REMOVED***
  colspan: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  search: PropTypes.string,
***REMOVED***;

export default TableEmpty;
