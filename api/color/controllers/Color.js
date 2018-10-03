'use strict';

/**
 * Color.js controller
 *
 * @description: A set of functions called "actions" for managing `Color`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve color records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.color.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.color.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a color record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.color.fetch(ctx.params);
***REMOVED***,

  /**
   * Count color records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.color.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an color record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.color.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an color record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.color.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an color record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.color.remove(ctx.params);
***REMOVED***
***REMOVED***;
