/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, get ***REMOVED*** from 'lodash';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import getQueryParameters from 'utils/getQueryParameters';

import EditPage from 'containers/EditPage';
import ListPage from 'containers/ListPage';
import SettingsPage from 'containers/SettingsPage';
import SettingPage from 'containers/SettingPage';
import LoadingIndicatorPage from 'components/LoadingIndicatorPage';
import EmptyAttributesView from 'components/EmptyAttributesView';

import ***REMOVED***
  loadModels,
***REMOVED*** from './actions';
import ***REMOVED*** makeSelectLoading, makeSelectModelEntries, makeSelectSchema ***REMOVED*** from './selectors';

import saga from './sagas';

class App extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    this.props.loadModels();
***REMOVED***

  render() ***REMOVED***
    if (this.props.loading) ***REMOVED***
      return <LoadingIndicatorPage />;
***REMOVED***

    const currentModelName = this.props.location.pathname.split('/')[3];
    const source = getQueryParameters(this.props.location.search, 'source');
    const attrPath = source === 'content-manager' ? ['models', currentModelName, 'fields'] : ['models', 'plugins', source, currentModelName, 'fields'];

    if (currentModelName && source && isEmpty(get(this.props.schema, attrPath))) ***REMOVED***
      return <EmptyAttributesView currentModelName=***REMOVED***currentModelName***REMOVED*** history=***REMOVED***this.props.history***REMOVED*** modelEntries=***REMOVED***this.props.modelEntries***REMOVED*** />;
***REMOVED***

    return (
      <div className="content-manager">
        <Switch>
          <Route path="/plugins/content-manager/ctm-configurations/:slug/:source?/:endPoint?" component=***REMOVED***SettingPage***REMOVED*** />
          <Route path="/plugins/content-manager/ctm-configurations" component=***REMOVED***SettingsPage***REMOVED*** />
          <Route path="/plugins/content-manager/:slug/:id" component=***REMOVED***EditPage***REMOVED*** />
          <Route path="/plugins/content-manager/:slug" component=***REMOVED***ListPage***REMOVED*** />
        </Switch>
      </div>
    );
***REMOVED***
***REMOVED***

App.contextTypes = ***REMOVED***
  router: PropTypes.object.isRequired,
***REMOVED***;

App.propTypes = ***REMOVED***
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadModels: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  modelEntries: PropTypes.number.isRequired,
  schema: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
***REMOVED***;

export function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      loadModels,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED***
  loading: makeSelectLoading(),
  modelEntries: makeSelectModelEntries(),
  schema: makeSelectSchema(),
***REMOVED***);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga(***REMOVED*** key: 'global', saga ***REMOVED***);

export default compose(
  withSaga,
  withConnect,
)(App);
