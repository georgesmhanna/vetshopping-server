/**
*
* HeaderNav
*
*/

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** NavLink ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** map ***REMOVED*** from 'lodash';

// Utils
import ***REMOVED*** darken ***REMOVED*** from 'utils/colors';

// Styles
import styles from './styles.scss';

const links = [
  ***REMOVED***
    name: 'users-permissions.HeaderNav.link.roles',
    to: '/plugins/users-permissions/roles',
***REMOVED***,
  ***REMOVED***
    name: 'users-permissions.HeaderNav.link.providers',
    to: '/plugins/users-permissions/providers',
***REMOVED***,
  ***REMOVED***
    name: 'users-permissions.HeaderNav.link.emailTemplates',
    to: '/plugins/users-permissions/email-templates',
***REMOVED***,
  ***REMOVED***
    name: 'users-permissions.HeaderNav.link.advancedSettings',
    to: '/plugins/users-permissions/advanced',
***REMOVED***,
];

function HeaderNav() ***REMOVED***
  let linkColor = '#F5F5F5';

  return (
    <div className=***REMOVED***styles.headerContainer***REMOVED***>
      ***REMOVED***map(links, (link) => ***REMOVED***
        linkColor = darken(linkColor, 1.5);

        return (
          <NavLink key=***REMOVED***link.name***REMOVED*** className=***REMOVED***styles.headerLink***REMOVED*** style=***REMOVED******REMOVED*** backgroundColor: linkColor***REMOVED******REMOVED*** to=***REMOVED***link.to***REMOVED*** activeClassName=***REMOVED***styles.linkActive***REMOVED***>
            <div className=***REMOVED***`$***REMOVED***styles.linkText***REMOVED*** text-center`***REMOVED***>
              <FormattedMessage id=***REMOVED***link.name***REMOVED*** />
            </div>
          </NavLink>
        );
***REMOVED***)***REMOVED***
    </div>
  );
***REMOVED***

HeaderNav.propTypes = ***REMOVED******REMOVED***;

export default HeaderNav;
