const ***REMOVED*** List ***REMOVED*** = require('immutable');
const ***REMOVED*** flattenDeep, get, range ***REMOVED*** = require('lodash');
const Manager = require('./Manager');

const stateUpdater = (obj, array, keys) => obj.updateIn(['modifiedSchema', 'models', ...keys.split('.'), 'fields'], () => array);
const createManager = (obj, array, keys, dropIndex, layout) => new Manager(stateUpdater(obj, array, keys), array, keys, dropIndex, layout);
const getElementsOnALine = (manager, line, list) => ***REMOVED***
  const firstElIndex = line === 0 ? 0 : manager.arrayOfEndLineElements[line - 1].index + 1;
  const lastElIndex = get(manager.arrayOfEndLineElements[line], 'index', list.size -1) + 1;
  const elements = manager.getElementsOnALine(range(firstElIndex, lastElIndex));

  return ***REMOVED*** elements, lastElIndex ***REMOVED***;
***REMOVED***;
const createArrayOfLastEls = (manager, list) => ***REMOVED***
  const ***REMOVED*** name, index, bootstrapCol ***REMOVED*** = manager.getAttrInfos(list.size - 1);
  const isFullSize = bootstrapCol === 12;

  return manager.arrayOfEndLineElements.concat(***REMOVED*** name, index, isFullSize ***REMOVED***);
***REMOVED***;
const removeColsLine = (manager, list) => ***REMOVED***
  let addedElsToRemove = [];
  const arrayOfEndLineElements = createArrayOfLastEls(manager, list);

  arrayOfEndLineElements.forEach((item, i) => ***REMOVED***
    if (i < arrayOfEndLineElements.length) ***REMOVED***
      const firstElementOnLine = i === 0 ? 0 : arrayOfEndLineElements[i - 1].index + 1;
      const lastElementOnLine = arrayOfEndLineElements[i].index;
      const rangeIndex = range(firstElementOnLine, lastElementOnLine + 1);
      const elementsOnLine = manager.getElementsOnALine(rangeIndex)
        .filter(name => !name.includes('__col'));

      if (elementsOnLine.length === 0) ***REMOVED***
        addedElsToRemove = addedElsToRemove.concat(rangeIndex);
***REMOVED***
***REMOVED***
***REMOVED***);

  return list.filter((item, index) => ***REMOVED***
    const indexToKeep = addedElsToRemove.indexOf(index) === -1;

    return indexToKeep;
***REMOVED***);
***REMOVED***;
const reorderList = (manager, list) => ***REMOVED***
  const array = createArrayOfLastEls(manager, list);
  const lines = [];
  
  array.forEach((item, i) => ***REMOVED***
    const ***REMOVED*** elements ***REMOVED*** = getElementsOnALine(manager, i, list);
    lines.push(elements);
***REMOVED***);

  const reordered = lines
    .reduce((acc, curr) => ***REMOVED***
      const line = curr.sort((a) => a.includes('__col-md'));

      return acc.concat(line);
***REMOVED***, [])
    .filter(a => a !== undefined);
  
  return List(flattenDeep(reordered));
***REMOVED***;

module.exports = ***REMOVED***
  createArrayOfLastEls,
  createManager,
  getElementsOnALine,
  removeColsLine,
  reorderList,
***REMOVED***;