/*
*
* StarsContainer
*
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map, times ***REMOVED*** from 'lodash';
import styles from './styles.scss';

function StarsContainer(***REMOVED*** ratings ***REMOVED***) ***REMOVED***
  const stars = Math.round(ratings);
  const coloredStars = times(stars, String);
  const emptyStars = times(5 - stars, String);

  return (
    <div className=***REMOVED***styles.starsContainer***REMOVED***>
      <div>
        ***REMOVED***map(coloredStars, star => <i key=***REMOVED***star***REMOVED*** className="fa fa-star" />)***REMOVED***
      </div>
      <div>
        ***REMOVED***map(emptyStars, s => <i key=***REMOVED***s***REMOVED*** className="fa fa-star" />)***REMOVED***
      </div>
    </div>
  );
***REMOVED***

StarsContainer.defaultProps = ***REMOVED***
  ratings: 5,
***REMOVED***;

StarsContainer.propTypes = ***REMOVED***
  ratings: PropTypes.number,
***REMOVED***;

export default StarsContainer;
