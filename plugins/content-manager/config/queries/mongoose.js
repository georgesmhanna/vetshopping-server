const _ = require('lodash');

module.exports = ***REMOVED***
  find: async function (params, populate, raw = false) ***REMOVED***
    const query = this
      .find(params.where)
      .limit(Number(params.limit))
      .sort(params.sort)
      .skip(Number(params.skip))
      .populate(populate || this.associations.map(x => x.alias).join(' '));

    return raw ? query.lean() : query;
***REMOVED***,

  count: async function (params) ***REMOVED***
    return Number(await this
      .where(params.where)
      .count());
***REMOVED***,

  search: async function (params, populate) ***REMOVED*** // eslint-disable-line  no-unused-vars
    const $or = Object.keys(this.attributes).reduce((acc, curr) => ***REMOVED***
      switch (this.attributes[curr].type) ***REMOVED***
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params.search))) ***REMOVED***
            return acc.concat(***REMOVED*** [curr]: params.search ***REMOVED***);
    ***REMOVED***

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat(***REMOVED*** [curr]: ***REMOVED*** $regex: params.search, $options: 'i' ***REMOVED*** ***REMOVED***);
        case 'boolean':
          if (params.search === 'true' || params.search === 'false') ***REMOVED***
            return acc.concat(***REMOVED*** [curr]: params.search === 'true' ***REMOVED***);
    ***REMOVED***

          return acc;
        default:
          return acc;
***REMOVED***
***REMOVED***, []);

    return this
      .find(***REMOVED*** $or ***REMOVED***)
      .limit(Number(params.limit))
      .sort(params.sort)
      .skip(Number(params.skip))
      .populate(populate || this.associations.map(x => x.alias).join(' '))
      .lean();
***REMOVED***,

  countSearch: async function (params = ***REMOVED******REMOVED***) ***REMOVED*** // eslint-disable-line  no-unused-vars
    const $or = Object.keys(this.attributes).reduce((acc, curr) => ***REMOVED***
      switch (this.attributes[curr].type) ***REMOVED***
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params.search))) ***REMOVED***
            return acc.concat(***REMOVED*** [curr]: params.search ***REMOVED***);
    ***REMOVED***

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat(***REMOVED*** [curr]: ***REMOVED*** $regex: params.search, $options: 'i' ***REMOVED*** ***REMOVED***);
        case 'boolean':
          if (params.search === 'true' || params.search === 'false') ***REMOVED***
            return acc.concat(***REMOVED*** [curr]: params.search === 'true' ***REMOVED***);
    ***REMOVED***

          return acc;
        default:
          return acc;
***REMOVED***
***REMOVED***, []);

    return this
      .find(***REMOVED*** $or ***REMOVED***)
      .count();
***REMOVED***,

  findOne: async function (params, populate, raw = true) ***REMOVED***
    const query = this
      .findOne(***REMOVED***
        [this.primaryKey]: params[this.primaryKey] || params.id
***REMOVED***)
      .populate(populate || this.associations.map(x => x.alias).join(' '));

    return raw ? query.lean() : query;
***REMOVED***,

  create: async function (params) ***REMOVED***
    // Exclude relationships.
    const values = Object.keys(params.values).reduce((acc, current) => ***REMOVED***
      if (this._attributes[current] && this._attributes[current].type) ***REMOVED***
        acc[current] = params.values[current];
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    const request = await this.create(values)
      .catch((err) => ***REMOVED***
        const message = err.message.split('index:');
        const field = _.words(_.last(message).split('_')[0]);
        const error = ***REMOVED*** message: `This $***REMOVED***field***REMOVED*** is already taken`, field ***REMOVED***;

        throw error;
***REMOVED***);

    // Transform to JSON object.
    const entry = request.toJSON ? request.toJSON() : request;

    // Extract relations.
    const relations = this.associations.reduce((acc, association) => ***REMOVED***
      if (params.values[association.alias]) ***REMOVED***
        acc[association.alias] = params.values[association.alias];
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    return module.exports.update.call(this, ***REMOVED***
      [this.primaryKey]: entry[this.primaryKey],
      values: _.assign(***REMOVED***
        id: entry[this.primaryKey]
***REMOVED*** relations)
***REMOVED***);
***REMOVED***,

  update: async function (params) ***REMOVED***
    // Call the business logic located in the hook.
    // This function updates no-relational and relational data.
    return this.updateRelations(params);
***REMOVED***,

  delete: async function (params) ***REMOVED***
    // Delete entry.
    return this
      .remove(***REMOVED***
        [this.primaryKey]: params.id
***REMOVED***);
***REMOVED***,

  deleteMany: async function (params) ***REMOVED***
    return this
      .remove(***REMOVED***
        [this.primaryKey]: ***REMOVED***
          $in: params[this.primaryKey] || params.id
  ***REMOVED***
***REMOVED***);
***REMOVED***
***REMOVED***;
