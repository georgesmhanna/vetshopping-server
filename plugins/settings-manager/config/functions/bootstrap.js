'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

module.exports = async cb => ***REMOVED***
  const pluginStore = strapi.store(***REMOVED***
    environment: '',
    type: 'core'
***REMOVED***);

  if (!await pluginStore.get(***REMOVED***key: 'application'***REMOVED***)) ***REMOVED***
    const value = ***REMOVED***
      name: 'Default Application',
      description: 'This API is going to be awesome!'
***REMOVED***;

    await pluginStore.set(***REMOVED***key: 'application', value***REMOVED***);
***REMOVED***

  cb();
***REMOVED***;
