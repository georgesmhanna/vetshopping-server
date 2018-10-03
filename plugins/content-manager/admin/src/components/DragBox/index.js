/**
 * 
 * DragBox
 */

import React from 'react';
import PropTypes from 'prop-types';
import DraggedRemovedIcon from 'components/DraggedRemovedIcon';

import GrabIcon from 'assets/images/icon_grab_blue.svg';

import styles from './styles.scss';


function DragBox(***REMOVED*** name ***REMOVED***) ***REMOVED***
  return (
    <div className=***REMOVED***styles.dragBox***REMOVED***>
      <img src=***REMOVED***GrabIcon***REMOVED*** alt="Grab Icon Active" />
      <span>***REMOVED***name***REMOVED***</span>
      <DraggedRemovedIcon isDragging />
    </div>
  );
***REMOVED***

DragBox.defaultProps = ***REMOVED***
  name: '',
***REMOVED***;

DragBox.propTypes = ***REMOVED***
  name: PropTypes.string,
***REMOVED***;

export default DragBox;