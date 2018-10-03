/**
*
* Table
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** toString ***REMOVED*** from 'lodash';

import TableDelete from 'components/TableDelete';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableEmpty from 'components/TableEmpty';
import TableLoading from 'components/TableLoading';

import styles from './styles.scss';

class Table extends React.Component ***REMOVED***
  render() ***REMOVED***
    const rows = this.props.records.length === 0 ?
      (
        <TableEmpty
          filters=***REMOVED***this.props.filters***REMOVED***
          colspan=***REMOVED***this.props.enableBulkActions ? this.props.headers.length + 1 : this.props.headers.length***REMOVED***
          contentType=***REMOVED***this.props.routeParams.slug***REMOVED***
          search=***REMOVED***this.props.search***REMOVED***
        />
      ) :
      this.props.records.map((record, key) => (
        <TableRow
          enableBulkActions=***REMOVED***this.props.enableBulkActions***REMOVED***
          onChange=***REMOVED***this.props.onClickSelect***REMOVED***
          key=***REMOVED***key***REMOVED***
          destination=***REMOVED***`$***REMOVED***this.props.route.path.replace(':slug', this.props.routeParams.slug)***REMOVED***/$***REMOVED***record[this.props.primaryKey]***REMOVED***`***REMOVED***
          headers=***REMOVED***this.props.headers***REMOVED***
          record=***REMOVED***record***REMOVED***
          history=***REMOVED***this.props.history***REMOVED***
          primaryKey=***REMOVED***this.props.primaryKey***REMOVED***
          onDelete=***REMOVED***this.props.handleDelete***REMOVED***
          redirectUrl=***REMOVED***this.props.redirectUrl***REMOVED***
          value=***REMOVED***this.props.entriesToDelete.indexOf(toString(record.id)) !== -1***REMOVED***
        />
      ));
    const entriesToDeleteNumber = this.props.entriesToDelete.length;

    return (
      <table className=***REMOVED***`table $***REMOVED***styles.table***REMOVED***`***REMOVED***>
        <TableHeader
          enableBulkActions=***REMOVED***this.props.enableBulkActions***REMOVED***
          onClickSelectAll=***REMOVED***this.props.onClickSelectAll***REMOVED***
          value=***REMOVED***this.props.deleteAllValue***REMOVED***
          headers=***REMOVED***this.props.headers***REMOVED***
          onChangeSort=***REMOVED***this.props.onChangeSort***REMOVED***
          sort=***REMOVED***this.props.sort***REMOVED***
          primaryKey=***REMOVED***this.props.primaryKey***REMOVED***
          entriesToDelete=***REMOVED***this.props.entriesToDelete***REMOVED***
        />
        <tbody>
          ***REMOVED*** entriesToDeleteNumber > 0 && (
            <TableDelete
              colspan=***REMOVED***this.props.headers.length + 1***REMOVED***
              number=***REMOVED***entriesToDeleteNumber***REMOVED***
              onToggleDeleteAll=***REMOVED***this.props.onToggleDeleteAll***REMOVED***
            />
          )***REMOVED***
          ***REMOVED***this.props.showLoader ? <TableLoading colspan=***REMOVED***this.props.headers.length + 1***REMOVED*** /> : rows***REMOVED***
        </tbody>
      </table>
    );
***REMOVED***
***REMOVED***

Table.contextTypes = ***REMOVED***
  router: PropTypes.object.isRequired,
***REMOVED***;

Table.defaultProps = ***REMOVED***
  enableBulkActions: true,
  entriesToDelete: [],
  handleDelete: () => ***REMOVED******REMOVED***,
  search: '',
  showLoader: false,
***REMOVED***;

Table.propTypes = ***REMOVED***
  deleteAllValue: PropTypes.bool.isRequired,
  enableBulkActions: PropTypes.bool,
  entriesToDelete: PropTypes.array,
  filters: PropTypes.array.isRequired,
  handleDelete: PropTypes.func,
  headers: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  onClickSelectAll: PropTypes.func.isRequired,
  onToggleDeleteAll: PropTypes.func.isRequired,
  primaryKey: PropTypes.string.isRequired,
  records: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  redirectUrl: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  search: PropTypes.string,
  showLoader: PropTypes.bool,
  sort: PropTypes.string.isRequired,
***REMOVED***;

export default Table;
