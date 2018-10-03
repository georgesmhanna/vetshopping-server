/*
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';

import LeftMenuHeader from 'components/LeftMenuHeader';
import LeftMenuLinkContainer from 'components/LeftMenuLinkContainer';
import LeftMenuFooter from 'components/LeftMenuFooter';

import styles from './styles.scss';

function LeftMenu(props) ***REMOVED***
  return (
    <div className=***REMOVED***styles.leftMenu***REMOVED***>
      <LeftMenuHeader />
      <LeftMenuLinkContainer ***REMOVED***...props***REMOVED*** />
      <LeftMenuFooter plugins=***REMOVED***props.plugins***REMOVED*** version=***REMOVED***props.version***REMOVED*** />
    </div>
  );
***REMOVED***

LeftMenu.defaultProps = ***REMOVED***
  version: '3',
***REMOVED***;

LeftMenu.propTypes = ***REMOVED***
  plugins: PropTypes.object.isRequired,
  version: PropTypes.string,
***REMOVED***;

function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    dispatch,
***REMOVED***;
***REMOVED***

export default connect(mapDispatchToProps)(LeftMenu);
