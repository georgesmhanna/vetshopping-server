/**
 *
 * EditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** findIndex, get, isEmpty, isEqual, size ***REMOVED*** from 'lodash';
import cn from 'classnames';

// Design
import BackHeader from 'components/BackHeader';
import Input from 'components/InputsIndex';
import InputSearch from 'components/InputSearchContainer';
import LoadingIndicator from 'components/LoadingIndicator';
import LoadingIndicatorPage from 'components/LoadingIndicatorPage';
import PluginHeader from 'components/PluginHeader';
import Plugins from 'components/Plugins';
import Policies from 'components/Policies';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// Actions
import ***REMOVED***
  addUser,
  getPermissions,
  getPolicies,
  getRole,
  getUser,
  onCancel,
  onChangeInput,
  onClickAdd,
  onClickDelete,
  selectAllActions,
  setActionType,
  setErrors,
  setForm,
  setInputPoliciesPath,
  setRoleId,
  setShouldDisplayPolicieshint,
  submit,
  resetProps,
  resetShouldDisplayPoliciesHint,
***REMOVED*** from './actions';

// Selectors
import makeSelectEditPage from './selectors';

import reducer from './reducer';
import saga from './saga';

import styles from './styles.scss';

export class EditPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  getChildContext = () => (
    ***REMOVED***
      onChange: this.props.onChangeInput,
      selectAllActions: this.props.selectAllActions,
      setInputPoliciesPath: this.props.setInputPoliciesPath,
      setShouldDisplayPolicieshint: this.props.setShouldDisplayPolicieshint,
      resetShouldDisplayPoliciesHint: this.props.resetShouldDisplayPoliciesHint,
***REMOVED***
  );

  componentDidMount() ***REMOVED***
    this.props.setActionType(this.props.match.params.actionType);
    this.props.getPolicies();

    if (this.props.match.params.actionType === 'create') ***REMOVED***
      // Set reducer modifiedData
      this.props.setForm();
      // Get the available permissions
      this.props.getPermissions();
***REMOVED*** else ***REMOVED***
      this.props.setRoleId(this.props.match.params.id);
      this.props.getRole(this.props.match.params.id);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    // Redirect user to HomePage if submit ok
    if (nextProps.editPage.didSubmit !== this.props.editPage.didSubmit) ***REMOVED***
      this.props.history.push('/plugins/users-permissions/roles');
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    // Empty formErrors
    this.props.setErrors([]);
    // Empty modifiedData so prev values aren't displayed when loading
    this.props.resetProps();
    this.props.resetShouldDisplayPoliciesHint();
***REMOVED***

  handleSubmit = () => ***REMOVED***
    // Check if the name field is filled
    if (isEmpty(get(this.props.editPage, ['modifiedData', 'name']))) ***REMOVED***
      return this.props.setErrors([***REMOVED*** name: 'name', errors: [***REMOVED*** id: 'users-permissions.EditPage.form.roles.name.error' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    this.props.submit();
***REMOVED***

  showLoaderForm = () => ***REMOVED***
    const ***REMOVED*** editPage: ***REMOVED*** modifiedData ***REMOVED***, match: ***REMOVED*** params: ***REMOVED*** actionType ***REMOVED*** ***REMOVED*** ***REMOVED*** = this.props;

    return actionType !== 'create' && get(modifiedData, ['name'], '') === '';
***REMOVED***

  showLoaderPermissions = () => ***REMOVED***
    const ***REMOVED*** editPage: ***REMOVED*** modifiedData ***REMOVED*** ***REMOVED*** = this.props;

    return isEmpty(get(modifiedData, ['permissions']));
***REMOVED***

  renderFirstBlock = () => (
    <React.Fragment>
      <div className="col-md-6">
        <div className="row">
          <Input
            autoFocus
            customBootstrapClass="col-md-12"
            errors=***REMOVED***get(this.props.editPage, ['formErrors', findIndex(this.props.editPage.formErrors, ['name', 'name']), 'errors'])***REMOVED***
            didCheckErrors=***REMOVED***this.props.editPage.didCheckErrors***REMOVED***
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditPage.form.roles.label.name' ***REMOVED******REMOVED***
            name="name"
            onChange=***REMOVED***this.props.onChangeInput***REMOVED***
            type="text"
            validations=***REMOVED******REMOVED*** required: true ***REMOVED******REMOVED***
            value=***REMOVED***get(this.props.editPage, ['modifiedData', 'name'])***REMOVED***
          />
        </div>
        <div className="row">
          <Input
            customBootstrapClass="col-md-12"
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditPage.form.roles.label.description' ***REMOVED******REMOVED***
            name="description"
            onChange=***REMOVED***this.props.onChangeInput***REMOVED***
            type="textarea"
            validations=***REMOVED******REMOVED*** required: true ***REMOVED******REMOVED***
            value=***REMOVED***get(this.props.editPage, ['modifiedData', 'description'])***REMOVED***
          />
        </div>
      </div>
      <InputSearch
        addUser=***REMOVED***this.props.addUser***REMOVED***
        didDeleteUser=***REMOVED***this.props.editPage.didDeleteUser***REMOVED***
        didFetchUsers=***REMOVED***this.props.editPage.didFetchUsers***REMOVED***
        didGetUsers=***REMOVED***this.props.editPage.didGetUsers***REMOVED***
        getUser=***REMOVED***this.props.getUser***REMOVED***
        label=***REMOVED******REMOVED***
          id: 'users-permissions.EditPage.form.roles.label.users',
          params: ***REMOVED***
            number: size(get(this.props.editPage, ['modifiedData', 'users'])),
    ***REMOVED***
  ***REMOVED******REMOVED***
        onClickAdd=***REMOVED***this.props.onClickAdd***REMOVED***
        onClickDelete=***REMOVED***this.props.onClickDelete***REMOVED***
        name="users"
        type="text"
        users=***REMOVED***get(this.props.editPage, 'users')***REMOVED***
        validations=***REMOVED******REMOVED*** required: true ***REMOVED******REMOVED***
        values=***REMOVED***get(this.props.editPage, ['modifiedData', 'users'])***REMOVED***
      />
      <div className="col-md-12">
        <div className=***REMOVED***styles.separator***REMOVED*** />
      </div>
    </React.Fragment>
  )

  render() ***REMOVED***
    const pluginHeaderTitle = this.props.match.params.actionType === 'create' ?
      'users-permissions.EditPage.header.title.create'
      : 'users-permissions.EditPage.header.title';
    const pluginHeaderDescription = this.props.match.params.actionType === 'create' ?
      'users-permissions.EditPage.header.description.create'
      : 'users-permissions.EditPage.header.description';
    const pluginHeaderActions = [
      ***REMOVED***
        label: 'users-permissions.EditPage.cancel',
        kind: 'secondary',
        onClick: this.props.onCancel,
        type: 'button',
***REMOVED***
      ***REMOVED***
        kind: 'primary',
        label: 'users-permissions.EditPage.submit',
        onClick: this.handleSubmit,
        type: 'submit',
        disabled: isEqual(this.props.editPage.modifiedData, this.props.editPage.initialData),
***REMOVED***
    ];
 
    if (this.showLoaderForm()) ***REMOVED***
      return <LoadingIndicatorPage />;
***REMOVED***

    return (
      <div>
        <BackHeader onClick=***REMOVED***() => this.props.history.goBack()***REMOVED*** />
        <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
          <PluginHeader
            title=***REMOVED******REMOVED***
              id: pluginHeaderTitle,
              values: ***REMOVED***
                name: get(this.props.editPage.initialData, 'name'),
        ***REMOVED***
      ***REMOVED******REMOVED***
            description=***REMOVED******REMOVED***
              id: pluginHeaderDescription,
              values: ***REMOVED***
                description: get(this.props.editPage.initialData, 'description') || '',
        ***REMOVED***
      ***REMOVED******REMOVED***
            actions=***REMOVED***pluginHeaderActions***REMOVED***
          />
          <div className=***REMOVED***cn('row', styles.container)***REMOVED***>
            <div className="col-md-12">
              <div className=***REMOVED***styles.main_wrapper***REMOVED***>
                <div className=***REMOVED***styles.titleContainer***REMOVED***>
                  <FormattedMessage id="users-permissions.EditPage.form.roles" />
                </div>
                <form className=***REMOVED***styles.form***REMOVED***>
                  <div className="row">
                    ***REMOVED***this.showLoaderForm() ? (
                      <div className=***REMOVED***styles.loaderWrapper***REMOVED***><LoadingIndicator /></div>
                    ) : this.renderFirstBlock()***REMOVED***
                  </div>
                  <div className="row" style=***REMOVED******REMOVED*** marginRight: '-30px'***REMOVED******REMOVED***>
                    ***REMOVED***this.showLoaderPermissions() && (
                      <div className=***REMOVED***styles.loaderWrapper***REMOVED*** style=***REMOVED******REMOVED*** minHeight: '400px' ***REMOVED******REMOVED***>
                        <LoadingIndicator />
                      </div>
                    )***REMOVED***
                    ***REMOVED***!this.showLoaderPermissions() && (
                      <Plugins
                        plugins=***REMOVED***get(this.props.editPage, ['modifiedData', 'permissions'])***REMOVED***
                      />
                    )***REMOVED***
                    <Policies
                      shouldDisplayPoliciesHint=***REMOVED***this.props.editPage.shouldDisplayPoliciesHint***REMOVED***
                      inputSelectName=***REMOVED***this.props.editPage.inputPoliciesPath***REMOVED***
                      routes=***REMOVED***this.props.editPage.routes***REMOVED***
                      selectOptions=***REMOVED***this.props.editPage.policies***REMOVED***
                      values=***REMOVED***this.props.editPage.modifiedData***REMOVED***
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

EditPage.childContextTypes = ***REMOVED***
  onChange: PropTypes.func.isRequired,
  selectAllActions: PropTypes.func.isRequired,
  setInputPoliciesPath: PropTypes.func.isRequired,
  setShouldDisplayPolicieshint: PropTypes.func.isRequired,
  resetShouldDisplayPoliciesHint: PropTypes.func.isRequired,
***REMOVED***;

EditPage.propTypes = ***REMOVED***
  addUser: PropTypes.func.isRequired,
  editPage: PropTypes.object.isRequired,
  getPermissions: PropTypes.func.isRequired,
  getPolicies: PropTypes.func.isRequired,
  getRole: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  resetProps: PropTypes.func.isRequired,
  resetShouldDisplayPoliciesHint: PropTypes.func.isRequired,
  selectAllActions: PropTypes.func.isRequired,
  setActionType: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  setInputPoliciesPath: PropTypes.func.isRequired,
  setRoleId: PropTypes.func.isRequired,
  setShouldDisplayPolicieshint: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  editPage: makeSelectEditPage(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      addUser,
      getPermissions,
      getPolicies,
      getRole,
      getUser,
      onCancel,
      onChangeInput,
      onClickAdd,
      onClickDelete,
      selectAllActions,
      setActionType,
      setErrors,
      setForm,
      setInputPoliciesPath,
      setRoleId,
      setShouldDisplayPolicieshint,
      submit,
      resetProps,
      resetShouldDisplayPoliciesHint,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);

/* Remove this line if the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withReducer = injectReducer(***REMOVED*** key: 'editPage', reducer ***REMOVED***);

/* Remove the line below the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withSaga = injectSaga(***REMOVED*** key: 'editPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditPage);
