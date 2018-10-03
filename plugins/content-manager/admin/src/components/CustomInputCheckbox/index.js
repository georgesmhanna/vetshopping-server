/**
 *
 * CustomInputCheckbox
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

function CustomInputCheckbox(***REMOVED*** entriesToDelete, isAll, name, onChange, value ***REMOVED***) ***REMOVED***
  return (
    <span className=***REMOVED***cn('form-check', styles.customSpan)***REMOVED***>
      <label
        className=***REMOVED***cn(
          'form-check-label',
          styles.customLabel,
          isAll ? styles.customLabelHeader : styles.customLabelRow,
          isAll && entriesToDelete.length > 0 && !value && styles.customLabelUnCheckedHeader,
          value && isAll && styles.customLabelCheckedHeader,
          value && !isAll && styles.customLabelCheckedRow,
        )***REMOVED***
        htmlFor=***REMOVED***name***REMOVED***
      >
        <input
          className="form-check-input"
          checked=***REMOVED***value***REMOVED***
          id=***REMOVED***name***REMOVED***
          name=***REMOVED***name***REMOVED***
          onChange=***REMOVED***onChange***REMOVED***
          type="checkbox"
        />
      </label>
    </span>
  );
***REMOVED***

CustomInputCheckbox.defaultProps = ***REMOVED***
  entriesToDelete: [],
  isAll: false,
  name: '',
  value: false,
***REMOVED***;

CustomInputCheckbox.propTypes = ***REMOVED***
  entriesToDelete: PropTypes.array,
  isAll: PropTypes.bool,
  name: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
***REMOVED***;

export default CustomInputCheckbox;
