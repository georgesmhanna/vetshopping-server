const _ = require('lodash');

module.exports = ***REMOVED***
  find: async function (params = ***REMOVED******REMOVED***, populate) ***REMOVED***
    const records = await this.query(function(qb) ***REMOVED***
      _.forEach(params.where, (where, key) => ***REMOVED***
        qb.where(key, where[0].symbol, where[0].value);
***REMOVED***);

      if (params.sort) ***REMOVED***
        qb.orderBy(params.sort.key, params.sort.order);
***REMOVED***

      if (params.start) ***REMOVED***
        qb.offset(params.start);
***REMOVED***

      if (params.limit) ***REMOVED***
        qb.limit(params.limit);
***REMOVED***
***REMOVED***).fetchAll(***REMOVED***
      withRelated: populate || _.keys(_.groupBy(_.reject(this.associations, ***REMOVED*** autoPopulate: false ***REMOVED***), 'alias'))
***REMOVED***);

    return records ? records.toJSON() : records;
***REMOVED***,

  count: async function (params = ***REMOVED******REMOVED***) ***REMOVED***
    return await this
      .where(params)
      .count();
***REMOVED***,

  findOne: async function (params, populate) ***REMOVED***
    const primaryKey = params[this.primaryKey] || params.id;

    if (primaryKey) ***REMOVED***
      params = ***REMOVED***
        [this.primaryKey]: primaryKey
***REMOVED***;
***REMOVED***

    const record = await this
      .forge(params)
      .fetch(***REMOVED***
        withRelated: populate || this.associations.map(x => x.alias)
***REMOVED***);

    return record ? record.toJSON() : record;
***REMOVED***,

  create: async function (params) ***REMOVED***
    return this
      .forge()
      .save(Object.keys(params).reduce((acc, current) => ***REMOVED***
        if (_.get(this._attributes, [current, 'type']) || _.get(this._attributes, [current, 'model'])) ***REMOVED***
          acc[current] = params[current];
  ***REMOVED***

        return acc;
***REMOVED*** ***REMOVED******REMOVED***))
      .catch((err) => ***REMOVED***
        if (err.detail) ***REMOVED***
          const field = _.last(_.words(err.detail.split('=')[0]));
          err = ***REMOVED*** message: `This $***REMOVED***field***REMOVED*** is already taken`, field ***REMOVED***;
  ***REMOVED***

        throw err;
***REMOVED***);
***REMOVED***,

  update: async function (search, params = ***REMOVED******REMOVED***) ***REMOVED***
    if (_.isEmpty(params)) ***REMOVED***
      params = search;
***REMOVED***

    const primaryKey = search[this.primaryKey] || search.id;

    if (primaryKey) ***REMOVED***
      search = ***REMOVED***
        [this.primaryKey]: primaryKey
***REMOVED***;
***REMOVED*** else ***REMOVED***
      const entry = await module.exports.findOne.call(this, search);

      search = ***REMOVED***
        [this.primaryKey]: entry[this.primaryKey] || entry.id
***REMOVED***;
***REMOVED***

    return this.forge(search)
      .save(params, ***REMOVED***
        patch: true
***REMOVED***)
      .catch((err) => ***REMOVED***
        const field = _.last(_.words(err.detail.split('=')[0]));
        const error = ***REMOVED*** message: `This $***REMOVED***field***REMOVED*** is already taken`, field ***REMOVED***;

        throw error;
***REMOVED***);
***REMOVED***,

  delete: async function (params) ***REMOVED***
    return await this
      .forge(***REMOVED***
        [this.primaryKey]: params[this.primaryKey] || params.id
***REMOVED***)
      .destroy();
***REMOVED***,

  search: async function (params) ***REMOVED***
    return this
      .query(function(qb) ***REMOVED***
        qb
          .whereRaw(`LOWER(hash) LIKE ?`, [`%$***REMOVED***params.id***REMOVED***%`])
          .orWhereRaw(`LOWER(name) LIKE ?`, [`%$***REMOVED***params.id***REMOVED***%`]);
***REMOVED***)
      .fetchAll();
***REMOVED***,

  addPermission: async function (params) ***REMOVED***
    return this
      .forge(params)
      .save();
***REMOVED***,

  removePermission: async function (params) ***REMOVED***
    return this
      .forge(***REMOVED***
        [this.primaryKey]: params[this.primaryKey] || params.id
***REMOVED***)
      .destroy();
***REMOVED***
***REMOVED***;
