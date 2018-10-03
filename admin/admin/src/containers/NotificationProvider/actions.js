/*
 *
 * NotificationProvider actions
 *
 */

import ***REMOVED*** dispatch ***REMOVED*** from 'app';

import ***REMOVED***
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
***REMOVED*** from './constants';

let nextNotificationId = 0;

export function showNotification(message, status) ***REMOVED***
  nextNotificationId++; // eslint-disable-line no-plusplus

  // Start timeout to hide the notification
  ((id) => ***REMOVED***
    setTimeout(() => ***REMOVED***
      dispatch(hideNotification(id));
***REMOVED***, 2500);
***REMOVED***)(nextNotificationId);

  return ***REMOVED***
    type: SHOW_NOTIFICATION,
    message,
    status,
    id: nextNotificationId,
***REMOVED***;
***REMOVED***

export function hideNotification(id) ***REMOVED***
  return ***REMOVED***
    type: HIDE_NOTIFICATION,
    id,
***REMOVED***;
***REMOVED***
