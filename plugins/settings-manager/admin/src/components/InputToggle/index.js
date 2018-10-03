/**
*
* InputToggle
* Customization
*  - customBootstrapClass : string
*   overrides the default col-md-4 class
*
* Required
*  - handleChange: function
*  - target: string
*  - isChecked: bool
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class InputToggle extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      isChecked: false,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    const isChecked = this.props.isChecked ? this.props.isChecked : false;
    this.setState(***REMOVED*** isChecked ***REMOVED***);
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.isChecked !== this.props.isChecked) ***REMOVED***
      this.setState(***REMOVED*** isChecked: nextProps.isChecked ***REMOVED***);
***REMOVED***
***REMOVED***

  handleToggle = (e) => ***REMOVED***
    e.preventDefault();
    let isChecked = this.state.isChecked;

    // prevent the toggle if the user clicks on the already selected input
    if (e.target.id === 'on' && !this.state.isChecked) ***REMOVED***
      isChecked = true;
***REMOVED*** else if (e.target.id === 'off' && this.state.isChecked) ***REMOVED***
      isChecked  = false;
***REMOVED***
    const target = ***REMOVED***
      name: this.props.target,
      value: isChecked,
***REMOVED***;
    this.setState(***REMOVED*** isChecked ***REMOVED***);
    this.props.handleChange(***REMOVED*** target ***REMOVED***);
***REMOVED***

  render() ***REMOVED***
    const btnClassOff = this.state.isChecked ? 'btn ' : `btn $***REMOVED***styles.gradientOff***REMOVED***`;
    const btnClassOn = this.state.isChecked ? `btn $***REMOVED***styles.gradientOn***REMOVED***` : 'btn';
    const customBootstrapClass = this.props.customBootstrapClass ? this.props.customBootstrapClass : 'col-md-4';
    const label = this.props.hiddenLabel ? ''
      : <div className=***REMOVED***styles.toggleLabel***REMOVED***><FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.name***REMOVED***`***REMOVED*** /></div>;
    const resized = this.props.hiddenLabel ? ***REMOVED*** marginTop: '-1rem'***REMOVED*** : ***REMOVED*** marginTop: ''***REMOVED***;
    return (
      <div className=***REMOVED***`$***REMOVED***customBootstrapClass***REMOVED*** $***REMOVED***styles.container***REMOVED***`***REMOVED*** style=***REMOVED***resized***REMOVED***>
        ***REMOVED***label***REMOVED***
        <div className=***REMOVED***`$***REMOVED***styles.inputToggle***REMOVED*** btn-group`***REMOVED*** data-toggle="buttons">
          <button type="button" className=***REMOVED***btnClassOff***REMOVED*** id="off" onClick=***REMOVED***this.handleToggle***REMOVED***>OFF</button>
          <button type="button" className=***REMOVED***btnClassOn***REMOVED*** id="on" onClick=***REMOVED***this.handleToggle***REMOVED***>ON</button>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

InputToggle.propTypes = ***REMOVED***
  customBootstrapClass: PropTypes.string,
  handleChange: PropTypes.func,
  hiddenLabel: PropTypes.bool,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  target: PropTypes.string,
***REMOVED***;

export default InputToggle;
