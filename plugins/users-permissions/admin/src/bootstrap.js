import request from 'utils/request';
// This method is executed before the load of the plugin
const bootstrap = (plugin) => new Promise((resolve, reject) => ***REMOVED***
  request('/users-permissions/init')
    .then(response => ***REMOVED***
      plugin.hasAdminUser = response.hasAdmin;
      plugin.nonProtectedUrl = '/plugins/users-permissions/auth';

      // Add Users to Content Types section.
      plugin.leftMenuSections.push(***REMOVED***
        links: [***REMOVED***
          label: 'Users',
          destination: 'user',
          plugin: 'content-manager',
  ***REMOVED***],
        name: 'Content Types',
***REMOVED***);

      return resolve(plugin);
***REMOVED***)
    .catch(err => reject(err));
***REMOVED***);

export default bootstrap;
