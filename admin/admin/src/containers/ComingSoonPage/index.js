/*
 *
 * ComingSoonPage
 *
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import Helmet from 'react-helmet';

import PluginHeader from 'components/PluginHeader';

import styles from './styles.scss';

export class ComingSoonPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <div>
        <Helmet
          title="Coming soon"
        />
        <div>
          <div className=***REMOVED***`container-fluid $***REMOVED***styles.containerFluid***REMOVED***`***REMOVED***>
            <PluginHeader
              title=***REMOVED******REMOVED***
                id: 'app.components.ComingSoonPage.comingSoon',
        ***REMOVED******REMOVED***
              description=***REMOVED******REMOVED***
                id: 'app.components.ComingSoonPage.featuresNotAvailable',
        ***REMOVED******REMOVED***
              actions=***REMOVED***[]***REMOVED***
            />
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***


function mapDispatchToProps(dispatch) ***REMOVED***
  return ***REMOVED***
    dispatch,
***REMOVED***;
***REMOVED***

export default connect(mapDispatchToProps)(ComingSoonPage);
