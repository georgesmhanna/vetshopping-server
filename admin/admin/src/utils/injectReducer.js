import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param ***REMOVED***string***REMOVED*** key A key of the reducer
 * @param ***REMOVED***function***REMOVED*** reducer A reducer that will be injected
 *
 */
export default (***REMOVED*** key, reducer ***REMOVED***) => (WrappedComponent) => ***REMOVED***
  class ReducerInjector extends React.Component ***REMOVED***
    static WrappedComponent = WrappedComponent;
    static displayName = `withReducer($***REMOVED***(WrappedComponent.displayName || WrappedComponent.name || 'Component')***REMOVED***)`;
    static contextTypes = ***REMOVED***
      store: PropTypes.object.isRequired,
***REMOVED***;

    componentWillMount() ***REMOVED***
      const ***REMOVED*** injectReducer ***REMOVED*** = this.injectors;

      injectReducer(key, reducer);
***REMOVED***

    injectors = getInjectors(this.context.store);

    render() ***REMOVED***
      return <WrappedComponent ***REMOVED***...this.props***REMOVED*** />;
***REMOVED***
***REMOVED***

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
***REMOVED***;
