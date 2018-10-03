/**
 * 
 * InputCheckbox
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.scss';

function InputCheckbox(***REMOVED*** name, onChange, value ***REMOVED***) ***REMOVED***
  return (
    <div
      className=***REMOVED***cn(styles.inputCheckboxCTM, 'col-md-12')***REMOVED***
      onClick=***REMOVED***(e) => ***REMOVED***
        e.stopPropagation();
***REMOVED******REMOVED***
    >
      <div className="form-check">
        <label
          className=***REMOVED***cn('form-check-label', styles.inputCheckbockCTMLabel, value && styles.checked)***REMOVED***
          htmlFor=***REMOVED***name***REMOVED***
        >
          <input
            className="form-check-input"
            defaultChecked=***REMOVED***value***REMOVED***
            id=***REMOVED***name***REMOVED***
            name=***REMOVED***name***REMOVED***
            onChange=***REMOVED***onChange***REMOVED***
            type="checkbox"
          />
          ***REMOVED***name***REMOVED***
        </label>
      </div>
    </div>
  );
***REMOVED***

InputCheckbox.defaultProps = ***REMOVED***
  onChange: () => ***REMOVED******REMOVED***,
  value: false,
***REMOVED***;

InputCheckbox.propTypes = ***REMOVED***
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
***REMOVED***;

export default InputCheckbox;