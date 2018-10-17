'use strict';

/**
 * Country.js controller
 *
 * @description: A set of functions called "actions" for managing `Country`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve country records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.country.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.country.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a country record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.country.fetch(ctx.params);
***REMOVED***,

  /**
   * Count country records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.country.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an country record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.country.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an country record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.country.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an country record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.country.remove(ctx.params);
***REMOVED***
***REMOVED***;
