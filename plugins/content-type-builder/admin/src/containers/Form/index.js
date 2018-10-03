/*
 *
 * Form
 *
 */

import React from 'react';
import ***REMOVED*** bindActionCreators ***REMOVED*** from 'redux';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED***
  camelCase,
  compact,
  concat,
  findIndex,
  filter,
  get,
  has,
  includes,
  isEmpty,
  isObject,
  isUndefined,
  map,
  size,
  split,
  take,
  toNumber,
  replace,
***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import ***REMOVED*** router ***REMOVED*** from 'app';

import ***REMOVED*** temporaryContentTypeFieldsUpdated, storeTemporaryMenu ***REMOVED*** from 'containers/App/actions';
import ***REMOVED*** addAttributeToContentType, addAttributeRelationToContentType, editContentTypeAttribute, editContentTypeAttributeRelation, updateContentType ***REMOVED*** from 'containers/ModelPage/actions';

import AttributeCard from 'components/AttributeCard';
import InputCheckboxWithNestedInputs from 'components/InputCheckboxWithNestedInputs';
import PopUpForm from 'components/PopUpForm';
import PopUpRelations from 'components/PopUpRelations';

// Utils
import ***REMOVED*** checkFormValidity ***REMOVED*** from '../../utils/formValidations';
import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import checkAttributeValidations from './utils/attributeValidations';
import setParallelAttribute, ***REMOVED*** setTempAttribute ***REMOVED*** from './utils/setAttribute';
import ***REMOVED***
  changeInput,
  changeInputAttribute,
  connectionsFetch,
  contentTypeCreate,
  contentTypeEdit,
  contentTypeFetch,
  contentTypeFetchSucceeded,
  removeContentTypeRequiredError,
  resetFormErrors,
  resetIsFormSet,
  setAttributeForm,
  setAttributeFormEdit,
  setForm,
  setFormErrors,
***REMOVED*** from './actions';
import selectForm from './selectors';

import styles from './styles.scss';
import forms from './forms.json';

/* eslint-disable react/sort-comp */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-wrap-multilines */

export class Form extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      showModal: false,
      popUpTitleEdit: '',
      nodeToFocus: 0,
***REMOVED***;

    this.checkAttributeValidations = checkAttributeValidations.bind(this);
    this.setParallelAttribute = setParallelAttribute.bind(this);
    this.setTempAttribute = setTempAttribute.bind(this);
***REMOVED***

  componentDidMount() ***REMOVED***
    // Get available db connections
    this.props.connectionsFetch();
    this.initComponent(this.props, true);
    document.addEventListener('keydown', this.handleKeyBinding);
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.hash !== this.props.hash) ***REMOVED***
      this.initComponent(nextProps, !nextProps.isFormSet);
***REMOVED***

    // Close modal when updating a content type && success updating
    if (nextProps.shouldRefetchContentType !== this.props.shouldRefetchContentType) ***REMOVED***
      // Check if localStorage because the PluginLeftMenu is based on the localStorage
      if (storeData.getMenu()) ***REMOVED***
        // Update localStorage
        const oldMenu = storeData.getMenu();
        const index = findIndex(oldMenu, ['name', replace(this.props.hash.split('::')[0], '#edit', '')]);
        const modifiedContentType = ***REMOVED***
          name: this.props.modifiedDataEdit.name,
          icon: 'fa-caret-square-o-right',
  ***REMOVED***;

        oldMenu.splice(index, 1, modifiedContentType);
        const newMenu = oldMenu;
        storeData.setMenu(newMenu);
***REMOVED***
      // Close Modal
      const redirectToModelPage = includes(this.props.redirectRoute, 'models') ? `/$***REMOVED***this.props.modifiedDataEdit.name***REMOVED***` : '';
      router.push(`$***REMOVED***this.props.redirectRoute***REMOVED***$***REMOVED***redirectToModelPage***REMOVED***`);
      // Reset props
      this.props.resetIsFormSet();

      // Sagas are cancelled on location change so to update the content type description and collectionName we have to force it
      if (this.props.isModelPage) ***REMOVED***
        this.props.updateContentType(this.props.modifiedDataEdit);
***REMOVED***
***REMOVED***
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.modelLoading !== this.props.modelLoading && !isEmpty(this.props.hash)) ***REMOVED***
      this.initComponent(this.props, true);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    document.removeEventListener('keyup', this.handleKeyBinding);
***REMOVED***

  addAttributeToContentType = (redirectToChoose = false) => ***REMOVED***
    const formErrors = this.checkAttributeValidations(checkFormValidity(this.props.modifiedDataAttribute, this.props.formValidations));

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setFormErrors(formErrors);
***REMOVED***

    // Check if user is adding a relation with the same content type

    if (includes(this.props.hash, 'attributerelation') && this.props.modifiedDataAttribute.params.target === this.props.modelName && get(this.props.modifiedDataAttribute, ['params', 'nature'], '') !== 'oneWay') ***REMOVED***
      // Insert two attributes
      this.props.addAttributeRelationToContentType(this.props.modifiedDataAttribute);
***REMOVED*** else ***REMOVED***
      // Update the parent container (ModelPage)
      this.props.addAttributeToContentType(this.props.modifiedDataAttribute);
***REMOVED***
    // Empty the store
    this.props.resetIsFormSet();
    // Empty errors
    this.props.resetFormErrors();
    this.redirectAfterSave(redirectToChoose);
***REMOVED***

  addAttributeToTempContentType = (redirectToChoose = false) => ***REMOVED***
    const formErrors = this.checkAttributeValidations(checkFormValidity(this.props.modifiedDataAttribute, this.props.formValidations));

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setFormErrors(formErrors);
***REMOVED***

    // Get the entire content type from the reducer
    const contentType = this.props.modifiedDataEdit;
    // Add the new attribute to the content type attribute list
    const newAttribute = this.setTempAttribute();
    const parallelAttribute = this.props.modelName === get(newAttribute, ['params', 'target']) && get(newAttribute, ['params', 'nature'], '') === 'oneWay' ? null : this.setParallelAttribute(newAttribute);
    contentType.attributes = compact(concat(contentType.attributes, newAttribute, parallelAttribute));
    // Reset the store and update the parent container
    this.props.contentTypeCreate(contentType);
    // Get the displayed model from the localStorage
    const model = storeData.getModel();
    // Set the new field number in the localStorage
    model.fields = size(contentType.attributes);
    // Update the global store (app container) to add the new value to the model without refetching
    this.props.temporaryContentTypeFieldsUpdated(model.fields);
    // Store the updated model in the localStorage
    storeData.setModel(model);
    this.props.resetFormErrors();
    this.redirectAfterSave(redirectToChoose);
***REMOVED***

  createContentType = (data) => ***REMOVED***
    // Check form errors
    const formErrors = checkFormValidity(data, this.props.formValidations);
    // Check if content type name already exists
    const sameContentTypeNames = filter(this.props.menuData[0].items, (contentType) => contentType.name === data.name);

    if (size(sameContentTypeNames) > 0 && (includes(this.props.hash, '#create') || data.name !== replace(split(this.props.hash, '::')[0], '#edit', ''))) ***REMOVED***
      formErrors.push(***REMOVED*** name: 'name', errors: [***REMOVED*** id: 'content-type-builder.error.contentTypeName.taken' ***REMOVED***]***REMOVED***);
***REMOVED***

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setFormErrors(formErrors);
***REMOVED***
    const oldMenu = !isEmpty(this.props.menuData) ? this.props.menuData[0].items : [];
    // Check if link already exist in the menu to remove it
    const index = findIndex(oldMenu, [ 'name', replace(split(this.props.hash, '::')[0], '#edit', '')]);
    // Insert at a specific position or before the add button the not saved contentType
    const position = index !== -1 ? index  : size(oldMenu) - 1;
    oldMenu.splice(position, index !== -1 ? 1 : 0, ***REMOVED*** icon: 'fa-cube', fields: 0, description: data.description, name: data.name, isTemporary: true ***REMOVED***);
    const newMenu = oldMenu;
    const contentType = data;

    map(contentType.attributes, (attr, key) => ***REMOVED***
      if (get(attr.params, 'target') === this.props.modelName) ***REMOVED***
        contentType.attributes[key].params.target = data.name;
***REMOVED***
***REMOVED***);
    // Store the temporary contentType in the localStorage
    this.props.contentTypeCreate(contentType);
    // Store new menu in localStorage and update App leftMenu
    this.props.storeTemporaryMenu(newMenu, position, index !== -1 ? 1 : 0);
    // Reset popUp form
    this.props.resetIsFormSet();
    // Reset formErrors
    this.props.resetFormErrors();
    // Close modal
    const modelPage = includes(this.props.redirectRoute, 'models') ? '' : '/models';
    router.push(`$***REMOVED***this.props.redirectRoute***REMOVED***$***REMOVED***modelPage***REMOVED***/$***REMOVED***data.name***REMOVED***`);
***REMOVED***

  checkForNestedInput = (item) => ***REMOVED***
    const hasNestedInput = item.items && item.type !== 'select';
    return hasNestedInput;
***REMOVED***

  checkInputContentType = (item) => ***REMOVED***
    const shouldOverrideHandleBlur = item.name === 'name' && includes(this.props.hash, 'contentType');
    return shouldOverrideHandleBlur;
***REMOVED***

  // Function used when modified the name of the content type and not the attributes
  // Fires Form sagas
  contentTypeEdit = () => ***REMOVED***
    const formErrors = checkFormValidity(this.props.modifiedDataEdit, this.props.formValidations);
    const sameContentTypeNames = filter(this.props.menuData[0].items, (contentType) => contentType.name === this.props.modifiedDataEdit.name);


    if (size(sameContentTypeNames) > 0 && this.props.modifiedDataEdit.name !== replace(split(this.props.hash, '::')[0], '#edit', '')) ***REMOVED***
    // if (size(sameContentTypeNames) > 0 && this.props.modifiedDataEdit.name !== this.props.modelName) ***REMOVED***
      formErrors.push(***REMOVED*** name: 'name', errors: [***REMOVED*** id: 'content-type-builder.error.contentTypeName.taken' ***REMOVED***]***REMOVED***);
***REMOVED***

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setFormErrors(formErrors);
***REMOVED***

    const contentType = storeData.getContentType();

    // Update relation key of the temporary contentType
    if (contentType) ***REMOVED***
      map(contentType.attributes, (attr, key) => ***REMOVED***
        if (get(attr.params, 'target') === replace(split(this.props.hash, '::')[0], '#edit', '')) ***REMOVED***
          contentType.attributes[key].params.target = this.props.modifiedDataEdit.name;
  ***REMOVED***
***REMOVED***);
      this.props.contentTypeCreate(contentType);
***REMOVED***

    this.setState(***REMOVED*** showModal: false ***REMOVED***);
    return this.props.contentTypeEdit(this.context);
***REMOVED***

  editContentTypeAttribute = (redirectTochoose = false) => ***REMOVED***
    const formErrors = this.checkAttributeValidations(checkFormValidity(this.props.modifiedDataAttribute, this.props.formValidations));
    const hashArray = split(this.props.hash, '::');

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setFormErrors(formErrors);
***REMOVED***

    if (!isUndefined(hashArray[4])) ***REMOVED***
      // Update the parent container (ModelPage)
      this.props.editContentTypeAttributeRelation(this.props.modifiedDataAttribute, hashArray[3], hashArray[4], this.props.modifiedDataAttribute.params.target !== this.props.modelName);
***REMOVED*** else ***REMOVED***
      this.props.editContentTypeAttribute(this.props.modifiedDataAttribute, hashArray[3], this.props.modifiedDataAttribute.params.target === this.props.modelName);
***REMOVED***
    // Empty the store
    this.props.resetIsFormSet();
    // Empty errors
    this.props.resetFormErrors();
    this.redirectAfterSave(redirectTochoose);
***REMOVED***

  editTempContentTypeAttribute = (redirectToChoose = false) => ***REMOVED***
    const formErrors = this.checkAttributeValidations(checkFormValidity(this.props.modifiedDataAttribute, this.props.formValidations));

    if (!isEmpty(formErrors)) ***REMOVED***
      return this.props.setFormErrors(formErrors);
***REMOVED***

    const contentType = storeData.getContentType();
    const newAttribute = this.setTempAttribute();
    const oldAttribute = contentType.attributes[this.props.hash.split('::')[3]];
    contentType.attributes[this.props.hash.split('::')[3]] = newAttribute;

    if (newAttribute.params.target === this.props.modelName) ***REMOVED***
      const parallelAttribute = this.setParallelAttribute(newAttribute);
      contentType.attributes[findIndex(contentType.attributes, ['name', oldAttribute.params.key])] = parallelAttribute;
***REMOVED***

    if (oldAttribute.params.target === this.props.modelName && newAttribute.params.target !== this.props.modelName) ***REMOVED***
      contentType.attributes.splice(findIndex(contentType.attributes, ['name', oldAttribute.params.key]), 1);
***REMOVED***

    this.editContentTypeAttribute(redirectToChoose);

    const newContentType = contentType;
    // Empty errors
    this.props.resetFormErrors();
    storeData.setContentType(newContentType);
***REMOVED***

  fetchModel = (contentTypeName) => ***REMOVED***
    this.testContentType(
      contentTypeName,
      this.props.contentTypeFetchSucceeded,
      ***REMOVED*** model: storeData.getContentType() ***REMOVED***,
      this.props.contentTypeFetch,
      contentTypeName
    );
***REMOVED***

  generatePopUpTitle = (popUpFormType) => ***REMOVED***
    let popUpTitle;

    const type = split(this.props.hash, '::')[0];
    const isCreating = includes(type, 'create');

    switch (true) ***REMOVED***
      case isCreating && popUpFormType === 'contentType':
        popUpTitle = `content-type-builder.popUpForm.create.$***REMOVED***popUpFormType***REMOVED***.header.title`;
        break;
      case isCreating:
        popUpTitle = 'content-type-builder.popUpForm.create';
        break;
      case includes(type, 'choose'):
        popUpTitle = `content-type-builder.popUpForm.choose.$***REMOVED***popUpFormType***REMOVED***.header.title`;
        break;
      case includes(type, 'edit') && popUpFormType === 'contentType':
        popUpTitle = `content-type-builder.popUpForm.edit.$***REMOVED***popUpFormType***REMOVED***.header.title`;
        break;
      default:
        popUpTitle = 'content-type-builder.popUpForm.edit';
***REMOVED***

    return popUpTitle;
***REMOVED***

  getValues = () => ***REMOVED***
    let values;
    // Three kinds of values are available modifiedData and modifiedDataEdit
    // Allows the user to start creating a contentType and modifying an existing one at the same time
    switch (true) ***REMOVED***
      case includes(this.props.hash, 'edit') && !includes(this.props.hash, 'attribute'):
        values = this.props.modifiedDataEdit;
        break;
      case includes(this.props.hash.split('::')[1], 'attribute'):
        values = this.props.modifiedDataAttribute;
        break;
      default:
        values = this.props.modifiedData;
***REMOVED***

    return values;
***REMOVED***

  goToAttributeTypeView = (attributeType) => ***REMOVED***
    const settings = attributeType === 'relation' ? 'defineRelation' : 'baseSettings';
    router.push(`$***REMOVED***this.props.routePath***REMOVED***#create$***REMOVED***this.props.modelName***REMOVED***::attribute$***REMOVED***attributeType***REMOVED***::$***REMOVED***settings***REMOVED***`);
***REMOVED***

  handleBlur = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    if (target.name === 'name') ***REMOVED***
      this.props.changeInput(target.name, camelCase(target.value), includes(this.props.hash, 'edit'));
      if (!isEmpty(target.value)) ***REMOVED***
        // The input name for content type doesn't have the default handleBlur validation so we need to manually remove the error
        this.props.removeContentTypeRequiredError();
***REMOVED***
***REMOVED***
***REMOVED***

  handleChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    let value = target.type === 'number' && target.value !== '' ? toNumber(target.value) : target.value;

    // Parse enumeration textarea to transform it into a array
    if (target.name === 'params.enumValue') ***REMOVED***
      value = target.value.split(',');
***REMOVED***

    if (isObject(target.value) && target.value._isAMomentObject === true) ***REMOVED***
      value = moment(target.value, 'YYYY-MM-DD HH:mm:ss').format();
***REMOVED***

    if (includes(this.props.hash.split('::')[1], 'attribute')) ***REMOVED***
      this.props.changeInputAttribute(target.name, value);

      if (target.name === 'params.nature' && target.value === 'manyToMany') ***REMOVED***
        this.props.changeInputAttribute('params.dominant', true);
***REMOVED***

      if (target.name === 'params.nature' && target.value === 'oneWay') ***REMOVED***
        this.props.changeInputAttribute('params.key', '-');
***REMOVED***

***REMOVED*** else ***REMOVED***
      this.props.changeInput(target.name, value, includes(this.props.hash, 'edit'));
***REMOVED***
***REMOVED***

  handleKeyBinding = (e) => ***REMOVED***
    if (includes(this.props.hash, 'choose')) ***REMOVED***
      const ***REMOVED*** nodeToFocus ***REMOVED*** = this.state;
      let toAdd = 0;

      switch(e.keyCode) ***REMOVED***
        case 37: // Left arrow
        case 39: // Right arrow
          toAdd = nodeToFocus % 2 === 0 ? 1 : -1;
          break;
        case 38:
          if (nodeToFocus === 0 || nodeToFocus === 1) ***REMOVED***
            toAdd = 8;
    ***REMOVED*** else ***REMOVED***
            toAdd = -2;
    ***REMOVED***
          break;
        case 40:
          if (nodeToFocus === forms.attributesDisplay.items.length - 1 || nodeToFocus === forms.attributesDisplay.items.length - 2) ***REMOVED***
            toAdd = -8;
    ***REMOVED*** else ***REMOVED***
            toAdd = 2;
    ***REMOVED***
          break;
        case 9: // Tab
          e.preventDefault();
          toAdd = nodeToFocus === 9 ? -9 : 1;
          break;
        default:
          toAdd = 0;
          break;
***REMOVED***

      this.setState(prevState => (***REMOVED*** nodeToFocus: prevState.nodeToFocus + toAdd ***REMOVED***));
***REMOVED***
***REMOVED***

  handleSubmit = (e, redirectToChoose = true) => ***REMOVED***
    e.preventDefault();
    const hashArray = split(this.props.hash, ('::'));
    const valueToReplace = includes(this.props.hash, '#create') ? '#create' : '#edit';
    const contentTypeName = replace(hashArray[0], valueToReplace, '');
    let cbSuccess;
    let dataSucces = null;
    let cbFail;

    switch (true) ***REMOVED***
      case includes(hashArray[0], '#edit'): ***REMOVED***
        // Check if the user is editing the attribute
        const isAttribute = includes(hashArray[1], 'attribute');
        cbSuccess = isAttribute ? () => this.editTempContentTypeAttribute(redirectToChoose) : this.createContentType;
        dataSucces = isAttribute ? null : this.getModelWithCamelCaseName(this.props.modifiedDataEdit);
        cbFail = isAttribute ? () => this.editContentTypeAttribute(redirectToChoose) : this.contentTypeEdit;
        return this.testContentType(contentTypeName, cbSuccess, dataSucces, cbFail);
***REMOVED***
      case includes(hashArray[0], 'create') && includes(this.props.hash.split('::')[1], 'attribute'): ***REMOVED***
        cbSuccess = () => this.addAttributeToTempContentType(redirectToChoose);
        cbFail = () => this.addAttributeToContentType(redirectToChoose);
        return this.testContentType(contentTypeName, cbSuccess, dataSucces, cbFail);
***REMOVED***
      default: ***REMOVED***
        return this.createContentType(
          this.getModelWithCamelCaseName(this.props.modifiedData)
        );
***REMOVED***
***REMOVED***
***REMOVED***

  getModelWithCamelCaseName = (model = ***REMOVED******REMOVED***) => ***REMOVED***
    if (isEmpty(model) || isEmpty(model.name)) ***REMOVED***
      return;
***REMOVED***

    return ***REMOVED***
      ...model,
      name: camelCase(model.name),
***REMOVED***;
***REMOVED***

  initComponent = (props, condition) => ***REMOVED***
    if (!isEmpty(props.hash)) ***REMOVED***
      this.setState(***REMOVED*** showModal: true ***REMOVED***);
      const valueToReplace = includes(props.hash, '#create') ? '#create' : '#edit';
      const contentTypeName = replace(split(props.hash, '::')[0], valueToReplace, '');
      const isPopUpAttribute = includes(props.hash, 'attribute');
      const isCreating = valueToReplace === '#create';

      if (condition && !isEmpty(contentTypeName) && contentTypeName !== '#choose') ***REMOVED***
        this.fetchModel(contentTypeName);
***REMOVED***

      switch (true) ***REMOVED***
        case isPopUpAttribute && contentTypeName !== '#choose': ***REMOVED***
          if (isCreating) ***REMOVED***
            this.props.setAttributeForm(props.hash);
    ***REMOVED*** else if (get(props.contentTypeData, 'name')) ***REMOVED***
            this.setState(***REMOVED*** popUpTitleEdit: get(props.contentTypeData, ['attributes', split(props.hash, '::')[3], 'name']) ***REMOVED***);
            this.props.setAttributeFormEdit(props.hash, props.contentTypeData);
    ***REMOVED***
          break;
  ***REMOVED***
        case includes(props.hash, 'contentType'):
          this.props.setForm(props.hash);
          break;
        default:
***REMOVED***
***REMOVED*** else ***REMOVED***
      this.setState(***REMOVED*** showModal: false ***REMOVED***);
***REMOVED***
***REMOVED***

  renderModalBodyChooseAttributes = () => ***REMOVED***
    const attributesDisplay = has(this.context.plugins.toJS(), 'upload')
      ? forms.attributesDisplay.items
      : forms.attributesDisplay.items.filter(obj => obj.type !== 'media'); // Don't display the media field if the upload plugin isn't installed

    return (
      map(attributesDisplay, (attribute, key) => (
        <AttributeCard
          key=***REMOVED***key***REMOVED***
          attribute=***REMOVED***attribute***REMOVED***
          autoFocus=***REMOVED***key === 0***REMOVED***
          routePath=***REMOVED***this.props.routePath***REMOVED***
          handleClick=***REMOVED***this.goToAttributeTypeView***REMOVED***
          nodeToFocus=***REMOVED***this.state.nodeToFocus***REMOVED***
          tabIndex=***REMOVED***key***REMOVED***
          resetNodeToFocus=***REMOVED***this.resetNodeToFocus***REMOVED***
        />
      ))
    );
***REMOVED***

  redirectAfterSave = (shouldOpenAttributesModal = false) => ***REMOVED***
    const ***REMOVED*** modelName, redirectRoute ***REMOVED*** = this.props;
    const path = shouldOpenAttributesModal ? '#choose::attributes' : '';

    router.push(`$***REMOVED***redirectRoute***REMOVED***/$***REMOVED***modelName***REMOVED***$***REMOVED***path***REMOVED***`);
***REMOVED***

  resetNodeToFocus = () => this.setState(***REMOVED*** nodeToFocus: 0 ***REMOVED***);

  testContentType = (contentTypeName, cbSuccess, successData, cbFail, failData) => ***REMOVED***
    // Check if the content type is in the localStorage (not saved) to prevent request error
    if (storeData.getIsModelTemporary() && get(storeData.getContentType(), 'name') === contentTypeName) ***REMOVED***
      cbSuccess(successData);
***REMOVED*** else ***REMOVED***
      cbFail(failData);
***REMOVED***
***REMOVED***

  toggle = () => ***REMOVED***
    this.props.toggle();
    // Set the isFormSet props to false when the modal is closing so the store is emptied
    this.props.resetIsFormSet();
    this.props.resetFormErrors();
***REMOVED***

  overrideCustomBootstrapClass = () => ***REMOVED***
    return includes(this.props.hash, 'attributenumber');
***REMOVED***

  renderInput = (item, key) => (
    <InputCheckboxWithNestedInputs
      key=***REMOVED***key***REMOVED***
      data=***REMOVED***item***REMOVED***
      value=***REMOVED***this.props.modifiedDataAttribute.params***REMOVED***
      onChange=***REMOVED***this.handleChange***REMOVED***
      errors=***REMOVED***this.props.formErrors***REMOVED***
      didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
    />
  )

  renderCustomPopUpHeader = (startTitle) => ***REMOVED***
    const italicText = !includes(this.props.hash, '#edit') ?
      <FormattedMessage id='popUpForm.header' defaultMessage='***REMOVED***title***REMOVED***' values=***REMOVED******REMOVED*** title: replace(split(this.props.hash, ('::'))[1], 'attribute', '') ***REMOVED******REMOVED***>
        ***REMOVED***(message) => <span style=***REMOVED******REMOVED*** fontStyle: 'italic', textTransform: 'capitalize' ***REMOVED******REMOVED***>***REMOVED***message***REMOVED***</span>***REMOVED***
      </FormattedMessage>
      : <span style=***REMOVED******REMOVED*** fontStyle: 'italic', textTransform: 'capitalize' ***REMOVED******REMOVED***>***REMOVED***this.state.popUpTitleEdit***REMOVED***</span>;
    return (
      <div>
        <FormattedMessage id=***REMOVED***startTitle***REMOVED*** />
        &nbsp;
        ***REMOVED***italicText***REMOVED***
        &nbsp;
        <FormattedMessage id="content-type-builder.popUpForm.field" />
      </div>
    );
***REMOVED***

  render() ***REMOVED***
    // Ensure typeof(popUpFormType) is String
    const popUpFormType = split(this.props.hash, '::')[1] || '';
    const popUpTitle = this.generatePopUpTitle(popUpFormType);
    const values = this.getValues();
    const noNav = includes(this.props.hash, 'choose');
    // Override the default rendering
    const renderModalBody = includes(this.props.hash, '#choose') ? this.renderModalBodyChooseAttributes : false;
    // Hide the button in the modal
    const noButtons = includes(this.props.hash, '#choose');
    const buttonSubmitMessage = includes(this.props.hash.split('::')[1], 'contentType') ? 'form.button.save' : 'form.button.continue';
    const renderCustomPopUpHeader = !includes(this.props.hash, '#choose') && includes(this.props.hash, '::attribute') ? this.renderCustomPopUpHeader(popUpTitle) : false;
    const dropDownItems = take(get(this.props.menuData, ['0', 'items']), size(get(this.props.menuData[0], 'items')) - 1);
    const edit = includes(this.props.hash, '#edit');
    const selectOptions = includes(this.props.hash, 'attributenumber') ? get(this.props.form, ['items', '1', 'items']) : this.props.selectOptions;

    if (includes(popUpFormType, 'relation')) ***REMOVED***
      const contentType = this.props.modelName.split('&source=');
      const contentTypeIndex = contentType.length === 2 ? ***REMOVED*** name: contentType[0], source: contentType[1] ***REMOVED*** : ***REMOVED*** name: contentType[0] ***REMOVED***;

      return (
        <PopUpRelations
          isOpen=***REMOVED***this.state.showModal***REMOVED***
          toggle=***REMOVED***this.toggle***REMOVED***
          renderCustomPopUpHeader=***REMOVED***renderCustomPopUpHeader***REMOVED***
          popUpTitle=***REMOVED***popUpTitle***REMOVED***
          routePath=***REMOVED***`$***REMOVED***this.props.routePath***REMOVED***/$***REMOVED***this.props.hash***REMOVED***`***REMOVED***
          contentType=***REMOVED***get(dropDownItems, [findIndex(dropDownItems, contentTypeIndex)])***REMOVED***
          form=***REMOVED***this.props.form***REMOVED***
          showRelation=***REMOVED***includes(this.props.hash, 'defineRelation')***REMOVED***
          onChange=***REMOVED***this.handleChange***REMOVED***
          values=***REMOVED***this.props.modifiedDataAttribute***REMOVED***
          dropDownItems=***REMOVED***dropDownItems***REMOVED***
          onSubmit=***REMOVED***this.handleSubmit***REMOVED***
          formErrors=***REMOVED***this.props.formErrors***REMOVED***
          didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
          isEditting=***REMOVED***edit***REMOVED***
          resetFormErrors=***REMOVED***this.props.resetFormErrors***REMOVED***
        />
      );
***REMOVED***

    return (
      <div className=***REMOVED***styles.form***REMOVED***>
        <PopUpForm
          isOpen=***REMOVED***this.state.showModal***REMOVED***
          toggle=***REMOVED***this.toggle***REMOVED***
          popUpFormType=***REMOVED***popUpFormType***REMOVED***
          popUpTitle=***REMOVED***popUpTitle***REMOVED***
          routePath=***REMOVED***`$***REMOVED***this.props.routePath***REMOVED***/$***REMOVED***this.props.hash***REMOVED***`***REMOVED***
          popUpHeaderNavLinks=***REMOVED***this.props.popUpHeaderNavLinks***REMOVED***
          form=***REMOVED***this.props.form***REMOVED***
          values=***REMOVED***values***REMOVED***
          selectOptions=***REMOVED***selectOptions***REMOVED***
          onChange=***REMOVED***this.handleChange***REMOVED***
          onBlur=***REMOVED***this.handleBlur***REMOVED***
          onSubmit=***REMOVED***this.handleSubmit***REMOVED***
          noNav=***REMOVED***noNav***REMOVED***
          renderModalBody=***REMOVED***renderModalBody***REMOVED***
          noButtons=***REMOVED***noButtons***REMOVED***
          overrideRenderInputCondition=***REMOVED***this.checkForNestedInput***REMOVED***
          overrideRenderInput=***REMOVED***this.renderInput***REMOVED***
          buttonSubmitMessage=***REMOVED***buttonSubmitMessage***REMOVED***
          showLoader=***REMOVED***this.props.showButtonLoading***REMOVED***
          renderCustomPopUpHeader=***REMOVED***renderCustomPopUpHeader***REMOVED***
          overrideHandleBlurCondition=***REMOVED***this.checkInputContentType***REMOVED***
          formErrors=***REMOVED***this.props.formErrors***REMOVED***
          didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
          pluginID="content-type-builder"
          overrideCustomBootstrapClass=***REMOVED***includes(this.props.hash, 'attributenumber') && includes(this.props.hash, 'baseSettings')***REMOVED***
          customBootstrapClass='col-md-6'
        />
      </div>
    );
***REMOVED***
***REMOVED***

Form.contextTypes = ***REMOVED***
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func,
***REMOVED***;

const mapStateToProps = selectForm();

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      addAttributeRelationToContentType,
      addAttributeToContentType,
      editContentTypeAttribute,
      editContentTypeAttributeRelation,
      changeInput,
      changeInputAttribute,
      connectionsFetch,
      contentTypeCreate,
      contentTypeEdit,
      contentTypeFetch,
      contentTypeFetchSucceeded,
      removeContentTypeRequiredError,
      resetFormErrors,
      resetIsFormSet,
      setAttributeForm,
      setAttributeFormEdit,
      setForm,
      setFormErrors,
      storeTemporaryMenu,
      temporaryContentTypeFieldsUpdated,
      updateContentType,
***REMOVED***,
    dispatch
  );
***REMOVED***

Form.propTypes = ***REMOVED***
  addAttributeRelationToContentType: PropTypes.func.isRequired,
  addAttributeToContentType: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeInputAttribute: PropTypes.func.isRequired,
  connectionsFetch: PropTypes.func.isRequired,
  contentTypeCreate: PropTypes.func.isRequired,
  contentTypeEdit: PropTypes.func.isRequired,
  contentTypeFetch: PropTypes.func.isRequired,
  contentTypeFetchSucceeded: PropTypes.func.isRequired,
  didCheckErrors: PropTypes.bool.isRequired,
  editContentTypeAttribute: PropTypes.func.isRequired,
  editContentTypeAttributeRelation: PropTypes.func.isRequired,
  form: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]).isRequired,
  formErrors: PropTypes.array.isRequired,
  formValidations: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  isFormSet: PropTypes.bool.isRequired,
  isModelPage: PropTypes.bool,
  menuData: PropTypes.array.isRequired,
  modelLoading: PropTypes.bool, // eslint-disable-line react/require-default-props
  modelName: PropTypes.string,
  modifiedData: PropTypes.object.isRequired,
  modifiedDataAttribute: PropTypes.object.isRequired,
  modifiedDataEdit: PropTypes.object.isRequired,
  popUpHeaderNavLinks: PropTypes.array.isRequired,
  redirectRoute: PropTypes.string.isRequired,
  removeContentTypeRequiredError: PropTypes.func.isRequired,
  resetFormErrors: PropTypes.func.isRequired,
  resetIsFormSet: PropTypes.func.isRequired,
  routePath: PropTypes.string.isRequired,
  selectOptions: PropTypes.array.isRequired,
  setAttributeForm: PropTypes.func.isRequired,
  setAttributeFormEdit: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  shouldRefetchContentType: PropTypes.bool.isRequired,
  showButtonLoading: PropTypes.bool.isRequired,
  storeTemporaryMenu: PropTypes.func.isRequired,
  temporaryContentTypeFieldsUpdated: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  updateContentType: PropTypes.func.isRequired,
***REMOVED***;

Form.defaultProps = ***REMOVED***
  isModelPage: false,
  modelName: '',
***REMOVED***;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Form);
