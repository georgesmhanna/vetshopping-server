/**
*
* RelationIco
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
class RelationIco extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  handleClick = () => ***REMOVED***
    const target = ***REMOVED***
      name: 'params.nature',
      value: this.props.name,
      type: 'string',
***REMOVED***;

    this.props.onChange(***REMOVED*** target ***REMOVED***);
***REMOVED***

  render() ***REMOVED***
    return (
      <img src=***REMOVED***this.props.ico***REMOVED*** alt="ico" onClick=***REMOVED***this.handleClick***REMOVED*** className=***REMOVED***styles.relationIco***REMOVED*** />
    );
***REMOVED***
***REMOVED***

RelationIco.propTypes = ***REMOVED***
  ico: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
***REMOVED***;

export default RelationIco;
