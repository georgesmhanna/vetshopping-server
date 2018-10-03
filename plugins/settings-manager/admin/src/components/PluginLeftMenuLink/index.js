/**
*
* PluginLeftMenuLink
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** NavLink ***REMOVED*** from 'react-router-dom';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** get, isEmpty, findIndex ***REMOVED*** from 'lodash';
import styles from './styles.scss';

class PluginLeftMenuLink extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      environmentIndex: 0,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    const environmentIndex = this.props.envParams ? findIndex(this.props.environments, ['name', this.props.envParams]) : 0;
    this.setState(***REMOVED*** environmentIndex ***REMOVED***);
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (this.state.environmentIndex === -1 && nextProps.envParams) ***REMOVED***
      this.setState(***REMOVED*** environmentIndex: findIndex(nextProps.environments, ['name', nextProps.envParams]) ***REMOVED***);
***REMOVED***

    if (nextProps.envParams && nextProps.envParams !== this.props.envParams) ***REMOVED***
      const environmentIndex = findIndex(nextProps.environments, ['name', nextProps.envParams]);
      this.setState(***REMOVED*** environmentIndex ***REMOVED***);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    let url;

    if (!isEmpty(this.props.environments)) ***REMOVED***
      url = this.props.environmentsRequired ?
        `$***REMOVED***this.props.link.slug***REMOVED***/$***REMOVED***get(this.props.environments, [this.state.environmentIndex, 'name'])***REMOVED***`
        : `$***REMOVED***this.props.link.slug***REMOVED***`;
***REMOVED***

    return (
      <li className=***REMOVED***styles.pluginLeftMenuLink***REMOVED***>
        <NavLink className=***REMOVED***styles.link***REMOVED*** to=***REMOVED***`/plugins/settings-manager/$***REMOVED***url***REMOVED***`***REMOVED*** activeClassName=***REMOVED***styles.linkActive***REMOVED***>
          <div>
            <i className=***REMOVED***`fa fa-$***REMOVED***this.props.link.icon***REMOVED***`***REMOVED*** />
          </div>
          <span><FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.link.name***REMOVED***`***REMOVED*** /></span>
        </NavLink>
      </li>
    );
***REMOVED***
***REMOVED***

PluginLeftMenuLink.propTypes = ***REMOVED***
  environments: PropTypes.array.isRequired,
  environmentsRequired: PropTypes.bool.isRequired,
  envParams: PropTypes.string,
  link: PropTypes.object.isRequired,
***REMOVED***;

PluginLeftMenuLink.defaultProps = ***REMOVED***
  envParams: '',
***REMOVED***;

export default PluginLeftMenuLink;
