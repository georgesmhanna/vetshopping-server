/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';

import NotFound from 'components/NotFound';

export default class NotFoundPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <NotFound ***REMOVED***...this.props***REMOVED*** />
    );
***REMOVED***
***REMOVED***

NotFoundPage.propTypes = ***REMOVED***
  history: PropTypes.shape(***REMOVED***
    goBack: PropTypes.func.isRequired,
***REMOVED***).isRequired,
***REMOVED***;
