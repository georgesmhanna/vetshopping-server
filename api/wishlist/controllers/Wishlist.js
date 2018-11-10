'use strict';

/**
 * Wishlist.js controller
 *
 * @description: A set of functions called "actions" for managing `Wishlist`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve wishlist records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.wishlist.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.wishlist.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.wishlist.fetch(ctx.params);
***REMOVED***,

  /**
   * Count wishlist records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.wishlist.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.wishlist.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.wishlist.edit(ctx.params, ctx.request.body);
***REMOVED***,

  /**
   * Destroy a/an wishlist record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.wishlist.remove(ctx.params);
***REMOVED***,

  addToWishlist: async (ctx, next) => ***REMOVED***
    // find if there is wishlist for user if there is not --> create one, add product id inside, return it
    // if there is --> make sure that the product doesnt exist if it does, return that the product exists
    // if it doesnt, add it to the list of products inside the wishlist

    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('blabla');
***REMOVED***

    if (!await strapi.services.product.fetch(***REMOVED***_id: ctx.request.body.productid***REMOVED***)) ***REMOVED***  // if the product does not exist in the db
      return ctx.notFound('Product not found');
***REMOVED***
    let wishlist = await strapi.services.wishlist.fetch(***REMOVED***user: ctx.state.user._id***REMOVED***);   // get the wishlist of the loggedin user
    if (!wishlist) ***REMOVED***  // if the wishlist does not exist, create one
      wishlist = ***REMOVED******REMOVED***;
      wishlist.user = ctx.state.user._id;
      wishlist.products = [];
      wishlist.products.push(ctx.request.body.productid);
      const addedWl = await strapi.services.wishlist.add(wishlist);
      return strapi.services.wishlist.fetch(***REMOVED***_id: addedWl._id***REMOVED***);
***REMOVED*** // if wishlist exists, check if the product exists already in the wishlist
    if (wishlist.products && wishlist.products.find(product => product._id == ctx.request.body.productid)) ***REMOVED***
      return ctx.notFound('The product already exists in this wishlist');
***REMOVED*** // if it doesn't exist, add it to the list of products
    if (wishlist.products)
      wishlist.products.push(ctx.request.body.productid);
    else ***REMOVED***
      wishlist.products = [];
      wishlist.products.push(ctx.request.body.productid);
***REMOVED***
    // and finally we push the new wishlist to the mongo db :)))
    await strapi.services.wishlist.edit(***REMOVED***_id: wishlist._id***REMOVED***, wishlist);
    return strapi.services.wishlist.fetch(***REMOVED***_id: wishlist._id***REMOVED***);

***REMOVED***,

  removeFromWishlist: async (ctx, next) => ***REMOVED***
    // find if there is wishlist for user if there is not --> return an error
    // if there is --> make sure that the product  exists if it does, return that the product exists
    // if it doesnt, add it to the list of products inside the wishlist

    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound();
***REMOVED***

    if (!await strapi.services.product.fetch(***REMOVED***_id: ctx.request.body.productid***REMOVED***)) ***REMOVED***  // if the product does not exist in the db
      return ctx.notFound('Product not found');
***REMOVED***
    let wishlist = await strapi.services.wishlist.fetch(***REMOVED***user: ctx.state.user._id***REMOVED***);   // get the wishlist of the loggedin user
    if (!wishlist) ***REMOVED***  // if the wishlist does not exist, create one
      return ctx.notFound('Wishlist could not be retrieved');
***REMOVED*** // if wishlist exists, check if the product does not exist in the wishlist
    if ((wishlist.products && !wishlist.products.find(product => product._id == ctx.request.body.productid)) || !wishlist.products) ***REMOVED***
      return ctx.badRequest('The product does not belong to the wishlist');
***REMOVED*** // if it  exists, remove it from the list of products

    wishlist.products = wishlist.products.filter(product => product.id != ctx.request.body.productid);

    // and finally we push the new wishlist to the mongo db :)))
    await strapi.services.wishlist.edit(***REMOVED***_id: wishlist._id***REMOVED***, wishlist);
    return strapi.services.wishlist.fetch(***REMOVED***_id: wishlist._id***REMOVED***);

***REMOVED***
***REMOVED***;
