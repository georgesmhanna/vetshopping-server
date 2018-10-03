/**
 * 
 * SelectManyDraggedItem
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/SelectMany/styles.scss';
import Content from './Content';


function SelectManyDraggedItem(props) ***REMOVED***
  if (props.withLiWrapper) ***REMOVED***
    return (
      <li className=***REMOVED***styles.sortableListItem***REMOVED*** style=***REMOVED******REMOVED*** padding: '0 2px' ***REMOVED******REMOVED***>
        <Content ***REMOVED***...props***REMOVED*** />
      </li>
    );
***REMOVED***

  return <Content ***REMOVED***...props***REMOVED*** />;
***REMOVED***

SelectManyDraggedItem.defaultProps = ***REMOVED***
  index: 0,
  onClick: () => ***REMOVED******REMOVED***,
  onRemove: () => ***REMOVED******REMOVED***,
  withLiWrapper: false,
***REMOVED***;

SelectManyDraggedItem.propTypes = ***REMOVED***
  index: PropTypes.number,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  withLiWrapper: PropTypes.bool,
***REMOVED***;

export default SelectManyDraggedItem;