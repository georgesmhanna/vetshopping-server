'use strict';

/**
 * Wishlist.js controller
 *
 * @description: A set of functions called "actions" for managing `Wishlist`.
 */

module.exports = {

  /**
   * Retrieve wishlist records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.wishlist.search(ctx.query);
    } else {
      return strapi.services.wishlist.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a wishlist record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.wishlist.fetch(ctx.params);
  },

  /**
   * Count wishlist records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.wishlist.count(ctx.query);
  },

  /**
   * Create a/an wishlist record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.wishlist.add(ctx.request.body);
  },

  /**
   * Update a/an wishlist record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.wishlist.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an wishlist record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.wishlist.remove(ctx.params);
  },

  addToWishlist: async (ctx, next) => {
    // find if there is wishlist for user if there is not --> create one, add product id inside, return it
    // if there is --> make sure that the product doesnt exist if it does, return that the product exists
    // if it doesnt, add it to the list of products inside the wishlist

    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('product id is not valid');
    }

    if (!await strapi.services.product.fetch({_id: ctx.request.body.productid})) {  // if the product does not exist in the db
      return ctx.notFound('Product not found');
    }
    let wishlist = await strapi.services.wishlist.fetch({user: ctx.state.user._id});   // get the wishlist of the loggedin user
    if (!wishlist) {  // if the wishlist does not exist, create one
      wishlist = {};
      wishlist.user = ctx.state.user._id;
      wishlist.products = [];
      wishlist.products.push(ctx.request.body.productid);
      const addedWl = await strapi.services.wishlist.add(wishlist);
      return strapi.services.wishlist.fetch({_id: addedWl._id});
    } // if wishlist exists, check if the product exists already in the wishlist
    if (wishlist.products && wishlist.products.find(product => product._id == ctx.request.body.productid)) {
      return ctx.notFound('The product already exists in this wishlist');
    } // if it doesn't exist, add it to the list of products
    if (wishlist.products)
      wishlist.products.push(ctx.request.body.productid);
    else {
      wishlist.products = [];
      wishlist.products.push(ctx.request.body.productid);
    }
    // and finally we push the new wishlist to the mongo db :)))
    await strapi.services.wishlist.edit({_id: wishlist._id}, wishlist);
    return strapi.services.wishlist.fetch({_id: wishlist._id});

  },

  removeFromWishlist: async (ctx, next) => {
    // find if there is wishlist for user if there is not --> return an error
    // if there is --> make sure that the product  exists if it does, return that the product exists
    // if it doesnt, add it to the list of products inside the wishlist

    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound();
    }

    if (!await strapi.services.product.fetch({_id: ctx.request.body.productid})) {  // if the product does not exist in the db
      return ctx.notFound('Product not found');
    }
    let wishlist = await strapi.services.wishlist.fetch({user: ctx.state.user._id});   // get the wishlist of the loggedin user
    if (!wishlist) {  // if the wishlist does not exist, create one
      return ctx.notFound('Wishlist could not be retrieved');
    } // if wishlist exists, check if the product does not exist in the wishlist
    if ((wishlist.products && !wishlist.products.find(product => product._id == ctx.request.body.productid)) || !wishlist.products) {
      return ctx.badRequest('The product does not belong to the wishlist');
    } // if it  exists, remove it from the list of products

    wishlist.products = wishlist.products.filter(product => product.id != ctx.request.body.productid);

    // and finally we push the new wishlist to the mongo db :)))
    await strapi.services.wishlist.edit({_id: wishlist._id}, wishlist);
    return strapi.services.wishlist.fetch({_id: wishlist._id});

  },

  getCurrentWishlist: async (ctx) => {

    return strapi.services.wishlist.fetch({user: ctx.state.user._id});

  },
};
