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
    name: 'email'
***REMOVED***);

  strapi.plugins.email.config.providers = [];

  const loadProviders = (basePath, cb) => ***REMOVED***
    fs.readdir(path.join(basePath, 'node_modules'), async (err, node_modules) => ***REMOVED***
      // get all email providers
      const emails = _.filter(node_modules, (node_module) => ***REMOVED***
        return _.startsWith(node_module, ('strapi-email'));
***REMOVED***);

      // mount all providers to get configs
      _.forEach(emails, (node_module) => ***REMOVED***
        strapi.plugins.email.config.providers.push(
          require(path.join(`$***REMOVED***basePath***REMOVED***/node_modules/$***REMOVED***node_module***REMOVED***`))
        );
***REMOVED***);

      try ***REMOVED***
        // if provider config not exist set one by default
        const config = await pluginStore.get(***REMOVED***key: 'provider'***REMOVED***);

        if (!config) ***REMOVED***
          const provider = _.find(strapi.plugins.email.config.providers, ***REMOVED***provider: 'sendmail'***REMOVED***);

          const value = _.assign(***REMOVED******REMOVED***, provider, ***REMOVED***
            // TODO: set other default settings here
    ***REMOVED***);

          await pluginStore.set(***REMOVED***key: 'provider', value***REMOVED***);
  ***REMOVED***
***REMOVED*** catch (err) ***REMOVED***
        strapi.log.error(`Can't load $***REMOVED***config.provider***REMOVED*** email provider.`);
        strapi.log.warn(`Please install strapi-email-$***REMOVED***config.provider***REMOVED*** --save in $***REMOVED***path.join(strapi.config.appPath, 'plugins', 'email')***REMOVED*** folder.`);
        strapi.stop();
***REMOVED***

      cb();
***REMOVED***);
***REMOVED***;

  // Load providers from the plugins' node_modules.
  loadProviders(path.join(strapi.config.appPath, 'plugins', 'email'), () => ***REMOVED***
    // Load providers from the root node_modules.
    loadProviders(path.join(strapi.config.appPath), cb);
***REMOVED***);

***REMOVED***;
