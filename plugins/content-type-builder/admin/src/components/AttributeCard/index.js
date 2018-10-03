/**
*
* AttributeCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import IcoBoolean from '../../assets/images/icon_boolean.png';
import IcoDate from '../../assets/images/icon_date.png';
import IcoEmail from '../../assets/images/icon_email.png';
import IcoImage from '../../assets/images/icon_image.png';
import IcoJson from '../../assets/images/icon_json.png';
import IcoPassword from '../../assets/images/icon_password.png';
import IcoNumber from '../../assets/images/icon_number.png';
import IcoRelation from '../../assets/images/icon_relation.png';
import IcoString from '../../assets/images/icon_string.png';
import IcoText from '../../assets/images/icon_text.png';
import IcoEnum from '../../assets/images/icon_enum.png';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
const asset = ***REMOVED***
  'boolean': IcoBoolean,
  'date': IcoDate,
  'email': IcoEmail,
  'media': IcoImage,
  'number': IcoNumber,
  'json': IcoJson,
  'password': IcoPassword,
  'relation': IcoRelation,
  'string': IcoString,
  'text': IcoText,
  'enumeration': IcoEnum,
***REMOVED***;


class AttributeCard extends React.Component ***REMOVED***
  constructor(props) ***REMOVED***
    super(props);
    this.button = React.createRef();
***REMOVED***

  componentDidMount() ***REMOVED***
    if (this.props.autoFocus) ***REMOVED***
      return new Promise(resolve => ***REMOVED***
        setTimeout(() => ***REMOVED***
          this.focusNode();
          resolve();
  ***REMOVED*** 300);
***REMOVED***);
***REMOVED***
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    const ***REMOVED*** nodeToFocus, tabIndex ***REMOVED*** = this.props;

    if (prevProps.nodeToFocus !== nodeToFocus && tabIndex === nodeToFocus) ***REMOVED***
      this.focusNode();
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    this.props.resetNodeToFocus();
***REMOVED***

  focusNode = () => ***REMOVED***
    const node = this.button.current;
    return node.focus();
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** attribute, autoFocus, handleClick, tabIndex ***REMOVED*** = this.props;

    return (
      <div className="col-md-6">
        <button
          autoFocus=***REMOVED***autoFocus***REMOVED***
          className=***REMOVED***styles.attributeCardContainer***REMOVED***
          onClick=***REMOVED***() => handleClick(attribute.type)***REMOVED***
          type="button"
          tabIndex=***REMOVED***tabIndex + 1***REMOVED***
          ref=***REMOVED***this.button***REMOVED***
        >
          <div className=***REMOVED***styles.attributeCard***REMOVED***>
            <img src=***REMOVED***asset[attribute.type]***REMOVED*** alt="ico" />
            <FormattedMessage id=***REMOVED***`content-type-builder.popUpForm.attributes.$***REMOVED***attribute.type***REMOVED***.name`***REMOVED***>
              ***REMOVED***(message) => <span className=***REMOVED***styles.attributeType***REMOVED***>***REMOVED***message***REMOVED***</span>***REMOVED***
            </FormattedMessage>
            <FormattedMessage id=***REMOVED***attribute.description***REMOVED*** />
          </div>
        </button>
      </div>
    );
***REMOVED***
***REMOVED***

AttributeCard.defaultProps = ***REMOVED***
  autoFocus: false,
  nodeToFocus: 0,
  resetNodeToFocus: () => ***REMOVED******REMOVED***,
  tabIndex: 0,
***REMOVED***;

AttributeCard.propTypes = ***REMOVED***
  attribute: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  nodeToFocus: PropTypes.number,
  resetNodeToFocus: PropTypes.func,
  tabIndex: PropTypes.number,
***REMOVED***;

export default AttributeCard;
