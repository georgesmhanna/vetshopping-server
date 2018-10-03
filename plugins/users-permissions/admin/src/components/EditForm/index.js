/**
*
* EditForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** get ***REMOVED*** from 'lodash';
import cn from 'classnames';

import LoadingIndicator from 'components/LoadingIndicator';
import Input from 'components/InputsIndex';

import styles from './styles.scss';

class EditForm extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  generateSelectOptions = () => (
    Object.keys(get(this.props.values, 'roles', [])).reduce((acc, current) => ***REMOVED***
      const option = ***REMOVED***
        id: get(this.props.values.roles, [current, 'name']),
        value: get(this.props.values.roles, [current, 'type']),
***REMOVED***;
      acc.push(option);
      return acc;
***REMOVED***, [])
  )

  render() ***REMOVED***
    if (this.props.showLoaders) ***REMOVED***
      return (
        <div className=***REMOVED***cn(styles.editForm, this.props.showLoaders && styles.loadIndicatorContainer)***REMOVED***>
          <LoadingIndicator />
        </div>
      );
***REMOVED***

    return (
      <div className=***REMOVED***styles.editForm***REMOVED***>
        <div className="row">
          <Input
            inputDescription=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputSelect.description.role' ***REMOVED******REMOVED***
            inputClassName=***REMOVED***styles.inputStyle***REMOVED***
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputSelect.label.role' ***REMOVED******REMOVED***
            name="advanced.settings.default_role"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            selectOptions=***REMOVED***this.generateSelectOptions()***REMOVED***
            type="select"
            value=***REMOVED***get(this.props.values.settings, 'default_role')***REMOVED***
          />
        </div>
        <div className=***REMOVED***styles.separator***REMOVED*** />
        <div className="row">
          <Input
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.label.email' ***REMOVED******REMOVED***
            inputDescription=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.description.email' ***REMOVED******REMOVED***
            name="advanced.settings.unique_email"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            type="toggle"
            value=***REMOVED***get(this.props.values.settings, 'unique_email')***REMOVED***
          />
        </div>
        <div className=***REMOVED***styles.separator***REMOVED*** />
        ***REMOVED***/****REMOVED***
        <div className="row">
          <Input
            customBootstrapClass="col-md-3"
            label="users-permissions.EditForm.inputSelect.subscriptions.label"
            inputDescription="users-permissions.EditForm.inputSelect.subscriptions.description"
            name="subscriptions"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            type="number"
            validations=***REMOVED******REMOVED******REMOVED******REMOVED***
            value=***REMOVED***get(this.props.values, 'subscriptions')***REMOVED***
          />
          <div className="col-md-3" />
          <Input
            customBootstrapClass="col-md-3"
            label="users-permissions.EditForm.inputSelect.durations.label"
            inputDescription="users-permissions.EditForm.inputSelect.durations.description"
            name="durations"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            type="number"
            validations=***REMOVED******REMOVED******REMOVED******REMOVED***
            value=***REMOVED***get(this.props.values, 'durations')***REMOVED***
          />
        </div>
        <div className=***REMOVED***styles.separator***REMOVED*** />
        */***REMOVED***
        <div className="row">
          <Input
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.label.sign-up' ***REMOVED******REMOVED***
            inputDescription=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.description.sign-up' ***REMOVED******REMOVED***
            name="advanced.settings.allow_register"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            type="toggle"
            value=***REMOVED***get(this.props.values.settings, 'allow_register')***REMOVED***
          />
        </div>
        <div className=***REMOVED***styles.separator***REMOVED*** />
        <div className="row">
          <Input
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.label.email-confirmation' ***REMOVED******REMOVED***
            inputDescription=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.description.email-confirmation' ***REMOVED******REMOVED***
            name="advanced.settings.email_confirmation"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            type="toggle"
            value=***REMOVED***get(this.props.values.settings, 'email_confirmation')***REMOVED***
          />
        </div>
        <div className="row">
          <Input
            label=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.label.email-confirmation-redirection' ***REMOVED******REMOVED***
            inputDescription=***REMOVED******REMOVED*** id: 'users-permissions.EditForm.inputToggle.description.email-confirmation-redirection' ***REMOVED******REMOVED***
            name="advanced.settings.email_confirmation_redirection"
            onChange=***REMOVED***this.props.onChange***REMOVED***
            type="text"
            value=***REMOVED***get(this.props.values.settings, 'email_confirmation_redirection')***REMOVED***
          />
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

EditForm.propTypes = ***REMOVED***
  onChange: PropTypes.func.isRequired,
  showLoaders: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
***REMOVED***;

export default EditForm;
