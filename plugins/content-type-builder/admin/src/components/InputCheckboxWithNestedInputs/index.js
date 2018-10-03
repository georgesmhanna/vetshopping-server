/**
*
* InputCheckboxWithNestedInputs
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, map, findIndex ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import Input from 'components/InputsIndex';
import styles from './styles.scss';

class InputCheckboxWithNestedInputs extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  handleChange = () => ***REMOVED***
    const target = ***REMOVED***
      type: 'checkbox',
      value: !this.props.value[this.props.data.name.split('.')[1]],
      name: this.props.data.name,
***REMOVED***;

    this.props.onChange(***REMOVED*** target ***REMOVED***);

    if (!target.value) ***REMOVED***
      const valueToRemove = ***REMOVED***
        target: ***REMOVED***
          name: `$***REMOVED***this.props.data.name***REMOVED***Value`,
          type: 'number',
          value: '',
  ***REMOVED***
***REMOVED***;
      this.props.onChange(valueToRemove);
***REMOVED***
***REMOVED***

  renderNestedInput = () => ***REMOVED***
    if (this.props.value[this.props.data.name.split('.')[1]]) ***REMOVED***
      return (
        <div className=***REMOVED***styles.nestedInputContainer***REMOVED*** style=***REMOVED******REMOVED*** marginBottom: '-19px' ***REMOVED******REMOVED***>
          ***REMOVED***map(this.props.data.items, (item, key) => ***REMOVED***
            const errorIndex = findIndex(this.props.errors, ['name', item.name]);
            const errors = errorIndex !== -1 ? this.props.errors[errorIndex].errors : [];
            return (
              <Input
                key=***REMOVED***key***REMOVED***
                type=***REMOVED***item.type***REMOVED***
                onChange=***REMOVED***this.props.onChange***REMOVED***
                name=***REMOVED***item.name***REMOVED***
                value=***REMOVED***this.props.value[item.name.split('.')[1]]***REMOVED***
                validations=***REMOVED***item.validations***REMOVED***
                label=***REMOVED***item.label***REMOVED***
                errors=***REMOVED***errors***REMOVED***
                didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
                pluginId="content-type-builder"
              />
            );
    ***REMOVED***)***REMOVED***
        </div>
      );
***REMOVED***
    return <div />;
***REMOVED***

  render() ***REMOVED***
    const spacer = !this.props.data.inputDescription ? <div /> : <div style=***REMOVED******REMOVED*** marginBottom: '.5rem'***REMOVED******REMOVED***></div>;
    const title = !isEmpty(this.props.data.title) ? <div className=***REMOVED***styles.inputTitle***REMOVED***><FormattedMessage id=***REMOVED***this.props.data.title***REMOVED*** /></div> : '';

    return (
      <div className=***REMOVED***`$***REMOVED***styles.inputCheckboxWithNestedInputs***REMOVED*** col-md-12`***REMOVED***>
        <div className="form-check" style=***REMOVED******REMOVED*** zIndex: '9999' ***REMOVED******REMOVED***>
          ***REMOVED***title***REMOVED***
          <FormattedMessage id=***REMOVED***this.props.data.label.id***REMOVED***>
            ***REMOVED***(message) => (
              <label className=***REMOVED***`$***REMOVED***styles.checkboxLabel***REMOVED*** form-check-label`***REMOVED*** htmlFor=***REMOVED***this.props.data.name***REMOVED*** style=***REMOVED******REMOVED*** cursor: 'pointer' ***REMOVED******REMOVED***>
                <input
                  className="form-check-input"
                  defaultChecked=***REMOVED***this.props.value[this.props.data.name.split('.')[1]]***REMOVED***
                  id=***REMOVED***this.props.data.name***REMOVED***
                  name=***REMOVED***this.props.data.name***REMOVED***
                  onChange=***REMOVED***this.handleChange***REMOVED***
                  type="checkbox"
                />
                ***REMOVED***message***REMOVED***
              </label>
            )***REMOVED***
          </FormattedMessage>
          <div className=***REMOVED***styles.descriptionContainer***REMOVED***>
            <small>***REMOVED***this.props.data.inputDescription***REMOVED***</small>
          </div>
        </div>

        ***REMOVED***spacer***REMOVED***
        ***REMOVED***this.renderNestedInput()***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

InputCheckboxWithNestedInputs.propTypes = ***REMOVED***
  data: PropTypes.object.isRequired,
  didCheckErrors: PropTypes.bool,
  errors: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
***REMOVED***;

InputCheckboxWithNestedInputs.defaultProps = ***REMOVED***
  didCheckErrors: false,
  errors: [],
  value: ***REMOVED******REMOVED***,
***REMOVED***;

export default InputCheckboxWithNestedInputs;
