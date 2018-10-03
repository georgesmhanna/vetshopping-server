/**
 *
 * Video
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/media-has-caption */
const Video = props => ***REMOVED***
  const ***REMOVED*** height, src, width ***REMOVED*** = props.contentState.getEntity(props.entityKey).getData();

  return (
    <video height=***REMOVED***height***REMOVED*** width=***REMOVED***width***REMOVED*** style=***REMOVED******REMOVED*** maxWidth: '100%' ***REMOVED******REMOVED*** controls>
      <source src=***REMOVED***src***REMOVED*** />
    </video>
  );
***REMOVED***;

Video.propTypes = ***REMOVED***
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
***REMOVED***;

export default Video;
