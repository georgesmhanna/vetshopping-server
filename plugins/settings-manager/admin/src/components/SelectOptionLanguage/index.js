/**
*
* SelectOption
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import getFlag, ***REMOVED*** formatLanguageLocale ***REMOVED*** from '../../utils/getFlag';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class SelectOptionLanguage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  handleSelect =  (event) => ***REMOVED***
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
***REMOVED***

  handleMouseEnter  = (event) => ***REMOVED***
    this.props.onFocus(this.props.option, event);
***REMOVED***

  handleMouseMove  = (event) => ***REMOVED***
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
***REMOVED***

  render() ***REMOVED***
    const flagName = formatLanguageLocale(this.props.option.value);
    const flag = getFlag(flagName);

    return (
      <div className=***REMOVED***styles.selectOption***REMOVED*** onMouseEnter=***REMOVED***this.handleMouseEnter***REMOVED*** onMouseMove=***REMOVED***this.handleMouseMove***REMOVED*** onFocus=***REMOVED***this.props.onFocus***REMOVED*** onClick=***REMOVED***this.handleSelect***REMOVED*** id=***REMOVED***this.props.option.value***REMOVED***>
        <span className=***REMOVED***`$***REMOVED***styles.flagContainer***REMOVED*** flag-icon flag-icon-$***REMOVED***flag***REMOVED***`***REMOVED*** />
        <span className=***REMOVED***styles.optionLabel***REMOVED***>***REMOVED***this.props.option.label***REMOVED***</span>
      </div>
    );
***REMOVED***
***REMOVED***

SelectOptionLanguage.propTypes = ***REMOVED***
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object,
***REMOVED***;

export default SelectOptionLanguage;
