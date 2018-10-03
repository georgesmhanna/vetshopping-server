/**
 *
 * Flex
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Flex = (***REMOVED*** children, onClick ***REMOVED***) => <div className=***REMOVED***styles.flexWrapper***REMOVED*** onClick=***REMOVED***onClick***REMOVED***>***REMOVED***children***REMOVED***</div>;
Flex.propTypes = ***REMOVED***
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
***REMOVED***;

export default Flex;
