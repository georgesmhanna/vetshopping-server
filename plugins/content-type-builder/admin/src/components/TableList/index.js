/**
*
* TableList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import Button from 'components/Button';
import TableListRow from 'components/TableListRow';
import styles from './styles.scss';

class TableList extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <div className=***REMOVED***styles.tableListContainer***REMOVED***>
        <div className="container-fluid">
          <div className="row">
            <div className=***REMOVED***styles.headerContainer***REMOVED***>
              <div className=***REMOVED***styles.titleContainer***REMOVED***>
                ***REMOVED***this.props.availableNumber***REMOVED***&nbsp;<FormattedMessage ***REMOVED***...***REMOVED*** id: this.props.title ***REMOVED******REMOVED*** />
              </div>
              <div className=***REMOVED***styles.buttonContainer***REMOVED***>
                <Button
                  secondaryHotlineAdd
                  label=***REMOVED***this.props.buttonLabel***REMOVED***
                  onClick=***REMOVED***this.props.onButtonClick***REMOVED***
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className=***REMOVED***styles.ulContainer***REMOVED***>
              <ul>
                <li>
                  <div className=***REMOVED***`$***REMOVED***styles.liHeaderContainer***REMOVED*** row`***REMOVED***>
                    <div className="col-md-1"></div>
                    <div className="col-md-3"><FormattedMessage ***REMOVED***...***REMOVED*** id: 'content-type-builder.table.contentType.head.name' ***REMOVED******REMOVED*** /></div>
                    <div className="col-md-5 text-center"><FormattedMessage ***REMOVED***...***REMOVED*** id: 'content-type-builder.table.contentType.head.description' ***REMOVED******REMOVED*** /></div>
                    <div className="col-md-2 text-center"><FormattedMessage ***REMOVED***...***REMOVED*** id: 'content-type-builder.table.contentType.head.fields' ***REMOVED******REMOVED*** /></div>
                    <div className="col-md-1"></div>
                  </div>
                </li>
                ***REMOVED***map(this.props.rowItems, (rowItem, key) => (
                  <TableListRow
                    key=***REMOVED***key***REMOVED***
                    onDelete=***REMOVED***this.props.onHandleDelete***REMOVED***
                    rowItem=***REMOVED***rowItem***REMOVED***
                  />
                ))***REMOVED***
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

TableList.propTypes = ***REMOVED***
  availableNumber: PropTypes.number.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  rowItems: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
***REMOVED***;

export default TableList;
