/**
 *
 * SortableItem
 *
 */

/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ***REMOVED*** findDOMNode ***REMOVED*** from 'react-dom';
import ***REMOVED*** DragSource, DropTarget ***REMOVED*** from 'react-dnd';
import ***REMOVED*** getEmptyImage ***REMOVED*** from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import ***REMOVED*** flow, get ***REMOVED*** from 'lodash';
import cn from 'classnames';
import SelectManyDraggedItem from 'components/SelectManyDraggedItem';
import ItemTypes from 'utils/ItemTypes';
import styles from './styles.scss';

const sortableItemSource = ***REMOVED***
  beginDrag: props => ***REMOVED***
    return ***REMOVED***
      id: get(props, ['item', 'value', 'id' ]) || get(props, ['item', 'value', '_id'], ''),
      index: props.index,
      data: props.item,
***REMOVED***;
***REMOVED***,
  endDrag: props => ***REMOVED***
    props.moveAttrEnd();
    return ***REMOVED******REMOVED***;
***REMOVED***,
***REMOVED***;

const sortableItemTarget = ***REMOVED***
  hover: (props, monitor, component) => ***REMOVED***
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) ***REMOVED***
      return;
***REMOVED***

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ***REMOVED***
      return;
***REMOVED***

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) ***REMOVED***
      return;
***REMOVED***

    // Time to actually perform the action

    props.moveAttr(dragIndex, hoverIndex, props.keys);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
    
***REMOVED***,
***REMOVED***;

class SortableItem extends React.Component ***REMOVED***
  componentDidMount() ***REMOVED***
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), ***REMOVED***
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      // Removginv the fallabck makes it handle variable height elements
      // captureDraggingState: true,
***REMOVED***);
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED***
      connectDragSource,
      connectDropTarget,
      index,
      item,
      isDragging,
      isDraggingSibling,
      onClick,
      onRemove,
***REMOVED*** = this.props;
    const opacity = isDragging ? 0.2 : 1;

    return (
      connectDragSource(
        connectDropTarget(
          <li
            className=***REMOVED***cn(styles.sortableListItem, !isDraggingSibling && styles.sortableListItemHover)***REMOVED***
            style=***REMOVED******REMOVED*** opacity ***REMOVED******REMOVED***
          >
            <SelectManyDraggedItem index=***REMOVED***index***REMOVED*** item=***REMOVED***item***REMOVED*** onClick=***REMOVED***onClick***REMOVED*** onRemove=***REMOVED***onRemove***REMOVED*** />
          </li>
        ),
      )
    );
***REMOVED***
***REMOVED***

const withDropTarget = DropTarget(ItemTypes.SORTABLEITEM, sortableItemTarget, connect => (***REMOVED***
  connectDropTarget: connect.dropTarget(),
***REMOVED***));

const withDragSource = DragSource(ItemTypes.SORTABLEITEM, sortableItemSource, (connect, monitor) => (***REMOVED***
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
***REMOVED***));

SortableItem.defaultProps = ***REMOVED***
  isDraggingSibling: false,
***REMOVED***;

SortableItem.propTypes = ***REMOVED***
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isDraggingSibling: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
***REMOVED***;

export default flow([withDropTarget, withDragSource])(SortableItem);