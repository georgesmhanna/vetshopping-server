'use strict';

/**
 * Email.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');

const createDefaultEnvConfig = async (env) => ***REMOVED***
  const pluginStore = strapi.store(***REMOVED***
    environment: env,
    type: 'plugin',
    name: 'email'
***REMOVED***);

  const provider = _.find(strapi.plugins.email.config.providers, ***REMOVED***provider: 'sendmail'***REMOVED***);
  const value = _.assign(***REMOVED******REMOVED***, provider, ***REMOVED******REMOVED***);

  await pluginStore.set(***REMOVED***key: 'provider', value***REMOVED***);
  return await strapi.store(***REMOVED***
    environment: env,
    type: 'plugin',
    name: 'email'
***REMOVED***).get(***REMOVED***key: 'provider'***REMOVED***);
***REMOVED***;

const getProviderConfig = async (env) => ***REMOVED***
  let config = await strapi.store(***REMOVED***
    environment: env,
    type: 'plugin',
    name: 'email'
***REMOVED***).get(***REMOVED***key: 'provider'***REMOVED***);

  if(!config) ***REMOVED***
    config = await createDefaultEnvConfig(env);
***REMOVED***

  return config;
***REMOVED***;

module.exports = ***REMOVED***
  getProviderConfig,
  send: async (options, config, cb) => ***REMOVED***
    console.log(`email options are $***REMOVED***JSON.stringify(options)***REMOVED***`);
    console.log(`email config are $***REMOVED***JSON.stringify(config)***REMOVED***`);
    // Get email provider settings to configure the provider to use.
    if(!config) ***REMOVED***
      config = await getProviderConfig(strapi.config.environment);
***REMOVED***

    const provider = _.find(strapi.plugins.email.config.providers, ***REMOVED*** provider: config.provider ***REMOVED***);

    if (!provider) ***REMOVED***
      throw new Error(`The provider package isn't installed. Please run \`npm install strapi-email-$***REMOVED***config.provider***REMOVED***\``);
***REMOVED***

    const actions = provider.init(config);

    // Execute email function of the provider for all files.
    return actions.send(options, cb);
***REMOVED***
***REMOVED***;
