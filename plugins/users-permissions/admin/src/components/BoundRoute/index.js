/**
*
* BoundRoute
*
*/

import React from 'react';
import ***REMOVED*** get, includes, map, tail, toLower ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.scss';

function BoundRoute(***REMOVED*** route ***REMOVED***) ***REMOVED***
  const title = get(route, 'handler');
  const formattedRoute = get(route, 'path') ? tail(get(route, 'path').split('/')) : [];
  const [ controller = '', action = '' ] = title ? title.split('.') : [];

  return (
    <div className="col-md-12">
      <div className=***REMOVED***styles.title***REMOVED***>
        <FormattedMessage id="users-permissions.BoundRoute.title" />
        &nbsp;
        <span>***REMOVED***controller***REMOVED***</span>
        <span>.***REMOVED***action***REMOVED*** </span>
      </div>
      <div className=***REMOVED***styles.boundRoute***REMOVED***>
        <div className=***REMOVED***cn(styles.verb, styles[toLower(get(route, 'method'))])***REMOVED***>
          ***REMOVED***get(route, 'method')***REMOVED***
        </div>
        <div className=***REMOVED***styles.path***REMOVED***>
          ***REMOVED***map(formattedRoute, value => (
            <span
              key=***REMOVED***value***REMOVED***
              style=***REMOVED***includes(value, ':') ? ***REMOVED*** color: '#787E8F' ***REMOVED*** : ***REMOVED******REMOVED******REMOVED***
            >
              /***REMOVED***value***REMOVED***
            </span>
          ))***REMOVED***
        </div>
      </div>
    </div>
  );
***REMOVED***

BoundRoute.defaultProps = ***REMOVED***
  route: ***REMOVED***
    handler: 'Nocontroller.error',
    method: 'GET',
    path: '/there-is-no-path',
***REMOVED***,
***REMOVED***;

BoundRoute.propTypes = ***REMOVED***
  route: PropTypes.object,
***REMOVED***;

export default BoundRoute;
