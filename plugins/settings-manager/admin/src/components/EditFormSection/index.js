/**
*
* EditFormSection
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map, isEmpty ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
// HOC Form
import WithFormSection from 'components/WithFormSection';
// nested form
import EditFormSectionNested from 'components/EditFormSectionNested';

/* eslint-disable react/require-default-props  */
class EditFormSection extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const sectionName = isEmpty(this.props.section.name) ? '' : <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.section.name***REMOVED***`***REMOVED*** />;
    const spacer = !isEmpty(sectionName) ? <div className=***REMOVED***this.props.styles.spacer***REMOVED*** /> : '';
    const sectionNameSpacer = !sectionName ? <div style=***REMOVED******REMOVED***height: '.2rem'***REMOVED******REMOVED*** /> : '';
    const sectionDescription = this.props.section.description ? <div className=***REMOVED***this.props.styles.sectionDescription***REMOVED***>***REMOVED***this.props.section.description***REMOVED***</div> : '';
    return (
      <div className=***REMOVED***this.props.styles.editFormSection***REMOVED***>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <span className=***REMOVED***this.props.styles.sectionHeader***REMOVED***>
                ***REMOVED***sectionName***REMOVED***
              </span>
              ***REMOVED***sectionDescription***REMOVED***
              ***REMOVED***spacer***REMOVED***
              ***REMOVED***sectionNameSpacer***REMOVED***
            </div>
            ***REMOVED***map(this.props.section.items, (item, key) => ***REMOVED***

              if (this.props.showNestedForm) ***REMOVED***
                return (
                  <div key=***REMOVED***key***REMOVED*** style=***REMOVED******REMOVED***width: '100%'***REMOVED******REMOVED***>
                    ***REMOVED***this.props.renderInput(item, key)***REMOVED***
                    <EditFormSectionNested
                      section=***REMOVED***item.items***REMOVED***
                      values=***REMOVED***this.props.values***REMOVED***
                      onChange=***REMOVED***this.props.onChange***REMOVED***
                      sectionNested
                      formErrors=***REMOVED***this.props.formErrors***REMOVED***
                    />
                  </div>
                );
        ***REMOVED***
              return this.props.renderInput(item, key);
      ***REMOVED***)***REMOVED***
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

EditFormSection.propTypes = ***REMOVED***
  formErrors: PropTypes.array,
  onChange: PropTypes.func,
  renderInput: PropTypes.func,
  section: PropTypes.object,
  showNestedForm: PropTypes.bool,
  styles: PropTypes.object,
  values: PropTypes.object,
***REMOVED***;

export default WithFormSection(EditFormSection); // eslint-disable-line new-cap
