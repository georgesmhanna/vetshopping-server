const _ = require('lodash');

module.exports = ***REMOVED***
  find: async function (params = ***REMOVED******REMOVED***, populate) ***REMOVED***
    return this
      .find(params.where)
      .limit(Number(params.limit))
      .sort(params.sort)
      .skip(Number(params.start))
      .populate(populate || this.associations.map(x => x.alias).join(' '))
      .lean();
***REMOVED***,

  count: async function (params = ***REMOVED******REMOVED***) ***REMOVED***
    return Number(await this
      .count(params));
***REMOVED***,

  findOne: async function (params, populate) ***REMOVED***
    const primaryKey = params[this.primaryKey] || params.id;

    if (primaryKey) ***REMOVED***
      params = ***REMOVED***
        [this.primaryKey]: primaryKey
***REMOVED***;
***REMOVED***

    return this
      .findOne(params)
      .populate(populate || this.associations.map(x => x.alias).join(' '))
      .lean();
***REMOVED***,

  create: async function (params) ***REMOVED***
    // Exclude relationships.
    const values = Object.keys(params).reduce((acc, current) => ***REMOVED***
      if (_.get(this._attributes, [current, 'type']) || _.get(this._attributes, [current, 'model'])) ***REMOVED***
        acc[current] = params[current];
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    return this.create(values)
      .catch((err) => ***REMOVED***
        if (err.message.indexOf('index:') !== -1) ***REMOVED***
          const message = err.message.split('index:');
          const field = _.words(_.last(message).split('_')[0]);
          const error = ***REMOVED*** message: `This $***REMOVED***field***REMOVED*** is already taken`, field ***REMOVED***;

          throw error;
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
***REMOVED***

    return this.update(search, params, ***REMOVED***
      strict: false
***REMOVED***)
      .catch((error) => ***REMOVED***
        const field = _.last(_.words(error.message.split('_')[0]));
        const err = ***REMOVED*** message: `This $***REMOVED***field***REMOVED*** is already taken`, field ***REMOVED***;

        throw err;
***REMOVED***);
***REMOVED***,

  delete: async function (params) ***REMOVED***
    // Delete entry.
    return this
      .remove(***REMOVED***
        [this.primaryKey]: params[this.primaryKey] || params.id
***REMOVED***);
***REMOVED***,

  search: async function (params) ***REMOVED***
    const re = new RegExp(params.id, 'i');

    return this
      .find(***REMOVED***
        '$or': [
          ***REMOVED*** hash: re ***REMOVED***,
          ***REMOVED*** name: re ***REMOVED***
        ]
***REMOVED***);
***REMOVED***,

  addPermission: async function (params) ***REMOVED***
    return this
      .create(params);
***REMOVED***,

  removePermission: async function (params) ***REMOVED***
    return this
      .remove(params);
***REMOVED***
***REMOVED***;
