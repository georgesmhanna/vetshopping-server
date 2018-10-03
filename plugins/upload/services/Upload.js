'use strict';

/**
 * Upload.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const fs = require('fs');
const crypto = require('crypto');
const _ = require('lodash');
const toArray = require('stream-to-array');
const uuid = require('uuid/v4');

function niceHash(buffer) ***REMOVED***
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\//g, '-')
    .replace(/\+/, '_');
***REMOVED***

module.exports = ***REMOVED***
  bufferize: async files => ***REMOVED***
    if (_.isEmpty(files) === 0) ***REMOVED***
      throw 'Missing files.';
***REMOVED***

    // files is always an array to map on
    files = _.isArray(files) ? files : [files];

    // transform all files in buffer
    return Promise.all(
      files.map(async stream => ***REMOVED***
        const parts = await toArray(fs.createReadStream(stream.path));
        const buffers = parts.map(
          part => (_.isBuffer(part) ? part : Buffer.from(part)),
        );

        const buffer = Buffer.concat(buffers);

        return ***REMOVED***
          name: stream.name,
          sha256: niceHash(buffer),
          hash: uuid().replace(/-/g, ''),
          ext:
            stream.name.split('.').length > 1
              ? `.$***REMOVED***_.last(stream.name.split('.'))***REMOVED***`
              : '',
          buffer,
          mime: stream.type,
          size: (stream.size / 1000).toFixed(2),
  ***REMOVED***;
***REMOVED***),
    );
***REMOVED***,

  upload: async (files, config) => ***REMOVED***
    // Get upload provider settings to configure the provider to use.
    const provider = _.find(strapi.plugins.upload.config.providers, ***REMOVED***
      provider: config.provider,
***REMOVED***);

    if (!provider) ***REMOVED***
      throw new Error(
        `The provider package isn't installed. Please run \`npm install strapi-upload-$***REMOVED***
          config.provider
  ***REMOVED***\``,
      );
***REMOVED***

    const actions = provider.init(config);

    // Execute upload function of the provider for all files.
    return Promise.all(
      files.map(async file => ***REMOVED***
        await actions.upload(file);

        // Remove buffer to don't save it.
        delete file.buffer;

        file.provider = provider.provider;

        return await strapi.plugins['upload'].services.upload.add(file);
***REMOVED***),
    );
***REMOVED***,

  add: async values => ***REMOVED***
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      return await strapi.plugins['content-manager'].services[
        'contentmanager'
      ].add(
        ***REMOVED***
          model: 'file',
  ***REMOVED***
        values,
        'upload',
      );
***REMOVED***

    return strapi.query('file', 'upload').create(values);
***REMOVED***,

  edit: async (params, values) => ***REMOVED***
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      params.model = 'file';
      params.id = params._id || params.id;

      return await strapi.plugins['content-manager'].services[
        'contentmanager'
      ].edit(params, values, 'upload');
***REMOVED***

    return strapi.query('file', 'upload').update(_.assign(params, values));
***REMOVED***,

  fetch: params => ***REMOVED***
    return strapi
      .query('file', 'upload')
      .findOne(_.pick(params, ['_id', 'id']));
***REMOVED***,

  fetchAll: params => ***REMOVED***
    return strapi
      .query('file', 'upload')
      .find(strapi.utils.models.convertParams('file', params));
***REMOVED***,

  count: async () => ***REMOVED***
    return await strapi.query('file', 'upload').count();
***REMOVED***,

  remove: async (params, config) => ***REMOVED***
    params.id = params._id || params.id;

    const file = await strapi.plugins['upload'].services.upload.fetch(params);

    // get upload provider settings to configure the provider to use
    const provider = _.cloneDeep(
      _.find(strapi.plugins.upload.config.providers, ***REMOVED***
        provider: config.provider,
***REMOVED***),
    );
    _.assign(provider, config);
    const actions = provider.init(config);

    // execute delete function of the provider
    if (file.provider === provider.provider) ***REMOVED***
      await actions.delete(file);
***REMOVED***

    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      params.model = 'file';

      await strapi.plugins['content-manager'].services['contentmanager'].delete(
        params,
        ***REMOVED*** source: 'upload' ***REMOVED***,
      );
***REMOVED***

    return strapi.query('file', 'upload').delete(params);
***REMOVED***,

  uploadToEntity: async function(params, files, source) ***REMOVED***
    // Retrieve provider settings from database.
    const config = await strapi
      .store(***REMOVED***
        environment: strapi.config.environment,
        type: 'plugin',
        name: 'upload',
***REMOVED***)
      .get(***REMOVED*** key: 'provider' ***REMOVED***);

    const model =
      source && source !== 'content-manager'
        ? strapi.plugins[source].models[params.model]
        : strapi.models[params.model];

    // Asynchronous upload.
    await Promise.all(
      Object.keys(files).map(async attribute => ***REMOVED***
        // Bufferize files per attribute.
        const buffers = await this.bufferize(files[attribute]);
        const enhancedFiles = buffers.map(file => ***REMOVED***
          const details = model.attributes[attribute];

          // Add related information to be able to make
          // the relationships later.
          file[details.via] = [
            ***REMOVED***
              refId: params.id,
              ref: params.model,
              source,
              field: attribute,
      ***REMOVED***
          ];

          return file;
  ***REMOVED***);

        // Make upload async.
        return this.upload(enhancedFiles, config);
***REMOVED***),
    );
***REMOVED***,
***REMOVED***;
