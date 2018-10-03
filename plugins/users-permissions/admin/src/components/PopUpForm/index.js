/**
*
* PopUpForm
*
*/

import React from 'react';
import ***REMOVED*** Button, Modal, ModalHeader, ModalBody, ModalFooter ***REMOVED*** from 'reactstrap';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import ***REMOVED***
  capitalize,
  get,
  findIndex,
  isArray,
  isEmpty,
  isObject,
  includes,
  map,
  startsWith,
  tail,
  take,
  takeRight,
***REMOVED*** from 'lodash';

// Translations
import en from 'translations/en.json';

import Input from 'components/InputsIndex';

import styles from './styles.scss';

class PopUpForm extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** enabled: false, isEditing: false ***REMOVED***;

  componentWillReceiveProps(nextProps) ***REMOVED***
    const ***REMOVED*** values ***REMOVED*** = nextProps;

    if (get(values, 'enabled') && get(values, 'enabled') !== get(this.props.values, 'enabled')) ***REMOVED***
      this.setState(***REMOVED*** enabled: get(values, 'enabled') ***REMOVED***);
***REMOVED***
***REMOVED***

  getRedirectURIProviderConf = () => ***REMOVED*** // NOTE: Still testings providers so the switch statement is likely to change
    switch (this.props.dataToEdit) ***REMOVED***
      case 'discord':
        return `$***REMOVED***strapi.backendURL***REMOVED***/connect/discord/callback`;
      case 'facebook':
        return `$***REMOVED***strapi.backendURL***REMOVED***/connect/facebook/callback`;
      case 'google':
        return `$***REMOVED***strapi.backendURL***REMOVED***/connect/google/callback`;
      case 'github':
        return get(this.props.values, 'redirect_uri', '');
      case 'microsoft':
        return `$***REMOVED***strapi.backendURL***REMOVED***/connect/microsoft/callback`;
      default: ***REMOVED***
        const value = get(this.props.values, 'callback', '');

        return startsWith(value, 'http') ? value : `$***REMOVED***strapi.backendURL***REMOVED***$***REMOVED***value***REMOVED***`;
***REMOVED***
***REMOVED***
***REMOVED***

  generateRedirectURL = (url) => ***REMOVED***
    return startsWith(url, 'https://') || startsWith(url, 'http://') || this.state.isEditing ? url : `$***REMOVED***strapi.backendURL***REMOVED***$***REMOVED***startsWith(url, '/') ? '' : '/'***REMOVED***$***REMOVED***url***REMOVED***`;
***REMOVED***

  handleChange = (e) => ***REMOVED***
    this.setState(***REMOVED*** enabled: e.target.value ***REMOVED***);
    this.props.onChange(e);
***REMOVED***

  handleBlur = (e) => ***REMOVED***
    this.setState(***REMOVED*** isEditing: false ***REMOVED***);

    if (isEmpty(e.target.value)) ***REMOVED***
      const ***REMOVED*** name, type ***REMOVED*** = e.target;
      const target = Object.assign(***REMOVED*** name, type ***REMOVED***, ***REMOVED*** value: `/auth/$***REMOVED***this.props.dataToEdit***REMOVED***/callback` ***REMOVED***);
      this.props.onChange(***REMOVED*** target ***REMOVED***);
***REMOVED***
***REMOVED***

  handleFocus = () => this.setState(***REMOVED*** isEditing: true ***REMOVED***);

  renderForm = () => ***REMOVED***
    const ***REMOVED*** dataToEdit, settingType, values ***REMOVED***  = this.props;
    const form = Object.keys(values.options || values || ***REMOVED******REMOVED***).reduce((acc, current) => ***REMOVED***
      const path = settingType === 'email-templates' ? ['options', current] : [ current ];
      const name = settingType === 'email-templates' ? 'options.' : '';

      if (isObject(get(values, path)) && !isArray(get(values, path))) ***REMOVED***
        return Object.keys(get(values, path, ***REMOVED******REMOVED***))
          .reduce((acc, curr) => ***REMOVED***
            acc.push(`$***REMOVED***name***REMOVED***$***REMOVED***current***REMOVED***.$***REMOVED***curr***REMOVED***`);

            return acc;
    ***REMOVED*** []).concat(acc);
***REMOVED*** else if (current !== 'icon' && current !== 'scope')***REMOVED***
        acc.push(`$***REMOVED***name***REMOVED***$***REMOVED***current***REMOVED***`);
***REMOVED***

      return acc;
***REMOVED***, []);

    if (settingType === 'providers') ***REMOVED***
      return (
        <div className=***REMOVED***`row $***REMOVED***styles.providerDisabled***REMOVED***`***REMOVED***>
          <Input
            inputDescription=***REMOVED******REMOVED*** id: 'users-permissions.PopUpForm.Providers.enabled.description' ***REMOVED******REMOVED***
            label=***REMOVED******REMOVED*** id: 'users-permissions.PopUpForm.Providers.enabled.label' ***REMOVED******REMOVED***
            name=***REMOVED***`$***REMOVED***settingType***REMOVED***.$***REMOVED***dataToEdit***REMOVED***.enabled`***REMOVED***
            onChange=***REMOVED***this.handleChange***REMOVED***
            type="toggle"
            validations=***REMOVED******REMOVED******REMOVED******REMOVED***
            value=***REMOVED***get(this.props.values, 'enabled', this.state.enabled)***REMOVED***
          />

          ***REMOVED***form.length > 1 && <div className=***REMOVED***styles.separator***REMOVED*** /> ***REMOVED***

          ***REMOVED***map(tail(form), (value, key) => (
            <Input
              autoFocus=***REMOVED***key === 0***REMOVED***
              customBootstrapClass="col-md-12"
              didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
              errors=***REMOVED***get(this.props.formErrors, [findIndex(this.props.formErrors, ['name', value]), 'errors'], [])***REMOVED***
              key=***REMOVED***value***REMOVED***
              label=***REMOVED******REMOVED*** id: `users-permissions.PopUpForm.Providers.$***REMOVED*** includes(value, 'callback') || includes(value, 'redirect_uri') ? 'redirectURL.front-end' : value***REMOVED***.label` ***REMOVED******REMOVED***
              name=***REMOVED***`$***REMOVED***settingType***REMOVED***.$***REMOVED***dataToEdit***REMOVED***.$***REMOVED***value***REMOVED***`***REMOVED***
              onFocus=***REMOVED***includes(value, 'callback') || includes(value, 'redirect_uri') ? this.handleFocus : () => ***REMOVED******REMOVED******REMOVED***
              onBlur=***REMOVED***includes(value, 'callback') || includes(value, 'redirect_uri') ? this.handleBlur : false***REMOVED***
              onChange=***REMOVED***this.props.onChange***REMOVED***
              type="text"
              value=***REMOVED***includes(value, 'callback') || includes(value, 'redirect_uri') ? this.generateRedirectURL(get(values, value)) : get(values, value)***REMOVED***
              validations=***REMOVED******REMOVED*** required: true ***REMOVED******REMOVED***
            />
          ))***REMOVED***
          ***REMOVED*** dataToEdit !== 'email' && (
            <Input
              customBootstrapClass="col-md-12"
              disabled
              label=***REMOVED******REMOVED*** id: `users-permissions.PopUpForm.Providers.$***REMOVED***dataToEdit***REMOVED***.providerConfig.redirectURL` ***REMOVED******REMOVED***
              name="noName"
              type="text"
              onChange=***REMOVED***() => ***REMOVED******REMOVED******REMOVED***
              value=***REMOVED***this.getRedirectURIProviderConf()***REMOVED***
              validations=***REMOVED******REMOVED******REMOVED******REMOVED***
            />
          )***REMOVED***
        </div>
      );
***REMOVED***

    const params = ***REMOVED***
      link: (
        <a href="https://github.com/strapi/strapi/blob/master/packages/strapi-plugin-users-permissions/docs/email-templates.md" target="_blank">
          <FormattedMessage id="users-permissions.PopUpForm.Email.link.documentation" />
        </a>
      ),
***REMOVED***;

    return (
      <div className="row">
        ***REMOVED***map(take(form, 3), (value, key) => (
          <Input
            autoFocus=***REMOVED***key === 0***REMOVED***
            key=***REMOVED***value***REMOVED***
            didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
            errors=***REMOVED***get(this.props.formErrors, [findIndex(this.props.formErrors, ['name', value]), 'errors'], [])***REMOVED***
            label=***REMOVED******REMOVED*** id: `users-permissions.PopUpForm.Email.$***REMOVED***value***REMOVED***.label` ***REMOVED******REMOVED***
            name=***REMOVED***`$***REMOVED***settingType***REMOVED***.$***REMOVED***dataToEdit***REMOVED***.$***REMOVED***value***REMOVED***`***REMOVED***
            onChange=***REMOVED***this.props.onChange***REMOVED***
            placeholder=***REMOVED***`users-permissions.PopUpForm.Email.$***REMOVED***value***REMOVED***.placeholder`***REMOVED***
            type=***REMOVED***includes(value, 'email') ? 'email' : 'text'***REMOVED***
            value=***REMOVED***get(values, value)***REMOVED***
            validations=***REMOVED***value !== 'options.response_email' ? ***REMOVED*** required: true ***REMOVED*** : ***REMOVED******REMOVED******REMOVED***
          />
        ))***REMOVED***
        <div className="col-md-6" />
        ***REMOVED***map(takeRight(form, 2), (value) => (
          <Input
            key=***REMOVED***value***REMOVED***
            customBootstrapClass="col-md-12"
            didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
            errors=***REMOVED***get(this.props.formErrors, [findIndex(this.props.formErrors, ['name', value]), 'errors'], [])***REMOVED***
            label=***REMOVED******REMOVED*** id: `users-permissions.PopUpForm.Email.$***REMOVED***value***REMOVED***.label` ***REMOVED******REMOVED***
            name=***REMOVED***`$***REMOVED***settingType***REMOVED***.$***REMOVED***dataToEdit***REMOVED***.$***REMOVED***value***REMOVED***`***REMOVED***
            inputDescription=***REMOVED******REMOVED***
              id: includes(value, 'object') ? 'users-permissions.PopUpForm.Email.email_templates.inputDescription' : '',
              params,
      ***REMOVED******REMOVED***
            onChange=***REMOVED***this.props.onChange***REMOVED***
            placeholder=***REMOVED***`users-permissions.PopUpForm.Email.$***REMOVED***this.props.dataToEdit***REMOVED***.$***REMOVED***value***REMOVED***.placeholder`***REMOVED***
            type=***REMOVED***includes(value, 'object') ? 'text' : 'textarea'***REMOVED***
            validations=***REMOVED******REMOVED*** required: true ***REMOVED******REMOVED***
            value=***REMOVED***get(values, value)***REMOVED***
            inputStyle=***REMOVED***!includes(value, 'object') ? ***REMOVED*** height: '16rem' ***REMOVED*** : ***REMOVED******REMOVED******REMOVED***
          />
        ))***REMOVED***
      </div>
    );
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** display ***REMOVED*** = this.props.values;
    const ***REMOVED*** actionType, dataToEdit, settingType ***REMOVED*** = this.props;

    let header = <span>***REMOVED***dataToEdit***REMOVED***</span>;

    if (actionType) ***REMOVED***
      header = <FormattedMessage id=***REMOVED***`users-permissions.PopUpForm.header.$***REMOVED***actionType***REMOVED***.$***REMOVED***settingType***REMOVED***`***REMOVED*** values=***REMOVED******REMOVED*** provider: <i>***REMOVED***capitalize(dataToEdit)***REMOVED***</i> ***REMOVED******REMOVED*** />;
***REMOVED***

    if (display && en[display]) ***REMOVED***
      header = <FormattedMessage id=***REMOVED***`users-permissions.$***REMOVED***display***REMOVED***`***REMOVED*** />;
***REMOVED***

    return (
      <div className=***REMOVED***styles.popUpForm***REMOVED***>
        <Modal isOpen=***REMOVED***this.props.isOpen***REMOVED*** toggle=***REMOVED***this.context.unsetDataToEdit***REMOVED*** className=***REMOVED***`$***REMOVED***styles.modalPosition***REMOVED***`***REMOVED***>
          <ModalHeader toggle=***REMOVED***this.context.unsetDataToEdit***REMOVED*** className=***REMOVED***styles.modalHeader***REMOVED*** />
          <div className=***REMOVED***styles.headerContainer***REMOVED***>
            <div>
              ***REMOVED***header***REMOVED***
            </div>
          </div>
          <form onSubmit=***REMOVED***this.props.onSubmit***REMOVED***>
            <ModalBody className=***REMOVED***styles.modalBody***REMOVED***>
              <div className="container-fluid">
                ***REMOVED***this.renderForm()***REMOVED***
              </div>
            </ModalBody>
            <ModalFooter className=***REMOVED***styles.modalFooter***REMOVED***>
              <Button onClick=***REMOVED***() => this.context.unsetDataToEdit()***REMOVED*** className=***REMOVED***styles.secondary***REMOVED***>
                <FormattedMessage id="users-permissions.PopUpForm.button.cancel" />
              </Button>
              <Button type="submit" onClick=***REMOVED***this.props.onSubmit***REMOVED*** className=***REMOVED***styles.primary***REMOVED***>
                <FormattedMessage id="users-permissions.PopUpForm.button.save" />
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
***REMOVED***
***REMOVED***

PopUpForm.contextTypes = ***REMOVED***
  unsetDataToEdit: PropTypes.func.isRequired,
***REMOVED***;

PopUpForm.defaultProps = ***REMOVED***
  settingType: 'providers',
  // showLoader: false,
***REMOVED***;

PopUpForm.propTypes = ***REMOVED***
  actionType: PropTypes.string.isRequired,
  dataToEdit: PropTypes.string.isRequired,
  didCheckErrors: PropTypes.bool.isRequired,
  formErrors: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  settingType: PropTypes.string,
  // showLoader: PropTypes.bool,
  values: PropTypes.object.isRequired,
***REMOVED***;

export default PopUpForm;
