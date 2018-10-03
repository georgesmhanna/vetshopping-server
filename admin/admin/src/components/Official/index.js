/*
*
* Official
*
*/

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function Official(props) ***REMOVED***

  return (
    <button className=***REMOVED***styles.wrapper***REMOVED*** style=***REMOVED***props.style***REMOVED***>
      <i className="fa fa-star" />
      <FormattedMessage id="app.components.Official" />
    </button>
  );
***REMOVED***

Official.defaultProps = ***REMOVED***
  style: ***REMOVED******REMOVED***,
***REMOVED***;

Official.propTypes = ***REMOVED***
  style: PropTypes.object,
***REMOVED***;

export default Official;
