/**
*
* PluginLeftMenuSection
*
*   - Required props:
*     - ***REMOVED***object***REMOVED*** section
*
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PluginLeftMenuLink from 'components/PluginLeftMenuLink';
import styles from './styles.scss';


class PluginLeftMenuSection extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const links = map(this.props.section.items, (item, index) => (
      <PluginLeftMenuLink
        key=***REMOVED***index***REMOVED***
        link=***REMOVED***item***REMOVED***
        renderCustomLink=***REMOVED***this.props.renderCustomLink***REMOVED***
        basePath=***REMOVED***this.props.basePath***REMOVED***
        customIcon=***REMOVED***this.props.customIcon***REMOVED***
      />
    ));
    return (
      <div className=***REMOVED***styles.pluginLeftMenuSection***REMOVED***>
        <p>
          <FormattedMessage id=***REMOVED***`content-type-builder.$***REMOVED***this.props.section.name***REMOVED***`***REMOVED*** />
        </p>
        <ul>
          ***REMOVED***links***REMOVED***
        </ul>
      </div>
    );
***REMOVED***
***REMOVED***

PluginLeftMenuSection.propTypes = ***REMOVED***
  basePath: PropTypes.string,
  customIcon: PropTypes.string,
  renderCustomLink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  section: PropTypes.object.isRequired,
***REMOVED***;

PluginLeftMenuSection.defaultProps = ***REMOVED***
  basePath: '',
  customIcon: '',
  renderCustomLink: false,
***REMOVED***;

export default PluginLeftMenuSection;
