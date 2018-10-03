/*
 *
 * NotificationProvider reducer
 *
 */

import ***REMOVED*** fromJS ***REMOVED*** from 'immutable';
import ***REMOVED***
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
***REMOVED*** from './constants';

const initialState = fromJS(***REMOVED***
  notifications: [],
***REMOVED***);

function notificationProviderReducer(state = initialState, action) ***REMOVED***
  // Init variable
  let index;

  switch (action.type) ***REMOVED***
    case SHOW_NOTIFICATION:
      return state.set('notifications', state.get('notifications').push(***REMOVED***
        message: action.message || 'app.utils.defaultMessage',
        status: action.status || 'success',
        id: action.id,
***REMOVED***));
    case HIDE_NOTIFICATION:
      // Check that the index exists
      state.get('notifications').forEach((notification, i) => ***REMOVED***
        if (notification.id === action.id) ***REMOVED***
          index = i;
  ***REMOVED***
***REMOVED***);

      if (typeof index !== 'undefined') ***REMOVED***
        // Remove the notification
        return state.set('notifications', state.get('notifications').splice(index, 1));
***REMOVED***

      // Notification not found, return the current state
      return state;
    default:
      return state;
***REMOVED***
***REMOVED***

export default notificationProviderReducer;
