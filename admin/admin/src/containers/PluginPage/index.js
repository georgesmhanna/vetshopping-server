/*
 *
 * PluginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import Helmet from 'react-helmet';
import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';

import BlockerComponent from 'components/BlockerComponent';
import ErrorBoundary from 'components/ErrorBoundary';

import ***REMOVED*** selectPlugins ***REMOVED*** from 'containers/App/selectors';

export class PluginPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    let pluginName;

    // Detect plugin id from url params
    const pluginId = this.props.match.params.pluginId;
    const plugins = this.props.plugins.toJS();

    const containers = Object.keys(plugins).map((name) => ***REMOVED***
      const plugin = plugins[name];

      if (plugin.id === pluginId) ***REMOVED***
        pluginName = plugin.name;

        const blockerComponentProps = plugin.preventComponentRendering ? plugin.blockerComponentProps : ***REMOVED******REMOVED***;
        let Elem = plugin.preventComponentRendering ? BlockerComponent : plugin.mainComponent;

        if (plugin.preventComponentRendering && plugin.blockerComponent) ***REMOVED***
          Elem = plugin.blockerComponent;
  ***REMOVED***

        return (
          <ErrorBoundary key=***REMOVED***plugin.id***REMOVED***>
            <Elem ***REMOVED***...this.props***REMOVED*** ***REMOVED***...blockerComponentProps***REMOVED*** />
          </ErrorBoundary>
        );
***REMOVED***
***REMOVED***);

    return (
      <div>
        <Helmet
          title=***REMOVED***`Strapi - $***REMOVED***pluginName***REMOVED***`***REMOVED***
        />
        ***REMOVED***containers***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

PluginPage.propTypes = ***REMOVED***
  match: PropTypes.object.isRequired,
  plugins: PropTypes.object.isRequired,
***REMOVED***;

const mapStateToProps = createSelector(
  selectPlugins(),
  (plugins) => (***REMOVED*** plugins ***REMOVED***)
);

function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    dispatch,
***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(PluginPage);
