/**
 *
 * Notification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** isObject ***REMOVED*** from 'lodash';

import styles from './styles.scss';

class Notification extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  handleCloseClicked = () => ***REMOVED***
    this.props.onHideNotification(this.props.notification.id);
***REMOVED***;

  options = ***REMOVED***
    success: ***REMOVED***
      icon: 'fa-check',
      title: 'Success',
      class: 'notificationSuccess',
***REMOVED***,
    warning: ***REMOVED***
      icon: 'fa-exclamation',
      title: 'Warning',
      class: 'notificationWarning',
***REMOVED***,
    error: ***REMOVED***
      icon: 'fa-exclamation',
      title: 'Error',
      class: 'notificationError',
***REMOVED***,
    info: ***REMOVED***
      icon: 'fa-info',
      title: 'Info',
      class: 'notificationInfo',
***REMOVED***,
***REMOVED***;

  render() ***REMOVED***
    const options = this.options[this.props.notification.status] || this.options.info;
    const ***REMOVED*** notification: ***REMOVED*** message ***REMOVED*** ***REMOVED*** = this.props;
    const content = isObject(message) && message.id ?
      <FormattedMessage id=***REMOVED***message.id***REMOVED*** defaultMessage=***REMOVED***message.id***REMOVED*** values=***REMOVED***message.values***REMOVED*** />
      : <FormattedMessage id=***REMOVED***message***REMOVED*** defaultMessage=***REMOVED***message***REMOVED*** />;

    return (
      <li key=***REMOVED***this.props.notification.id***REMOVED*** className=***REMOVED***`$***REMOVED***styles.notification***REMOVED*** $***REMOVED***styles[options.class]***REMOVED***`***REMOVED*** onClick=***REMOVED***this.handleCloseClicked***REMOVED***>
        <i className=***REMOVED***`fa $***REMOVED***options.icon***REMOVED*** $***REMOVED***styles.notificationIcon***REMOVED***`***REMOVED*** />
        <div className=***REMOVED***styles.notificationContent***REMOVED***>
          <p className=***REMOVED***styles.notificationTitle***REMOVED***>
            ***REMOVED***content***REMOVED***
          </p>
        </div>
        <i className=***REMOVED***`fa fa-close $***REMOVED***styles.notificationClose***REMOVED***`***REMOVED*** onClick=***REMOVED***this.handleCloseClicked***REMOVED*** />
      </li>
    );
***REMOVED***
***REMOVED***

Notification.defaultProps = ***REMOVED***
  notification: ***REMOVED***
    id: 1,
    message: 'app.utils.defaultMessage',
    status: 'success',
***REMOVED***,
***REMOVED***;

Notification.propTypes = ***REMOVED***
  notification: PropTypes.shape(***REMOVED***
    id: PropTypes.number,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape(***REMOVED***
        id: PropTypes.string,
        values: PropTypes.object,
***REMOVED***),
    ]),
    status: PropTypes.string,
***REMOVED***),
  onHideNotification: PropTypes.func.isRequired,
***REMOVED***;

export default Notification;
