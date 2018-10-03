'use strict';

/**
 * Product.js controller
 *
 * @description: A set of functions called "actions" for managing `Product`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve product records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.product.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.product.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a product record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.product.fetch(ctx.params);
***REMOVED***,

  /**
   * Count product records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.product.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an product record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.product.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an product record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.product.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an product record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.product.remove(ctx.params);
***REMOVED***
***REMOVED***;
