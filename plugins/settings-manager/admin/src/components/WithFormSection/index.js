/**
*
* WithFormSection
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** findIndex, forEach, has, isObject , join, pullAt, split, includes***REMOVED*** from 'lodash';

import InputNumber from 'components/InputNumber';
import InputText from 'components/InputText';
import InputToggle from 'components/InputToggle';
import InputPassword from 'components/InputPassword';
import InputSelect from 'components/InputSelect';
import InputEnum from 'components/InputEnum';
import config from './config.json';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
const WithFormSection = (InnerComponent) => class extends React.Component ***REMOVED***
  static propTypes = ***REMOVED***
    addRequiredInputDesign: PropTypes.bool,
    cancelAction: PropTypes.bool,
    formErrors: PropTypes.array,
    onChange: PropTypes.func,
    section: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    values: PropTypes.object,
***REMOVED***

  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      hasNestedInput: false,
      showNestedForm: false,
      inputWithNestedForm: '',
***REMOVED***;

    this.inputs = ***REMOVED***
      string: InputText,
      password: InputPassword,
      number: InputNumber,
      boolean: InputToggle,
      enum: InputEnum,
      select: InputSelect,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    // check if there is inside a section an input that requires nested input to display it on the entire line
    if (isObject(this.props.section)) ***REMOVED***
      this.checkForNestedForm(this.props);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.section !== this.props.section || nextProps.cancelAction !== this.props.cancelAction) ***REMOVED***
      this.setState(***REMOVED*** showNestedForm: false, hasNestedInput: false, inputWithNestedForm: '' ***REMOVED***);
      if (isObject(nextProps.section)) ***REMOVED***
        this.checkForNestedForm(nextProps);
***REMOVED***
***REMOVED***
***REMOVED***

  checkForNestedForm(props) ***REMOVED***
    forEach(props.section.items, (input) => ***REMOVED***
      if(has(input, 'items')) ***REMOVED***
        this.setState(***REMOVED*** hasNestedInput: true, inputWithNestedForm: input.target ***REMOVED***);

        if (props.values[input.target]) ***REMOVED***
          this.setState(***REMOVED*** showNestedForm: true ***REMOVED***);
  ***REMOVED***
***REMOVED***
***REMOVED***);
***REMOVED***

  handleChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    // display nestedForm if the selected input has a nested form
    if (target.name === this.state.inputWithNestedForm) ***REMOVED***
      this.setState(***REMOVED*** showNestedForm: target.value ***REMOVED***);
***REMOVED***

    this.props.onChange(***REMOVED*** target ***REMOVED***);
***REMOVED***

  renderInput = (props, key) => ***REMOVED***
    const Input = this.inputs[props.type];
    const inputValue = this.props.values[props.target];
    // retrieve options for the select input
    const selectOptions = props.type === 'enum' || props.type === 'select' ? props.items : [];

    // custom check for dynamic keys used for databases
    const dynamicTarget = join(pullAt(split(props.target, '.'),['0', '1', '3', '4']), '.');

    // check if the input has a nested form so it is displayed on the entire line
    const customBootstrapClass = this.state.hasNestedInput ?
      // bootstrap class to make the input displayed on the entire line
      'col-md-6 offset-md-6 mr-md-5' :
      // if the input hasn't a nested form but the config requires him to be displayed differently
      config[props.target] || config[dynamicTarget] || '';

    // custom handleChange props for nested input form
    const handleChange = this.state.hasNestedInput ? this.handleChange :  this.props.onChange;
    let hiddenLabel = includes(props.name, 'enabled');

    if (includes(config.showInputLabel, props.name)) hiddenLabel = false;

    const errorIndex = findIndex(this.props.formErrors, ['target', props.target]);
    const errors = errorIndex !== -1 ? this.props.formErrors[errorIndex].errors : [];

    return (
      <Input
        customBootstrapClass=***REMOVED***customBootstrapClass***REMOVED***
        key=***REMOVED***key***REMOVED***
        handleChange=***REMOVED***handleChange***REMOVED***
        name=***REMOVED***props.name***REMOVED***
        target=***REMOVED***props.target***REMOVED***
        isChecked=***REMOVED***inputValue***REMOVED***
        selectOptions=***REMOVED***selectOptions***REMOVED***
        validations=***REMOVED***props.validations***REMOVED***
        value=***REMOVED***inputValue***REMOVED***
        addRequiredInputDesign=***REMOVED***this.props.addRequiredInputDesign***REMOVED***
        hiddenLabel=***REMOVED***hiddenLabel***REMOVED***
        inputDescription=***REMOVED***props.description***REMOVED***
        errors=***REMOVED***errors***REMOVED***
      />
    );
***REMOVED***

  render() ***REMOVED***
    return (
      <InnerComponent
        ***REMOVED***...this.props***REMOVED***
        showNestedForm=***REMOVED***this.state.showNestedForm***REMOVED***
        renderInput=***REMOVED***this.renderInput***REMOVED***
        styles=***REMOVED***styles***REMOVED***
      />
    );
***REMOVED***
***REMOVED***;

export default WithFormSection;
