/*
 *
 * EditPage actions
 *
 */
import ***REMOVED*** fromJS, List, Map ***REMOVED*** from 'immutable';
import ***REMOVED*** get, replace, toString ***REMOVED*** from 'lodash';
import ***REMOVED***
  ADD_USER,
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCEEDED,
  GET_POLICIES,
  GET_POLICIES_SUCCEEDED,
  GET_ROLE,
  GET_ROLE_SUCCEEDED,
  GET_ROUTES_SUCCEEDED,
  GET_USER,
  GET_USER_SUCCEEDED,
  ON_CANCEL,
  ON_CHANGE_INPUT,
  ON_CLICK_ADD,
  ON_CLICK_DELETE,
  RESET_PROPS,
  RESET_SHOULD_DISPLAY_POLICIES_HINT,
  SELECT_ALL_ACTIONS,
  SET_ACTION_TYPE,
  SET_ERRORS,
  SET_FORM,
  SET_INPUT_POLICIES_PATH,
  SET_ROLE_ID,
  SET_SHOULD_DISPLAY_POLICIES_HINT,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
***REMOVED*** from './constants';

export function addUser(newUser) ***REMOVED***
  return ***REMOVED***
    type: ADD_USER,
    newUser,
***REMOVED***;
***REMOVED***

export function getPermissions() ***REMOVED***
  return ***REMOVED***
    type: GET_PERMISSIONS,
***REMOVED***;
***REMOVED***

export function getPermissionsSucceeded(data) ***REMOVED***
  const permissions = Map(fromJS(data.permissions));

  return ***REMOVED***
    type: GET_PERMISSIONS_SUCCEEDED,
    permissions,
***REMOVED***;
***REMOVED***


export function getPolicies() ***REMOVED***
  return ***REMOVED***
    type: GET_POLICIES,
***REMOVED***;
***REMOVED***

export function getPoliciesSucceeded(policies) ***REMOVED***
  const formattedPolicies = policies.policies.reduce((acc, current) => ***REMOVED***
    acc.push(***REMOVED*** value: current ***REMOVED***);

    return acc;
***REMOVED***,[]);

  return ***REMOVED***
    type: GET_POLICIES_SUCCEEDED,
    policies: [***REMOVED*** name: 'users-permissions.Policies.InputSelect.empty', value: '' ***REMOVED***].concat(formattedPolicies),
***REMOVED***;
***REMOVED***

export function getRole(id) ***REMOVED***
  return ***REMOVED***
    type: GET_ROLE,
    id,
***REMOVED***;
***REMOVED***

export function getRoleSucceeded(data) ***REMOVED***
  const form = Map(***REMOVED***
    name: get(data, ['role', 'name']),
    description: get(data, ['role', 'description']),
    users: List(get(data, ['role', 'users'])),
    permissions: Map(fromJS(get(data, ['role', 'permissions']))),
***REMOVED***);

  return ***REMOVED***
    type: GET_ROLE_SUCCEEDED,
    form,
***REMOVED***;
***REMOVED***

export function getRoutesSucceeded(routes) ***REMOVED***
  return ***REMOVED***
    type: GET_ROUTES_SUCCEEDED,
    routes,
***REMOVED***;
***REMOVED***

export function getUser(user) ***REMOVED***
  return ***REMOVED***
    type: GET_USER,
    user,
***REMOVED***;
***REMOVED***

export function getUserSucceeded(users) ***REMOVED***
  return ***REMOVED***
    type: GET_USER_SUCCEEDED,
    users: users.filter(o => toString(o.role) !== '0'),
***REMOVED***;
***REMOVED***

export function onCancel() ***REMOVED***
  return ***REMOVED***
    type: ON_CANCEL,
***REMOVED***;
***REMOVED***

export function onChangeInput(***REMOVED*** target ***REMOVED***) ***REMOVED***
  const keys = ['modifiedData'].concat(target.name.split('.'));

  return ***REMOVED***
    type: ON_CHANGE_INPUT,
    keys,
    value: target.value,
***REMOVED***;
***REMOVED***

export function onClickAdd(itemToAdd) ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_ADD,
    itemToAdd,
***REMOVED***;
***REMOVED***

export function onClickDelete(itemToDelete) ***REMOVED***
  return ***REMOVED***
    type: ON_CLICK_DELETE,
    itemToDelete,
***REMOVED***;
***REMOVED***

export const resetProps = () => (***REMOVED***
  type: RESET_PROPS,
***REMOVED***);

export function resetShouldDisplayPoliciesHint() ***REMOVED***
  return ***REMOVED***
    type: RESET_SHOULD_DISPLAY_POLICIES_HINT,
***REMOVED***;
***REMOVED***

export function selectAllActions(name, shouldEnable) ***REMOVED***
  return ***REMOVED***
    type: SELECT_ALL_ACTIONS,
    keys: ['modifiedData'].concat(name.split('.')),
    shouldEnable,
***REMOVED***;
***REMOVED***

export function setActionType(action) ***REMOVED***
  const actionType = action === 'create' ? 'POST' : 'PUT';

  return ***REMOVED***
    type: SET_ACTION_TYPE,
    actionType,
***REMOVED***;
***REMOVED***

export function setErrors(formErrors) ***REMOVED***
  return ***REMOVED***
    type: SET_ERRORS,
    formErrors,
***REMOVED***;
***REMOVED***

export function setForm() ***REMOVED***
  const form = Map(***REMOVED***
    name: '',
    description: '',
    users: List([]),
    permissions: Map(***REMOVED******REMOVED***),
***REMOVED***);

  return ***REMOVED***
    type: SET_FORM,
    form,
***REMOVED***;
***REMOVED***

export function setInputPoliciesPath(path) ***REMOVED***
  const inputPath = replace(path, 'enabled', 'policy');

  return ***REMOVED***
    type: SET_INPUT_POLICIES_PATH,
    inputPath,
***REMOVED***;
***REMOVED***

export function setRoleId(roleId) ***REMOVED***
  return ***REMOVED***
    type: SET_ROLE_ID,
    roleId,
***REMOVED***;
***REMOVED***

export function setShouldDisplayPolicieshint() ***REMOVED***
  return ***REMOVED***
    type: SET_SHOULD_DISPLAY_POLICIES_HINT,
***REMOVED***;
***REMOVED***

export function submit() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT,
***REMOVED***;
***REMOVED***

export function submitError(errors) ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_ERROR,
    errors,
***REMOVED***;
***REMOVED***

export function submitSucceeded() ***REMOVED***
  return ***REMOVED***
    type: SUBMIT_SUCCEEDED,
***REMOVED***;
***REMOVED***
