/**
 *
 *
 * PreviewControl
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import styles from './componentsStyles.scss';

const PreviewControl = (***REMOVED*** onClick ***REMOVED***) => (
  <div className=***REMOVED***styles.previewControlsWrapper***REMOVED*** onClick=***REMOVED***onClick***REMOVED***>
    <div />
    <div className=***REMOVED***styles.wysiwygCollapse***REMOVED***>
      <FormattedMessage id="components.Wysiwyg.collapse" />
    </div>
  </div>
);

PreviewControl.defaultProps = ***REMOVED***
  onClick: () => ***REMOVED******REMOVED***,
***REMOVED***;

PreviewControl.propTypes = ***REMOVED***
  onClick: PropTypes.func,
***REMOVED***;

export default PreviewControl;
