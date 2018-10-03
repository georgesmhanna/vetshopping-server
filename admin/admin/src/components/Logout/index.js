/**
*
* Logout
*
*/

import React from 'react';
import ***REMOVED*** get ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import ***REMOVED*** ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle ***REMOVED*** from 'reactstrap';
import auth from 'utils/auth';

import styles from './styles.scss';

class Logout extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** isOpen: false ***REMOVED***;

  handleGoTo = () => ***REMOVED***
    const id = get(auth.getUserInfo(), 'id') || get(auth.getUserInfo(), '_id');
    this.context.router.history.push(***REMOVED***
      pathname: `/plugins/content-manager/user/$***REMOVED***id***REMOVED***`,
      search: '?redirectUrl=/plugins/content-manager/user/?page=0&limit=0&sort=id&source=users-permissions',
***REMOVED***);
***REMOVED***

  handleLogout = () => ***REMOVED***
    auth.clearAppStorage();
    this.context.router.history.push('/plugins/users-permissions/auth/login');
***REMOVED***

  toggle = () => this.setState(***REMOVED*** isOpen: !this.state.isOpen ***REMOVED***);

  render() ***REMOVED***
    return (
      <div className=***REMOVED***styles.logout***REMOVED***>
        <ButtonDropdown isOpen=***REMOVED***this.state.isOpen***REMOVED*** toggle=***REMOVED***this.toggle***REMOVED***>
          <DropdownToggle>
            ***REMOVED***get(auth.getUserInfo(), 'username')***REMOVED***
            <i className="fa fa-caret-down" alt=***REMOVED***`$***REMOVED***this.state.isOpen***REMOVED***`***REMOVED*** />
          </DropdownToggle>
          <DropdownMenu className=***REMOVED***styles.dropDownContent***REMOVED***>
            <DropdownItem onClick=***REMOVED***this.handleGoTo***REMOVED*** className=***REMOVED***styles.item***REMOVED***>
              Profile
            </DropdownItem>
            <DropdownItem onClick=***REMOVED***this.handleLogout***REMOVED***>
              Logout
              <i className="fa fa-sign-out" />
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
***REMOVED***
***REMOVED***


Logout.contextTypes = ***REMOVED***
  router: PropTypes.object,
***REMOVED***;

export default Logout;
