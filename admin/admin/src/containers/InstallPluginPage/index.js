/**
 *
 * InstallPluginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** Helmet ***REMOVED*** from 'react-helmet';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import cn from 'classnames';
import ***REMOVED*** map ***REMOVED*** from 'lodash';

import ***REMOVED***
  disableGlobalOverlayBlocker,
  enableGlobalOverlayBlocker,
***REMOVED*** from 'actions/overlayBlocker';

// Design
// import Input from 'components/Input';
import DownloadInfo from 'components/DownloadInfo';
import OverlayBlocker from 'components/OverlayBlocker';
import PluginCard from 'components/PluginCard';
import PluginHeader from 'components/PluginHeader';
import SupportUsBanner from 'components/SupportUsBanner';
import LoadingIndicatorPage from 'components/LoadingIndicatorPage';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ***REMOVED***
  downloadPlugin,
  getAvailablePlugins,
  getInstalledPlugins,
  onChange,
***REMOVED*** from './actions';

import makeSelectInstallPluginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import styles from './styles.scss';

export class InstallPluginPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  getChildContext = () => (
    ***REMOVED***
      downloadPlugin: this.props.downloadPlugin,
***REMOVED***
  );

  componentDidMount() ***REMOVED***
    // Disable the AdminPage OverlayBlocker in order to give it a custom design (children)
    this.props.disableGlobalOverlayBlocker();

    // Don't fetch the available plugins if it has already been done
    if (!this.props.didFetchPlugins) ***REMOVED***
      this.props.getAvailablePlugins();
***REMOVED***

    // Get installed plugins
    this.props.getInstalledPlugins();
***REMOVED***

  componentWillUnmount() ***REMOVED***
    // Enable the AdminPage OverlayBlocker so it is displayed when the server is restarting
    this.props.enableGlobalOverlayBlocker();
***REMOVED***

  render() ***REMOVED***
    if (!this.props.didFetchPlugins || !this.props.didFetchInstalledPlugins) ***REMOVED***
      return <LoadingIndicatorPage />;
***REMOVED***
    
    return (
      <div>
        <OverlayBlocker isOpen=***REMOVED***this.props.blockApp***REMOVED***>
          <DownloadInfo />
        </OverlayBlocker>
        <FormattedMessage id="app.components.InstallPluginPage.helmet">
          ***REMOVED***message => (
            <Helmet>
              <title>***REMOVED***message***REMOVED***</title>
              <meta name="description" content="Description of InstallPluginPage" />
            </Helmet>
          )***REMOVED***
        </FormattedMessage>
        <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
          <PluginHeader
            title=***REMOVED******REMOVED*** id: 'app.components.InstallPluginPage.title' ***REMOVED******REMOVED***
            description=***REMOVED******REMOVED*** id: 'app.components.InstallPluginPage.description' ***REMOVED******REMOVED***
            actions=***REMOVED***[]***REMOVED***
          />
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <SupportUsBanner />
            </div>
          </div>
          ***REMOVED***/****REMOVED***<div className=***REMOVED***cn('row', styles.inputContainer)***REMOVED***>
            <Input
              customBootstrapClass="col-md-12"
              label="app.components.InstallPluginPage.InputSearch.label"
              name="search"
              onChange=***REMOVED***this.props.onChange***REMOVED***
              placeholder="app.components.InstallPluginPage.InputSearch.placeholder"
              type="search"
              validations=***REMOVED******REMOVED******REMOVED******REMOVED***
              value=***REMOVED***this.props.search***REMOVED***
            />
          </div>*/***REMOVED***
          <div className=***REMOVED***cn('row', styles.wrapper)***REMOVED***>
            ***REMOVED***map(this.props.availablePlugins, (plugin) => (
              <PluginCard
                history=***REMOVED***this.props.history***REMOVED***
                key=***REMOVED***plugin.id***REMOVED***
                plugin=***REMOVED***plugin***REMOVED***
                showSupportUsButton=***REMOVED***plugin.id === 'support-us'***REMOVED***
                isAlreadyInstalled=***REMOVED***this.props.installedPlugins.includes(plugin.id)***REMOVED***
                downloadPlugin=***REMOVED***(e) => ***REMOVED***
                  e.preventDefault();
                  e.stopPropagation();

                  if (plugin.id !== 'support-us') ***REMOVED***
                    this.props.downloadPlugin(plugin.id);
            ***REMOVED***
          ***REMOVED******REMOVED***
              />
            ))***REMOVED***
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

InstallPluginPage.childContextTypes = ***REMOVED***
  downloadPlugin: PropTypes.func.isRequired,
***REMOVED***;

InstallPluginPage.propTypes = ***REMOVED***
  availablePlugins: PropTypes.array.isRequired,
  blockApp: PropTypes.bool.isRequired,
  didFetchInstalledPlugins: PropTypes.bool.isRequired,
  didFetchPlugins: PropTypes.bool.isRequired,
  disableGlobalOverlayBlocker: PropTypes.func.isRequired,
  downloadPlugin: PropTypes.func.isRequired,
  enableGlobalOverlayBlocker: PropTypes.func.isRequired,
  getAvailablePlugins: PropTypes.func.isRequired,
  getInstalledPlugins: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  installedPlugins: PropTypes.array.isRequired,
  // onChange: PropTypes.func.isRequired,
  // search: PropTypes.string.isRequired,
***REMOVED***;

const mapStateToProps = makeSelectInstallPluginPage();

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      disableGlobalOverlayBlocker,
      downloadPlugin,
      enableGlobalOverlayBlocker,
      getAvailablePlugins,
      getInstalledPlugins,
      onChange,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);

/* Remove this line if the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withReducer = injectReducer(***REMOVED*** key: 'installPluginPage', reducer ***REMOVED***);

/* Remove the line below the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withSaga = injectSaga(***REMOVED*** key: 'installPluginPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InstallPluginPage);
