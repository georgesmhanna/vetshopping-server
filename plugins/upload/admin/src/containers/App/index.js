/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import ***REMOVED*** Switch, Route ***REMOVED*** from 'react-router-dom';

// Utils
import ***REMOVED*** pluginId ***REMOVED*** from 'app';

// Containers
import ConfigPage from 'containers/ConfigPage';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';

function App() ***REMOVED***
  return (
    <div className=***REMOVED***pluginId***REMOVED***>
      <Switch>
        <Route path=***REMOVED***`/plugins/$***REMOVED***pluginId***REMOVED***/configurations/:env`***REMOVED*** component=***REMOVED***ConfigPage***REMOVED*** exact />
        <Route path=***REMOVED***`/plugins/$***REMOVED***pluginId***REMOVED***`***REMOVED*** component=***REMOVED***HomePage***REMOVED*** exact />
        <Route component=***REMOVED***NotFoundPage***REMOVED*** />
      </Switch>
    </div>
  );
***REMOVED***

export default App;
