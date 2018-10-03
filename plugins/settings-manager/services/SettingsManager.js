'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const exec = require('child_process').spawnSync;

module.exports = ***REMOVED***
  menu: ***REMOVED***
    sections: [
      ***REMOVED***
        name: 'menu.section.global-settings',
        items: [
          ***REMOVED***
            slug: 'application',
            name: 'menu.item.application',
            icon: 'globe'
    ***REMOVED***
          ***REMOVED***
            slug: 'languages',
            name: 'menu.item.languages',
            icon: 'language'
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'menu.section.environments',
        items: [
          ***REMOVED***
            slug: 'databases',
            name: 'menu.item.database',
            icon: 'database'
    ***REMOVED***
          ***REMOVED***
            slug: 'request',
            name: 'menu.item.request',
            icon: 'compress'
    ***REMOVED***
          ***REMOVED***
            slug: 'response',
            name: 'menu.item.response',
            icon: 'upload'
    ***REMOVED***
          ***REMOVED***
            slug: 'security',
            name: 'menu.item.security',
            icon: 'shield'
    ***REMOVED***
          ***REMOVED***
            slug: 'server',
            name: 'menu.item.server',
            icon: 'server'
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***,

  application: async () => ***REMOVED***
    const application = await strapi.store(***REMOVED***
      environment: '',
      type: 'core',
      key: 'application'
***REMOVED***).get();

    return ***REMOVED***
      name: 'form.application.name',
      description: 'form.application.description',
      sections: [
        ***REMOVED***
          name: '',
          items: [
            ***REMOVED***
              name: 'form.application.item.name',
              target: 'application.name',
              source: 'db',
              type: 'string',
              value: _.get(application, 'name', null),
              validations : ***REMOVED***
                maxLength: 255,
                required: true
        ***REMOVED***
      ***REMOVED***
            ***REMOVED***
              name: 'form.application.item.description',
              target: 'application.description',
              source: 'db',
              type: 'string',
              value: _.get(application, 'description', null),
              validations : ***REMOVED***
                maxLength: 255,
                required: true
        ***REMOVED***
      ***REMOVED***
            ***REMOVED***
              name: 'form.application.item.version',
              target: 'package.version',
              type: 'string',
              value: _.get(strapi.config, 'info.version', null),
              validations : ***REMOVED***
                regex: '^(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$',
                required: true
        ***REMOVED***
      ***REMOVED***
          ]
  ***REMOVED***
      ]
***REMOVED***;
***REMOVED***,

  request: env => (***REMOVED***
    name: 'form.request.name',
    description: 'form.request.description',
    sections: [
      ***REMOVED***
        name: 'form.request.item.logger',
        items: [
          ***REMOVED***
            name: 'form.request.item.logger.level',
            target: 'request.logger.level',
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.request.logger.level`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.request.item.logger.exposeInContext',
            target: 'request.logger.exposeInContext',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.request.logger.exposeInContext`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.request.item.logger.requests',
            target: 'request.logger.requests',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.request.logger.requests`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.request.item.parser',
        items: [
          ***REMOVED***
            name: 'form.request.item.parser.enabled',
            target: 'request.parser.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.request.parser.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.request.item.parser.multipart',
                target: 'request.parser.multipart',
                type: 'boolean',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.request.parser.multipart`, null),
                validations : ***REMOVED***
                  required: true
          ***REMOVED***
        ***REMOVED***
            ]
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.request.item.router',
        items: [
          ***REMOVED***
            name: 'form.request.item.router.prefix',
            target: 'request.router.prefix',
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.request.router.prefix`, null),
            validations : ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***),

  response: env => (***REMOVED***
    name: 'form.response.name',
    description: 'form.response.description',
    sections: [
      ***REMOVED***
        name: '',
        items: [
          ***REMOVED***
            name: 'form.response.item.gzip.enabled',
            target: 'response.gzip.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.response.gzip.enabled`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.response.item.responseTime.enabled',
            target: 'response.responseTime.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.response.responseTime.enabled`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***),

  security: env => (***REMOVED***
    name: 'form.security.name',
    description: 'form.security.description',
    sections: [
      ***REMOVED***
        name: 'form.security.item.csrf',
        items: [
          ***REMOVED***
            name: 'form.security.item.csrf.enabled',
            target: 'security.csrf.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.csrf.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.security.item.csrf.key',
                target: 'security.csrf.key',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.csrf.key`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.security.item.csrf.secret',
                target: 'security.csrf.secret',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.csrf.secret`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.security.item.csrf.cookie',
                target: 'security.csrf.cookie',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.csrf.cookie`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.security.item.csrf.angular',
                target: 'security.csrf.angular',
                type: 'boolean',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.csrf.angular`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.security.item.p3p',
        items: [
          ***REMOVED***
            name: 'form.security.item.p3p.enabled',
            target: 'security.p3p.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.p3p.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.security.item.p3p.value',
                target: 'security.p3p.value',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.p3p.value`, null),
                validations: ***REMOVED***
                  required: true
          ***REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.security.item.hsts',
        items: [
          ***REMOVED***
            name: 'form.security.item.hsts.enabled',
            target: 'security.hsts.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.hsts.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.security.item.hsts.maxAge',
                target: 'security.hsts.maxAge',
                type: 'number',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.hsts.maxAge`, null),
                validations: ***REMOVED***
                  required: true
          ***REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.security.item.hsts.includeSubDomains',
                target: 'security.hsts.includeSubDomains',
                type: 'boolean',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.hsts.includeSubDomains`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.security.item.hsts.preload',
                target: 'security.hsts.preload',
                type: 'boolean',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.hsts.preload`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.security.item.xframe',
        items: [
          ***REMOVED***
            name: 'form.security.item.xframe.enabled',
            target: 'security.xframe.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.xframe.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.security.item.xframe.value',
                target: 'security.xframe.value',
                type: 'enum',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.xframe.value`, null),
                items: [
                  ***REMOVED***
                    name: 'form.security.item.xframe.deny',
                    value: 'DENY',
            ***REMOVED***
                  ***REMOVED***
                    name: 'form.security.item.xframe.sameorigin',
                    value: 'SAMEORIGIN',
            ***REMOVED***
                  ***REMOVED***
                    name: 'form.security.item.xframe.allow-from',
                    value: 'ALLOW-FROM',
                    items: [***REMOVED***
                      name: '',
                      target: 'security.xframe.value.nested',
                      type: 'string',
                      value: '',
                      validations: ***REMOVED***
                        required: true
                ***REMOVED***
              ***REMOVED***]
            ***REMOVED***
                ],
                validations: ***REMOVED***
                  required: true
          ***REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.security.item.xssProtection',
        items: [
          ***REMOVED***
            name: 'form.security.item.xssProtection.enabled',
            target: 'security.xssProtection.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.xssProtection.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.security.item.xssProtection.mode',
                target: 'security.xssProtection.mode',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.xssProtection.mode`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.security.item.cors',
        items: [
          ***REMOVED***
            name: 'form.security.item.cors.enabled',
            target: 'security.cors.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.cors.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.security.item.cors.origin',
                target: 'security.cors.origin',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.security.cors.origin`, null),
                validations: ***REMOVED***
                  required: true
          ***REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***),

  server: env => (***REMOVED***
    name: 'form.server.name',
    description: 'form.server.description',
    sections: [
      ***REMOVED***
        name: '',
        items: [
          ***REMOVED***
            name: 'form.server.item.host',
            target: 'server.host',
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.host`, null),
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.server.item.port',
            target: 'server.port',
            type: 'number',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.port`, null),
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.server.item.cron',
            target: 'server.cron.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.cron.enabled`, null)
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: 'form.server.item.proxy',
        items: [
          ***REMOVED***
            name: 'form.server.item.proxy.enable',
            target: 'server.proxy.enabled',
            type: 'boolean',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.proxy.enabled`, null),
            items: [
              ***REMOVED***
                name: 'form.server.item.proxy.host',
                target: 'server.proxy.host',
                type: 'string',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.proxy.host`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.server.item.proxy.port',
                target: 'server.proxy.port',
                type: 'number',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.proxy.port`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
              ***REMOVED***
                name: 'form.server.item.proxy.ssl',
                target: 'server.proxy.ssl',
                type: 'boolean',
                value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.server.proxy.ssl`, null),
                validations: ***REMOVED******REMOVED***
        ***REMOVED***
            ],
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***),

  i18n: env => (***REMOVED***
    name: 'form.language.name',
    description: 'form.language.description',
    sections: [
      ***REMOVED***
        name: '',
        items: [
          ***REMOVED***
            name: 'form.language.choose',
            target: 'language.defaultLocale',
            type: 'select',
            items: strapi.plugins['settings-manager'].services.languages
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***),

  databases: (name, env) => (***REMOVED***
    name: 'form.database.name',
    description: 'form.database.description',
    sections: [
      ***REMOVED***
        name: '',
        items: [
          ***REMOVED***
            name: 'form.database.item.name',
            target: `database.connections.$***REMOVED***name***REMOVED***.name`,
            type: 'string',
            value: name,
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.connector',
            target: `database.connections.$***REMOVED***name***REMOVED***.connector`,
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.connector`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.client',
            target: `database.connections.$***REMOVED***name***REMOVED***.settings.client`,
            type: 'select',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.settings.client`, null),
            items: [
              ***REMOVED***
                name: 'form.database.item.provider.mongo',
                value: 'mongo',
                port: 27017
        ***REMOVED***
              ***REMOVED***
                name: 'form.database.item.provider.postgres',
                value: 'postgres',
                port: 5432
        ***REMOVED***
              ***REMOVED***
                name: 'form.database.item.provider.mysql',
                value: 'mysql',
                port: 3306
        ***REMOVED***
              ***REMOVED***
                name: 'form.database.item.provider.redis',
                value: 'redis',
                port: 6379
        ***REMOVED***
            ],
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.host',
            target: `database.connections.$***REMOVED***name***REMOVED***.settings.host`,
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.settings.host`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.port',
            target: `database.connections.$***REMOVED***name***REMOVED***.settings.port`,
            type: 'number',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.settings.port`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.database',
            target: `database.connections.$***REMOVED***name***REMOVED***.settings.database`,
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.settings.database`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.username',
            target: `database.connections.$***REMOVED***name***REMOVED***.settings.username`,
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.settings.username`, null),
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.password',
            target: `database.connections.$***REMOVED***name***REMOVED***.settings.password`,
            type: 'password',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.settings.password`, null),
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.authenticationDatabase',
            target: `database.connections.$***REMOVED***name***REMOVED***.options.authenticationDatabase`,
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.options.authenticationDatabase`, null),
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
          ***REMOVED***
            name: 'form.database.item.ssl',
            target: `database.connections.$***REMOVED***name***REMOVED***.options.ssl`,
            type: 'boolean',
            value: [true, 'true'].includes(_.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.connections.$***REMOVED***name***REMOVED***.options.ssl`, false)),
            validations: ***REMOVED******REMOVED***
    ***REMOVED***
        ]
***REMOVED***
      ***REMOVED***
        name: '',
        items: [
          ***REMOVED***
            name: 'form.database.item.default',
            target: 'database.defaultConnection',
            type: 'string',
            value: _.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.defaultConnection`, null),
            validations: ***REMOVED***
              required: true
      ***REMOVED***
    ***REMOVED***
        ]
***REMOVED***
    ]
***REMOVED***),

  getEnvironments: () => ***REMOVED***
    return _.map(_.keys(strapi.config.environments), environment => ***REMOVED***
      return ***REMOVED***
        name: environment,
        active: (strapi.config.environment === environment)
***REMOVED***;
***REMOVED***);
***REMOVED***,

  getLanguages: () => ***REMOVED***
    return _.map(strapi.config.language.locales, language => ***REMOVED***
      return ***REMOVED***
        name: language,
        active: (strapi.config.language.defaultLocale === language)
***REMOVED***;
***REMOVED***);
***REMOVED***,

  getDatabases: env => ***REMOVED***
    const databases = [];

    const databasesUsed = [];
    _.forEach(strapi.models, model => ***REMOVED***
      databasesUsed.push(model.connection);
***REMOVED***);

    _.forEach(strapi.config.environments[env].database.connections, (connection, name) =>  databases.push(***REMOVED***
      connector: _.get(connection, 'connector'),
      letter: strapi.plugins['settings-manager'].services.settingsmanager.getClientLetter(_.get(connection, 'settings.client')),
      color: strapi.plugins['settings-manager'].services.settingsmanager.getClientColor(_.get(connection, 'settings.client')),
      name,
      host: _.get(connection, 'settings.host'),
      database: _.get(connection, 'settings.database'),
      active: (_.get(strapi.config, `environments.$***REMOVED***env***REMOVED***.database.defaultConnection`) === name),
      isUsed: _.includes(databasesUsed, name)
***REMOVED***));

    return databases;
***REMOVED***,

  getClientConnector: client => ***REMOVED***
    const bookshelfClients = ['postgres', 'mysql'];
    const mongooseClients = ['mongo'];
    const redisClients = ['redis'];

    let connector;
    if (_.indexOf(bookshelfClients, client) !== -1) connector = 'strapi-hook-bookshelf';
    if (_.indexOf(mongooseClients, client) !== -1) connector = 'strapi-hook-mongoose';
    if (_.indexOf(redisClients, client) !== -1) connector = 'strapi-hook-redis';

    return connector;
***REMOVED***,

  getClientColor: client => ***REMOVED***
    switch (client) ***REMOVED***
      case 'postgres':
        return '#ffb500';
        break;
      case 'mysql':
        return '#4479a1';
        break;
      case 'redis':
        return '#ff5d00';
        break;
      case 'mongo':
        return '#43b121';
        break;
      default:
        return '#000000';
***REMOVED***
***REMOVED***,

  getClientLetter: client => ***REMOVED***
    switch (client) ***REMOVED***
      case 'postgres':
        return 'PG';
        break;
      case 'mysql':
        return 'MY';
        break;
      default:
        return _.upperCase(_.head(client));
***REMOVED***
***REMOVED***,

  getItems: model => ***REMOVED***
    return _.flatten(_.map(model.sections, section => ***REMOVED***
      let items = section.items;

      _.forEach(items, item => ***REMOVED*** if (item.type === 'boolean' && _.has(item, 'items')) items = _.concat(items, item.items) ***REMOVED***);

      return items
***REMOVED***));
***REMOVED***,

  cleanParams: (params, items) => ***REMOVED***
    const cleanParams = ***REMOVED******REMOVED***;

    _.forEach(items, (***REMOVED*** target ***REMOVED***) => _.has(params, target) ? _.set(cleanParams, target, _.get(params, target)) : '');

    return cleanParams;
***REMOVED***,

  formatErrors: errors => _.map(_.groupBy(errors, 'target'), (errs, target) => ***REMOVED***
    return ***REMOVED***
      target,
      messages: _.map(errs, err => ***REMOVED***
        return ***REMOVED***
          id: err.message,
          params: _.get(err, 'params', undefined)
  ***REMOVED***;
***REMOVED***)
***REMOVED***;
***REMOVED***),

  paramsValidation: (params, items) => ***REMOVED***
    let errors = [];

    const reformat = (value, format) => ***REMOVED***
      if (format === 'number') try ***REMOVED*** return parseFloat(number) ***REMOVED*** catch (e) ***REMOVED*** return null ***REMOVED***;
      if (format === 'boolean') return value === 'true';

      return value;
***REMOVED***;

    const checkType = (input, ***REMOVED*** type, target, items ***REMOVED***) => ***REMOVED***
      if ((type === 'string' || type === 'text' || type === 'password') && !_.isString(input)) return errors.push(***REMOVED***
        target: target,
        message: 'request.error.type.string'
***REMOVED***);

      if (type === 'number' && !_.isNumber(input)) return errors.push(***REMOVED***
        target: target,
        message: 'request.error.type.number'
***REMOVED***);

      if (type === 'boolean' && !_.isBoolean(input)) return errors.push(***REMOVED***
        target: target,
        message: 'request.error.type.boolean'
***REMOVED***);

      if (type === 'select' && !_.find(items, ***REMOVED*** value: input ***REMOVED***)) return errors.push(***REMOVED***
        target: target,
        message: 'request.error.type.select'
***REMOVED***);

      if (type === 'enum' && !_.find(items, ***REMOVED*** value: input ***REMOVED***)) ***REMOVED***
        const key = input.split('.')[0];
        input = _.drop(input.split('.')).join('.');

        const item = _.find(items, ***REMOVED*** value: key ***REMOVED***);

        if (!item) return errors.push(***REMOVED***
          target: target,
          message: 'request.error.type.enum'
  ***REMOVED***);

        input = reformat(input, item.type);
        params[target] = input;

        _.forEach(item.items, subItem => ***REMOVED***
          subItem.target = target;
          if (_.has(params, subItem.target)) ***REMOVED***
            const input = _.get(params, subItem.target, null);

            checkType(input, subItem);
            checkValidations(input, subItem);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***
***REMOVED***;

    const checkValidations = (input, item) => ***REMOVED***
      _.forEach(item.validations, (value, key) => ***REMOVED***
        if (key === 'required' && (_.isNull(input) || (_.isString(input) && _.isEmpty(input)) || _.isUndefined(input))) errors.push(***REMOVED***
          target: item.target,
          message: 'request.error.validation.required'
  ***REMOVED***);

        if (key === 'regex' && !new RegExp(value).test(input)) errors.push(***REMOVED***
          target: item.target,
          message: 'request.error.validation.regex'
  ***REMOVED***);

        if (key === 'max' && parseInt(input) > value) errors.push(***REMOVED***
          target: item.target,
          message: 'request.error.validation.max'
  ***REMOVED***);

        if (key === 'min' && parseInt(input) < value) errors.push(***REMOVED***
          target: item.target,
          message: 'request.error.validation.min'
  ***REMOVED***);

        if (key === 'maxLength' && input.length > value) errors.push(***REMOVED***
          target: item.target,
          message: 'request.error.validation.maxLength'
  ***REMOVED***);

        if (key === 'minLength' && input.length  < value) errors.push(***REMOVED***
          target: item.target,
          message: 'request.error.validation.minLength'
  ***REMOVED***);
***REMOVED***);
***REMOVED***;

    _.forEach(items, item => ***REMOVED***
      if (_.has(params, item.target)) ***REMOVED***
        const input = _.get(params, item.target, null);

        checkType(input, item);
        checkValidations(input, item);
***REMOVED***
***REMOVED***);

    return [params, errors];
***REMOVED***,

  updateSettings: async (params, items, env = '') => ***REMOVED***
    const appPath = strapi.config.appPath;
    const errors = [];

    async function asyncForEach(array, callback) ***REMOVED***
      for (let index = 0; index < array.length; index++) ***REMOVED***
        await callback(array[index], index, array);
***REMOVED***
***REMOVED***

    await asyncForEach(items, async (***REMOVED*** target, source ***REMOVED***) => ***REMOVED***
      if (_.has(params, target)) ***REMOVED***
        let input = _.get(params, target, null);
        const [file, ...objPath] = target.split('.');

        if (source === 'db') ***REMOVED***
          const store = strapi.store(***REMOVED***
            environment: env,
            type: 'core',
            key: file
    ***REMOVED***);

          const data = await store.get();

          _.set(data, objPath, input);

          await store.set(***REMOVED***value: data***REMOVED***);

          return;
  ***REMOVED***

        if (target === 'language.defaultLocale') input = _.lowerCase(input).replace(/ /g, '_');

        const filePath = (file === 'package') ? path.join(appPath, 'package.json') : path.join(appPath, 'config', `$***REMOVED***env ? `environments/$***REMOVED***env***REMOVED***` : ''***REMOVED***`, `$***REMOVED***_.replace(file, '.', '/')***REMOVED***.json`);

        try ***REMOVED***
          const fileContent = require(filePath);

          _.set(fileContent, objPath, input);

          try ***REMOVED***
            fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf8');
    ***REMOVED*** catch (e) ***REMOVED***
            errors.push(***REMOVED***
              target,
              message: 'request.error.config',
              params: ***REMOVED***
                filePath: filePath
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED*** catch (e) ***REMOVED***
          errors.push(***REMOVED***
            target,
            message: 'request.error.config',
            params: ***REMOVED***
              filePath: filePath
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
***REMOVED***);

    return errors;
***REMOVED***,

  installDependency: (params, name) => ***REMOVED***
    const clientsDependencies = ***REMOVED***
      postgres: 'pg',
      mysql: 'mysql'
***REMOVED***;

    const client = _.get(clientsDependencies, _.get(params, `database.connections.$***REMOVED***name***REMOVED***.settings.client`));
    const installedClient = _.indexOf(_.keys(strapi.config.info.dependencies), client) !== -1;
    const connector = _.get(params, `database.connections.$***REMOVED***name***REMOVED***.connector`);
    const installedConnector = _.indexOf(_.keys(strapi.config.info.dependencies), connector) !== -1;

    if (connector && !installedConnector) ***REMOVED***
      strapi.log.info(`Installing $***REMOVED***connector***REMOVED*** dependency ...`);
      exec('npm', ['install', `$***REMOVED***connector***REMOVED***@alpha`]);
***REMOVED***

    if (client && !installedClient) ***REMOVED***
      strapi.log.info(`Installing $***REMOVED***client***REMOVED*** dependency ...`);
      exec('npm', ['install', client]);
***REMOVED***
***REMOVED***,

  cleanDependency: (env, config) => ***REMOVED***
    const availableConnectors = ['strapi-hook-mongoose', 'strapi-hook-bookshelf', 'strapi-hook-redis'];
    let usedConnectors = [];
    const errors = [];

    _.forEach(_.keys(strapi.config.environments), environment => ***REMOVED***
      let connections = strapi.config.environments[environment].database.connections;

      if (environment === env) ***REMOVED***
        connections = config.database.connections;
***REMOVED***

      _.forEach(connections, connection => ***REMOVED***
        if (_.get(connection, 'connector')) ***REMOVED***
          usedConnectors.push(connection.connector);
  ***REMOVED***
***REMOVED***);
***REMOVED***);

    usedConnectors = _.uniq(usedConnectors);

    _.forEach(availableConnectors, connector => ***REMOVED***
      const installed = _.indexOf(_.keys(strapi.config.info.dependencies), connector) !== -1;
      const used = _.indexOf(usedConnectors, connector) !== -1;

      if (installed && !used) ***REMOVED***
        const filePath = path.join(strapi.config.appPath, 'package.json');

        try ***REMOVED***
          const fileContent = require(filePath);

          _.set(fileContent, `dependencies.$***REMOVED***connector***REMOVED***`, undefined);

          try ***REMOVED***
            fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf8');
    ***REMOVED*** catch (e) ***REMOVED***
            errors.push(***REMOVED***
              target,
              message: 'request.error.config',
              params: ***REMOVED***
                filePath: filePath
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED*** catch (e) ***REMOVED***
          errors.push(***REMOVED***
            target,
            message: 'request.error.config',
            params: ***REMOVED***
              filePath: filePath
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***
***REMOVED***);

    return errors;
***REMOVED***,

  getModelPath: model => ***REMOVED***
    let searchFilePath;
    const errors = [];
    const searchFileName = `$***REMOVED***model***REMOVED***.settings.json`;
    const apiPath = path.join(strapi.config.appPath, 'api');

    let apis;
    try ***REMOVED***
      apis = fs.readdirSync(apiPath);

      _.forEach(apis, api => ***REMOVED***
        const modelsPath = path.join(apiPath, api, 'models');

        let models;
        try ***REMOVED***
          models = fs.readdirSync(modelsPath);

          const modelIndex = _.indexOf(_.map(models, model => _.toLower(model)), searchFileName);

          if (modelIndex !== -1) searchFilePath = `$***REMOVED***modelsPath***REMOVED***/$***REMOVED***models[modelIndex]***REMOVED***`;
  ***REMOVED*** catch (e) ***REMOVED***
          errors.push(***REMOVED***
            id: 'request.error.folder.read',
            params: ***REMOVED***
              folderPath: modelsPath
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***
***REMOVED***);
***REMOVED*** catch (e) ***REMOVED***
      errors.push(***REMOVED***
        id: 'request.error.folder.read',
        params: ***REMOVED***
          folderPath: apiPath
  ***REMOVED***
***REMOVED***);
***REMOVED***

    return [searchFilePath, errors];
***REMOVED***
***REMOVED***;
