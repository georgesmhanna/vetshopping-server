/**
 * 
 * SettingsRow
 */

import React from 'react';
import ***REMOVED*** upperFirst ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import IcoContainer from 'components/IcoContainer';

import styles from './styles.scss';


function SettingsRow(***REMOVED*** destination, name, onClick ***REMOVED***) ***REMOVED***
  return (
    <div className=***REMOVED***styles.settingsRow***REMOVED*** onClick=***REMOVED***() => onClick(destination)***REMOVED***>
      <div>
        <div className=***REMOVED***styles.frame***REMOVED***>
          <div className=***REMOVED***styles.icon***REMOVED***>
            <i className="fa fa-cube"></i>
          </div>
          ***REMOVED***upperFirst(name)***REMOVED***
        </div>
        <IcoContainer icons=***REMOVED***[***REMOVED*** icoType: 'cog', onClick: () => onClick(destination) ***REMOVED***]***REMOVED*** />
      </div>
    </div>
  );
***REMOVED***

SettingsRow.propTypes = ***REMOVED***
  destination: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
***REMOVED***;

export default SettingsRow;
