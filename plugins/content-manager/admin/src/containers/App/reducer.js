/*
 *
 * App reducer
 *
 */

import ***REMOVED*** fromJS, List ***REMOVED*** from 'immutable';
import ***REMOVED*** difference, findIndex, get, range, upperFirst ***REMOVED*** from 'lodash';
import Manager from 'utils/Manager';
import ***REMOVED***
  BEGIN_MOVE,
  EMPTY_STORE,
  END_MOVE,
  GET_MODEL_ENTRIES_SUCCEEDED,
  LOAD_MODELS,
  LOADED_MODELS,
  MOVE_ATTR,
  MOVE_ATTR_EDIT_VIEW,
  MOVE_VARIABLE_ATTR_EDIT_VIEW,
  ON_CHANGE,
  ON_CHANGE_SETTINGS,
  ON_CLICK_ADD_ATTR,
  ON_CLICK_ADD_ATTR_FIELD,
  ON_REMOVE,
  ON_REMOVE_EDIT_VIEW_RELATION_ATTR,
  ON_REMOVE_EDIT_VIEW_FIELD_ATTR,
  ON_RESET,
  SET_LAYOUT,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';
import ***REMOVED***
  createManager,
  getElementsOnALine,
  getLines,
  removeColsLine,
  reorderList,
***REMOVED*** from './helpers';

const initialState = fromJS(***REMOVED***
  addedElementName: null,
  addedField: false,
  draggedItemName: null,
  formValidations: List([]),
  initDragLine: -1,
  loading: true,
  modelEntries: 0,
  modifiedSchema: fromJS(***REMOVED******REMOVED***),
  hasMoved: false,
  hoverIndex: -1,
  schema: fromJS(***REMOVED******REMOVED***),
  shouldUpdateListOnDrop: true,
  submitSuccess: false,
  grid: List([]),
  shouldResetGrid: false,
***REMOVED***);


function appReducer(state = initialState, action) ***REMOVED***
  switch (action.type) ***REMOVED***
    case BEGIN_MOVE:
      return state
        .update('draggedItemName', () => action.name);
    case EMPTY_STORE:
      return state;
    case END_MOVE:
      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.'), 'fields'], list => ***REMOVED***
          const shouldUpdateListOnDrop = state.get('shouldUpdateListOnDrop');
          const dropIndex = state.get('hoverIndex');
          const toAdd = state.get('draggedItemName');
          const initDragLine = state.get('initDragLine');
          const canDrop = list.indexOf(toAdd) === -1;
          const path = action.keys.split('.');
          const modelName = path.length > 2 ? path[2] : path[0];
          const layout = state.getIn(['modifiedSchema', 'layout', modelName, 'attributes']);
          let newList = list;
          // We don't need to update the list onDrop for the full size elements since it's already handled by the MOVE_VARIABLE_ATTR
          if (shouldUpdateListOnDrop && canDrop) ***REMOVED***
            newList = list
              .insert(dropIndex, toAdd);
        
            const addedElementName = state.get('addedElementName');
            const manager = createManager(state, newList, action.keys, dropIndex, layout);
            const arrayOfLastLineElements = manager.arrayOfEndLineElements;
            const nodeBound = manager.getBound(true);
            const dropLine = findIndex(arrayOfLastLineElements, ['index', nodeBound.index]);
            const addedElementIndex = newList.indexOf(addedElementName);

            // We need to remove the added element if dropping on the same line that the element was initially
            if (dropLine === initDragLine) ***REMOVED***
              const toDropIndex = dropIndex > addedElementIndex ? dropIndex + 1 : dropIndex;

              newList = newList
                .delete(dropIndex)
                .insert(toDropIndex, toAdd)
                .delete(addedElementIndex);
      ***REMOVED***

            const newManager = createManager(state, newList, action.keys, dropIndex, layout);
            const ***REMOVED*** elements: previousStateLineEls ***REMOVED*** = getElementsOnALine(createManager(state, list, action.keys, dropIndex, layout), dropLine, list);
            const ***REMOVED*** elements: currentStateLineEls ***REMOVED*** = getElementsOnALine(newManager, dropLine, newList);

            if (dropLine !== initDragLine) ***REMOVED***
              const diff = difference(previousStateLineEls, currentStateLineEls);
              const diffLineSize = newManager.getLineSize(diff);
              const lineToCreate = [...diff, ...manager.getColsToAdd(12 - diffLineSize)];
              let indexToInsert = dropIndex + 1;
  
              lineToCreate.forEach(item => ***REMOVED***
                const canAdd = newList.indexOf(item) === -1;
  
                if (canAdd) ***REMOVED***
                  newList = newList.insert(indexToInsert, item);
          ***REMOVED***
                indexToInsert += 1;
        ***REMOVED***);
      ***REMOVED***
            const nextManager = createManager(state, newList, action.keys, dropIndex, layout);
            newList = removeColsLine(nextManager, newList);
            const lastManager = createManager(state, newList, action.keys, dropIndex, layout);
            // Make sure all the lines are full
            // This step is needed when we create a line before a full size element like
            // The JSON input or the WYSIWYG
            newList = createManager(state, reorderList(lastManager, newList), action.keys, dropIndex, layout).getLayout();
    ***REMOVED***

          return newList;
  ***REMOVED***)
        .update('draggedItemName', () => null)
        .update('hasMoved', () => false)
        .update('hoverIndex', () =>  -1)
        .update('shouldUpdateListOnDrop', () => true)
        .update('shouldResetGrid', v => !v);
    case GET_MODEL_ENTRIES_SUCCEEDED:
      return state.set('modelEntries', action.count);
    case LOAD_MODELS:
      return state;
    case LOADED_MODELS:
      return state
        .update('schema', () => fromJS(action.models.models))
        .update('modifiedSchema', () => fromJS(action.models.models))
        .set('loading', false);
    case MOVE_ATTR:
      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.'), 'listDisplay'], list => (
          list
            .delete(action.dragIndex)
            .insert(action.hoverIndex, list.get(action.dragIndex))
        ));
    case MOVE_ATTR_EDIT_VIEW:
      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.')], list => (
          list
            .delete(action.dragIndex)
            .insert(action.hoverIndex, list.get(action.dragIndex))
        ));
    case MOVE_VARIABLE_ATTR_EDIT_VIEW: ***REMOVED***
      let updateHoverIndex = true;
      let shouldUpdateListOnDrop = state.get('shouldUpdateListOnDrop');
      let addedElementName = null;
      let initDragLine = state.get('initDragLine');

      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.'), 'fields'], list => ***REMOVED***
          const draggedItemName = state.get('draggedItemName');
          const draggedItemIndex = list.indexOf(draggedItemName);
          const path = action.keys.split('.');
          const modelName = path.length > 2 ? path[2] : path[0];
          const layout = state.getIn(['modifiedSchema', 'layout', modelName, 'attributes']);
          const manager = new Manager(state, list, action.keys, draggedItemIndex, layout);
          const arrayOfLastLineElements = manager.arrayOfEndLineElements;
          const itemInfos = manager.getAttrInfos(draggedItemIndex);
          const isFullSize = itemInfos.bootstrapCol === 12;
          const dropLineBounds = ***REMOVED*** left: manager.getBound(false, action.hoverIndex), right: manager.getBound(true, action.hoverIndex) ***REMOVED***;
          const hasMoved = state.get('hasMoved'); // Used only for non full-width elements
          
          if (isFullSize && draggedItemIndex !== -1) ***REMOVED***
            const upwards = action.dragIndex > action.hoverIndex;
            const indexToDrop = upwards ? get(dropLineBounds, 'left.index', 0) : get(dropLineBounds, 'right.index', list.size -1);
            updateHoverIndex = false;
            shouldUpdateListOnDrop = false;

            return list
              .delete(draggedItemIndex)
              .insert(indexToDrop, draggedItemName);
    ***REMOVED***

          // We allow the reorder for full width elements since they don't modify the current layout of the view.
          // Allowing it for the other types will be impossible to reorder the view and keep the current layout.
          if (!hasMoved && !isFullSize && draggedItemIndex !== -1) ***REMOVED***
            const nodeBound = manager.getBound(true);
            const currentLine = findIndex(arrayOfLastLineElements, ['index', nodeBound.index]);
            initDragLine = currentLine;
            const random = Math.floor(Math.random() * 1000);
            const toAdd = `__col-md-$***REMOVED***itemInfos.bootstrapCol***REMOVED***__$***REMOVED***random***REMOVED***`;
            addedElementName = toAdd;

            return list
              .delete(action.dragIndex)
              .insert(action.dragIndex, toAdd);
    ***REMOVED***

          return list;
  ***REMOVED***)
        .update('hoverIndex', () => ***REMOVED***
          if (updateHoverIndex) ***REMOVED***
            return action.hoverIndex;
    ***REMOVED***

          return -1;
  ***REMOVED***)
        .update('addedElementName', name => ***REMOVED***
          if (addedElementName) ***REMOVED***
            return addedElementName;
    ***REMOVED***
          
          return name;
  ***REMOVED***)
        .update('hasMoved', () => true)
        .update('initDragLine', () => initDragLine)
        .update('shouldUpdateListOnDrop', () => shouldUpdateListOnDrop);
***REMOVED***
    case ON_CHANGE:
      return state
        .updateIn(['modifiedSchema'].concat(action.keys), () => action.value)
        .updateIn(['modifiedSchema', 'models'], models => ***REMOVED***
          return models
            .keySeq()
            .reduce((acc, current) => ***REMOVED***

              if (current !== 'plugins') ***REMOVED***
                return acc.setIn([current, action.keys[1]], action.value);
        ***REMOVED***
              
              return acc
                .get(current)
                .keySeq()
                .reduce((acc1, curr) => ***REMOVED***
                  return acc1
                    .getIn([current, curr])
                    .keySeq()
                    .reduce((acc2, curr1) => ***REMOVED***
                  
                      return acc2.setIn([ current, curr, curr1, action.keys[1]], action.value);
              ***REMOVED*** acc1);
          ***REMOVED*** acc);
      ***REMOVED*** models);
  ***REMOVED***);
    case ON_CHANGE_SETTINGS:
      return state
        .updateIn(['modifiedSchema', 'models'].concat(action.keys), () => action.value);
    case ON_CLICK_ADD_ATTR:
      return state.updateIn(['modifiedSchema', 'models', ...action.keys.split('.')], list => list.push(fromJS(action.data)));
    case ON_CLICK_ADD_ATTR_FIELD:
      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.')], list => ***REMOVED***
          return list.push(action.data);
  ***REMOVED***)
        .update('addedField', v => !v);
    case ON_REMOVE:
      return state.updateIn(['modifiedSchema', 'models', ...action.keys.split('.'), 'listDisplay'], list => ***REMOVED***

        // If the list is empty add the default Id attribute
        if (list.size -1 === 0) ***REMOVED***
          const attrToAdd = state.getIn(['schema', 'models', ...action.keys.split('.'), 'listDisplay'])
            .filter(attr => ***REMOVED***
              return attr.get('name') === '_id' || attr.get('name') === 'id';
      ***REMOVED***);
          
          attrToAdd.setIn(['0', 'sortable'], () => true);
          
          return list
            .delete(action.index)
            .push(attrToAdd.get('0'));
  ***REMOVED***

        return list.delete(action.index);
***REMOVED***);
    case ON_REMOVE_EDIT_VIEW_FIELD_ATTR:
      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.'), 'fields'], list => ***REMOVED***
          // Don't do any check if removing the last item of the array
          if (action.index === list.size - 1) ***REMOVED***
            return list.delete(action.index);
    ***REMOVED***
          const path = action.keys.split('.');
          const modelName = path.length > 2 ? path[2] : path[0];
          const layout = state.getIn(['modifiedSchema', 'layout', modelName, 'attributes']);
          const manager = new Manager(state, list, action.keys, action.index, layout);
          const attrToRemoveInfos = manager.attrToRemoveInfos; // Retrieve the removed item infos
          const arrayOfLastLineElements = manager.arrayOfEndLineElements;
          const isRemovingAFullWidthNode = attrToRemoveInfos.bootstrapCol === 12;
          let newList;
          
          if (isRemovingAFullWidthNode) ***REMOVED*** // If removing we need to add the corresponding missing col in the prev line
            const currentNodeLine = findIndex(arrayOfLastLineElements, ['index', attrToRemoveInfos.index]); // Used only to know if removing a full size element on the first line

            if (currentNodeLine === 0) ***REMOVED***
              newList = list
                .delete(action.index);
      ***REMOVED*** else ***REMOVED***
              const previousNodeLine = currentNodeLine - 1;
              const firstElementOnLine = previousNodeLine === 0 ? 0 : arrayOfLastLineElements[previousNodeLine - 1].index + 1;
              const lastElementOnLine = arrayOfLastLineElements[previousNodeLine].index + 1;
              const previousLineRangeIndexes = firstElementOnLine === lastElementOnLine ? [firstElementOnLine] : range(firstElementOnLine, lastElementOnLine);
              const elementsOnLine = manager.getElementsOnALine(previousLineRangeIndexes);
              const previousLineColNumber = manager.getLineSize(elementsOnLine);

              if (previousLineColNumber >= 10) ***REMOVED***
                newList = list
                  .delete(action.index);
        ***REMOVED*** else ***REMOVED***
                const colNumberToAdd = 12 - previousLineColNumber;
                const colsToAdd = manager.getColsToAdd(colNumberToAdd);
                newList = list
                  .delete(attrToRemoveInfos.index)
                  .insert(attrToRemoveInfos.index, colsToAdd[0]);
              
                if (colsToAdd.length > 1) ***REMOVED***
                  newList = newList
                    .insert(attrToRemoveInfos.index, colsToAdd[1]);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            const nodeBounds = ***REMOVED*** left: manager.getBound(false), right: manager.getBound(true) ***REMOVED***; // Retrieve the removed element's bounds
            const leftBoundIndex = get(nodeBounds, ['left', 'index'], 0) + 1;
            const rightBoundIndex = get(nodeBounds, ['right', 'index'], list.size -1);
            const elementsOnLine = manager.getElementsOnALine(range(leftBoundIndex - 1, rightBoundIndex + 1));
            const currentLineColSize = manager.getLineSize(elementsOnLine);
            const isRemovingLine = currentLineColSize - attrToRemoveInfos.bootstrapCol === 0;

            if (isRemovingLine) ***REMOVED***
              newList = list
                .delete(attrToRemoveInfos.index);
      ***REMOVED*** else ***REMOVED***
              const random = Math.floor(Math.random() * 1000); 
              newList = list
                .delete(attrToRemoveInfos.index)
                .insert(rightBoundIndex, `__col-md-$***REMOVED***attrToRemoveInfos.bootstrapCol***REMOVED***__$***REMOVED***random***REMOVED***`);
      ***REMOVED***
    ***REMOVED***
          // This part is needed to remove the add __col-md-$***REMOVED***something***REMOVED***__ that keeps the layout when removing an item
          // It may happen that a line is composed by these divs therefore we need to remove them
          const newManager = createManager(state, newList, action.keys, action.index, layout);

          return removeColsLine(newManager, newList);
  ***REMOVED***)
        .update('shouldResetGrid', v => !v);
    case ON_REMOVE_EDIT_VIEW_RELATION_ATTR:
      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.')], relation => ***REMOVED***
          return relation
            .update('description', () => '')
            .update('label', () => upperFirst(relation.get('alias')));
  ***REMOVED***)
        .updateIn(['modifiedSchema', 'models'].concat(action.keys.split('.')), list => ***REMOVED***
          return list.delete(action.index);
  ***REMOVED***);
    case ON_RESET:
      return state.update('modifiedSchema', () => state.get('schema'));
    case SUBMIT_SUCCEEDED:
      return state
        .update('submitSuccess', v => v = !v)
        .update('schema', () => state.get('modifiedSchema'));
    case SET_LAYOUT: ***REMOVED***
      let updatedList = List([]);
      const path = action.keys.split('.');
      const modelName = path.length > 2 ? path[2] : path[0];
      const layout = state.getIn(['modifiedSchema', 'layout', modelName, 'attributes']);

      return state
        .updateIn(['modifiedSchema', 'models', ...action.keys.split('.'), 'fields'], list => ***REMOVED***
          const manager = new Manager(state, list, action.keys, 0, layout);
          const newList = manager.getLayout();
          updatedList = reorderList(manager, newList);

          return newList;
  ***REMOVED***)
        .update('grid', () => ***REMOVED***
          const fields = updatedList;
          const lines = getLines(new Manager(state, fields, action.keys, 0, layout), fields);

          return List(lines);
  ***REMOVED***);
***REMOVED***
    default:
      return state;
***REMOVED***
***REMOVED***

export default appReducer;