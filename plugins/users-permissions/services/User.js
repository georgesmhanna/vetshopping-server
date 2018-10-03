'use strict';

/**
 * User.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const bcrypt = require('bcryptjs');

module.exports = ***REMOVED***
  /**
   * Promise to add a/an user.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  add: async (values) => ***REMOVED***
    if (values.password) ***REMOVED***
      values.password = await strapi.plugins['users-permissions'].services.user.hashPassword(values);
***REMOVED***

    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      return await strapi.plugins['content-manager'].services['contentmanager'].add(***REMOVED***
        model: 'user'
***REMOVED*** values, 'users-permissions');
***REMOVED***

    return strapi.query('user', 'users-permissions').create(values);
***REMOVED***,

  /**
   * Promise to edit a/an user.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  edit: async (params, values) => ***REMOVED***
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `***REMOVED*** new:true ***REMOVED***` option.
    if (values.password) ***REMOVED***
      values.password = await strapi.plugins['users-permissions'].services.user.hashPassword(values);
***REMOVED***

    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      params.model = 'user';
      params.id = (params._id || params.id);

      return await strapi.plugins['content-manager'].services['contentmanager'].edit(params, values, 'users-permissions');
***REMOVED***

    return strapi.query('user', 'users-permissions').update(_.assign(params, values));
***REMOVED***,

  /**
   * Promise to fetch a/an user.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  fetch: (params) => ***REMOVED***
    return strapi.query('user', 'users-permissions').findOne(_.pick(params, ['_id', 'id']));
***REMOVED***,

  /**
   * Promise to fetch all users.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  fetchAll: (params) => ***REMOVED***
    return strapi.query('user', 'users-permissions').find(strapi.utils.models.convertParams('user', params));
***REMOVED***,

  hashPassword: function (user = ***REMOVED******REMOVED***) ***REMOVED***
    return new Promise((resolve) => ***REMOVED***
      if (!user.password || this.isHashed(user.password)) ***REMOVED***
        resolve(null);
***REMOVED*** else ***REMOVED***
        bcrypt.hash(`$***REMOVED***user.password***REMOVED***`, 10, (err, hash) => ***REMOVED***
          resolve(hash);
  ***REMOVED***);
***REMOVED***
***REMOVED***);
***REMOVED***,

  isHashed: (password) => ***REMOVED***
    if (typeof password !== 'string' || !password) ***REMOVED***
      return false;
***REMOVED***

    return password.split('$').length === 4;
***REMOVED***,

  /**
   * Promise to remove a/an user.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  remove: async params => ***REMOVED***
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      params.model = 'user';
      params.id = (params._id || params.id);

      await strapi.plugins['content-manager'].services['contentmanager'].delete(params, ***REMOVED***source: 'users-permissions'***REMOVED***);
***REMOVED***

    return strapi.query('user', 'users-permissions').delete(params);
***REMOVED***,

  removeAll: async (params, query) => ***REMOVED***
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) ***REMOVED***
      params.model = 'user';
      query.source = 'users-permissions';

      return await strapi.plugins['content-manager'].services['contentmanager'].deleteMany(params, query);
***REMOVED***

    // TODO remove this logic when we develop plugins' dependencies
    const primaryKey = strapi.query('user', 'users-permissions').primaryKey;
    const toRemove = Object.keys(query).reduce((acc, curr) => ***REMOVED***
      if (curr !== 'source') ***REMOVED***
        return acc.concat([query[curr]]);
***REMOVED***

      return acc;
***REMOVED***, []);

    return strapi.query('user', 'users-permissions').deleteMany(***REMOVED***
      [primaryKey]: toRemove,
***REMOVED***);
***REMOVED***,

  validatePassword: (password, hash) => ***REMOVED***
    return bcrypt.compareSync(password, hash);
***REMOVED***
***REMOVED***;
