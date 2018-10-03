/**
*
* InputEnum
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class InputEnum extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const customBootstrapClass = this.props.customBootstrapClass ? this.props.customBootstrapClass : 'col-md-6';

    return (
      <div className=***REMOVED***`$***REMOVED***styles.inputEnum***REMOVED*** $***REMOVED***customBootstrapClass***REMOVED***`***REMOVED***>
        <div className=***REMOVED***styles.enumLabel***REMOVED***>
          <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.name***REMOVED***`***REMOVED*** />
        </div>
        <div className="btn-group" data-toggle="buttons">
          ***REMOVED***map(this.props.selectOptions, (option, key) => ***REMOVED***
            const isChecked = this.props.value === option.value;
            const active = isChecked ? styles.active : "";
            return (
              <label className=***REMOVED***`btn $***REMOVED***styles.button***REMOVED*** $***REMOVED***active***REMOVED***`***REMOVED*** key=***REMOVED***key***REMOVED*** htmlFor=***REMOVED***option.name***REMOVED***>
                <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***option.name***REMOVED***`***REMOVED*** />
                <input
                  type="radio"
                  name=***REMOVED***this.props.target***REMOVED***
                  id=***REMOVED***option.name***REMOVED***
                  checked=***REMOVED***isChecked***REMOVED***
                  autoComplete="off"
                  value=***REMOVED***option.value***REMOVED***
                  onChange=***REMOVED***this.props.handleChange***REMOVED***
                />
              </label>
            );
    ***REMOVED***)***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

InputEnum.propTypes = ***REMOVED***
  customBootstrapClass: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  selectOptions: PropTypes.array,
  target: PropTypes.string,
  value: PropTypes.any,
***REMOVED***;

export default InputEnum;
