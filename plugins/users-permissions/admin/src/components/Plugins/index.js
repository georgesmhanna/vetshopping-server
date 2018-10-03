/**
*
* Plugins
*
*/

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** has, map ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Plugin from 'components/Plugin';

import styles from './styles.scss';

class Plugins extends React.Component ***REMOVED***
  state = ***REMOVED*** pluginSelected: '' ***REMOVED***;

  changePluginSelected = (name) => this.setState(***REMOVED*** pluginSelected: name ***REMOVED***);

  render() ***REMOVED***
    return (
      <div className=***REMOVED***cn('col-md-7', styles.wrapper)***REMOVED***>
        <div className=***REMOVED***styles.plugins***REMOVED***>
          <div className=***REMOVED***styles.headerContainer***REMOVED***>
            <div>
              <FormattedMessage id="users-permissions.Plugins.header.title" />
            </div>
            <div>
              <FormattedMessage id="users-permissions.Plugins.header.description" />
            </div>
          </div>
          <div className=***REMOVED***cn(styles.pluginsContainer, !has(this.props.plugins, 'application') && styles.pluginsGradient)***REMOVED***>
            ***REMOVED***map(Object.keys(this.props.plugins).sort(), (plugin) => (
              <Plugin
                changePluginSelected=***REMOVED***this.changePluginSelected***REMOVED***
                key=***REMOVED***plugin***REMOVED***
                name=***REMOVED***plugin***REMOVED***
                plugin=***REMOVED***this.props.plugins[plugin]***REMOVED***
                pluginSelected=***REMOVED***this.state.pluginSelected***REMOVED***
              />
            ))***REMOVED***
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

Plugins.defaultProps = ***REMOVED***
  plugins: ***REMOVED******REMOVED***,
***REMOVED***;

Plugins.propTypes = ***REMOVED***
  plugins: PropTypes.object,
***REMOVED***;

export default Plugins;
