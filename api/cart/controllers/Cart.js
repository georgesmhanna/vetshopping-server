'use strict';

/**
 * Cart.js controller
 *
 * @description: A set of functions called "actions" for managing `Cart`.
 */

module.exports = {

  /**
   * Retrieve cart records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cart.search(ctx.query);
    } else {
      return strapi.services.cart.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cart record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cart.fetch(ctx.params);
  },

  /**
   * Count cart records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cart.count(ctx.query);
  },

  /**
   * Create a/an cart record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cart.add(ctx.request.body);
  },

  /**
   * Update a/an cart record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cart.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an cart record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cart.remove(ctx.params);
  },

  addToCart: async (ctx, next) => {
    // find if there is a cart for user
    // if there is not, create empty cart for user
    // else continue
    //  find if there is an order item already who has same properties
    // same color, same quantity and same product id in the user cart
    // if there is --> return error
    // if there is not, create an order item, and automatically add it to cart order items list

    // body contains: product id, color id and size id
    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('product id is not valid');
    }

    if (ctx.request.body.colorid && !ctx.request.body.colorid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('color id is not valid');
    }

    if (ctx.request.body.sizeid && !ctx.request.body.sizeid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('size id is not valid');
    }

    // if (ctx.request.body.quantity && ctx.request.body.quantity < 1) {    // if the product id is not a mongo ObjectId
    //   return ctx.badRequest('quantity cannot be less than one');
    // }

    const product = await strapi.services.product.fetch({_id: ctx.request.body.productid});
    if (!product) {  // if the product does not exist in the db
      return ctx.notFound('Product not found');
    }

    const color = await strapi.services.color.fetch({_id: ctx.request.body.colorid});
    if (ctx.request.body.colorid && !color) {  // if the color does not exist in the db
      return ctx.notFound('Color not found');
    }

    const size = await strapi.services.size.fetch({_id: ctx.request.body.sizeid});
    if (ctx.request.body.sizeid && !size) {  // if the size does not exist in the db
      return ctx.notFound('Size not found');
    }

    let cart = await strapi.services.cart.fetch({user: ctx.state.user._id});   // get the cart of the loggedin user


    if (!cart) {
      cart = {};
      cart.user = ctx.state.user._id;
      cart.orderItems = [];
      const addedCart = await strapi.services.cart.add(cart);
      cart = addedCart;
    }

    if (cart.orderItems && cart.orderItems.find(orderItem => orderItem.product
      && orderItem.product._id == ctx.request.body.productid &&
      (!orderItem.color || (orderItem.color && orderItem.color._id == ctx.request.body.colorid))
      && (!orderItem.size || (orderItem.size && orderItem.size._id == ctx.request.body.sizeid)))) {
      return ctx.notFound('Order Item already added to cart');
    } // if it doesn't exist, add it to the list of products

    if (cart.orderItems) {
      cart.orderItems.push({
        product: product,
        // quantity: ctx.request.body.quantity || 1,
        color: color,
        size: size,
        cart: cart._id,
        image: (product.images && product.images.length > 0) ? product.images[0].url : null
      });
      for (let orderItem of cart.orderItems) {
        orderItem.product = await strapi.services.product.fetch({_id: orderItem.product._id});
      }
    }
    else {
      cart.orderItems = [];
      cart.orderItems.push({
        product: product,
        // quantity: ctx.request.body.quantity || 1,
        color: color,
        size: size,
        image: (product.images && product.images.length > 0) ? product.images[0].url : null

      });
    }

    await strapi.services.cart.edit({_id: cart._id}, cart);
    return strapi.services.cart.fetch({_id: cart._id});

  },

  getCurrentCart: async (ctx) => {

    let cart = await strapi.services.cart.fetch({user: ctx.state.user._id});
    if (!cart){
      return {orderItems: []};
    }
    if (cart && cart.orderItems && cart.orderItems.length === 0) {
      return cart;
    }
    if (cart && !cart.orderItems) {
      return cart;
    }
    for (let orderItem of cart.orderItems) {
      orderItem.product = await strapi.services.product.fetch({_id: orderItem.product._id});
    }

    return cart;


  },

  removeFromCart: async (ctx, next) => {
    // find if there is a cart for user
    // if there is not, create empty cart for user
    // else continue
    //  find if there is an order item already who has same properties
    // same color, same quantity and same product id in the user cart
    // if there is --> return error
    // if there is not, create an order item, and automatically add it to cart order items list

    // body contains: product id, color id and size id
    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('product id is not valid');
    }

    if (ctx.request.body.colorid && !ctx.request.body.colorid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('color id is not valid');
    }

    if (ctx.request.body.sizeid && !ctx.request.body.sizeid.match(/^[0-9a-fA-F]{24}$/)) {    // if the product id is not a mongo ObjectId
      return ctx.notFound('size id is not valid');
    }

    // if (ctx.request.body.quantity && ctx.request.body.quantity < 1) {    // if the product id is not a mongo ObjectId
    //   return ctx.badRequest('quantity cannot be less than one');
    // }

    const product = await strapi.services.product.fetch({_id: ctx.request.body.productid});
    if (!product) {  // if the product does not exist in the db
      return ctx.notFound('Product not found');
    }

    const color = await strapi.services.color.fetch({_id: ctx.request.body.colorid});
    if (ctx.request.body.colorid && !color) {  // if the color does not exist in the db
      return ctx.notFound('Color not found');
    }

    const size = await strapi.services.size.fetch({_id: ctx.request.body.sizeid});
    if (ctx.request.body.sizeid && !size) {  // if the size does not exist in the db
      return ctx.notFound('Size not found');
    }

    let cart = await strapi.services.cart.fetch({user: ctx.state.user._id});   // get the cart of the loggedin user

    if (!cart) {
      return ctx.notFound('Cart not found');
    }

    if (cart.orderItems) {
      cart.orderItems = cart.orderItems.filter(orderItem => !
        (orderItem.product
          && orderItem.product._id == ctx.request.body.productid &&
          (!orderItem.color || (orderItem.color && orderItem.color._id == ctx.request.body.colorid))
          && (!orderItem.size || (orderItem.size && orderItem.size._id == ctx.request.body.sizeid))));
    }
    else {
      cart.orderItems = [];
    }

    if (cart.orderItems) {
      for (let orderItem of cart.orderItems) {
        orderItem.product = await strapi.services.product.fetch({_id: orderItem.product._id});
      }
    }

    await strapi.services.cart.edit({_id: cart._id}, cart);
    return strapi.services.cart.fetch({_id: cart._id});

  },

  removeUserCart: async (ctx) => {
    return strapi.services.cart.remove({user: ctx.state.user._id});

  }
};
