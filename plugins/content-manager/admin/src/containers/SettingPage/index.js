/**
 * 
 * SettingPage
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** findIndex, get, isEmpty, upperFirst ***REMOVED*** from 'lodash';
import cn from 'classnames';
import HTML5Backend from 'react-dnd-html5-backend';
import ***REMOVED*** DragDropContext ***REMOVED*** from 'react-dnd';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ***REMOVED*** from 'reactstrap';
import PropTypes from 'prop-types';
import ***REMOVED***
  beginMove,
  endMove,
  moveAttr,
  moveAttrEditView,
  moveVariableAttrEditView,
  onChangeSettings,
  onClickAddAttr,
  onClickAddAttrField,
  onRemove,
  onRemoveEditViewFieldAttr,
  onRemoveEditViewRelationAttr,
  onReset,
  onSubmit,
  setLayout,
***REMOVED*** from 'containers/App/actions';
import ***REMOVED***
  makeSelectAddedField,
  makeSelectDraggedItemName,
  makeSelectGrid,
  makeSelectHoverIndex,
  makeSelectInitDragLine,
  makeSelectModifiedSchema,
  makeSelectShouldResetGrid,
  makeSelectSubmitSuccess,
***REMOVED*** from 'containers/App/selectors';
import BackHeader from 'components/BackHeader';
import Input from 'components/InputsIndex';
import PluginHeader from 'components/PluginHeader';
import PopUpWarning from 'components/PopUpWarning';
import Block from 'components/Block';
import CustomDragLayer from 'components/CustomDragLayer';
import DraggableAttr from 'components/DraggableAttr';
import VariableDraggableAttr from 'components/VariableDraggableAttr';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ***REMOVED*** onClickEditField, onClickEditListItem, onClickEditRelation ***REMOVED*** from './actions';
import forms from './forms.json';
import reducer from './reducer';
import saga from './saga';
import makeSelectSettingPage from './selectors';
import styles from './styles.scss';

class SettingPage extends React.PureComponent ***REMOVED***
  state = ***REMOVED***
    isDraggingSibling: false,
    isOpen: false,
    isOpenField: false,
    isOpenRelation: false,
    showWarning: false,
    showWarningCancel: false,
    shouldSelectField: false,
    shouldSelectRelation: false,
***REMOVED***;

  componentDidMount() ***REMOVED***
    this.handleClickEditAttr(0);
    const fields = this.getEditPageDisplayedFields();
    const relations = this.getEditPageDisplayedRelations();
    this.props.setLayout(`$***REMOVED***this.getPath()***REMOVED***.editDisplay`);
    
    if (fields.length > 0) ***REMOVED***
      this.handleClickEditField(0);
***REMOVED*** else if (relations.length > 0) ***REMOVED***
      this.handleClickEditRelation(0);
***REMOVED***
***REMOVED***

  componentDidUpdate(prevProps, prevState) ***REMOVED***
    const ***REMOVED*** schema ***REMOVED*** = prevProps;
    const prevDisplayedFields = get(schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'fields'], []);
    const prevDisplayedRelations = get(schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'relations'], []);
    const currentDisplayedFields = get(this.props.schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'fields'], []);
    const currentDisplayedRelations = get(this.props.schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'relations'], []);
    
    if (prevProps.submitSuccess !== this.props.submitSuccess) ***REMOVED***
      this.toggle();
***REMOVED***

    if (prevDisplayedFields.length === 0 && currentDisplayedFields.length > 0 && prevState.shouldSelectField !== this.state.shouldSelectField) ***REMOVED***
      this.handleClickEditField(0);
***REMOVED***

    if (prevDisplayedRelations.length === 0 && currentDisplayedRelations.length > 0 && prevState.shouldSelectRelation !== this.state.shouldSelectRelation) ***REMOVED***
      this.handleClickEditRelation(0);
***REMOVED***

    if (prevProps.addedField !== this.props.addedField) ***REMOVED***
      this.props.setLayout(`$***REMOVED***this.getPath()***REMOVED***.editDisplay`);
***REMOVED***

    if (prevProps.shouldResetGrid !== this.props.shouldResetGrid) ***REMOVED***
      this.props.setLayout(`$***REMOVED***this.getPath()***REMOVED***.editDisplay`);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    // Reset the modified data
    this.props.onReset();
***REMOVED***

  getAttrData = attrName => get(this.getEditPageDisplaySettings(), ['availableFields', attrName], ***REMOVED******REMOVED***);

  getDefaultSort = () => this.getValue(`$***REMOVED***this.getPath()***REMOVED***.defaultSort`, 'string');

  getDropDownItems = () => ***REMOVED***
    const name = get(this.props.schema, `models.$***REMOVED***this.getPath()***REMOVED***.primaryKey`, 'id' );
    // The id attribute is not present on the schema so we need to add it manually
    const defaultAttr = ***REMOVED*** [name]: ***REMOVED*** name, label: 'Id', type: 'string', searchable: true, sortable: true ***REMOVED*** ***REMOVED***;
    const attributes = Object.assign(get(this.props.schema, `models.$***REMOVED***this.getPath()***REMOVED***.attributes`, ***REMOVED******REMOVED***), defaultAttr);

    return Object.keys(attributes)
      .filter(attr => ***REMOVED***
        return findIndex(this.getListDisplay(), ['name', attr]) === -1 && !attributes[attr].hasOwnProperty('collection') && !attributes[attr].hasOwnProperty('model');
***REMOVED***)
      .map(attr => ***REMOVED***
        const searchable = attributes[attr].type !== 'json' && attributes[attr].type !== 'array';
        const obj = Object.assign(attributes[attr], ***REMOVED*** name: attr, label: upperFirst(attr), searchable, sortable: searchable ***REMOVED***);

        return obj;
***REMOVED***);
***REMOVED***

  getDropDownFieldItems = () => ***REMOVED***
    const currentDisplayedFields = this.getEditPageDisplayedFields();
    const availableFields = get(this.props.schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'availableFields'], ***REMOVED******REMOVED***);

    return Object.keys(availableFields)
      .filter(field => ***REMOVED***
        return currentDisplayedFields.indexOf(field) === -1;
***REMOVED***);
***REMOVED***

  getDropDownRelationsItems = () => ***REMOVED***
    const currentDisplayedRelations = this.getEditPageDisplayedRelations();

    return this.getRelations()
      .filter(relation => ***REMOVED***
        return currentDisplayedRelations.indexOf(relation) === -1;
***REMOVED***);
***REMOVED***

  getEditPageDisplaySettings = () => ***REMOVED***
    return get(this.props.schema, 'models.'.concat(this.getPath().concat('.editDisplay')), ***REMOVED*** fields: [], relations: [] ***REMOVED***);
***REMOVED***
  
  getEditPageDisplayedFields = () => get(this.getEditPageDisplaySettings(), ['fields'], []);
  
  getEditPageDisplayedRelations = () => get(this.getEditPageDisplaySettings(), ['relations'], []);

  getLayout = () => ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** slug, endPoint ***REMOVED*** ***REMOVED***, schema: ***REMOVED*** layout ***REMOVED*** ***REMOVED*** = this.props;

    return get(layout, [endPoint || slug, 'attributes' ], ***REMOVED******REMOVED***);
***REMOVED***

  getListDisplay = () => get(this.props.schema, `models.$***REMOVED***this.getPath()***REMOVED***.listDisplay`, []);

  getModelName = () => ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** slug, endPoint ***REMOVED*** ***REMOVED*** ***REMOVED*** = this.props;

    return endPoint || slug;
***REMOVED***

  getPath = () => ***REMOVED***
    const ***REMOVED*** match: ***REMOVED*** params: ***REMOVED*** slug, source, endPoint ***REMOVED*** ***REMOVED*** ***REMOVED*** = this.props;

    return [slug, source, endPoint]
      .filter(param => param !== undefined)
      .join('.');
***REMOVED***

  getRelationLabel = (attrName) => ***REMOVED***
    const attrLabel = get(this.props.schema, ['models', ...this.getPath().split('.'), 'relations', attrName, 'label'], 'iii');
    
    return attrLabel;
***REMOVED***

  getRelations = () => ***REMOVED***
    const relations = get(this.props.schema, 'models.'.concat(this.getPath()).concat('.relations'), ***REMOVED******REMOVED***);
    
    return Object.keys(relations)
      .filter(relation => ***REMOVED***
        const isUploadRelation = get(relations, [relation, 'plugin'], '') === 'upload';
        const isMorphSide = get(relations, [relation, 'nature'], '').toLowerCase().includes('morph') && get(relations, [relation, relation]) !== undefined;

        return !isUploadRelation && !isMorphSide;
***REMOVED***);
***REMOVED***

  getSelectOptions = (input) => ***REMOVED***
    const selectOptions = this.getListDisplay().reduce((acc, curr) => ***REMOVED***

      if (curr.sortable === true) ***REMOVED***
        return acc.concat([curr.name]);
***REMOVED***

      return acc;
***REMOVED***, []);

    if (selectOptions.length === 0) ***REMOVED***
      selectOptions.push(this.getPrimaryKey());
***REMOVED***

    return input.name === 'defaultSort' ? selectOptions : input.selectOptions;
***REMOVED***

  getPluginHeaderActions = () => ***REMOVED***
    return (
      [
        ***REMOVED***
          label: 'content-manager.popUpWarning.button.cancel',
          kind: 'secondary',
          onClick: this.handleReset,
          type: 'button',
  ***REMOVED***
        ***REMOVED***
          kind: 'primary',
          label: 'content-manager.containers.Edit.submit',
          onClick: this.handleSubmit,
          type: 'submit',
  ***REMOVED***
      ]
    );
***REMOVED***

  getPrimaryKey = () => get(this.props.schema, ['models', this.getModelName()].concat(['primaryKey']), 'id');

  getValue = (keys, type) => ***REMOVED***
    const value =  get(this.props.schema, ['models'].concat(keys.split('.')));

    return type === 'toggle' ? value : value.toString();
***REMOVED***

  handleChange = (e) => ***REMOVED***
    const defaultSort = this.getDefaultSort();
    const name = e.target.name.split('.');
    name.pop();
    const attrName = get(this.props.schema.models, name.concat(['name']));
    const isDisablingDefaultSort = attrName === defaultSort && e.target.value === false;

    if (isDisablingDefaultSort) ***REMOVED***
      const enableAttrsSort = this.getSelectOptions(***REMOVED*** name: 'defaultSort' ***REMOVED***).filter(attr => attr !== attrName);
      
      if (enableAttrsSort.length === 0) ***REMOVED***
        strapi.notification.info('content-manager.notification.info.SettingPage.disableSort');
***REMOVED*** else ***REMOVED***
        const newDefaultSort = enableAttrsSort.length === 0 ? this.getPrimaryKey() : enableAttrsSort[0];
        const target = ***REMOVED*** name: `$***REMOVED***this.getPath()***REMOVED***.defaultSort`, value: newDefaultSort ***REMOVED***;  
        this.props.onChangeSettings(***REMOVED*** target ***REMOVED***);
        this.props.onChangeSettings(e);
***REMOVED***
***REMOVED*** else ***REMOVED***
      this.props.onChangeSettings(e);
***REMOVED***
***REMOVED***

  handleClickEditAttr = index => ***REMOVED***
    const attrToEdit = get(this.props.schema, ['models'].concat(this.getPath().split('.')).concat(['listDisplay', index]), ***REMOVED******REMOVED***);
    this.props.onClickEditListItem(attrToEdit);
***REMOVED***

  handleClickEditField = index => ***REMOVED***
    const fieldToEditName = get(this.props.schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'fields', index], '');
    const fieldToEdit = get(this.props.schema, ['models', ...this.getPath().split('.'), 'editDisplay', 'availableFields', fieldToEditName], ***REMOVED******REMOVED***);
    
    return this.props.onClickEditField(fieldToEdit);
***REMOVED***

  handleClickEditRelation = index => ***REMOVED***
    const relationToEditName = get(this.getEditPageDisplayedRelations(), index, '');
    const relationToEdit = get(this.props.schema, ['models', ...this.getPath().split('.'), 'relations', relationToEditName]);

    return this.props.onClickEditRelation(relationToEdit);
***REMOVED***

  handleConfirmReset = () => ***REMOVED***
    this.props.onReset();
    this.toggleWarningCancel();
***REMOVED***

  handleGoBack = () => this.props.history.goBack();

  handleRemove = (index, keys) => ***REMOVED***
    const attrToRemove = get(this.getListDisplay(), index, ***REMOVED******REMOVED***);
    const defaultSort = this.getDefaultSort();
    const isRemovingDefaultSort = defaultSort === attrToRemove.name;
    
    if (isRemovingDefaultSort) ***REMOVED***
      const enableAttrsSort = this.getSelectOptions(***REMOVED*** name: 'defaultSort' ***REMOVED***).filter(attr => attr !== attrToRemove.name);
      const newDefaultSort = enableAttrsSort.length > 1 ? enableAttrsSort[0] : this.getPrimaryKey();
      const target = ***REMOVED*** name: `$***REMOVED***this.getPath()***REMOVED***.defaultSort`, value: newDefaultSort ***REMOVED***;  
      this.props.onChangeSettings(***REMOVED*** target ***REMOVED***);
***REMOVED***

    this.props.onRemove(index, keys);
***REMOVED***

  handleRemoveField = (index, keys) => ***REMOVED***
    const ***REMOVED*** settingPage: ***REMOVED*** fieldToEdit ***REMOVED*** ***REMOVED*** = this.props;
    const fieldToEditName = get(this.props.schema, ['models', ...keys.split('.'), 'fields', index], '');
    this.manageRemove(index, keys, fieldToEditName, fieldToEdit, false);
***REMOVED***

  handleRemoveRelation = (index, keys) => ***REMOVED***
    const ***REMOVED*** settingPage: ***REMOVED*** relationToEdit ***REMOVED*** ***REMOVED*** = this.props;
    const relationToRemoveName = get(this.props.schema, ['models', ...keys.split('.'), index]);
    this.manageRemove(index, keys, relationToRemoveName, relationToEdit);
***REMOVED***

  manageRemove = (index, keys, itemName, data, isRelation = true) => ***REMOVED***
    const isRemovingSelectedItem = isRelation ? itemName === data.alias : itemName === data.name;
    const displayedRelations = this.getEditPageDisplayedRelations();
    const displayedFields = this.getEditPageDisplayedFields();
    
    if (isRelation) ***REMOVED***
      this.props.onRemoveEditViewRelationAttr(index, keys);
***REMOVED*** else ***REMOVED***
      this.props.onRemoveEditViewFieldAttr(index, keys);
***REMOVED***

    if (isRemovingSelectedItem) ***REMOVED***
      const selectNextItemCond = isRelation ? displayedRelations.length > 2 : displayedFields.length > 2;
      const selectOtherItemCond = isRelation ? displayedFields.length > 0 : displayedRelations.length > 0;
      const selectNextFunc = isRelation ? this.handleClickEditRelation : this.handleClickEditField;
      const selectOtherFunc = !isRelation ? this.handleClickEditRelation : this.handleClickEditField;

      if (selectNextItemCond) ***REMOVED***
        let nextIndex = index - 1 > 0 ? index - 1 : index + 1;

        if (!isRelation) ***REMOVED***
          const nextItem = get(this.getEditPageDisplayedFields(), nextIndex);
          
          if (nextItem.includes('__col-md')) ***REMOVED***
            nextIndex = index - 2 > 0 ? index - 2 : index + 2;
    ***REMOVED***

  ***REMOVED***
        selectNextFunc(nextIndex);
***REMOVED*** else if (selectOtherItemCond) ***REMOVED***
        selectOtherFunc(0);
***REMOVED*** else ***REMOVED***
        const toAdd = isRelation ? this.getDropDownFieldItems()[0] : this.getDropDownRelationsItems()[0];

        if (isRelation) ***REMOVED***
          this.props.onClickAddAttrField(toAdd, `$***REMOVED***this.getPath()***REMOVED***.editDisplay.fields`);
          this.setState(prevState => (***REMOVED*** shouldSelectField: !prevState.shouldSelectField ***REMOVED***));
  ***REMOVED*** else ***REMOVED***
          this.props.onClickAddAttr(toAdd, `$***REMOVED***this.getPath()***REMOVED***.editDisplay.relations`);
          this.setState(prevState => (***REMOVED*** shouldSelectRelation: !prevState.shouldSelectRelation ***REMOVED***));
  ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

  handleReset = (e) => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED*** showWarningCancel: true ***REMOVED***);
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED*** showWarning: true ***REMOVED***);
***REMOVED***

  findIndexFieldToEdit = () => ***REMOVED***
    const ***REMOVED*** settingPage: ***REMOVED*** fieldToEdit ***REMOVED*** ***REMOVED*** = this.props;

    if (isEmpty(fieldToEdit)) ***REMOVED***
      return -1;
***REMOVED***

    const index = this.getEditPageDisplayedFields().indexOf(fieldToEdit.name);

    return index;
***REMOVED***

  findIndexListItemToEdit = () => ***REMOVED***
    const index = findIndex(this.getListDisplay(), ['name', get(this.props.settingPage, ['listItemToEdit', 'name'])]);

    return index === -1 ? 0 : index;
***REMOVED***

  findIndexRelationItemToEdit = () => ***REMOVED***
    const ***REMOVED*** settingPage: ***REMOVED*** relationToEdit ***REMOVED*** ***REMOVED*** = this.props;

    if (isEmpty(relationToEdit)) ***REMOVED***
      return -1;
***REMOVED***

    const index = this.getEditPageDisplayedRelations().indexOf(relationToEdit.alias);

    return index;
***REMOVED***

  hasRelations = () => ***REMOVED***
    return this.getRelations().length > 0;
***REMOVED***

  shouldDisplayCursorNotAllowed = (dropdownType) => ***REMOVED***
    switch (dropdownType) ***REMOVED***
      case 'list':
        return this.getDropDownItems().length === 0;
      case 'relations':
        return this.getDropDownRelationsItems().length === 0;
      case 'fields':
        return this.getDropDownFieldItems().length === 0;
      default:
        return false;
***REMOVED***
***REMOVED***

  toggle = () => this.setState(prevState => (***REMOVED*** showWarning: !prevState.showWarning ***REMOVED***));

  toggleWarningCancel = () => this.setState(prevState => (***REMOVED*** showWarningCancel: !prevState.showWarningCancel ***REMOVED***));
  
  toggleDropdown = () => ***REMOVED***
    if (this.getDropDownItems().length > 0) ***REMOVED***
      this.setState(prevState => (***REMOVED*** isOpen: !prevState.isOpen ***REMOVED***));
***REMOVED***
***REMOVED***

  toggleDropDownFields = () => ***REMOVED***
    if (this.getDropDownFieldItems().length > 0) ***REMOVED***
      this.setState(prevState => (***REMOVED*** isOpenField: !prevState.isOpenField ***REMOVED***));
***REMOVED***
***REMOVED***

  toggleDropdownRelations = () => ***REMOVED***
    if (this.getDropDownRelationsItems().length > 0) ***REMOVED***
      this.setState(prevState => (***REMOVED*** isOpenRelation: !prevState.isOpenRelation ***REMOVED***));
***REMOVED***
***REMOVED***

  // We need to remove the Over state on the DraggableAttr component
  updateSiblingHoverState = () => ***REMOVED***
    this.setState(prevState => (***REMOVED*** isDraggingSibling: !prevState.isDraggingSibling ***REMOVED***));
***REMOVED***;

  renderDraggableAttrEditSettingsField = (attr, index) => ***REMOVED***
    return (
      <VariableDraggableAttr
        beginMove=***REMOVED***this.props.beginMove***REMOVED***
        data=***REMOVED***this.getAttrData(attr)***REMOVED***
        draggedItemName=***REMOVED***this.props.draggedItemName***REMOVED***
        endMove=***REMOVED***this.props.endMove***REMOVED***
        grid=***REMOVED***this.props.grid***REMOVED***
        hoverIndex=***REMOVED***this.props.hoverIndex***REMOVED***
        id=***REMOVED***attr***REMOVED***
        index=***REMOVED***index***REMOVED***
        initDragLine=***REMOVED***this.props.initDragLine***REMOVED***
        isEditing=***REMOVED***index === this.findIndexFieldToEdit()***REMOVED***
        key=***REMOVED***attr***REMOVED***
        keys=***REMOVED***`$***REMOVED***this.getPath()***REMOVED***.editDisplay`***REMOVED***
        layout=***REMOVED***this.getLayout()***REMOVED***
        name=***REMOVED***attr***REMOVED***
        moveAttr=***REMOVED***this.props.moveVariableAttrEditView***REMOVED***
        onRemove=***REMOVED***this.handleRemoveField***REMOVED***
        onClickEdit=***REMOVED***this.handleClickEditField***REMOVED***
      />
    );
***REMOVED***

  renderDraggableAttrEditSettingsRelation = (attr, index) => ***REMOVED***
    return (
      <DraggableAttr
        index=***REMOVED***index***REMOVED***
        isDraggingSibling=***REMOVED***false***REMOVED***
        isEditing=***REMOVED***index === this.findIndexRelationItemToEdit()***REMOVED***
        key=***REMOVED***attr***REMOVED***
        keys=***REMOVED***`$***REMOVED***this.getPath()***REMOVED***.editDisplay.relations`***REMOVED***
        name=***REMOVED***attr***REMOVED***
        label=***REMOVED***this.getRelationLabel(attr)***REMOVED***
        moveAttr=***REMOVED***this.props.moveAttrEditView***REMOVED***
        onClickEdit=***REMOVED***this.handleClickEditRelation***REMOVED***
        onRemove=***REMOVED***this.handleRemoveRelation***REMOVED***
        updateSiblingHoverState=***REMOVED***() => ***REMOVED******REMOVED******REMOVED***
      />
    );
***REMOVED***

  renderDraggableAttrListSettings = (attr, index) => ***REMOVED***
    return (
      <div key=***REMOVED***attr.name***REMOVED*** className=***REMOVED***styles.draggedWrapper***REMOVED***>
        <div>***REMOVED***index + 1***REMOVED***.</div>
        <DraggableAttr
          index=***REMOVED***index***REMOVED***
          isDraggingSibling=***REMOVED***this.state.isDraggingSibling***REMOVED***
          isEditing=***REMOVED***index === this.findIndexListItemToEdit()***REMOVED***
          key=***REMOVED***attr.name***REMOVED***
          keys=***REMOVED***this.getPath()***REMOVED***
          label=***REMOVED***attr.label***REMOVED***
          name=***REMOVED***attr.name***REMOVED***
          moveAttr=***REMOVED***this.props.moveAttr***REMOVED***
          onClickEdit=***REMOVED***this.handleClickEditAttr***REMOVED***
          onRemove=***REMOVED***this.handleRemove***REMOVED***
          updateSiblingHoverState=***REMOVED***this.updateSiblingHoverState***REMOVED***
        />
      </div>
    );
***REMOVED***

  renderDropDownItemSettingField = item => ***REMOVED***
    return (
      <DropdownItem
        key=***REMOVED***item***REMOVED***
        onClick=***REMOVED***() => this.props.onClickAddAttrField(item, `$***REMOVED***this.getPath()***REMOVED***.editDisplay.fields`)***REMOVED***
      >
        ***REMOVED***item***REMOVED***
      </DropdownItem>
    );
***REMOVED***

  renderDropDownItemEditSettingsRelation = item => ***REMOVED***
    return (
      <DropdownItem
        key=***REMOVED***item***REMOVED***
        onClick=***REMOVED***() => this.props.onClickAddAttr(item, `$***REMOVED***this.getPath()***REMOVED***.editDisplay.relations`)***REMOVED***
      >
        ***REMOVED***item***REMOVED***
      </DropdownItem>
    );
***REMOVED***

  renderDropDownItemListSettings = item => ***REMOVED***
    return (
      <DropdownItem
        key=***REMOVED***item.name***REMOVED***
        onClick=***REMOVED***() => ***REMOVED***
          this.props.onClickAddAttr(item, `$***REMOVED***this.getPath()***REMOVED***.listDisplay`);
  ***REMOVED******REMOVED***
      >
        ***REMOVED***item.label***REMOVED***
      </DropdownItem>
    );
***REMOVED***

  renderDropDownP = msg => <p>***REMOVED***msg***REMOVED***</p>;

  renderForm = () => ***REMOVED***
    const ***REMOVED*** settingPage: ***REMOVED*** fieldToEdit, relationToEdit ***REMOVED*** ***REMOVED*** = this.props;
    
    if (isEmpty(fieldToEdit)) ***REMOVED***
      return forms.editView.relationForm.map(this.renderFormEditSettingsRelation);
***REMOVED***
    
    if (isEmpty(relationToEdit)) ***REMOVED***
      return forms.editView.fieldForm.map(this.renderFormEditSettingsField);
***REMOVED***

    return null;
***REMOVED***

  renderFormEditSettingsField = (input, i) => ***REMOVED***
    const ***REMOVED*** onChangeSettings, schema, settingPage: ***REMOVED*** fieldToEdit: ***REMOVED*** name ***REMOVED*** ***REMOVED*** ***REMOVED*** = this.props;
    const path = [...this.getPath().split('.'), 'editDisplay', 'availableFields', name, input.name];
    const value = get(schema, ['models', ...path], '');  

    return (
      <Input
        key=***REMOVED***i***REMOVED***
        onChange=***REMOVED***onChangeSettings***REMOVED***
        value=***REMOVED***value***REMOVED***
        ***REMOVED***...input***REMOVED***
        name=***REMOVED***path.join('.')***REMOVED***
      />
    );
***REMOVED***

  renderFormEditSettingsRelation = (input, i) => ***REMOVED***
    const ***REMOVED*** onChangeSettings, schema, settingPage: ***REMOVED*** relationToEdit: ***REMOVED*** alias ***REMOVED*** ***REMOVED*** ***REMOVED*** = this.props;
    const path = [...this.getPath().split('.'), 'relations', alias, input.name];
    const value = get(schema, ['models', ...path], '');

    return  (
      <Input
        key=***REMOVED***i***REMOVED***
        onChange=***REMOVED***onChangeSettings***REMOVED***
        value=***REMOVED***value***REMOVED***
        ***REMOVED***...input***REMOVED***
        name=***REMOVED***path.join('.')***REMOVED***
      />
    );
***REMOVED***

  renderFormListAttrSettings = (input, i) => ***REMOVED***
    const indexListItemToEdit = this.findIndexListItemToEdit();
    const inputName = `$***REMOVED***this.getPath()***REMOVED***.listDisplay.$***REMOVED***indexListItemToEdit***REMOVED***.$***REMOVED***input.name***REMOVED***`;
    const inputType = this.getListDisplay()[indexListItemToEdit].type;

    if (indexListItemToEdit === -1) ***REMOVED***
      return <div key=***REMOVED***i***REMOVED*** />;
***REMOVED***

    if ((inputType === 'json' || inputType === 'array') && (input.name === 'sortable' || input.name === 'searchable')) ***REMOVED***
      return null;
***REMOVED***

    return (
      <Input
        key=***REMOVED***input.name***REMOVED***
        onChange=***REMOVED***this.handleChange***REMOVED***
        value=***REMOVED***this.getValue(inputName, input.type)***REMOVED***
        ***REMOVED***...input***REMOVED***
        name=***REMOVED***inputName***REMOVED***
      />
    );
***REMOVED***

  renderInputMainSettings = (input, i) => ***REMOVED***
    const inputName = `$***REMOVED***this.getPath()***REMOVED***.$***REMOVED***input.name***REMOVED***`;
    const content = (
      <Input
        ***REMOVED***...input***REMOVED***
        key=***REMOVED***input.name***REMOVED***
        name=***REMOVED***inputName***REMOVED***
        onChange=***REMOVED***this.props.onChangeSettings***REMOVED***
        selectOptions=***REMOVED***this.getSelectOptions(input)***REMOVED***
        value=***REMOVED***this.getValue(inputName, input.type)***REMOVED***
      />
    );

    if (i === 3) ***REMOVED***

      return (
        <React.Fragment key=***REMOVED***input.name***REMOVED***>
          <div className="col-md-12">
            <div className=***REMOVED***styles.separator***REMOVED*** />
          </div>
          ***REMOVED***content***REMOVED***
        </React.Fragment>
      );
***REMOVED*** 
                    
    return content;
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED***
      isOpen,
      isOpenField,
      isOpenRelation,
      showWarning,
      showWarningCancel,
***REMOVED*** = this.state;
    const ***REMOVED***
      onSubmit,
***REMOVED*** = this.props;

    return (
      <form onSubmit=***REMOVED***this.handleSubmit***REMOVED***>
        <BackHeader onClick=***REMOVED***this.handleGoBack***REMOVED*** />
        <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
          <PluginHeader
            actions=***REMOVED***this.getPluginHeaderActions()***REMOVED***
            title=***REMOVED***`Content Manager - $***REMOVED***upperFirst(this.getModelName())***REMOVED***`***REMOVED***
            description=***REMOVED******REMOVED*** id: 'content-manager.containers.SettingPage.pluginHeaderDescription' ***REMOVED******REMOVED***
          />
          <PopUpWarning
            isOpen=***REMOVED***showWarning***REMOVED***
            toggleModal=***REMOVED***this.toggle***REMOVED***
            content=***REMOVED******REMOVED***
              title: 'content-manager.popUpWarning.title',
              message: 'content-manager.popUpWarning.warning.updateAllSettings',
              cancel: 'content-manager.popUpWarning.button.cancel',
              confirm: 'content-manager.popUpWarning.button.confirm',
      ***REMOVED******REMOVED***
            popUpWarningType="danger"
            onConfirm=***REMOVED***onSubmit***REMOVED***
          />
          <PopUpWarning
            isOpen=***REMOVED***showWarningCancel***REMOVED***
            toggleModal=***REMOVED***this.toggleWarningCancel***REMOVED***
            content=***REMOVED******REMOVED***
              title: 'content-manager.popUpWarning.title',
              message: 'content-manager.popUpWarning.warning.cancelAllSettings',
              cancel: 'content-manager.popUpWarning.button.cancel',
              confirm: 'content-manager.popUpWarning.button.confirm',
      ***REMOVED******REMOVED***
            popUpWarningType="danger"
            onConfirm=***REMOVED***this.handleConfirmReset***REMOVED***
          />

          <div className=***REMOVED***cn('row', styles.container)***REMOVED***>
            <Block
              description="content-manager.containers.SettingPage.listSettings.description"
              title="content-manager.containers.SettingPage.listSettings.title"
              style=***REMOVED******REMOVED*** marginBottom: '13px', paddingBottom: '30px' ***REMOVED******REMOVED***
            >
              <div className=***REMOVED***styles.ctmForm***REMOVED***>
                <div className="row">
                  ***REMOVED***/* GENERAL LIST SETTINGS FORM */***REMOVED***
                  <div className="col-md-12">
                    <div className="row">
                      ***REMOVED***forms.inputs.map(this.renderInputMainSettings)***REMOVED***
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className=***REMOVED***styles.separatorHigher***REMOVED*** />
                  </div>
                </div>

                <div className=***REMOVED***styles.listDisplayWrapper***REMOVED***>
                  <div className="row">

                    <div className=***REMOVED***cn('col-md-12', styles.draggedDescription)***REMOVED***>
                      <FormattedMessage id="content-manager.containers.SettingPage.attributes" />
                      <p>
                        <FormattedMessage id="content-manager.containers.SettingPage.attributes.description" />
                      </p>
                    </div>

                    <div className="col-md-5">
                      ***REMOVED***this.getListDisplay().map(this.renderDraggableAttrListSettings)***REMOVED***
                      <div
                        className=***REMOVED***
                          cn(
                            styles.dropdownWrapper,
                            isOpen && styles.dropdownWrapperOpen,
                            this.shouldDisplayCursorNotAllowed('list') && styles.dropDownNotAllowed,
                          )
                  ***REMOVED***
                      >
                        <ButtonDropdown isOpen=***REMOVED***isOpen***REMOVED*** toggle=***REMOVED***this.toggleDropdown***REMOVED***>
                          <DropdownToggle>
                            <FormattedMessage id="content-manager.containers.SettingPage.addField">
                              ***REMOVED***this.renderDropDownP***REMOVED***
                            </FormattedMessage>
                          </DropdownToggle>
                          <DropdownMenu>
                            ***REMOVED***this.getDropDownItems().map(this.renderDropDownItemListSettings)***REMOVED***
                          </DropdownMenu>
                        </ButtonDropdown>
                      </div>
                    </div>

                    ***REMOVED***/* LIST ATTR FORM */***REMOVED***
                    <div className="col-md-7">
                      <div className=***REMOVED***styles.editWrapper***REMOVED***>
                        <div className="row">
                          ***REMOVED***forms.editList.map(this.renderFormListAttrSettings)***REMOVED***
                        </div>
                      </div>
                    </div>
                    ***REMOVED***/* LIST ATTR FORM */***REMOVED***
                  </div>
                </div>
              </div>
            </Block>

            <Block
              description="content-manager.containers.SettingPage.editSettings.description"
              title="content-manager.containers.SettingPage.editSettings.title"
              style=***REMOVED******REMOVED*** paddingBottom: '30px' ***REMOVED******REMOVED***
            >
              <div className="row">
                <div className=***REMOVED***cn('col-md-8', styles.draggedDescription, styles.edit_settings)***REMOVED***>
                  <FormattedMessage id="content-manager.containers.SettingPage.attributes" />
                  <div className=***REMOVED***cn(styles.sort_wrapper, 'col-md-12', styles.padded)***REMOVED***>
                    <CustomDragLayer />
                    <div className=***REMOVED***cn('row', styles.noPadding)***REMOVED***>
                      ***REMOVED***this.getEditPageDisplayedFields().map(this.renderDraggableAttrEditSettingsField)***REMOVED***
                      <div className=***REMOVED***cn('col-md-6')***REMOVED***>
                        <div
                          className=***REMOVED***
                            cn(
                              styles.dropdownRelations,
                              styles.dropdownWrapper,
                              isOpenField && styles.dropdownWrapperOpen,
                              this.shouldDisplayCursorNotAllowed('fields') && styles.dropDownNotAllowed,
                            )
                    ***REMOVED***
                        >
                          <ButtonDropdown isOpen=***REMOVED***isOpenField***REMOVED*** toggle=***REMOVED***this.toggleDropDownFields***REMOVED***>
                            <DropdownToggle>
                              <FormattedMessage id="content-manager.containers.SettingPage.addField">
                                ***REMOVED***this.renderDropDownP***REMOVED***
                              </FormattedMessage>
                            </DropdownToggle>
                            <DropdownMenu>
                              ***REMOVED***this.getDropDownFieldItems().map(this.renderDropDownItemSettingField)***REMOVED***
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                ***REMOVED***/* RELATIONS SORT */***REMOVED***
                ***REMOVED***this.hasRelations() && (
                  <div className=***REMOVED***cn('col-md-4', styles.draggedDescription, styles.edit_settings)***REMOVED***>
                    <FormattedMessage id="content-manager.containers.SettingPage.relations" />
                    <div className=***REMOVED***cn(styles.sort_wrapper, 'col-md-12')***REMOVED***>
                      <div className="row">
                        ***REMOVED***/* DRAGGABLE BLOCK */***REMOVED***
                        ***REMOVED***this.getEditPageDisplayedRelations().map(this.renderDraggableAttrEditSettingsRelation)***REMOVED***
                        ***REMOVED***/* DRAGGABLE BLOCK */***REMOVED***
                        <div
                          className=***REMOVED***
                            cn(
                              styles.dropdownRelations,
                              styles.dropdownWrapper,
                              isOpenRelation && styles.dropdownWrapperOpen,
                              this.shouldDisplayCursorNotAllowed('relations') && styles.dropDownNotAllowed
                            )
                    ***REMOVED***
                        >
                          <ButtonDropdown isOpen=***REMOVED***isOpenRelation***REMOVED*** toggle=***REMOVED***this.toggleDropdownRelations***REMOVED***>
                            <DropdownToggle>
                              <FormattedMessage id="content-manager.containers.SettingPage.addRelationalField">
                                ***REMOVED***this.renderDropDownP***REMOVED***
                              </FormattedMessage>
                            </DropdownToggle>
                            <DropdownMenu>
                              ***REMOVED***this.getDropDownRelationsItems().map(this.renderDropDownItemEditSettingsRelation)***REMOVED***
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )***REMOVED***
                ***REMOVED***/* RELATIONS SORT */***REMOVED***
              </div>

              ***REMOVED***/* EDIT MAIN ATTR FORM */***REMOVED***
              <div className="row">
                <div className="col-md-8">
                  <div className=***REMOVED***styles.editWrapper***REMOVED***>

                    <div className="row">
                      ***REMOVED***this.renderForm()***REMOVED***
                    </div>

                  </div>
                </div>
              </div>
              ***REMOVED***/* EDIT MAIN ATTR FORM */***REMOVED***
            </Block>
          </div>
        </div>
      </form>
    );
***REMOVED***
***REMOVED***

SettingPage.defaultProps = ***REMOVED***
  draggedItemName: null,
  grid: [],
***REMOVED***;

SettingPage.propTypes = ***REMOVED***
  addedField: PropTypes.bool.isRequired,
  beginMove: PropTypes.func.isRequired,
  draggedItemName: PropTypes.string,
  endMove: PropTypes.func.isRequired,
  grid: PropTypes.array,
  history: PropTypes.object.isRequired,
  hoverIndex: PropTypes.number.isRequired,
  initDragLine: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  moveAttr: PropTypes.func.isRequired,
  moveAttrEditView: PropTypes.func.isRequired,
  moveVariableAttrEditView: PropTypes.func.isRequired,
  onChangeSettings: PropTypes.func.isRequired,
  onClickAddAttr: PropTypes.func.isRequired,
  onClickAddAttrField: PropTypes.func.isRequired,
  onClickEditField: PropTypes.func.isRequired,
  onClickEditListItem: PropTypes.func.isRequired,
  onClickEditRelation: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRemoveEditViewFieldAttr: PropTypes.func.isRequired,
  onRemoveEditViewRelationAttr: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  setLayout: PropTypes.func.isRequired,
  settingPage: PropTypes.object.isRequired,
  shouldResetGrid: PropTypes.bool.isRequired,
  submitSuccess: PropTypes.bool.isRequired,
***REMOVED***;

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(
    ***REMOVED***
      beginMove,
      endMove,
      moveAttr,
      moveAttrEditView,
      moveVariableAttrEditView,
      onChangeSettings,
      onClickAddAttr,
      onClickAddAttrField,
      onClickEditField,
      onClickEditListItem,
      onClickEditRelation,
      onRemove,
      onRemoveEditViewFieldAttr,
      onRemoveEditViewRelationAttr,
      onReset,
      onSubmit,
      setLayout,
***REMOVED***,
    dispatch,
  )
);
const mapStateToProps = createStructuredSelector(***REMOVED***
  addedField: makeSelectAddedField(),
  draggedItemName: makeSelectDraggedItemName(),
  grid: makeSelectGrid(),
  hoverIndex: makeSelectHoverIndex(),
  initDragLine: makeSelectInitDragLine(),
  schema: makeSelectModifiedSchema(),
  settingPage: makeSelectSettingPage(),
  shouldResetGrid: makeSelectShouldResetGrid(),
  submitSuccess: makeSelectSubmitSuccess(),
***REMOVED***);
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer(***REMOVED*** key: 'settingPage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'settingPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DragDropContext(HTML5Backend)(SettingPage));
