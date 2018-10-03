/*
 *
 * ModelPage
 *
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** get, has, includes, isEmpty, size, replace, startCase, findIndex ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** NavLink ***REMOVED*** from 'react-router-dom';
import PropTypes from 'prop-types';
import ***REMOVED*** router ***REMOVED*** from 'app';

// Global selectors
import ***REMOVED*** makeSelectMenu ***REMOVED*** from 'containers/App/selectors';
import ***REMOVED*** makeSelectContentTypeUpdated ***REMOVED*** from 'containers/Form/selectors';

import AttributeRow from 'components/AttributeRow';
import ContentHeader from 'components/ContentHeader';
import EmptyAttributesBlock from 'components/EmptyAttributesBlock';
import Form from 'containers/Form';
import List from 'components/List';
import PluginLeftMenu from 'components/PluginLeftMenu';

import forms from 'containers/Form/forms.json';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import ***REMOVED***
  cancelChanges,
  deleteAttribute,
  modelFetch,
  modelFetchSucceeded,
  resetShowButtonsProps,
  submit,
***REMOVED*** from './actions';

import saga from './sagas';
import reducer from './reducer';
import selectModelPage from './selectors';
import styles from './styles.scss';

// Array of attributes that the ctb can handle at the moment
const availableAttributes = Object.keys(forms.attribute);
availableAttributes.push('integer', 'decimal', 'float');

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-brace-presence */

export class ModelPage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);

    this.state = ***REMOVED***
      contentTypeTemporary: false,
***REMOVED***;

    this.popUpHeaderNavLinks = [
      ***REMOVED*** name: 'baseSettings', message: 'content-type-builder.popUpForm.navContainer.base', nameToReplace: 'advancedSettings' ***REMOVED***,
      ***REMOVED*** name: 'advancedSettings', message: 'content-type-builder.popUpForm.navContainer.advanced', nameToReplace: 'baseSettings' ***REMOVED***,
    ];

    this.contentHeaderButtons = [
      ***REMOVED*** label: 'content-type-builder.form.button.cancel', handleClick: this.props.cancelChanges, kind: 'secondary', type: 'button' ***REMOVED***,
      ***REMOVED*** label: 'content-type-builder.form.button.save', handleClick: this.handleSubmit, kind: 'primary', type: 'submit' ***REMOVED***,
    ];
***REMOVED***

  componentDidMount() ***REMOVED***
    this.fetchModel(this.props);
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (this.props.updatedContentType !== nextProps.updatedContentType) ***REMOVED***
      if (this.state.contentTypeTemporary && storeData.getContentType()) ***REMOVED***
        this.props.modelFetchSucceeded(***REMOVED*** model: storeData.getContentType() ***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.match.params.modelName !== this.props.match.params.modelName) ***REMOVED***
      this.props.resetShowButtonsProps();
      this.fetchModel(this.props);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    this.props.resetShowButtonsProps();
***REMOVED***

  addCustomSection = (sectionStyles) => (
    <div className=***REMOVED***sectionStyles.pluginLeftMenuSection***REMOVED***>
      <p>
        <FormattedMessage id="content-type-builder.menu.section.documentation.name" />
      </p>
      <ul>
        <li>
          <FormattedMessage id="content-type-builder.menu.section.documentation.guide" />&nbsp;
          <FormattedMessage id="content-type-builder.menu.section.documentation.guideLink">
            ***REMOVED***(message) => (
              <a href="http://strapi.io/documentation/3.x.x/guides/models.html" target="_blank">***REMOVED***message***REMOVED***</a>
            )***REMOVED***
          </FormattedMessage>
        </li>
        ***REMOVED***/*<li>
          <FormattedMessage id="content-type-builder.menu.section.documentation.tutorial" />&nbsp;
          <FormattedMessage id="content-type-builder.menu.section.documentation.tutorialLink">
            ***REMOVED***(mess) => (
              <Link to="#" target="_blank">***REMOVED***mess***REMOVED***</Link>
            )***REMOVED***
          </FormattedMessage>
        </li>*/***REMOVED***
      </ul>
    </div>
  )

  fetchModel = (props) => ***REMOVED***
    if (storeData.getIsModelTemporary() && get(storeData.getContentType(), 'name') === props.match.params.modelName) ***REMOVED***
      this.setState(***REMOVED*** contentTypeTemporary: true ***REMOVED***);
      this.props.modelFetchSucceeded(***REMOVED*** model: storeData.getContentType() ***REMOVED***);
***REMOVED*** else ***REMOVED***
      this.setState(***REMOVED*** contentTypeTemporary: false ***REMOVED***);
      this.props.modelFetch(props.match.params.modelName);
***REMOVED***
***REMOVED***

  handleAddLinkClick = () => ***REMOVED***
    if (storeData.getIsModelTemporary()) ***REMOVED***
      strapi.notification.info('content-type-builder.notification.info.contentType.creating.notSaved');
***REMOVED*** else ***REMOVED***
      this.toggleModal();
***REMOVED***
***REMOVED***

  handleClickAddAttribute = () => ***REMOVED***
    // Open the modal
    router.push(`/plugins/content-type-builder/models/$***REMOVED***this.props.match.params.modelName***REMOVED***#choose::attributes`);
***REMOVED***

  handleDelete = (attributeName) => ***REMOVED***
    const ***REMOVED*** modelPage: ***REMOVED*** model ***REMOVED*** ***REMOVED*** = this.props;
    const index = findIndex(model.attributes, ['name', attributeName]);
    const attributeToRemove = get(model, ['attributes', index]);
    const parallelAttributeIndex = attributeToRemove.name === attributeToRemove.params.key ?
      -1 : findIndex(model.attributes, (attr) => attr.params.key === attributeName);
      
    this.props.deleteAttribute(index, this.props.match.params.modelName, parallelAttributeIndex !== -1);
***REMOVED***

  handleEditAttribute = (attributeName) => ***REMOVED***
    const index = findIndex(this.props.modelPage.model.attributes, ['name', attributeName]);
    const attribute = this.props.modelPage.model.attributes[index];

    // Display a notification if the attribute is not present in the ones that the ctb handles
    if (!has(attribute.params, 'nature') && !includes(availableAttributes, attribute.params.type)) ***REMOVED***
      return strapi.notification.info('content-type-builder.notification.info.disable');
***REMOVED***
    const settingsType = attribute.params.type ? 'baseSettings' : 'defineRelation';
    const parallelAttributeIndex = findIndex(this.props.modelPage.model.attributes, ['name', attribute.params.key]);
    const hasParallelAttribute = settingsType === 'defineRelation' && parallelAttributeIndex !== -1 ? `::$***REMOVED***parallelAttributeIndex***REMOVED***` : '';

    let attributeType;

    switch (attribute.params.type) ***REMOVED***
      case 'integer':
      case 'float':
      case 'decimal':
        attributeType = 'number';
        break;
      default:
        attributeType = attribute.params.type ? attribute.params.type : 'relation';
***REMOVED***

    router.push(`/plugins/content-type-builder/models/$***REMOVED***this.props.match.params.modelName***REMOVED***#edit$***REMOVED***this.props.match.params.modelName***REMOVED***::attribute$***REMOVED***attributeType***REMOVED***::$***REMOVED***settingsType***REMOVED***::$***REMOVED***index***REMOVED***$***REMOVED***hasParallelAttribute***REMOVED***`);
***REMOVED***

  handleSubmit = () => ***REMOVED***
    this.props.submit(this.context, this.props.match.params.modelName);
***REMOVED***

  toggleModal = () => ***REMOVED***
    const locationHash = this.props.location.hash ? '' : '#create::contentType::baseSettings';
    router.push(`/plugins/content-type-builder/models/$***REMOVED***this.props.match.params.modelName***REMOVED***$***REMOVED***locationHash***REMOVED***`);
***REMOVED***

  renderAddLink = (props, customLinkStyles) => (
    <li className=***REMOVED***customLinkStyles.pluginLeftMenuLink***REMOVED***>
      <div className=***REMOVED***`$***REMOVED***customLinkStyles.liInnerContainer***REMOVED*** $***REMOVED***styles.iconPlus***REMOVED***`***REMOVED*** onClick=***REMOVED***this.handleAddLinkClick***REMOVED***>
        <div>
          <i className=***REMOVED***`fa $***REMOVED***props.link.icon***REMOVED***`***REMOVED*** />
        </div>
        <span><FormattedMessage id=***REMOVED***`content-type-builder.$***REMOVED***props.link.name***REMOVED***`***REMOVED*** /></span>
      </div>
    </li>
  )

  renderCustomLi = (row, key) => <AttributeRow key=***REMOVED***key***REMOVED*** row=***REMOVED***row***REMOVED*** onEditAttribute=***REMOVED***this.handleEditAttribute***REMOVED*** onDelete=***REMOVED***this.handleDelete***REMOVED*** />

  renderCustomLink = (props, linkStyles) => ***REMOVED***
    if (props.link.name === 'button.contentType.add') ***REMOVED***
      return this.renderAddLink(props, linkStyles);
***REMOVED***

    const linkName = props.link.source ?  `$***REMOVED***props.link.name***REMOVED***&source=$***REMOVED***props.link.source***REMOVED***` : props.link.name;
    const temporary = props.link.isTemporary || this.props.modelPage.showButtons && linkName === this.props.match.params.modelName ? <FormattedMessage id="content-type-builder.contentType.temporaryDisplay" /> : '';
    const spanStyle = props.link.isTemporary || this.props.modelPage.showButtons && linkName === this.props.match.params.modelName || isEmpty(temporary) && props.link.source ? styles.leftMenuSpan : '';
    const pluginSource = isEmpty(temporary) && props.link.source ? <FormattedMessage id="content-type-builder.from">***REMOVED***(message) => <span style=***REMOVED******REMOVED*** marginRight: '10px' ***REMOVED******REMOVED***>(***REMOVED***message***REMOVED***: ***REMOVED***props.link.source***REMOVED***)</span>***REMOVED***</FormattedMessage>: '';

    return (
      <li className=***REMOVED***linkStyles.pluginLeftMenuLink***REMOVED***>
        <NavLink className=***REMOVED***linkStyles.link***REMOVED*** to=***REMOVED***`/plugins/content-type-builder/models/$***REMOVED***props.link.name***REMOVED***$***REMOVED***props.link.source ? `&source=$***REMOVED***props.link.source***REMOVED***` : ''***REMOVED***`***REMOVED*** activeClassName=***REMOVED***linkStyles.linkActive***REMOVED***>
          <div>
            <i className=***REMOVED***`fa fa-caret-square-o-right`***REMOVED*** />
          </div>
          <div className=***REMOVED***styles.contentContainer***REMOVED***>

            <span className=***REMOVED***spanStyle***REMOVED***>***REMOVED***startCase(props.link.name)***REMOVED***</span>
            <span style=***REMOVED******REMOVED*** marginLeft: '1rem', fontStyle: 'italic' ***REMOVED******REMOVED***>***REMOVED***temporary***REMOVED******REMOVED***pluginSource***REMOVED***</span>
          </div>
        </NavLink>
      </li>
    );
***REMOVED***

  renderListTitle = (props, listStyles) => ***REMOVED***
    const availableNumber = size(props.listContent.attributes);
    const title = availableNumber > 1 ? 'content-type-builder.modelPage.contentType.list.title.plural'
      : 'content-type-builder.modelPage.contentType.list.title.singular';

    const relationShipNumber = props.listContent.attributes.filter(attr => has(attr.params, 'target')).length;

    const relationShipTitle = relationShipNumber > 1 ? 'content-type-builder.modelPage.contentType.list.relationShipTitle.plural'
      : 'content-type-builder.modelPage.contentType.list.relationShipTitle.singular';

    let fullTitle;

    if (relationShipNumber > 0) ***REMOVED***
      fullTitle = (
        <div className=***REMOVED***listStyles.titleContainer***REMOVED***>
          ***REMOVED***availableNumber***REMOVED*** <FormattedMessage id=***REMOVED***title***REMOVED*** /> <FormattedMessage id=***REMOVED***'content-type-builder.modelPage.contentType.list.title.including'***REMOVED*** /> ***REMOVED***relationShipNumber***REMOVED*** <FormattedMessage id=***REMOVED***relationShipTitle***REMOVED*** />
        </div>
      );
***REMOVED*** else ***REMOVED***
      fullTitle = (
        <div className=***REMOVED***listStyles.titleContainer***REMOVED***>
          ***REMOVED***availableNumber***REMOVED*** <FormattedMessage id=***REMOVED***title***REMOVED*** />

        </div>
      );
***REMOVED***
    return fullTitle;
***REMOVED***

  render() ***REMOVED***
    // Url to redirects the user if he modifies the temporary content type name
    const redirectRoute = replace(this.props.match.path, '/:modelName', '');
    const addButtons  = get(storeData.getContentType(), 'name') === this.props.match.params.modelName && size(get(storeData.getContentType(), 'attributes')) > 0 || this.props.modelPage.showButtons;
    const contentHeaderDescription = this.props.modelPage.model.description || 'content-type-builder.modelPage.contentHeader.emptyDescription.description';
    const content = size(this.props.modelPage.model.attributes) === 0 ?
      <EmptyAttributesBlock title="content-type-builder.home.emptyAttributes.title" description="content-type-builder.home.emptyAttributes.description" label="content-type-builder.button.attributes.add" onClick=***REMOVED***this.handleClickAddAttribute***REMOVED*** /> :
      <List
        listContent=***REMOVED***this.props.modelPage.model***REMOVED***
        renderCustomListTitle=***REMOVED***this.renderListTitle***REMOVED***
        listContentMappingKey=***REMOVED***'attributes'***REMOVED***
        renderCustomLi=***REMOVED***this.renderCustomLi***REMOVED***
        onButtonClick=***REMOVED***this.handleClickAddAttribute***REMOVED***
      />;
    const icoType = includes(this.props.match.params.modelName, '&source=') ? '' : 'pencil';

    return (
      <div className=***REMOVED***styles.modelPage***REMOVED***>
        <div className="container-fluid">
          <div className="row">
            <PluginLeftMenu
              sections=***REMOVED***this.props.menu***REMOVED***
              renderCustomLink=***REMOVED***this.renderCustomLink***REMOVED***
              addCustomSection=***REMOVED***this.addCustomSection***REMOVED***
            />

            <div className="col-md-9">
              <div className=***REMOVED***styles.componentsContainer***REMOVED***>
                <ContentHeader
                  name=***REMOVED***this.props.modelPage.model.name***REMOVED***
                  description=***REMOVED***contentHeaderDescription***REMOVED***
                  icoType=***REMOVED***icoType***REMOVED***
                  editIcon
                  editPath=***REMOVED***`$***REMOVED***redirectRoute***REMOVED***/$***REMOVED***this.props.match.params.modelName***REMOVED***#edit$***REMOVED***this.props.match.params.modelName***REMOVED***::contentType::baseSettings`***REMOVED***
                  addButtons=***REMOVED***addButtons***REMOVED***
                  handleSubmit=***REMOVED***this.props.submit***REMOVED***
                  isLoading=***REMOVED***this.props.modelPage.showButtonLoader***REMOVED***
                  buttonsContent=***REMOVED***this.contentHeaderButtons***REMOVED***

                />
                ***REMOVED***content***REMOVED***
              </div>
            </div>
          </div>
        </div>
        <Form
          hash=***REMOVED***this.props.location.hash***REMOVED***
          toggle=***REMOVED***this.toggleModal***REMOVED***
          routePath=***REMOVED***`$***REMOVED***redirectRoute***REMOVED***/$***REMOVED***this.props.match.params.modelName***REMOVED***`***REMOVED***
          popUpHeaderNavLinks=***REMOVED***this.popUpHeaderNavLinks***REMOVED***
          menuData=***REMOVED***this.props.menu***REMOVED***
          redirectRoute=***REMOVED***redirectRoute***REMOVED***
          modelName=***REMOVED***this.props.match.params.modelName***REMOVED***
          contentTypeData=***REMOVED***this.props.modelPage.model***REMOVED***
          isModelPage
          modelLoading=***REMOVED***this.props.modelPage.modelLoading***REMOVED***
        />
      </div>
    );
***REMOVED***
***REMOVED***

ModelPage.contextTypes = ***REMOVED***
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func,
***REMOVED***;

ModelPage.propTypes = ***REMOVED***
  cancelChanges: PropTypes.func.isRequired,
  deleteAttribute: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
  modelFetch: PropTypes.func.isRequired,
  modelFetchSucceeded: PropTypes.func.isRequired,
  modelPage: PropTypes.object.isRequired,
  resetShowButtonsProps: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  updatedContentType: PropTypes.bool.isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  menu: makeSelectMenu(),
  modelPage: selectModelPage(),
  updatedContentType: makeSelectContentTypeUpdated(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      cancelChanges,
      deleteAttribute,
      modelFetch,
      modelFetchSucceeded,
      resetShowButtonsProps,
      submit,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga(***REMOVED*** key: 'modelPage', saga ***REMOVED***);
const withReducer = injectReducer(***REMOVED*** key: 'modelPage', reducer ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ModelPage);
