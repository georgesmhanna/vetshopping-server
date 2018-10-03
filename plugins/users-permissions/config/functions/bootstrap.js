'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid/v4');

module.exports = async cb => ***REMOVED***
  if (!_.get(strapi.plugins['users-permissions'], 'config.jwtSecret')) ***REMOVED***
    try ***REMOVED***
      const jwtSecret = uuid();

      fs.writeFileSync(path.join(strapi.config.appPath, 'plugins', 'users-permissions', 'config', 'jwt.json'), JSON.stringify(***REMOVED***
        jwtSecret
***REMOVED*** null, 2), 'utf8');

      _.set(strapi.plugins['users-permissions'], 'config.jwtSecret', jwtSecret);
***REMOVED*** catch(err) ***REMOVED***
      strapi.log.error(err);
***REMOVED***
***REMOVED***

  const pluginStore = strapi.store(***REMOVED***
    environment: '',
    type: 'plugin',
    name: 'users-permissions'
***REMOVED***);

  const grantConfig = ***REMOVED***
    email: ***REMOVED***
      enabled: true,
      icon: 'envelope'
***REMOVED***,
    discord: ***REMOVED***
      enabled: false,
      icon: 'comments',
      key: '',
      secret: '',
      callback: '/auth/discord/callback',
      scope: [
        'identify',
        'email'
      ]
***REMOVED***,
    facebook: ***REMOVED***
      enabled: false,
      icon: 'facebook-official',
      key: '',
      secret: '',
      callback: '/auth/facebook/callback',
      scope: ['email']
***REMOVED***,
    google: ***REMOVED***
      enabled: false,
      icon: 'google',
      key: '',
      secret: '',
      callback: '/auth/google/callback',
      scope: ['email']
***REMOVED***,
    github: ***REMOVED***
      enabled: false,
      icon: 'github',
      key: '',
      secret: '',
      redirect_uri: '/auth/github/callback',
      scope: [
        'user',
        'user:email'
      ]
***REMOVED***,
    microsoft: ***REMOVED***
      enabled: false,
      icon: 'windows',
      key: '',
      secret: '',
      callback: '/auth/microsoft/callback',
      scope: ['user.read']
***REMOVED***,
    twitter: ***REMOVED***
      enabled: false,
      icon: 'twitter',
      key: '',
      secret: '',
      callback: '/auth/twitter/callback'
***REMOVED***
***REMOVED***;
  const prevGrantConfig = await pluginStore.get(***REMOVED***key: 'grant'***REMOVED***) || ***REMOVED******REMOVED***;
  // store grant auth config to db
  // when plugin_users-permissions_grant is not existed in db
  // or we have added/deleted provider here.
  if (!prevGrantConfig || !_.isEqual(_.keys(prevGrantConfig), _.keys(grantConfig))) ***REMOVED***
    // merge with the previous provider config.
    _.keys(grantConfig).forEach((key) => ***REMOVED***
      if (key in prevGrantConfig) ***REMOVED***
        grantConfig[key] = _.merge(grantConfig[key], prevGrantConfig[key]);
***REMOVED***
***REMOVED***);
    await pluginStore.set(***REMOVED***key: 'grant', value: grantConfig***REMOVED***);
***REMOVED***

  if (!await pluginStore.get(***REMOVED***key: 'email'***REMOVED***)) ***REMOVED***
    const value = ***REMOVED***
      'reset_password': ***REMOVED***
        display: 'Email.template.reset_password',
        icon: 'refresh',
        options: ***REMOVED***
          from: ***REMOVED***
            name: 'Administration Panel',
            email: 'no-reply@strapi.io'
    ***REMOVED***
          response_email: '',
          object: '­Reset password',
          message: `<p>We heard that you lost your password. Sorry about that!</p>

<p>But don’t worry! You can use the following link to reset your password:</p>

<p><%= URL %>?code=<%= TOKEN %></p>

<p>Thanks.</p>`
  ***REMOVED***
***REMOVED***
      'email_confirmation': ***REMOVED***
        display: 'Email.template.email_confirmation',
        icon: 'check-square-o',
        options: ***REMOVED***
          from: ***REMOVED***
            name: 'Administration Panel',
            email: 'no-reply@strapi.io'
    ***REMOVED***
          response_email: '',
          object: 'Account confirmation',
          message: `<p>Thank you for registering!</p>

<p>You have to confirm your email address. Please click on the link below.</p>

<p><%= URL %>?confirmation=<%= CODE %></p>

<p>Thanks.</p>`
  ***REMOVED***
***REMOVED***
***REMOVED***;

    await pluginStore.set(***REMOVED***key: 'email', value***REMOVED***);
***REMOVED***

  if (!await pluginStore.get(***REMOVED***key: 'advanced'***REMOVED***)) ***REMOVED***
    const value = ***REMOVED***
      unique_email: true,
      allow_register: true,
      email_confirmation: false,
      email_confirmation_redirection: `http://$***REMOVED***strapi.config.currentEnvironment.server.host***REMOVED***:$***REMOVED***strapi.config.currentEnvironment.server.port***REMOVED***/admin`,
      default_role: 'authenticated'
***REMOVED***;

    await pluginStore.set(***REMOVED***key: 'advanced', value***REMOVED***);
***REMOVED***

  strapi.plugins['users-permissions'].services.userspermissions.initialize(cb);
***REMOVED***;
