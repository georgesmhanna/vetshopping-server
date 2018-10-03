/**
*
* InputText
* Customization
*   - deactivateErrorHighlight: bool
*     allow the user to remove bootstrap class 'has-danger' on the inputText
*   - customBootstrapClass : string
*     overrides the default 'col-md-6' on the inputText
*   - handleBlur: function
*     overrides the default input validations
*   - errors : array
*   - noErrorsDescription : bool
*     prevent from displaying errors messages
*
* Required
*  - name : string
*  - handleChange : function
*  - value : string
*  - target : string
*  - validations : object
*
* Optionnal
* - description : input description
* - handleFocus : function
* - placeholder : string if set to "" nothing will display
*
* - styles are retrieved from the HOC
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, includes, mapKeys, reject, map, isObject, union, findIndex, uniqBy, size ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import WithInput from 'components/WithInput';

/* eslint-disable react/require-default-props  */
class InputText extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      errors: [],
      hasInitialValue: false,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    if (this.props.value && !isEmpty(this.props.value)) ***REMOVED***
      this.setState(***REMOVED*** hasInitialValue: true ***REMOVED***);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (!this.isSame(nextProps)) ***REMOVED***
      const errors = isEmpty(nextProps.errors) ? [] : uniqBy(union(this.state.errors, nextProps.errors), 'id');

      // if (isEmpty(nextProps.errors)) remove(errors, (error) => error.id === 'settings-manager.request.error.database.exist');
      this.setState(***REMOVED*** errors ***REMOVED***);
***REMOVED***
    if (isEmpty(nextProps.errors)) ***REMOVED***
      this.setState(***REMOVED*** errors: [] ***REMOVED***);
***REMOVED***
***REMOVED***

  isSame = (nextProps) => ***REMOVED***
    return size(this.props.errors) === size(nextProps.errors) && this.props.errors.every((error, index) => error.id === nextProps.errors[index].id);
***REMOVED***

  handleBlur = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    // prevent error display if input is initially empty
    if (!isEmpty(target.value) || this.state.hasInitialValue) ***REMOVED***
      // validates basic string validations
      // add custom logic here such as alerts...
      // specific check for db
      const indexErrorDbExist = findIndex(this.props.errors, ['id', 'settings-manager.request.error.database.exist']);
      const errors = indexErrorDbExist !== -1 ?
        uniqBy(union(this.props.errors, this.validate(target.value)), 'id') : this.validate(target.value);

      this.setState(***REMOVED*** errors, hasInitialValue: true ***REMOVED***);
***REMOVED***
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

  renderErrors = () => ***REMOVED*** // eslint-disable-line consistent-return
    if (!this.props.noErrorsDescription) ***REMOVED***
      return (
        map(this.state.errors, (error, key) => ***REMOVED***
          const displayError = isObject(error) && error.id
            ? <FormattedMessage ***REMOVED***...error***REMOVED*** />
            : error;
          return (
            <div key=***REMOVED***key***REMOVED*** className="form-control-feedback invalid-feedback" style=***REMOVED******REMOVED***marginBottom: '1.8rem', fontSize: '1.3rem' ***REMOVED******REMOVED***>***REMOVED***displayError***REMOVED***</div>
          );
  ***REMOVED***)
      );
***REMOVED***
***REMOVED***

  renderFormattedInput = (handleBlur, inputValue, placeholder, marginBottom) => (
    <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***placeholder***REMOVED***`***REMOVED***>
      ***REMOVED***(message) => (
        <input
          name=***REMOVED***this.props.target***REMOVED***
          id=***REMOVED***this.props.name***REMOVED***
          onBlur=***REMOVED***handleBlur***REMOVED***
          onFocus=***REMOVED***this.props.handleFocus***REMOVED***
          onChange=***REMOVED***this.props.handleChange***REMOVED***
          value=***REMOVED***inputValue***REMOVED***
          type="text"
          className=***REMOVED***`form-control $***REMOVED***!isEmpty(this.state.errors) ? 'form-control-danger is-invalid' : ''***REMOVED***`***REMOVED***
          placeholder=***REMOVED***message***REMOVED***
          autoComplete="off"
          style=***REMOVED******REMOVED***marginBottom***REMOVED******REMOVED***
        />
      )***REMOVED***
    </FormattedMessage>
  )

  render() ***REMOVED***
    const inputValue = this.props.value || '';
    // override default onBlur
    const handleBlur = this.props.handleBlur || this.handleBlur;
    // override bootStrapClass
    const bootStrapClass = this.props.customBootstrapClass ? this.props.customBootstrapClass : 'col-md-6';
    // set error class with override possibility
    const bootStrapClassDanger = !this.props.deactivateErrorHighlight && !isEmpty(this.state.errors) ? 'has-danger' : '';
    const placeholder = this.props.placeholder || this.props.name;

    const label = this.props.name ? <label htmlFor=***REMOVED***this.props.name***REMOVED***><FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.name***REMOVED***`***REMOVED*** /></label> : '';
    const spacer = !this.props.name ? ***REMOVED***marginTop: '2.4rem'***REMOVED*** : ***REMOVED***marginTop: ''***REMOVED***;
    const marginBottomInput = isEmpty(this.state.errors) ? '4.3rem' : '2.4rem';
    const input = placeholder
      ? this.renderFormattedInput(handleBlur, inputValue, placeholder, marginBottomInput)
      : (
        <input
          name=***REMOVED***this.props.target***REMOVED***
          id=***REMOVED***this.props.name***REMOVED***
          onBlur=***REMOVED***handleBlur***REMOVED***
          onFocus=***REMOVED***this.props.handleFocus***REMOVED***
          onChange=***REMOVED***this.props.handleChange***REMOVED***
          value=***REMOVED***inputValue***REMOVED***
          type="text"
          className=***REMOVED***`form-control $***REMOVED***!isEmpty(this.state.errors) ? 'form-control-danger is-invalid' : ''***REMOVED***`***REMOVED***
          placeholder=***REMOVED***placeholder***REMOVED***
          style=***REMOVED******REMOVED***marginBottom: marginBottomInput ***REMOVED******REMOVED***
        />
      );

    const requiredClass = this.props.validations.required && this.props.addRequiredInputDesign ? this.props.styles.requiredClass : '';
    let marginTopSmall = this.props.inputDescription ? '-3rem' : '-1.5rem';
    if (!isEmpty(this.state.errors) && this.props.inputDescription) marginTopSmall = '-1.2rem';
    return (
      <div className=***REMOVED***`$***REMOVED***this.props.styles.inputText***REMOVED*** $***REMOVED***bootStrapClass***REMOVED*** $***REMOVED***requiredClass***REMOVED*** $***REMOVED***bootStrapClassDanger***REMOVED***`***REMOVED*** style=***REMOVED***spacer***REMOVED***>
        ***REMOVED***label***REMOVED***
        ***REMOVED***input***REMOVED***
        <small style=***REMOVED******REMOVED*** marginTop: marginTopSmall ***REMOVED******REMOVED***>***REMOVED***this.props.inputDescription***REMOVED***</small>
        ***REMOVED***this.renderErrors()***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

InputText.propTypes = ***REMOVED***
  addRequiredInputDesign: PropTypes.bool,
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

export default WithInput(InputText); // eslint-disable-line new-cap
