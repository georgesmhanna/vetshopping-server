'use strict';

const fs = require('fs');
const _ = require('lodash');

const Service = require('../services/ContentTypeBuilder');

module.exports = ***REMOVED***
  getModels: async ctx => ***REMOVED***
    ctx.send(***REMOVED*** models: Service.getModels() ***REMOVED***);
***REMOVED***,

  getModel: async ctx => ***REMOVED***
    const Service = strapi.plugins['content-type-builder'].services.contenttypebuilder;
    const ***REMOVED*** source ***REMOVED*** = ctx.request.query;

    let ***REMOVED*** model ***REMOVED*** = ctx.params;

    model = _.toLower(model);

    if (!source && !_.get(strapi.models, model)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.unknown' ***REMOVED***] ***REMOVED***]);

    if (source && !_.get(strapi.plugins, [source, 'models', model])) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.unknown' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    const modelLayout = await Service.getModel(model, source);

    ctx.send(***REMOVED*** model: modelLayout ***REMOVED***);
***REMOVED***,

  getConnections: async ctx => ***REMOVED***
    ctx.send(***REMOVED*** connections: Service.getConnections() ***REMOVED***);
***REMOVED***,

  createModel: async ctx => ***REMOVED***
    const ***REMOVED*** name, description, connection, collectionName, attributes = [], plugin ***REMOVED*** = ctx.request.body;

    if (!name) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.name.missing' ***REMOVED***] ***REMOVED***]);
    if (!_.includes(Service.getConnections(), connection)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.connection.unknow' ***REMOVED***] ***REMOVED***]);
    if (strapi.models[name]) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.exist' ***REMOVED***] ***REMOVED***]);
    if (!_.isNaN(parseFloat(name[0]))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.name' ***REMOVED***] ***REMOVED***]);

    const [formatedAttributes, attributesErrors] = Service.formatAttributes(attributes, name, plugin);

    if (!_.isEmpty(attributesErrors)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: attributesErrors ***REMOVED***]);
***REMOVED***

    strapi.reload.isWatching = false;

    await Service.appearance(formatedAttributes, name);

    await Service.generateAPI(name, description, connection, collectionName, []);

    const modelFilePath = await Service.getModelPath(name, plugin);

    try ***REMOVED***
      const modelJSON = _.cloneDeep(require(modelFilePath));

      modelJSON.attributes = formatedAttributes;

      const clearRelationsErrors = Service.clearRelations(name, plugin);

      if (!_.isEmpty(clearRelationsErrors)) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: clearRelationsErrors ***REMOVED***]);
***REMOVED***

      const createRelationsErrors = Service.createRelations(name, attributes, plugin);

      if (!_.isEmpty(createRelationsErrors)) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: createRelationsErrors ***REMOVED***]);
***REMOVED***

      try ***REMOVED***
        fs.writeFileSync(modelFilePath, JSON.stringify(modelJSON, null, 2), 'utf8');

        ctx.send(***REMOVED*** ok: true ***REMOVED***);

        strapi.reload();
***REMOVED*** catch (e) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.write' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED*** catch (e) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.read' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  updateModel: async ctx => ***REMOVED***
    const ***REMOVED*** model ***REMOVED*** = ctx.params;
    const ***REMOVED*** name, description, mainField, connection, collectionName, attributes = [], plugin ***REMOVED*** = ctx.request.body;

    if (!name) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.name.missing' ***REMOVED***] ***REMOVED***]);
    if (!_.includes(Service.getConnections(), connection)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.connection.unknow' ***REMOVED***] ***REMOVED***]);
    if (strapi.models[_.toLower(name)] && name !== model) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.exist' ***REMOVED***] ***REMOVED***]);
    if (!strapi.models[_.toLower(model)] && plugin && !strapi.plugins[_.toLower(plugin)].models[_.toLower(model)]) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.unknown' ***REMOVED***] ***REMOVED***]);
    if (!_.isNaN(parseFloat(name[0]))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.name' ***REMOVED***] ***REMOVED***]);
    if (plugin && !strapi.plugins[_.toLower(plugin)]) return ctx.badRequest(null, [***REMOVED*** message: [***REMOVED*** id: 'request.error.plugin.name' ***REMOVED***] ***REMOVED***]);

    const [formatedAttributes, attributesErrors] = Service.formatAttributes(attributes, name.toLowerCase(), plugin);

    if (!_.isEmpty(attributesErrors)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: attributesErrors ***REMOVED***]);
***REMOVED***

    let modelFilePath = Service.getModelPath(model, plugin);

    strapi.reload.isWatching = false;

    if (name !== model) ***REMOVED***
      await Service.generateAPI(name, description, connection, collectionName, []);
***REMOVED***

    await Service.appearance(formatedAttributes, name, plugin);

    try ***REMOVED***
      const modelJSON = _.cloneDeep(require(modelFilePath));

      modelJSON.connection = connection;
      modelJSON.collectionName = collectionName;
      modelJSON.info = ***REMOVED***
        name,
        description
***REMOVED***;
      modelJSON.attributes = formatedAttributes;

      if (mainField) ***REMOVED***
        modelJSON.info.mainField = mainField;
***REMOVED***

      const clearRelationsErrors = Service.clearRelations(model, plugin);

      if (!_.isEmpty(clearRelationsErrors)) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: clearRelationsErrors ***REMOVED***]);
***REMOVED***

      const createRelationsErrors = Service.createRelations(name, attributes, plugin);

      if (!_.isEmpty(createRelationsErrors)) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: createRelationsErrors ***REMOVED***]);
***REMOVED***

      if (name !== model) ***REMOVED***
        const removeModelErrors = Service.removeModel(model);

        if (!_.isEmpty(removeModelErrors)) ***REMOVED***
          return ctx.badRequest(null, [***REMOVED*** messages: removeModelErrors ***REMOVED***]);
  ***REMOVED***

        modelFilePath = Service.getModelPath(name, plugin);
***REMOVED***

      try ***REMOVED***
        fs.writeFileSync(modelFilePath, JSON.stringify(modelJSON, null, 2), 'utf8');

        ctx.send(***REMOVED*** ok: true ***REMOVED***);

        strapi.reload();
***REMOVED*** catch (e) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.write' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED*** catch (e) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.read' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  deleteModel: async ctx => ***REMOVED***
    const ***REMOVED*** model ***REMOVED*** = ctx.params;

    if (!_.get(strapi.models, model)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.model.unknown' ***REMOVED***] ***REMOVED***]);

    strapi.reload.isWatching = false;

    const clearRelationsErrors = Service.clearRelations(model, undefined, true);

    if (!_.isEmpty(clearRelationsErrors)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: clearRelationsErrors ***REMOVED***]);
***REMOVED***

    const removeModelErrors = Service.removeModel(model);

    if (!_.isEmpty(removeModelErrors)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: removeModelErrors ***REMOVED***]);
***REMOVED***

    const pluginStore = strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'content-manager'
***REMOVED***);

    const schema = await pluginStore.get(***REMOVED*** key: 'schema' ***REMOVED***);

    delete schema.layout[model];

    await pluginStore.set(***REMOVED*** key: 'schema', value: schema ***REMOVED***);

    ctx.send(***REMOVED*** ok: true ***REMOVED***);

    strapi.reload();
***REMOVED***,

  autoReload: async ctx => ***REMOVED***
    ctx.send(***REMOVED***
      autoReload: _.get(strapi.config.currentEnvironment, 'server.autoReload', ***REMOVED*** enabled: false ***REMOVED***)
***REMOVED***);
***REMOVED***,

  checkTableExists: async ctx => ***REMOVED***
    // Get connection
    const ***REMOVED*** connection ***REMOVED*** = ctx.params;

    const connector = _.get(strapi.config.currentEnvironment.database.connections, [connection, 'connector']);
    const model = _.toLower(ctx.params.model);

    if (!model) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Model is required' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    if (!connector) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Connection doesn\'t exist' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    if (connector === 'strapi-hook-bookshelf') ***REMOVED***
      try ***REMOVED***
        const tableExists = await strapi.connections[connection].schema.hasTable(model);

        return ctx.send(***REMOVED*** tableExists ***REMOVED***);
***REMOVED*** catch(error) ***REMOVED***
        return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Not found' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***

    ctx.send(***REMOVED*** tableExists: true ***REMOVED***);
***REMOVED***
***REMOVED***;
