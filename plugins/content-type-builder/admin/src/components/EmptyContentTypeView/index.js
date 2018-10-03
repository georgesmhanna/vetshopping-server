/**
*
* EmptyContentTypeView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import Button from 'components/Button';
import Brush from '../../assets/images/paint_brush.svg';
import styles from './styles.scss';

class EmptyContentTypeView extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <div className=***REMOVED***styles.emptyContentTypeView***REMOVED***>
        <img src=***REMOVED***Brush***REMOVED*** alt="" />
        <div>
          <FormattedMessage id="content-type-builder.home.emptyContentType.title">
            ***REMOVED***(title) => <div className=***REMOVED***styles.title***REMOVED***>***REMOVED***title***REMOVED***</div>***REMOVED***
          </FormattedMessage>
          <FormattedMessage id="content-type-builder.home.emptyContentType.description">
            ***REMOVED***(description) => <div className=***REMOVED***styles.description***REMOVED***>***REMOVED***description***REMOVED***</div>***REMOVED***
          </FormattedMessage>
          <div className=***REMOVED***styles.buttonContainer***REMOVED***>
            <Button
              primaryAddShape
              label="content-type-builder.button.contentType.create"
              onClick=***REMOVED***this.props.handleButtonClick***REMOVED***
            />
          </div>
        </div>

      </div>
    );
***REMOVED***
***REMOVED***

EmptyContentTypeView.propTypes = ***REMOVED***
  handleButtonClick: PropTypes.func.isRequired,
***REMOVED***;

export default EmptyContentTypeView;
