/**
 *
 * SortableList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// import ***REMOVED*** SortableContainer ***REMOVED*** from 'react-sortable-hoc';
import SortableItem from './SortableItem';
// CSS.
import styles from './styles.scss';

const SortableList = (***REMOVED*** items, isDraggingSibling, keys, moveAttr, moveAttrEnd, onClick, onRemove ***REMOVED***) => ***REMOVED***
  return (
    <div className=***REMOVED***cn(styles.sortableList)***REMOVED***>
      <ul>
        ***REMOVED***items.map((item, index) => (
          <SortableItem
            isDraggingSibling=***REMOVED***isDraggingSibling***REMOVED***
            key=***REMOVED***item.value.id || item.value._id || `item-$***REMOVED***index***REMOVED***`***REMOVED***
            keys=***REMOVED***keys***REMOVED***
            index=***REMOVED***index***REMOVED***
            item=***REMOVED***item***REMOVED***
            moveAttr=***REMOVED***moveAttr***REMOVED***
            moveAttrEnd=***REMOVED***moveAttrEnd***REMOVED***
            onRemove=***REMOVED***onRemove***REMOVED***
            onClick=***REMOVED***onClick***REMOVED***
          />
        ))***REMOVED***
      </ul>
      ***REMOVED***items.length > 4 && <div className=***REMOVED***styles.sortableListLong***REMOVED*** />***REMOVED***
    </div>
  );
***REMOVED***;

SortableList.propTypes = ***REMOVED***
  isDraggingSibling: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  keys: PropTypes.string.isRequired,
  moveAttr: PropTypes.func.isRequired,
  moveAttrEnd: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
***REMOVED***;

export default SortableList;