/**
 *
 * AddFilterCTA
 *
 */ 

import React from 'react';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';

// Design
import Button from 'components/CustomButton';
import Logo from '../../assets/images/icon_filter.png';

import styles from './styles.scss';

class AddFilterCTA extends React.Component ***REMOVED***
  state = ***REMOVED*** imgLoaded: false ***REMOVED***;

  handleImgLoaded = () => this.setState(***REMOVED*** imgLoaded: true ***REMOVED***);

  render() ***REMOVED***
    const ***REMOVED*** onClick, showHideText ***REMOVED*** = this.props;
    const ***REMOVED*** imgLoaded ***REMOVED*** = this.state;
    const id = showHideText ? 'hide' : 'add';
    
    return (
      <Button type="button" onClick=***REMOVED***onClick***REMOVED*** marginTop>
        <div className=***REMOVED***styles.ctaWrapper***REMOVED***>
          ***REMOVED***!imgLoaded && <div className=***REMOVED***styles.spinner***REMOVED***><div /></div>***REMOVED***
          <img src=***REMOVED***Logo***REMOVED*** onLoad=***REMOVED***this.handleImgLoaded***REMOVED*** alt="filter_logo" className=***REMOVED***styles.imgCta***REMOVED*** />
          <FormattedMessage id=***REMOVED***`content-manager.components.AddFilterCTA.$***REMOVED***id***REMOVED***`***REMOVED*** /> 

        </div>
      </Button>
    );
***REMOVED***
***REMOVED***

AddFilterCTA.defaultProps = ***REMOVED***
  onClick: () => ***REMOVED******REMOVED***,
  showHideText: false,
***REMOVED***;

AddFilterCTA.propTypes = ***REMOVED***
  onClick: PropTypes.func,
  showHideText: PropTypes.bool,
***REMOVED***;

export default AddFilterCTA;
