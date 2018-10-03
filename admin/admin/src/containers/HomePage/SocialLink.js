/**
 *
 * SocialLink
 */

import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Gh from 'assets/images/social_gh.png';
import Slack from 'assets/images/social_slack.png';
import Medium from 'assets/images/social_medium.png';
import So from 'assets/images/social_so.png';
import Twitter from 'assets/images/social_twitter.png';
import Reddit from 'assets/images/social_reddit.png';

import styles from './styles.scss';

/* eslint-disable jsx-a11y/alt-text */
function getSrc(name) ***REMOVED***
  switch (name) ***REMOVED***
    case 'GitHub':
      return Gh;
    case 'Reddit':
      return Reddit;
    case 'Medium':
      return Medium;
    case 'Slack':
      return Slack;
    case 'Stack Overflow':
      return So;
    case 'Twitter':
      return Twitter;
    default:
      return Gh;
***REMOVED***
***REMOVED***

class SocialLink extends React.PureComponent ***REMOVED***
  state = ***REMOVED*** imgLoaded: false ***REMOVED***;

  handleImgLoaded = () => this.setState(***REMOVED*** imgLoaded: true ***REMOVED***);

  render() ***REMOVED***
    const ***REMOVED*** link, name ***REMOVED*** = this.props;
    const ***REMOVED*** imgLoaded ***REMOVED*** = this.state;

    return (
      <div className=***REMOVED***cn(styles.socialLink, 'col-md-6 col-lg-6')***REMOVED***>
        <a href=***REMOVED***link***REMOVED*** target="_blank">
          <div>
            ***REMOVED***!imgLoaded && <div className=***REMOVED***styles.spinner***REMOVED***><div /></div>***REMOVED***
            <img src=***REMOVED***getSrc(name)***REMOVED*** onLoad=***REMOVED***this.handleImgLoaded***REMOVED*** />
          </div>
          <span>***REMOVED***name***REMOVED***</span>
        </a>
      </div>
    );
***REMOVED***
***REMOVED***

SocialLink.propTypes = ***REMOVED***
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
***REMOVED***;

export default SocialLink;
