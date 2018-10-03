/**
*
* PopUpForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import WithFormSection from 'components/WithFormSection';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class PopUpForm extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  componentWillUnmount() ***REMOVED***
    if (this.props.resetToggleDefaultConnection) this.props.resetToggleDefaultConnection();
***REMOVED***

  render() ***REMOVED***
    return (
      <div className=***REMOVED***styles.popUpForm***REMOVED***>
        <div className="row">
          <div className="col-sm-12">
            <div className=***REMOVED***styles.padded***REMOVED***>

              <div className="row">

                ***REMOVED***map(this.props.sections, (section) => ***REMOVED***
                  // custom rendering
                  if (this.props.renderPopUpForm) ***REMOVED***
                    // Need to pass props to use this.props.renderInput from WithFormSection HOC
                    return this.props.renderPopUpForm(section, this.props, styles);
            ***REMOVED***
                  return (
                    map(section.items, (item, key) => (
                      this.props.renderInput(item, key)
                    ))
                  );
          ***REMOVED***)***REMOVED***
              </div>
            </div>
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

PopUpForm.propTypes = ***REMOVED***
  renderInput: PropTypes.func,
  renderPopUpForm: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  resetToggleDefaultConnection: PropTypes.func,
  sections: PropTypes.array,
***REMOVED***;

export default WithFormSection(PopUpForm); // eslint-disable-line new-cap
