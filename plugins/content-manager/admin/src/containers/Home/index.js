/*
 * Home
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import PluginHeader from 'components/PluginHeader';

import styles from './styles.scss';

export class Home extends React.Component ***REMOVED***
  render() ***REMOVED***
    return (
      <div>
        <div className=***REMOVED***`container-fluid $***REMOVED***styles.containerFluid***REMOVED***`***REMOVED***>
          <PluginHeader
            title=***REMOVED******REMOVED***
              id: 'content-manager.containers.Home.pluginHeaderTitle',
      ***REMOVED******REMOVED***
            description=***REMOVED******REMOVED***
              id: 'content-manager.containers.Home.pluginHeaderDescription',
      ***REMOVED******REMOVED***
            actions=***REMOVED***[]***REMOVED***
          />
          <p>
            <FormattedMessage id="content-manager.containers.Home.introduction" />
          </p>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

Home.propTypes = ***REMOVED******REMOVED***;

export function mapDispatchToProps() ***REMOVED***
  return ***REMOVED******REMOVED***;
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED******REMOVED***);

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);
