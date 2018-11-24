'use strict';

/**
 * Cart.js controller
 *
 * @description: A set of functions called "actions" for managing `Cart`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve cart records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.cart.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.cart.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a cart record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.cart.fetch(ctx.params);
***REMOVED***,

  /**
   * Count cart records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.cart.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an cart record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    return strapi.services.cart.add(ctx.request.body);
***REMOVED***,

  /**
   * Update a/an cart record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.cart.edit(ctx.params, ctx.request.body);
***REMOVED***,

  /**
   * Destroy a/an cart record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.cart.remove(ctx.params);
***REMOVED***,

  addToCart: async (ctx, next) => ***REMOVED***
    // find if there is a cart for user
    // if there is not, create empty cart for user
    // else continue
    //  find if there is an order item already who has same properties
    // same color, same quantity and same product id in the user cart
    // if there is --> return error
    // if there is not, create an order item, and automatically add it to cart order items list

    // body contains: product id, color id and size id
    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('product id is not valid');
***REMOVED***

    if (ctx.request.body.colorid && !ctx.request.body.colorid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('color id is not valid');
***REMOVED***

    if (ctx.request.body.sizeid && !ctx.request.body.sizeid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('size id is not valid');
***REMOVED***

    // if (ctx.request.body.quantity && ctx.request.body.quantity < 1) ***REMOVED***    // if the product id is not a mongo ObjectId
    //   return ctx.badRequest('quantity cannot be less than one');
    // ***REMOVED***

    const product = await strapi.services.product.fetch(***REMOVED***_id: ctx.request.body.productid***REMOVED***);
    if (!product) ***REMOVED***  // if the product does not exist in the db
      return ctx.notFound('Product not found');
***REMOVED***

    const color = await strapi.services.color.fetch(***REMOVED***_id: ctx.request.body.colorid***REMOVED***);
    if (ctx.request.body.colorid && !color) ***REMOVED***  // if the color does not exist in the db
      return ctx.notFound('Color not found');
***REMOVED***

    const size = await strapi.services.size.fetch(***REMOVED***_id: ctx.request.body.sizeid***REMOVED***);
    if (ctx.request.body.sizeid && !size) ***REMOVED***  // if the size does not exist in the db
      return ctx.notFound('Size not found');
***REMOVED***

    let cart = await strapi.services.cart.fetch(***REMOVED***user: ctx.state.user._id***REMOVED***);   // get the cart of the loggedin user


    if (!cart) ***REMOVED***
      cart = ***REMOVED******REMOVED***;
      cart.user = ctx.state.user._id;
      cart.orderItems = [];
      const addedCart = await strapi.services.cart.add(cart);
      cart = addedCart;
***REMOVED***

    if (cart.orderItems && cart.orderItems.find(orderItem => orderItem.product
      && orderItem.product._id == ctx.request.body.productid &&
      (!orderItem.color || (orderItem.color && orderItem.color._id == ctx.request.body.colorid))
      && (!orderItem.size || (orderItem.size && orderItem.size._id == ctx.request.body.sizeid)))) ***REMOVED***
      return ctx.notFound('Order Item already added to cart');
***REMOVED*** // if it doesn't exist, add it to the list of products

    if (cart.orderItems) ***REMOVED***
      cart.orderItems.push(***REMOVED***
        product: product,
        // quantity: ctx.request.body.quantity || 1,
        color: color,
        size: size,
        cart: cart._id,
        image: (product.images && product.images.length > 0) ? product.images[0].url : null
***REMOVED***);
      for (let orderItem of cart.orderItems) ***REMOVED***
        orderItem.product = await strapi.services.product.fetch(***REMOVED***_id: orderItem.product._id***REMOVED***);
***REMOVED***
***REMOVED***
    else ***REMOVED***
      cart.orderItems = [];
      cart.orderItems.push(***REMOVED***
        product: product,
        // quantity: ctx.request.body.quantity || 1,
        color: color,
        size: size,
        image: (product.images && product.images.length > 0) ? product.images[0].url : null

***REMOVED***);
***REMOVED***

    await strapi.services.cart.edit(***REMOVED***_id: cart._id***REMOVED***, cart);
    return strapi.services.cart.fetch(***REMOVED***_id: cart._id***REMOVED***);

***REMOVED***,

  getCurrentCart: async (ctx) => ***REMOVED***

    let cart = await strapi.services.cart.fetch(***REMOVED***user: ctx.state.user._id***REMOVED***);
    if (!cart)***REMOVED***
      return ***REMOVED***orderItems: []***REMOVED***;
***REMOVED***
    if (cart && cart.orderItems && cart.orderItems.length === 0) ***REMOVED***
      return cart;
***REMOVED***
    if (cart && !cart.orderItems) ***REMOVED***
      return cart;
***REMOVED***
    for (let orderItem of cart.orderItems) ***REMOVED***
      orderItem.product = await strapi.services.product.fetch(***REMOVED***_id: orderItem.product._id***REMOVED***);
***REMOVED***

    return cart;


***REMOVED***,

  removeFromCart: async (ctx, next) => ***REMOVED***
    // find if there is a cart for user
    // if there is not, create empty cart for user
    // else continue
    //  find if there is an order item already who has same properties
    // same color, same quantity and same product id in the user cart
    // if there is --> return error
    // if there is not, create an order item, and automatically add it to cart order items list

    // body contains: product id, color id and size id
    if (!ctx.request.body.productid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('product id is not valid');
***REMOVED***

    if (ctx.request.body.colorid && !ctx.request.body.colorid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('color id is not valid');
***REMOVED***

    if (ctx.request.body.sizeid && !ctx.request.body.sizeid.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***    // if the product id is not a mongo ObjectId
      return ctx.notFound('size id is not valid');
***REMOVED***

    // if (ctx.request.body.quantity && ctx.request.body.quantity < 1) ***REMOVED***    // if the product id is not a mongo ObjectId
    //   return ctx.badRequest('quantity cannot be less than one');
    // ***REMOVED***

    const product = await strapi.services.product.fetch(***REMOVED***_id: ctx.request.body.productid***REMOVED***);
    if (!product) ***REMOVED***  // if the product does not exist in the db
      return ctx.notFound('Product not found');
***REMOVED***

    const color = await strapi.services.color.fetch(***REMOVED***_id: ctx.request.body.colorid***REMOVED***);
    if (ctx.request.body.colorid && !color) ***REMOVED***  // if the color does not exist in the db
      return ctx.notFound('Color not found');
***REMOVED***

    const size = await strapi.services.size.fetch(***REMOVED***_id: ctx.request.body.sizeid***REMOVED***);
    if (ctx.request.body.sizeid && !size) ***REMOVED***  // if the size does not exist in the db
      return ctx.notFound('Size not found');
***REMOVED***

    let cart = await strapi.services.cart.fetch(***REMOVED***user: ctx.state.user._id***REMOVED***);   // get the cart of the loggedin user

    if (!cart) ***REMOVED***
      return ctx.notFound('Cart not found');
***REMOVED***

    if (cart.orderItems) ***REMOVED***
      cart.orderItems = cart.orderItems.filter(orderItem => !
        (orderItem.product
          && orderItem.product._id == ctx.request.body.productid &&
          (!orderItem.color || (orderItem.color && orderItem.color._id == ctx.request.body.colorid))
          && (!orderItem.size || (orderItem.size && orderItem.size._id == ctx.request.body.sizeid))));
***REMOVED***
    else ***REMOVED***
      cart.orderItems = [];
***REMOVED***

    if (cart.orderItems) ***REMOVED***
      for (let orderItem of cart.orderItems) ***REMOVED***
        orderItem.product = await strapi.services.product.fetch(***REMOVED***_id: orderItem.product._id***REMOVED***);
***REMOVED***
***REMOVED***

    await strapi.services.cart.edit(***REMOVED***_id: cart._id***REMOVED***, cart);
    return strapi.services.cart.fetch(***REMOVED***_id: cart._id***REMOVED***);

***REMOVED***,

  removeUserCart: async (ctx) => ***REMOVED***
    return strapi.services.cart.remove(***REMOVED***user: ctx.state.user._id***REMOVED***);

***REMOVED***
***REMOVED***;
