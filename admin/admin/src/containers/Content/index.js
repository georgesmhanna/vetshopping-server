/*
 *
 * Content
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';

import ***REMOVED*** selectPlugins ***REMOVED*** from 'containers/App/selectors';

import styles from './styles.scss';

export class Content extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const style = this.props.showLeftMenu ? styles.content : styles.wrapper;

    return (
      <div className=***REMOVED***style***REMOVED***>
        ***REMOVED***React.Children.toArray(this.props.children)***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

Content.propTypes = ***REMOVED***
  children: PropTypes.node.isRequired,
  showLeftMenu: PropTypes.bool.isRequired,
***REMOVED***;

const mapStateToProps = createSelector(
  selectPlugins(),
  (plugins) => (***REMOVED*** plugins ***REMOVED***)
);

function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    dispatch,
***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Content);
