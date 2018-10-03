/**
 *
 * CreateContent
 *
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

function CreateContent() ***REMOVED***
  return (
    <FormattedMessage id="app.components.HomePage.createBlock.content.first">
      ***REMOVED***message => (
        <p>
          ***REMOVED***message***REMOVED***
          <span style=***REMOVED******REMOVED*** fontStyle: 'italic', fontWeight: '500' ***REMOVED******REMOVED***>Content Type Builder</span>
          <FormattedMessage id="app.components.HomePage.createBlock.content.second" />
          <span style=***REMOVED******REMOVED*** fontStyle: 'italic', fontWeight: '500' ***REMOVED******REMOVED***>"Quick Start"</span>
          <FormattedMessage id="app.components.HomePage.createBlock.content.tutorial" />
        </p>
      )***REMOVED***
    </FormattedMessage>
  );
***REMOVED***

export default CreateContent;
