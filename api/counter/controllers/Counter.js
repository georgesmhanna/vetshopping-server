'use strict';

/**
 * Counter.js controller
 *
 * @description: A set of functions called "actions" for managing `Counter`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve counter records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.counter.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.counter.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a counter record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.counter.fetch(ctx.params);
***REMOVED***,

  /**
   * Count counter records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.counter.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an counter record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.counter.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an counter record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.counter.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an counter record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.counter.remove(ctx.params);
***REMOVED***
***REMOVED***;
