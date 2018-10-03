/**
*
* PopUpHeaderNavLink
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** replace, includes ***REMOVED*** from 'lodash';
import ***REMOVED*** router ***REMOVED*** from 'app';
import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */

class PopUpHeaderNavLink extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  handleGoTo = () => ***REMOVED***
    router.push(replace(this.props.routePath, this.props.nameToReplace, this.props.name));
***REMOVED***

  render() ***REMOVED***
    const activeClass = includes(this.props.routePath, this.props.name) ? styles.popUpHeaderNavLink : '';

    return (
      <div className=***REMOVED***activeClass***REMOVED*** onClick=***REMOVED***this.handleGoTo***REMOVED*** style=***REMOVED******REMOVED*** cursor: 'pointer' ***REMOVED******REMOVED***>
        <FormattedMessage id=***REMOVED***this.props.message***REMOVED*** />
      </div>
    );
***REMOVED***
***REMOVED***

PopUpHeaderNavLink.propTypes = ***REMOVED***
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameToReplace: PropTypes.string.isRequired,
  routePath: PropTypes.string.isRequired,
***REMOVED***;

export default PopUpHeaderNavLink;
