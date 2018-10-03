/**
*
* InputSearchContainer
*
*/

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** findIndex, has, includes, isEmpty, map, toLower ***REMOVED*** from 'lodash';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Label from 'components/Label';
import InputSearchLi from 'components/InputSearchLi';

import styles from './styles.scss';

class InputSearchContainer extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED***
    errors: [],
    filteredUsers: this.props.values,
    isAdding: false,
    isFocused: false,
    users: this.props.values,
    value: '',
***REMOVED***;

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.didDeleteUser !== this.props.didDeleteUser) ***REMOVED***
      this.setState(***REMOVED*** users: nextProps.values, filteredUsers: nextProps.values ***REMOVED***);
***REMOVED***

    if (nextProps.didGetUsers !== this.props.didGetUsers) ***REMOVED***
      this.setState(***REMOVED*** users: nextProps.values, filteredUsers: nextProps.values ***REMOVED***);
***REMOVED***

    if (nextProps.didFetchUsers !== this.props.didFetchUsers) ***REMOVED***
      this.setState(***REMOVED*** filteredUsers: nextProps.users, isAdding: true ***REMOVED***);
***REMOVED***
***REMOVED***

  handleBlur = () => this.setState(***REMOVED*** isFocused: !this.state.isFocused ***REMOVED***);

  handleChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    const filteredUsers = isEmpty(target.value) ?
      this.state.users
      : this.state.users.filter((user) => includes(toLower(user.name), toLower(target.value)));

    if (isEmpty(filteredUsers) && !isEmpty(target.value)) ***REMOVED***
      this.props.getUser(target.value);
***REMOVED***

    if (isEmpty(target.value)) ***REMOVED***
      return this.setState(***REMOVED*** value: target.value, isAdding: false, users: this.props.values, filteredUsers: this.props.values ***REMOVED***);
***REMOVED***

    this.setState(***REMOVED*** value: target.value, filteredUsers ***REMOVED***);
***REMOVED***

  handleFocus = () => this.setState(***REMOVED*** isFocused: !this.state.isFocused ***REMOVED***);

  handleClick = (item) => ***REMOVED***
    if (this.state.isAdding) ***REMOVED***
      const id = has(item, '_id') ? '_id' : 'id';
      const users = this.props.values;
      // Check if user is already associated with this role
      if (findIndex(users, [id, item[id]]) === -1) ***REMOVED***
        this.props.onClickAdd(item);
        users.push(item);
***REMOVED***

      // Reset the input focus
      this.searchInput.focus();
      // Empty the input and display users
      this.setState(***REMOVED*** value: '', isAdding: false, users, filteredUsers: users ***REMOVED***);
***REMOVED*** else ***REMOVED***
      this.props.onClickDelete(item);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    return (
      <div className=***REMOVED***cn(styles.inputSearch, 'col-md-6')***REMOVED***>
        <Label htmlFor=***REMOVED***this.props.name***REMOVED*** message=***REMOVED***this.props.label***REMOVED*** />
        <div className=***REMOVED***cn('input-group')***REMOVED***>
          <span className=***REMOVED***cn('input-group-addon', styles.addon, this.state.isFocused && styles.addonFocus,)***REMOVED*** />
          <FormattedMessage id="users-permissions.InputSearch.placeholder">
            ***REMOVED***(message) => (
              <input
                className=***REMOVED***cn('form-control', !isEmpty(this.state.errors) ? 'is-invalid': '')***REMOVED***
                id=***REMOVED***this.props.name***REMOVED***
                name=***REMOVED***this.props.name***REMOVED***
                onBlur=***REMOVED***this.handleBlur***REMOVED***
                onChange=***REMOVED***this.handleChange***REMOVED***
                onFocus=***REMOVED***this.handleFocus***REMOVED***
                value=***REMOVED***this.state.value***REMOVED***
                placeholder=***REMOVED***message***REMOVED***
                type="text"
                ref=***REMOVED***(input) => ***REMOVED*** this.searchInput = input; ***REMOVED******REMOVED***
              />
            )***REMOVED***
          </FormattedMessage>
        </div>
        <div className=***REMOVED***cn(styles.ulContainer, this.state.isFocused && styles.ulFocused)***REMOVED***>
          <ul>
            ***REMOVED***map(this.state.filteredUsers, (user) => (
              <InputSearchLi
                key=***REMOVED***user.id || user._id***REMOVED***
                item=***REMOVED***user***REMOVED***
                isAdding=***REMOVED***this.state.isAdding***REMOVED***
                onClick=***REMOVED***this.handleClick***REMOVED***
              />
            ))***REMOVED***
          </ul>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

InputSearchContainer.defaultProps = ***REMOVED***
  users: [],
  values: [],
***REMOVED***;

InputSearchContainer.propTypes = ***REMOVED***
  didDeleteUser: PropTypes.bool.isRequired,
  didFetchUsers: PropTypes.bool.isRequired,
  didGetUsers: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  label: PropTypes.shape(***REMOVED***
    id: PropTypes.string,
    params: PropTypes.object,
***REMOVED***).isRequired,
  name: PropTypes.string.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  users: PropTypes.array,
  values: PropTypes.array,
***REMOVED***;

export default InputSearchContainer;
