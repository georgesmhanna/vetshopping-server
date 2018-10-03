/**
 *
 * Sub
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** isFunction, isObject ***REMOVED*** from 'lodash';
import cn from 'classnames';
import LoadingBar from 'components/LoadingBar';

import styles from './styles.scss';

function Sub(***REMOVED*** bordered, content, link, name, style, title, underline ***REMOVED***) ***REMOVED***
  if (isObject(title)) ***REMOVED***
    return (
      <div className=***REMOVED***cn(styles.subWrapper, bordered && styles.subBordered)***REMOVED***>
        <FormattedMessage ***REMOVED***...title***REMOVED***>
          ***REMOVED***message => <span className=***REMOVED***cn(underline && styles.underlinedTitle)***REMOVED***>***REMOVED***message***REMOVED******REMOVED***name***REMOVED***</span>***REMOVED***
        </FormattedMessage>
        ***REMOVED***content()***REMOVED***
      </div>
    );
***REMOVED***

  return (
    <a className=***REMOVED***cn(styles.subWrapper, bordered && styles.subBordered, styles.link)***REMOVED*** href=***REMOVED***`https://blog.strapi.io/$***REMOVED***link***REMOVED***`***REMOVED*** target="_blank">
      <span>***REMOVED***title***REMOVED***</span>
      ***REMOVED***title === '' && <LoadingBar />***REMOVED***
      ***REMOVED***content === '' && <LoadingBar style=***REMOVED******REMOVED*** width: '40%' ***REMOVED******REMOVED*** />***REMOVED***
      <p style=***REMOVED***style***REMOVED***>
        ***REMOVED***isFunction(content) ? content() : content***REMOVED***
      </p>
    </a>
  );
***REMOVED***

Sub.defaultProps = ***REMOVED***
  bordered: false,
  content: () => '',
  link: '',
  name: '',
  style: ***REMOVED******REMOVED***,
  title: ***REMOVED***
    id: 'app.utils.defaultMessage',
    defaultMessage: 'app.utils.defaultMessage',
    values: ***REMOVED******REMOVED***,
***REMOVED***,
  underline: false,
***REMOVED***;

Sub.propTypes = ***REMOVED***
  bordered: PropTypes.bool,
  content: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  link: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  underline: PropTypes.bool,
***REMOVED***;

export default Sub;
