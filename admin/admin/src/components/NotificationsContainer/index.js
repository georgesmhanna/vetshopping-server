/**
*
* NotificationsContainer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** CSSTransition, TransitionGroup ***REMOVED*** from 'react-transition-group';

import Notification from 'components/Notification';

import styles from './styles.scss';

class NotificationsContainer extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    if (this.props.notifications.length === 0) ***REMOVED***
      return (false);
***REMOVED***

    const notifications = this.props.notifications.map((notification, i) => (
      <CSSTransition
        key=***REMOVED***i***REMOVED***
        classNames="notification"
        timeout=***REMOVED******REMOVED***
          enter: 500,
          exit: 300,
  ***REMOVED******REMOVED***
      >
        <Notification
          key=***REMOVED***notification.id***REMOVED***
          onHideNotification=***REMOVED***this.props.onHideNotification***REMOVED***
          notification=***REMOVED***notification***REMOVED***
        />
      </CSSTransition>
    ));

    return (
      <TransitionGroup className=***REMOVED***styles.notificationsContainer***REMOVED***>
        ***REMOVED***notifications***REMOVED***
      </TransitionGroup>
    );
***REMOVED***
***REMOVED***

NotificationsContainer.defaultProps = ***REMOVED***
  notifications: [
    ***REMOVED***
      id: 1,
      message: 'app.utils.defaultMessage',
      status: 'success',
***REMOVED***,
  ],
***REMOVED***;

NotificationsContainer.propTypes = ***REMOVED***
  notifications: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onHideNotification: PropTypes.func.isRequired,
***REMOVED***;

export default NotificationsContainer;
