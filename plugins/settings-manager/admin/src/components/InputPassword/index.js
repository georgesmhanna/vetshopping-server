/**
*
* InputPassword
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, includes, mapKeys, reject, map, isObject, size ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import WithInput from 'components/WithInput';

/* eslint-disable react/require-default-props  */
class InputPassword extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      errors: [],
      hasInitialValue: false,
      type: true,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    if (this.props.value && !isEmpty(this.props.value)) ***REMOVED***
      this.setState(***REMOVED*** hasInitialValue: true ***REMOVED***);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (!this.isSame(nextProps)) ***REMOVED***
      this.setState(***REMOVED*** errors: nextProps.errors ***REMOVED***);
***REMOVED***
***REMOVED***

  handleBlur = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    // prevent error display if input is initially empty
    if (!isEmpty(target.value) || this.state.hasInitialValue) ***REMOVED***
      // validates basic string validations
      // add custom logic here such as alerts...
      const errors = this.validate(target.value);
      this.setState(***REMOVED*** errors, hasInitialValue: true ***REMOVED***);
***REMOVED***
***REMOVED***

  isSame = (nextProps) => ***REMOVED***
    return size(this.props.errors) === size(nextProps.errors) && this.props.errors.every((error, index) => error.id === nextProps.errors[index].id);
***REMOVED***
  // Basic string validations
  validate = (value) => ***REMOVED***
    let errors = [];
    // handle i18n
    const requiredError = ***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***;
    mapKeys(this.props.validations, (validationValue, validationKey) => ***REMOVED***
      switch (validationKey) ***REMOVED***
        case 'maxLength':
          if (value.length > validationValue) ***REMOVED***
            errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.maxLength' ***REMOVED***);
    ***REMOVED***
          break;
        case 'minLength':
          if (value.length < validationValue) ***REMOVED***
            errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.minLength' ***REMOVED***);
    ***REMOVED***
          break;
        case 'required':
          if (value.length === 0) ***REMOVED***
            errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.required' ***REMOVED***);
    ***REMOVED***
          break;
        case 'regex':
          if (!new RegExp(validationValue).test(value)) ***REMOVED***
            errors.push(***REMOVED*** id: 'settings-manager.request.error.validation.regex' ***REMOVED***);
    ***REMOVED***
          break;
        default:
          errors = [];
***REMOVED***
***REMOVED***);

    if (includes(errors, requiredError)) ***REMOVED***
      errors = reject(errors, (error) => error !== requiredError);
***REMOVED***
    return errors;
***REMOVED***

  handleShowPassword = () => this.setState(***REMOVED*** type: !this.state.type ***REMOVED***)

  renderErrors = () => ***REMOVED*** // eslint-disable-line consistent-return
    if (!this.props.noErrorsDescription) ***REMOVED***
      return (
        map(this.state.errors, (error, key) => ***REMOVED***
          const displayError = isObject(error) && error.id
            ? <FormattedMessage id=***REMOVED***error***REMOVED*** />
            : error;
          return (
            <div key=***REMOVED***key***REMOVED*** className="form-control-feedback invalid-feedback" style=***REMOVED******REMOVED*** fontSize: '1.3rem' ***REMOVED******REMOVED***>***REMOVED***displayError***REMOVED***</div>
          );
  ***REMOVED***)
      );
***REMOVED***
***REMOVED***


  render() ***REMOVED***
    const inputValue = this.props.value || '';
    // override default onBlur
    const handleBlur = this.props.handleBlur || this.handleBlur;
    // override bootStrapClass
    const bootStrapClass = this.props.customBootstrapClass ? this.props.customBootstrapClass : 'col-md-6';
    // set error class with override possibility
    const bootStrapClassDanger = !this.props.deactivateErrorHighlight && !isEmpty(this.state.errors) ? 'has-danger' : '';
    const placeholder = this.props.placeholder || this.props.name;

    const type = this.state.type ? 'password' : 'text';

    const color = this.state.type ? ***REMOVED*** color: '#9EA7B8' ***REMOVED*** : ***REMOVED*** color: 'black' ***REMOVED***;

    return (
      <div className=***REMOVED***`$***REMOVED***bootStrapClass***REMOVED***`***REMOVED***>
        <div className=***REMOVED***`$***REMOVED***this.props.styles.inputText***REMOVED*** $***REMOVED***bootStrapClassDanger***REMOVED***`***REMOVED***>
          <label htmlFor=***REMOVED***this.props.name***REMOVED***><FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.name***REMOVED***`***REMOVED*** /></label>
          <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***placeholder***REMOVED***`***REMOVED***>
            ***REMOVED***(message) => (
              <input
                name=***REMOVED***this.props.target***REMOVED***
                id=***REMOVED***this.props.name***REMOVED***
                onBlur=***REMOVED***handleBlur***REMOVED***
                onFocus=***REMOVED***this.props.handleFocus***REMOVED***
                onChange=***REMOVED***this.props.handleChange***REMOVED***
                value=***REMOVED***inputValue***REMOVED***
                type=***REMOVED***type***REMOVED***
                className=***REMOVED***`form-control $***REMOVED***!isEmpty(this.state.errors) ? 'form-control-danger is-invalid' : ''***REMOVED***`***REMOVED***
                placeholder=***REMOVED***message***REMOVED***
                autoComplete="off"
              />
            )***REMOVED***
          </FormattedMessage>
          <small>***REMOVED***this.props.inputDescription***REMOVED***</small>
          ***REMOVED***this.renderErrors()***REMOVED***
        </div>
        <div className=***REMOVED***this.props.styles.insideInput***REMOVED*** onClick=***REMOVED***this.handleShowPassword***REMOVED*** style=***REMOVED***color***REMOVED***>
          <i className="fa fa-eye" />
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

InputPassword.propTypes = ***REMOVED***
  customBootstrapClass: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  errors: PropTypes.array,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleFocus: PropTypes.func,
  inputDescription: PropTypes.string,
  name: PropTypes.string,
  noErrorsDescription: PropTypes.bool,
  placeholder: PropTypes.string,
  styles: PropTypes.object,
  target: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string,
***REMOVED***;

export default WithInput(InputPassword); // eslint-disable-line new-cap
