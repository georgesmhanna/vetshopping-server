/**
 * 
 * Block
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import styles from './styles.scss';

const renderMsg = msg => <p>***REMOVED***msg***REMOVED***</p>;

const Block = (***REMOVED*** children, description, style, title ***REMOVED***) => (
  <div className="col-md-12">
    <div className=***REMOVED***styles.ctmBlock***REMOVED*** style=***REMOVED***style***REMOVED***>
      <div className=***REMOVED***styles.ctmBlockTitle***REMOVED***>
        <FormattedMessage id=***REMOVED***title***REMOVED*** />
        <FormattedMessage id=***REMOVED***description***REMOVED***>
          ***REMOVED***renderMsg***REMOVED***
        </FormattedMessage>
      </div>
      ***REMOVED***children***REMOVED***
    </div>
  </div>
);


Block.defaultProps = ***REMOVED***
  children: null,
  description: 'app.utils.defaultMessage',
  style: ***REMOVED******REMOVED***,
  title: 'app.utils.defaultMessage',
***REMOVED***;

Block.propTypes = ***REMOVED***
  children: PropTypes.any,
  description: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
***REMOVED***;

export default Block;