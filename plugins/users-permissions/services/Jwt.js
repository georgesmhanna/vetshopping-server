'use strict';

/**
 * Jwt.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
const jwt = require('jsonwebtoken');

const defaultJwtOptions = ***REMOVED*** expiresIn: '30d' ***REMOVED***;

module.exports = ***REMOVED***
  getToken: function (ctx) ***REMOVED***
    const params = _.assign(***REMOVED******REMOVED***, ctx.request.body, ctx.request.query);

    let token = '';

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) ***REMOVED***
      const parts = ctx.request.header.authorization.split(' ');

      if (parts.length === 2) ***REMOVED***
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) ***REMOVED***
          token = credentials;
  ***REMOVED***
***REMOVED*** else ***REMOVED***
        throw new Error('Invalid authorization header format. Format is Authorization: Bearer [token]');
***REMOVED***
***REMOVED*** else if (params.token) ***REMOVED***
      token = params.token;
***REMOVED*** else ***REMOVED***
      throw new Error('No authorization header was found');
***REMOVED***

    return this.verify(token);
***REMOVED***,

  issue: (payload, jwtOptions = ***REMOVED******REMOVED***) => ***REMOVED***
    _.defaults(jwtOptions, defaultJwtOptions);
    return jwt.sign(
      _.clone(payload.toJSON ? payload.toJSON() : payload),
      process.env.JWT_SECRET || _.get(strapi.plugins['users-permissions'], 'config.jwtSecret') || 'oursecret',
      jwtOptions,
    );
***REMOVED***,

  verify: (token) => ***REMOVED***
    return new Promise(function (resolve, reject) ***REMOVED***
      jwt.verify(
        token,
        process.env.JWT_SECRET || _.get(strapi.plugins['users-permissions'], 'config.jwtSecret') || 'oursecret',
        ***REMOVED******REMOVED***,
        function (err, tokenPayload = ***REMOVED******REMOVED***) ***REMOVED***
          if (err) ***REMOVED***
            return reject(new Error('Invalid token.'));
    ***REMOVED***
          resolve(tokenPayload);
  ***REMOVED***
      );
***REMOVED***);
***REMOVED***
***REMOVED***;
