/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';

import LoadingIndicatorPage from 'components/LoadingIndicatorPage';

export default Loadable(***REMOVED***
  loader: () => import('./index'),
  loading: LoadingIndicatorPage,
***REMOVED***);
