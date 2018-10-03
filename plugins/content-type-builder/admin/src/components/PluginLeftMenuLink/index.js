/**
*
* PluginLeftMenuLink
*   - Required props:
*     - ***REMOVED***object***REMOVED*** Link
*
*   - Optionnal props:
*     - ***REMOVED***function***REMOVED*** renderCustomLink : overrides the behavior of the link
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** NavLink ***REMOVED*** from 'react-router-dom';
import styles from './styles.scss';

class PluginLeftMenuLink extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    if (this.props.renderCustomLink) return this.props.renderCustomLink(this.props, styles);

    const icon = this.props.customIcon || this.props.link.icon;
    return (
      <li className=***REMOVED***styles.pluginLeftMenuLink***REMOVED***>
        <NavLink className=***REMOVED***styles.link***REMOVED*** to=***REMOVED***`/plugins/$***REMOVED***this.props.basePath***REMOVED***/$***REMOVED***this.props.link.name***REMOVED***`***REMOVED*** activeClassName=***REMOVED***styles.linkActive***REMOVED***>
          <div>
            <i className=***REMOVED***`fa $***REMOVED***icon***REMOVED***`***REMOVED*** />
          </div>
          <span>***REMOVED***this.props.link.name***REMOVED***</span>
        </NavLink>
      </li>
    );
***REMOVED***
***REMOVED***

PluginLeftMenuLink.propTypes = ***REMOVED***
  basePath: PropTypes.string,
  customIcon: PropTypes.string,
  link: PropTypes.object.isRequired,
  renderCustomLink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
***REMOVED***;

PluginLeftMenuLink.defaultProps = ***REMOVED***
  basePath: '',
  customIcon: '',
  renderCustomLink: false,
***REMOVED***;

export default PluginLeftMenuLink;
