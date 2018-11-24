'use strict';

/**
 * Module dependencies.
 */

// Public node modules.
const _ = require('lodash');
const request = require('request');

// Purest strategies.
const Purest = require('purest');

/**
 * Connect thanks to a third-party provider.
 *
 *
 * @param ***REMOVED***String***REMOVED***    provider
 * @param ***REMOVED***String***REMOVED***    access_token
 *
 * @return  ***REMOVED*******REMOVED***
 */

exports.connect = (provider, query) => ***REMOVED***
  const access_token = query.access_token || query.code || query.oauth_token;

  return new Promise((resolve, reject) => ***REMOVED***
    if (!access_token) ***REMOVED***
      return reject(null, ***REMOVED***
        message: 'No access_token.'
***REMOVED***);
***REMOVED***

    // Get the profile.
    getProfile(provider, query, async (err, profile) => ***REMOVED***
      if (err) ***REMOVED***
        return reject(err);
***REMOVED***

      // We need at least the mail.
      if (!profile.email) ***REMOVED***
        return reject([***REMOVED***
          message: 'Email was not available.'
  ***REMOVED*** null]);
***REMOVED***

      try ***REMOVED***
        const users = await strapi.query('user', 'users-permissions').find(***REMOVED***
          where: ***REMOVED***
            email: profile.email
    ***REMOVED***
  ***REMOVED***);

        const advanced = await strapi.store(***REMOVED***
          environment: '',
          type: 'plugin',
          name: 'users-permissions',
          key: 'advanced'
  ***REMOVED***).get();

        if (_.isEmpty(_.find(users, ***REMOVED***provider***REMOVED***)) && !advanced.allow_register) ***REMOVED***
          return resolve([null, [***REMOVED*** messages: [***REMOVED*** id: 'Auth.advanced.allow_register' ***REMOVED***] ***REMOVED***], 'Register action is actually not available.']);
  ***REMOVED***
        const user = _.find(users, ***REMOVED***socialProvider: provider***REMOVED***);
        // const user = _.find(users, ***REMOVED***provider***REMOVED***);

        if (!_.isEmpty(user)) ***REMOVED***
          return resolve([user, null]);
  ***REMOVED***

        if (!_.isEmpty(_.find(users, user => user.socialProvider !== provider)) && advanced.unique_email) ***REMOVED***
          return resolve([null, [***REMOVED*** messages: [***REMOVED*** id: 'Auth.form.error.email.taken' ***REMOVED***] ***REMOVED***], 'Email is already taken.']);
  ***REMOVED***

        // Retrieve default role.
        const defaultRole = await strapi.query('role', 'users-permissions').findOne(***REMOVED*** type: advanced.default_role ***REMOVED***, []);

        // Create the new user.
        const params = _.assign(profile, ***REMOVED***
          provider: provider,
          role: defaultRole._id || defaultRole.id
  ***REMOVED***);

        const createdUser = await strapi.query('user', 'users-permissions').create(params);

        return resolve([createdUser, null]);
***REMOVED*** catch (err) ***REMOVED***
        reject([null, err]);
***REMOVED***
***REMOVED***);
***REMOVED***);
***REMOVED***;

/**
 * Helper to get profiles
 *
 * @param ***REMOVED***String***REMOVED***   provider
 * @param ***REMOVED***Function***REMOVED*** callback
 */

const getProfile = async (provider, query, callback) => ***REMOVED***
  const access_token = query.access_token || query.code || query.oauth_token;

  const grant = await strapi.store(***REMOVED***
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
    key: 'grant'
***REMOVED***).get();

  switch (provider) ***REMOVED***
    case 'discord': ***REMOVED***
      const discord = new Purest(***REMOVED***
        provider: 'discord',
        config: ***REMOVED***
          'discord': ***REMOVED***
            'https://discordapp.com/api/': ***REMOVED***
              '__domain': ***REMOVED***
                'auth': ***REMOVED***
                  'auth': ***REMOVED***'bearer': '[0]'***REMOVED***
          ***REMOVED***
        ***REMOVED***
              '***REMOVED***endpoint***REMOVED***': ***REMOVED***
                '__path': ***REMOVED***
                  'alias': '__default'
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***);
      discord.query().get('users/@me').auth(access_token).request((err, res, body) => ***REMOVED***
        if (err) ***REMOVED***
          callback(err);
  ***REMOVED*** else ***REMOVED***
          // Combine username and discriminator because discord username is not unique
          var username = `$***REMOVED***body.username***REMOVED***#$***REMOVED***body.discriminator***REMOVED***`;
          callback(null, ***REMOVED***
            username: username,
            email: body.email
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    case 'facebook': ***REMOVED***
      const facebook = new Purest(***REMOVED***
        provider: 'facebook'
***REMOVED***);

      facebook.query().get('me?fields=name,email, first_name, last_name, picture').auth(access_token).request((err, res, body) => ***REMOVED***
        if (err) ***REMOVED***
          console.error(err);
          callback(err);
  ***REMOVED*** else ***REMOVED***
          callback(null, ***REMOVED***
            username: body.email,
            email: body.email,
            firstName: body.first_name,
            lastName: body.last_name,
            confirmed: true,
            imageUrl: body.picture ?
              (body.picture.data ?
                (body.picture.data.url ? body.picture.data.url : '') : '') : '',
            socialProvider: 'facebook'
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    case 'google': ***REMOVED***
      const google = new Purest(***REMOVED***
        provider: 'google'
***REMOVED***);

      google.query('plus').get('people/me').auth(access_token).request((err, res, body) => ***REMOVED***
        if (err) ***REMOVED***
          callback(err);
  ***REMOVED*** else ***REMOVED***
          callback(null, ***REMOVED***
            username: body.emails[0].value,
            email: body.emails[0].value,
            firstName: body.name.givenName,
            lastName: body.name.familyName,
            imageUrl: body.image? body.image.url:'',
            confirmed: true,
            socialProvider: 'google'
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    case 'github': ***REMOVED***
      const github = new Purest(***REMOVED***
        provider: 'github',
        defaults: ***REMOVED***
          headers: ***REMOVED***
            'user-agent': 'strapi'
    ***REMOVED***
  ***REMOVED***
***REMOVED***);

      request.post(***REMOVED***
        url: 'https://github.com/login/oauth/access_token',
        form: ***REMOVED***
          client_id: grant.github.key,
          client_secret: grant.github.secret,
          code: access_token
  ***REMOVED***
***REMOVED*** (err, res, body) => ***REMOVED***
        github.query().get('user').auth(body.split('&')[0].split('=')[1]).request((err, res, body) => ***REMOVED***
          if (err) ***REMOVED***
            callback(err);
    ***REMOVED*** else ***REMOVED***
            callback(null, ***REMOVED***
              username: body.login,
              email: body.email
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***);
      break;
***REMOVED***
    case 'microsoft': ***REMOVED***
      const microsoft = new Purest(***REMOVED***
        provider: 'microsoft',
        config:***REMOVED***
          'microsoft': ***REMOVED***
            'https://graph.microsoft.com': ***REMOVED***
              '__domain': ***REMOVED***
                'auth': ***REMOVED***
                  'auth': ***REMOVED***'bearer': '[0]'***REMOVED***
          ***REMOVED***
        ***REMOVED***
              '[version]/***REMOVED***endpoint***REMOVED***': ***REMOVED***
                '__path': ***REMOVED***
                  'alias': '__default',
                  'version': 'v1.0'
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***);

      microsoft.query().get('me').auth(access_token).request((err, res, body) => ***REMOVED***
        if (err) ***REMOVED***
          callback(err);
  ***REMOVED*** else ***REMOVED***
          callback(null, ***REMOVED***
            username: body.userPrincipalName,
            email: body.userPrincipalName
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    case 'twitter': ***REMOVED***
      const twitter = new Purest(***REMOVED***
        provider: 'twitter',
        key: grant.twitter.key,
        secret: grant.twitter.secret
***REMOVED***);

      twitter.query().get('account/verify_credentials').auth(access_token, query.access_secret).qs(***REMOVED***screen_name: query['raw[screen_name]'], include_email: 'true'***REMOVED***).request((err, res, body) => ***REMOVED***
        if (err) ***REMOVED***
          callback(err);
  ***REMOVED*** else ***REMOVED***
          callback(null, ***REMOVED***
            username: body.screen_name,
            email: body.email
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
      break;
***REMOVED***
    default:
      callback(***REMOVED***
        message: 'Unknown provider.'
***REMOVED***);
      break;
***REMOVED***
***REMOVED***;
