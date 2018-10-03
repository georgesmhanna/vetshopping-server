/*
 * AdminPage
 *
 * This is the first thing users see of our AdminPage, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** get, includes, isFunction, map, omit ***REMOVED*** from 'lodash';
import ***REMOVED*** compose ***REMOVED*** from 'redux';

// Actions required for disabling and enabling the OverlayBlocker
import ***REMOVED*** disableGlobalOverlayBlocker, enableGlobalOverlayBlocker ***REMOVED*** from 'actions/overlayBlocker';

import ***REMOVED*** pluginLoaded, updatePlugin ***REMOVED*** from 'containers/App/actions';
import ***REMOVED***
  makeSelectBlockApp,
  makeSelectShowGlobalAppBlocker,
  selectHasUserPlugin,
  selectPlugins,
***REMOVED*** from 'containers/App/selectors';

import ***REMOVED*** hideNotification ***REMOVED*** from 'containers/NotificationProvider/actions';

// Design
import ComingSoonPage from 'containers/ComingSoonPage';
import Content from 'containers/Content';
import LocaleToggle from 'containers/LocaleToggle';
import CTAWrapper from 'components/CtaWrapper';
import Header from 'components/Header/index';
import HomePage from 'containers/HomePage/Loadable';
import InstallPluginPage from 'containers/InstallPluginPage/Loadable';
import LeftMenu from 'containers/LeftMenu';
import ListPluginsPage from 'containers/ListPluginsPage/Loadable';
import Logout from 'components/Logout';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OverlayBlocker from 'components/OverlayBlocker';
import PluginPage from 'containers/PluginPage';

// Utils
import auth from 'utils/auth';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import ***REMOVED*** getGaStatus, getLayout ***REMOVED*** from './actions';
import reducer from './reducer';
import saga from './saga';
import selectAdminPage from './selectors';

import styles from './styles.scss';

const PLUGINS_TO_BLOCK_PRODUCTION = ['content-type-builder', 'settings-manager'];

export class AdminPage extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** hasAlreadyRegistereOtherPlugins: false ***REMOVED***;

  getChildContext = () => (***REMOVED***
    disableGlobalOverlayBlocker: this.props.disableGlobalOverlayBlocker,
    enableGlobalOverlayBlocker: this.props.enableGlobalOverlayBlocker,
    plugins: this.props.plugins,
    updatePlugin: this.props.updatePlugin,
***REMOVED***);

  componentDidMount() ***REMOVED***
    this.checkLogin(this.props);
    this.props.getGaStatus();
    this.props.getLayout();
    ReactGA.initialize('UA-54313258-9');
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.location.pathname !== this.props.location.pathname) ***REMOVED***
      this.checkLogin(nextProps);

      if (nextProps.adminPage.allowGa) ***REMOVED***
        ReactGA.pageview(nextProps.location.pathname);
***REMOVED***
***REMOVED***

    if (
      get(nextProps.plugins.toJS(), ['users-permissions', 'hasAdminUser']) !==
      get(this.props.plugins.toJS(), ['users-permissions', 'hasAdminUser'])
    ) ***REMOVED***
      this.checkLogin(nextProps, true);
***REMOVED***

    if (!this.hasUserPluginLoaded(this.props) && this.hasUserPluginLoaded(nextProps)) ***REMOVED***
      this.checkLogin(nextProps);
***REMOVED***
***REMOVED***

  checkLogin = (props, skipAction = false) => ***REMOVED***
    if (props.hasUserPlugin && this.isUrlProtected(props) && !auth.getToken()) ***REMOVED***
      if (!this.hasUserPluginLoaded(props)) ***REMOVED***
        return;
***REMOVED***

      const endPoint = this.hasAdminUser(props) ? 'login' : 'register';
      this.props.history.push(`/plugins/users-permissions/auth/$***REMOVED***endPoint***REMOVED***`);
***REMOVED***

    if (
      !this.isUrlProtected(props) &&
      includes(props.location.pathname, 'auth/register') &&
      this.hasAdminUser(props) &&
      !skipAction
    ) ***REMOVED***
      this.props.history.push('/plugins/users-permissions/auth/login');
***REMOVED***

    if (
      props.hasUserPlugin &&
      !this.isUrlProtected(props) &&
      !includes(props.location.pathname, 'auth/register') &&
      !this.hasAdminUser(props)
    ) ***REMOVED***
      this.props.history.push('/plugins/users-permissions/auth/register');
***REMOVED***

    if (!props.hasUserPlugin || (auth.getToken() && !this.state.hasAlreadyRegistereOtherPlugins)) ***REMOVED***
      map(omit(this.props.plugins.toJS(), ['users-permissions', 'email']), plugin => ***REMOVED***
        switch (true) ***REMOVED***
          case isFunction(plugin.bootstrap) && isFunction(plugin.pluginRequirements):
            plugin
              .pluginRequirements(plugin)
              .then(plugin => ***REMOVED***
                return plugin.bootstrap(plugin);
        ***REMOVED***)
              .then(plugin => this.props.pluginLoaded(plugin));
            break;
          case isFunction(plugin.pluginRequirements):
            plugin.pluginRequirements(plugin).then(plugin => this.props.pluginLoaded(plugin));
            break;
          case isFunction(plugin.bootstrap):
            plugin.bootstrap(plugin).then(plugin => this.props.pluginLoaded(plugin));
            break;
          default:
  ***REMOVED***
***REMOVED***);

      this.setState(***REMOVED*** hasAlreadyRegistereOtherPlugins: true ***REMOVED***);
***REMOVED***
***REMOVED***;

  hasUserPluginLoaded = props =>
    typeof get(props.plugins.toJS(), ['users-permissions', 'hasAdminUser']) !== 'undefined';

  hasAdminUser = props => get(props.plugins.toJS(), ['users-permissions', 'hasAdminUser']);

  isUrlProtected = props =>
    !includes(props.location.pathname, get(props.plugins.toJS(), ['users-permissions', 'nonProtectedUrl']));

  shouldDisplayLogout = () => auth.getToken() && this.props.hasUserPlugin && this.isUrlProtected(this.props);

  showLeftMenu = () => !includes(this.props.location.pathname, 'users-permissions/auth/');

  retrievePlugins = () => ***REMOVED***
    const ***REMOVED***
      adminPage: ***REMOVED*** currentEnvironment ***REMOVED***,
      plugins,
***REMOVED*** = this.props;

    if (currentEnvironment === 'production') ***REMOVED***
      let pluginsToDisplay = plugins;
      PLUGINS_TO_BLOCK_PRODUCTION.map(plugin => (pluginsToDisplay = pluginsToDisplay.delete(plugin)));

      return pluginsToDisplay;
***REMOVED***

    return plugins;
***REMOVED***;

  render() ***REMOVED***
    const ***REMOVED*** adminPage ***REMOVED*** = this.props;
    const header = this.showLeftMenu() ? <Header /> : '';
    const style = this.showLeftMenu() ? ***REMOVED******REMOVED*** : ***REMOVED*** width: '100%' ***REMOVED***;

    if (adminPage.isLoading) ***REMOVED***
      return <div />;
***REMOVED***

    return (
      <div className=***REMOVED***styles.adminPage***REMOVED***>
        ***REMOVED***this.showLeftMenu() && (
          <LeftMenu
            plugins=***REMOVED***this.retrievePlugins()***REMOVED***
            layout=***REMOVED***adminPage.layout***REMOVED***
            version=***REMOVED***adminPage.strapiVersion***REMOVED***
          />
        )***REMOVED***
        <CTAWrapper>
          ***REMOVED***this.shouldDisplayLogout() && <Logout />***REMOVED***
          <LocaleToggle isLogged=***REMOVED***this.shouldDisplayLogout() === true***REMOVED*** />
        </CTAWrapper>
        <div className=***REMOVED***styles.adminPageRightWrapper***REMOVED*** style=***REMOVED***style***REMOVED***>
          ***REMOVED***header***REMOVED***
          <Content ***REMOVED***...this.props***REMOVED*** showLeftMenu=***REMOVED***this.showLeftMenu()***REMOVED***>
            <Switch>
              <Route path="/" component=***REMOVED***HomePage***REMOVED*** exact />
              <Route path="/plugins/:pluginId" component=***REMOVED***PluginPage***REMOVED*** />
              <Route path="/plugins" component=***REMOVED***ComingSoonPage***REMOVED*** />
              <Route path="/list-plugins" component=***REMOVED***ListPluginsPage***REMOVED*** exact />
              <Route path="/install-plugin" component=***REMOVED***InstallPluginPage***REMOVED*** exact />
              <Route path="/configuration" component=***REMOVED***ComingSoonPage***REMOVED*** exact />
              <Route path="" component=***REMOVED***NotFoundPage***REMOVED*** />
              <Route path="404" component=***REMOVED***NotFoundPage***REMOVED*** />
            </Switch>
          </Content>
        </div>
        <OverlayBlocker isOpen=***REMOVED***this.props.blockApp && this.props.showGlobalAppBlocker***REMOVED*** />
      </div>
    );
***REMOVED***
***REMOVED***

AdminPage.childContextTypes = ***REMOVED***
  disableGlobalOverlayBlocker: PropTypes.func,
  enableGlobalOverlayBlocker: PropTypes.func,
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func,
***REMOVED***;

AdminPage.contextTypes = ***REMOVED***
  router: PropTypes.object.isRequired,
***REMOVED***;

AdminPage.defaultProps = ***REMOVED***
  adminPage: ***REMOVED******REMOVED***,
  hasUserPlugin: true,
***REMOVED***;

AdminPage.propTypes = ***REMOVED***
  adminPage: PropTypes.object,
  blockApp: PropTypes.bool.isRequired,
  disableGlobalOverlayBlocker: PropTypes.func.isRequired,
  enableGlobalOverlayBlocker: PropTypes.func.isRequired,
  getGaStatus: PropTypes.func.isRequired,
  getLayout: PropTypes.func.isRequired,
  hasUserPlugin: PropTypes.bool,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pluginLoaded: PropTypes.func.isRequired,
  plugins: PropTypes.object.isRequired,
  showGlobalAppBlocker: PropTypes.bool.isRequired,
  updatePlugin: PropTypes.func.isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  adminPage: selectAdminPage(),
  blockApp: makeSelectBlockApp(),
  hasUserPlugin: selectHasUserPlugin(),
  plugins: selectPlugins(),
  showGlobalAppBlocker: makeSelectShowGlobalAppBlocker(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    disableGlobalOverlayBlocker: () => ***REMOVED***
      dispatch(disableGlobalOverlayBlocker());
***REMOVED***,
    enableGlobalOverlayBlocker: () => ***REMOVED***
      dispatch(enableGlobalOverlayBlocker());
***REMOVED***,
    getGaStatus: () => ***REMOVED***
      dispatch(getGaStatus());
***REMOVED***,
    getLayout: () => ***REMOVED***
      dispatch(getLayout());
***REMOVED***,
    onHideNotification: id => ***REMOVED***
      dispatch(hideNotification(id));
***REMOVED***,
    pluginLoaded: plugin => ***REMOVED***
      dispatch(pluginLoaded(plugin));
***REMOVED***,
    updatePlugin: (pluginId, updatedKey, updatedValue) => ***REMOVED***
      dispatch(updatePlugin(pluginId, updatedKey, updatedValue));
***REMOVED***,
    dispatch,
***REMOVED***;
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer(***REMOVED*** key: 'adminPage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'adminPage', saga ***REMOVED***);

export default compose(withReducer, withSaga, withConnect)(AdminPage);

// export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
