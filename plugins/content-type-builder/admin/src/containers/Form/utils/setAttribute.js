import ***REMOVED*** cloneDeep, forEach, includes, set, unset, replace ***REMOVED*** from 'lodash';

/* eslint-disable consistent-return */

export default function setParallelAttribute(newAttribute) ***REMOVED***
  if (newAttribute.params.target === this.props.modelName) ***REMOVED***
    const parallelAttribute = cloneDeep(newAttribute);
    parallelAttribute.name = newAttribute.params.key;
    parallelAttribute.params.key = newAttribute.name;
    parallelAttribute.params.columnName = newAttribute.params.targetColumnName;
    parallelAttribute.params.targetColumnName = newAttribute.params.columnName;
    parallelAttribute.params.dominant = false;

    if (newAttribute.params.nature) ***REMOVED***
      switch (newAttribute.params.nature) ***REMOVED***
        case 'manyToOne':
          parallelAttribute.params.nature = 'oneToMany';
          break;
        case 'oneToMany':
          parallelAttribute.params.nature = 'manyToOne';          
          break;
        default:
        //
***REMOVED***
***REMOVED***
    return parallelAttribute;
***REMOVED***
  return;
***REMOVED***

export function setTempAttribute() ***REMOVED***
  const newAttribute = cloneDeep(this.props.modifiedDataAttribute);

  forEach(newAttribute.params, (value, key) => ***REMOVED***
    if (includes(key, 'Value')) ***REMOVED***
      set(newAttribute.params, replace(key, 'Value', ''), value);
      unset(newAttribute.params, key);
***REMOVED***
***REMOVED***);

  return newAttribute;
***REMOVED***
