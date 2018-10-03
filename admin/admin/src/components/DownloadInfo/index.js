/*
*
* DownloadInfo
*
*/

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import Icon from '../../assets/icons/icon_success.svg';
import styles from './styles.scss';

function DownloadInfo() ***REMOVED***
  return (
    <div className=***REMOVED***styles.wrapper***REMOVED***>
      <div className=***REMOVED***styles.content***REMOVED***>
        <img src=***REMOVED***Icon***REMOVED*** alt="info" />
        <div>
          <FormattedMessage id="app.components.DownloadInfo.download" />
          <br />
          <FormattedMessage id="app.components.DownloadInfo.text" />
        </div>
      </div>
    </div>
  );
***REMOVED***

export default DownloadInfo;
