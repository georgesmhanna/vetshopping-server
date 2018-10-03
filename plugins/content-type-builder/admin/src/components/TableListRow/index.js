/**
 *
 * TableListRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, startCase ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import IcoContainer from 'components/IcoContainer';
import ListRow from 'components/ListRow';
import PopUpWarning from 'components/PopUpWarning';
import styles from 'components/TableList/styles.scss';
import ***REMOVED*** router ***REMOVED*** from 'app';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-curly-brace-presence */

class TableListRow extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      showWarning: false,
***REMOVED***;
***REMOVED***

  handleEdit = () => ***REMOVED***
    router.push(
      `/plugins/content-type-builder/#edit$***REMOVED***this.props.rowItem.name***REMOVED***::contentType::baseSettings`,
    );
***REMOVED***;

  handleDelete = e => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete(this.props.rowItem.name);
    this.setState(***REMOVED*** showWarning: false ***REMOVED***);
***REMOVED***;

  handleGoTo = () => ***REMOVED***
    router.push(
      `/plugins/content-type-builder/models/$***REMOVED***this.props.rowItem.name***REMOVED***$***REMOVED***
        this.props.rowItem.source ? `&source=$***REMOVED***this.props.rowItem.source***REMOVED***` : ''
***REMOVED***`,
    );
***REMOVED***;

  toggleModalWarning = () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);

  handleShowModalWarning = () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);

  render() ***REMOVED***
    const pluginSource = this.props.rowItem.source ? (
      <FormattedMessage id="content-type-builder.from">
        ***REMOVED***message => (
          <span style=***REMOVED******REMOVED*** fontStyle: 'italic', color: '#787E8F', fontWeight: '500' ***REMOVED******REMOVED***>
            (***REMOVED***message***REMOVED***: ***REMOVED***this.props.rowItem.source***REMOVED***)
          </span>
        )***REMOVED***
      </FormattedMessage>
    ) : (
      ''
    );
    const temporary = this.props.rowItem.isTemporary ? (
      <FormattedMessage id="content-type-builder.contentType.temporaryDisplay" />
    ) : (
      ''
    );
    const description = isEmpty(this.props.rowItem.description)
      ? '-'
      : this.props.rowItem.description;
    const spanStyle = this.props.rowItem.isTemporary ? '60%' : '100%';
    const icons = this.props.rowItem.source
      ? []
      : [
        ***REMOVED*** icoType: 'pencil', onClick: this.handleEdit ***REMOVED***,
        ***REMOVED*** icoType: 'trash', onClick: this.handleShowModalWarning ***REMOVED***,
      ];

    return (
      <ListRow onClick=***REMOVED***this.handleGoTo***REMOVED***>
        <div className=***REMOVED***`col-md-4 $***REMOVED***styles.italic***REMOVED*** $***REMOVED***styles.nameContainer***REMOVED***`***REMOVED***>
          <i className=***REMOVED***`fa $***REMOVED***this.props.rowItem.icon***REMOVED***`***REMOVED*** />
          <span style=***REMOVED******REMOVED*** width: spanStyle ***REMOVED******REMOVED***>
            ***REMOVED***startCase(this.props.rowItem.name)***REMOVED*** &nbsp;***REMOVED***pluginSource***REMOVED***
          </span>
          &nbsp;***REMOVED***temporary***REMOVED***
        </div>
        <div className=***REMOVED***`col-md-5 text-center $***REMOVED***styles.descriptionContainer***REMOVED***`***REMOVED***>
          <div>***REMOVED***description***REMOVED***</div>
        </div>
        <div className="col-md-2 text-center">***REMOVED***this.props.rowItem.fields***REMOVED***</div>
        <div className="col-md-1">
          <IcoContainer icons=***REMOVED***icons***REMOVED*** />
        </div>
        <PopUpWarning
          isOpen=***REMOVED***this.state.showWarning***REMOVED***
          toggleModal=***REMOVED***this.toggleModalWarning***REMOVED***
          content=***REMOVED******REMOVED*** message: 'content-type-builder.popUpWarning.bodyMessage.contentType.delete' ***REMOVED******REMOVED***
          popUpWarningType=***REMOVED***'danger'***REMOVED***
          onConfirm=***REMOVED***this.handleDelete***REMOVED***
        />
      </ListRow>
    );
***REMOVED***
***REMOVED***

TableListRow.propTypes = ***REMOVED***
  onDelete: PropTypes.func.isRequired,
  rowItem: PropTypes.object.isRequired,
***REMOVED***;

export default TableListRow;
