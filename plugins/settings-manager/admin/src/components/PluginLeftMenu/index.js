/**
*
* PluginLeftMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import PluginLeftMenuSection from 'components/PluginLeftMenuSection';
import styles from './styles.scss';

class PluginLeftMenu extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <div className=***REMOVED***`$***REMOVED***styles.pluginLeftMenu***REMOVED*** col-md-3`***REMOVED***>
        ***REMOVED***map(this.props.sections, (section, index) => (
          <PluginLeftMenuSection  key=***REMOVED***index***REMOVED*** section=***REMOVED***section***REMOVED*** environments=***REMOVED***this.props.environments***REMOVED*** envParams=***REMOVED***this.props.envParams***REMOVED*** />
        ))***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

PluginLeftMenu.propTypes = ***REMOVED***
  environments: PropTypes.array.isRequired,
  envParams: PropTypes.string,
  sections: PropTypes.array.isRequired,
***REMOVED***;

PluginLeftMenu.defaultProps = ***REMOVED***
  envParams: '',
***REMOVED***;

export default PluginLeftMenu;
