/**
*
* WithInput
*
*/

import React from 'react';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
const WithInput = (InnerInput) => class extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <InnerInput
        ***REMOVED***...this.props***REMOVED***
        ***REMOVED***...this.state***REMOVED***
        styles=***REMOVED***styles***REMOVED***
      />
    );
***REMOVED***
***REMOVED***;

export default WithInput;
