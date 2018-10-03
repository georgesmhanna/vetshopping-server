import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';

/**
 * Direct selector to the list state domain
 */

const selectGlobalDomain = () => state => state.get('global');

const selectLocationState = () => ***REMOVED***
  let prevRoutingState;
  let prevRoutingStateJS;

  return state => ***REMOVED***
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) ***REMOVED***
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
***REMOVED***

    return prevRoutingStateJS;
***REMOVED***;
***REMOVED***;

const makeSelectSections = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('sections').toJS(),
);

const makeSelectEnvironments = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('environments').toJS(),
);

const makeSelectLoading = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('loading'),
);

export ***REMOVED***
  makeSelectEnvironments,
  makeSelectLoading,
  makeSelectSections,
  selectLocationState,
***REMOVED***;
export default selectGlobalDomain;
