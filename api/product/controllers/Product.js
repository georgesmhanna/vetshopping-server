'use strict';

/**
 * Product.js controller
 *
 * @description: A set of functions called "actions" for managing `Product`.
 */

module.exports = {

  /**
   * Retrieve product records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.product.search(ctx.query);
    } else {
      return strapi.services.product.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a product record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.product.fetch(ctx.params);
  },


  findOneByCategory: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    let products = [];
    const categoryProducts = await strapi.services.product.fetchAll({category: ctx.params._id});
    products.push(...categoryProducts);
    let subcategories = await strapi.services.category.fetchSubCategories(ctx.params);
    for (const sc of subcategories) {
      const currentProducts = await strapi.services.product.fetchAll({category: sc._id});
      if (currentProducts && currentProducts.length > 0) {
        products.push(...currentProducts);
      }
      if (sc.hasSubCategory) {
        let subsubcategories = await strapi.services.category.fetchSubCategories(sc._id);
        for (const ssc of subsubcategories) {
          const currentSSCProducts = await strapi.services.product.fetchAll({category: ssc._id});
          if (currentSSCProducts && currentSSCProducts.length > 0) {
            products.push(...currentSSCProducts);
          }
          if (ssc.hasSubCategory) {
            let finalcategories = await strapi.services.category.fetchSubCategories(ssc._id);
            for (const fc of finalcategories) {
              const fProducts = await strapi.services.product.fetchAll({category: fc._id});
              if (fProducts && fProducts.length > 0) {
                products.push(...fProducts);
              }
            }
          }
        }
      }
    }
    return products;
  },
  /**
   * Count product records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.product.count(ctx.query);
  },

  /**
   * Create a/an product record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.product.add(ctx.request.body);
  },

  /**
   * Update a/an product record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.product.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an product record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.product.remove(ctx.params);
  }
};
