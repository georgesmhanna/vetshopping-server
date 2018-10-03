/**
*
* InputSelect
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class InputSelect extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  componentDidMount() ***REMOVED***
    // Init the select value
    if (this.props.selectOptions[0].value !== '' && isEmpty(this.props.value)) ***REMOVED***
      const target = ***REMOVED*** name: this.props.target, value: this.props.selectOptions[0].value***REMOVED***;
      this.props.handleChange(***REMOVED*** target ***REMOVED***);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    const bootStrapClass = this.props.customBootstrapClass ? this.props.customBootstrapClass : 'col-md-6';
    const requiredClass = this.props.validations.required && this.props.addRequiredInputDesign ? styles.requiredClass : '';

    return (
      <div className=***REMOVED***`$***REMOVED***styles.input***REMOVED*** $***REMOVED***requiredClass***REMOVED*** $***REMOVED***bootStrapClass***REMOVED***`***REMOVED***>
        <label htmlFor=***REMOVED***this.props.name***REMOVED***>
          <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.name***REMOVED***`***REMOVED*** />
        </label>
        <select
          className="form-control"
          id=***REMOVED***this.props.name***REMOVED***
          name=***REMOVED***this.props.target***REMOVED***
          onChange=***REMOVED***this.props.handleChange***REMOVED***
          value=***REMOVED***this.props.value***REMOVED***
        >
          ***REMOVED***map(this.props.selectOptions, (option, key) => (
            option.name ?
              <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***option.name***REMOVED***`***REMOVED*** key=***REMOVED***key***REMOVED***>
                ***REMOVED***(message) => (
                  <option value=***REMOVED***option.value***REMOVED***>
                    ***REMOVED***message***REMOVED***
                  </option>
                )***REMOVED***
              </FormattedMessage> :
              <option value=***REMOVED***option.value***REMOVED*** key=***REMOVED***key***REMOVED***>***REMOVED***option.name***REMOVED***</option>
          ))***REMOVED***
        </select>
      </div>
    );
***REMOVED***
***REMOVED***

InputSelect.propTypes = ***REMOVED***
  addRequiredInputDesign: PropTypes.bool,
  customBootstrapClass: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  selectOptions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  target: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string,
***REMOVED***;

export default InputSelect;
