/**
 * 
 * ClickOverHint
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function ClickOverHint(***REMOVED*** show ***REMOVED***) ***REMOVED***
  if (show) ***REMOVED***
    return (
      <div className=***REMOVED***styles.clickOverHint***REMOVED***>
        <FormattedMessage id="content-manager.components.DraggableAttr.edit" />
      </div>
    );
***REMOVED***

  return null;
***REMOVED***

ClickOverHint.propTypes = ***REMOVED***
  show: PropTypes.bool.isRequired,
***REMOVED***;

export default ClickOverHint;