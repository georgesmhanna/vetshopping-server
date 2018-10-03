'use strict';

const _ = require('lodash');

/**
 * A set of functions called "actions" for `ContentManager`
 */

module.exports = ***REMOVED***
  fetchAll: async (params, query) => ***REMOVED***
    const ***REMOVED*** limit, skip, sort, query : request, queryAttribute, source, page, populate = [] ***REMOVED*** = query; // eslint-disable-line no-unused-vars
    const filters = strapi.utils.models.convertParams(params.model, query);
    const where = !_.isEmpty(request) ? request : filters.where;

    // Find entries using `queries` system
    return await strapi.query(params.model, source).find(***REMOVED***
      limit: limit || filters.limit,
      skip: skip || filters.start || 0,
      sort: sort || filters.sort,
      where,
      queryAttribute,
***REMOVED***, populate);
***REMOVED***,

  search: async (params, query) => ***REMOVED***
    const ***REMOVED*** limit, skip, sort, source, _q, populate = [] ***REMOVED*** = query; // eslint-disable-line no-unused-vars
    const filters = strapi.utils.models.convertParams(params.model, query);

    // Find entries using `queries` system
    return await strapi.query(params.model, source).search(***REMOVED***
      limit: limit || filters.limit,
      skip: skip || filters.start || 0,
      sort: sort || filters.sort,
      search: _q
***REMOVED***, populate);
***REMOVED***,

  countSearch: async (params, query) => ***REMOVED***
    const ***REMOVED*** source, _q ***REMOVED*** = query;

    return await strapi.query(params.model, source).countSearch(***REMOVED*** search: _q ***REMOVED***);
***REMOVED***,

  count: async (params, query) => ***REMOVED***
    const ***REMOVED*** source ***REMOVED*** = query;
    const filters = strapi.utils.models.convertParams(params.model, query);

    return await strapi.query(params.model, source).count(***REMOVED*** where: filters.where ***REMOVED***);
***REMOVED***,

  fetch: async (params, source, populate, raw = true) => ***REMOVED***
    return await strapi.query(params.model, source).findOne(***REMOVED***
      id: params.id
***REMOVED***, populate, raw);
***REMOVED***,

  add: async (params, values, source) => ***REMOVED***
    // Multipart/form-data.
    if (values.hasOwnProperty('fields') && values.hasOwnProperty('files')) ***REMOVED***
      // Silent recursive parser.
      const parser = (value) => ***REMOVED***
        try ***REMOVED***
          value = JSON.parse(value);
  ***REMOVED*** catch (e) ***REMOVED***
          // Silent.
  ***REMOVED***

        return _.isArray(value) ? value.map(obj => parser(obj)) : value;
***REMOVED***;

      const files = values.files;

      // Parse stringify JSON data.
      values = Object.keys(values.fields).reduce((acc, current) => ***REMOVED***
        acc[current] = parser(values.fields[current]);

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);

      // Update JSON fields.
      const entry = await strapi.query(params.model, source).create(***REMOVED***
        values
***REMOVED***);

      // Then, request plugin upload.
      if (strapi.plugins.upload && Object.keys(files).length > 0) ***REMOVED***
        // Upload new files and attach them to this entity.
        await strapi.plugins.upload.services.upload.uploadToEntity(***REMOVED***
          id: entry.id || entry._id,
          model: params.model
  ***REMOVED*** files, source);
***REMOVED***

      return strapi.query(params.model, source).findOne(***REMOVED***
        id: entry.id || entry._id
***REMOVED***);
***REMOVED***

    // Create an entry using `queries` system
    return await strapi.query(params.model, source).create(***REMOVED***
      values
***REMOVED***);
***REMOVED***,

  edit: async (params, values, source) => ***REMOVED***
    // Multipart/form-data.
    if (values.hasOwnProperty('fields') && values.hasOwnProperty('files')) ***REMOVED***
      // Silent recursive parser.
      const parser = (value) => ***REMOVED***
        try ***REMOVED***
          value = JSON.parse(value);
  ***REMOVED*** catch (e) ***REMOVED***
          // Silent.
  ***REMOVED***

        return _.isArray(value) ? value.map(obj => parser(obj)) : value;
***REMOVED***;

      const files = values.files;

      // set empty attributes if old values was cleared
      _.difference(Object.keys(files), Object.keys(values.fields)).forEach(attr => ***REMOVED***
        values.fields[attr] = [];
***REMOVED***);

      // Parse stringify JSON data.
      values = Object.keys(values.fields).reduce((acc, current) => ***REMOVED***
        acc[current] = parser(values.fields[current]);

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);

      // Update JSON fields.
      await strapi.query(params.model, source).update(***REMOVED***
        id: params.id,
        values
***REMOVED***);

      // Then, request plugin upload.
      if (strapi.plugins.upload) ***REMOVED***
        // Upload new files and attach them to this entity.
        await strapi.plugins.upload.services.upload.uploadToEntity(params, files, source);
***REMOVED***

      return strapi.query(params.model, source).findOne(***REMOVED***
        id: params.id
***REMOVED***);
***REMOVED***

    // Raw JSON.
    return strapi.query(params.model, source).update(***REMOVED***
      id: params.id,
      values
***REMOVED***);
***REMOVED***,

  delete: async (params, ***REMOVED*** source ***REMOVED***) => ***REMOVED***
    const query = strapi.query(params.model, source);
    const primaryKey = query.primaryKey;
    const response = await query.findOne(***REMOVED***
      id: params.id
***REMOVED***);

    params[primaryKey] = response[primaryKey];
    params.values = Object.keys(JSON.parse(JSON.stringify(response))).reduce((acc, current) => ***REMOVED***
      const association = (strapi.models[params.model] || strapi.plugins[source].models[params.model]).associations.filter(x => x.alias === current)[0];

      // Remove relationships.
      if (association) ***REMOVED***
        acc[current] = _.isArray(response[current]) ? [] : null;
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    if (!_.isEmpty(params.values)) ***REMOVED***
      // Run update to remove all relationships.
      await strapi.query(params.model, source).update(params);
***REMOVED***

    // Delete an entry using `queries` system
    return await strapi.query(params.model, source).delete(***REMOVED***
      id: params.id
***REMOVED***);
***REMOVED***,

  deleteMany: async (params, query) => ***REMOVED***
    const ***REMOVED*** source ***REMOVED*** = query;
    const ***REMOVED*** model ***REMOVED*** = params;

    const primaryKey = strapi.query(model, source).primaryKey;
    const toRemove = Object.keys(query).reduce((acc, curr) => ***REMOVED***
      if (curr !== 'source') ***REMOVED***
        return acc.concat([query[curr]]);
***REMOVED***

      return acc;
***REMOVED***, []);

    const filters = strapi.utils.models.convertParams(model, ***REMOVED*** [`$***REMOVED***primaryKey***REMOVED***_in`]: toRemove ***REMOVED***);
    const entries = await strapi.query(model, source).find(***REMOVED*** where: filters.where ***REMOVED***, null, true);
    const associations = strapi.query(model, source).associations;

    for (let i = 0; i < entries.length; ++i) ***REMOVED***
      const entry = entries[i];

      associations.forEach(association => ***REMOVED***
        if (entry[association.alias]) ***REMOVED***
          switch (association.nature) ***REMOVED***
            case 'oneWay':
            case 'oneToOne':
            case 'manyToOne':
            case 'oneToManyMorph':
              entry[association.alias] = null;
              break;
            case 'oneToMany':
            case 'manyToMany':
            case 'manyToManyMorph':
              entry[association.alias] = [];
              break;
            default:
    ***REMOVED***
  ***REMOVED***
***REMOVED***);

      await strapi.query(model, source).update(***REMOVED***
        [primaryKey]: entry[primaryKey],
        values: _.pick(entry, associations.map(a => a.alias))
***REMOVED***);
***REMOVED***

    return strapi.query(model, source).deleteMany(***REMOVED***
      [primaryKey]: toRemove,
***REMOVED***);
***REMOVED***
***REMOVED***;
