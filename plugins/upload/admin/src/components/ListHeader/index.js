/**
 *
 * ListHeader
 *
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import cn from 'classnames';
import PropTypes from 'prop-types';

// import InputCheckBox from 'components/InputCheckbox';

import styles from './styles.scss';

function ListHeader(***REMOVED*** changeSort, sort ***REMOVED***) ***REMOVED***
  const titles = [
    'hash',
    'name',
    'updated',
    'size',
    // 'related',
    '',
    '',
  ];

  const handleChangeSort = (name) => ***REMOVED***
    if (sort === name) ***REMOVED***
      changeSort(`-$***REMOVED***name***REMOVED***`);
***REMOVED*** else if (sort === `-$***REMOVED***name***REMOVED***`) ***REMOVED***
      changeSort('hash');
***REMOVED*** else if (name === 'updated' || name === 'related') ***REMOVED***
      changeSort('hash');
***REMOVED*** else ***REMOVED***
      changeSort(name);
***REMOVED***
***REMOVED***;

  const shouldDisplaySort = (title) => sort === title && styles.icon || sort === `-$***REMOVED***title***REMOVED***` && styles.iconDesc || '';

  return (
    <li className=***REMOVED***styles.listheaderWrapper***REMOVED***>
      <div className=***REMOVED***cn(styles.listHeader)***REMOVED***>
        <div>
          <div />
          <div className=***REMOVED***shouldDisplaySort('type')***REMOVED*** onClick=***REMOVED***() => handleChangeSort('type')***REMOVED***>
            <FormattedMessage id="upload.ListHeader.type" />
            <span />
          </div>
        </div>
        ***REMOVED***titles.map((title, key) => ***REMOVED***
          if (title !== '') ***REMOVED***
            return (
              <div key=***REMOVED***key***REMOVED*** className=***REMOVED***shouldDisplaySort(title)***REMOVED*** onClick=***REMOVED***() => handleChangeSort(title)***REMOVED***>
                <FormattedMessage id=***REMOVED***`upload.ListHeader.$***REMOVED***title***REMOVED***`***REMOVED*** />
                <span />
              </div>
            );
    ***REMOVED***

          return <div key=***REMOVED***key***REMOVED*** />;
  ***REMOVED***)***REMOVED***
      </div>
    </li>
  );
***REMOVED***

ListHeader.defaultProps = ***REMOVED***
  changeSort: () => ***REMOVED******REMOVED***,
***REMOVED***;

ListHeader.propTypes = ***REMOVED***
  changeSort: PropTypes.func,
  sort: PropTypes.string.isRequired,
***REMOVED***;

export default ListHeader;
