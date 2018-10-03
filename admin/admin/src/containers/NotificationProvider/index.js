/*
 *
 * NotificationProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';

import NotificationsContainer from 'components/NotificationsContainer';
import ***REMOVED*** selectNotifications ***REMOVED*** from './selectors';
import ***REMOVED*** hideNotification ***REMOVED*** from './actions';

export class NotificationProvider extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <NotificationsContainer
        onHideNotification=***REMOVED***this.props.onHideNotification***REMOVED***
        notifications=***REMOVED***this.props.notifications***REMOVED***
      />
    );
***REMOVED***
***REMOVED***

NotificationProvider.propTypes = ***REMOVED***
  notifications: PropTypes.object.isRequired,
  onHideNotification: PropTypes.func.isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  notifications: selectNotifications(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    onHideNotification: (id) => ***REMOVED***
      dispatch(hideNotification(id));
***REMOVED***,
    dispatch,
***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(NotificationProvider);
