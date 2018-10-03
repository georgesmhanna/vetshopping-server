/*
*
* PluginLeftMenu
*
*   - Required props :
*     - ***REMOVED***array***REMOVED*** sections : Menu section
*
*   - Optionnal props :
*     - ***REMOVED***function***REMOVED*** addCustomSection : Allows to add the menu a custom section
*     - ***REMOVED***function***REMOVED*** renderCustomLink : Overrides the link behavior
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import PluginLeftMenuSection from 'components/PluginLeftMenuSection';
import styles from './styles.scss';

class PluginLeftMenu extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const customSection = this.props.addCustomSection ? this.props.addCustomSection(styles) : '';
    return (
      <div className=***REMOVED***`$***REMOVED***styles.pluginLeftMenu***REMOVED*** col-md-3`***REMOVED***>
        ***REMOVED***map(this.props.sections, (section, index) => (
          <PluginLeftMenuSection
            key=***REMOVED***index***REMOVED***
            section=***REMOVED***section***REMOVED***
            renderCustomLink=***REMOVED***this.props.renderCustomLink***REMOVED***
            basePath=***REMOVED***this.props.basePath***REMOVED***
            customIcon=***REMOVED***this.props.customIcon***REMOVED***
          />
        ))***REMOVED***
        ***REMOVED***customSection***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

PluginLeftMenu.propTypes = ***REMOVED***
  addCustomSection: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  basePath: PropTypes.string,
  customIcon: PropTypes.string,
  renderCustomLink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  sections: PropTypes.array.isRequired,
***REMOVED***;

PluginLeftMenu.defaultProps = ***REMOVED***
  addCustomSection: false,
  basePath: '',
  customIcon: '',
  renderCustomLink: false,
***REMOVED***;

export default PluginLeftMenu;
