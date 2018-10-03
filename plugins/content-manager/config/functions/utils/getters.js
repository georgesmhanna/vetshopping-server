const _ = require('lodash');
/**
 * Retrieve the path of each API
 * @param ***REMOVED***Object***REMOVED******REMOVED*** data 
 * @returns ***REMOVED***Array***REMOVED*** Array of API path ['plugins.upload.file', 'plugins.users-permissions.user', ...]
 */
const getApis = (data) => Object.keys(data).reduce((acc, curr) => ***REMOVED***
  if (data[curr].fields) ***REMOVED***
    return acc.concat([curr]);
***REMOVED***

  if (curr === 'plugins') ***REMOVED***
    Object.keys(data[curr]).map(plugin => ***REMOVED***
      Object.keys(data[curr][plugin]).map(api => ***REMOVED***
        acc = acc.concat([`$***REMOVED***curr***REMOVED***.$***REMOVED***plugin***REMOVED***.$***REMOVED***api***REMOVED***`]);
***REMOVED***);
***REMOVED***);
***REMOVED***

  return acc;
***REMOVED***, []);


/**
 * Retrieve all the fields from an api
 * @param ***REMOVED***Object***REMOVED*** data 
 * @param ***REMOVED***Array***REMOVED*** apis 
 * @returns ***REMOVED***Array***REMOVED*** Array composed of fields path for instance : [['plugins.users-permissions.user.fields.username', 'plugins.users-permissions.user.fields.email', 'plugins.users-permissions.user.fields.password'], [...]]
 */
const getApisKeys = (data, apis) => apis.map(apiPath => ***REMOVED***
  const fields = Object.keys(_.get(data.models, apiPath.concat(['fields'])));

  return fields.map(field => `$***REMOVED***apiPath.join('.')***REMOVED***.fields.$***REMOVED***field***REMOVED***`);
***REMOVED***);

/**
 * Same as above but only for the relations since it's custom
 */
const getApisUploadRelations = (data, sameArray) => sameArray.map(apiPath => ***REMOVED***
  const relationPath = [...apiPath, 'relations'];
  const relationsObject = _.get(data.models, relationPath, ***REMOVED******REMOVED***);
  const relations = Object.keys(relationsObject)
    .filter(relationName => ***REMOVED***
      return _.get(data.models, [...relationPath, relationName, 'plugin' ]) === 'upload';
***REMOVED***);
  
  return relations.map(relation => `$***REMOVED***apiPath.join('.')***REMOVED***.editDisplay.availableFields.$***REMOVED***relation***REMOVED***`);
***REMOVED***);

/**
 * 
 * @param ***REMOVED***String***REMOVED*** attrPath
 * @returns ***REMOVED***Array***REMOVED***
 */
const getEditDisplayAvailableFieldsPath = attrPath => [..._.take(attrPath, attrPath.length -2), 'editDisplay', 'availableFields', attrPath[attrPath.length - 1]];
const getEditDisplayFieldsPath = attrPath => [..._.take(attrPath, attrPath.length -2), 'editDisplay', 'fields'];



module.exports = ***REMOVED***
  getApis,
  getApisKeys,
  getApisUploadRelations,
  getEditDisplayAvailableFieldsPath,
  getEditDisplayFieldsPath
***REMOVED***;