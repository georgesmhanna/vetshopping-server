/**
 *
 * AttributeRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** capitalize, get, has ***REMOVED*** from 'lodash';

import PopUpWarning from 'components/PopUpWarning';
import IcoContainer from 'components/IcoContainer';

import IcoBoolean from '../../assets/images/icon_boolean.png';
import IcoDate from '../../assets/images/icon_date.png';
import IcoEmail from '../../assets/images/icon_email.png';
import IcoImage from '../../assets/images/icon_image.png';
import IcoNumber from '../../assets/images/icon_number.png';
import IcoJson from '../../assets/images/icon_json.png';
import IcoPassword from '../../assets/images/icon_password.png';
import IcoRelation from '../../assets/images/icon_relation.png';
import IcoString from '../../assets/images/icon_string.png';
import IcoText from '../../assets/images/icon_text.png';
import IcoEnum from '../../assets/images/icon_enum.png';
import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-curly-brace-presence */
class AttributeRow extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.asset = ***REMOVED***
      boolean: IcoBoolean,
      date: IcoDate,
      media: IcoImage,
      number: IcoNumber,
      json: IcoJson,
      relation: IcoRelation,
      string: IcoString,
      text: IcoText,
      integer: IcoNumber,
      float: IcoNumber,
      decimal: IcoNumber,
      email: IcoEmail,
      password: IcoPassword,
      enumeration: IcoEnum,
***REMOVED***;
    this.state = ***REMOVED***
      showWarning: false,
***REMOVED***;
***REMOVED***

  handleEdit = () => this.props.onEditAttribute(this.props.row.name);

  handleDelete = () => ***REMOVED***
    this.props.onDelete(this.props.row.name);
    this.setState(***REMOVED*** showWarning: false ***REMOVED***);
***REMOVED***;

  handleShowModalWarning = () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);

  toggleModalWarning = () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);

  renderAttributesBox = () => ***REMOVED***
    const attributeType = this.props.row.params.type || 'relation';
    const src = this.asset[attributeType];
    return <img src=***REMOVED***src***REMOVED*** alt="ico" />;
***REMOVED***;

  render() ***REMOVED***
    const isNotEditable =
      has(this.props.row.params, 'configurable') && !this.props.row.params.configurable;
    const type =
      get(this.props.row, 'params.type') === 'text' &&
      get(this.props.row, 'params.appearance.WYSIWYG') === true
        ? 'WYSIWYG'
        : this.props.row.params.type;
    const relationType = this.props.row.params.type ? (
      <FormattedMessage id=***REMOVED***`content-type-builder.attribute.$***REMOVED***type***REMOVED***`***REMOVED*** />
    ) : (
      <div>
        <FormattedMessage id="content-type-builder.modelPage.attribute.relationWith" />
        &nbsp;
        <FormattedMessage id="content-type-builder.from">
          ***REMOVED***message => (
            <span style=***REMOVED******REMOVED*** fontStyle: 'italic' ***REMOVED******REMOVED***>
              ***REMOVED***capitalize(this.props.row.params.target)***REMOVED***&nbsp;
              ***REMOVED***this.props.row.params.pluginValue
                ? `($***REMOVED***message***REMOVED***: $***REMOVED***this.props.row.params.pluginValue***REMOVED***)`
                : ''***REMOVED***
            </span>
          )***REMOVED***
        </FormattedMessage>
      </div>
    );
    const relationStyle = !this.props.row.params.type ? styles.relation : '';
    const icons = isNotEditable
      ? [***REMOVED*** icoType: 'lock' ***REMOVED***]
      : [
        ***REMOVED*** icoType: 'pencil', onClick: this.handleEdit ***REMOVED***,
        ***REMOVED***
          icoType: 'trash',
          onClick: () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***),
  ***REMOVED***
      ];
    const editableStyle = isNotEditable ? '' : styles.editable;

    return (
      <li
        className=***REMOVED***`$***REMOVED***styles.attributeRow***REMOVED*** $***REMOVED***editableStyle***REMOVED*** $***REMOVED***relationStyle***REMOVED***`***REMOVED***
        onClick=***REMOVED***() => ***REMOVED***
          isNotEditable ? () => ***REMOVED******REMOVED*** : this.handleEdit();
  ***REMOVED******REMOVED***
      >
        <div className=***REMOVED***styles.flex***REMOVED***>
          <div className=***REMOVED***styles.nameContainer***REMOVED***>
            ***REMOVED***this.renderAttributesBox()***REMOVED***
            <div>***REMOVED***this.props.row.name***REMOVED***</div>
          </div>
          <div className=***REMOVED***styles.relationContainer***REMOVED***>***REMOVED***relationType***REMOVED***</div>
          <div className=***REMOVED***styles.mainField***REMOVED*** />
          <IcoContainer icons=***REMOVED***icons***REMOVED*** />
        </div>
        <PopUpWarning
          isOpen=***REMOVED***this.state.showWarning***REMOVED***
          toggleModal=***REMOVED***this.toggleModalWarning***REMOVED***
          content=***REMOVED******REMOVED*** message: 'content-type-builder.popUpWarning.bodyMessage.attribute.delete' ***REMOVED******REMOVED***
          popUpWarningType=***REMOVED***'danger'***REMOVED***
          onConfirm=***REMOVED***this.handleDelete***REMOVED***
        />
      </li>
    );
***REMOVED***
***REMOVED***

AttributeRow.propTypes = ***REMOVED***
  onDelete: PropTypes.func.isRequired,
  onEditAttribute: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
***REMOVED***;

export default AttributeRow;
