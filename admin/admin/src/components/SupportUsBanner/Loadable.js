import Loadable from 'react-loadable';

import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable(***REMOVED***
  loader: () => import('./index'),
  loading: LoadingIndicator,
***REMOVED***);
