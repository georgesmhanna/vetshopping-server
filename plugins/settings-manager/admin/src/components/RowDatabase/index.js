/**
*
* RowDatabase
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

// modal
import ***REMOVED*** Button, Modal, ModalHeader, ModalBody, ModalFooter ***REMOVED*** from 'reactstrap';
import PopUpForm from 'components/PopUpForm';
import PopUpWarning from 'components/PopUpWarning';
import styles from 'components/List/styles.scss';

/* eslint-disable react/require-default-props  */
class RowDatabase extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      modal: false,
      warning: false,
      loader: false,
***REMOVED***;
***REMOVED***

  deleteDatabase = () => ***REMOVED***
    this.setState(***REMOVED*** warning: !this.state.warning ***REMOVED***);
    this.props.onDeleteDatabase(this.props.data.name);
***REMOVED***

  handleShowDatabaseModal = (e) => ***REMOVED***
    if (e.target.id !== 'trash') ***REMOVED***
      this.setState(***REMOVED*** modal: !this.state.modal ***REMOVED***);
      this.props.getDatabase(this.props.data.name);
***REMOVED***
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED*** modal: false ***REMOVED***);
    this.props.onSubmit(this.props.data.name);
***REMOVED***

  handleToggle = () => ***REMOVED***
    this.setState(***REMOVED*** modal: !this.state.modal ***REMOVED***);
***REMOVED***

  handleToggleWarning = () => this.setState(***REMOVED*** warning: !this.state.warning ***REMOVED***);

  toggle = () => ***REMOVED***
    this.setState(***REMOVED*** modal: !this.state.modal ***REMOVED***);
***REMOVED***

  toggleWarning = () => this.setState(***REMOVED*** warning: !this.state.warning ***REMOVED***);

  render() ***REMOVED***
    const content = ***REMOVED***
      message: this.props.data.isUsed ? 'settings-manager.popUpWarning.databases.danger.message' : 'settings-manager.popUpWarning.databases.delete.message',
      confirm: this.props.data.isUsed ? 'settings-manager.popUpWarning.danger.ok.message' : '',
***REMOVED***;
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
      <li className=***REMOVED***`$***REMOVED***styles.databaseFont***REMOVED***`***REMOVED*** style=***REMOVED******REMOVED*** cursor: 'pointer'***REMOVED******REMOVED*** onClick=***REMOVED***this.handleShowDatabaseModal***REMOVED***>
        <div className=***REMOVED***styles.flexLi***REMOVED***>
          <div className=***REMOVED***styles.flexed***REMOVED***>
            <div className=***REMOVED***styles.squared***REMOVED*** style=***REMOVED******REMOVED*** backgroundColor: this.props.data.color ***REMOVED******REMOVED***>
              ***REMOVED***this.props.data.letter***REMOVED***
            </div>
            <div className=***REMOVED***styles.label***REMOVED*** style=***REMOVED******REMOVED*** fontWeight: '500'***REMOVED******REMOVED***>***REMOVED***this.props.data.name***REMOVED***</div>
          </div>
          <div className=***REMOVED***styles.dbHost***REMOVED***>
            ***REMOVED***this.props.data.host***REMOVED***
          </div>
          <div className=***REMOVED***styles.centered***REMOVED*** style=***REMOVED******REMOVED*** width: '15rem'***REMOVED******REMOVED***>***REMOVED***this.props.data.database***REMOVED***</div>
          <div className=***REMOVED***styles.flexed***REMOVED*** style=***REMOVED******REMOVED*** minWidth: '3rem', justifyContent: 'space-between'***REMOVED******REMOVED***>
            <div className=***REMOVED***styles.ico***REMOVED***><i className="fa fa-pencil" id=***REMOVED***this.props.data.name***REMOVED*** /></div>
            <div className=***REMOVED***`$***REMOVED***styles.leftSpaced***REMOVED*** $***REMOVED***styles.ico***REMOVED***`***REMOVED***><i id="trash" className="fa fa-trash" onClick=***REMOVED***this.handleToggleWarning***REMOVED*** /></div>
          </div>
        </div>
        <div>
          <Modal isOpen=***REMOVED***this.state.modal***REMOVED*** toggle=***REMOVED***this.toggle***REMOVED*** className=***REMOVED***styles.modalPosition***REMOVED***>
            <ModalHeader toggle=***REMOVED***this.toggle***REMOVED*** className=***REMOVED***`$***REMOVED***styles.noBorder***REMOVED*** $***REMOVED***styles.padded***REMOVED*** $***REMOVED***styles.mHeader***REMOVED***`***REMOVED***>
              Databases
            </ModalHeader>
            <div className=***REMOVED***styles.bordered***REMOVED*** />
            <form autoComplete="off">
              <ModalBody className=***REMOVED***styles.modalBody***REMOVED***>
                <div className=***REMOVED***styles.spacerSmall***REMOVED*** />
                <PopUpForm ***REMOVED***...this.props***REMOVED*** />
              </ModalBody>
              <ModalFooter className=***REMOVED***`$***REMOVED***styles.noBorder***REMOVED*** $***REMOVED***styles.modalFooter***REMOVED***`***REMOVED***>
                <FormattedMessage id="settings-manager.form.button.cancel">
                  ***REMOVED***(message) => (
                    <Button onClick=***REMOVED***this.handleToggle***REMOVED*** className=***REMOVED***styles.secondary***REMOVED***>***REMOVED***message***REMOVED***</Button>
                  )***REMOVED***
                </FormattedMessage>
                ***REMOVED***loader***REMOVED***
              </ModalFooter>
            </form>
          </Modal>
        </div>
        <div>
          <PopUpWarning
            isOpen=***REMOVED***this.state.warning***REMOVED***
            toggleModal=***REMOVED***this.toggleWarning***REMOVED***
            onConfirm=***REMOVED***this.props.data.isUsed ? this.toggleWarning : this.deleteDatabase***REMOVED***
            content=***REMOVED***content***REMOVED***
            popUpWarningType=***REMOVED***this.props.data.isUsed ? 'danger' : 'warning'***REMOVED***
            onlyConfirmButton=***REMOVED***this.props.data.isUsed***REMOVED***
          />
        </div>
      </li>
    );
***REMOVED***
***REMOVED***

RowDatabase.propTypes = ***REMOVED***
  data: PropTypes.object,
  error: PropTypes.bool,
  formErrors: PropTypes.array,
  getDatabase: PropTypes.func,
  onDeleteDatabase: PropTypes.func,
  onSubmit: PropTypes.func,
***REMOVED***;

export default RowDatabase;
