/**
 *
 * WysiwygBottomControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import styles from './styles.scss';
/* eslint-disable jsx-a11y/label-has-for */
const WysiwygBottomControls = (***REMOVED*** isPreviewMode, onChange, onClick ***REMOVED***) => ***REMOVED***
  const browse = (
    <FormattedMessage id="components.WysiwygBottomControls.uploadFiles.browse">
      ***REMOVED***(message) => <span className=***REMOVED***styles.underline***REMOVED***>***REMOVED***message***REMOVED***</span>***REMOVED***
    </FormattedMessage>
  );

  return (
    <div className=***REMOVED***styles.wysiwygBottomControlsWrapper***REMOVED***>
      <div>
        <label
          className=***REMOVED***styles.dropLabel***REMOVED***
          onClick=***REMOVED***(e) => ***REMOVED***
            if (isPreviewMode) ***REMOVED***
              e.preventDefault();
      ***REMOVED***
    ***REMOVED******REMOVED***
        >
          <FormattedMessage
            id="components.WysiwygBottomControls.uploadFiles"
            values=***REMOVED******REMOVED*** browse ***REMOVED******REMOVED***
          />
          <input type="file" onChange=***REMOVED***onChange***REMOVED*** />
        </label>
      </div>
      <div className=***REMOVED***styles.fullScreenWrapper***REMOVED*** onClick=***REMOVED***onClick***REMOVED***>
        <FormattedMessage id="components.WysiwygBottomControls.fullscreen" />
      </div>
    </div>
  );
***REMOVED***;

WysiwygBottomControls.defaultProps = ***REMOVED***
  isPreviewMode: false,
  onChange: () => ***REMOVED******REMOVED***,
  onClick: () => ***REMOVED******REMOVED***,
***REMOVED***;

WysiwygBottomControls.propTypes = ***REMOVED***
  isPreviewMode: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
***REMOVED***;

export default WysiwygBottomControls;
