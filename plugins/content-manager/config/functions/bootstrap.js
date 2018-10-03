const _ = require('lodash');
const pluralize = require('pluralize');
const ***REMOVED***
  getApis,
  getApisKeys,
  getApisUploadRelations,
  getEditDisplayAvailableFieldsPath,
  getEditDisplayFieldsPath
***REMOVED*** = require('./utils/getters');
const splitted = str => str.split('.');
const pickData = (model) => _.pick(model, [
  'info',
  'connection',
  'collectionName',
  'attributes',
  'identity',
  'globalId',
  'globalName',
  'orm',
  'loadedModel',
  'primaryKey',
  'associations'
]);

module.exports = async cb => ***REMOVED***
  // Retrieve all layout files from the plugins config folder
  const pluginsLayout = Object.keys(strapi.plugins).reduce((acc, current) => ***REMOVED***
    const models = _.get(strapi.plugins, [current, 'config', 'layout'], ***REMOVED******REMOVED***);
    Object.keys(models).forEach(model => ***REMOVED***
      const layout = _.get(strapi.plugins, [current, 'config', 'layout', model], ***REMOVED******REMOVED***);
      acc[model] = layout;
***REMOVED***);

    return acc;
***REMOVED***, ***REMOVED******REMOVED***);
  // Remove the core_store layout since it is not needed
  // And create a temporay one
  const tempLayout = Object.keys(strapi.models)
    .filter(m => m !== 'core_store')
    .reduce((acc, current) => ***REMOVED***
      acc[current] = ***REMOVED*** attributes: ***REMOVED******REMOVED*** ***REMOVED***;

      return acc;
***REMOVED***, pluginsLayout);
  const models = _.mapValues(strapi.models, pickData);
  delete models['core_store'];
  const pluginsModel = Object.keys(strapi.plugins).reduce((acc, current) => ***REMOVED***
    acc[current] = ***REMOVED***
      models: _.mapValues(strapi.plugins[current].models, pickData),
***REMOVED***;

    return acc;
***REMOVED***, ***REMOVED******REMOVED***);
  // Init schema
  const schema = ***REMOVED***
    generalSettings: ***REMOVED***
      search: true,
      filters: true,
      bulkActions: true,
      pageEntries: 10,
***REMOVED***,
    models: ***REMOVED***
      plugins: ***REMOVED******REMOVED***,
***REMOVED***,
    layout: ***REMOVED******REMOVED***
***REMOVED***;

  // Populate the schema object
  const buildSchema = (model, name, plugin = false) => ***REMOVED***
    // Model data
    const schemaModel = Object.assign(***REMOVED***
      label: _.upperFirst(name),
      labelPlural: _.upperFirst(pluralize(name)),
      orm: model.orm || 'mongoose',
      search: true,
      filters: true,
      bulkActions: true,
      pageEntries: 10,
      defaultSort: model.primaryKey,
      sort: 'ASC',
      editDisplay: ***REMOVED***
        availableFields: ***REMOVED******REMOVED***,
        fields: [],
        relations: [],
***REMOVED***
***REMOVED***, model);
    const fieldsToRemove = [];
    // Fields (non relation)
    const fields = _.mapValues(_.pickBy(model.attributes, attribute =>
      !attribute.model && !attribute.collection
    ), (value, attribute) => ***REMOVED***
      const fieldClassName = _.get(tempLayout, [name, 'attributes', attribute, 'className'], '');

      if (fieldClassName === 'd-none') ***REMOVED***
        fieldsToRemove.push(attribute);
***REMOVED***

      return ***REMOVED***
        label: _.upperFirst(attribute),
        description: '',
        type: value.type || 'string',
        disabled: false,
***REMOVED***;
***REMOVED***);
    
    // Don't display fields that are hidden by default like the resetPasswordToken for the model user
    fieldsToRemove.forEach(field => ***REMOVED***
      _.unset(fields, field);
      _.unset(schemaModel.attributes, field);
***REMOVED***);

    schemaModel.fields = fields;
    schemaModel.editDisplay.availableFields = fields;

    // Select fields displayed in list view
    schemaModel.listDisplay = Object.keys(schemaModel.fields)
      // Construct Array of attr ex ***REMOVED*** type: 'string', label: 'Foo', name: 'Foo', description: '' ***REMOVED***
      .map(attr => ***REMOVED***
        const attrType = schemaModel.fields[attr].type;
        const sortable = attrType !== 'json' && attrType !== 'array';

        return Object.assign(schemaModel.fields[attr], ***REMOVED*** name: attr, sortable, searchable: sortable ***REMOVED***);
***REMOVED***)
      // Retrieve only the fourth first items
      .slice(0, 4);

    schemaModel.listDisplay.splice(0, 0, ***REMOVED***
      name: model.primaryKey || 'id',
      label: 'Id',
      type: 'string',
      sortable: true,
      searchable: true,
***REMOVED***);

    // This object will be used to customise the label and description and so on of an input.
    // TODO: maybe add the customBootstrapClass in it;
    schemaModel.editDisplay.availableFields = Object.keys(schemaModel.fields).reduce((acc, current) => ***REMOVED***
      acc[current] = Object.assign(
        _.pick(_.get(schemaModel, ['fields', current], ***REMOVED******REMOVED***), ['label', 'type', 'description', 'name']),
        ***REMOVED***
          editable: ['updatedAt', 'createdAt', 'updated_at', 'created_at'].indexOf(current) === -1,
          placeholder: '',
  ***REMOVED***);

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    if (model.associations) ***REMOVED***
      // Model relations
      schemaModel.relations = model.associations.reduce((acc, current) => ***REMOVED***
        const label = _.upperFirst(current.alias);
        const displayedAttribute = current.plugin ? // Value to modified to custom what's displayed in the react-select
          _.get(pluginsModel, [current.plugin, 'models', current.model || current.collection, 'info', 'mainField']) ||
          _.findKey(_.get(pluginsModel, [current.plugin, 'models', current.model || current.collection, 'attributes']), ***REMOVED*** type : 'string'***REMOVED***) ||
          'id' :
          _.get(models, [current.model || current.collection, 'info', 'mainField']) ||
          _.findKey(_.get(models, [current.model || current.collection, 'attributes']), ***REMOVED*** type : 'string'***REMOVED***) ||
          'id';

        acc[current.alias] = ***REMOVED***
          ...current,
          description: '',
          label,
          displayedAttribute,
  ***REMOVED***;

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);
      const relationsArray = Object.keys(schemaModel.relations).filter(relation => ***REMOVED***
        const isUploadRelation = _.get(schemaModel, ['relations', relation, 'plugin'], '') === 'upload';
        const isMorphSide = _.get(schemaModel, ['relations', relation, 'nature'], '').toLowerCase().includes('morp') &&  _.get(schemaModel, ['relations', relation, relation]) !== undefined;

        return !isUploadRelation && !isMorphSide;
***REMOVED***);

      const uploadRelations = Object.keys(schemaModel.relations).reduce((acc, current) => ***REMOVED***
        if (_.get(schemaModel, ['relations', current, 'plugin']) === 'upload') ***REMOVED***
          const model = _.get(schemaModel, ['relations', current]);

          acc[current] = ***REMOVED***
            description: '',
            editable: true,
            label: _.upperFirst(current),
            multiple: _.has(model, 'collection'),
            name: current,
            placeholder: '',
            type: 'file',
            disabled: false,
    ***REMOVED***;
  ***REMOVED***

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);

      schemaModel.editDisplay.availableFields = _.merge(schemaModel.editDisplay.availableFields, uploadRelations);
      schemaModel.editDisplay.relations = relationsArray;
***REMOVED***

    schemaModel.editDisplay.fields = Object.keys(schemaModel.editDisplay.availableFields);

    if (plugin) ***REMOVED***
      return _.set(schema.models.plugins, `$***REMOVED***plugin***REMOVED***.$***REMOVED***name***REMOVED***`, schemaModel);
***REMOVED***

    // Set the formatted model to the schema
    schema.models[name] = schemaModel;
***REMOVED***;

  // For each plugin's apis populate the schema object with the needed infos
  _.forEach(pluginsModel, (plugin, pluginName) => ***REMOVED***
    _.forEach(plugin.models, (model, name) => ***REMOVED***
      buildSchema(model, name, pluginName);
***REMOVED***);
***REMOVED***);

  // Generate schema for models.
  _.forEach(models, (model, name) => ***REMOVED***
    buildSchema(model, name);
***REMOVED***);

  const pluginStore = strapi.store(***REMOVED***
    environment: '',
    type: 'plugin',
    name: 'content-manager'
***REMOVED***);

  try ***REMOVED***
    // Retrieve the previous schema from the db
    const prevSchema = await pluginStore.get(***REMOVED*** key: 'schema' ***REMOVED***);

    // If no schema stored
    if (!prevSchema) ***REMOVED***
      _.set(schema, 'layout', tempLayout);

      pluginStore.set(***REMOVED*** key: 'schema', value: schema ***REMOVED***);

      return cb();
***REMOVED***

    // Here we do the difference between the previous schema from the database and the new one

    // Retrieve all the api path, it generates an array
    const prevSchemaApis = getApis(prevSchema.models);
    const schemaApis = getApis(schema.models);

    // Array of apis to add
    const apisToAdd = schemaApis.filter(api => prevSchemaApis.indexOf(api) === -1).map(splitted);
    // Array of apis to remove
    const apisToRemove = prevSchemaApis.filter(api => schemaApis.indexOf(api) === -1).map(splitted);

    // Retrieve the same apis by name
    const sameApis = schemaApis.filter(api => prevSchemaApis.indexOf(api) !== -1).map(splitted);
    // Retrieve all the field's path of the current unchanged api name
    const schemaSameApisKeys = _.flattenDeep(getApisKeys(schema, sameApis));
    // Retrieve all the field's path of the previous unchanged api name
    const prevSchemaSameApisKeys = _.flattenDeep(getApisKeys(prevSchema, sameApis));
    // Determine for the same api if we need to add some fields
    const sameApisAttrToAdd = schemaSameApisKeys.filter(attr => prevSchemaSameApisKeys.indexOf(attr) === -1).map(splitted);
    // Special case for the relations
    const prevSchemaSameApisUploadRelations = _.flattenDeep(getApisUploadRelations(prevSchema, sameApis));
    const schemaSameApisUploadRelations = _.flattenDeep(getApisUploadRelations(schema, sameApis));
    const sameApisUploadRelationsToAdd = schemaSameApisUploadRelations.filter(attr => prevSchemaSameApisUploadRelations.indexOf(attr) === -1).map(splitted);
    // Determine the fields to remove for the unchanged api name
    const sameApisAttrToRemove = prevSchemaSameApisKeys.filter(attr => schemaSameApisKeys.indexOf(attr) === -1).map(splitted);

    // Remove api
    apisToRemove.map(apiPath => ***REMOVED***
      _.unset(prevSchema.models, apiPath);
***REMOVED***);

    // Remove API attribute
    sameApisAttrToRemove.map(attrPath => ***REMOVED***
      const editDisplayPath = getEditDisplayAvailableFieldsPath(attrPath);
      // Remove the field from the available fields in the editDisplayObject
      _.unset(prevSchema.models, editDisplayPath);
      // Check default sort and change it if needed
      _.unset(prevSchema.models, attrPath);
      // Retrieve the api path in the schema Object
      const apiPath = attrPath.length > 3 ? _.take(attrPath, 3) : _.take(attrPath, 1);
      // Retrieve the listDisplay path in the schema Object
      const listDisplayPath = apiPath.concat('listDisplay');
      const prevListDisplay = _.get(prevSchema.models, listDisplayPath);
      const defaultSortPath = apiPath.concat('defaultSort');
      const currentAttr = attrPath.slice(-1);
      const defaultSort = _.get(prevSchema.models, defaultSortPath);

      // If the user has deleted the default sort attribute in the content type builder
      // Replace it by new generated one from the current schema
      if (_.includes(currentAttr, defaultSort)) ***REMOVED***
        _.set(prevSchema.models, defaultSortPath, _.get(schema.models, defaultSortPath));
***REMOVED***

      // Update the displayed fields
      const updatedListDisplay = prevListDisplay.filter(obj => obj.name !== currentAttr.join());

      if (updatedListDisplay.length === 0) ***REMOVED***
        // Update it with the one from the generated schema
        _.set(prevSchema.models, listDisplayPath, _.get(schema.models, listDisplayPath, []));
***REMOVED*** else ***REMOVED***
        _.set(prevSchema.models, listDisplayPath, updatedListDisplay);
***REMOVED***
***REMOVED***);

    // Add API
    // Here we just need to add the data from the current schema Object
    apisToAdd.map(apiPath => ***REMOVED***
      const api = _.get(schema.models, apiPath);
      const ***REMOVED*** search, filters, bulkActions, pageEntries ***REMOVED*** = _.get(prevSchema, 'generalSettings');

      _.set(api, 'filters', filters);
      _.set(api, 'search', search);
      _.set(api, 'bulkActions', bulkActions);
      _.set(api, 'pageEntries', pageEntries);
      _.set(prevSchema.models, apiPath, api);
***REMOVED***);

    // Add attribute to an existing API
    sameApisAttrToAdd.map(attrPath => ***REMOVED***
      const attr = _.get(schema.models, attrPath);
      _.set(prevSchema.models, attrPath, attr);

      // Add the field in the editDisplay object
      const path = getEditDisplayAvailableFieldsPath(attrPath);
      const availableAttrToAdd = _.get(schema.models, path);
      _.set(prevSchema.models, path, availableAttrToAdd);

      // Push the attr into the list
      const fieldsPath = getEditDisplayFieldsPath(attrPath);
      const currentFields = _.get(prevSchema.models, fieldsPath, []);
      currentFields.push(availableAttrToAdd.name);
      _.set(prevSchema.models, fieldsPath, currentFields);
***REMOVED***);

    // Update other keys
    sameApis.map(apiPath => ***REMOVED***
      // This doesn't keep the prevSettings for the relations,  the user will have to reset it.
      // We might have to improve this if we want the order of the relations to be kept
      const keysToUpdate = ['relations', 'loadedModel', 'associations', 'attributes', ['editDisplay', 'relations']].map(key => apiPath.concat(key));

      keysToUpdate.map(keyPath => ***REMOVED***
        const newValue = _.get(schema.models, keyPath);

        _.set(prevSchema.models, keyPath, newValue);
***REMOVED***);
***REMOVED***);

    // Special handler for the upload relations
    sameApisUploadRelationsToAdd.forEach(attrPath => ***REMOVED***
      const attr = _.get(schema.models, attrPath);
      _.set(prevSchema.models, attrPath, attr);

      const fieldsPath = [..._.take(attrPath, attrPath.length -2), 'fields'];
      const currentFields = _.get(prevSchema.models, fieldsPath, []);
      currentFields.push(attr.name);
      _.set(prevSchema.models, fieldsPath, currentFields);
***REMOVED***);

    await pluginStore.set(***REMOVED*** key: 'schema', value: prevSchema ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
    console.log('error', err);
***REMOVED***

  cb();
***REMOVED***;
