'use strict';

/**
 * Brand.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = ***REMOVED***

  /**
   * Promise to fetch all brands.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  fetchAll: (params) => ***REMOVED***
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('brand', params);
    // Select field to populate.
    const populate = Brand.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Brand
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
***REMOVED***,

  /**
   * Promise to fetch a/an brand.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  fetch: (params) => ***REMOVED***
    // Select field to populate.
    const populate = Brand.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Brand
      .findOne(_.pick(params, _.keys(Brand.schema.paths)))
      .populate(populate);
***REMOVED***,

  /**
   * Promise to count brands.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  count: (params) => ***REMOVED***
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('brand', params);

    return Brand
      .count()
      .where(filters.where);
***REMOVED***,

  /**
   * Promise to add a/an brand.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  add: async (values) => ***REMOVED***
    // Extract values related to relational data.
    const relations = _.pick(values, Brand.associations.map(ast => ast.alias));
    const data = _.omit(values, Brand.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Brand.create(data);

    // Create relational data and return the entry.
    return Brand.updateRelations(***REMOVED*** _id: entry.id, values: relations ***REMOVED***);
***REMOVED***,

  /**
   * Promise to edit a/an brand.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  edit: async (params, values) => ***REMOVED***
    // Extract values related to relational data.
    const relations = _.pick(values, Brand.associations.map(a => a.alias));
    const data = _.omit(values, Brand.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Brand.update(params, data, ***REMOVED*** multi: true ***REMOVED***);

    // Update relational data and return the entry.
    return Brand.updateRelations(Object.assign(params, ***REMOVED*** values: relations ***REMOVED***));
***REMOVED***,

  /**
   * Promise to remove a/an brand.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  remove: async params => ***REMOVED***
    // Select field to populate.
    const populate = Brand.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `***REMOVED*** passRawResult: true ***REMOVED***` as second argument.
    const data = await Brand
      .findOneAndRemove(params, ***REMOVED******REMOVED***)
      .populate(populate);

    if (!data) ***REMOVED***
      return data;
***REMOVED***

    await Promise.all(
      Brand.associations.map(async association => ***REMOVED***
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? ***REMOVED*** [association.via]: data._id ***REMOVED*** : ***REMOVED*** [association.via]: ***REMOVED*** $in: [data._id] ***REMOVED*** ***REMOVED***;
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? ***REMOVED*** [association.via]: null ***REMOVED*** : ***REMOVED*** $pull: ***REMOVED*** [association.via]: data._id ***REMOVED*** ***REMOVED***;

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, ***REMOVED*** multi: true ***REMOVED***);
***REMOVED***)
    );

    return data;
***REMOVED***,

  /**
   * Promise to search a/an brand.
   *
   * @return ***REMOVED***Promise***REMOVED***
   */

  search: async (params) => ***REMOVED***
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('brand', params);
    // Select field to populate.
    const populate = Brand.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Brand.attributes).reduce((acc, curr) => ***REMOVED***
      switch (Brand.attributes[curr].type) ***REMOVED***
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) ***REMOVED***
            return acc.concat(***REMOVED*** [curr]: params._q ***REMOVED***);
    ***REMOVED***

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat(***REMOVED*** [curr]: ***REMOVED*** $regex: params._q, $options: 'i' ***REMOVED*** ***REMOVED***);
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') ***REMOVED***
            return acc.concat(***REMOVED*** [curr]: params._q === 'true' ***REMOVED***);
    ***REMOVED***

          return acc;
        default:
          return acc;
***REMOVED***
***REMOVED***, []);

    return Brand
      .find(***REMOVED*** $or ***REMOVED***)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
***REMOVED***
***REMOVED***;
