/**
 * 
 * DraggedRemovedIcon
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function DraggedRemovedIcon(***REMOVED*** isDragging, onRemove, withLongerHeight, ...rest ***REMOVED***) ***REMOVED***
  let className;

  if (isDragging && withLongerHeight) ***REMOVED***
    className = styles.removeIconLongerDragged;
***REMOVED*** else if (withLongerHeight) ***REMOVED***
    className = styles.removeIconLonger;
***REMOVED*** else if (isDragging) ***REMOVED***
    className = styles.removeIconDragged;
***REMOVED*** else ***REMOVED***
    className = styles.removeIcon;
***REMOVED***

  return (
    <span
      className=***REMOVED***className***REMOVED***
      onClick=***REMOVED***onRemove***REMOVED***
      ***REMOVED***...rest***REMOVED***
    />
  );
***REMOVED***

DraggedRemovedIcon.defaultProps = ***REMOVED***
  isDragging: false,
  onRemove: () => ***REMOVED******REMOVED***,
  withLongerHeight: false,
***REMOVED***;

DraggedRemovedIcon.propTypes = ***REMOVED***
  isDragging: PropTypes.bool,
  onRemove: PropTypes.func,
  withLongerHeight: PropTypes.bool,
***REMOVED***;

export default DraggedRemovedIcon;