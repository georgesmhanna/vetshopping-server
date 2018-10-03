/**
 *
 * ConfigPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** findIndex, get, isEmpty ***REMOVED*** from 'lodash';

// You can find these components in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import ContainerFluid from 'components/ContainerFluid';
import HeaderNav from 'components/HeaderNav';
import PluginHeader from 'components/PluginHeader';

// Plugin's components
import EditForm from 'components/EditForm';

// You can find these utils in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import ***REMOVED***
  getSettings,
  onCancel,
  onChange,
  setErrors,
  submit,
***REMOVED*** from './actions';

import reducer from './reducer';
import saga from './saga';
import selectConfigPage from './selectors';

class ConfigPage extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    this.getSettings(this.props);
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    // Get new settings on navigation change
    if (prevProps.match.params.env !== this.props.match.params.env) ***REMOVED***
      this.getSettings(this.props);
***REMOVED***

    // Redirect the user to the email list after modifying is provider
    if (prevProps.submitSuccess !== this.props.submitSuccess) ***REMOVED***
      this.props.history.push(`/plugins/email/configurations/$***REMOVED***this.props.match.params.env***REMOVED***`);
***REMOVED***
***REMOVED***

  getSelectedProviderIndex = () => findIndex(this.props.settings.providers, ['provider', get(this.props.modifiedData, 'provider')]);

  /**
   * Get Settings depending on the props
   * @param  ***REMOVED***Object***REMOVED*** props
   * @return ***REMOVED***Func***REMOVED***       calls the saga that gets the current settings
   */
  getSettings = (props) => ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** env***REMOVED*** ***REMOVED*** ***REMOVED*** = props;
    this.props.getSettings(env);
***REMOVED***

  generateLinks = () => ***REMOVED***
    const headerNavLinks = this.props.appEnvironments.reduce((acc, current) => ***REMOVED***
      const link = Object.assign(current, ***REMOVED*** to: `/plugins/email/configurations/$***REMOVED***current.name***REMOVED***` ***REMOVED***);
      acc.push(link);
      return acc;
***REMOVED***, []).sort(link => link.name === 'production');

    return headerNavLinks;
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    const formErrors = Object.keys(get(this.props.settings, ['providers', this.getSelectedProviderIndex(), 'auth'], ***REMOVED******REMOVED***)).reduce((acc, current) => ***REMOVED***
      if (isEmpty(get(this.props.modifiedData, current, ''))) ***REMOVED***
        acc.push(***REMOVED***
          name: current,
          errors: [***REMOVED*** id: 'components.Input.error.validation.required' ***REMOVED***],
  ***REMOVED***);
***REMOVED***
      return acc;
***REMOVED***, []);

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setErrors(formErrors);
***REMOVED***

    return this.props.submit();
***REMOVED***

  pluginHeaderActions = [
    ***REMOVED***
      kind: 'secondary',
      label: 'app.components.Button.cancel',
      onClick: this.props.onCancel,
      type: 'button',
***REMOVED***,
    ***REMOVED***
      kind: 'primary',
      label: 'app.components.Button.save',
      onClick: this.handleSubmit,
      type: 'submit',
***REMOVED***,
  ];

  render() ***REMOVED***
    return (
      <div>
        <form onSubmit=***REMOVED***this.handleSubmit***REMOVED***>
          <ContainerFluid>
            <PluginHeader
              actions=***REMOVED***this.pluginHeaderActions***REMOVED***
              description=***REMOVED******REMOVED*** id: 'email.ConfigPage.description' ***REMOVED******REMOVED***
              title=***REMOVED******REMOVED*** id: 'email.ConfigPage.title'***REMOVED******REMOVED***
            />
            <HeaderNav links=***REMOVED***this.generateLinks()***REMOVED*** />
            <EditForm
              didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
              formErrors=***REMOVED***this.props.formErrors***REMOVED***
              modifiedData=***REMOVED***this.props.modifiedData***REMOVED***
              onChange=***REMOVED***this.props.onChange***REMOVED***
              selectedProviderIndex=***REMOVED***this.getSelectedProviderIndex()***REMOVED***
              settings=***REMOVED***this.props.settings***REMOVED***
            />
          </ContainerFluid>
        </form>
      </div>
    );
***REMOVED***
***REMOVED***

ConfigPage.contextTypes = ***REMOVED******REMOVED***;

ConfigPage.defaultProps = ***REMOVED***
  appEnvironments: [],
  formErrors: [],
  settings: ***REMOVED***
    providers: [],
***REMOVED***,
***REMOVED***;

ConfigPage.propTypes = ***REMOVED***
  appEnvironments: PropTypes.array,
  didCheckErrors: PropTypes.bool.isRequired,
  formErrors: PropTypes.array,
  getSettings: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  modifiedData: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  settings: PropTypes.object,
  submit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
***REMOVED***;

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      getSettings,
      onCancel,
      onChange,
      setErrors,
      submit,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const mapStateToProps = selectConfigPage();

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer(***REMOVED*** key: 'configPage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'configPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ConfigPage);
