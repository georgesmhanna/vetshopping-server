'use strict';

const _ = require('lodash');

/**
 * A set of functions called "actions" for `ContentManager`
 */

module.exports = ***REMOVED***
  models: async ctx => ***REMOVED***
    const pluginsStore = strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'content-manager',
***REMOVED***);

    const models = await pluginsStore.get(***REMOVED*** key: 'schema' ***REMOVED***);

    ctx.body = ***REMOVED***
      models,
***REMOVED***;
***REMOVED***,

  find: async ctx => ***REMOVED***
    // Search
    if (!_.isEmpty(ctx.request.query._q)) ***REMOVED***
      ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].search(ctx.params, ctx.request.query);

      return;
***REMOVED***

    // Default list with filters or not.
    ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].fetchAll(ctx.params, ctx.request.query);
***REMOVED***,

  count: async ctx => ***REMOVED***
    // Search
    const count = !_.isEmpty(ctx.request.query._q)
      ? await strapi.plugins['content-manager'].services['contentmanager'].countSearch(ctx.params, ctx.request.query)
      : await strapi.plugins['content-manager'].services['contentmanager'].count(ctx.params, ctx.request.query);

    ctx.body = ***REMOVED***
      count: _.isNumber(count) ? count : _.toNumber(count)
***REMOVED***;
***REMOVED***,

  findOne: async ctx => ***REMOVED***
    const ***REMOVED*** source ***REMOVED*** = ctx.request.query;

    // Find an entry using `queries` system
    const entry = await strapi.plugins['content-manager'].services['contentmanager'].fetch(ctx.params, source, null, false);

    // Entry not found
    if (!entry) ***REMOVED***
      return (ctx.notFound('Entry not found'));
***REMOVED***

    ctx.body = entry;
***REMOVED***,

  create: async ctx => ***REMOVED***
    const ***REMOVED*** source ***REMOVED*** = ctx.request.query;

    try ***REMOVED***
      // Create an entry using `queries` system
      ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].add(ctx.params, ctx.request.body, source);
***REMOVED*** catch(error) ***REMOVED***
      strapi.log.error(error);
      ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: error.message, field: error.field ***REMOVED***] ***REMOVED***] : error.message);
***REMOVED***
***REMOVED***,

  update: async ctx => ***REMOVED***
    const ***REMOVED*** source ***REMOVED*** = ctx.request.query;

    try ***REMOVED***
      // Return the last one which is the current model.
      ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].edit(ctx.params, ctx.request.body, source);
***REMOVED*** catch(error) ***REMOVED***
      // TODO handle error update
      strapi.log.error(error);
      ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: error.message, field: error.field ***REMOVED***] ***REMOVED***] : error.message);
***REMOVED***
***REMOVED***,

  updateSettings: async ctx => ***REMOVED***
    const ***REMOVED*** schema ***REMOVED*** = ctx.request.body;
    const pluginStore = strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'content-manager'
***REMOVED***);
    await pluginStore.set(***REMOVED*** key: 'schema', value: schema ***REMOVED***);

    return ctx.body = ***REMOVED*** ok: true ***REMOVED***;
***REMOVED***,

  delete: async ctx => ***REMOVED***
    ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].delete(ctx.params, ctx.request.query);
***REMOVED***,

  deleteAll: async ctx => ***REMOVED***
    ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].deleteMany(ctx.params, ctx.request.query);
***REMOVED***
***REMOVED***;
