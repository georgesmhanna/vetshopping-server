'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');

module.exports = strapi => ***REMOVED***
  return ***REMOVED***
    beforeInitialize: function() ***REMOVED***
      strapi.config.middleware.load.before.unshift('users-permissions');
***REMOVED***,

    initialize: function(cb) ***REMOVED***
      _.forEach(strapi.admin.config.routes, value => ***REMOVED***
        if (_.get(value.config, 'policies')) ***REMOVED***
          value.config.policies.unshift('plugins.users-permissions.permissions');
  ***REMOVED***
***REMOVED***);

      _.forEach(strapi.config.routes, value => ***REMOVED***
        if (_.get(value.config, 'policies')) ***REMOVED***
          value.config.policies.unshift('plugins.users-permissions.permissions');
  ***REMOVED***
***REMOVED***);

      if (strapi.plugins) ***REMOVED***
        _.forEach(strapi.plugins, (plugin, name) => ***REMOVED***
          _.forEach(plugin.config.routes, value => ***REMOVED***
            if (_.get(value.config, 'policies')) ***REMOVED***
              value.config.policies.unshift('plugins.users-permissions.permissions');
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

      cb();
***REMOVED***
***REMOVED***;
***REMOVED***;
