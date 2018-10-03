'use strict';

/**
 * Email.js controller
 *
 * @description: A set of functions called "actions" of the `email` plugin.
 */

const _ = require('lodash');

module.exports = ***REMOVED***
  send: async (ctx) => ***REMOVED***
    // Retrieve provider configuration.
    const config = await strapi.store(***REMOVED***
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'email'
***REMOVED***).get(***REMOVED*** key: 'provider' ***REMOVED***);

    // Verify if the file email is enable.
    if (config.enabled === false) ***REMOVED***
      strapi.log.error('Email is disabled');
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Email.status.disabled' ***REMOVED***] ***REMOVED***] : 'Emailis disabled');
***REMOVED***

    // Something is wrong
    if (ctx.status === 400) ***REMOVED***
      return;
***REMOVED***

    let options = ctx.request.body;

    await strapi.plugins.email.services.email.send(options, config);

    // Send 200 `ok`
    ctx.send(***REMOVED******REMOVED***);
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
    let config = await strapi.plugins.email.services.email.getProviderConfig(ctx.params.environment);

    ctx.send(***REMOVED***
      providers: strapi.plugins.email.config.providers,
      config
***REMOVED***);
***REMOVED***,

  updateSettings: async (ctx) => ***REMOVED***
    await strapi.store(***REMOVED***
      environment: ctx.params.environment,
      type: 'plugin',
      name: 'email'
***REMOVED***).set(***REMOVED***key: 'provider', value: ctx.request.body***REMOVED***);

    ctx.send(***REMOVED***ok: true***REMOVED***);
***REMOVED***,
***REMOVED***;
