'use strict';

/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

/* eslint-disable no-useless-escape */
const crypto = require('crypto');
const _ = require('lodash');
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]***REMOVED***1,3***REMOVED***\.[0-9]***REMOVED***1,3***REMOVED***\.[0-9]***REMOVED***1,3***REMOVED***\.[0-9]***REMOVED***1,3***REMOVED***\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]***REMOVED***2,***REMOVED***))$/;

module.exports = ***REMOVED***
  callback: async (ctx) => ***REMOVED***
    const provider = ctx.params.provider || 'local';
    const params = ctx.request.body;

    const store = await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions'
***REMOVED***);

    if (provider === 'local') ***REMOVED***
      if (!_.get(await store.get(***REMOVED***key: 'grant'***REMOVED***), 'email.enabled') && !ctx.request.admin) ***REMOVED***
        return ctx.badRequest(null, 'This provider is disabled.');
***REMOVED***

      // The identifier is required.
      if (!params.identifier) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.provide' ***REMOVED***] ***REMOVED***] : 'Please provide your username or your e-mail.');
***REMOVED***

      // The password is required.
      if (!params.password) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.password.provide' ***REMOVED***] ***REMOVED***] : 'Please provide your password.');
***REMOVED***

      const query = ***REMOVED******REMOVED***;

      // Check if the provided identifier is an email or not.
      const isEmail = emailRegExp.test(params.identifier);

      // Set the identifier to the appropriate query field.
      if (isEmail) ***REMOVED***
        query.email = params.identifier.toLowerCase();
***REMOVED*** else ***REMOVED***
        query.username = params.identifier;
***REMOVED***

      // Check if the user exists.
      const user = await strapi.query('user', 'users-permissions').findOne(query, ['role']);

      if (_.get(await store.get(***REMOVED***key: 'advanced'***REMOVED***), 'email_confirmation') && user.confirmed !== true) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.confirmed' ***REMOVED***] ***REMOVED***] : 'Your account email is not confirmed.');
***REMOVED***

      if (!user) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.invalid' ***REMOVED***] ***REMOVED***] : 'Identifier or password invalid.');
***REMOVED***

      if (user.blocked === true) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.blocked' ***REMOVED***] ***REMOVED***] : 'Your account has been blocked by the administrator.');
***REMOVED***

      if (user.role.type !== 'root' && ctx.request.admin) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.noAdminAccess' ***REMOVED***] ***REMOVED***] : `You're not an administrator.`);
***REMOVED***

      // The user never authenticated with the `local` provider.
      if (!user.password) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.password.local' ***REMOVED***] ***REMOVED***] : 'This user never set a local password, please login thanks to the provider used during account creation.');
***REMOVED***

      const validPassword = strapi.plugins['users-permissions'].services.user.validatePassword(params.password, user.password);

      if (!validPassword) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.invalid' ***REMOVED***] ***REMOVED***] : 'Identifier or password invalid.');
***REMOVED*** else ***REMOVED***
        ctx.send(***REMOVED***
          jwt: strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user.toJSON ? user.toJSON() : user, ['_id', 'id'])),
          user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
  ***REMOVED***);
***REMOVED***
***REMOVED*** else ***REMOVED***
      if (!_.get(await store.get(***REMOVED***key: 'grant'***REMOVED***), [provider, 'enabled'])) ***REMOVED***
        return ctx.badRequest(null, 'This provider is disabled.');
***REMOVED***

      // Connect the user thanks to the third-party provider.
      let user, error;
      try ***REMOVED***
        [user, error] = await strapi.plugins['users-permissions'].services.providers.connect(provider, ctx.query);
***REMOVED*** catch([user, error]) ***REMOVED***
        return ctx.badRequest(null, (error === 'array') ? (ctx.request.admin ? error[0] : error[1]) : error);
***REMOVED***

      if (!user) ***REMOVED***
        return ctx.badRequest(null, (error === 'array') ? (ctx.request.admin ? error[0] : error[1]) : error);
***REMOVED***

      ctx.send(***REMOVED***
        jwt: strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user, ['_id', 'id'])),
        user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
***REMOVED***);
***REMOVED***
***REMOVED***,

  changePassword: async (ctx) => ***REMOVED***
    const params = _.assign(***REMOVED******REMOVED***, ctx.request.body, ctx.params);

    if (params.password && params.passwordConfirmation && params.password === params.passwordConfirmation && params.code) ***REMOVED***
      const user = await strapi.query('user', 'users-permissions').findOne(***REMOVED*** resetPasswordToken: params.code ***REMOVED***);

      if (!user) ***REMOVED***
        return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.code.provide' ***REMOVED***] ***REMOVED***] : 'Incorrect code provided.');
***REMOVED***

      // Delete the current code
      user.resetPasswordToken = null;

      user.password =  await strapi.plugins['users-permissions'].services.user.hashPassword(params);

      // Remove relations data to update user password.
      const data = _.omit(user, strapi.plugins['users-permissions'].models.user.associations.map(ast => ast.alias));

      // Update the user.
      await strapi.query('user', 'users-permissions').update(data);

      ctx.send(***REMOVED***
        jwt: strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user.toJSON ? user.toJSON() : user, ['_id', 'id'])),
        user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
***REMOVED***);
***REMOVED*** else if (params.password && params.passwordConfirmation && params.password !== params.passwordConfirmation) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.password.matching' ***REMOVED***] ***REMOVED***] : 'Passwords do not match.');
***REMOVED*** else ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.params.provide' ***REMOVED***] ***REMOVED***] : 'Incorrect params provided.');
***REMOVED***
***REMOVED***,

  connect: async (ctx, next) => ***REMOVED***
    const grantConfig = await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'grant'
***REMOVED***).get();

    _.defaultsDeep(grantConfig, ***REMOVED***
      server: ***REMOVED***
        protocol: 'http',
        host: `$***REMOVED***strapi.config.currentEnvironment.server.host***REMOVED***:$***REMOVED***strapi.config.currentEnvironment.server.port***REMOVED***`
***REMOVED***
***REMOVED***);

    const provider = process.platform === 'win32' ? ctx.request.url.split('\\')[2] : ctx.request.url.split('/')[2];
    const config = grantConfig[provider];

    if (!_.get(config, 'enabled')) ***REMOVED***
      return ctx.badRequest(null, 'This provider is disabled.');
***REMOVED***

    const Grant = require('grant-koa');
    const grant = new Grant(grantConfig);

    return strapi.koaMiddlewares.compose(grant.middleware)(ctx, next);
***REMOVED***,

  forgotPassword: async (ctx) => ***REMOVED***
    const ***REMOVED*** email, url ***REMOVED*** = ctx.request.body;

    // Find the user user thanks to his email.
    const user = await strapi.query('user', 'users-permissions').findOne(***REMOVED*** email ***REMOVED***);

    // User not found.
    if (!user) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.user.not-exist' ***REMOVED***] ***REMOVED***] : 'This email does not exist.');
***REMOVED***

    // Generate random token.
    const resetPasswordToken = crypto.randomBytes(64).toString('hex');

    // Set the property code.
    user.resetPasswordToken = resetPasswordToken;

    const settings = (await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions'
***REMOVED***).get(***REMOVED*** key: 'email' ***REMOVED***))['reset_password'].options;

    settings.message = await strapi.plugins['users-permissions'].services.userspermissions.template(settings.message, ***REMOVED***
      URL: url,
      USER: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken', 'role', 'provider']),
      TOKEN: resetPasswordToken
***REMOVED***);

    settings.object = await strapi.plugins['users-permissions'].services.userspermissions.template(settings.object, ***REMOVED***
      USER: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken', 'role', 'provider'])
***REMOVED***);

    try ***REMOVED***
      // Send an email to the user.
      await strapi.plugins['email'].services.email.send(***REMOVED***
        to: user.email,
        from: (settings.from.email || settings.from.name) ? `"$***REMOVED***settings.from.name***REMOVED***" <$***REMOVED***settings.from.email***REMOVED***>` : undefined,
        replyTo: settings.response_email,
        subject: settings.object,
        text: settings.message,
        html: settings.message
***REMOVED***);
***REMOVED*** catch (err) ***REMOVED***
      return ctx.badRequest(null, err);
***REMOVED***

    // Remove relations data to update user code.
    const data = _.omit(user, strapi.plugins['users-permissions'].models.user.associations.map(ast => ast.alias));

    // Update the user.
    await strapi.query('user', 'users-permissions').update(data);

    ctx.send(***REMOVED*** ok: true ***REMOVED***);
***REMOVED***,

  register: async (ctx) => ***REMOVED***
    const pluginStore = await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions'
***REMOVED***);

    const settings = await pluginStore.get(***REMOVED***
      key: 'advanced'
***REMOVED***);

    if (!settings.allow_register) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.advanced.allow_register' ***REMOVED***] ***REMOVED***] : 'Register action is currently disabled.');
***REMOVED***

    const params = _.assign(ctx.request.body, ***REMOVED***
      provider: 'local'
***REMOVED***);

    // Password is required.
    if (!params.password) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.password.provide' ***REMOVED***] ***REMOVED***] : 'Please provide your password.');
***REMOVED***

    // Throw an error if the password selected by the user
    // contains more than two times the symbol '$'.
    if (strapi.plugins['users-permissions'].services.user.isHashed(params.password)) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.password.format' ***REMOVED***] ***REMOVED***] : 'Your password cannot contain more than three times the symbol `$`.');
***REMOVED***

    // Retrieve root role.
    const root = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: 'root' ***REMOVED***, ['users']);
    const users = root.users || [];

    // First, check if the user is the first one to register as admin.
    const hasAdmin = users.length > 0;

    // Check if the user is the first to register
    const role = hasAdmin === false ? root : await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: settings.default_role ***REMOVED***, []);

    if (!role) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.role.notFound' ***REMOVED***] ***REMOVED***] : 'Impossible to find the root role.');
***REMOVED***

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(params.email);

    if (isEmail) ***REMOVED***
      params.email = params.email.toLowerCase();
***REMOVED***

    params.role = role._id || role.id;
    params.password = await strapi.plugins['users-permissions'].services.user.hashPassword(params);

    const user = await strapi.query('user', 'users-permissions').findOne(***REMOVED***
      email: params.email
***REMOVED***);

    if (user && user.provider === params.provider) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.taken' ***REMOVED***] ***REMOVED***] : 'Email is already taken.');
***REMOVED***

    if (user && user.provider !== params.provider && settings.unique_email) ***REMOVED***
      return ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.taken' ***REMOVED***] ***REMOVED***] : 'Email is already taken.');
***REMOVED***

    try ***REMOVED***
      if (!settings.email_confirmation) ***REMOVED***
        params.confirmed = true;
***REMOVED***

      const user = await strapi.query('user', 'users-permissions').create(params);

      const jwt = strapi.plugins['users-permissions'].services.jwt.issue(_.pick(user.toJSON ? user.toJSON() : user, ['_id', 'id']));

      if (settings.email_confirmation) ***REMOVED***
        const storeEmail = (await pluginStore.get(***REMOVED***
          key: 'email'
  ***REMOVED***)) || ***REMOVED******REMOVED***;

        const settings = storeEmail['email_confirmation'] ? storeEmail['email_confirmation'].options : ***REMOVED******REMOVED***;

        settings.message = await strapi.plugins['users-permissions'].services.userspermissions.template(settings.message, ***REMOVED***
          URL: `http://$***REMOVED***strapi.config.currentEnvironment.server.host***REMOVED***:$***REMOVED***strapi.config.currentEnvironment.server.port***REMOVED***/auth/email-confirmation`,
          USER: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken', 'role', 'provider']),
          CODE: jwt
  ***REMOVED***);

        settings.object = await strapi.plugins['users-permissions'].services.userspermissions.template(settings.object, ***REMOVED***
          USER: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken', 'role', 'provider'])
  ***REMOVED***);

        try ***REMOVED***
          // Send an email to the user.
          await strapi.plugins['email'].services.email.send(***REMOVED***
            to: user.email,
            from: (settings.from.email && settings.from.name) ? `"$***REMOVED***settings.from.name***REMOVED***" <$***REMOVED***settings.from.email***REMOVED***>` : undefined,
            replyTo: settings.response_email,
            subject: settings.object,
            text: settings.message,
            html: settings.message
    ***REMOVED***);
  ***REMOVED*** catch (err) ***REMOVED***
          return ctx.badRequest(null, err);
  ***REMOVED***
***REMOVED***

      ctx.send(***REMOVED***
        jwt,
        user: _.omit(user.toJSON ? user.toJSON() : user, ['password', 'resetPasswordToken'])
***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      const adminError = _.includes(err.message, 'username') ? 'Auth.form.error.username.taken' : 'Auth.form.error.email.taken';

      ctx.badRequest(null, ctx.request.admin ? [***REMOVED*** messages: [***REMOVED*** id: adminError ***REMOVED***] ***REMOVED***] : err.message);
***REMOVED***
***REMOVED***,

  emailConfirmation: async (ctx) => ***REMOVED***
    const params = ctx.query;

    const user = await strapi.plugins['users-permissions'].services.jwt.verify(params.confirmation);

    await strapi.plugins['users-permissions'].services.user.edit(_.pick(user, ['_id', 'id']), ***REMOVED***confirmed: true***REMOVED***);

    const settings = await strapi.store(***REMOVED***
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'advanced'
***REMOVED***).get();

    ctx.redirect(settings.email_confirmation_redirection || '/');
***REMOVED***
***REMOVED***;
