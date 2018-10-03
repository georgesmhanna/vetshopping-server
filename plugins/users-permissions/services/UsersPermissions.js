'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const request = require('request');

/**
 * UsersPermissions.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = ***REMOVED***
  createRole: async (params) => ***REMOVED***
    if (!strapi.plugins['content-manager']) ***REMOVED***
      return new Error('This feature requires to install the Content Manager plugin');
***REMOVED***

    if (!params.type) ***REMOVED***
      params.type = _.snakeCase(_.deburr(_.toLower(params.name)));
***REMOVED***

    const role = await strapi.query('role', 'users-permissions').create(_.omit(params, ['users', 'permissions']));

    const arrayOfPromises = Object.keys(params.permissions).reduce((acc, type) => ***REMOVED***
      Object.keys(params.permissions[type].controllers).forEach(controller => ***REMOVED***
        Object.keys(params.permissions[type].controllers[controller]).forEach(action => ***REMOVED***
          acc.push(strapi.query('permission', 'users-permissions').addPermission(***REMOVED***
            role: role._id || role.id,
            type,
            controller,
            action: action.toLowerCase(),
            ...params.permissions[type].controllers[controller][action]
    ***REMOVED***));
  ***REMOVED***);
***REMOVED***);

      return acc;
***REMOVED***, []);

    // Use Content Manager business logic to handle relation.
    arrayOfPromises.push(strapi.plugins['content-manager'].services['contentmanager'].edit(***REMOVED***
      id: role._id || role.id,
      model: 'role'
***REMOVED***, ***REMOVED***
      users: params.users
***REMOVED***, 'users-permissions'));

    return await Promise.all(arrayOfPromises);
***REMOVED***,

  deleteRole: async (roleID, publicRoleID) => ***REMOVED***
    const role = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** id: roleID ***REMOVED***, ['users', 'permissions']);

    if (!role) ***REMOVED***
      throw new Error('Cannot found this role');
***REMOVED***

    if (role.type === 'root') ***REMOVED***
      return new Error(`You cannot delete the root admin role.`);
***REMOVED***

    // Move users to guest role.
    const arrayOfPromises = role.users.reduce((acc, user) => ***REMOVED***
      acc.push(strapi.query('user', 'users-permissions').update(***REMOVED***
        id: user._id || user.id
***REMOVED*** ***REMOVED***
        role: publicRoleID
***REMOVED***));

      return acc;
***REMOVED***, []);

    // Remove permissions related to this role.
    role.permissions.forEach(permission => ***REMOVED***
      arrayOfPromises.push(strapi.query('permission', 'users-permissions').delete(***REMOVED***
        id: permission._id || permission.id
***REMOVED***));
***REMOVED***);

    // Delete the role.
    arrayOfPromises.push(strapi.query('role', 'users-permissions').delete(***REMOVED***
      id: roleID
***REMOVED***));

    return await Promise.all(arrayOfPromises);
***REMOVED***,

  getPlugins: (plugin, lang = 'en') => ***REMOVED***
    return new Promise((resolve) => ***REMOVED***
      request(***REMOVED***
        uri: `https://marketplace.strapi.io/plugins?lang=$***REMOVED***lang***REMOVED***`,
        json: true,
        headers: ***REMOVED***
          'cache-control': 'max-age=3600'
  ***REMOVED***
***REMOVED*** (err, response, body) => ***REMOVED***
        if (err) ***REMOVED***
          return resolve([]);
  ***REMOVED***

        resolve(body);
***REMOVED***);
***REMOVED***);
***REMOVED***,

  getActions: (plugins = [], withInfo = true) => ***REMOVED***
    const generateActions = (data) => (
      Object.keys(data).reduce((acc, key) => ***REMOVED***
        if (_.isFunction(data[key])) ***REMOVED***
          acc[key] = ***REMOVED*** enabled: false, policy: '' ***REMOVED***;
  ***REMOVED***

        return acc;
***REMOVED*** ***REMOVED******REMOVED***));

    const appControllers = Object.keys(strapi.api || ***REMOVED******REMOVED***).reduce((acc, key) => ***REMOVED***
      Object.keys(strapi.api[key].controllers).forEach((controller) => ***REMOVED***
        acc.controllers[controller] = generateActions(strapi.api[key].controllers[controller]);
***REMOVED***);

      return acc;
***REMOVED***, ***REMOVED*** controllers: ***REMOVED******REMOVED*** ***REMOVED***);

    const pluginsPermissions = Object.keys(strapi.plugins).reduce((acc, key) => ***REMOVED***
      const initialState = ***REMOVED***
        controllers: ***REMOVED******REMOVED***
***REMOVED***;

      if (withInfo) ***REMOVED***
        initialState.information = plugins.find(plugin => plugin.id === key) || ***REMOVED******REMOVED***;
***REMOVED***

      acc[key] = Object.keys(strapi.plugins[key].controllers).reduce((obj, k) => ***REMOVED***
        obj.controllers[k] = generateActions(strapi.plugins[key].controllers[k]);

        return obj;

***REMOVED*** initialState);

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    const permissions = ***REMOVED***
      application: ***REMOVED***
        controllers: appControllers.controllers,
***REMOVED***
***REMOVED***;

    return _.merge(permissions, pluginsPermissions);
***REMOVED***,

  getRole: async (roleID, plugins) => ***REMOVED***
    const role = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** id: roleID ***REMOVED***, ['users', 'permissions']);

    if (!role) ***REMOVED***
      throw new Error('Cannot found this role');
***REMOVED***

    // Group by `type`.
    role.permissions = role.permissions.reduce((acc, permission) => ***REMOVED***
      _.set(acc, `$***REMOVED***permission.type***REMOVED***.controllers.$***REMOVED***permission.controller***REMOVED***.$***REMOVED***permission.action***REMOVED***`, ***REMOVED***
        enabled: _.toNumber(permission.enabled) == true,
        policy: permission.policy
***REMOVED***);

      if (permission.type !== 'application' && !acc[permission.type].information) ***REMOVED***
        acc[permission.type].information = plugins.find(plugin => plugin.id === permission.type) || ***REMOVED******REMOVED***;
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    return role;
***REMOVED***,

  getRoles: async () => ***REMOVED***
    const roles = await strapi.query('role', 'users-permissions').find(***REMOVED*** sort: 'name' ***REMOVED***, []);

    for (let i = 0; i < roles.length; ++i) ***REMOVED***
      roles[i].id = roles[i].id || roles[i]._id;
      roles[i].nb_users = await strapi.query('user', 'users-permissions').count(***REMOVED*** role: roles[i].id ***REMOVED***);
***REMOVED***

    return roles;
***REMOVED***,

  getRoutes: async () => ***REMOVED***
    const routes = Object.keys(strapi.api || ***REMOVED******REMOVED***).reduce((acc, current) => ***REMOVED***
      return acc.concat(_.get(strapi.api[current].config, 'routes', []));
***REMOVED***, []);

    const pluginsRoutes = Object.keys(strapi.plugins || ***REMOVED******REMOVED***).reduce((acc, current) => ***REMOVED***
      acc[current] = _.get(strapi.plugins[current].config, 'routes', []);

      return acc;
***REMOVED***, []);

    return _.merge(***REMOVED*** application: routes ***REMOVED***, pluginsRoutes);
***REMOVED***,

  updatePermissions: async function (cb) ***REMOVED***
    // fetch all the current permissions from the database, and format them into an array of actions.
    const databasePermissions = await strapi.query('permission', 'users-permissions').find();
    const actions = databasePermissions
      .map(permission => `$***REMOVED***permission.type***REMOVED***.$***REMOVED***permission.controller***REMOVED***.$***REMOVED***permission.action***REMOVED***`);


    // Aggregate first level actions.
    const appActions = Object.keys(strapi.api || ***REMOVED******REMOVED***).reduce((acc, api) => ***REMOVED***
      Object.keys(_.get(strapi.api[api], 'controllers', ***REMOVED******REMOVED***))
        .map(controller => ***REMOVED***
          const actions = Object.keys(strapi.api[api].controllers[controller])
            .filter(action => _.isFunction(strapi.api[api].controllers[controller][action]))
            .map(action => `application.$***REMOVED***controller***REMOVED***.$***REMOVED***action.toLowerCase()***REMOVED***`);

          acc = acc.concat(actions);
  ***REMOVED***);

      return acc;
***REMOVED***, []);

    // Aggregate plugins' actions.
    const pluginsActions = Object.keys(strapi.plugins).reduce((acc, plugin) => ***REMOVED***
      Object.keys(strapi.plugins[plugin].controllers)
        .map(controller => ***REMOVED***
          const actions = Object.keys(strapi.plugins[plugin].controllers[controller])
            .filter(action => _.isFunction(strapi.plugins[plugin].controllers[controller][action]))
            .map(action => `$***REMOVED***plugin***REMOVED***.$***REMOVED***controller***REMOVED***.$***REMOVED***action.toLowerCase()***REMOVED***`);

          acc = acc.concat(actions);
  ***REMOVED***);

      return acc;
***REMOVED***, []);

    // Merge array into one.
    const currentActions = appActions.concat(pluginsActions);
    // Count permissions available.
    const permissions = databasePermissions.length;

    // Compare to know if actions have been added or removed from controllers.
    if (!_.isEqual(actions, currentActions) || permissions < 1) ***REMOVED***
      const splitted = (str) => ***REMOVED***
        const [type, controller, action] = str.split('.');

        return ***REMOVED*** type, controller, action ***REMOVED***;
***REMOVED***;

      const defaultPolicy = (obj, role) => ***REMOVED***
        const isCallback = obj.action === 'callback' && obj.controller === 'auth' && obj.type === 'users-permissions' && role.type === 'public';
        const isConnect = obj.action === 'connect' && obj.controller === 'auth' && obj.type === 'users-permissions';
        const isPassword = obj.action === 'forgotpassword' && obj.controller === 'auth' && obj.type === 'users-permissions' && role.type === 'public';
        const isRegister = obj.action === 'register' && obj.controller === 'auth' && obj.type === 'users-permissions' && role.type === 'public';
        const isConfirmation = obj.action === 'emailconfirmation' && obj.controller === 'auth' && obj.type === 'users-permissions' && role.type === 'public';
        const isNewPassword = obj.action === 'changepassword' && obj.controller === 'auth' && obj.type === 'users-permissions' && role.type === 'public';
        const isInit = obj.action === 'init' && obj.controller === 'userspermissions';
        const isMe = obj.action === 'me' && obj.controller === 'user' && obj.type === 'users-permissions';
        const isReload = obj.action === 'autoreload';
        const enabled = isCallback || isRegister || role.type === 'root' || isInit || isPassword || isNewPassword || isMe || isReload || isConnect || isConfirmation;

        return Object.assign(obj, ***REMOVED*** enabled, policy: '' ***REMOVED***);
***REMOVED***;

      // Retrieve roles
      const roles = await strapi.query('role', 'users-permissions').find();

      // We have to know the difference to add or remove
      // the permissions entries in the database.
      const toRemove = _.difference(actions, currentActions).map(splitted);
      const toAdd = (permissions < 1 ? currentActions : _.difference(currentActions, actions))
        .map(splitted);

      // Execute request to update entries in database for each role.
      await Promise.all(
        roles.map(role =>
          Promise.all(
            toAdd
              .map(action => defaultPolicy(action, role))
              .map(action => strapi.query('permission', 'users-permissions')
                .addPermission(Object.assign(action, ***REMOVED*** role: role.id || role._id ***REMOVED***))
              )
          )
        ).concat([
          Promise.all(toRemove.map(action => strapi.query('permission', 'users-permissions').removePermission(action)))
        ])
      );

      return this.writeActions(currentActions, cb);
***REMOVED***

    cb();
***REMOVED***,

  removeDuplicate: async function () ***REMOVED***
    const primaryKey = strapi.query('permission', 'users-permissions').primaryKey;

    // Retrieve permissions by creation date (ID or ObjectID).
    const permissions = await strapi.query('permission', 'users-permissions').find(***REMOVED***
      sort: `$***REMOVED***primaryKey***REMOVED***`
***REMOVED***);

    const value = permissions.reduce((acc, permission) => ***REMOVED***
      const index = acc.toKeep.findIndex(element => element === `$***REMOVED***permission.type***REMOVED***.controllers.$***REMOVED***permission.controller***REMOVED***.$***REMOVED***permission.action***REMOVED***.$***REMOVED***permission.role[primaryKey]***REMOVED***`);

      if (index === -1) ***REMOVED***
        acc.toKeep.push(`$***REMOVED***permission.type***REMOVED***.controllers.$***REMOVED***permission.controller***REMOVED***.$***REMOVED***permission.action***REMOVED***.$***REMOVED***permission.role[primaryKey]***REMOVED***`);
***REMOVED*** else ***REMOVED***
        acc.toRemove.push(permission[primaryKey]);
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED***
      toKeep: [],
      toRemove: []
***REMOVED***);

    return strapi.query('permission', 'users-permissions').deleteMany(***REMOVED***
      [primaryKey]: value.toRemove
***REMOVED***);
***REMOVED***,

  initialize: async function (cb) ***REMOVED***
    const roles = await strapi.query('role', 'users-permissions').count();

    // It has already been initialized.
    if (roles > 0) ***REMOVED***
      return await this.updatePermissions(async () => ***REMOVED***
        await this.removeDuplicate();
        cb();
***REMOVED***);
***REMOVED***

    // Create two first default roles.
    await Promise.all([
      strapi.query('role', 'users-permissions').create(***REMOVED***
        name: 'Administrator',
        description: 'These users have all access in the project.',
        type: 'root'
***REMOVED***),
      strapi.query('role', 'users-permissions').create(***REMOVED***
        name: 'Authenticated',
        description: 'Default role given to authenticated user.',
        type: 'authenticated'
***REMOVED***),
      strapi.query('role', 'users-permissions').create(***REMOVED***
        name: 'Public',
        description: 'Default role given to unauthenticated user.',
        type: 'public'
***REMOVED***)
    ]);

    await this.updatePermissions(cb);
***REMOVED***,

  updateRole: async function (roleID, body) ***REMOVED***
    const [role, root, authenticated] = await Promise.all([
      this.getRole(roleID, []),
      strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'root' ***REMOVED***, []),
      strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'authenticated' ***REMOVED***, [])
    ]);

    const arrayOfPromises = Object.keys(body.permissions).reduce((acc, type) => ***REMOVED***
      Object.keys(body.permissions[type].controllers).forEach(controller => ***REMOVED***
        Object.keys(body.permissions[type].controllers[controller]).forEach(action => ***REMOVED***
          const bodyAction = body.permissions[type].controllers[controller][action];
          const currentAction = _.get(role.permissions, `$***REMOVED***type***REMOVED***.controllers.$***REMOVED***controller***REMOVED***.$***REMOVED***action***REMOVED***`, ***REMOVED******REMOVED***);

          if (_.differenceWith([bodyAction], [currentAction]).length > 0) ***REMOVED***
            acc.push(strapi.query('permission', 'users-permissions').update(***REMOVED***
              role: roleID,
              type,
              controller,
              action: action.toLowerCase()
      ***REMOVED*** bodyAction));
    ***REMOVED***
  ***REMOVED***);
***REMOVED***);

      return acc;
***REMOVED***, []);

    arrayOfPromises.push(strapi.query('role', 'users-permissions').update(***REMOVED***
      id: roleID,
***REMOVED***, _.pick(body, ['name', 'description'])));

    // stringify mongoDB _id for add/remove matching
    if (role._id ? '_id' : 'id' === '_id') ***REMOVED***
      role.users.reduce((acc, user) => ***REMOVED***
        const key = role._id ? '_id' : 'id';
        user[key] = user[key].toString();
        acc.push(user);
        return acc;
***REMOVED*** []);
***REMOVED***

    // Add user to this role.
    _.differenceBy(body.users, role.users, role._id ? '_id' : 'id')
      .filter(user => user.role !== `$***REMOVED***root._id || root.id***REMOVED***`.toString())
      .forEach(user => ***REMOVED***
        arrayOfPromises.push(this.updateUserRole(user, roleID));
***REMOVED***);

    // Remove user to this role and link him to authenticated.
    _.differenceBy(role.users, body.users, role._id ? '_id' : 'id')
      .filter(user => user.role !== `$***REMOVED***root._id || root.id***REMOVED***`.toString())
      .forEach(user => ***REMOVED***
        arrayOfPromises.push(this.updateUserRole(user, authenticated._id || authenticated.id));
***REMOVED***);


    return Promise.all(arrayOfPromises);
***REMOVED***,

  updateUserRole: async (user, role) => ***REMOVED***
    return strapi.query('user', 'users-permissions').update(***REMOVED***
      id: user._id || user.id
***REMOVED***, ***REMOVED***
      role: role.toString()
***REMOVED***);
***REMOVED***,

  writeActions: (data, cb) => ***REMOVED***
    const actionsPath = path.join(strapi.config.appPath, 'plugins', 'users-permissions', 'config', 'actions.json');

    try ***REMOVED***
      // Disable auto-reload.
      strapi.reload.isWatching = false;
      // Rewrite actions.json file.
      fs.writeFileSync(actionsPath, JSON.stringify(***REMOVED*** actions: data ***REMOVED***), 'utf8');
      // Set value to AST to avoid restart.
      _.set(strapi.plugins['users-permissions'], 'config.actions', data);
      // Disable auto-reload.
      strapi.reload.isWatching = true;

      cb();
***REMOVED*** catch(err) ***REMOVED***
      strapi.log.error(err);
***REMOVED***
***REMOVED***,

  template: (layout, data) => ***REMOVED***
    const compiledObject = _.template(layout);
    return compiledObject(data);
***REMOVED***
***REMOVED***;
