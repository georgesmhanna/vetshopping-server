/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';

import AdminPage from 'containers/AdminPage';
import NotFoundPage from 'containers/NotFoundPage';

import NotificationProvider from 'containers/NotificationProvider';

import '../../styles/main.scss';

import styles from './styles.scss';

export class App extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <div>
        <NotificationProvider />
        <div className=***REMOVED***styles.container***REMOVED***>
          <Switch>
            <Route path="/" component=***REMOVED***AdminPage***REMOVED*** />
            <Route path="" component=***REMOVED***NotFoundPage***REMOVED*** />
          </Switch>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

App.contextTypes = ***REMOVED***
  router: PropTypes.object.isRequired,
***REMOVED***;

App.propTypes = ***REMOVED******REMOVED***;

export default App;
