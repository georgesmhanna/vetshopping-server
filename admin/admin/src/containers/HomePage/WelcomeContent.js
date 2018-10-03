/**
 *
 * WelcomeContent
 *
 */

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/accessible-emoji */
function WelcomeContent(***REMOVED*** hasContent ***REMOVED***) ***REMOVED***
  return (
    <React.Fragment>
      <div className=***REMOVED***styles.iconWave***REMOVED***>👋</div>
      ***REMOVED***!hasContent && (
        <FormattedMessage id="app.components.HomePage.welcomeBlock.content">
          ***REMOVED***message => (
            <p className=***REMOVED***styles.welcomeContentP***REMOVED***>
              ***REMOVED***message***REMOVED***
              <a className=***REMOVED***styles.welcomeContentA***REMOVED*** href="https://slack.strapi.io/" target="_blank">
                Slack
              </a>
              <FormattedMessage id="app.components.HomePage.welcomeBlock.content.raise" />
              <FormattedMessage id="app.components.HomePage.welcomeBlock.content.issues">
                ***REMOVED***message => (
                  <a
                    className=***REMOVED***styles.welcomeContentA***REMOVED***
                    href="https://github.com/strapi/strapi/issues/new"
                    target="_blank"
                  >
                    ***REMOVED***message***REMOVED***
                  </a>
                )***REMOVED***
              </FormattedMessage>
            </p>
          )***REMOVED***
        </FormattedMessage>
      )***REMOVED***
      ***REMOVED***hasContent && (
        <FormattedMessage id="app.components.HomePage.welcomeBlock.content.again">
          ***REMOVED***message => (
            <p className=***REMOVED***styles.welcomeContentP***REMOVED***>***REMOVED***message***REMOVED***</p>
          )***REMOVED***
        </FormattedMessage>
      )***REMOVED***
    </React.Fragment>
  );
***REMOVED***

WelcomeContent.defaultProps = ***REMOVED***
  hasContent: false,
***REMOVED***;

WelcomeContent.propTypes = ***REMOVED***
  hasContent: PropTypes.bool,
***REMOVED***;

export default WelcomeContent;
