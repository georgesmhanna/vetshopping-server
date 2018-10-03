/**
 *
 * Link
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** includes ***REMOVED*** from 'lodash';

const Link = props => ***REMOVED***
  const ***REMOVED*** url, aHref, aInnerHTML ***REMOVED*** = props.contentState.getEntity(props.entityKey).getData();
  let content = aInnerHTML;

  if (includes(aInnerHTML, '<img', 'src=')) ***REMOVED***
    const src = aInnerHTML.split('src="')[1].split('" ')[0];
    const width = includes(aInnerHTML, 'width=') ? aInnerHTML.split('width="')[1].split('" ')[0] : '';
    const height = includes(aInnerHTML, 'height=') ? aInnerHTML.split('height="')[1].split('" ')[0] : '';
    content = <img src=***REMOVED***src***REMOVED*** alt="img" width=***REMOVED***width***REMOVED*** height=***REMOVED***height***REMOVED*** style=***REMOVED******REMOVED*** marginTop: '27px', maxWidth: '100%' ***REMOVED******REMOVED*** />;
***REMOVED***

  return (
    <a
      href=***REMOVED***url || aHref***REMOVED***
      onClick=***REMOVED***() => ***REMOVED***
        window.open(url || aHref, '_blank');
***REMOVED******REMOVED***
      style=***REMOVED******REMOVED*** cursor: 'pointer' ***REMOVED******REMOVED***
    >
      ***REMOVED***content || props.children***REMOVED***
    </a>
  );
***REMOVED***;

Link.defaultProps = ***REMOVED***
  children: '',
***REMOVED***;

Link.propTypes = ***REMOVED***
  children: PropTypes.node,
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
***REMOVED***;

export default Link;
