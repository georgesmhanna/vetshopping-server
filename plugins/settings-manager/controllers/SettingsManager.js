'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = ***REMOVED***
  menu: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;

    ctx.send(Service.menu);
***REMOVED***,

  environments: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;

    ctx.send(***REMOVED*** environments: Service.getEnvironments() ***REMOVED***);
***REMOVED***,

  languages: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;

    ctx.send(***REMOVED*** languages: Service.getLanguages() ***REMOVED***);
***REMOVED***,

  databases: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** env ***REMOVED*** = ctx.params;

    if (!env || _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);

    ctx.send(***REMOVED*** databases: Service.getDatabases(env) ***REMOVED***);
***REMOVED***,

  database: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** name, env ***REMOVED*** = ctx.params;

    if (!env || _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);
    if (!name || _.isEmpty(_.find(Service.getDatabases(env), ***REMOVED*** name ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.database.unknow' ***REMOVED***] ***REMOVED***]);

    const model = Service.databases(name, env);

    ctx.send(model);
***REMOVED***,

  databaseModel: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const env = strapi.config.environment;

    const model = Service.databases('$***REMOVED***name***REMOVED***', env);

    ctx.send(model);
***REMOVED***,

  get: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** slug, env ***REMOVED*** = ctx.params;

    if (env && _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);

    _.has(Service, slug) ? ctx.send(await Service[slug](env)) : ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.config' ***REMOVED***] ***REMOVED***]);
***REMOVED***,

  update: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** slug, env ***REMOVED*** = ctx.params;
    let params = ctx.request.body;

    if (env && _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);

    let model;
    if (_.has(Service, slug)) ***REMOVED***
      model = await Service[slug](env);
***REMOVED*** else ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.config' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    const items = Service.getItems(model);

    params = Service.cleanParams(params, items);

    let validationErrors;
    [params, validationErrors] = Service.paramsValidation(params, items);

    if (!_.isEmpty(validationErrors)) return ctx.badRequest(null, Service.formatErrors(validationErrors));

    strapi.reload.isWatching = false;

    const updateErrors = await Service.updateSettings(params, items, env);

    !_.isEmpty(updateErrors) ? ctx.badRequest(null, Service.formatErrors(updateErrors)) : ctx.send(***REMOVED*** ok: true ***REMOVED***);

    strapi.reload();
***REMOVED***,

  createLanguage: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** name ***REMOVED*** = ctx.request.body;

    const languages = Service.getLanguages();
    const availableLanguages = strapi.plugins['settings-manager'].services.languages;

    if (_.find(languages, ***REMOVED*** name: _.lowerCase(name).replace(' ', '_') ***REMOVED***)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.languages.exist' ***REMOVED***] ***REMOVED***]);
    if (!_.find(availableLanguages, ***REMOVED*** value: name ***REMOVED***)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.languages.incorrect' ***REMOVED***] ***REMOVED***]);

    const filePath = path.join(strapi.config.appPath, 'config', 'locales', `$***REMOVED***name***REMOVED***.json`);

    try ***REMOVED***
      fs.writeFileSync(filePath, '***REMOVED******REMOVED***');

      ctx.send(***REMOVED*** ok: true ***REMOVED***);

      strapi.reload();
***REMOVED*** catch (e) ***REMOVED***
      ctx.badRequest(null, Service.formatErrors([***REMOVED***
        target: 'name',
        message: 'request.error.config',
        params: ***REMOVED***
          filePath: filePath
  ***REMOVED***
***REMOVED***]));
***REMOVED***
***REMOVED***,

  deleteLanguage: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** name ***REMOVED*** = ctx.params;

    const languages = Service.getLanguages();

    if (!_.find(languages, ***REMOVED*** name ***REMOVED***)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.languages.unknow' ***REMOVED***] ***REMOVED***]);

    const filePath = path.join(strapi.config.appPath, 'config', 'locales', `$***REMOVED***name***REMOVED***.json`);

    try ***REMOVED***
      fs.unlinkSync(filePath);

      ctx.send(***REMOVED*** ok: true ***REMOVED***);
      strapi.reload();
***REMOVED*** catch (e) ***REMOVED***
      ctx.badRequest(null, Service.formatErrors([***REMOVED***
        target: 'name',
        message: 'request.error.config',
        params: ***REMOVED***
          filePath: filePath
  ***REMOVED***
***REMOVED***]));
***REMOVED***
***REMOVED***,

  createDatabase: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** env ***REMOVED*** = ctx.params;
    let params = ctx.request.body;

    if (!env || _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);

    const [name] = _.keys(params.database.connections);

    if (!name || _.find(Service.getDatabases(env), ***REMOVED*** name ***REMOVED***)) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.database.exist' ***REMOVED***] ***REMOVED***]);

    const model = Service.databases(name, env);
    const items = Service.getItems(model);

    params = Service.cleanParams(params, items);

    let validationErrors;
    [params, validationErrors] = Service.paramsValidation(params, items);

    params.database.connections[name].connector = Service.getClientConnector(params.database.connections[name].settings.client);

    if (!_.isEmpty(validationErrors)) return ctx.badRequest(null, Service.formatErrors(validationErrors));

    if (_.isEmpty(_.keys(strapi.config.environments[env].database.connections)) || _.isEmpty(strapi.config.environments[env].database.defaultConnection)) ***REMOVED***
      params.database.defaultConnection = name;
      items.push(***REMOVED***
        target: 'database.defaultConnection'
***REMOVED***);
***REMOVED***

    Service.installDependency(params, name);

    strapi.reload.isWatching = false;

    const updateErrors = Service.updateSettings(params, items, env);

    if (!_.isEmpty(updateErrors)) return ctx.badRequest(null, Service.formatErrors(updateErrors));

    ctx.send(***REMOVED*** ok: true ***REMOVED***);

    strapi.reload();
***REMOVED***,

  updateDatabase: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** name, env ***REMOVED*** = ctx.params;
    let params = ctx.request.body;

    if (!env || _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);
    if (!name || _.isEmpty(_.find(Service.getDatabases(env), ***REMOVED*** name ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.database.unknow' ***REMOVED***] ***REMOVED***]);

    const model = Service.databases(name, env);
    let items = Service.getItems(model);

    params = Service.cleanParams(params, items);

    let validationErrors;
    [params, validationErrors] = Service.paramsValidation(params, items);

    if (!_.isEmpty(validationErrors)) return ctx.badRequest(null, Service.formatErrors(validationErrors));

    const newName = _.get(params, `database.connections.$***REMOVED***name***REMOVED***.name`);
    const defaultConnection = params.database.defaultConnection;

    if (params.database.connections) ***REMOVED***
      const settings = _.assign(_.clone(strapi.config.environments[env].database.connections[name].settings), params.database.connections[name].settings);
      const options = _.assign(_.clone(strapi.config.environments[env].database.connections[name].options), params.database.connections[name].options);
      params = _.assign(_.clone(strapi.config.environments[env].database.connections[name]), params.database.connections[name]);
      params.settings = settings;
      params.options = options;
***REMOVED***

    delete params.name;

    const connections = _.clone(strapi.config.environments[env].database.connections);


    if (newName && newName !== name) ***REMOVED***
      connections[newName] = params;
      connections[name] = undefined;

      _.forEach(strapi.models, (model, modelName) => ***REMOVED***
        if (name === model.connection) ***REMOVED***
          const [searchFilePath, getModelPathErrors] = Service.getModelPath(modelName);

          if (!_.isEmpty(getModelPathErrors)) ***REMOVED***
            return ctx.badRequest(null, Service.formatErrors(getModelPathErrors));
    ***REMOVED***

          try ***REMOVED***
            const modelJSON = require(searchFilePath);
            modelJSON.connection = newName;

            try ***REMOVED***
              fs.writeFileSync(searchFilePath, JSON.stringify(modelJSON, null, 2), 'utf8');
      ***REMOVED*** catch (e) ***REMOVED***
              return ctx.badRequest(null, Service.formatErrors([***REMOVED***
                id: 'request.error.mode.write',
                params: ***REMOVED***
                  filePath: searchFilePath
          ***REMOVED***
        ***REMOVED***]));
      ***REMOVED***
    ***REMOVED*** catch (e) ***REMOVED***
            return ctx.badRequest(null, Service.formatErrors([***REMOVED***
              id: 'request.error.mode.read',
              params: ***REMOVED***
                filePath: searchFilePath
        ***REMOVED***
      ***REMOVED***]));
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
***REMOVED*** else if (params.settings) ***REMOVED***
      connections[name] = params;
***REMOVED***

    params = ***REMOVED*** database: ***REMOVED*** connections ***REMOVED******REMOVED***;

    items = [***REMOVED*** target: 'database.connections' ***REMOVED***];

    if (newName && newName !== name && strapi.config.environments[env].database.defaultConnection === name) ***REMOVED***
      params.database.defaultConnection = newName;
      items.push(***REMOVED***
        target: 'database.defaultConnection'
***REMOVED***);
***REMOVED*** else if (defaultConnection) ***REMOVED***
      params.database.defaultConnection = defaultConnection;
      items.push(***REMOVED***
        target: 'database.defaultConnection'
***REMOVED***);
***REMOVED***

    const newClient = _.get(params, `database.connections.$***REMOVED***name***REMOVED***.settings.client`);

    if (newClient) params.database.connections[name].connector = Service.getClientConnector(newClient);

    strapi.reload.isWatching = false;

    const cleanErrors = Service.cleanDependency(env, params);

    if (!_.isEmpty(cleanErrors)) ***REMOVED***
      return ctx.badRequest(null, Service.formatErrors(cleanErrors));
***REMOVED***

    Service.installDependency(params, name);

    const updateErrors = Service.updateSettings(params, items, env);

    !_.isEmpty(updateErrors) ? ctx.badRequest(null, Service.formatErrors(updateErrors)) : ctx.send(***REMOVED*** ok: true ***REMOVED***);

    strapi.reload();
***REMOVED***,

  deleteDatabase: async ctx => ***REMOVED***
    const Service = strapi.plugins['settings-manager'].services.settingsmanager;
    const ***REMOVED*** name, env ***REMOVED*** = ctx.params;

    if (!env || _.isEmpty(_.find(Service.getEnvironments(), ***REMOVED*** name: env ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.environment.unknow' ***REMOVED***] ***REMOVED***]);
    if (!name || _.isEmpty(_.find(Service.getDatabases(env), ***REMOVED*** name ***REMOVED***))) return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'request.error.database.unknow' ***REMOVED***] ***REMOVED***]);

    const connections = _.clone(strapi.config.environments[env].database.connections);
    connections[name] = undefined;

    const params = ***REMOVED*** database: ***REMOVED*** connections ***REMOVED******REMOVED***;
    const items = [***REMOVED*** target: 'database.connections' ***REMOVED***];

    if (strapi.config.environments[env].database.defaultConnection === name) ***REMOVED***
      params.database.defaultConnection = '';
      items.push(***REMOVED***
        target: 'database.defaultConnection'
***REMOVED***);
***REMOVED***

    strapi.reload.isWatching = false;

    const updateErrors = Service.updateSettings(params, items, env);

    !_.isEmpty(updateErrors) ? ctx.badRequest(null, Service.formatErrors(updateErrors)) : ctx.send(***REMOVED*** ok: true ***REMOVED***);

    strapi.reload();
***REMOVED***,

  autoReload: async ctx => ***REMOVED***
    ctx.send(***REMOVED***
      autoReload: _.get(strapi.config.currentEnvironment, 'server.autoReload', ***REMOVED*** enabled: false ***REMOVED***),
      environment: strapi.config.environment
***REMOVED***);
***REMOVED***
***REMOVED***;
