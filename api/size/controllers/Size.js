'use strict';

/**
 * Size.js controller
 *
 * @description: A set of functions called "actions" for managing `Size`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve size records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.size.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.size.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a size record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.size.fetch(ctx.params);
***REMOVED***,

  /**
   * Count size records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.size.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an size record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.size.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an size record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.size.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an size record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.size.remove(ctx.params);
***REMOVED***
***REMOVED***;
