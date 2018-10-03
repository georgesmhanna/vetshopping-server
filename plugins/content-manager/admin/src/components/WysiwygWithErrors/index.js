/**
 *
 * WysiwygWithErrors
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, isFunction ***REMOVED*** from 'lodash';
import cn from 'classnames';

// Design
import Label from 'components/Label';
import InputDescription from 'components/InputDescription';
import InputErrors from 'components/InputErrors';
import InputSpacer from 'components/InputSpacer';
import Wysiwyg from 'components/Wysiwyg';

// Utils
import validateInput from 'utils/inputsValidations';

import styles from './styles.scss';

class WysiwygWithErrors extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** errors: [], hasInitialValue: false ***REMOVED***;

  componentDidMount() ***REMOVED***
    const ***REMOVED*** value, errors ***REMOVED*** = this.props;

    // Prevent the input from displaying an error when the user enters and leaves without filling it
    if (!isEmpty(value)) ***REMOVED***
      this.setState(***REMOVED*** hasInitialValue: true ***REMOVED***);
***REMOVED***

    // Display input error if it already has some
    if (!isEmpty(errors)) ***REMOVED***
      this.setState(***REMOVED*** errors ***REMOVED***);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    // Show required error if the input's value is received after the compo is mounted
    if (!isEmpty(nextProps.value) && !this.state.hasInitialValue) ***REMOVED***
      this.setState(***REMOVED*** hasInitialValue: true ***REMOVED***);
***REMOVED***

    // Check if errors have been updated during validations
    if (nextProps.didCheckErrors !== this.props.didCheckErrors) ***REMOVED***
      // Remove from the state the errors that have already been set
      const errors = isEmpty(nextProps.errors) ? [] : nextProps.errors;
      this.setState(***REMOVED*** errors ***REMOVED***);
***REMOVED***
***REMOVED***

  /**
   * Set the errors depending on the validations given to the input
   * @param  ***REMOVED***Object***REMOVED*** target
   */
  handleBlur = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    // Prevent from displaying error if the input is initially isEmpty
    if (!isEmpty(target.value) || this.state.hasInitialValue) ***REMOVED***
      const errors = validateInput(target.value, this.props.validations);
      this.setState(***REMOVED*** errors, hasInitialValue: true ***REMOVED***);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED***
      autoFocus,
      className,
      customBootstrapClass,
      deactivateErrorHighlight,
      disabled,
      errorsClassName,
      errorsStyle,
      inputClassName,
      inputDescription,
      inputDescriptionClassName,
      inputDescriptionStyle,
      inputStyle,
      label,
      labelClassName,
      labelStyle,
      name,
      noErrorsDescription,
      onBlur,
      onChange,
      placeholder,
      resetProps,
      style,
      tabIndex,
      value,
***REMOVED*** = this.props;
    const handleBlur = isFunction(onBlur) ? onBlur : this.handleBlur;

    let spacer = !isEmpty(inputDescription) ? <InputSpacer /> : <div />;

    if (!noErrorsDescription && !isEmpty(this.state.errors)) ***REMOVED***
      spacer = <div />;
***REMOVED***

    return (
      <div
        className=***REMOVED***cn(
          styles.containerWysiwyg,
          customBootstrapClass,
          !isEmpty(className) && className,
        )***REMOVED***
        style=***REMOVED***style***REMOVED***
      >
        <Label
          className=***REMOVED***labelClassName***REMOVED***
          htmlFor=***REMOVED***name***REMOVED***
          message=***REMOVED***label***REMOVED***
          style=***REMOVED***labelStyle***REMOVED***
        />
        <Wysiwyg
          autoFocus=***REMOVED***autoFocus***REMOVED***
          className=***REMOVED***inputClassName***REMOVED***
          disabled=***REMOVED***disabled***REMOVED***
          deactivateErrorHighlight=***REMOVED***deactivateErrorHighlight***REMOVED***
          error=***REMOVED***!isEmpty(this.state.errors)***REMOVED***
          name=***REMOVED***name***REMOVED***
          onBlur=***REMOVED***handleBlur***REMOVED***
          onChange=***REMOVED***onChange***REMOVED***
          placeholder=***REMOVED***placeholder***REMOVED***
          resetProps=***REMOVED***resetProps***REMOVED***
          style=***REMOVED***inputStyle***REMOVED***
          tabIndex=***REMOVED***tabIndex***REMOVED***
          value=***REMOVED***value***REMOVED***
        />
        <InputDescription
          className=***REMOVED***inputDescriptionClassName***REMOVED***
          message=***REMOVED***inputDescription***REMOVED***
          style=***REMOVED***inputDescriptionStyle***REMOVED***
        />
        <InputErrors
          className=***REMOVED***errorsClassName***REMOVED***
          errors=***REMOVED***!noErrorsDescription && this.state.errors || []***REMOVED***
          style=***REMOVED***errorsStyle***REMOVED***
        />
        ***REMOVED***spacer***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

WysiwygWithErrors.defaultProps = ***REMOVED***
  autoFocus: false,
  className: '',
  customBootstrapClass: 'col-md-12',
  deactivateErrorHighlight: false,
  didCheckErrors: false,
  disabled: false,
  errors: [],
  errorsClassName: '',
  errorsStyle: ***REMOVED******REMOVED***,
  inputClassName: '',
  inputDescription: '',
  inputDescriptionClassName: '',
  inputDescriptionStyle: ***REMOVED******REMOVED***,
  inputStyle: ***REMOVED******REMOVED***,
  label: '',
  labelClassName: '',
  labelStyle: ***REMOVED******REMOVED***,
  noErrorsDescription: false,
  onBlur: false,
  placeholder: '',
  resetProps: false,
  style: ***REMOVED******REMOVED***,
  tabIndex: '0',
  validations: ***REMOVED******REMOVED***,
***REMOVED***;

WysiwygWithErrors.propTypes = ***REMOVED***
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  customBootstrapClass: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  didCheckErrors: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.array,
  errorsClassName: PropTypes.string,
  errorsStyle: PropTypes.object,
  inputClassName: PropTypes.string,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape(***REMOVED***
      id: PropTypes.string,
      params: PropTypes.object,
***REMOVED***),
  ]),
  inputDescriptionClassName: PropTypes.string,
  inputDescriptionStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape(***REMOVED***
      id: PropTypes.string,
      params: PropTypes.object,
***REMOVED***),
  ]),
  labelClassName: PropTypes.string,
  labelStyle: PropTypes.object,
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onBlur: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  resetProps: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string.isRequired,
***REMOVED***;

export default WysiwygWithErrors;
