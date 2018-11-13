'use strict';

/**
 * Brand.js controller
 *
 * @description: A set of functions called "actions" for managing `Brand`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve brand records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.brand.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.brand.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a brand record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.brand.fetch(ctx.params);
***REMOVED***,

  /**
   * Count brand records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.brand.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an brand record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.brand.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an brand record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.brand.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an brand record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.brand.remove(ctx.params);
***REMOVED***
***REMOVED***;
