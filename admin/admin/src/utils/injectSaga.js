import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param ***REMOVED***string***REMOVED*** key A key of the saga
 * @param ***REMOVED***function***REMOVED*** saga A root saga that will be injected
 * @param ***REMOVED***string***REMOVED*** [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default (***REMOVED*** key, saga, mode ***REMOVED***) => (WrappedComponent) => ***REMOVED***
  class InjectSaga extends React.Component ***REMOVED***
    static WrappedComponent = WrappedComponent;
    static displayName = `withSaga($***REMOVED***(WrappedComponent.displayName || WrappedComponent.name || 'Component')***REMOVED***)`;
    static contextTypes = ***REMOVED***
      store: PropTypes.object.isRequired,
***REMOVED***;

    componentWillMount() ***REMOVED***
      const ***REMOVED*** injectSaga ***REMOVED*** = this.injectors;

      injectSaga(key, ***REMOVED*** saga, mode ***REMOVED***, this.props);
***REMOVED***

    componentWillUnmount() ***REMOVED***
      const ***REMOVED*** ejectSaga ***REMOVED*** = this.injectors;

      ejectSaga(key);
***REMOVED***

    injectors = getInjectors(this.context.store);

    render() ***REMOVED***
      return <WrappedComponent ***REMOVED***...this.props***REMOVED*** />;
***REMOVED***
***REMOVED***

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
***REMOVED***;
