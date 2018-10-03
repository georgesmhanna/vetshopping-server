/**
*
* List
* params:
*  -handlei18n: bool
*   used for the buttonComponent to render label with FormattedMessage
*  - listButtonLabel: string
*  - listTitle: string
*  - noListButtonPopUp: bool
*     prevent from displaying the OldList button
*  - renderRow: function
*     overrides the default rendering of the OldList tr (we can pass customs components there)
*  - listItems: array the elements to display
*  - handleListPopButtonSave: func
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import ***REMOVED*** Button, Modal, ModalHeader, ModalBody, ModalFooter ***REMOVED*** from 'reactstrap';
import ButtonPrimaryHotline from 'components/Button';
import PopUpForm from 'components/PopUpForm';
import styles from './styles.scss';

/* eslint-disable react/require-default-props  */
class List extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      modal: false,
      // isPopUpFormValid: true,
      requiredInputs: [],
      loader: false,
***REMOVED***;
***REMOVED***

  toggle = () => ***REMOVED***
    if (this.props.actionBeforeOpenPopUp && !this.state.modal) this.props.actionBeforeOpenPopUp();
    this.setState(***REMOVED*** modal: !this.state.modal ***REMOVED***);
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED*** modal: false ***REMOVED***);
    this.props.handleListPopUpSubmit(e);
***REMOVED***

  render() ***REMOVED***
    const handleToggle = this.toggle;
    const button = this.props.noListButtonPopUp
      ? ''
      : (
        <ButtonPrimaryHotline
          buttonBackground=***REMOVED***'secondaryAddType'***REMOVED***
          label=***REMOVED***this.props.listButtonLabel***REMOVED***
          handlei18n=***REMOVED***this.props.handlei18n***REMOVED***
          addShape
          onClick=***REMOVED***handleToggle***REMOVED***
        />
      );

    const addListTitleMarginTop = this.props.addListTitleMarginTop ? styles.paddedTopList : '';
    const titleSpacer = this.props.addListTitleMarginTop ? <div style=***REMOVED******REMOVED*** height: '.1rem'***REMOVED******REMOVED*** /> : '';

    const loader = this.state.loader
      ? <Button onClick=***REMOVED***this.handleSubmit***REMOVED*** className=***REMOVED***styles.primary***REMOVED*** disabled=***REMOVED***this.state.loader***REMOVED***><p className=***REMOVED***styles.saving***REMOVED***><span>.</span><span>.</span><span>.</span></p></Button>
      : (
        <FormattedMessage id="settings-manager.form.button.save">
          ***REMOVED***(message) => (
            <Button onClick=***REMOVED***this.handleSubmit***REMOVED*** className=***REMOVED***styles.primary***REMOVED***>***REMOVED***message***REMOVED***</Button>
          )***REMOVED***
        </FormattedMessage>
      );
    return (
      <div className=***REMOVED***styles.listContainer***REMOVED***>
        <div className=***REMOVED***styles.listSubContainer***REMOVED***>
          <div className=***REMOVED***`$***REMOVED***addListTitleMarginTop***REMOVED*** $***REMOVED***styles.flex***REMOVED***`***REMOVED***>
            <div className=***REMOVED***styles.titleContainer***REMOVED***>
              ***REMOVED***this.props.listTitle***REMOVED***
            </div>
            <div className=***REMOVED***styles.buttonContainer***REMOVED***>
              ***REMOVED***button***REMOVED***
            </div>
          </div>
          ***REMOVED***titleSpacer***REMOVED***
        </div>

        <div className=***REMOVED***styles.ulContainer***REMOVED***>
          <ul>
            ***REMOVED***map(this.props.listItems, (listItem, key) => ***REMOVED***
              if (this.props.renderRow) ***REMOVED***
                return this.props.renderRow(listItem, key, styles);
        ***REMOVED***
              return (
                <li key=***REMOVED***key***REMOVED***>
                  <div className=***REMOVED***styles.flexLi***REMOVED***>
                    ***REMOVED***map(listItem, (item, index) => (
                      <div key=***REMOVED***index***REMOVED***>***REMOVED***item***REMOVED***</div>
                    ))***REMOVED***
                  </div>
                </li>
              );
      ***REMOVED***)***REMOVED***
          </ul>
        </div>

        ***REMOVED***/*  </div> */***REMOVED***
        <div>
          <Modal isOpen=***REMOVED***this.state.modal***REMOVED*** toggle=***REMOVED***this.toggle***REMOVED*** className=***REMOVED***styles.modalPosition***REMOVED***>
            <ModalHeader toggle=***REMOVED***this.toggle***REMOVED*** className=***REMOVED***`$***REMOVED***styles.noBorder***REMOVED*** $***REMOVED***styles.padded***REMOVED*** $***REMOVED***styles.mHeader***REMOVED***`***REMOVED***>
              <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***this.props.listButtonLabel***REMOVED***`***REMOVED*** />
            </ModalHeader>
            <div className=***REMOVED***styles.bordered***REMOVED*** />
            <form onSubmit=***REMOVED***this.handleSubmit***REMOVED***>

              <ModalBody className=***REMOVED***styles.modalBody***REMOVED***>
                <div className=***REMOVED***styles.spacerSmall***REMOVED*** />
                <PopUpForm ***REMOVED***...this.props***REMOVED*** />
              </ModalBody>
              <ModalFooter className=***REMOVED***`$***REMOVED***styles.noBorder***REMOVED*** $***REMOVED***styles.modalFooter***REMOVED***`***REMOVED***>
                <FormattedMessage id="settings-manager.form.button.cancel">
                  ***REMOVED***(message) => (
                    <Button onClick=***REMOVED***handleToggle***REMOVED*** className=***REMOVED***styles.secondary***REMOVED***>***REMOVED***message***REMOVED***</Button>
                  )***REMOVED***
                </FormattedMessage>
                ***REMOVED***loader***REMOVED***
              </ModalFooter>
            </form>
          </Modal>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

List.propTypes = ***REMOVED***
  actionBeforeOpenPopUp: PropTypes.func,
  addListTitleMarginTop: PropTypes.bool,
  error: PropTypes.bool,
  formErrors: PropTypes.array,
  handlei18n: PropTypes.bool,
  handleListPopUpSubmit: PropTypes.func,
  listButtonLabel: PropTypes.string,
  listItems: PropTypes.array,
  listTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  noListButtonPopUp: PropTypes.bool,
  renderRow: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
***REMOVED***;

export default List;
