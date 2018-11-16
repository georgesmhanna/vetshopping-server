'use strict';

/**
 * Orderitem.js controller
 *
 * @description: A set of functions called "actions" for managing `Orderitem`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve orderitem records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.orderitem.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.orderitem.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a orderitem record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.orderitem.fetch(ctx.params);
***REMOVED***,

  /**
   * Count orderitem records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.orderitem.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an orderitem record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.orderitem.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an orderitem record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.orderitem.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an orderitem record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.orderitem.remove(ctx.params);
***REMOVED***
***REMOVED***;
