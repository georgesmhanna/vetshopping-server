/**
 *
 * WysiwygEditor
 *
 */

import React from 'react';
import ***REMOVED*** Editor ***REMOVED*** from 'draft-js';
import PropTypes from 'prop-types';

class WysiwygEditor extends React.Component ***REMOVED***
  render() ***REMOVED***
    return (
      <Editor ***REMOVED***...this.props***REMOVED*** ref=***REMOVED***this.props.setRef***REMOVED*** />
    );
***REMOVED***
***REMOVED***

WysiwygEditor.defaultProps = ***REMOVED***
  setRef: () => ***REMOVED******REMOVED***,
***REMOVED***;

WysiwygEditor.propTypes = ***REMOVED***
  setRef: PropTypes.func,
***REMOVED***;

export default WysiwygEditor;
