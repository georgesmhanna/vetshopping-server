/**
 *
 * Image
 *
 */


import React from 'react';
import PropTypes from 'prop-types';

const Image = props => ***REMOVED***
  const ***REMOVED*** alt, height, src, width ***REMOVED*** = props.contentState.getEntity(props.entityKey).getData();

  return <img alt=***REMOVED***alt***REMOVED*** src=***REMOVED***src***REMOVED*** height=***REMOVED***height***REMOVED*** width=***REMOVED***width***REMOVED*** style=***REMOVED******REMOVED*** maxWidth: '100%' ***REMOVED******REMOVED*** />;
***REMOVED***;

Image.propTypes = ***REMOVED***
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
***REMOVED***;

export default Image;
