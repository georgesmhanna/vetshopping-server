import ***REMOVED*** forEach, upperFirst, mapValues, pickBy, slice, findKey, keys, get, set ***REMOVED*** from 'lodash';
import pluralize from 'pluralize';

/**
 * Generate a schema according to the models
 * of the Strapi application.
 *
 * @param models
 */
const generateSchema = (responses) => ***REMOVED***
  // Init `schema` object
  const schema = ***REMOVED***
    plugins: ***REMOVED******REMOVED***,
***REMOVED***;

  const buildSchema = (model, name, plugin = false) => ***REMOVED***
    // Model data
    const schemaModel = ***REMOVED***
      label: upperFirst(name),
      labelPlural: upperFirst(pluralize(name)),
      orm: model.orm || 'mongoose',
***REMOVED***;

    // Fields (non relation)
    schemaModel.fields = mapValues(pickBy(model.attributes, attribute =>
      !attribute.model && !attribute.collection
    ), (value, attribute) => (***REMOVED***
      label: upperFirst(attribute),
      description: '',
      type: value.type || 'string',
***REMOVED***));

    // Select fields displayed in list view
    schemaModel.list = slice(keys(schemaModel.fields), 0, 4);

    if (model.associations) ***REMOVED***
      // Model relations
      schemaModel.relations = model.associations.reduce((acc, current) => ***REMOVED***
        const displayedAttribute = current.plugin ?
          get(responses.plugins, [current.plugin, 'models', current.model || current.collection, 'info', 'mainField']) ||
          findKey(get(responses.plugins, [current.plugin, 'models', current.model || current.collection, 'attributes']), ***REMOVED*** type : 'string'***REMOVED***) ||
          'id' :
          get(responses.models, [current.model || current.collection, 'info', 'mainField']) ||
          findKey(get(responses.models, [current.model || current.collection, 'attributes']), ***REMOVED*** type : 'string'***REMOVED***) ||
          'id';

        acc[current.alias] = ***REMOVED***
          ...current,
          description: '',
          displayedAttribute,
  ***REMOVED***;

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);
***REMOVED***

    if (plugin) ***REMOVED***
      return set(schema.plugins, `$***REMOVED***plugin***REMOVED***.$***REMOVED***name***REMOVED***`, schemaModel);
***REMOVED***

    // Set the formatted model to the schema
    schema[name] = schemaModel;
***REMOVED***;

  // Generate schema for plugins.
  forEach(responses.plugins, (plugin, pluginName) => ***REMOVED***
    forEach(plugin.models, (model, name) => ***REMOVED***
      buildSchema(model, name, pluginName);
***REMOVED***);
***REMOVED***);

  // Generate schema for models.
  forEach(responses.models, (model, name) => ***REMOVED***
    buildSchema(model, name);
***REMOVED***);

  return schema;
***REMOVED***;

export ***REMOVED***
  generateSchema,
***REMOVED***;
