/**
 *
 * TableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ***REMOVED*** isEmpty, isObject, toString ***REMOVED*** from 'lodash';
import cn from 'classnames';

import CustomInputCheckbox from 'components/CustomInputCheckbox';
import IcoContainer from 'components/IcoContainer';

import styles from './styles.scss';

class TableRow extends React.Component ***REMOVED***
  constructor(props) ***REMOVED***
    super(props);

    this.handleClick = this.handleClick.bind(this);
***REMOVED***

  /**
   * Return a formatted value according to the
   * data type and value stored in database
   *
   * @param type  ***REMOVED***String***REMOVED*** Data type
   * @param value ***REMOVED*******REMOVED***      Value stored in database
   * @returns ***REMOVED*******REMOVED***
   */
  getDisplayedValue(type, value, name) ***REMOVED***
    switch (type.toLowerCase()) ***REMOVED***
      case 'string':
      case 'text':
      case 'email':
      case 'enumeration':
        return (value && !isEmpty(value.toString())) || name === 'id' ? value.toString() : '-';
      case 'float':
      case 'integer':
      case 'biginteger':
      case 'decimal':
        return value && !isEmpty(value.toString()) ? value.toString() : '-';
      case 'boolean':
        return value !== null ? toString(value) : '-';
      case 'date':
      case 'time':
      case 'datetime':
      case 'timestamp': ***REMOVED***
        if (value === null) ***REMOVED***
          return '-';
  ***REMOVED***

        const date = value && isObject(value) && value._isAMomentObject === true ?
          value :
          moment.utc(value);

        return date.format('YYYY-MM-DD HH:mm:ss');
***REMOVED***
      case 'password':
        return '••••••••';
      default:
        return '-';
***REMOVED***
***REMOVED***

  // Redirect to the edit page
  handleClick() ***REMOVED***
    this.context.router.history.push(`$***REMOVED***this.props.destination***REMOVED***$***REMOVED***this.props.redirectUrl***REMOVED***`);
***REMOVED***

  renderAction = () => (
    <td key='action' className=***REMOVED***styles.actions***REMOVED***>
      <IcoContainer
        icons=***REMOVED***[
          ***REMOVED*** icoType: 'pencil', onClick: () => this.handleClick(this.props.destination) ***REMOVED***,
          ***REMOVED*** id: this.props.record.id, icoType: 'trash', onClick: this.props.onDelete ***REMOVED***,
        ]***REMOVED***
      />
    </td>
  );

  renderCells = () => ***REMOVED***
    const ***REMOVED*** headers ***REMOVED*** = this.props;
    return [this.renderDelete()]
      .concat(
        headers.map((header, i) => (
          <td key=***REMOVED***i***REMOVED***>
            <div className=***REMOVED***styles.truncate***REMOVED***>
              <div className=***REMOVED***styles.truncated***REMOVED***>
                ***REMOVED***this.getDisplayedValue(
                  header.type,
                  this.props.record[header.name],
                  header.name,
                )***REMOVED***
              </div>
            </div>
          </td>
        )))
      .concat([this.renderAction()]);
***REMOVED***

  renderDelete = () => ***REMOVED***
    if (this.props.enableBulkActions) ***REMOVED***
      return (
        <td onClick=***REMOVED***(e) => e.stopPropagation()***REMOVED*** key="i">
          <CustomInputCheckbox
            name=***REMOVED***this.props.record.id***REMOVED***
            onChange=***REMOVED***this.props.onChange***REMOVED***
            value=***REMOVED***this.props.value***REMOVED***
          />
        </td>
      );
***REMOVED***

    return null;
***REMOVED***

  render() ***REMOVED***
    return (
      <tr className=***REMOVED***cn(styles.tableRow, this.props.enableBulkActions && styles.tableRowWithBulk)***REMOVED*** onClick=***REMOVED***() => this.handleClick(this.props.destination)***REMOVED***>
        ***REMOVED***this.renderCells()***REMOVED***
      </tr>
    );
***REMOVED***
***REMOVED***

TableRow.contextTypes = ***REMOVED***
  router: PropTypes.object.isRequired,
***REMOVED***;

TableRow.defaultProps = ***REMOVED***
  enableBulkActions: true,
  value: false,
***REMOVED***;

TableRow.propTypes = ***REMOVED***
  destination: PropTypes.string.isRequired,
  enableBulkActions: PropTypes.bool,
  headers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  record: PropTypes.object.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  value: PropTypes.bool,
***REMOVED***;

TableRow.defaultProps = ***REMOVED***
  onDelete: () => ***REMOVED******REMOVED***,
***REMOVED***;

export default TableRow;
