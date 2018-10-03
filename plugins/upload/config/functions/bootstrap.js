'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = async cb => ***REMOVED***
  // set plugin store
  const pluginStore = strapi.store(***REMOVED***
    environment: strapi.config.environment,
    type: 'plugin',
    name: 'upload'
***REMOVED***);

  strapi.plugins.upload.config.providers = [];

  const loadProviders = (basePath, cb) => ***REMOVED***
    fs.readdir(path.join(basePath, 'node_modules'), async (err, node_modules) => ***REMOVED***
      // get all upload provider
      const uploads = _.filter(node_modules, (node_module) => ***REMOVED***
        return _.startsWith(node_module, ('strapi-upload'));
***REMOVED***);

      // mount all providers to get configs
      _.forEach(uploads, (node_module) => ***REMOVED***
        strapi.plugins.upload.config.providers.push(
          require(path.join(`$***REMOVED***basePath***REMOVED***/node_modules/$***REMOVED***node_module***REMOVED***`))
        );
***REMOVED***);

      try ***REMOVED***
        // if provider config not exit set one by default
        const config = await pluginStore.get(***REMOVED***key: 'provider'***REMOVED***);

        if (!config) ***REMOVED***
          const provider = _.find(strapi.plugins.upload.config.providers, ***REMOVED***provider: 'local'***REMOVED***);

          const value = _.assign(***REMOVED******REMOVED***, provider, ***REMOVED***
            enabled: true,
            // by default limit size to 1 GB
            sizeLimit: 1000000
    ***REMOVED***);

          await pluginStore.set(***REMOVED***key: 'provider', value***REMOVED***);
  ***REMOVED***
***REMOVED*** catch (err) ***REMOVED***
        strapi.log.error(`Can't load $***REMOVED***config.provider***REMOVED*** upload provider.`);
        strapi.log.warn(`Please install strapi-upload-$***REMOVED***config.provider***REMOVED*** --save in $***REMOVED***path.join(strapi.config.appPath, 'plugins', 'upload')***REMOVED*** folder.`);
        strapi.stop();
***REMOVED***

      cb();
***REMOVED***);
***REMOVED***;

  // Load providers from the plugins' node_modules.
  loadProviders(path.join(strapi.config.appPath, 'plugins', 'upload'), () => ***REMOVED***
    // Load providers from the root node_modules.
    loadProviders(path.join(strapi.config.appPath), cb);
***REMOVED***);

***REMOVED***;
