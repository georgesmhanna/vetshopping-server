/**
 *
 * ListPluginsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** Helmet ***REMOVED*** from 'react-helmet';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import cn from 'classnames';

import PluginHeader from 'components/PluginHeader';
import ListPlugins from 'components/ListPlugins';
import LoadingIndicatorPage from 'components/LoadingIndicatorPage';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ***REMOVED*** makeSelectCurrentEnv, makeSelectPluginDeleteAction, makeSelectPlugins, makeSelectIsLoading ***REMOVED*** from './selectors';
import ***REMOVED*** getPlugins, onDeletePluginClick, onDeletePluginConfirm ***REMOVED*** from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

export class ListPluginsPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  getChildContext = () => (
    ***REMOVED***
      currentEnvironment: this.props.currentEnvironment,
***REMOVED***
  );

  componentDidMount() ***REMOVED***
    this.props.getPlugins();
***REMOVED***

  render() ***REMOVED***
    if (this.props.isLoading) ***REMOVED***
      return <LoadingIndicatorPage />;
***REMOVED***

    return (
      <div>
        <FormattedMessage id="app.components.ListPluginsPage.helmet.title">
          ***REMOVED***(message) => (
            <Helmet>
              <title>***REMOVED***message***REMOVED***</title>
              <meta name="description" content="Description of ListPluginsPage" />
            </Helmet>
          )***REMOVED***
        </FormattedMessage>
        <div className=***REMOVED***cn('container-fluid', styles.listPluginsPage)***REMOVED***>
          <PluginHeader
            title=***REMOVED******REMOVED***
              id: 'app.components.ListPluginsPage.title',
      ***REMOVED******REMOVED***
            description=***REMOVED******REMOVED***
              id: 'app.components.ListPluginsPage.description',
      ***REMOVED******REMOVED***
            actions=***REMOVED***[]***REMOVED***
          />
          <ListPlugins
            history=***REMOVED***this.props.history***REMOVED***
            plugins=***REMOVED***this.props.plugins***REMOVED***
            pluginActionSucceeded=***REMOVED***this.props.pluginActionSucceeded***REMOVED***
            onDeleteClick=***REMOVED***this.props.onDeletePluginClick***REMOVED***
            onDeleteConfirm=***REMOVED***this.props.onDeletePluginConfirm***REMOVED***
          />
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

ListPluginsPage.childContextTypes = ***REMOVED***
  currentEnvironment: PropTypes.string.isRequired,
***REMOVED***;

ListPluginsPage.contextTypes = ***REMOVED******REMOVED***;

ListPluginsPage.propTypes = ***REMOVED***
  currentEnvironment: PropTypes.string.isRequired,
  getPlugins: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDeletePluginClick: PropTypes.func.isRequired,
  onDeletePluginConfirm: PropTypes.func.isRequired,
  pluginActionSucceeded: PropTypes.bool.isRequired,
  plugins: PropTypes.object.isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  currentEnvironment: makeSelectCurrentEnv(),
  isLoading: makeSelectIsLoading(),
  pluginActionSucceeded: makeSelectPluginDeleteAction(),
  plugins: makeSelectPlugins(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      getPlugins,
      onDeletePluginClick,
      onDeletePluginConfirm,
***REMOVED***,
    dispatch
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);

/* Remove this line if the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withReducer = injectReducer(***REMOVED*** key: 'listPluginsPage', reducer ***REMOVED***);

/* Remove the line below the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withSaga = injectSaga(***REMOVED*** key: 'listPluginsPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ListPluginsPage);
