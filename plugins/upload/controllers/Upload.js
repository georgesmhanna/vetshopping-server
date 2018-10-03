'use strict';

/**
 * Upload.js controller
 *
 * @description: A set of functions called "actions" of the `upload` plugin.
 */

const _ = require('lodash');

module.exports = ***REMOVED***
  upload: async (ctx) => ***REMOVED***
    // Retrieve provider configuration.
    const config = await strapi.store(***REMOVED***
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'upload'
***REMOVED***).get(***REMOVED*** key: 'provider' ***REMOVED***);

    // Verify if the file upload is enable.
    if (config.enabled === false) ***REMOVED***
      strapi.log.error('File upload is disabled');
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Upload.status.disabled' ***REMOVED***] ***REMOVED***] : 'File upload is disabled');
***REMOVED***

    // Extract optional relational data.
    const ***REMOVED*** refId, ref, source, field, path ***REMOVED*** = ctx.request.body.fields;
    const ***REMOVED*** files = ***REMOVED******REMOVED*** ***REMOVED*** = ctx.request.body.files;

    if (_.isEmpty(files)) ***REMOVED***
      return ctx.send(true);
***REMOVED***

    // Transform stream files to buffer
    const buffers = await strapi.plugins.upload.services.upload.bufferize(ctx.request.body.files.files);
    const enhancedFiles = buffers.map(file => ***REMOVED***
      if (file.size > config.sizeLimit) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Upload.status.sizeLimit', values: ***REMOVED***file: file.name***REMOVED*** ***REMOVED***] ***REMOVED***] : `$***REMOVED***file.name***REMOVED*** file is bigger than limit size!`);
***REMOVED***

      // Add details to the file to be able to create the relationships.
      if (refId && ref && field) ***REMOVED***
        Object.assign(file, ***REMOVED***
          related: [***REMOVED***
            refId,
            ref,
            source,
            field
    ***REMOVED***]
  ***REMOVED***);
***REMOVED***

      // Update uploading folder path for the file.
      if (path) ***REMOVED***
        Object.assign(file, ***REMOVED***
          path
  ***REMOVED***);
***REMOVED***

      return file;
***REMOVED***);

    // Something is wrong (size limit)...
    if (ctx.status === 400) ***REMOVED***
      return;
***REMOVED***

    const uploadedFiles = await strapi.plugins.upload.services.upload.upload(enhancedFiles, config);

    // Send 200 `ok`
    ctx.send(uploadedFiles.map((file) => ***REMOVED***
      // If is local server upload, add backend host as prefix
      if (file.url && file.url[0] === '/') ***REMOVED***
        file.url = strapi.config.url + file.url;
***REMOVED***

      if (_.isArray(file.related)) ***REMOVED***
        file.related = file.related.map(obj => obj.ref || obj);
***REMOVED***

      return file;
***REMOVED***));
***REMOVED***,

  getEnvironments: async (ctx) => ***REMOVED***
    const environments =  _.map(_.keys(strapi.config.environments), environment => ***REMOVED***
      return ***REMOVED***
        name: environment,
        active: (strapi.config.environment === environment)
***REMOVED***;
***REMOVED***);

    ctx.send(***REMOVED*** environments ***REMOVED***);
***REMOVED***,

  getSettings: async (ctx) => ***REMOVED***
    const config = await strapi.store(***REMOVED***
      environment: ctx.params.environment,
      type: 'plugin',
      name: 'upload'
***REMOVED***).get(***REMOVED***key: 'provider'***REMOVED***);

    ctx.send(***REMOVED***
      providers: strapi.plugins.upload.config.providers,
      config
***REMOVED***);
***REMOVED***,

  updateSettings: async (ctx) => ***REMOVED***
    await strapi.store(***REMOVED***
      environment: ctx.params.environment,
      type: 'plugin',
      name: 'upload'
***REMOVED***).set(***REMOVED***key: 'provider', value: ctx.request.body***REMOVED***);

    ctx.send(***REMOVED***ok: true***REMOVED***);
***REMOVED***,

  find: async (ctx) => ***REMOVED***
    const data = await strapi.plugins['upload'].services.upload.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data.map((file) => ***REMOVED***
      // if is local server upload, add backend host as prefix
      if (file.url[0] === '/') ***REMOVED***
        file.url = strapi.config.url + file.url;
***REMOVED***

      return file;
***REMOVED***));
***REMOVED***,

  findOne: async (ctx) => ***REMOVED***
    const data = await strapi.plugins['upload'].services.upload.fetch(ctx.params);

    data.url = strapi.config.url + data.url;

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***,

  count: async (ctx) => ***REMOVED***
    const data = await strapi.plugins['upload'].services.upload.count(ctx.query);

    // Send 200 `ok`
    ctx.send(***REMOVED***
      count: data
***REMOVED***);
***REMOVED***,

  destroy: async (ctx) => ***REMOVED***
    const config = await strapi.store(***REMOVED***
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'upload'
***REMOVED***).get(***REMOVED***key: 'provider'***REMOVED***);

    const data = await strapi.plugins['upload'].services.upload.remove(ctx.params, config);

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***,

  search: async (ctx) => ***REMOVED***
    const data = await strapi.query('file', 'upload').search(ctx.params);

    ctx.send(data);
***REMOVED***,
***REMOVED***;
