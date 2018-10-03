'use strict';

/**
 * Category.js controller
 *
 * @description: A set of functions called "actions" for managing `Category`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve category records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.category.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.category.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a category record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.category.fetch(ctx.params);
***REMOVED***,

  /**
   * Count category records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.category.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an category record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.category.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an category record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.category.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an category record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.category.remove(ctx.params);
***REMOVED***
***REMOVED***;
