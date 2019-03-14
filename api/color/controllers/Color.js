'use strict';

/**
 * Color.js controller
 *
 * @description: A set of functions called "actions" for managing `Color`.
 */

module.exports = {

  /**
   * Retrieve color records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.color.search(ctx.query);
    } else {
      return strapi.services.color.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a color record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.color.fetch(ctx.params);
  },

  /**
   * Count color records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.color.count(ctx.query);
  },

  /**
   * Create a/an color record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.color.add(ctx.request.body);
  },

  /**
   * Update a/an color record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.color.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an color record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.color.remove(ctx.params);
  }
};
