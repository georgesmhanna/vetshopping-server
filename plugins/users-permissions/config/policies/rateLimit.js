const RateLimit = require('koa2-ratelimit').RateLimit;

module.exports = async (ctx, next) => ***REMOVED***
  const message = ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.ratelimit' ***REMOVED***] ***REMOVED***] : 'Too many attempts, please try again in a minute.';

  return RateLimit.middleware(Object.assign(***REMOVED******REMOVED***, ***REMOVED***
    interval: 1*60*1000,
    max: 5,
    prefixKey: `$***REMOVED***ctx.request.url***REMOVED***:$***REMOVED***ctx.request.ip***REMOVED***`,
    message
***REMOVED***, strapi.plugins['users-permissions'].config.ratelimit))(ctx, next);
***REMOVED***;
