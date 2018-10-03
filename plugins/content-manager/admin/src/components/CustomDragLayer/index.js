/**
 * 
 * CustomDragLayer
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** DragLayer ***REMOVED*** from 'react-dnd';
import ***REMOVED*** flow ***REMOVED*** from 'lodash';
import DragBox from 'components/DragBox';
import SelectManyDraggedItem from 'components/SelectManyDraggedItem';
import ItemTypes from 'utils/ItemTypes';
import styles from './styles.scss';

function getItemStyles(props) ***REMOVED***
  const ***REMOVED*** initialOffset, currentOffset, mouseOffset ***REMOVED*** = props;

  if (!initialOffset || !currentOffset) ***REMOVED***
    return ***REMOVED*** display: 'none' ***REMOVED***;
***REMOVED***

  const ***REMOVED*** x, y ***REMOVED*** = mouseOffset;
  const transform = `translate($***REMOVED***x -50***REMOVED***px, $***REMOVED***y-5***REMOVED***px)`;

  return ***REMOVED***
    transform,
    WebkitTransform: transform,
***REMOVED***;
***REMOVED***

class CustomDragLayer extends React.Component ***REMOVED***
  renderItem(type, item) ***REMOVED***
    switch (type) ***REMOVED***
      case ItemTypes.VARIABLE:
      case ItemTypes.NORMAL:
        return <DragBox name=***REMOVED***item.id***REMOVED*** />;
      case ItemTypes.SORTABLEITEM:
        return <SelectManyDraggedItem item=***REMOVED***item.data***REMOVED*** withLiWrapper />;
      default:
        return null;
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** item, itemType, isDragging ***REMOVED*** = this.props;

    if (!isDragging) ***REMOVED***
      return null;
***REMOVED***

    return (
      <div className=***REMOVED***styles.layer***REMOVED***>
        <div style=***REMOVED***getItemStyles(this.props)***REMOVED*** className="col-md-2">
          ***REMOVED***this.renderItem(itemType, item)***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

const withDragLayer = DragLayer(monitor => (***REMOVED***
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
  mouseOffset: monitor.getClientOffset(),
***REMOVED***));

CustomDragLayer.defaultProps = ***REMOVED***
  isDragging: false,
  item: null,
  itemType: '',
***REMOVED***;

CustomDragLayer.propTypes = ***REMOVED***
  isDragging: PropTypes.bool,
  item: PropTypes.object,
  itemType: PropTypes.string,
***REMOVED***;

export default flow([withDragLayer])(CustomDragLayer);