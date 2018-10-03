/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
// import ***REMOVED*** withRouter ***REMOVED*** from 'react-router';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** Switch, Route, withRouter ***REMOVED*** from 'react-router-dom';
import PropTypes from 'prop-types';
import ***REMOVED*** pluginId ***REMOVED*** from 'app';

import HomePage from 'containers/HomePage';
import ModelPage from 'containers/ModelPage';
import NotFoundPage from 'containers/NotFoundPage';
import formSaga from 'containers/Form/sagas';
import formReducer from 'containers/Form/reducer';

// Other containers actions
import ***REMOVED*** makeSelectShouldRefetchContentType ***REMOVED*** from 'containers/Form/selectors';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import styles from './styles.scss';
import ***REMOVED*** modelsFetch ***REMOVED*** from './actions';
import saga from './sagas';

/* eslint-disable consistent-return */
class App extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    this.props.modelsFetch();
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.shouldRefetchContentType !== this.props.shouldRefetchContentType) ***REMOVED***
      this.props.modelsFetch();
***REMOVED***
***REMOVED***


  componentWillUnmount() ***REMOVED***
    // Empty the app localStorage
    storeData.clearAppStorage();
***REMOVED***

  render() ***REMOVED***
    return (
      <div className=***REMOVED***`$***REMOVED***pluginId***REMOVED*** $***REMOVED***styles.app***REMOVED***`***REMOVED***>
        <Switch>
          <Route exact path="/plugins/content-type-builder" component=***REMOVED***HomePage***REMOVED*** />
          <Route exact path="/plugins/content-type-builder/models/:modelName" component=***REMOVED***ModelPage***REMOVED*** />
          <Route path="" component=***REMOVED***NotFoundPage***REMOVED*** />
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
  modelsFetch: PropTypes.func.isRequired,
  shouldRefetchContentType: PropTypes.bool,
***REMOVED***;

App.defaultProps = ***REMOVED***
  shouldRefetchContentType: false,
***REMOVED***;

export function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      modelsFetch,
***REMOVED***,
    dispatch
  );
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED***
  shouldRefetchContentType: makeSelectShouldRefetchContentType(),
***REMOVED***);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga(***REMOVED*** key: 'global', saga ***REMOVED***);
const withFormReducer = injectReducer(***REMOVED*** key: 'form', reducer: formReducer ***REMOVED***);
const withFormSaga = injectSaga(***REMOVED*** key: 'form', saga: formSaga ***REMOVED***);
export default compose(
  withFormReducer,
  withFormSaga,
  withSaga,
  withRouter,
  withConnect,
)(App);
