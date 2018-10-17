'use strict';

/**
 * Wishlist.js controller
 *
 * @description: A set of functions called "actions" for managing `Wishlist`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve wishlist records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.wishlist.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.wishlist.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.wishlist.fetch(ctx.params);
***REMOVED***,

  /**
   * Count wishlist records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.wishlist.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.wishlist.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.wishlist.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.wishlist.remove(ctx.params);
***REMOVED***
***REMOVED***;
