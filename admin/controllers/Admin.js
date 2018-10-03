'use strict';

const path = require('path');
const exec = require('child_process').spawnSync;
const _ = require('lodash');

/**
 * A set of functions called "actions" for `Admin`
 */

module.exports = ***REMOVED***
  getCurrentEnvironment: async ctx => ***REMOVED***
    try ***REMOVED***
      ctx.send(***REMOVED*** currentEnvironment: strapi.app.env ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getStrapiVersion: async ctx => ***REMOVED***
    try ***REMOVED***
      const strapiVersion = _.get(strapi.config, 'info.strapi', null);
      return ctx.send(***REMOVED*** strapiVersion ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'The version is not available' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getGaConfig: async ctx => ***REMOVED***
    try ***REMOVED***
      const allowGa = _.get(strapi.config, 'info.customs.allowGa', true);
      ctx.send(***REMOVED*** allowGa ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  getLayout: async ctx => ***REMOVED***
    try ***REMOVED***
      const layout = require('../config/layout.js');

      return ctx.send(***REMOVED*** layout ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      return ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  installPlugin: async ctx => ***REMOVED***
    try ***REMOVED***
      const ***REMOVED*** plugin, port ***REMOVED*** = ctx.request.body;
      const strapiBin = path.join(process.cwd(), 'node_modules', 'strapi', 'bin', 'strapi');

      strapi.reload.isWatching = false;

      strapi.log.info(`Installing $***REMOVED***plugin***REMOVED***...`);
      exec('node', [strapiBin, 'install', plugin, (port === '4000') ? '--dev' : '']);

      ctx.send(***REMOVED*** ok: true ***REMOVED***);

      strapi.reload();
***REMOVED*** catch(err) ***REMOVED***
      strapi.reload.isWatching = true;
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  plugins: async ctx => ***REMOVED***
    try ***REMOVED***
      const plugins = Object.keys(strapi.plugins).reduce((acc, key) => ***REMOVED***
        acc[key] = strapi.plugins[key].package.strapi;

        return acc;
***REMOVED*** ***REMOVED******REMOVED***);

      ctx.send(***REMOVED*** plugins ***REMOVED***);
***REMOVED*** catch(err) ***REMOVED***
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***,

  uninstallPlugin: async ctx => ***REMOVED***
    try ***REMOVED***
      const ***REMOVED*** plugin ***REMOVED*** = ctx.params;
      const strapiBin = path.join(process.cwd(), 'node_modules', 'strapi', 'bin', 'strapi');

      strapi.reload.isWatching = false;

      strapi.log.info(`Uninstalling $***REMOVED***plugin***REMOVED***...`);
      exec('node', [strapiBin, 'uninstall', plugin]);

      ctx.send(***REMOVED*** ok: true ***REMOVED***);

      strapi.reload();
***REMOVED*** catch(err) ***REMOVED***
      strapi.reload.isWatching = true;
      ctx.badRequest(null, [***REMOVED*** messages: [***REMOVED*** id: 'An error occurred' ***REMOVED***] ***REMOVED***]);
***REMOVED***
***REMOVED***
***REMOVED***;
