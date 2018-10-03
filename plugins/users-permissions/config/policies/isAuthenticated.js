module.exports = async (ctx, next) => ***REMOVED***
  if (!ctx.state.user) ***REMOVED***
    return ctx.unauthorized();
***REMOVED***

  await next();
***REMOVED***;
