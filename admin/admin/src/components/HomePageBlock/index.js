/**
 *
 * HomePageBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

function HomePageBlock(***REMOVED*** children, className ***REMOVED***) ***REMOVED***
  return (
    <div
      className=***REMOVED***cn(
        className,
        styles.homePageBlock,
      )***REMOVED***
    >
      ***REMOVED***children***REMOVED***
    </div>
  );
***REMOVED***

HomePageBlock.defaultProps = ***REMOVED***
  children: '',
  className: '',
***REMOVED***;

HomePageBlock.propTypes = ***REMOVED***
  children: PropTypes.node,
  className: PropTypes.string,
***REMOVED***;

export default HomePageBlock;
