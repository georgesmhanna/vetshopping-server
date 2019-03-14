'use strict';

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

module.exports = {

  /**
   * Retrieve order records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.order.search(ctx.query);
    } else {
      return strapi.services.order.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a order record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.order.fetch(ctx.params);
  },

  /**
   * Count order records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.order.count(ctx.query);
  },

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    ctx.request.body.user = ctx.state.user;

    // const orderNo = await strapi.services.counter.edit({query: {'fieldName': 'OrderNumber'},update: { seq: 5 }, new: true });
    // const orderNo = await strapi.services.counter.edit({fieldName: 'OrderNumber'}, { $inc: {seq: 1}});
    const counter = await strapi.services.counter.fetch({fieldName: 'OrderNumber'});
    const orderNo = counter? await strapi.services.counter.edit({_id: counter._id}, { $inc: {seq: 1}}) : undefined;
    ctx.request.body.orderNo = orderNo? orderNo.seq : undefined;
    return strapi.services.order.add(ctx.request.body);
  },

  getUserOrders: async (ctx) => {

    return strapi.services.order.fetchAll({user: ctx.state.user._id, _sort: 'orderDate:desc'});

  },
  getUserOrderById: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.order.fetch({user: ctx.state.user._id, _id : ctx.params._id});

  },

  removeUserOrderById: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.order.remove({user: ctx.state.user._id, _id : ctx.params._id});
  },
  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.order.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.order.remove(ctx.params);
  }
};
