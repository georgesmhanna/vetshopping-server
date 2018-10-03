/**
*
* PopUpForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** get, map, includes, split, isEmpty, findIndex ***REMOVED*** from 'lodash';
import ***REMOVED*** Button, Modal, ModalHeader, ModalBody, ModalFooter ***REMOVED*** from 'reactstrap';
import Input from 'components/InputsIndex';
import PopUpHeaderNavLink from 'components/PopUpHeaderNavLink';
import styles from './styles.scss';

/* eslint-disable react/jsx-wrap-multilines */

class PopUpForm extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  createComponent = (el) => ***REMOVED***
    if (get(el, ['inputDescription', 'params', 'link', 'children', 'type'], '') === 'FormattedMessage') ***REMOVED***
      return (
        <FormattedMessage id=***REMOVED***get(el, ['inputDescription', 'params', 'link', 'children', 'attr', 'id'], 'default')***REMOVED*** defaultMessage=" ">
          ***REMOVED***(message) => (
            React.createElement(
              // Create the wrapper component
              // This line will create the link
              get(el, ['inputDescription', 'params', 'link', 'parent', 'type'], 'span'),
              // Set the attributes
              get(el, ['inputDescription', 'params', 'link', 'parent', 'attr'], ''),
              message,
            )
          )***REMOVED***
        </FormattedMessage>
      );
***REMOVED***

    return (
      React.createElement(
        get(el, ['inputDescription', 'params', 'link', 'parent', 'type'], 'span'),
        // Set the attributes
        get(el, ['inputDescription', 'params', 'link', 'parent', 'attr'], ''),
        React.createElement(
          get(el, ['inputDescription', 'params', 'link', 'children', 'type'], 'span'),
          get(el, ['inputDescription', 'params', 'link', 'children', 'attr'], ''),
          get(el, ['inputDescription', 'params', 'link', 'children', 'innerHTML'], ''),
        )
      )
    );
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    this.props.onSubmit(e, false);
***REMOVED***

  renderInput = (item, key) => ***REMOVED***
    // const customBootstrapClass = 'col-md-6'
    let customBootstrapClass = item.type === 'textarea' ?
      'col-md-8 offset-md-4 mr-md-5' : 'col-md-6 offset-md-6 mr-md-5';

    const shouldOverrideRendering = this.props.overrideRenderInputCondition ? this.props.overrideRenderInputCondition(item) : false;

    if (shouldOverrideRendering) ***REMOVED***
      return this.props.overrideRenderInput(item, key);
***REMOVED***

    if (this.props.overrideCustomBootstrapClass) ***REMOVED***
      customBootstrapClass = this.props.customBootstrapClass;
***REMOVED***

    const shouldOverrideHandleBlur = this.props.overrideHandleBlurCondition ? this.props.overrideHandleBlurCondition(item) : false;
    // TODO: refacto this line..
    let value = !isEmpty(this.props.values) && includes(item.name, '.') ? get(this.props.values, [split(item.name, '.')[0], split(item.name, '.')[1]]) : this.props.values[item.name];
    const handleBlur = shouldOverrideHandleBlur ? this.props.onBlur : false;
    const errorIndex = findIndex(this.props.formErrors, ['name', item.name]);
    const errors = errorIndex !== -1 ? this.props.formErrors[errorIndex].errors : [];
    const inputDescription = ***REMOVED***
      id: get(item, ['inputDescription', 'id'], ''),
      params: ***REMOVED***
        link: this.createComponent(item),
***REMOVED***
***REMOVED***;

    if (item.name === 'params.appearance.WYSIWYG') ***REMOVED***
      value = get(this.props.values, item.name, false);
***REMOVED***

    return (
      <Input
        key=***REMOVED***key***REMOVED***
        type=***REMOVED***item.type***REMOVED***
        onChange=***REMOVED***this.props.onChange***REMOVED***
        onBlur=***REMOVED***handleBlur***REMOVED***
        label=***REMOVED***item.label***REMOVED***
        name=***REMOVED***item.name***REMOVED***
        validations=***REMOVED***item.validations***REMOVED***
        inputDescription=***REMOVED***inputDescription***REMOVED***
        value=***REMOVED***value***REMOVED***
        customBootstrapClass=***REMOVED***customBootstrapClass***REMOVED***
        selectOptions=***REMOVED***this.props.selectOptions || []***REMOVED***
        placeholder=***REMOVED***item.placeholder***REMOVED***
        title=***REMOVED***item.title***REMOVED***
        errors=***REMOVED***errors***REMOVED***
        didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
        autoFocus=***REMOVED***key === 0 && item.type !== 'date'***REMOVED***
      />
    );
***REMOVED***

  renderNavContainer = () => (
    <div className=***REMOVED***styles.navContainer***REMOVED***>
      ***REMOVED***map(this.props.popUpHeaderNavLinks, (link, key) => (
        <PopUpHeaderNavLink
          key=***REMOVED***key***REMOVED***
          message=***REMOVED***link.message***REMOVED***
          name=***REMOVED***link.name***REMOVED***
          nameToReplace=***REMOVED***link.nameToReplace***REMOVED***
          routePath=***REMOVED***this.props.routePath***REMOVED***
        />
      ))***REMOVED***
    </div>
  )

  renderPopUpHeader = () => ***REMOVED***
    if (this.props.renderCustomPopUpHeader) ***REMOVED***
      return (this.props.renderCustomPopUpHeader);
***REMOVED***
    return <FormattedMessage id=***REMOVED***this.props.popUpTitle***REMOVED*** />;
***REMOVED***

  renderFooter = () => ***REMOVED***
    const ***REMOVED*** popUpFormType, buttonSubmitMessage, toggle, noButtons, onSubmit ***REMOVED*** = this.props;
    const handleToggle = toggle;

    if (noButtons) ***REMOVED***
      return <div className=***REMOVED***styles.modalFooter***REMOVED*** />;
***REMOVED***

    return (
      <ModalFooter className=***REMOVED***styles.modalFooter***REMOVED***>
        <Button onClick=***REMOVED***handleToggle***REMOVED*** className=***REMOVED***styles.secondary***REMOVED***><FormattedMessage id="content-type-builder.form.button.cancel" /></Button>
        ***REMOVED***popUpFormType !== 'contentType' && <Button type="submit" onClick=***REMOVED***onSubmit***REMOVED*** className=***REMOVED***styles.primaryAddShape***REMOVED***><FormattedMessage id="content-type-builder.button.attributes.add" /></Button>***REMOVED***
        <Button type="button" onClick=***REMOVED***this.handleSubmit***REMOVED*** className=***REMOVED***styles.primary***REMOVED***><FormattedMessage id=***REMOVED***`content-type-builder.$***REMOVED***buttonSubmitMessage***REMOVED***`***REMOVED*** /></Button>***REMOVED***' '***REMOVED***
      </ModalFooter>
    );
***REMOVED***

  render() ***REMOVED***
    const navContainer = this.props.noNav ? '' : this.renderNavContainer();
    const modalBodyStyle = this.props.renderModalBody ? ***REMOVED*** paddingTop: '2.3rem' ***REMOVED*** : ***REMOVED******REMOVED***;
    const modalBody = this.props.renderModalBody ? this.props.renderModalBody()
      : map(this.props.form.items, (item, key ) => this.renderInput(item, key));
    
    return (
      <div className=***REMOVED***styles.popUpForm***REMOVED***>
        <Modal isOpen=***REMOVED***this.props.isOpen***REMOVED*** toggle=***REMOVED***this.props.toggle***REMOVED*** className=***REMOVED***`$***REMOVED***styles.modalPosition***REMOVED***`***REMOVED***>
          <ModalHeader toggle=***REMOVED***this.props.toggle***REMOVED*** className=***REMOVED***styles.popUpFormHeader***REMOVED*** />
          <div className=***REMOVED***styles.headerContainer***REMOVED***>
            <div className=***REMOVED***styles.titleContainer***REMOVED***>
              ***REMOVED***this.renderPopUpHeader()***REMOVED***
            </div>
            ***REMOVED***navContainer***REMOVED***
          </div>
          <ModalBody className=***REMOVED***styles.modalBody***REMOVED*** style=***REMOVED***modalBodyStyle***REMOVED***>
            <form onSubmit=***REMOVED***this.props.onSubmit***REMOVED***>
              <div className="container-fluid">
                <div className="row">
                  ***REMOVED***modalBody***REMOVED***
                </div>
              </div>
            </form>
          </ModalBody>
          ***REMOVED***this.renderFooter()***REMOVED***
        </Modal>
      </div>
    );
***REMOVED***
***REMOVED***

PopUpForm.propTypes = ***REMOVED***
  buttonSubmitMessage: PropTypes.string.isRequired,
  customBootstrapClass: PropTypes.string,
  didCheckErrors: PropTypes.bool,
  form: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  formErrors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  isOpen: PropTypes.bool.isRequired,
  noButtons: PropTypes.bool,
  noNav: PropTypes.bool,
  onBlur: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  overrideCustomBootstrapClass: PropTypes.bool,
  overrideHandleBlurCondition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  overrideRenderInput: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  overrideRenderInputCondition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  popUpFormType: PropTypes.string,
  popUpHeaderNavLinks: PropTypes.array,
  popUpTitle: PropTypes.string.isRequired,
  renderCustomPopUpHeader: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.bool,
  ]),
  renderModalBody: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
  routePath: PropTypes.string,
  selectOptions: PropTypes.array,
  toggle: PropTypes.func.isRequired,
  values: PropTypes.object,
***REMOVED***;

PopUpForm.defaultProps = ***REMOVED***
  customBootstrapClass: 'col-md-6',
  didCheckErrors: false,
  formErrors: [],
  noButtons: false,
  noNav: false,
  onBlur: false,
  overrideCustomBootstrapClass: false,
  overrideHandleBlurCondition: false,
  overrideRenderInput: false,
  overrideRenderInputCondition: false,
  popUpFormType: '',
  popUpHeaderNavLinks: [],
  renderCustomPopUpHeader: false,
  routePath: '',
  selectOptions: [],
  values: ***REMOVED******REMOVED***,
***REMOVED***;

export default PopUpForm;
