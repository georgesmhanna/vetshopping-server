const _ = require('lodash');

module.exports = async (ctx, next) => ***REMOVED***
  const ***REMOVED*** source ***REMOVED*** = ctx.request.query;

  if (source && _.get(strapi.plugins, [source, 'config', 'layout', ctx.params.model, 'actions', ctx.request.route.action])) ***REMOVED***
    const [ controller, action ] = _.get(strapi.plugins, [source, 'config', 'layout', ctx.params.model, 'actions', ctx.request.route.action], []).split('.');

    if (controller && action) ***REMOVED***
      // Redirect to specific controller.
      if (ctx.request.body.hasOwnProperty('fields') && ctx.request.body.hasOwnProperty('files')) ***REMOVED***
        let ***REMOVED***files, fields***REMOVED*** = ctx.request.body;

        const parser = (value) => ***REMOVED***
          try ***REMOVED***
            value = JSON.parse(value);
    ***REMOVED*** catch (e) ***REMOVED***
            // Silent.
    ***REMOVED***

          return _.isArray(value) ? value.map(obj => parser(obj)) : value;
  ***REMOVED***;

        fields = Object.keys(fields).reduce((acc, current) => ***REMOVED***
          acc[current] = parser(fields[current]);

          return acc;
  ***REMOVED*** ***REMOVED******REMOVED***);

        ctx.request.body = fields;

        await strapi.plugins[source].controllers[controller.toLowerCase()][action](ctx);
        const resBody = ctx.body;

        await Promise.all(Object.keys(files).map(async field => ***REMOVED***
          ctx.request.body = ***REMOVED***
            files: ***REMOVED***
              files: files[field]
      ***REMOVED***
            fields: ***REMOVED***
              refId: resBody.id || resBody._id,
              ref: ctx.params.model,
              source,
              field
      ***REMOVED***
    ***REMOVED***;

          return strapi.plugins.upload.controllers.upload.upload(ctx);
  ***REMOVED***));

        return ctx.send(resBody);
***REMOVED***

      return await strapi.plugins[source].controllers[controller.toLowerCase()][action](ctx);
***REMOVED***
***REMOVED***

  await next();
***REMOVED***;
