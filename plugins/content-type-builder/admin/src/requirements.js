import request from 'utils/request';

const shouldRenderCompo = (plugin) => new Promise((resolve, reject) => ***REMOVED***
  request(`$***REMOVED***strapi.backendURL***REMOVED***/content-type-builder/autoReload`)
    .then(response => ***REMOVED***
      plugin.preventComponentRendering = !response.autoReload.enabled;
      plugin.blockerComponentProps = ***REMOVED***
        blockerComponentTitle: 'components.AutoReloadBlocker.header',
        blockerComponentDescription: 'components.AutoReloadBlocker.description',
        blockerComponentIcon: 'fa-refresh',
        blockerComponentContent: 'renderIde',
***REMOVED***;

      return resolve(plugin);
***REMOVED***)
    .catch(err => reject(err));
***REMOVED***);

export default shouldRenderCompo;
