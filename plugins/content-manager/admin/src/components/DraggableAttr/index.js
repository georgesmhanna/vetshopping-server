/**
 * 
 * DraggableAttr
 */

/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ***REMOVED*** findDOMNode ***REMOVED*** from 'react-dom';
import ***REMOVED***
  DragSource,
  DropTarget,
***REMOVED*** from 'react-dnd';
import ***REMOVED*** getEmptyImage ***REMOVED*** from 'react-dnd-html5-backend';
import ***REMOVED*** flow ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ClickOverHint from 'components/ClickOverHint';
import DraggedRemovedIcon from 'components/DraggedRemovedIcon';
import VariableEditIcon from 'components/VariableEditIcon';
import ItemTypes from 'utils/ItemTypes';

import GrabIconBlue from 'assets/images/icon_grab_blue.svg';
import GrabIcon from 'assets/images/icon_grab.svg';

import styles from './styles.scss';

const draggableAttrSource = ***REMOVED***
  beginDrag: (props) => ***REMOVED***
    props.updateSiblingHoverState();

    return ***REMOVED***
      id: props.name, // This returns undefined
      index: props.index,
***REMOVED***;
***REMOVED***,
  endDrag: (props) => ***REMOVED***
    props.updateSiblingHoverState();

    return ***REMOVED******REMOVED***;
***REMOVED***,
***REMOVED***;

const draggableAttrTarget = ***REMOVED***
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

class DraggableAttr extends React.Component ***REMOVED***
  state = ***REMOVED*** isOver: false, dragStart: false ***REMOVED***;
  
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

  componentDidUpdate(prevProps) ***REMOVED***
    const ***REMOVED*** isDraggingSibling ***REMOVED*** = this.props;

    if (isDraggingSibling !== prevProps.isDraggingSibling && isDraggingSibling) ***REMOVED***
      this.handleMouseLeave();
***REMOVED***

    if (prevProps.isDragging !== this.props.isDragging && this.props.isDragging) ***REMOVED***
      this.props.onClickEdit(this.props.index);
***REMOVED***
***REMOVED***

  handleClickEdit = (e) => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
    this.props.onClickEdit(this.props.index);
***REMOVED***

  handleDragEnd = () => this.setState(***REMOVED*** dragStart: false ***REMOVED***);

  handleDragStart = () => this.setState(***REMOVED*** dragStart: true ***REMOVED***);

  handleMouseEnter = () => ***REMOVED***
    if (!this.props.isDraggingSibling) ***REMOVED***
      this.setState(***REMOVED*** isOver: true ***REMOVED***);
***REMOVED***
***REMOVED***;

  handleMouseLeave = () => this.setState(***REMOVED*** isOver: false ***REMOVED***);

  handleRemove = (e) => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
    this.props.onRemove(this.props.index, this.props.keys);
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** label, name, isDragging, isEditing, connectDragSource, connectDropTarget ***REMOVED*** = this.props;
    const ***REMOVED*** isOver, dragStart ***REMOVED*** = this.state;
    const opacity = isDragging ? 0.2 : 1;
    const overClass = isOver ? styles.draggableAttrOvered : '';
    const className = dragStart ? styles.dragged : styles.draggableAttr;

    return (
      connectDragSource(
        connectDropTarget(
          <div
            className=***REMOVED***cn(className, isEditing && styles.editingAttr, overClass)***REMOVED***
            onDragStart=***REMOVED***this.handleDragStart***REMOVED***
            onDragEnd=***REMOVED***this.handleDragEnd***REMOVED***
            onMouseEnter=***REMOVED***this.handleMouseEnter***REMOVED***
            onMouseLeave=***REMOVED***this.handleMouseLeave***REMOVED***
            onClick=***REMOVED***this.handleClickEdit***REMOVED***
            style=***REMOVED******REMOVED*** opacity ***REMOVED******REMOVED***
          >
            <img src=***REMOVED***(isEditing ? GrabIconBlue : GrabIcon)***REMOVED*** alt="Grab Icon" />
            <span>***REMOVED***name***REMOVED***</span>
            <ClickOverHint show=***REMOVED***isOver && !isDragging && !isEditing***REMOVED*** />
            ***REMOVED*** (!isOver || isEditing) && name.toLowerCase() !== label.toLowerCase() && (
              <div className=***REMOVED***cn(styles.infoLabel, isEditing && styles.infoLabelHover)***REMOVED***>
                ***REMOVED***label.toLowerCase() === 'id' ? 'ID' : label***REMOVED***
              </div>
            )***REMOVED***
            ***REMOVED***isEditing && !isOver ? (
              <VariableEditIcon onClick=***REMOVED***this.handleClickEdit***REMOVED*** />            
            ) : (
              
              <DraggedRemovedIcon isDragging=***REMOVED***dragStart || isEditing***REMOVED*** onRemove=***REMOVED***this.handleRemove***REMOVED*** />
            )***REMOVED***
          </div>
        ),
      )
    );
***REMOVED***
***REMOVED***

DraggableAttr.defaultProps = ***REMOVED***
  isEditing: false,
  onRemove: () => ***REMOVED******REMOVED***,
***REMOVED***;

DraggableAttr.propTypes = ***REMOVED***
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isDraggingSibling: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool,
  keys: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
***REMOVED***;

const withDropTarget = DropTarget(ItemTypes.NORMAL, draggableAttrTarget, connect => (***REMOVED***
  connectDropTarget: connect.dropTarget(),
***REMOVED***));

const withDragSource = DragSource(ItemTypes.NORMAL, draggableAttrSource, (connect, monitor) => (***REMOVED***
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
***REMOVED***));

export default flow([withDropTarget, withDragSource])(DraggableAttr);