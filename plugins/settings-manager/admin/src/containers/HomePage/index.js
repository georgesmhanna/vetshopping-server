/*
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';

import ***REMOVED***
  endsWith,
  find,
  findIndex,
  findKey,
  forEach,
  get,
  isEmpty,
  includes,
  join,
  map,
  replace,
  size,
  toNumber,
***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import Helmet from 'react-helmet';
import Select from 'react-select';
import ***REMOVED*** router ***REMOVED*** from 'app';

// design
import ContentHeader from 'components/ContentHeader';
import EditForm from 'components/EditForm';
import HeaderNav from 'components/HeaderNav';
import List from 'components/List';
import RowDatabase from 'components/RowDatabase';
import SelectOptionLanguage from 'components/SelectOptionLanguage';
import RowLanguage from 'components/RowLanguage';
import PluginLeftMenu from 'components/PluginLeftMenu';

// App selectors
import ***REMOVED*** makeSelectSections, makeSelectEnvironments ***REMOVED*** from 'containers/App/selectors';

// utils
import unknowFlag from 'assets/images/unknow_flag.png';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import supportedFlags from 'utils/supportedFlags.json';
import ***REMOVED*** checkFormValidity, getRequiredInputsDb ***REMOVED*** from '../../utils/inputValidations';
import getFlag, ***REMOVED*** formatLanguageLocale ***REMOVED*** from '../../utils/getFlag';
import sendUpdatedParams from '../../utils/sendUpdatedParams';
import selectHomePage from './selectors';
import ***REMOVED***
  cancelChanges,
  changeDefaultLanguage,
  changeInput,
  closeModal,
  configFetch,
  databaseEdit,
  databasesFetch,
  databaseDelete,
  editSettings,
  emptyDbModifiedData,
  languageDelete,
  languagesFetch,
  newLanguagePost,
  newDatabasePost,
  setErrors,
  specificDatabaseFetch,
***REMOVED*** from './actions';
import reducer from './reducer';
import saga from './sagas';

import styles from './styles.scss';
import config from './config.json';

/* eslint-disable react/require-default-props  */
export class HomePage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.customComponents = config.customComponents;
    this.components = ***REMOVED***
      // editForm: EditForm,
      defaultComponent: EditForm,
      list: List,
      defaultComponentWithEnvironments: HeaderNav,
***REMOVED***;

    // allowing state only for database modal purpose
    this.state = ***REMOVED***
      modal: false,
      toggleDefaultConnection: false,
***REMOVED***;

    this.sendUpdatedParams = sendUpdatedParams.bind(this);
***REMOVED***

  componentDidMount() ***REMOVED***
    if (this.props.match.params.slug) ***REMOVED***
      this.handleFetch(this.props);
***REMOVED*** else ***REMOVED***
      router.push(`/plugins/settings-manager/$***REMOVED***get(this.props.menuSections, ['0', 'items', '0', 'slug']) || 'application'***REMOVED***`);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    // check if params slug updated
    if (this.props.match.params.slug !== nextProps.match.params.slug && nextProps.match.params.slug) ***REMOVED***
      if (nextProps.match.params.slug) ***REMOVED***
        // get data from api if params slug updated
        this.handleFetch(nextProps);
***REMOVED*** else ***REMOVED***
        // redirect user if no params slug provided
        router.push(`/plugins/settings-manager/$***REMOVED***get(this.props.menuSections, ['0', 'items', '0', 'slug'])***REMOVED***`);
***REMOVED***
***REMOVED*** else if (this.props.match.params.env !== nextProps.match.params.env && nextProps.match.params.env && this.props.match.params.env) ***REMOVED***
      // get data if params env updated
      this.handleFetch(nextProps);
***REMOVED***
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.home.didCreatedNewLanguage !== this.props.home.didCreatedNewLanguage) ***REMOVED***
      this.handleFetch(this.props);
***REMOVED***

    if (prevProps.home.didCreatedNewDb !== this.props.home.didCreatedNewDb) ***REMOVED***
      this.handleFetch(this.props);
***REMOVED***
***REMOVED***

  /* eslint-disable react/sort-comp */
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  addConnection = (e) => ***REMOVED***
    e.preventDefault();
    const newData = ***REMOVED******REMOVED***;
    /* eslint-disable no-template-curly-in-string */
    const dbName = get(this.props.home.modifiedData, 'database.connections.$***REMOVED***name***REMOVED***.name');
    map(this.props.home.modifiedData, (data, key) => ***REMOVED***
      const k = replace(key, '$***REMOVED***name***REMOVED***', dbName);

      if (key !== 'database.connections.$***REMOVED***name***REMOVED***.name') ***REMOVED***
        newData[k] = data;
***REMOVED***
***REMOVED***);

    const formErrors = getRequiredInputsDb(this.props.home.modifiedData, this.props.home.formErrors);

    if (isEmpty(formErrors)) ***REMOVED***
      // this.props.setErrors([]);
      this.props.newDatabasePost(this.props.match.params.env, newData);
***REMOVED*** else ***REMOVED***
      this.props.setErrors(formErrors);
***REMOVED***
***REMOVED***

  emptyDbModifiedData = () => ***REMOVED***
    this.setState(***REMOVED*** toggleDefaultConnection: false ***REMOVED***);
    this.props.emptyDbModifiedData();
***REMOVED***

  getDatabase = (databaseName) => ***REMOVED***
    // allow state here just for modal purpose
    this.props.specificDatabaseFetch(databaseName, this.props.match.params.env);
    // this.setState(***REMOVED*** modal: !this.state.modal ***REMOVED***);
***REMOVED***

  handleDefaultLanguageChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    // create new object configsDisplay based on store property configsDisplay
    const configsDisplay = ***REMOVED***
      name: this.props.home.configsDisplay.name,
      description: this.props.home.configsDisplay.description,
      sections: [],
***REMOVED***;

    // Find the index of the new setted language
    const activeLanguageIndex = findIndex(this.props.home.configsDisplay.sections, ['name', target.id]);

    forEach(this.props.home.configsDisplay.sections, (section, key) => ***REMOVED***
      // set all Language active state to false
      if (key !== activeLanguageIndex) ***REMOVED***
        configsDisplay.sections.push(***REMOVED*** name: section.name, active: false ***REMOVED***);
***REMOVED*** else ***REMOVED***
        // set the new language active state to true
        configsDisplay.sections.push(***REMOVED*** name: section.name, active: true ***REMOVED***);
***REMOVED***
***REMOVED***);

    // reset all the configs to ensure component is updated
    this.props.changeDefaultLanguage(configsDisplay, target.id);

    // format the default locale
    const defaultLanguageArray = formatLanguageLocale(target.id);

    // Edit the new config
    this.props.editSettings(***REMOVED*** 'language.defaultLocale': join(defaultLanguageArray, '_') ***REMOVED***, 'i18n');
***REMOVED***

  handleFetch(props) ***REMOVED***
    const apiUrl = props.match.params.env ? `$***REMOVED***props.match.params.slug***REMOVED***/$***REMOVED***props.match.params.env***REMOVED***` : props.match.params.slug;

    switch(props.match.params.slug) ***REMOVED***
      case 'languages':
        return this.props.languagesFetch();
      case 'databases':
        return this.props.databasesFetch(props.match.params.env);
      default:
        return this.props.configFetch(apiUrl);
***REMOVED***
***REMOVED***

  handleChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    let value = target.type === 'number' && target.value !== '' ? toNumber(target.value) : target.value;
    let name = target.name;

    if (this.props.match.params.slug === 'security') ***REMOVED***
      // the only case where the input doesn't have a name
      if (target.name === '') ***REMOVED***
        name = 'security.xframe.value.nested';
        value = target.value;
***REMOVED***
***REMOVED***

    if (this.props.match.params.slug === 'databases') ***REMOVED***
      if (name === this.props.home.dbNameTarget) ***REMOVED***
        const formErrors = value === this.props.home.addDatabaseSection.sections[1].items[0].value ?
          [***REMOVED*** target: name, errors: [***REMOVED*** id: 'settings-manager.request.error.database.exist' ***REMOVED***] ***REMOVED***] : [];
        this.props.setErrors(formErrors);
***REMOVED*** else if (endsWith(name, '.settings.client')) ***REMOVED***
        const item = find(this.props.home.addDatabaseSection.sections[0].items[1].items, ***REMOVED*** value ***REMOVED***);
        this.props.changeInput('database.connections.$***REMOVED***name***REMOVED***.settings.port', item.port);
        this.props.changeInput(`database.connections.$***REMOVED***this.props.home.addDatabaseSection.sections[1].items[0].value***REMOVED***.settings.port`, item.port);
***REMOVED*** else ***REMOVED***
        this.props.setErrors([]);
***REMOVED***
***REMOVED***
    this.props.changeInput(name, value);
***REMOVED***

  handleChangeLanguage = (value) => this.props.changeInput('language.defaultLocale', value.value);

  handleCancel = () => this.props.cancelChanges();

  handleSetDefaultConnectionDb = () => ***REMOVED***
    const value = this.state.toggleDefaultConnection
      ? this.props.home.addDatabaseSection.sections[1].items[0].value
      : this.props.home.modifiedData[this.props.home.dbNameTarget];
    const target = ***REMOVED*** name: 'database.defaultConnection', value ***REMOVED***;
    this.handleChange(***REMOVED***target***REMOVED***);
    this.setState(***REMOVED*** toggleDefaultConnection: !this.state.toggleDefaultConnection ***REMOVED***);
***REMOVED***

  handleSubmit = (e) => ***REMOVED*** // eslint-disable-line consistent-return
    e.preventDefault();
    const apiUrl = this.props.match.params.env ? `$***REMOVED***this.props.match.params.slug***REMOVED***/$***REMOVED***this.props.match.params.env***REMOVED***` : this.props.match.params.slug;

    const isCreatingNewFields = this.props.match.params.slug === 'security';
    // send only updated settings
    const body = this.sendUpdatedParams(isCreatingNewFields);
    const formErrors = checkFormValidity(body, this.props.home.formValidations);

    if (isEmpty(body)) return strapi.notification.info('settings-manager.strapi.notification.info.settingsEqual');
    if (isEmpty(formErrors)) ***REMOVED***
      this.props.editSettings(body, apiUrl);
***REMOVED*** else ***REMOVED***
      this.props.setErrors(formErrors);
***REMOVED***
***REMOVED***

  handleSubmitEditDatabase = (databaseName) => ***REMOVED*** // eslint-disable-line consistent-return
    const body = this.sendUpdatedParams();
    const apiUrl = `$***REMOVED***databaseName***REMOVED***/$***REMOVED***this.props.match.params.env***REMOVED***`;
    const formErrors = checkFormValidity(body, this.props.home.formValidations, this.props.home.formErrors);

    if (isEmpty(body)) ***REMOVED***
      this.props.closeModal();
      return strapi.notification.info('settings-manager.strapi.notification.info.settingsEqual');
***REMOVED***


    if (isEmpty(formErrors)) ***REMOVED***
      this.props.databaseEdit(body, apiUrl);
***REMOVED*** else ***REMOVED***
      this.props.setErrors(formErrors);
***REMOVED***
***REMOVED***

  // retrieve the language to delete using the target id
  handleLanguageDelete = (languaToDelete) => this.props.languageDelete(languaToDelete);

  handleDatabaseDelete = (dbName) => ***REMOVED***
    this.context.enableGlobalOverlayBlocker();
    strapi.notification.success('settings-manager.strapi.notification.success.databaseDelete');
    this.props.databaseDelete(dbName, this.props.match.params.env, this.context);
***REMOVED***

  // function used for react-select option
  optionComponent = (props) => <SelectOptionLanguage ***REMOVED***...props***REMOVED*** />;

  // custom Row rendering for the component List with params slug === languages
  renderRowLanguage = (props, key, liStyles) => (
    <RowLanguage
      key=***REMOVED***key***REMOVED***
      ***REMOVED***...props***REMOVED***
      liStyles=***REMOVED***liStyles***REMOVED***
      onDeleteLanguage=***REMOVED***this.handleLanguageDelete***REMOVED***
      listLanguages=***REMOVED***this.props.home.listLanguages***REMOVED***
      onDefaultLanguageChange=***REMOVED***this.handleDefaultLanguageChange***REMOVED***
    />
  )

  renderListTitle = () => ***REMOVED***
    const availableContentNumber = size(this.props.home.configsDisplay.sections);
    const title = availableContentNumber > 1 ? `list.$***REMOVED***this.props.match.params.slug***REMOVED***.title.plural` : `list.$***REMOVED***this.props.match.params.slug***REMOVED***.title.singular`;
    const titleDisplay = title ? <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***title***REMOVED***`***REMOVED*** /> : '';

    return <span>***REMOVED***availableContentNumber***REMOVED***&nbsp;***REMOVED***titleDisplay***REMOVED***</span>;
***REMOVED***

  renderListButtonLabel = () => `list.$***REMOVED***this.props.match.params.slug***REMOVED***.button.label`;

  renderPopUpFormDatabase = (section, props, popUpStyles) => (
    map(section.items, (item, key) => ***REMOVED***
      const isActive = props.values[this.props.home.dbNameTarget] === this.props.home.modifiedData['database.defaultConnection'] ?
        <div className=***REMOVED***popUpStyles.rounded***REMOVED***><i className="fa fa-check" /></div> : '';

      if (item.name === 'form.database.item.default') ***REMOVED***
        return (
          <div
            key=***REMOVED***key***REMOVED***
            className=***REMOVED***popUpStyles.defaultConnection***REMOVED***
            id=***REMOVED***item.target***REMOVED***
            onClick=***REMOVED***this.handleSetDefaultConnectionDb***REMOVED***
          >
            <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***item.name***REMOVED***`***REMOVED*** />***REMOVED***isActive***REMOVED***
          </div>
        );
***REMOVED***
      return (
        props.renderInput(item, key)
      );
***REMOVED***)
  )

  renderPopUpFormLanguage = (section) => (
    map(section.items, (item) => ***REMOVED***
      const value = this.props.home.modifiedData[item.target] || this.props.home.selectOptions.options[0].value;

      return (
        <div className=***REMOVED***`col-md-6`***REMOVED*** key=***REMOVED***item.name***REMOVED***>
          <div className=***REMOVED***styles.modalLanguageLabel***REMOVED***>
            <FormattedMessage id=***REMOVED***`settings-manager.$***REMOVED***item.name***REMOVED***`***REMOVED*** />
          </div>
          <Select
            name=***REMOVED***item.target***REMOVED***
            value=***REMOVED***value***REMOVED***
            options=***REMOVED***this.props.home.selectOptions.options***REMOVED***
            onChange=***REMOVED***this.handleChangeLanguage***REMOVED***
            valueComponent=***REMOVED***this.valueComponent***REMOVED***
            optionComponent=***REMOVED***this.optionComponent***REMOVED***
            clearable=***REMOVED***false***REMOVED***
          />
          <div className=***REMOVED***styles.popUpSpacer***REMOVED*** />
        </div>
      );
***REMOVED***)
  )

  renderRowDatabase = (props, key) => (
    <RowDatabase
      key=***REMOVED***key***REMOVED***
      data=***REMOVED***props***REMOVED***
      getDatabase=***REMOVED***this.getDatabase***REMOVED***
      onDeleteDatabase=***REMOVED***this.handleDatabaseDelete***REMOVED***
      sections=***REMOVED***this.props.home.specificDatabase.sections***REMOVED***
      values=***REMOVED***this.props.home.modifiedData***REMOVED***
      onChange=***REMOVED***this.handleChange***REMOVED***
      renderPopUpForm=***REMOVED***this.renderPopUpFormDatabase***REMOVED***
      onSubmit=***REMOVED***this.handleSubmitEditDatabase***REMOVED***
      formErrors=***REMOVED***this.props.home.formErrors***REMOVED***
      error=***REMOVED***this.props.home.error***REMOVED***
      resetToggleDefaultConnection=***REMOVED***this.resetToggleDefaultConnection***REMOVED***
    />
  )

  renderComponent = () => ***REMOVED***
    // check if  settingName (params.slug) has a custom view display
    let specificComponent = findKey(this.customComponents, (value) => includes(value, this.props.match.params.slug));

    if (!specificComponent) ***REMOVED***
      // Check if params env : render HeaderNav component
      specificComponent = !this.props.match.params.env ? 'defaultComponent' : 'defaultComponentWithEnvironments';
***REMOVED***

    // if custom view display render specificComponent
    const Component = this.components[specificComponent];
    const addRequiredInputDesign = this.props.match.params.slug === 'databases';
    const listTitle = this.props.match.params.slug === 'languages' || 'databases' ? this.renderListTitle() : '';
    const listButtonLabel = this.props.match.params.slug === 'languages' || 'databases' ? this.renderListButtonLabel() : '';

    // check if HeaderNav component needs to render a form or a list
    const renderListComponent = this.props.match.params.slug === 'databases';

    let handleListPopUpSubmit;
    // sections is the props used by EditForm in case of list of table rendering we need to change its value
    let sections;
    let renderPopUpForm = false;
    let renderRow = false;
    let actionBeforeOpenPopUp;
    let addListTitleMarginTop;

    switch (this.props.match.params.slug) ***REMOVED***
      case 'languages':
        sections = this.props.home.listLanguages.sections;

        // custom rendering for PopUpForm
        renderPopUpForm = this.renderPopUpFormLanguage;
        renderRow = this.renderRowLanguage;
        handleListPopUpSubmit = this.props.newLanguagePost;
        break;
      case 'databases':
        sections = this.props.home.addDatabaseSection.sections;
        renderPopUpForm = this.renderPopUpFormDatabase;
        handleListPopUpSubmit = this.addConnection;
        renderRow = this.renderRowDatabase;
        actionBeforeOpenPopUp = this.emptyDbModifiedData;
        addListTitleMarginTop = true;
        break;
      default:
        sections = this.props.home.configsDisplay.sections;
***REMOVED***

    // Custom selectOptions for languages
    const selectOptions = this.props.match.params.slug === 'languages' ? this.props.home.listLanguages : [];
    return (
      <Component
        sections=***REMOVED***sections***REMOVED***
        listItems=***REMOVED***this.props.home.configsDisplay.sections***REMOVED***
        values=***REMOVED***this.props.home.modifiedData***REMOVED***
        onChange=***REMOVED***this.handleChange***REMOVED***
        onCancel=***REMOVED***this.handleCancel***REMOVED***
        onSubmit=***REMOVED***this.handleSubmit***REMOVED***
        links=***REMOVED***this.props.environments***REMOVED***
        path=***REMOVED***this.props.location.pathname***REMOVED***
        slug=***REMOVED***this.props.match.params.slug***REMOVED***
        renderRow=***REMOVED***renderRow***REMOVED***
        listTitle=***REMOVED***listTitle***REMOVED***
        listButtonLabel=***REMOVED***listButtonLabel***REMOVED***
        handlei18n
        handleListPopUpSubmit=***REMOVED***handleListPopUpSubmit***REMOVED***
        selectOptions=***REMOVED***selectOptions***REMOVED***
        renderPopUpForm=***REMOVED***renderPopUpForm***REMOVED***
        renderListComponent=***REMOVED***renderListComponent***REMOVED***
        cancelAction=***REMOVED***this.props.home.cancelAction***REMOVED***
        actionBeforeOpenPopUp=***REMOVED***actionBeforeOpenPopUp***REMOVED***
        addRequiredInputDesign=***REMOVED***addRequiredInputDesign***REMOVED***
        addListTitleMarginTop=***REMOVED***addListTitleMarginTop***REMOVED***
        formErrors=***REMOVED***this.props.home.formErrors***REMOVED***
        error=***REMOVED***this.props.home.error***REMOVED***
        showLoader=***REMOVED***this.props.home.showLoader***REMOVED***
      />
    );
***REMOVED***

  // Set the toggleDefaultConnection to false
  resetToggleDefaultConnection = () => this.setState(***REMOVED*** toggleDefaultConnection: false ***REMOVED***);

  // Hide database modal
  toggle = () => this.setState(***REMOVED*** modal: !this.state.modal ***REMOVED***);

  // function used for react-select
  valueComponent = (props) => ***REMOVED***
    const flagName = formatLanguageLocale(props.value.value);
    const flag = getFlag(flagName);
    const spanStyle = includes(supportedFlags.flags, flag) ? ***REMOVED******REMOVED*** : ***REMOVED*** backgroundImage: `url($***REMOVED***unknowFlag***REMOVED***)` ***REMOVED***;

    return (
      <span className=***REMOVED***`$***REMOVED***styles.flagContainer***REMOVED*** flag-icon-background flag-icon-$***REMOVED***flag***REMOVED***`***REMOVED*** style=***REMOVED***spanStyle***REMOVED***>
        <FormattedMessage id="settings-manager.selectValue" defaultMessage='***REMOVED***language***REMOVED***' values=***REMOVED******REMOVED*** language: props.value.label***REMOVED******REMOVED*** className=***REMOVED***styles.marginLeft***REMOVED*** />
      </span>
    );
***REMOVED***

  render() ***REMOVED***
    return (
      <div className="container-fluid">
        <div className="row">
          <PluginLeftMenu sections=***REMOVED***this.props.menuSections***REMOVED*** environments=***REMOVED***this.props.environments***REMOVED*** envParams=***REMOVED***this.props.match.params.env***REMOVED*** />
          <div className=***REMOVED***`$***REMOVED***styles.home***REMOVED*** col-md-9`***REMOVED***>
            <Helmet
              title="Settings Manager"
              meta=***REMOVED***[
                ***REMOVED*** name: 'Settings Manager Plugin', content: 'Modify your app settings' ***REMOVED***,
              ]***REMOVED***
            />
            <ContentHeader
              name=***REMOVED***this.props.home.configsDisplay.name***REMOVED***
              description=***REMOVED***this.props.home.configsDisplay.description***REMOVED***
            />

            ***REMOVED***this.renderComponent()***REMOVED***
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED***
  environments: makeSelectEnvironments(),
  home: selectHomePage(),
  menuSections: makeSelectSections(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      cancelChanges,
      changeDefaultLanguage,
      changeInput,
      configFetch,
      closeModal,
      databaseDelete,
      databaseEdit,
      databasesFetch,
      editSettings,
      emptyDbModifiedData,
      languageDelete,
      languagesFetch,
      newDatabasePost,
      newLanguagePost,
      setErrors,
      specificDatabaseFetch,
***REMOVED***,
    dispatch
  );
***REMOVED***

HomePage.propTypes = ***REMOVED***
  cancelChanges: PropTypes.func.isRequired,
  changeDefaultLanguage: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  configFetch: PropTypes.func.isRequired,
  databaseDelete: PropTypes.func.isRequired,
  databaseEdit: PropTypes.func.isRequired,
  databasesFetch: PropTypes.func.isRequired,
  editSettings: PropTypes.func.isRequired,
  emptyDbModifiedData: PropTypes.func.isRequired,
  environments: PropTypes.array.isRequired,
  home: PropTypes.object.isRequired,
  languageDelete: PropTypes.func.isRequired,
  languagesFetch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  menuSections: PropTypes.array.isRequired,
  newDatabasePost: PropTypes.func.isRequired,
  newLanguagePost: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  specificDatabaseFetch: PropTypes.func.isRequired,
***REMOVED***;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer(***REMOVED*** key: 'homePage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'homePage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
