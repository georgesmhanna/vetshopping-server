/**
 *
 * SupportUsBanner
 *
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import SupportUsTitle from 'components/SupportUsTitle';
import SupportUsCta from 'components/SupportUsCta';

import styles from './styles.scss';

function SupportUsBanner() ***REMOVED***
  return (
    <div className=***REMOVED***styles.supportUsBanner***REMOVED***>
      <div>
        <div>
          <SupportUsTitle />
          <FormattedMessage id="app.components.HomePage.support.content">
            ***REMOVED***message => <p>***REMOVED***message***REMOVED***</p>***REMOVED***
          </FormattedMessage>
        </div>
        <div>
          <SupportUsCta />
        </div>
      </div>
    </div>
  );
***REMOVED***

export default SupportUsBanner;
