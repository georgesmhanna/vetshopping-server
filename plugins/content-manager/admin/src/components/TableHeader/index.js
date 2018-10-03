/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CustomInputCheckbox from 'components/CustomInputCheckbox';

import styles from './styles.scss';

class TableHeader extends React.Component ***REMOVED***
  handleChangeSort(name) ***REMOVED***
    if (this.props.sort === name) ***REMOVED***
      this.props.onChangeSort(`-$***REMOVED***name***REMOVED***`);
***REMOVED*** else if (this.props.sort === `-$***REMOVED***name***REMOVED***`) ***REMOVED***
      this.props.onChangeSort(this.props.primaryKey);
***REMOVED*** else ***REMOVED***
      this.props.onChangeSort(name);
***REMOVED***
***REMOVED***

  renderBulk = () => ***REMOVED***
    if (this.props.enableBulkActions) ***REMOVED***
      return (
        <th key="bulk_action">
          <CustomInputCheckbox
            entriesToDelete=***REMOVED***this.props.entriesToDelete***REMOVED***
            isAll
            name="all"
            onChange=***REMOVED***this.props.onClickSelectAll***REMOVED***
            value=***REMOVED***this.props.value***REMOVED***
          />
        </th>
      );
***REMOVED***

    return null;
***REMOVED***

  render() ***REMOVED***
    // Generate headers list
    const headers = this.props.headers.map((header, i) => ***REMOVED***
      // Define sort icon
      let icon;

      if (this.props.sort === header.name || this.props.sort === 'id' && header.name === '_id') ***REMOVED***
        icon = <i className=***REMOVED***`fa fa-sort-asc $***REMOVED***styles.iconAsc***REMOVED***`***REMOVED*** />;
***REMOVED*** else if (this.props.sort === `-$***REMOVED***header.name***REMOVED***`) ***REMOVED***
        icon = <i className=***REMOVED***`fa fa-sort-asc $***REMOVED***styles.iconDesc***REMOVED***`***REMOVED*** />;
***REMOVED***

      return (
        <th // eslint-disable-line jsx-a11y/no-static-element-interactions
          key=***REMOVED***i***REMOVED***
          onClick=***REMOVED***() => ***REMOVED***
            if (header.sortable) ***REMOVED***
              this.handleChangeSort(header.name);
      ***REMOVED***
    ***REMOVED******REMOVED***
        >
          <span>
            ***REMOVED***header.label***REMOVED***
            ***REMOVED***icon***REMOVED***
          </span>

        </th>
      );
***REMOVED***);

    // Add empty th for actions column.
    headers.push(<th key="th_action"></th>);

    return (
      <thead className=***REMOVED***cn(styles.tableHeader, this.props.enableBulkActions && styles.withBulk)***REMOVED***>
        <tr >
          ***REMOVED***[this.renderBulk()].concat(headers)***REMOVED***
        </tr>
      </thead>
    );
***REMOVED***
***REMOVED***

TableHeader.defaultProps = ***REMOVED***
  enableBulkActions: true,
  value: false,
***REMOVED***;

TableHeader.propTypes = ***REMOVED***
  enableBulkActions: PropTypes.bool,
  entriesToDelete: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onClickSelectAll: PropTypes.func.isRequired,
  primaryKey: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  value: PropTypes.bool,
***REMOVED***;

export default TableHeader;
