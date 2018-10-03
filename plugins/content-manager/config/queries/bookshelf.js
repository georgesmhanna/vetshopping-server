const _ = require('lodash');

module.exports = ***REMOVED***
  find: async function (params, populate, raw = false) ***REMOVED***
    return this.query(function(qb) ***REMOVED***
      _.forEach(params.where, (where, key) => ***REMOVED***
        if (_.isArray(where.value) && where.symbol !== 'IN') ***REMOVED***
          for (const value in where.value) ***REMOVED***
            qb[value ? 'where' : 'orWhere'](key, where.symbol, where.value[value]);
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
          qb.where(key, where.symbol, where.value);
  ***REMOVED***
***REMOVED***);

      if (params.sort) ***REMOVED***
        qb.orderBy(params.sort.key, params.sort.order);
***REMOVED***

      if (params.skip) ***REMOVED***
        qb.offset(_.toNumber(params.skip));
***REMOVED***

      if (params.limit) ***REMOVED***
        qb.limit(_.toNumber(params.limit));
***REMOVED***
***REMOVED***).fetchAll(***REMOVED***
      withRelated: populate || this.associations.map(x => x.alias)
***REMOVED***).then(data => raw ? data.toJSON() : data);
***REMOVED***,

  count: async function (params = ***REMOVED******REMOVED***) ***REMOVED***
    return await this
      .forge()
      .query(qb => ***REMOVED***
        _.forEach(params.where, (where, key) => ***REMOVED***
          if (_.isArray(where.value)) ***REMOVED***
            for (const value in where.value) ***REMOVED***
              qb[value ? 'where' : 'orWhere'](key, where.symbol, where.value[value]);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
            qb.where(key, where.symbol, where.value);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***)
      .count();
***REMOVED***,

  search: async function (params, populate, raw = false) ***REMOVED***
    const associations = this.associations.map(x => x.alias);
    const searchText = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(this._attributes[attribute].type));

    const searchNoText = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => !['string', 'text', 'boolean', 'integer', 'decimal', 'float'].includes(this._attributes[attribute].type));

    const searchInt = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(this._attributes[attribute].type));

    const searchBool = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(this._attributes[attribute].type));

    const query = (params.search || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return this.query(qb => ***REMOVED***
      // Search in columns which are not text value.
      searchNoText.forEach(attribute => ***REMOVED***
        qb.orWhereRaw(`LOWER($***REMOVED***attribute***REMOVED***) LIKE '%$***REMOVED***_.toLower(query)***REMOVED***%'`);
***REMOVED***);

      if (!_.isNaN(_.toNumber(query))) ***REMOVED***
        searchInt.forEach(attribute => ***REMOVED***
          qb.orWhereRaw(`$***REMOVED***attribute***REMOVED*** = $***REMOVED***_.toNumber(query)***REMOVED***`);
  ***REMOVED***);
***REMOVED***

      if (query === 'true' || query === 'false') ***REMOVED***
        searchBool.forEach(attribute => ***REMOVED***
          qb.orWhereRaw(`$***REMOVED***attribute***REMOVED*** = $***REMOVED***_.toNumber(query === 'true')***REMOVED***`);
  ***REMOVED***);
***REMOVED***

      // Search in columns with text using index.
      switch (this.client) ***REMOVED***
        case 'pg': ***REMOVED***
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector($***REMOVED***attribute***REMOVED***)`
              : `to_tsvector('$***REMOVED***attribute***REMOVED***')`
          );

          qb.orWhereRaw(`$***REMOVED***searchQuery.join(' || ')***REMOVED*** @@ to_tsquery(?)`, query);
          break;
  ***REMOVED***
        default:
          qb.orWhereRaw(`MATCH($***REMOVED***searchText.join(',')***REMOVED***) AGAINST(? IN BOOLEAN MODE)`, `*$***REMOVED***query***REMOVED****`);
          break;
***REMOVED***

      if (params.sort) ***REMOVED***
        qb.orderBy(params.sort.key, params.sort.order);
***REMOVED***

      if (params.skip) ***REMOVED***
        qb.offset(_.toNumber(params.skip));
***REMOVED***

      if (params.limit) ***REMOVED***
        qb.limit(_.toNumber(params.limit));
***REMOVED***
***REMOVED***).fetchAll(***REMOVED***
      width: populate || associations
***REMOVED***).then(data => raw ? data.toJSON() : data);
***REMOVED***,

  countSearch: async function (params = ***REMOVED******REMOVED***) ***REMOVED***
    const associations = this.associations.map(x => x.alias);
    const searchText = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(this._attributes[attribute].type));

    const searchNoText = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => !['string', 'text', 'boolean', 'integer', 'decimal', 'float'].includes(this._attributes[attribute].type));

    const searchInt = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(this._attributes[attribute].type));

    const searchBool = Object.keys(this._attributes)
      .filter(attribute => attribute !== this.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(this._attributes[attribute].type));

    const query = (params.search || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');


    return this.query(qb => ***REMOVED***
      // Search in columns which are not text value.
      searchNoText.forEach(attribute => ***REMOVED***
        qb.orWhereRaw(`LOWER($***REMOVED***attribute***REMOVED***) LIKE '%$***REMOVED***_.toLower(query)***REMOVED***%'`);
***REMOVED***);

      if (!_.isNaN(_.toNumber(query))) ***REMOVED***
        searchInt.forEach(attribute => ***REMOVED***
          qb.orWhereRaw(`$***REMOVED***attribute***REMOVED*** = $***REMOVED***_.toNumber(query)***REMOVED***`);
  ***REMOVED***);
***REMOVED***

      if (query === 'true' || query === 'false') ***REMOVED***
        searchBool.forEach(attribute => ***REMOVED***
          qb.orWhereRaw(`$***REMOVED***attribute***REMOVED*** = $***REMOVED***_.toNumber(query === 'true')***REMOVED***`);
  ***REMOVED***);
***REMOVED***

      // Search in columns with text using index.
      switch (this.client) ***REMOVED***
        case 'pg': ***REMOVED***
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector($***REMOVED***attribute***REMOVED***)`
              : `to_tsvector('$***REMOVED***attribute***REMOVED***')`
          );

          qb.orWhereRaw(`$***REMOVED***searchQuery.join(' || ')***REMOVED*** @@ to_tsquery(?)`, query);
          break;
  ***REMOVED***
        default:
          qb.orWhereRaw(`MATCH($***REMOVED***searchText.join(',')***REMOVED***) AGAINST(? IN BOOLEAN MODE)`, `*$***REMOVED***query***REMOVED****`);
          break;
***REMOVED***
***REMOVED***).count();
***REMOVED***,

  findOne: async function (params, populate) ***REMOVED***
    const record = await this
      .forge(***REMOVED***
        [this.primaryKey]: params[this.primaryKey]
***REMOVED***)
      .fetch(***REMOVED***
        withRelated: populate || this.associations.map(x => x.alias)
***REMOVED***);

    const data = record.toJSON ? record.toJSON() : record;

    // Retrieve data manually.
    if (_.isEmpty(populate)) ***REMOVED***
      const arrayOfPromises = this.associations
        .filter(association => ['manyMorphToOne', 'manyMorphToMany'].includes(association.nature))
        .map(association => ***REMOVED*** // eslint-disable-line no-unused-vars
          return this.morph.forge()
            .where(***REMOVED***
              [`$***REMOVED***this.collectionName***REMOVED***_id`]: params[this.primaryKey]
      ***REMOVED***)
            .fetchAll();
  ***REMOVED***);

      const related = await Promise.all(arrayOfPromises);

      related.forEach((value, index) => ***REMOVED***
        data[this.associations[index].alias] = value ? value.toJSON() : value;
***REMOVED***);
***REMOVED***

    return data;
***REMOVED***,

  create: async function (params) ***REMOVED***
    // Exclude relationships.
    const values = Object.keys(params.values).reduce((acc, current) => ***REMOVED***
      if (this._attributes[current] && this._attributes[current].type) ***REMOVED***
        acc[current] = params.values[current];
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);

    const request = await this
      .forge(values)
      .save()
      .catch((err) => ***REMOVED***
        if (err.detail) ***REMOVED***
          const field = _.last(_.words(err.detail.split('=')[0]));
          err = ***REMOVED*** message: `This $***REMOVED***field***REMOVED*** is already taken`, field ***REMOVED***;
  ***REMOVED***

        throw err;
***REMOVED***);

    const entry = request.toJSON ? request.toJSON() : request;

    const relations = this.associations.reduce((acc, association) => ***REMOVED***
      acc[association.alias] = params.values[association.alias];
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
    return await this
      .forge(***REMOVED***
        [this.primaryKey]: params.id
***REMOVED***)
      .destroy();
***REMOVED***,

  deleteMany: async function (params) ***REMOVED***
    return await this
      .query(function(qb) ***REMOVED***
        return qb.whereIn('id', params.id);
***REMOVED***)
      .destroy();
***REMOVED***
***REMOVED***;
