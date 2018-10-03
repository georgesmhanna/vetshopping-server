/**
 * 
 * VariableDraggableAttr
 */

/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** findDOMNode ***REMOVED*** from 'react-dom';
import ***REMOVED***
  DragSource,
  DropTarget,
***REMOVED*** from 'react-dnd';
import ***REMOVED*** getEmptyImage ***REMOVED*** from 'react-dnd-html5-backend';
import ***REMOVED*** get, flow ***REMOVED*** from 'lodash';
import cn from 'classnames';
import ClickOverHint from 'components/ClickOverHint';
import DraggedRemovedIcon  from 'components/DraggedRemovedIcon';
import VariableEditIcon from 'components/VariableEditIcon';
import ItemTypes from 'utils/ItemTypes';

import GrabIconBlue from 'assets/images/icon_grab_blue.svg';
import GrabIcon from 'assets/images/icon_grab.svg';

import Carret from './Carret';
import styles from './styles.scss';

const getBootstrapClass = attrType => ***REMOVED***
  switch(attrType) ***REMOVED***
    case 'checkbox':
    case 'boolean':
    case 'toggle':
    case 'date':
    case 'bigint':
    case 'decimal':
    case 'float':
    case 'integer':
    case 'number':
      return ***REMOVED***
        bootstrap: 'col-md-4',
        wrapper: cn(styles.attrWrapper),
        withLongerHeight: false,
***REMOVED***;
    case 'json':
    case 'wysiwyg':
    case 'WYSIWYG':
      return ***REMOVED***
        bootstrap: 'col-md-12', 
        wrapper: cn(styles.attrWrapper, styles.customHeight),
        withLongerHeight: true,
***REMOVED***;
    case 'file':
    case 'text':
      return ***REMOVED***
        bootstrap: 'col-md-6',
        wrapper: cn(styles.attrWrapper, styles.customHeight),
        withLongerHeight: true,
***REMOVED***;
    default:
      return ***REMOVED***
        bootstrap: 'col-md-6',
        wrapper: cn(styles.attrWrapper),
        withLongerHeight: false,
***REMOVED***;
***REMOVED***
***REMOVED***;
const variableDraggableAttrSource = ***REMOVED***
  beginDrag: (props, monitor, component) => ***REMOVED***
    props.beginMove(props.name, props.index, props.keys);

    return ***REMOVED***
      component,
      id: props.id,
      index: props.index,
***REMOVED***;
***REMOVED***,
  endDrag: props => ***REMOVED***
    props.endMove(props.keys);
    return ***REMOVED******REMOVED***;
***REMOVED***,
***REMOVED***;
const variableDraggableAttrTarget = ***REMOVED***
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

class VariableDraggableAttr extends React.Component ***REMOVED***
  constructor(props) ***REMOVED***
    super(props);
    const ***REMOVED*** data, layout, name ***REMOVED*** = this.props;
    const appearance = get(layout, [name, 'appearance'], '');
    const type = appearance !== '' ? appearance : data.type;    
    let classNames = getBootstrapClass(type);
    let style = ***REMOVED******REMOVED***;

    if (!type) ***REMOVED***
      style = ***REMOVED*** display: 'none' ***REMOVED***;
      classNames = ***REMOVED***
        bootstrap: name.split('__')[1],
        wrapper: cn(styles.attrWrapper),
        withLongerHeight: false,
***REMOVED***;
***REMOVED***
    this.state = ***REMOVED***
      classNames,
      dragStart: false,
      isOver: false,
      style,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), ***REMOVED******REMOVED***);
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.isDragging !== this.props.isDragging) ***REMOVED***
      this.handleDragEffect();
***REMOVED***

    if (prevProps.isDragging !== this.props.isDragging && this.props.isDragging) ***REMOVED***
      this.handleClickEdit();
***REMOVED***
***REMOVED***

  handleClickEdit = () => ***REMOVED***
    this.props.onClickEdit(this.props.index);
***REMOVED***

  handleDragEffect = () => this.setState(prevState => (***REMOVED*** dragStart: !prevState.dragStart ***REMOVED***));

  handleMouseEnter= () => ***REMOVED***
    this.setState(***REMOVED*** isOver: true ***REMOVED***);
***REMOVED***

  handleMouseLeave = () => this.setState(***REMOVED*** isOver: false ***REMOVED***);

  handleRemove = (e) => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
    const ***REMOVED*** index, keys, onRemove ***REMOVED*** = this.props;
    onRemove(index, keys);
***REMOVED***

  renderContent = () => ***REMOVED***
    let ***REMOVED*** classNames, isOver, style, dragStart ***REMOVED*** = this.state;
    const ***REMOVED*** data, draggedItemName, grid, hoverIndex, index, initDragLine, isEditing, name ***REMOVED*** = this.props;
    const isFullSize = classNames.bootstrap === 'col-md-12';
    let itemLine = -1;
    let itemLineEls = [];
    // Retrieve from the grid the attr's y coordinate
    grid.forEach((line, index) => ***REMOVED***
      if (line.indexOf(name) !== -1) ***REMOVED***
        itemLine = index;
        itemLineEls = line;
***REMOVED***
***REMOVED***);
    // Retrieve from the grid the attr's x coordinate
    const itemPosition = get(grid, itemLine, []).indexOf(name);
    // Retrieve the draggedItem's y coordinate in order to display a custom dropTarget (the blue caret).
    const draggedItemLineIndex = get(grid, itemLine, []).indexOf(draggedItemName);
    // The source target can either located on the left or right of an attr
    let showLeftCarret = hoverIndex === index && initDragLine !== itemLine;
    let showRightCarret = hoverIndex === index && initDragLine === itemLine;

    if (hoverIndex === index && initDragLine === itemLine && (itemPosition === 0 || itemPosition === 1 && itemLineEls.length > 2)) ***REMOVED***
      if (itemLineEls.length < 3 || itemPosition === 0 || draggedItemLineIndex > itemPosition) ***REMOVED***
        showLeftCarret = true;
        showRightCarret = false;
***REMOVED***
***REMOVED***
    
    /**
     * Retrieve the blue Caret custom style depending on its position and attr's height
     */
    const carretStyle = (() => ***REMOVED***
      let style = ***REMOVED*** height: '30px', marginRight: '3px' ***REMOVED***;

      if (classNames.withLongerHeight) ***REMOVED***
        style = ***REMOVED*** height: '84px', marginRight: '3px' ***REMOVED***;
***REMOVED***

      if (isFullSize) ***REMOVED***
        style = ***REMOVED*** width: '100%', height: '2px', marginBottom: '6px' ***REMOVED***;
***REMOVED***

      if (showRightCarret) ***REMOVED***
        style = ***REMOVED*** height: '30px', marginLeft: '3px' ***REMOVED***;
***REMOVED***

      return style;
***REMOVED***)();

    // If the draggedItem is full size, for instance the WYSIWYG or the json field return a full size blue caret
    if (dragStart && isFullSize) ***REMOVED***
      return <Carret style=***REMOVED***carretStyle***REMOVED*** />;
***REMOVED***

    return (
      <div style=***REMOVED******REMOVED*** display: 'flex' ***REMOVED******REMOVED***>
        ***REMOVED*** showLeftCarret && <Carret style=***REMOVED***carretStyle***REMOVED*** />***REMOVED***
        <div className=***REMOVED***cn(classNames.wrapper, isEditing && styles.editingVariableAttr)***REMOVED*** style=***REMOVED***style***REMOVED***>
          <img src=***REMOVED***(isEditing ? GrabIconBlue : GrabIcon)***REMOVED*** alt="Grab Icon" />
          <span className=***REMOVED***cn(isEditing && styles.editing, styles.truncated)***REMOVED***>
            ***REMOVED***name***REMOVED***
          </span>
          <ClickOverHint show=***REMOVED***isOver && !isEditing***REMOVED*** />
          ***REMOVED***(!isOver || isEditing) && get(data, 'name', '').toLowerCase() !== get(data, 'label', '').toLowerCase() && (
            <div className=***REMOVED***cn(styles.infoLabel, isEditing && styles.infoLabelHover)***REMOVED***>
              ***REMOVED***data.label***REMOVED***
            </div>
          )***REMOVED***
          ***REMOVED***isEditing && !isOver ? (
            <VariableEditIcon withLongerHeight=***REMOVED***classNames.withLongerHeight***REMOVED*** onClick=***REMOVED***this.handleClickEdit***REMOVED*** />
          ) : (
            <DraggedRemovedIcon isDragging=***REMOVED***isEditing***REMOVED*** withLongerHeight=***REMOVED***classNames.withLongerHeight***REMOVED*** onRemove=***REMOVED***this.handleRemove***REMOVED*** />
          )***REMOVED***
        </div>
        ***REMOVED*** showRightCarret && <Carret style=***REMOVED***carretStyle***REMOVED*** />***REMOVED***
      </div>
    );
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** classNames ***REMOVED*** = this.state;
    const ***REMOVED***
      connectDragSource,
      connectDropTarget,
***REMOVED*** = this.props;

    return (
      connectDragSource(
        connectDropTarget(
          <div
            className=***REMOVED***cn(classNames.bootstrap)***REMOVED***
            onMouseEnter=***REMOVED***this.handleMouseEnter***REMOVED***
            onMouseLeave=***REMOVED***this.handleMouseLeave***REMOVED***
            onClick=***REMOVED***this.handleClickEdit***REMOVED***
          >
            ***REMOVED***this.renderContent()***REMOVED***
          </div>
        ),
      )
    );
***REMOVED***
***REMOVED***

VariableDraggableAttr.defaultProps = ***REMOVED***
  data: ***REMOVED***
    type: 'text',
***REMOVED***,
  draggedItemName: null,
  grid: [],
  hoverIndex: -1,
  index: 0,
  initDragLine: -1,
  isDragging: false,
  isEditing: false,
  keys: '',
  layout: ***REMOVED******REMOVED***,
  name: '',
  onClickEdit: () => ***REMOVED******REMOVED***,
  onRemove: () => ***REMOVED******REMOVED***,
***REMOVED***;

VariableDraggableAttr.propTypes = ***REMOVED***
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  data: PropTypes.object,
  draggedItemName: PropTypes.string,
  grid: PropTypes.array,
  hoverIndex: PropTypes.number,
  index: PropTypes.number,
  initDragLine: PropTypes.number,
  isDragging: PropTypes.bool,
  isEditing: PropTypes.bool,
  keys: PropTypes.string,
  layout: PropTypes.object,
  name: PropTypes.string,
  onClickEdit: PropTypes.func,
  onRemove: PropTypes.func,
***REMOVED***;

const withDropTarget = DropTarget(ItemTypes.VARIABLE, variableDraggableAttrTarget, (connect) => (***REMOVED***
  connectDropTarget: connect.dropTarget(),
***REMOVED***));
const withDragSource = DragSource(ItemTypes.VARIABLE, variableDraggableAttrSource, (connect, monitor) => (***REMOVED***
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
***REMOVED***));

export default flow([withDropTarget, withDragSource])(VariableDraggableAttr);