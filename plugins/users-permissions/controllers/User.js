'use strict';

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const _ = require('lodash');

module.exports = ***REMOVED***

  /**
   * Retrieve user records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    let data = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query);
    data.reduce((acc, user) => ***REMOVED***
      acc.push(_.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken']));
      return acc;
***REMOVED***, []);

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***,

  /**
   * Retrieve authenticated user.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  me: async (ctx) => ***REMOVED***
    const user = ctx.state.user;

    if (!user) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'No authorization header was found' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    const data = _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken']);

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***,

  /**
   * Retrieve a user record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    let data = await strapi.plugins['users-permissions'].services.user.fetch(ctx.params);

    if (data) ***REMOVED***
      data = _.omit(data.toJSON ? data.toJSON() : data, ['password', 'resetPasswordToken']);
***REMOVED***

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***,

  /**
   * Create a/an user record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    const advanced = await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'advanced'
***REMOVED***).get();

    if (advanced.unique_email && ctx.request.body.email) ***REMOVED***
      const user = await strapi.query('user', 'users-permissions').findOne(***REMOVED*** email: ctx.request.body.email ***REMOVED***);

      if (user) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.taken', field: ['email'] ***REMOVED***] ***REMOVED***] : 'Email is already taken.');
***REMOVED***
***REMOVED***

    if (!ctx.request.body.role) ***REMOVED***
      const defaultRole = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: advanced.default_role ***REMOVED***, []);

      ctx.request.body.role = defaultRole._id || defaultRole.id;
***REMOVED***

    try ***REMOVED***
      const data = await strapi.plugins['users-permissions'].services.user.add(ctx.request.body);
      // Send 201 `created`
      ctx.created(data);
***REMOVED*** catch(error) ***REMOVED***
      ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: error.message, field: error.field ***REMOVED***] ***REMOVED***] : error.message);
***REMOVED***
***REMOVED***,

  /**
   * Update a/an user record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx) => ***REMOVED***
    try ***REMOVED***
      const advancedConfigs = await strapi.store(***REMOVED***
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced'
***REMOVED***).get();

      if (advancedConfigs.unique_email && ctx.request.body.email) ***REMOVED***
        const users = await strapi.plugins['users-permissions'].services.user.fetchAll(***REMOVED*** email: ctx.request.body.email ***REMOVED***);

        if (users && _.find(users, user => (user.id || user._id).toString() !== ctx.params.id)) ***REMOVED***
          return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.taken', field: ['email'] ***REMOVED***] ***REMOVED***] : 'Email is already taken.');
  ***REMOVED***
***REMOVED***

      const user = await strapi.plugins['users-permissions'].services.user.fetch(ctx.params);

      if (_.get(ctx.request, 'body.password') === user.password) ***REMOVED***
        delete ctx.request.body.password;
***REMOVED***

      if (_.get(ctx.request, 'body.role', '').toString() === '0' && (!_.get(ctx.state, 'user.role') || _.get(ctx.state, 'user.role', '').toString() !== '0')) ***REMOVED***
        delete ctx.request.body.role;
***REMOVED***

      if (ctx.request.body.email && advancedConfigs.unique_email) ***REMOVED***
        const user = await strapi.query('user', 'users-permissions').findOne(***REMOVED***
          email: ctx.request.body.email
  ***REMOVED***);

        if (user !== null && (user.id || user._id).toString() !== ctx.params.id) ***REMOVED***
          return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.taken', field: ['email'] ***REMOVED***] ***REMOVED***] : 'Email is already taken.');
  ***REMOVED***
***REMOVED***

      const data = await strapi.plugins['users-permissions'].services.user.edit(ctx.params, ctx.request.body) ;

      // Send 200 `ok`
      ctx.send(data);
***REMOVED*** catch(error) ***REMOVED***
      ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: error.message, field: error.field ***REMOVED***] ***REMOVED***] : error.message);
***REMOVED***
***REMOVED***,

  /**
   * Destroy a/an user record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx) => ***REMOVED***
    const data = await strapi.plugins['users-permissions'].services.user.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***,

  destroyAll: async (ctx) => ***REMOVED***
    const data = await strapi.plugins['users-permissions'].services.user.removeAll(ctx.params, ctx.request.query);

    // Send 200 `ok`
    ctx.send(data);
***REMOVED***
***REMOVED***;
