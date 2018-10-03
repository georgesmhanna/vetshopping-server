/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** Link ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** findIndex, get, isBoolean, isEmpty, map, replace ***REMOVED*** from 'lodash';
import cn from 'classnames';

// Logo
import LogoStrapi from 'assets/images/logo_strapi.png';

// Design
import Button from 'components/Button';
import Input from 'components/InputsIndex';

// Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ***REMOVED***
  hideLoginErrorsInput,
  onChangeInput,
  setErrors,
  setForm,
  submit,
***REMOVED*** from './actions';
import form from './form.json';
import reducer from './reducer';
import saga from './saga';
import makeSelectAuthPage from './selectors';

import styles from './styles.scss';

export class AuthPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  componentDidMount() ***REMOVED***
    const params = this.props.location.search ? replace(this.props.location.search, '?code=', '') : this.props.match.params.id;
    this.props.setForm(this.props.match.params.authType, params);
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (this.props.match.params.authType !== nextProps.match.params.authType) ***REMOVED***
      const params = nextProps.location.search ? replace(nextProps.location.search, '?code=', '') : nextProps.match.params.id;
      this.props.setForm(nextProps.match.params.authType, params);
      this.props.hideLoginErrorsInput(false);
***REMOVED***

    if (nextProps.submitSuccess) ***REMOVED***
      switch (this.props.match.params.authType) ***REMOVED***
        case 'login':
        case 'reset-password':
          this.props.history.push('/');
          break;
        case 'register':
          this.props.history.push('/');
          // NOTE: prepare for comfirm email;
          // this.props.history.push(`/plugins/users-permissions/auth/register-success/$***REMOVED***this.props.modifiedData.email***REMOVED***`);
          break;
        default:

***REMOVED***
***REMOVED***
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    const formErrors = Object.keys(this.props.modifiedData).reduce((acc, key) => ***REMOVED***
      if (isEmpty(get(this.props.modifiedData, key)) && !isBoolean(get(this.props.modifiedData, key))) ***REMOVED***
        acc.push(***REMOVED*** name: key, errors: [***REMOVED*** id: 'components.Input.error.validation.required' ***REMOVED***] ***REMOVED***);
***REMOVED***

      if (!isEmpty(get(this.props.modifiedData, 'password')) && !isEmpty(get(this.props.modifiedData, 'confirmPassword')) && findIndex(acc, ['name', 'confirmPassword']) === -1) ***REMOVED***
        if (get(this.props.modifiedData, 'password') !== get(this.props.modifiedData, 'confirmPassword')) ***REMOVED***
          acc.push(***REMOVED*** name: 'confirmPassword', errors: [***REMOVED*** id: 'users-permissions.components.Input.error.password.noMatch' ***REMOVED***] ***REMOVED***);
  ***REMOVED***
***REMOVED***

      return acc;
***REMOVED***, []);

    this.props.setErrors(formErrors);

    if (isEmpty(formErrors)) ***REMOVED***
      this.props.submit(this.context);
***REMOVED***
***REMOVED***

  renderButton = () => ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** authType ***REMOVED*** ***REMOVED***, submitSuccess ***REMOVED*** = this.props;

    if (this.props.match.params.authType === 'login') ***REMOVED***
      return (
        <div className=***REMOVED***cn('col-md-6', styles.loginButton)***REMOVED***>
          <Button primary label="users-permissions.Auth.form.button.login" type="submit" />
        </div>
      );
***REMOVED***
    const isEmailForgotSent = authType === 'forgot-password' && submitSuccess;
    const label = isEmailForgotSent ? 'users-permissions.Auth.form.button.forgot-password.success' : `users-permissions.Auth.form.button.$***REMOVED***this.props.match.params.authType***REMOVED***`;
  
    return (
      <div className=***REMOVED***cn('col-md-12', styles.buttonContainer)***REMOVED***>
        <Button
          className=***REMOVED***cn(isEmailForgotSent && styles.buttonForgotSuccess)***REMOVED***
          label=***REMOVED***label***REMOVED***
          style=***REMOVED******REMOVED*** width: '100%' ***REMOVED******REMOVED***
          primary=***REMOVED***!isEmailForgotSent***REMOVED***
          type="submit"
        />
      </div>
    );
***REMOVED***

  renderLink = () => ***REMOVED***

    if (this.props.match.params.authType === 'login') ***REMOVED***
      return (
        <Link to="/plugins/users-permissions/auth/forgot-password">
          <FormattedMessage id="users-permissions.Auth.link.forgot-password" />
        </Link>
      );
***REMOVED***

    if (this.props.match.params.authType === 'forgot-password' || this.props.match.params.authType === 'register-success') ***REMOVED***
      return (
        <Link to="/plugins/users-permissions/auth/login">
          <FormattedMessage id="users-permissions.Auth.link.ready" />
        </Link>
      );
***REMOVED***

    return <div />;
***REMOVED***

  renderInputs = () => ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** authType ***REMOVED*** ***REMOVED*** ***REMOVED*** = this.props;
    const inputs = get(form, ['form', authType]);

    return map(inputs, (input, key) => (
      <Input
        autoFocus=***REMOVED***key === 0***REMOVED***
        customBootstrapClass=***REMOVED***get(input, 'customBootstrapClass')***REMOVED***
        didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
        errors=***REMOVED***get(this.props.formErrors, [findIndex(this.props.formErrors, ['name', input.name]), 'errors'])***REMOVED***
        key=***REMOVED***get(input, 'name')***REMOVED***
        label=***REMOVED***authType === 'forgot-password' && this.props.submitSuccess? ***REMOVED*** id: 'users-permissions.Auth.form.forgot-password.email.label.success' ***REMOVED*** : get(input, 'label')***REMOVED***
        name=***REMOVED***get(input, 'name')***REMOVED***
        onChange=***REMOVED***this.props.onChangeInput***REMOVED***
        placeholder=***REMOVED***get(input, 'placeholder')***REMOVED***
        type=***REMOVED***get(input, 'type')***REMOVED***
        validations=***REMOVED******REMOVED*** required: true ***REMOVED******REMOVED***
        value=***REMOVED***get(this.props.modifiedData, get(input, 'name'), get(input, 'value'))***REMOVED***
        noErrorsDescription=***REMOVED***this.props.noErrorsDescription***REMOVED***
      />
    ));
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** authType ***REMOVED*** ***REMOVED***, modifiedData, submitSuccess ***REMOVED*** = this.props;
    let divStyle = authType === 'register' ? ***REMOVED*** marginTop: '3.2rem' ***REMOVED*** : ***REMOVED*** marginTop: '.9rem' ***REMOVED***;

    if (authType === 'forgot-password' && submitSuccess) ***REMOVED***
      divStyle = ***REMOVED*** marginTop: '.9rem', minHeight: '18.2rem' ***REMOVED***;
***REMOVED***

    return (
      <div className=***REMOVED***styles.authPage***REMOVED***>
        <div className=***REMOVED***styles.wrapper***REMOVED***>
          <div className=***REMOVED***styles.headerContainer***REMOVED***>
            ***REMOVED***this.props.match.params.authType === 'register' ? (
              <FormattedMessage id="users-permissions.Auth.form.header.register" />
            ) : (
              <img src=***REMOVED***LogoStrapi***REMOVED*** alt="logo" />
            )***REMOVED***
          </div>
          <div className=***REMOVED***styles.headerDescription***REMOVED***>
            ***REMOVED***authType === 'register' && <FormattedMessage id="users-permissions.Auth.header.register.description" />***REMOVED***
          </div>

          <div
            className=***REMOVED***cn(
              styles.formContainer,
              authType === 'forgot-password' && submitSuccess ? styles.borderedSuccess : styles.bordered,
            )***REMOVED***
            style=***REMOVED***divStyle***REMOVED***
          >
            <form onSubmit=***REMOVED***this.handleSubmit***REMOVED***>
              <div className="container-fluid">
                ***REMOVED***this.props.noErrorsDescription && !isEmpty(get(this.props.formErrors, ['0', 'errors', '0', 'id']))? (
                  <div className=***REMOVED***styles.errorsContainer***REMOVED***>
                    <FormattedMessage id=***REMOVED***get(this.props.formErrors, ['0', 'errors', '0', 'id'])***REMOVED*** />
                  </div>
                ): ''***REMOVED***
                <div className="row" style=***REMOVED******REMOVED*** textAlign: 'start' ***REMOVED******REMOVED***>
                  ***REMOVED***!submitSuccess && this.renderInputs()***REMOVED***
                  ***REMOVED*** authType === 'forgot-password' && submitSuccess && (
                    <div className=***REMOVED***styles.forgotSuccess***REMOVED***>
                      <FormattedMessage id="users-permissions.Auth.form.forgot-password.email.label.success" />
                      <br />
                      <p>***REMOVED***get(modifiedData, 'email', '')***REMOVED***</p>
                    </div>
                  )***REMOVED***
                  ***REMOVED***this.renderButton()***REMOVED***
                </div>
              </div>
            </form>
          </div>
          <div className=***REMOVED***styles.linkContainer***REMOVED***>
            ***REMOVED***this.renderLink()***REMOVED***
          </div>
        </div>
        ***REMOVED***authType === 'register' && <div className=***REMOVED***styles.logoContainer***REMOVED***><img src=***REMOVED***LogoStrapi***REMOVED*** alt="logo" /></div>***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

AuthPage.contextTypes = ***REMOVED***
  updatePlugin: PropTypes.func,
***REMOVED***;

AuthPage.propTypes = ***REMOVED***
  didCheckErrors: PropTypes.bool.isRequired,
  formErrors: PropTypes.array.isRequired,
  hideLoginErrorsInput: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  modifiedData: PropTypes.object.isRequired,
  noErrorsDescription: PropTypes.bool.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
***REMOVED***;

const mapStateToProps = makeSelectAuthPage();

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      hideLoginErrorsInput,
      onChangeInput,
      setErrors,
      setForm,
      submit,
***REMOVED***,
    dispatch
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);

/* Remove this line if the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withReducer = injectReducer(***REMOVED*** key: 'authPage', reducer ***REMOVED***);

/* Remove the line below the container doesn't have a route and
*  check the documentation to see how to create the container's store
*/
const withSaga = injectSaga(***REMOVED*** key: 'authPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
