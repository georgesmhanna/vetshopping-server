/**
 * 
 * VariableEditIcon
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.scss';

function VariableEditIcon(***REMOVED*** onClick, withLongerHeight, ...rest ***REMOVED***) ***REMOVED***
  return (
    <span
      className=***REMOVED***cn(withLongerHeight ? styles.editIconLonger : styles.editIcon)***REMOVED***
      onClick=***REMOVED***onClick***REMOVED***
      ***REMOVED***...rest***REMOVED***
    />
  );
***REMOVED***

VariableEditIcon.defaultProps = ***REMOVED***
  onClick: () => ***REMOVED******REMOVED***,
  withLongerHeight: false,
***REMOVED***;

VariableEditIcon.propTypes = ***REMOVED***
  onClick: PropTypes.func,
  withLongerHeight: PropTypes.bool,
***REMOVED***;

export default VariableEditIcon;