'use strict';

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

module.exports = ***REMOVED***

  /**
   * Retrieve order records.
   *
   * @return ***REMOVED***Object|Array***REMOVED***
   */

  find: async (ctx) => ***REMOVED***
    if (ctx.query._q) ***REMOVED***
      return strapi.services.order.search(ctx.query);
***REMOVED*** else ***REMOVED***
      return strapi.services.order.fetchAll(ctx.query);
***REMOVED***
***REMOVED***,

  /**
   * Retrieve a order record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  findOne: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.order.fetch(ctx.params);
***REMOVED***,

  /**
   * Count order records.
   *
   * @return ***REMOVED***Number***REMOVED***
   */

  count: async (ctx) => ***REMOVED***
    return strapi.services.order.count(ctx.query);
***REMOVED***,

  /**
   * Create a/an order record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  create: async (ctx) => ***REMOVED***
    ctx.request.body.user = ctx.state.user;

    // const orderNo = await strapi.services.counter.edit(***REMOVED***query: ***REMOVED***'fieldName': 'OrderNumber'***REMOVED***,update: ***REMOVED*** seq: 5 ***REMOVED***, new: true ***REMOVED***);
    // const orderNo = await strapi.services.counter.edit(***REMOVED***fieldName: 'OrderNumber'***REMOVED***, ***REMOVED*** $inc: ***REMOVED***seq: 1***REMOVED******REMOVED***);
    const counter = await strapi.services.counter.fetch(***REMOVED***fieldName: 'OrderNumber'***REMOVED***);
    const orderNo = counter? await strapi.services.counter.edit(***REMOVED***_id: counter._id***REMOVED***, ***REMOVED*** $inc: ***REMOVED***seq: 1***REMOVED******REMOVED***) : undefined;
    ctx.request.body.orderNo = orderNo? orderNo.seq : undefined;
    return strapi.services.order.add(ctx.request.body);
***REMOVED***,

  getUserOrders: async (ctx) => ***REMOVED***

    return strapi.services.order.fetchAll(***REMOVED***user: ctx.state.user._id, _sort: 'orderDate:desc'***REMOVED***);

***REMOVED***,
  getUserOrderById: async (ctx) => ***REMOVED***
    console.log('params: ', ctx.params);
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.order.fetch(***REMOVED***user: ctx.state.user._id, _id : ctx.params._id***REMOVED***);

***REMOVED***,

  removeUserOrderById: async (ctx) => ***REMOVED***
    if (!ctx.params._id.match(/^[0-9a-fA-F]***REMOVED***24***REMOVED***$/)) ***REMOVED***
      return ctx.notFound();
***REMOVED***

    return strapi.services.order.remove(***REMOVED***user: ctx.state.user._id, _id : ctx.params._id***REMOVED***);
***REMOVED***,
  /**
   * Update a/an order record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  update: async (ctx, next) => ***REMOVED***
    return strapi.services.order.edit(ctx.params, ctx.request.body) ;
***REMOVED***,

  /**
   * Destroy a/an order record.
   *
   * @return ***REMOVED***Object***REMOVED***
   */

  destroy: async (ctx, next) => ***REMOVED***
    return strapi.services.order.remove(ctx.params);
***REMOVED***
***REMOVED***;
