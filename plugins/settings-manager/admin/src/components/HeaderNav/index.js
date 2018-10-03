/**
*
* HeaderNav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** NavLink ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** join, map, take ***REMOVED*** from 'lodash';
import EditForm from 'components/EditForm';
import List from 'components/List';
import ***REMOVED*** darken ***REMOVED*** from '../../utils/colors';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class HeaderNav extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const baseUrl = join(take(this.props.path.split('/'), 4), '/');
    const component = this.props.renderListComponent ? <List ***REMOVED***...this.props***REMOVED*** /> : <EditForm ***REMOVED***...this.props***REMOVED*** />;
    let linkColor = '#F5F5F5';

    return (
      <div className=***REMOVED***styles.headerNav***REMOVED***>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className=***REMOVED***styles.headerContainer***REMOVED***>
                ***REMOVED***map(this.props.links, (link, key) => ***REMOVED***
                  const notifActive = link.active ? <div className=***REMOVED***styles.notifPoint***REMOVED*** /> : '';
                  linkColor = darken(linkColor, 2);

                  return (
                    <NavLink key=***REMOVED***key***REMOVED*** className=***REMOVED***styles.headerLink***REMOVED*** style=***REMOVED******REMOVED*** backgroundColor: linkColor***REMOVED******REMOVED*** to=***REMOVED***`$***REMOVED***baseUrl***REMOVED***/$***REMOVED***link.name***REMOVED***`***REMOVED*** activeClassName=***REMOVED***styles.linkActive***REMOVED***>
                      <div className=***REMOVED***`$***REMOVED***styles.linkText***REMOVED*** text-center`***REMOVED***>
                        ***REMOVED***link.name***REMOVED***
                        ***REMOVED***notifActive***REMOVED***
                      </div>
                    </NavLink>
                  );
          ***REMOVED***)***REMOVED***
              </div>
            </div>
          </div>
        </div>
        ***REMOVED***component***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

HeaderNav.propTypes = ***REMOVED***
  links: PropTypes.array,
  path: PropTypes.string,
  renderListComponent: PropTypes.bool,
***REMOVED***;

export default HeaderNav;
