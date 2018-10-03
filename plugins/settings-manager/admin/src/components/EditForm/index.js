/**
*
* EditForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import Button from 'components/Button';
import EditFormSection from 'components/EditFormSection';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class EditForm extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const buttonStyle = this.props.showLoader ? ***REMOVED*** display: 'none' ***REMOVED*** : ***REMOVED******REMOVED***;
    return (
      <div className=***REMOVED***styles.editForm***REMOVED***>
        <form onSubmit=***REMOVED***this.props.onSubmit***REMOVED*** autoComplete="nope">
          <div className=***REMOVED***styles.formContainer***REMOVED***>
            ***REMOVED***map(this.props.sections, (section, key) => ***REMOVED***
              let line;
              // display hr only if next section
              if (key + 1 < this.props.sections.length) ***REMOVED***
                line = <hr />;
        ***REMOVED***
              return (
                <div key=***REMOVED***key***REMOVED*** className=***REMOVED***styles.sectionContainer***REMOVED***>
                  <EditFormSection
                    section=***REMOVED***section***REMOVED***
                    values=***REMOVED***this.props.values***REMOVED***
                    onChange=***REMOVED***this.props.onChange***REMOVED***
                    cancelAction=***REMOVED***this.props.cancelAction***REMOVED***
                    formErrors=***REMOVED***this.props.formErrors***REMOVED***
                  />
                  ***REMOVED***line***REMOVED***
                </div>
              );
      ***REMOVED***)***REMOVED***
          </div>
          <div className=***REMOVED***styles.buttonContainer***REMOVED***>
            <FormattedMessage id="settings-manager.form.button.cancel">
              ***REMOVED***(message) => (
                <Button type="button" label=***REMOVED***message***REMOVED*** buttonSize=***REMOVED***"buttonMd"***REMOVED*** buttonBackground=***REMOVED***"secondary"***REMOVED*** onClick=***REMOVED***this.props.onCancel***REMOVED*** style=***REMOVED***buttonStyle***REMOVED*** />
              )***REMOVED***
            </FormattedMessage>
            <FormattedMessage id="settings-manager.form.button.save">
              ***REMOVED***(message) => (
                <Button type="submit" loader=***REMOVED***this.props.showLoader***REMOVED*** label=***REMOVED***message***REMOVED*** buttonSize=***REMOVED***"buttonLg"***REMOVED*** buttonBackground=***REMOVED***"primary"***REMOVED*** onClick=***REMOVED***this.props.onSubmit***REMOVED*** />
              )***REMOVED***
            </FormattedMessage>
          </div>
        </form>
      </div>
    );
***REMOVED***
***REMOVED***

EditForm.propTypes = ***REMOVED***
  cancelAction: PropTypes.bool,
  formErrors: PropTypes.array,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  sections: PropTypes.array,
  showLoader: PropTypes.bool,
  values: PropTypes.object,
***REMOVED***;

export default EditForm;
