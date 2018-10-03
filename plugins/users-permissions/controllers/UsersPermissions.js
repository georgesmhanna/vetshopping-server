'use strict';

/**
 * UsersPermissions.js controller
 *
 * @description: A set of functions called "actions" of the `users-permissions` plugin.
 */

const _ = require('lodash');

module.exports = ***REMOVED***

  /**
   * Default action.
   *
   * @return ***REMOVED***Object***REMOVED***
   */
  createRole: async (ctx) => ***REMOVED***
    if (_.isEmpty(ctx.request.body)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Cannot be empty' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    try ***REMOVED***
      await strapi.plugins['users-permissions'].services.userspermissions.createRole(ctx.request.body);

      ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occured' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  deleteProvider: async ctx => ***REMOVED***
    const ***REMOVED*** provider ***REMOVED*** = ctx.params;

    if (!provider) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Bad request' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    // TODO handle dynamic
    ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED***,

  deleteRole: async ctx => ***REMOVED***
    // Fetch root and public role.
    const [root, publicRole] = await Promise.all([
      strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'root' ***REMOVED***),
      strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'public' ***REMOVED***)
    ]);

    const rootID = root.id || root._id;
    const publicRoleID = publicRole.id || publicRole._id;

    const roleID = ctx.params.role;

    if (!roleID) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Bad request' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    // Prevent from removing the root role.
    if (roleID.toString() === rootID.toString() || roleID.toString() === publicRoleID.toString()) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Unauthorized' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    try ***REMOVED***
      await strapi.plugins['users-permissions'].services.userspermissions.deleteRole(roleID, publicRoleID);

      ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Bad request' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getPermissions: async (ctx) => ***REMOVED***
    try ***REMOVED***
      const ***REMOVED*** lang ***REMOVED*** = ctx.query;
      const plugins = await strapi.plugins['users-permissions'].services.userspermissions.getPlugins(lang);
      const permissions = await strapi.plugins['users-permissions'].services.userspermissions.getActions(plugins);

      ctx.send(***REMOVED*** permissions ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** message: [***REMOVED*** id: 'Not Found' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getPolicies: async (ctx) => ***REMOVED***
    ctx.send(***REMOVED***
      policies: _.without(_.keys(strapi.plugins['users-permissions'].config.policies), 'permissions')
***REMOVED***);
***REMOVED***,

  getRole: async (ctx) => ***REMOVED***
    const ***REMOVED*** id ***REMOVED*** = ctx.params;
    const ***REMOVED*** lang ***REMOVED*** = ctx.query;
    const plugins = await strapi.plugins['users-permissions'].services.userspermissions.getPlugins(lang);
    const role = await strapi.plugins['users-permissions'].services.userspermissions.getRole(id, plugins);

    if (_.isEmpty(role)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: `Role don't exist` ***REMOVED***] ***REMOVED***]);
***REMOVED***

    ctx.send(***REMOVED*** role ***REMOVED***);
***REMOVED***,

  getRoles: async (ctx) => ***REMOVED***
    try ***REMOVED***
      const roles = await strapi.plugins['users-permissions'].services.userspermissions.getRoles();

      ctx.send(***REMOVED*** roles ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Not found' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getRoutes: async (ctx) => ***REMOVED***
    try ***REMOVED***
      const routes = await strapi.plugins['users-permissions'].services.userspermissions.getRoutes();

      ctx.send(***REMOVED*** routes ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Not found' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  index: async (ctx) => ***REMOVED***
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send(***REMOVED***
      message: 'ok'
***REMOVED***);
***REMOVED***,

  init: async (ctx) => ***REMOVED***
    const role = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'root' ***REMOVED***, ['users']);

    ctx.send(***REMOVED*** hasAdmin: !_.isEmpty(role.users) ***REMOVED***);
***REMOVED***,

  searchUsers: async (ctx) => ***REMOVED***
    const data = await strapi.query('user', 'users-permissions').search(ctx.params);

    ctx.send(data);
***REMOVED***,

  updateRole: async function (ctx) ***REMOVED***
    // Fetch root role.
    const root = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'root' ***REMOVED***);

    const roleID = ctx.params.role;
    const rootID = root.id || root._id;

    // Prevent from updating the root role.
    if (roleID === rootID) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Unauthorized' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    if (_.isEmpty(ctx.request.body)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Bad request' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    try ***REMOVED***
      await strapi.plugins['users-permissions'].services.userspermissions.updateRole(roleID, ctx.request.body);

      ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED*** catch(error) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getEmailTemplate: async (ctx) => ***REMOVED***
    ctx.send(await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'email'
***REMOVED***).get());
***REMOVED***,

  updateEmailTemplate: async (ctx) => ***REMOVED***
    if (_.isEmpty(ctx.request.body)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Cannot be empty' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'email'
***REMOVED***).set(***REMOVED***value: ctx.request.body['email-templates']***REMOVED***);

    ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED***,

  getAdvancedSettings: async (ctx) => ***REMOVED***
    ctx.send(***REMOVED***
      settings: await strapi.store(***REMOVED***
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'advanced'
***REMOVED***).get(),
      roles: await strapi.plugins['users-permissions'].services.userspermissions.getRoles()
***REMOVED***);
***REMOVED***,

  updateAdvancedSettings: async (ctx) => ***REMOVED***
    if (_.isEmpty(ctx.request.body)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Cannot be empty' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'advanced'
***REMOVED***).set(***REMOVED***value: ctx.request.body***REMOVED***);

    ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED***,

  getProviders: async (ctx) => ***REMOVED***
    ctx.send(await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'grant'
***REMOVED***).get());
***REMOVED***,

  updateProviders: async (ctx) => ***REMOVED***
    if (_.isEmpty(ctx.request.body)) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'Cannot be empty' ***REMOVED***] ***REMOVED***]);
***REMOVED***

    await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'grant'
***REMOVED***).set(***REMOVED***value: ctx.request.body.providers***REMOVED***);

    ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED***
***REMOVED***;
