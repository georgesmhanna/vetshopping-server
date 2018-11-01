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


  findOneByCategory: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***
    let products = [];
    const categoryProducts = await strapi.services.product.fetchAll(***REMOVED***category: ctx.params._id***REMOVED***);
    products.push(...categoryProducts);
    let subcategories = await strapi.services.category.fetchSubCategories(ctx.params);
    for (const sc of subcategories) ***REMOVED***
      const currentProducts = await strapi.services.product.fetchAll(***REMOVED***category: sc._id***REMOVED***);
      if (currentProducts && currentProducts.length > 0) ***REMOVED***
        products.push(...currentProducts);
***REMOVED***
      if (sc.hasSubCategory) ***REMOVED***
        let subsubcategories = await strapi.services.category.fetchSubCategories(sc._id);
        for (const ssc of subsubcategories) ***REMOVED***
          const currentSSCProducts = await strapi.services.product.fetchAll(***REMOVED***category: ssc._id***REMOVED***);
          if (currentSSCProducts && currentSSCProducts.length > 0) ***REMOVED***
            products.push(...currentSSCProducts);
    ***REMOVED***
          if (ssc.hasSubCategory) ***REMOVED***
            let finalcategories = await strapi.services.category.fetchSubCategories(ssc._id);
            for (const fc of finalcategories) ***REMOVED***
              const fProducts = await strapi.services.product.fetchAll(***REMOVED***category: fc._id***REMOVED***);
              if (fProducts && fProducts.length > 0) ***REMOVED***
                products.push(...fProducts);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
    return products;
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
