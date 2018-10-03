/**
*
* EditFormSectionSubNested
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import WithFormSection from 'components/WithFormSection';

/* eslint-disable react/require-default-props  */
class EditFormSectionSubNested extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    return (
      <div className=***REMOVED***`$***REMOVED***this.props.styles.padded***REMOVED*** $***REMOVED***this.props.styles.subNestedFormContainer***REMOVED***`***REMOVED***>
        <div className="row">
          ***REMOVED***map(this.props.section, (item, key) => (
            this.props.renderInput(item, key)
          ))***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

EditFormSectionSubNested.propTypes = ***REMOVED***
  renderInput: PropTypes.func,
  section: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  styles: PropTypes.object,
***REMOVED***;

export default WithFormSection(EditFormSectionSubNested); // eslint-disable-line new-cap
