import ***REMOVED*** map, omit ***REMOVED*** from 'lodash';
import request from 'utils/request';

// This method is executed before the load of the plugin
const bootstrap = (plugin) => new Promise((resolve, reject) => ***REMOVED***
  request('/content-manager/models', ***REMOVED*** method: 'GET' ***REMOVED***)
    .then(models => ***REMOVED***
      const menu = [***REMOVED***
        name: 'Content Types',
        links: map(omit(models.models.models, 'plugins'), (model, key) => (***REMOVED***
          label: model.labelPlural || model.label || key,
          destination: key,
  ***REMOVED***)),
***REMOVED***];
      plugin.leftMenuSections = menu;
      resolve(plugin);
***REMOVED***)
    .catch(e => ***REMOVED***
      strapi.notification.error('content-manager.error.model.fetch');
      reject(e);
***REMOVED***);
***REMOVED***);

export default bootstrap;
