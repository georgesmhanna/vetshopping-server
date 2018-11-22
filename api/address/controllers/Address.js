'use strict';

/**
 * Address.js controller
 *
 * @description: A set of functions called "actions" for managing `Address`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve address records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.address.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.address.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a address record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.address.fetch(ctx.params);
***REMOVED***,

  getCurrentAddress: async (ctx) => ***REMOVED***

    return strapi.services.address.fetch(***REMOVED***user: ctx.state.user._id***REMOVED***);

***REMOVED***,

  /**
   * Count address records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.address.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an address record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.address.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an address record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.address.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an address record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.address.remove(ctx.params);
***REMOVED***
***REMOVED***;
