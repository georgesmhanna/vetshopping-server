/**
 * 
 * Content
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import IconRemove from 'assets/images/icon_remove.svg';
import styles from 'components/SelectMany/styles.scss';

function Content(***REMOVED*** index, item, onClick, onRemove ***REMOVED***) ***REMOVED***
  return (
    <React.Fragment>
      <div>
        <div className=***REMOVED***styles.dragHandle***REMOVED***><span /></div>
        <FormattedMessage id="content-manager.containers.Edit.clickToJump">
          ***REMOVED***title => (
            <span
              onClick=***REMOVED***() => onClick(item)***REMOVED***
              title=***REMOVED***title***REMOVED***
            >
              ***REMOVED***item.label***REMOVED***
            </span>
          )***REMOVED***
        </FormattedMessage>
      </div>
      <div className=***REMOVED***styles.selectManyDraggedItemActions***REMOVED***>
        <img src=***REMOVED***IconRemove***REMOVED*** alt="Remove Icon" onClick=***REMOVED***() => onRemove(index)***REMOVED*** />
      </div>
    </React.Fragment>
  );
***REMOVED***

Content.defaultProps = ***REMOVED***
  index: 0,
  onClick: () => ***REMOVED******REMOVED***,
  onRemove: () => ***REMOVED******REMOVED***,
***REMOVED***;

Content.propTypes = ***REMOVED***
  index: PropTypes.number,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
***REMOVED***;

export default Content;