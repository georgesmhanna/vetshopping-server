/**
*
* PluginLeftMenuSection
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PluginLeftMenuLink from 'components/PluginLeftMenuLink';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class PluginLeftMenuSection extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const environmentsRequired = this.props.section.name === 'menu.section.environments';
    const links = map(this.props.section.items, (item, index) => (
      <PluginLeftMenuLink
        key=***REMOVED***index***REMOVED***
        link=***REMOVED***item***REMOVED***
        environments=***REMOVED***this.props.environments***REMOVED***
        environmentsRequired=***REMOVED***environmentsRequired***REMOVED***
        envParams=***REMOVED***this.props.envParams***REMOVED***
      />
    ));

    return (
      <div className=***REMOVED***styles.pluginLeftMenuSection***REMOVED***>
        <p>
          <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.section.name***REMOVED***`***REMOVED*** />
        </p>
        <ul>
          ***REMOVED***links***REMOVED***
        </ul>
      </div>
    );
***REMOVED***
***REMOVED***

PluginLeftMenuSection.propTypes = ***REMOVED***
  environments: PropTypes.array,
  envParams: PropTypes.string,
  section: PropTypes.object,
***REMOVED***;

export default PluginLeftMenuSection;
