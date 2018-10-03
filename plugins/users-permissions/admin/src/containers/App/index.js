/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';

// Utils
import ***REMOVED*** pluginId ***REMOVED*** from 'app';

// Containers
import AuthPage from 'containers/AuthPage';
import EditPage from 'containers/EditPage';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';

class App extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    if (!this.props.location.pathname.split('/')[3]) ***REMOVED***
      this.props.history.push('/plugins/users-permissions/roles');
***REMOVED***
***REMOVED***

  componentDidUpdate() ***REMOVED***
    if (!this.props.location.pathname.split('/')[3]) ***REMOVED***
      this.props.history.push('/plugins/users-permissions/roles');
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    return (
      <div className=***REMOVED***pluginId***REMOVED***>
        <Switch>
          <Route path=***REMOVED***`/plugins/$***REMOVED***pluginId***REMOVED***/auth/:authType/:id?`***REMOVED*** component=***REMOVED***AuthPage***REMOVED*** exact />
          <Route path=***REMOVED***`/plugins/$***REMOVED***pluginId***REMOVED***/:settingType/:actionType/:id?`***REMOVED*** component=***REMOVED***EditPage***REMOVED*** exact />
          <Route path=***REMOVED***`/plugins/$***REMOVED***pluginId***REMOVED***/:settingType`***REMOVED*** component=***REMOVED***HomePage***REMOVED*** exact />
          <Route component=***REMOVED***NotFoundPage***REMOVED*** />
        </Switch>
      </div>
    );
***REMOVED***
***REMOVED***

App.contextTypes = ***REMOVED***
  plugins: PropTypes.object,
  router: PropTypes.object.isRequired,
  updatePlugin: PropTypes.func,
***REMOVED***;

App.propTypes = ***REMOVED***
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
***REMOVED***;

export function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED******REMOVED***,
    dispatch,
  );
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED******REMOVED***);

// Wrap the component to inject dispatch and state into it
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(App);
