'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const generator = require('strapi-generate');
const ***REMOVED*** fromJS, List, Map ***REMOVED*** = require('immutable');
const Manager = require('../utils/Manager.js');
const ***REMOVED***
  createManager,
  removeColsLine,
  reorderList,
***REMOVED*** = require('../utils/helpers.js');

module.exports = ***REMOVED***
  appearance: async (attributes, model, plugin) => ***REMOVED***
    const pluginStore = strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'content-manager'
***REMOVED***);

    const schema = await pluginStore.get(***REMOVED*** key: 'schema' ***REMOVED***);
    const layout = _.get(schema.layout, model, ***REMOVED******REMOVED***);

    // If updating a content-type
    if (!_.isEmpty(layout)) ***REMOVED***
      const state = fromJS(***REMOVED***
        schema: fromJS(schema),
***REMOVED***);
      const schemaPath = plugin ? ['models', 'plugins', plugin, model] : ['models', model];
      const keys = plugin ? `plugins.$***REMOVED***plugin***REMOVED***.$***REMOVED***model***REMOVED***.editDisplay` : `$***REMOVED***model***REMOVED***.editDisplay`;
      const prevList = state.getIn(['schema', ...schemaPath, 'editDisplay', 'fields'], List());
      const prevFields =  Object.keys(state.getIn(['schema', ...schemaPath, 'editDisplay', 'availableFields'], Map()).toJS());
      const currentFields = Object.keys(attributes);
      const fieldsToRemove = _.difference(prevFields, currentFields);
      let newList = prevList;

      fieldsToRemove.forEach((field) => ***REMOVED***
        const index = newList.indexOf(field);
        const manager = new Manager(state, prevList, keys, index, fromJS(layout.attributes || ***REMOVED******REMOVED***));
        const attrToRemoveInfos = manager.attrToRemoveInfos; // Retrieve the removed item infos
        const arrayOfLastLineElements = manager.arrayOfEndLineElements;
        const isRemovingAFullWidthNode = attrToRemoveInfos.bootstrapCol === 12;

        if (isRemovingAFullWidthNode) ***REMOVED***
          const currentNodeLine = _.findIndex(arrayOfLastLineElements, ['index', attrToRemoveInfos.index]); // Used only to know if removing a full size element on the first line
          if (currentNodeLine === 0) ***REMOVED***
            newList = newList
              .delete(index);
    ***REMOVED*** else ***REMOVED***
            const previousNodeLine = currentNodeLine - 1;
            const firstElementOnLine = previousNodeLine === 0 ? 0 : arrayOfLastLineElements[previousNodeLine - 1].index + 1;
            const lastElementOnLine = arrayOfLastLineElements[previousNodeLine].index + 1;
            const previousLineRangeIndexes = firstElementOnLine === lastElementOnLine ? [firstElementOnLine] : _.range(firstElementOnLine, lastElementOnLine);
            const elementsOnLine = manager.getElementsOnALine(previousLineRangeIndexes);
            const previousLineColNumber = manager.getLineSize(elementsOnLine);

            if (previousLineColNumber >= 10) ***REMOVED***
              newList = newList
                .delete(index);
      ***REMOVED*** else ***REMOVED***
              const colNumberToAdd = 12 - previousLineColNumber;
              const colsToAdd = manager.getColsToAdd(colNumberToAdd);
              newList = newList
                .delete(index)
                .insert(index, colsToAdd[0]);

              if (colsToAdd.length > 1) ***REMOVED***
                newList = newList
                  .insert(index, colsToAdd[1]);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
          const nodeBounds = ***REMOVED*** left: manager.getBound(false), right: manager.getBound(true) ***REMOVED***; // Retrieve the removed element's bounds
          const leftBoundIndex = _.get(nodeBounds, ['left', 'index'], 0) + 1;
          const rightBoundIndex = _.get(nodeBounds, ['right', 'index'], prevList.size -1);
          const elementsOnLine = manager.getElementsOnALine(_.range(leftBoundIndex - 1, rightBoundIndex + 1));
          const currentLineColSize = manager.getLineSize(elementsOnLine);
          const isRemovingLine = currentLineColSize - attrToRemoveInfos.bootstrapCol === 0;

          if (isRemovingLine) ***REMOVED***
            newList = newList
              .delete(attrToRemoveInfos.index);
    ***REMOVED*** else ***REMOVED***
            const random = Math.random().toString(36).substring(7);
            newList = newList
              .delete(attrToRemoveInfos.index)
              .insert(rightBoundIndex, `__col-md-$***REMOVED***attrToRemoveInfos.bootstrapCol***REMOVED***__$***REMOVED***random***REMOVED***`);
    ***REMOVED***
  ***REMOVED***

        const newManager = createManager(state, newList, keys, 0, fromJS(layout.attributes));
        newList = removeColsLine(newManager, newList);
        const lastManager = createManager(state, newList, keys, 0, fromJS(layout.attributes));
        newList = reorderList(lastManager, lastManager.getLayout());
***REMOVED***);

      // Delete them from the available fields
      fieldsToRemove.forEach(field => ***REMOVED***
        _.unset(schema, [...schemaPath, 'editDisplay', 'availableFields', field]);
***REMOVED***);

      _.set(schema, [...schemaPath, 'editDisplay', 'fields'], newList.toJS());
***REMOVED***

    Object.keys(attributes).map(attribute => ***REMOVED***
      const appearances = _.get(attributes, [attribute, 'appearance'], ***REMOVED******REMOVED***);
      Object.keys(appearances).map(appearance => ***REMOVED***
        _.set(layout, ['attributes', attribute, 'appearance'], appearances[appearance] ? appearance : '' );
***REMOVED***);

      _.unset(attributes, [attribute, 'appearance']);
***REMOVED***);

    schema.layout[model] = layout;

    await pluginStore.set(***REMOVED*** key: 'schema', value: schema ***REMOVED***);
***REMOVED***,

  getModels: () => ***REMOVED***
    const models = [];

    _.forEach(strapi.models, (model, name) => ***REMOVED***
      if (name === 'core_store') ***REMOVED***
        return true;
***REMOVED***

      models.push(***REMOVED***
        icon: 'fa-cube',
        name: _.get(model, 'info.name', 'model.name.missing'),
        description: _.get(model, 'info.description', 'model.description.missing'),
        fields: _.keys(model.attributes).length
***REMOVED***);
***REMOVED***);

    const pluginModels = Object.keys(strapi.plugins).reduce((acc, current) => ***REMOVED***
      _.forEach(strapi.plugins[current].models, (model, name) => ***REMOVED***
        if (name === 'file') ***REMOVED***
          return true;
  ***REMOVED***

        acc.push(***REMOVED***
          icon: 'fa-cube',
          name: _.get(model, 'info.name', 'model.name.missing'),
          description: _.get(model, 'info.description', 'model.description.missing'),
          fields: _.keys(model.attributes).length,
          source: current,
  ***REMOVED***);
***REMOVED***);

      return acc;
***REMOVED***, []);

    return models.concat(pluginModels);
***REMOVED***,

  getModel: async (name, source) => ***REMOVED***
    name = _.toLower(name);

    const model = source ? _.get(strapi.plugins, [source, 'models', name]) : _.get(strapi.models, name);

    const pluginStore = strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'content-manager'
***REMOVED***);

    const schema = await pluginStore.get(***REMOVED*** key: 'schema' ***REMOVED***);

    const attributes = [];
    _.forEach(model.attributes, (params, attr) => ***REMOVED***
      const relation = _.find(model.associations, ***REMOVED*** alias: attr ***REMOVED***);

      if (relation &&  !_.isArray(_.get(relation, relation.alias))) ***REMOVED***
        if (params.plugin === 'upload' && relation.model || relation.collection === 'file') ***REMOVED***
          params = ***REMOVED***
            type: 'media',
            multiple: params.collection ? true : false,
            required: params.required
    ***REMOVED***;
  ***REMOVED*** else ***REMOVED***
          params = _.omit(params, ['collection', 'model', 'via']);
          params.target = relation.model || relation.collection;
          params.key = relation.via;
          params.nature = relation.nature;
          params.targetColumnName = _.get((params.plugin ? strapi.plugins[params.plugin].models : strapi.models )[params.target].attributes[params.key], 'columnName', '');
  ***REMOVED***
***REMOVED***

      const appearance = _.get(schema, ['layout', name, 'attributes', attr, 'appearance']);
      if (appearance) ***REMOVED***
        _.set(params, ['appearance', appearance], true);
***REMOVED***

      attributes.push(***REMOVED***
        name: attr,
        params
***REMOVED***);
***REMOVED***);

    return ***REMOVED***
      name: _.get(model, 'info.name', 'model.name.missing'),
      description: _.get(model, 'info.description', 'model.description.missing'),
      mainField: _.get(model, 'info.mainField', ''),
      connection: model.connection,
      collectionName: model.collectionName,
      attributes: attributes
***REMOVED***;
***REMOVED***,

  getConnections: () => ***REMOVED***
    return _.keys(strapi.config.currentEnvironment.database.connections);
***REMOVED***,

  generateAPI: (name, description, connection, collectionName, attributes) => ***REMOVED***
    const template = _.get(strapi.config.currentEnvironment, `database.connections.$***REMOVED***connection***REMOVED***.connector`, 'strapi-hook-mongoose').split('-')[2];

    return new Promise((resolve, reject) => ***REMOVED***
      const scope = ***REMOVED***
        generatorType: 'api',
        id: name.toLowerCase(),
        rootPath: strapi.config.appPath,
        args: ***REMOVED***
          api: name,
          description: _.replace(description, /\"/g, '\\"'), // eslint-disable-line no-useless-escape
          attributes,
          connection,
          collectionName: !_.isEmpty(collectionName) ? collectionName : undefined,
          tpl: template
  ***REMOVED***
***REMOVED***;

      generator(scope, ***REMOVED***
        success: () => ***REMOVED***
          resolve();
  ***REMOVED***
        error: (err) => ***REMOVED***
          reject(err);
  ***REMOVED***
***REMOVED***);
***REMOVED***);
***REMOVED***,

  getModelPath: (model, plugin) => ***REMOVED***
    // Retrieve where is located the model.
    // Note: The target is not found when we are creating a new API. That's why, we are returning the lowercased model.
    const target = Object.keys((plugin ? strapi.plugins : strapi.api) || ***REMOVED******REMOVED***)
      .filter(x => _.includes(Object.keys(_.get((plugin ? strapi.plugins : strapi.api)[x], 'models', [])), model.toLowerCase()))[0] || model.toLowerCase();

    // Retrieve the filename of the model.
    const filename = fs.readdirSync(plugin ? path.join(strapi.config.appPath, 'plugins', target, 'models') : path.join(strapi.config.appPath, 'api', target, 'models'))
      .filter(x => x[0] !== '.')
      .filter(x => x.split('.settings.json')[0].toLowerCase() === model.toLowerCase())[0];

    return plugin ?
      path.resolve(strapi.config.appPath, 'plugins', target, 'models', filename):
      path.resolve(strapi.config.appPath, 'api', target, 'models', filename);
***REMOVED***,

  formatAttributes: (attributes, name, plugin) => ***REMOVED***
    const errors = [];
    const attrs = ***REMOVED******REMOVED***;

    const target = Object.keys((plugin ? strapi.plugins : strapi.api) || ***REMOVED******REMOVED***)
      .filter(x => _.includes(Object.keys(_.get((plugin ? strapi.plugins : strapi.api)[x], 'models', [])), name))[0] || name.toLowerCase();

    const model = (plugin ? _.get(strapi.plugins, [target, 'models', name]) : _.get(strapi.api, [target, 'models', name])) || ***REMOVED******REMOVED***;

    // Only select configurable attributes.
    const attributesConfigurable = attributes.filter(attribute => _.get(model, ['attributes', attribute.name, 'configurable'], true) !== false);
    const attributesNotConfigurable = Object.keys(model.attributes || ***REMOVED******REMOVED***)
      .filter(attribute => _.get(model, ['attributes', attribute, 'configurable'], true) === false)
      .reduce((acc, attribute) => ***REMOVED***
        acc[attribute] = model.attributes[attribute];

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);

    _.forEach(attributesConfigurable, attribute => ***REMOVED***
      if (_.has(attribute, 'params.type')) ***REMOVED***
        attrs[attribute.name] = _.omit(attribute.params, 'multiple');

        if (attribute.params.type === 'media') ***REMOVED***
          const via = _.findKey(strapi.plugins.upload.models.file.attributes, ***REMOVED***collection: '*'***REMOVED***);

          attrs[attribute.name] = ***REMOVED***
            [attribute.params.multiple ? 'collection' : 'model']: 'file',
            via,
            plugin: 'upload',
            required: attribute.params.required === true ? true : false
    ***REMOVED***;
  ***REMOVED***
***REMOVED*** else if (_.has(attribute, 'params.target')) ***REMOVED***
        const relation = attribute.params;
        const attr = ***REMOVED***
          required: relation.required,
          columnName: relation.columnName,
          unique: relation.unique
  ***REMOVED***;

        switch (relation.nature) ***REMOVED***
          case 'oneWay':
          case 'oneToOne':
          case 'manyToOne':
            attr.model = relation.target;
            break;
          case 'manyToMany':
          case 'oneToMany':
            attr.collection = relation.target;
            break;
          default:
  ***REMOVED***

        if(relation.nature !== 'oneWay') ***REMOVED***
          attr.via = relation.key;
  ***REMOVED***
        attr.dominant = relation.dominant;

        if (_.trim(relation.pluginValue)) ***REMOVED***
          attr.plugin = _.trim(relation.pluginValue);
  ***REMOVED***

        attrs[attribute.name] = attr;
***REMOVED***

      if (!_.isNaN(parseFloat(attribute.name[0])) || !_.isNaN(parseFloat(_.get(attribute, 'params.key'), NaN))) ***REMOVED***
        errors.push(***REMOVED***
          id: 'request.error.attribute.values',
          params: ***REMOVED***
            attribute
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***);

    Object.assign(attributesNotConfigurable, attrs);

    return [attributesNotConfigurable, errors];
***REMOVED***,

  clearRelations: (model, source, force) => ***REMOVED***
    const errors = [];
    const structure = ***REMOVED***
      models: strapi.models,
      plugins: Object.keys(strapi.plugins).reduce((acc, current) => ***REMOVED***
        acc[current] = ***REMOVED***
          models: strapi.plugins[current].models
  ***REMOVED***;

        return acc;
***REMOVED*** ***REMOVED******REMOVED***)
***REMOVED***;

    // Method to delete the association of the models.
    const deleteAssociations = (models, plugin) => ***REMOVED***
      Object.keys(models).forEach(name => ***REMOVED***
        const relationsToDelete = _.get(plugin ? strapi.plugins[plugin].models[name] : strapi.models[name], 'associations', []).filter(association => ***REMOVED***
          if (source) ***REMOVED***
            return association[association.type] === model && association.plugin === source && (association.nature !== 'oneWay' || force);
    ***REMOVED***

          return association[association.type] === model && (association.nature !== 'oneWay' || force);
  ***REMOVED***);

        if (!_.isEmpty(relationsToDelete)) ***REMOVED***
          // Retrieve where is located the model.
          const target = Object.keys((plugin ? strapi.plugins : strapi.api) || ***REMOVED******REMOVED***)
            .filter(x => _.includes(Object.keys(_.get((plugin ? strapi.plugins : strapi.api)[x], 'models', [])), name))[0];

          // Retrieve the filename of the model.
          const filename = fs.readdirSync(plugin ? path.join(strapi.config.appPath, 'plugins', target, 'models') : path.join(strapi.config.appPath, 'api', target, 'models'))
            .filter(x => x[0] !== '.')
            .filter(x => x.split('.settings.json')[0].toLowerCase() === name)[0];

          // Path to access to the model.
          const pathToModel = plugin ?
            path.resolve(strapi.config.appPath, 'plugins', target, 'models', filename):
            path.resolve(strapi.config.appPath, 'api', target, 'models', filename);

          // Require the model.
          const modelJSON = require(pathToModel);

          _.forEach(relationsToDelete, relation => ***REMOVED***
            modelJSON.attributes[relation.alias] = undefined;
    ***REMOVED***);

          try ***REMOVED***
            fs.writeFileSync(pathToModel, JSON.stringify(modelJSON, null, 2), 'utf8');
    ***REMOVED*** catch (e) ***REMOVED***
            errors.push(***REMOVED***
              id: 'request.error.model.write',
              params: ***REMOVED***
                filePath: pathToModel
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
***REMOVED***;

    // Update `./api` models.
    deleteAssociations(structure.models);

    Object.keys(structure.plugins).forEach(name => ***REMOVED***
      // Update `./plugins/$***REMOVED***name***REMOVED***` models.
      deleteAssociations(structure.plugins[name].models, name);
***REMOVED***);

    return errors;
***REMOVED***,

  createRelations: (model, attributes, source) => ***REMOVED***
    const errors = [];
    const structure = ***REMOVED***
      models: strapi.models,
      plugins: Object.keys(strapi.plugins).reduce((acc, current) => ***REMOVED***
        acc[current] = ***REMOVED***
          models: strapi.plugins[current].models
  ***REMOVED***;

        return acc;
***REMOVED*** ***REMOVED******REMOVED***)
***REMOVED***;

    // Method to update the model
    const update = (models, plugin) => ***REMOVED***
      Object.keys(models).forEach(name => ***REMOVED***
        const relationsToCreate = attributes.filter(attribute => ***REMOVED***
          if (plugin) ***REMOVED***
            return _.get(attribute, 'params.target') === name && _.get(attribute, 'params.pluginValue') === plugin;
    ***REMOVED***

          return _.get(attribute, 'params.target') === name && _.isEmpty(_.get(attribute, 'params.pluginValue', ''));
  ***REMOVED***);

        if (!_.isEmpty(relationsToCreate)) ***REMOVED***
          // Retrieve where is located the model.
          const target = Object.keys((plugin ? strapi.plugins : strapi.api) || ***REMOVED******REMOVED***)
            .filter(x => _.includes(Object.keys(_.get((plugin ? strapi.plugins : strapi.api)[x], 'models', [])), name))[0];

          // Retrieve the filename of the model.
          const filename = fs.readdirSync(plugin ? path.join(strapi.config.appPath, 'plugins', target, 'models') : path.join(strapi.config.appPath, 'api', target, 'models'))
            .filter(x => x[0] !== '.')
            .filter(x => x.split('.settings.json')[0].toLowerCase() === name)[0];

          // Path to access to the model.
          const pathToModel = plugin ?
            path.resolve(strapi.config.appPath, 'plugins', target, 'models', filename):
            path.resolve(strapi.config.appPath, 'api', target, 'models', filename);

          const modelJSON = require(pathToModel);

          _.forEach(relationsToCreate, (***REMOVED*** name, params ***REMOVED***) => ***REMOVED***
            const attr = ***REMOVED******REMOVED***;

            switch (params.nature) ***REMOVED***
              case 'oneWay':
                return;
              case 'oneToOne':
              case 'oneToMany':
                attr.model = model.toLowerCase();
                break;
              case 'manyToOne':
                attr.collection = model.toLowerCase();
                break;
              case 'manyToMany': ***REMOVED***
                attr.collection = model.toLowerCase();

                if (!params.dominant) ***REMOVED***
                  attr.dominant = true;
          ***REMOVED***
                break;
        ***REMOVED***
              default:
      ***REMOVED***

            attr.via = name;
            attr.columnName = params.targetColumnName;

            if (_.trim(source)) ***REMOVED***
              attr.plugin = _.trim(source);
      ***REMOVED***

            modelJSON.attributes[params.key] = attr;

            try ***REMOVED***
              fs.writeFileSync(pathToModel, JSON.stringify(modelJSON, null, 2), 'utf8');
      ***REMOVED*** catch (e) ***REMOVED***
              errors.push(***REMOVED***
                id: 'request.error.model.write',
                params: ***REMOVED***
                  filePath: pathToModel
          ***REMOVED***
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
***REMOVED***;

    // Update `./api` models.
    update(structure.models);

    Object.keys(structure.plugins).forEach(name => ***REMOVED***
      // Update `./plugins/$***REMOVED***name***REMOVED***` models.
      update(structure.plugins[name].models, name);
***REMOVED***);

    return errors;
***REMOVED***,

  removeModel: model => ***REMOVED***
    model = _.toLower(model);

    const errors = [];
    const apiPath = path.join(strapi.config.appPath, 'api');

    const deleteModelFile = (parentPath, fileName) => ***REMOVED***
      const filePath = path.join(parentPath, fileName);

      if (_.startsWith(`$***REMOVED***_.toLower(fileName)***REMOVED***.`, `$***REMOVED***model***REMOVED***.`)) ***REMOVED***
        try ***REMOVED***
          fs.unlinkSync(filePath);
  ***REMOVED*** catch (e) ***REMOVED***
          errors.push(***REMOVED***
            id: 'request.error.file.unlink',
            params: ***REMOVED***
              filePath
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

      if (fileName === 'routes.json') ***REMOVED***
        const routesJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        _.remove(routesJSON.routes, function(route) ***REMOVED***
          return _.startsWith(_.toLower(route.handler), model);
  ***REMOVED***);

        if (_.isEmpty(routesJSON.routes)) ***REMOVED***
          try ***REMOVED***
            fs.unlinkSync(filePath);
    ***REMOVED*** catch (e) ***REMOVED***
            errors.push(***REMOVED***
              id: 'request.error.route.unlink',
              params: ***REMOVED***
                filePath
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
          try ***REMOVED***
            fs.writeFileSync(filePath, JSON.stringify(routesJSON, null, 2), 'utf8');
    ***REMOVED*** catch (e) ***REMOVED***
            errors.push(***REMOVED***
              id: 'request.error.route.write',
              params: ***REMOVED***
                filePath
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***;

    const recurciveDeleteFiles = folderPath => ***REMOVED***
      try ***REMOVED***
        const items = fs.readdirSync(folderPath).filter(x => x[0] !== '.');

        _.forEach(items, item => ***REMOVED***
          const itemPath = path.join(folderPath, item);

          if (fs.lstatSync(itemPath).isDirectory()) ***REMOVED***
            recurciveDeleteFiles(itemPath);
    ***REMOVED*** else ***REMOVED***
            deleteModelFile(folderPath, item);
    ***REMOVED***
  ***REMOVED***);

        if (_.isEmpty(fs.readdirSync(folderPath).filter(x => x[0] !== '.'))) ***REMOVED***
          try ***REMOVED***
            fs.rmdirSync(folderPath);
    ***REMOVED*** catch (e) ***REMOVED***
            errors.push(***REMOVED***
              id: 'request.error.folder.unlink',
              params: ***REMOVED***
                folderPath
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***
***REMOVED*** catch (e) ***REMOVED***
        errors.push(***REMOVED***
          id: 'request.error.folder.read',
          params: ***REMOVED***
            folderPath
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***;

    recurciveDeleteFiles(apiPath);

    return errors;
***REMOVED***
***REMOVED***;
