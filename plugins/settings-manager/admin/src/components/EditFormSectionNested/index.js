/**
*
* EditFormSectionNested
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** has, map, forEach ***REMOVED*** from 'lodash';

// HOC
import EditFormSectionSubNested from 'components/EditFormSectionSubNested';
import WithFormSection from 'components/WithFormSection';

/* eslint-disable react/require-default-props  */
class EditFormSectionNested extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      hasNestedInput: false,
      showNestedForm: false,
      inputWithNestedForm: '',
***REMOVED***;
***REMOVED***
  componentDidMount() ***REMOVED***
    // check if there is inside a section an input that requires nested input to display it on the entire line
    // TODO add logic in withform section HOC
    if (this.props.section) ***REMOVED***
      this.checkForNestedForm(this.props);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.value !== this.props.values) ***REMOVED***
      this.checkForNestedForm(nextProps);
***REMOVED***
***REMOVED***

  checkForNestedForm(props) ***REMOVED***
    forEach(props.section, (input) => ***REMOVED***
      if (input.type === 'enum') ***REMOVED***
        forEach(input.items, (item) => ***REMOVED***
          if (has(item, 'items')) ***REMOVED***
            this.setState(***REMOVED*** hasNestedInput: true, inputWithNestedForm: input.target, section: item.items ***REMOVED***);

            if (props.values[input.target] === item.value) ***REMOVED***
              this.setState(***REMOVED*** showNestedForm: true ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
              this.setState(***REMOVED*** showNestedForm: false ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***);
***REMOVED***

  render() ***REMOVED***
    return (
      <div className=***REMOVED***`$***REMOVED***this.props.styles.padded***REMOVED*** $***REMOVED***this.props.styles.nesTedFormContainer***REMOVED***`***REMOVED***>
        <div className="row">
          ***REMOVED***map(this.props.section, (item, key) => ***REMOVED***
            if (this.state.showNestedForm) ***REMOVED***
              return (
                <div key=***REMOVED***key***REMOVED*** style=***REMOVED******REMOVED***width: '100%'***REMOVED******REMOVED***>
                  ***REMOVED***this.props.renderInput(item, key)***REMOVED***
                  <EditFormSectionSubNested
                    section=***REMOVED***this.state.section***REMOVED***
                    values=***REMOVED***this.props.values***REMOVED***
                    onChange=***REMOVED***this.props.onChange***REMOVED***
                    formErrors=***REMOVED***this.props.formErrors***REMOVED***
                  />
                </div>
              );
      ***REMOVED***

            return this.props.renderInput(item, key);
    ***REMOVED***)***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

EditFormSectionNested.propTypes = ***REMOVED***
  formErrors: PropTypes.array,
  onChange: PropTypes.func,
  renderInput: PropTypes.func,
  section: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  styles: PropTypes.object,
  value: PropTypes.object,
  values: PropTypes.object,
***REMOVED***;

export default WithFormSection(EditFormSectionNested); // eslint-disable-line new-cap
