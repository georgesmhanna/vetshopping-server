// This file contains all the methods required to get the number of inputs
// that will be displayed in the content manager edit view.
// Since we want to keep the shape of the layout when we remove a field from
// the content type builder form builder we duplicated this file already used in the content manager. 
const ***REMOVED*** findIndex, pullAt, range ***REMOVED*** = require('lodash');
const ***REMOVED*** List ***REMOVED*** = require('immutable');

class Manager ***REMOVED***
  constructor(state, list, keys, index, layout) ***REMOVED***
    this.state = state;
    this.keys = keys.split('.');
    this.layout = layout;
    this.list = list;
    this.index = index;
    this.arrayOfEndLineElements = this.getLinesBound();
    this.attrToRemoveInfos = this.attrToRemoveInfos();
***REMOVED***

  /**
   * Retrieve the bootstrap col index, name and type of a field
   * @param ***REMOVED***Number***REMOVED*** index 
   * @returns ***REMOVED***Object***REMOVED***
   */
  getAttrInfos(index) ***REMOVED***
    const name = this.getAttrName(index);
    const appearance = this.layout.getIn([name, 'appearance']);
    const type = appearance !== '' && appearance !== undefined ? appearance : this.getType(name);
    const bootstrapCol = this.getBootStrapCol(type);

    const infos = ***REMOVED***
      bootstrapCol,
      index,
      name,
      type,
***REMOVED***;

    return infos;
***REMOVED***

  /**
   * Returns the number of divs to add to a row so each row is complete.
   * @param ***REMOVED***Number***REMOVED*** number
   * @returns ***REMOVED***Array***REMOVED*** Array of bootstrap cols to add to make a row of size 12.
   */
  getColsToAdd(number) ***REMOVED***
    let ret;

    switch(number) ***REMOVED***
      case 12:
        ret = [];
        break;
      case 9:
        ret = ['__col-md-3__', '__col-md-6__'];
        break;
      case 8:
        ret = ['__col-md-4__', '__col-md-4__'];
        break;
      case 4:
        ret = ['__col-md-4__'];
        break;
      case 6:
        ret = ['__col-md-6__'];
        break;
      default:
        ret = ['__col-md-3__'];
***REMOVED***
    const random = Math.floor(Math.random() * 1000);
    const random1 = Math.floor(Math.random() * 1000);

    return ret.map((v, i) => ***REMOVED***

      if (i === 0) ***REMOVED***
        return `$***REMOVED***v***REMOVED***$***REMOVED***random***REMOVED***`;
***REMOVED***

      return `$***REMOVED***v***REMOVED***$***REMOVED***random1***REMOVED***`;
***REMOVED***);
***REMOVED***

  /**
   * Retrieve a field default bootstrap col
   * NOTE: will change if we add the customisation of an input's width
   * @param ***REMOVED***String***REMOVED*** type 
   * @returns ***REMOVED***Number***REMOVED***
   */
  getBootStrapCol(type) ***REMOVED***
    switch(type) ***REMOVED***
      case 'checkbox':
      case 'boolean':
      case 'date':
      case 'bigint':
      case 'decimal':
      case 'float':
      case 'integer':
      case 'number':
        return 4;
      case 'json':
      case 'wysiwyg':
      case 'WYSIWYG':
        return 12;
      default:
        return 6;
***REMOVED***
***REMOVED***

  getElementsOnALine(itemsToPull, arr = this.list) ***REMOVED***
    const array = List.isList(arr) ? arr.toJS() : arr;

    return pullAt(array, itemsToPull);
***REMOVED***

  /**
   * Retrieve the field to remove infos
   * @returns ***REMOVED***Object***REMOVED***
   */
  attrToRemoveInfos() ***REMOVED***
    return this.getAttrInfos(this.index);
***REMOVED***

  /**
   * 
   * Retrieve the last element of each bootstrap line
   * @returns ***REMOVED***Array***REMOVED***
   */
  getLinesBound() ***REMOVED*** // NOTE: doesn't work for the last element if the line is not full!
    const array = [];
    let sum = 0;

    this.list.forEach((item, i) => ***REMOVED***
      let ***REMOVED*** bootstrapCol, index, name, type ***REMOVED*** = this.getAttrInfos(i);

      if (!type && name.includes('__col')) ***REMOVED***
        bootstrapCol = parseInt(name.split('__')[1].split('-')[2], 10);
***REMOVED***

      sum += bootstrapCol;

      if (sum === 12 || bootstrapCol === 12) ***REMOVED***
        const isFullSize = bootstrapCol === 12;
        array.push(***REMOVED*** name, index, isFullSize ***REMOVED***);
        sum = 0;
***REMOVED***

      if (sum > 12) ***REMOVED***
        sum = 0;
***REMOVED***

      if (i < this.list.size - 1) ***REMOVED***
        let ***REMOVED*** bootstrapCol: nextBootstrapCol, name: nextName, type: nextType ***REMOVED*** = this.getAttrInfos(i + 1);
        
        if (!nextType && nextName.includes('__col')) ***REMOVED***
          nextBootstrapCol = parseInt(nextName.split('__')[1].split('-')[2], 10);
  ***REMOVED***

        if (sum + nextBootstrapCol > 12) ***REMOVED***
          const isFullSize = bootstrapCol === 12;
          array.push(***REMOVED*** name, index, isFullSize ***REMOVED***);
          sum = 0;
  ***REMOVED***
***REMOVED***
***REMOVED***);

    return array;
***REMOVED***

  /**
   * 
   * Retrieve the field's type depending on its name
   * @param ***REMOVED***String***REMOVED*** itemName 
   * @returns ***REMOVED***String***REMOVED***
   */
  getType(itemName) ***REMOVED***
    return this.state
      .getIn(['schema', 'models', ...this.keys, 'availableFields', itemName, 'type']);
***REMOVED***

  /**
   * Retrieve a field name depending on its index
   * @param ***REMOVED***Number***REMOVED*** itemIndex
   * @returns ***REMOVED***String***REMOVED***
   */
  getAttrName(itemIndex)***REMOVED***
    return this.state
      .getIn(['schema', 'models', ...this.keys, 'fields', itemIndex]);
***REMOVED***

  /**
   * Retrieve the line bootstrap col sum
   * @param ***REMOVED***Number***REMOVED*** leftBound 
   * @param ***REMOVED***Number***REMOVED*** rightBound 
   * @returns ***REMOVED***Number***REMOVED***
   */

  getLineSize(elements) ***REMOVED***
    return elements.reduce((acc, current) => ***REMOVED***
      const appearance = this.layout.getIn([current, 'appearance']);
      const type = appearance !== '' && appearance !== undefined ? appearance : this.getType(current);
      const col = current.includes('__col') ? parseInt(current.split('__')[1].split('-')[2], 10) : this.getBootStrapCol(type);

      return acc += col;
***REMOVED***, 0);
***REMOVED***

  /**
   * 
   * @param ***REMOVED***Bool***REMOVED*** dir sup or min
   * @param ***REMOVED***Number***REMOVED*** pivot the center
   * @returns ***REMOVED***Object***REMOVED*** the first sup or last sup
   */
  getBound(dir, pivot = this.index) ***REMOVED***
    let result = ***REMOVED******REMOVED***;
    let hasResult = false;

    this.arrayOfEndLineElements.forEach(item => ***REMOVED***
      const rightBondCond = findIndex(this.arrayOfEndLineElements, ['index', pivot]) !== -1 ? item.index < pivot : item.index <= pivot;
      const cond = dir === true ? item.index >= pivot && !hasResult : rightBondCond;

      if (cond) ***REMOVED***
        hasResult = true;
        result = dir === true ? item : ***REMOVED*** name: this.list.get(item.index + 1), index: item.index + 1, isFullSize: false ***REMOVED***;
***REMOVED***
***REMOVED***);

    return result;
***REMOVED***

  getLayout() ***REMOVED***
    let newList = this.list;
    let sum = 0;

    this.arrayOfEndLineElements.forEach((item, i) => ***REMOVED***
      const firstLineItem = i === 0 ? 0 : this.arrayOfEndLineElements[i - 1].index +1;
      const lastLineItem = item.index + 1;
      const lineRange = firstLineItem === lastLineItem ? [firstLineItem] : range(firstLineItem, lastLineItem);
      const lineItems = this.getElementsOnALine(lineRange);
      const lineSize = this.getLineSize(lineItems);

      if (lineSize < 10 && i < this.arrayOfEndLineElements.length - 1) ***REMOVED***
        const colsToAdd = this.getColsToAdd(12 - lineSize);
        newList = newList.insert(lastLineItem + sum, colsToAdd[0]);
        
        if (colsToAdd.length > 1) ***REMOVED***
          newList = newList.insert(lastLineItem + sum, colsToAdd[1]);
  ***REMOVED***
        sum += 1;
***REMOVED***
***REMOVED***);

    return newList;
***REMOVED***
***REMOVED***

module.exports = Manager;