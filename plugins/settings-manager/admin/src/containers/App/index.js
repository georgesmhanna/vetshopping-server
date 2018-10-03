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
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import 'flag-icon-css/css/flag-icon.css';
import 'react-select/dist/react-select.css';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** isEmpty ***REMOVED*** from 'lodash';
import ***REMOVED*** pluginId ***REMOVED*** from 'app';

import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage';

import ***REMOVED*** menuFetch, environmentsFetch ***REMOVED*** from './actions';
import ***REMOVED*** makeSelectLoading, makeSelectSections ***REMOVED*** from './selectors';
import styles from './styles.scss';

import saga from './sagas';

/* eslint-disable react/require-default-props  */
class App extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    this.props.menuFetch();
    this.props.environmentsFetch();
***REMOVED***

  componentWillUpdate(nextProps) ***REMOVED***
    if (!isEmpty(nextProps.sections) && nextProps.location.pathname !== '/plugins/settings-manager') ***REMOVED***
      const allowedPaths = nextProps.sections.reduce((acc, current) => ***REMOVED***
        const slugs = current.items.reduce((acc, current) => ***REMOVED***
          acc.push(current.slug);

          return acc;
  ***REMOVED*** []);
        return acc.concat(slugs);
***REMOVED*** []);

      const slug = nextProps.location.pathname.split('/')[3];
      const shouldRedirect = allowedPaths.filter(el => el === slug).length === 0;

      if (shouldRedirect) ***REMOVED***
        this.props.history.push('/404');
***REMOVED***
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    return (
      <div className=***REMOVED***`$***REMOVED***pluginId***REMOVED*** $***REMOVED***styles.app***REMOVED***`***REMOVED***>
        <Switch>
          <Route path="/plugins/settings-manager/:slug/:env" component=***REMOVED***HomePage***REMOVED*** />
          <Route path="/plugins/settings-manager/:slug" component=***REMOVED***HomePage***REMOVED*** />
          <Route path="/plugins/settings-manager" component=***REMOVED***HomePage***REMOVED*** />
        </Switch>
      </div>
    );
***REMOVED***
***REMOVED***

App.contextTypes = ***REMOVED***
  router: PropTypes.object.isRequired,
***REMOVED***;

App.propTypes = ***REMOVED***
  environmentsFetch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  menuFetch: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
***REMOVED***;

export function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      menuFetch,
      environmentsFetch,
***REMOVED***,
    dispatch
  );
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED***
  loading: makeSelectLoading(),
  sections: makeSelectSections(),
***REMOVED***);

// Wrap the component to inject dispatch and state into it
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga(***REMOVED*** key: 'global', saga ***REMOVED***);

export default compose(
  withSaga,
  withConnect,
)(App);
