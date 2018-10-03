import ***REMOVED*** List ***REMOVED*** from 'immutable';
import ***REMOVED*** flattenDeep, get, range ***REMOVED*** from 'lodash';
import Manager from 'utils/Manager';

/**
 * Update an object with new data
 * @param ***REMOVED***fromJS***REMOVED*** obj 
 * @param ***REMOVED***List***REMOVED*** array 
 * @param ***REMOVED***String***REMOVED*** keys 
 */
const stateUpdater = (obj, array, keys) => obj.updateIn(['modifiedSchema', 'models', ...keys.split('.'), 'fields'], () => array);

/**
 * Create a Manager class
 * @param ***REMOVED***fromJS***REMOVED*** obj 
 * @param ***REMOVED***List***REMOVED*** array 
 * @param ***REMOVED***String***REMOVED*** keys 
 * @param ***REMOVED***Number***REMOVED*** dropIndex 
 * @param ***REMOVED***Map || Object***REMOVED*** layout 
 */
const createManager = (obj, array, keys, dropIndex, layout) => new Manager(stateUpdater(obj, array, keys), array, keys, dropIndex, layout);

/**
 * Retrieve the elements of a line from the bootstrap grid
 * @param ***REMOVED***Class***REMOVED*** manager 
 * @param ***REMOVED***Number***REMOVED*** line 
 * @param ***REMOVED***List***REMOVED*** list 
 */
const getElementsOnALine = (manager, line, list) => ***REMOVED***
  const firstElIndex = line === 0 ? 0 : get(manager.arrayOfEndLineElements[line - 1], 'index', list.size -1) + 1;
  const lastElIndex = get(manager.arrayOfEndLineElements[line], 'index', list.size -1) + 1;
  const elements = manager.getElementsOnALine(range(firstElIndex, lastElIndex));

  return ***REMOVED*** elements, lastElIndex ***REMOVED***;
***REMOVED***;

/**
 * Retrieve the last elements of each line of a bootstrap grid
 * @param ***REMOVED***Class***REMOVED*** manager 
 * @param ***REMOVED***List***REMOVED*** list 
 */
const createArrayOfLastEls = (manager, list) => ***REMOVED***
  const ***REMOVED*** name, index, bootstrapCol ***REMOVED*** = manager.getAttrInfos(list.size - 1);
  const isFullSize = bootstrapCol === 12;

  return manager.arrayOfEndLineElements.concat(***REMOVED*** name, index, isFullSize ***REMOVED***);
***REMOVED***;

/**
 * Remove each line composed of added elements that keeps the layout organised
 * A line may look like this [__col-md-4, __col-md-4, __col-md_4]
 * @param ***REMOVED***Class***REMOVED*** manager 
 * @param ***REMOVED***List***REMOVED*** list 
 * @returns ***REMOVED***List***REMOVED***
 */
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

/**
 * Make sure each line of the bootstrap ends with the added elements (__col-md-something) so we can't have blank space at the begining of a line
 * These method also ensure we have unique added element name
 * @param ***REMOVED***Class***REMOVED*** manager 
 * @param ***REMOVED***List***REMOVED*** list 
 */
const reorderList = (manager, list) => ***REMOVED***
  const lines = getLines(manager, list);
  const reordered = lines
    .reduce((acc, curr) => ***REMOVED***
      const line = curr.reduce((acc, current, index) => ***REMOVED***
        if (current && current.includes('__col-md')) ***REMOVED***
          acc.splice(index, 1);
          acc.splice(curr.length -1, 0, current);
  ***REMOVED***

        return acc;
***REMOVED*** [...curr]);

      return acc.concat(line);
***REMOVED***, [])
    .filter(a => a !== undefined);
  
  // Make sure each added element is unique by name since the name of an element is used as key in the rdnd container
  const uniqueIdList = reordered.reduce((acc, current, index) => ***REMOVED***
    if (reordered.indexOf(current) === index) ***REMOVED***
      acc.push(current);
***REMOVED*** else ***REMOVED***
      const bootstrapCol =  parseInt(current.split('__')[1].split('-')[2], 10);
      const random = Math.random().toString(36).substring(7);
      acc.push(`__col-md-$***REMOVED***bootstrapCol***REMOVED***__$***REMOVED***random***REMOVED***`);
***REMOVED***

    return acc;
***REMOVED***, []);

  return List(flattenDeep(uniqueIdList));
***REMOVED***;

/**
 * Retrieve the elements displayed on each line of the bootstrap grid
 * @param ***REMOVED***Class***REMOVED*** manager 
 * @param ***REMOVED***List***REMOVED*** list 
 * @returns ***REMOVED***Array***REMOVED***
 */
const getLines = (manager, list) => ***REMOVED***
  const array = createArrayOfLastEls(manager, list);
  const lines = [];
  
  array.forEach((item, i) => ***REMOVED***
    const ***REMOVED*** elements ***REMOVED*** = getElementsOnALine(manager, i, list);
    lines.push(elements);
***REMOVED***);

  return lines;
***REMOVED***;

export ***REMOVED***
  createArrayOfLastEls,
  createManager,
  getElementsOnALine,
  getLines,
  removeColsLine,
  reorderList,
***REMOVED***;