/**
 * CTAWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function CTAWrapper(***REMOVED*** children ***REMOVED***) ***REMOVED***
  return <div style=***REMOVED***style***REMOVED***>***REMOVED***children***REMOVED***</div>;
***REMOVED***

const style = ***REMOVED***
  position: 'fixed',
  top: '0',
  right: '0',
  display: 'flex',
  zIndex: '1050',
***REMOVED***;

CTAWrapper.propTypes = ***REMOVED***
  children: PropTypes.node.isRequired,
***REMOVED***;

export default CTAWrapper;
