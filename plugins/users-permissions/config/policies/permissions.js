const _ = require('lodash');

module.exports = async (ctx, next) => ***REMOVED***
  let role;

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) ***REMOVED***
    try ***REMOVED***
      const ***REMOVED*** _id, id ***REMOVED*** = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

      if ((id || _id) === undefined) ***REMOVED***
        throw new Error('Invalid token: Token did not contain required fields');
***REMOVED***

      ctx.state.user = await strapi.query('user', 'users-permissions').findOne(***REMOVED*** _id, id ***REMOVED***);
***REMOVED*** catch (err) ***REMOVED***
      return ctx.unauthorized(err);
***REMOVED***

    if (!ctx.state.user) ***REMOVED***
      return ctx.unauthorized(`User Not Found.`);
***REMOVED***

    role = ctx.state.user.role;

    if (role.type === 'root') ***REMOVED***
      return await next();
***REMOVED***

    const store = await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions'
***REMOVED***);

    if (_.get(await store.get(***REMOVED***key: 'advanced'***REMOVED***), 'email_confirmation') && ctx.state.user.confirmed !== true) ***REMOVED***
      return ctx.unauthorized('Your account email is not confirmed.');
***REMOVED***
    
    if (ctx.state.user.blocked === true) ***REMOVED***
      return ctx.unauthorized(`Your account has been blocked by the administrator.`);
***REMOVED***
***REMOVED***
  // Retrieve `public` role.
  if (!role) ***REMOVED***
    role = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'public' ***REMOVED***, []);
***REMOVED***

  const route = ctx.request.route;
  const permission = await strapi.query('permission', 'users-permissions').findOne(***REMOVED***
    role: role._id || role.id,
    type: route.plugin || 'application',
    controller: route.controller,
    action: route.action,
    enabled: true
***REMOVED***, []);

  if (!permission) ***REMOVED***
    if (ctx.request.graphql === null) ***REMOVED***
      return ctx.request.graphql = strapi.errors.forbidden();
***REMOVED***

    return ctx.forbidden();
***REMOVED***

  // Execute the policies.
  if (permission.policy) ***REMOVED***
    return await strapi.plugins['users-permissions'].config.policies[permission.policy](ctx, next);
***REMOVED***

  // Execute the action.
  await next();
***REMOVED***;
