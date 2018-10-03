/**
 *
 *
 * ToggleMode
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import styles from './componentsStyles.scss';

const ToggleMode = props => ***REMOVED***
  const label = props.isPreviewMode
    ? 'components.Wysiwyg.ToggleMode.markdown'
    : 'components.Wysiwyg.ToggleMode.preview';

  return (
    <div className=***REMOVED***styles.toggleModeWrapper***REMOVED***>
      <button type="button" className=***REMOVED***styles.toggleModeButton***REMOVED*** onClick=***REMOVED***props.onClick***REMOVED***>
        <FormattedMessage id=***REMOVED***label***REMOVED*** />
      </button>
    </div>
  );
***REMOVED***;

ToggleMode.defaultProps = ***REMOVED***
  isPreviewMode: false,
  onClick: () => ***REMOVED******REMOVED***,
***REMOVED***;

ToggleMode.propTypes = ***REMOVED***
  isPreviewMode: PropTypes.bool,
  onClick: PropTypes.func,
***REMOVED***;

export default ToggleMode;
