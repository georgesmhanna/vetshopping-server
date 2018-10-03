import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';

/**
 * Direct selector to the list state domain
 */

const selectGlobalDomain = () => state => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('loading'),
);

const makeSelectModels = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('models').toJS(),
);

const makeSelectMenu = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('menu').toJS(),
);

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


export ***REMOVED***
  selectLocationState,
  makeSelectLoading,
  makeSelectMenu,
  makeSelectModels,
***REMOVED***;
