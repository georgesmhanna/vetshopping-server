/**
 * 
 * SettingsPage
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import cn from 'classnames';
import ***REMOVED*** get, sortBy ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import ***REMOVED*** onChange, onSubmit, onReset ***REMOVED*** from 'containers/App/actions';
import ***REMOVED*** makeSelectModifiedSchema, makeSelectSubmitSuccess ***REMOVED*** from 'containers/App/selectors';
import Input from 'components/InputsIndex';
import PluginHeader from 'components/PluginHeader';
import PopUpWarning from 'components/PopUpWarning';
import Block from 'components/Block';
import SettingsRow from 'components/SettingsRow';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';
import forms from './forms.json';

class SettingsPage extends React.PureComponent ***REMOVED***
  state = ***REMOVED*** showWarning: false, showWarningCancel: false ***REMOVED***;

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.submitSuccess !== this.props.submitSuccess) ***REMOVED***
      this.toggle();
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    this.props.onReset();
***REMOVED***
  
  getModels = (data = this.props.schema.models, destination = '/') => ***REMOVED***
    const models = Object.keys(data).reduce((acc, curr) => ***REMOVED***
      if (curr !== 'plugins') ***REMOVED***
  
        if (!data[curr].fields && _.isObject(data[curr])) ***REMOVED***
          return this.getModels(data[curr], `$***REMOVED***destination***REMOVED***$***REMOVED***curr***REMOVED***/`);
  ***REMOVED***
        
        return acc.concat([***REMOVED*** name: curr, destination: `$***REMOVED***destination***REMOVED***$***REMOVED***curr***REMOVED***` ***REMOVED***]);
***REMOVED*** 
    
      return this.getModels(data[curr], `$***REMOVED***destination***REMOVED***$***REMOVED***curr***REMOVED***/`);
***REMOVED***, []);

    return sortBy(
      models.filter(obj => obj.name !== 'permission' && obj.name !== 'role'),
      ['name'],
    );
***REMOVED***

  getPluginHeaderActions = () => (
    [
      ***REMOVED***
        label: 'content-manager.popUpWarning.button.cancel',
        kind: 'secondary',
        onClick: this.handleReset,
        type: 'button',
***REMOVED***
      ***REMOVED***
        kind: 'primary',
        label: 'content-manager.containers.Edit.submit',
        onClick: this.handleSubmit,
        type: 'submit',
***REMOVED***
    ]
  );

  getValue = (input) => ***REMOVED***
    const ***REMOVED*** schema: ***REMOVED*** generalSettings ***REMOVED*** ***REMOVED*** = this.props;
    const value = get(generalSettings, input.name.split('.')[1], input.type === 'toggle' ? false : 10);

    return input.type === 'toggle' ? value : value.toString();
***REMOVED***

  handleClick = (destination) => ***REMOVED***
    const ***REMOVED*** location: ***REMOVED*** pathname ***REMOVED*** ***REMOVED*** = this.props;
    this.props.history.push(`$***REMOVED***pathname***REMOVED***$***REMOVED***destination***REMOVED***`);
***REMOVED***

  handleConfirmReset = () => ***REMOVED***
    this.props.onReset();
    this.toggleWarningCancel();
***REMOVED***

  handleReset = (e) => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED*** showWarningCancel: true ***REMOVED***);
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED*** showWarning: true ***REMOVED***);
***REMOVED***

  toggle = () => this.setState(prevState => (***REMOVED*** showWarning: !prevState.showWarning ***REMOVED***));

  toggleWarningCancel = () => this.setState(prevState => (***REMOVED*** showWarningCancel: !prevState.showWarningCancel ***REMOVED***));

  renderForm = input => (
    <Input
      key=***REMOVED***input.name***REMOVED***
      onChange=***REMOVED***this.props.onChange***REMOVED***
      value=***REMOVED***this.getValue(input)***REMOVED***
      ***REMOVED***...input***REMOVED***
    />
  );

  renderRow = model => <SettingsRow key=***REMOVED***model.name***REMOVED*** ***REMOVED***...model***REMOVED*** onClick=***REMOVED***this.handleClick***REMOVED*** />;

  render() ***REMOVED***
    const ***REMOVED*** showWarning, showWarningCancel ***REMOVED*** = this.state;
    const ***REMOVED*** onSubmit ***REMOVED*** = this.props;

    return (
      <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
        <PluginHeader
          actions=***REMOVED***this.getPluginHeaderActions()***REMOVED***
          title="Content Manager"
          description=***REMOVED******REMOVED*** id: 'content-manager.containers.SettingsPage.pluginHeaderDescription' ***REMOVED******REMOVED***
        />
        <PopUpWarning
          isOpen=***REMOVED***showWarning***REMOVED***
          toggleModal=***REMOVED***this.toggle***REMOVED***
          content=***REMOVED******REMOVED***
            title: 'content-manager.popUpWarning.title',
            message: 'content-manager.popUpWarning.warning.updateAllSettings',
            cancel: 'content-manager.popUpWarning.button.cancel',
            confirm: 'content-manager.popUpWarning.button.confirm',
    ***REMOVED******REMOVED***
          popUpWarningType="danger"
          onConfirm=***REMOVED***onSubmit***REMOVED***
        />
        <PopUpWarning
          isOpen=***REMOVED***showWarningCancel***REMOVED***
          toggleModal=***REMOVED***this.toggleWarningCancel***REMOVED***
          content=***REMOVED******REMOVED***
            title: 'content-manager.popUpWarning.title',
            message: 'content-manager.popUpWarning.warning.cancelAllSettings',
            cancel: 'content-manager.popUpWarning.button.cancel',
            confirm: 'content-manager.popUpWarning.button.confirm',
    ***REMOVED******REMOVED***
          popUpWarningType="danger"
          onConfirm=***REMOVED***this.handleConfirmReset***REMOVED***
        />
        <div className=***REMOVED***cn('row', styles.container)***REMOVED***>
          <Block
            description="content-manager.containers.SettingsPage.Block.generalSettings.description"
            title="content-manager.containers.SettingsPage.Block.generalSettings.title"
          >
            <form onSubmit=***REMOVED***this.handleSubmit***REMOVED*** className=***REMOVED***styles.ctmForm***REMOVED***>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    ***REMOVED***forms.inputs.map(this.renderForm)***REMOVED***
                  </div>
                </div>
              </div>
            </form>
          </Block>
          ***REMOVED***/* LIST */***REMOVED***
          <Block
            title="content-manager.containers.SettingsPage.Block.contentType.title"
            description="content-manager.containers.SettingsPage.Block.contentType.description"
          >
            <div className=***REMOVED***styles.contentTypesWrapper***REMOVED***>
              ***REMOVED***this.getModels().map(this.renderRow)***REMOVED***
            </div>
          </Block>
          ***REMOVED***/* LIST */***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

SettingsPage.defaultProps = ***REMOVED******REMOVED***;

SettingsPage.propTypes = ***REMOVED***
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
***REMOVED***;

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(
    ***REMOVED***
      onChange,
      onReset,
      onSubmit,
***REMOVED***,
    dispatch,
  )
);
const mapStateToProps = createStructuredSelector(***REMOVED***
  schema: makeSelectModifiedSchema(),
  submitSuccess: makeSelectSubmitSuccess(),
***REMOVED***);
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer(***REMOVED*** key: 'settingsPage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'settingsPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
