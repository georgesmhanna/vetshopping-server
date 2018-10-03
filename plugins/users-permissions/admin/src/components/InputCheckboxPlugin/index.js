/**
*
* InputCheckboxPlugin
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class InputCheckboxPlugin extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** showBackground: false, showCog: false ***REMOVED***;

  componentWillReceiveProps(nextProps) ***REMOVED***
    // Remove background if another input is selected
    if (nextProps.inputSelected !== this.props.inputSelected && nextProps.inputSelected !== this.props.name) ***REMOVED***
      this.setState(***REMOVED*** showBackground: false ***REMOVED***);
***REMOVED***

    if (!nextProps.isOpen) ***REMOVED***
      this.setState(***REMOVED*** showBackground: false, showCog: false ***REMOVED***);
***REMOVED***
***REMOVED***

  handleChange = () => ***REMOVED***
    const target = ***REMOVED***
      type: 'checkbox',
      name: this.props.name,
      value: !this.props.value,
***REMOVED***;

    // Don't show the label background if the user unselects the input
    if (!this.props.value) ***REMOVED***
      this.setState(***REMOVED*** showBackground: true ***REMOVED***);
      // Tell the Parent component that another input has been selected
      this.props.setNewInputSelected(this.props.name);
      // Tell the policies component to show the associated routes
      this.context.setShouldDisplayPolicieshint();
      this.context.setInputPoliciesPath(this.props.name);
***REMOVED*** else ***REMOVED***
      this.setState(***REMOVED*** showBackground: false, showCog: false ***REMOVED***);
      this.props.setNewInputSelected('');
***REMOVED***

    this.context.onChange(***REMOVED*** target ***REMOVED***);
***REMOVED***

  handleClick = () => ***REMOVED***
    this.setState(***REMOVED*** showBackground: !this.state.showBackground ***REMOVED***);
    this.props.setNewInputSelected(this.props.name);
    this.context.setInputPoliciesPath(this.props.name);

    if (this.state.showBackground) ***REMOVED***
      this.context.resetShouldDisplayPoliciesHint();
***REMOVED*** else ***REMOVED***
      this.context.setShouldDisplayPolicieshint();
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    return (
      <div
        className=***REMOVED***cn(styles.inputCheckbox, 'col-md-4')***REMOVED***
        onMouseEnter=***REMOVED***() => ***REMOVED***
          if (this.props.value) ***REMOVED***
            this.setState(***REMOVED*** showCog: true ***REMOVED***);
    ***REMOVED***
  ***REMOVED******REMOVED***
        onMouseLeave=***REMOVED***() => this.setState(***REMOVED*** showCog: false ***REMOVED***)***REMOVED***
      >
        <div className=***REMOVED***cn('form-check', this.state.showBackground ? styles.highlighted : '')***REMOVED***>
          <label className=***REMOVED***cn('form-check-label', styles.label, this.props.value ? styles.checked : '')***REMOVED*** htmlFor=***REMOVED***this.props.name***REMOVED***>
            <input
              className="form-check-input"
              defaultChecked=***REMOVED***this.props.value***REMOVED***
              id=***REMOVED***this.props.name***REMOVED***
              name=***REMOVED***this.props.name***REMOVED***
              onChange=***REMOVED***this.handleChange***REMOVED***
              type="checkbox"
            />
            ***REMOVED***this.props.label***REMOVED***
          </label>
          ***REMOVED***this.state.showCog || this.state.showBackground ? (
            <i className="fa fa-cog" onClick=***REMOVED***this.handleClick***REMOVED*** />
          ) : ''***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

InputCheckboxPlugin.contextTypes = ***REMOVED***
  onChange: PropTypes.func.isRequired,
  resetShouldDisplayPoliciesHint: PropTypes.func.isRequired,
  setInputPoliciesPath: PropTypes.func.isRequired,
  setShouldDisplayPolicieshint: PropTypes.func.isRequired,
***REMOVED***;

InputCheckboxPlugin.defaultProps = ***REMOVED***
  label: '',
  value: false,
***REMOVED***;

InputCheckboxPlugin.propTypes = ***REMOVED***
  inputSelected: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  setNewInputSelected: PropTypes.func.isRequired,
  value: PropTypes.bool,
***REMOVED***;

export default InputCheckboxPlugin;
