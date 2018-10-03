/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class Button extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const label = this.props.handlei18n ? <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.label***REMOVED***`***REMOVED*** /> : this.props.label;
    const addShape = this.props.addShape ? <i className="fa fa-plus" /> : '';

    const buttonProps = Object.assign(***REMOVED******REMOVED***, this.props);
    const propsToDelete = ['addShape', 'buttonBackground', 'buttonSize', 'handlei18n', 'label', 'loader'];

    propsToDelete.map((value) => delete buttonProps[value]);

    if (this.props.loader) ***REMOVED***
      return (
        <button
          type="button"
          className=***REMOVED***cn(styles.loader, styles.primary)***REMOVED***
          disabled
        >
          <div className=***REMOVED***styles.saving***REMOVED***>
            <p></p><p></p><p></p>
          </div>
        </button>
      );
***REMOVED***
    return (
      <button className=***REMOVED***`$***REMOVED***styles[this.props.buttonSize]***REMOVED*** $***REMOVED***styles[this.props.buttonBackground]***REMOVED*** $***REMOVED***styles.button***REMOVED***`***REMOVED*** ***REMOVED***...buttonProps***REMOVED***>
        ***REMOVED***addShape***REMOVED******REMOVED***label***REMOVED***
      </button>
    );
***REMOVED***
***REMOVED***

Button.propTypes = ***REMOVED***
  addShape: PropTypes.bool,
  buttonBackground: PropTypes.string,
  buttonSize: PropTypes.string,
  handlei18n: PropTypes.bool,
  label: PropTypes.string,
  loader: PropTypes.bool,
***REMOVED***;

export default Button;
