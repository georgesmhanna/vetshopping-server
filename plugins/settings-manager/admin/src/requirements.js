import request from 'utils/request';

const shouldRenderCompo = (plugin) => new Promise((resolve, reject) => ***REMOVED***
  request('/settings-manager/autoReload')
    .then(response => ***REMOVED***
      plugin.preventComponentRendering = !response.autoReload.enabled;
      plugin.blockerComponentProps = ***REMOVED***
        blockerComponentTitle: 'components.AutoReloadBlocker.header',
        blockerComponentDescription: 'components.AutoReloadBlocker.description',
        blockerComponentIcon: 'fa-refresh',
        blockerComponentContent: 'renderIde',
***REMOVED***;

      if (response.environment !== 'development') ***REMOVED***
        plugin.preventComponentRendering = true;
        plugin.blockerComponentProps = ***REMOVED***
          blockerComponentTitle: 'components.ProductionBlocker.header',
          blockerComponentDescription: 'components.ProductionBlocker.description',
          blockerComponentIcon: 'fa-ban',
          blockerComponentContent: 'renderButton',
  ***REMOVED***;
***REMOVED***

      return resolve(plugin);
***REMOVED***)
    .catch(err => reject(err));
***REMOVED***);

export default shouldRenderCompo;
