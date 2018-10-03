/**
 *
 *
 * CustomSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Select from 'components/InputSelect';
import ***REMOVED*** SELECT_OPTIONS ***REMOVED*** from './constants';

import styles from './componentsStyles.scss';

class CustomSelect extends React.Component ***REMOVED***
  render() ***REMOVED***
    const ***REMOVED*** isPreviewMode, headerValue, isFullscreen, handleChangeSelect ***REMOVED*** = this.context;
    const selectClassName = isFullscreen ? styles.selectFullscreen : styles.editorSelect;

    return (
      <div className=***REMOVED***selectClassName***REMOVED***>
        <Select
          disabled=***REMOVED***isPreviewMode***REMOVED***
          name="headerSelect"
          onChange=***REMOVED***handleChangeSelect***REMOVED***
          value=***REMOVED***headerValue***REMOVED***
          selectOptions=***REMOVED***SELECT_OPTIONS***REMOVED***
        />
      </div>
    );
***REMOVED***
***REMOVED***

CustomSelect.contextTypes = ***REMOVED***
  handleChangeSelect: PropTypes.func,
  headerValue: PropTypes.string,
  isPreviewMode: PropTypes.bool,
  isFullscreen: PropTypes.bool,
***REMOVED***;

export default CustomSelect;
