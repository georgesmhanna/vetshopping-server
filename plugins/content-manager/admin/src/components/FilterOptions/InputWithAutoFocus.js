/**
 *
 * InputWithAutoFocus that programatically manage the autofocus of another one
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** get ***REMOVED*** from 'lodash';

import InputDate from 'components/InputDate/Loadable';
import InputNumber from 'components/InputNumber/Loadable';
import InputSelect from 'components/InputSelect/Loadable';
import InputText from 'components/InputText/Loadable';

const getInputType = (attrType) => ***REMOVED***
  switch (attrType) ***REMOVED***
    case 'boolean':
      return InputSelect;
    case 'date':
    case 'datetime':
      return InputDate;
    case 'integer':
    case 'bigint':
    case 'decimal':
    case 'float':
      return InputNumber;
    default:
      return InputText;
***REMOVED***
***REMOVED***;


class InputWithAutoFocus extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    if (this.props.filterToFocus === this.props.index) ***REMOVED***
      return new Promise(resolve => ***REMOVED***
        setTimeout(() => ***REMOVED***
          if (this.inputEl.hasOwnProperty('openCalendar')) ***REMOVED***
            this.inputEl.openCalendar();
    ***REMOVED*** else ***REMOVED***
            this.inputEl.focus();
    ***REMOVED***
          resolve();
  ***REMOVED*** 300);
***REMOVED***);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** filter, inputStyle, name, onChange, schema ***REMOVED*** = this.props;
    const Input = getInputType(get(schema, [filter.attr, 'type'], 'string'));

    return (
      <Input
        inputRef=***REMOVED***input => this.inputEl = input***REMOVED***
        name=***REMOVED***name***REMOVED***
        onChange=***REMOVED***onChange***REMOVED***
        selectOptions=***REMOVED***['true', 'false']***REMOVED***
        style=***REMOVED***inputStyle***REMOVED***
        value=***REMOVED***get(filter, 'value')***REMOVED***
      />
    );
***REMOVED***
***REMOVED***

InputWithAutoFocus.defaultProps = ***REMOVED***
  filterToFocus: null,
***REMOVED***;

InputWithAutoFocus.propTypes = ***REMOVED***
  filter: PropTypes.object.isRequired,
  filterToFocus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  index: PropTypes.number.isRequired,
  inputStyle: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
***REMOVED***;

export default InputWithAutoFocus;
