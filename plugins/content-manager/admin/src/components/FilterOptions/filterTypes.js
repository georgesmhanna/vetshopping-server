const getFilters = (type) => ***REMOVED***
  switch(type) ***REMOVED***
    case 'string':
    case 'text':
    case 'password':
    case 'email':
      return [
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES.=',
          value: '=',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._ne',
          value: '_ne',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._lt',
          value: '_lt',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._lte',
          value: '_lte',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._gt',
          value: '_gt',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._gte',
          value: '_gte',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._contains',
          value: '_contains',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._containss',
          value: '_containss',
  ***REMOVED***
      ];
    case 'integer':
    case 'float':
    case 'decimal':
    case 'date':
      return [
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES.=',
          value: '=',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._ne',
          value: '_ne',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._lt',
          value: '_lt',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._lte',
          value: '_lte',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._gt',
          value: '_gt',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._gte',
          value: '_gte',
  ***REMOVED***
      ];
    default:
      return [
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES.=',
          value: '=',
  ***REMOVED***
        ***REMOVED***
          id: 'content-manager.components.FilterOptions.FILTER_TYPES._ne',
          value: '_ne',
  ***REMOVED***
      ];
    
***REMOVED***
***REMOVED***;

export default getFilters;