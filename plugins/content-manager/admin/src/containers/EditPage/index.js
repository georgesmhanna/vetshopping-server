/**
 *
 * EditPage
 *
 */

import React from 'react';
import moment from 'moment';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import PropTypes from 'prop-types';
import ***REMOVED*** cloneDeep, findIndex, get, includes, isEmpty, isObject, toNumber, toString, replace ***REMOVED*** from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import ***REMOVED*** DragDropContext ***REMOVED*** from 'react-dnd';
import cn from 'classnames';
// You can find these components in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import BackHeader from 'components/BackHeader';
import EmptyAttributesBlock from 'components/EmptyAttributesBlock';
import LoadingIndicator from 'components/LoadingIndicator';
import PluginHeader from 'components/PluginHeader';
import PopUpWarning from 'components/PopUpWarning';
// Plugin's components
import CustomDragLayer from 'components/CustomDragLayer';
import Edit from 'components/Edit';
import EditRelations from 'components/EditRelations';
// App selectors
import ***REMOVED*** makeSelectSchema ***REMOVED*** from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import getQueryParameters from 'utils/getQueryParameters';
import ***REMOVED*** bindLayout ***REMOVED*** from 'utils/bindLayout';
import inputValidations from 'utils/inputsValidations';
import ***REMOVED*** generateRedirectURI ***REMOVED*** from 'containers/ListPage/utils';
import ***REMOVED*** checkFormValidity ***REMOVED*** from 'utils/formValidations';
import ***REMOVED***
  addRelationItem,
  changeData,
  getData,
  initModelProps,
  moveAttr,
  moveAttrEnd,
  onCancel,
  onRemoveRelationItem,
  resetProps,
  setFileRelations,
  setFormErrors,
  submit,
***REMOVED*** from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectEditPage from './selectors';
import styles from './styles.scss';

export class EditPage extends React.Component ***REMOVED***
  state = ***REMOVED*** showWarning: false ***REMOVED***;

  componentDidMount() ***REMOVED***
    this.initComponent(this.props);
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.location.pathname !== this.props.location.pathname) ***REMOVED***
      this.props.resetProps();
      this.initComponent(this.props);
***REMOVED***

    if (prevProps.editPage.submitSuccess !== this.props.editPage.submitSuccess) ***REMOVED***
      if (!isEmpty(this.props.location.search) && includes(this.props.location.search, '?redirectUrl')) ***REMOVED***
        const redirectUrl = this.props.location.search.split('?redirectUrl=')[1];

        this.props.history.push(***REMOVED***
          pathname: redirectUrl.split('?')[0],
          search: redirectUrl.split('?')[1],
  ***REMOVED***);
***REMOVED*** else ***REMOVED***
        this.props.history.push(***REMOVED***
          pathname: replace(this.props.location.pathname, '/create', ''),
          search: `?source=$***REMOVED***this.getSource()***REMOVED***`,
  ***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    this.props.resetProps();
***REMOVED***

  /**
   * Retrieve the model's displayed relations
   * @return ***REMOVED***Array***REMOVED***
   */
  getDisplayedRelations = () => ***REMOVED***
    return get(this.getSchema(), ['editDisplay', 'relations'], []);
***REMOVED***

  /**
   * Retrieve the model's custom layout
   *
   */
  getLayout = () => (
    bindLayout.call(this, get(this.props.schema, ['layout', this.getModelName()], ***REMOVED******REMOVED***))
  )

  /**
   *
   *
   * @type ***REMOVED***[type]***REMOVED***
   */
  getAttributeValidations = (name) => get(this.props.editPage.formValidations, [findIndex(this.props.editPage.formValidations, ['name', name]), 'validations'], ***REMOVED******REMOVED***)

  getDisplayedFields = () => get(this.getSchema(), ['editDisplay', 'fields'], []);

  /**
   * Retrieve the model
   * @type ***REMOVED***Object***REMOVED***
   */
  getModel = () => get(this.props.schema, ['models', this.getModelName()]) || get(this.props.schema, ['models', 'plugins', this.getSource(), this.getModelName()]);

  /**
   * Retrieve specific attribute
   * @type ***REMOVED***String***REMOVED*** name
   */
  getModelAttribute = (name) => get(this.getModelAttributes(), name);

  /**
   * Retrieve the model's attributes
   * @return ***REMOVED***Object***REMOVED***
   */
  getModelAttributes = () => this.getModel().attributes;

  /**
   * Retrieve the model's name
   * @return ***REMOVED***String***REMOVED*** model's name
   */
  getModelName = () => this.props.match.params.slug.toLowerCase();

  /**
   * Retrieve model's schema
   * @return ***REMOVED***Object***REMOVED***
   */
  getSchema = () => this.getSource() !== 'content-manager' ?
    get(this.props.schema, ['models', 'plugins', this.getSource(), this.getModelName()])
    : get(this.props.schema, ['models', this.getModelName()]);

  getPluginHeaderTitle = () => ***REMOVED***
    if (this.isCreating()) ***REMOVED***
      return toString(this.props.editPage.pluginHeaderTitle);
***REMOVED***

    return this.props.match.params.id;
***REMOVED***

  /**
   * Retrieve the model's source
   * @return ***REMOVED***String***REMOVED***
   */
  getSource = () => getQueryParameters(this.props.location.search, 'source');

  /**
   * Initialize component
   */
  initComponent = (props) => ***REMOVED***
    this.props.initModelProps(this.getModelName(), this.isCreating(), this.getSource(), this.getModelAttributes(), this.getDisplayedFields());

    if (!this.isCreating()) ***REMOVED***
      const mainField = get(this.getModel(), 'info.mainField') || this.getModel().primaryKey;
      this.props.getData(props.match.params.id, this.getSource(), mainField);
***REMOVED***

    // Get all relations made with the upload plugin
    const fileRelations = Object.keys(get(this.getSchema(), 'relations', ***REMOVED******REMOVED***)).reduce((acc, current) => ***REMOVED***
      const association = get(this.getSchema(), ['relations', current], ***REMOVED******REMOVED***);

      if (association.plugin === 'upload' && association[association.type] === 'file') ***REMOVED***
        const relation = ***REMOVED***
          name: current,
          multiple: association.nature === 'manyToManyMorph',
  ***REMOVED***;

        acc.push(relation);
***REMOVED***
      return acc;
***REMOVED***, []);

    // Update the reducer so we can use it to create the appropriate FormData in the saga
    this.props.setFileRelations(fileRelations);
***REMOVED***

  handleAddRelationItem = (***REMOVED*** key, value ***REMOVED***) => ***REMOVED***
    this.props.addRelationItem(***REMOVED***
      key,
      value,
***REMOVED***);
***REMOVED***

  handleBlur = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    const defaultValue = get(this.getModelAttribute(target.name), 'default');

    if (isEmpty(target.value) && defaultValue && target.value !== false) ***REMOVED***
      return this.props.changeData(***REMOVED***
        target: ***REMOVED***
          name: `record.$***REMOVED***target.name***REMOVED***`,
          value: defaultValue,
  ***REMOVED***
***REMOVED***);
***REMOVED***

    const errorIndex = findIndex(this.props.editPage.formErrors, ['name', target.name]);
    const errors = inputValidations(target.value, this.getAttributeValidations(target.name), target.type);
    const formErrors = cloneDeep(this.props.editPage.formErrors);

    if (errorIndex === -1 && !isEmpty(errors)) ***REMOVED***
      formErrors.push(***REMOVED*** name: target.name, errors ***REMOVED***);
***REMOVED*** else if (errorIndex !== -1 && isEmpty(errors)) ***REMOVED***
      formErrors.splice(errorIndex, 1);
***REMOVED*** else if (!isEmpty(errors)) ***REMOVED***
      formErrors.splice(errorIndex, 1, ***REMOVED*** name: target.name, errors ***REMOVED***);
***REMOVED***

    return this.props.setFormErrors(formErrors);
***REMOVED***

  handleChange = (e) => ***REMOVED***
    let value = e.target.value;
    // Check if date
    if (isObject(e.target.value) && e.target.value._isAMomentObject === true) ***REMOVED***
      value = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss');
***REMOVED*** else if (['float', 'integer', 'biginteger', 'decimal'].indexOf(get(this.getSchema(), ['fields', e.target.name, 'type'])) !== -1) ***REMOVED***
      value = toNumber(e.target.value);
***REMOVED***

    const target = ***REMOVED***
      name: `record.$***REMOVED***e.target.name***REMOVED***`,
      value,
***REMOVED***;

    this.props.changeData(***REMOVED*** target ***REMOVED***);
***REMOVED***

  handleConfirm = () => ***REMOVED***
    this.props.onCancel();
    this.toggle();
***REMOVED***

  handleGoBack = () => this.props.history.goBack();

  handleRedirect = (***REMOVED*** model, id, source = 'content-manager'***REMOVED***) => ***REMOVED***
    /* eslint-disable */
    switch (model) ***REMOVED***
      case 'permission':
      case 'role':
      case 'file':
        // Exclude special models which are handled by plugins.
        if (source !== 'content-manager') ***REMOVED***
          break;
  ***REMOVED***
      default:
        const pathname = `$***REMOVED***this.props.match.path.replace(':slug', model).replace(':id', id)***REMOVED***`;

        this.props.history.push(***REMOVED***
          pathname,
          search: `?source=$***REMOVED***source***REMOVED***&redirectURI=$***REMOVED***generateRedirectURI(***REMOVED*** model, search: `?source=$***REMOVED***source***REMOVED***` ***REMOVED***)***REMOVED***`,
  ***REMOVED***);
***REMOVED***
    /* eslint-enable */
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    const formErrors = checkFormValidity(this.generateFormFromRecord(), this.props.editPage.formValidations);

    if (isEmpty(formErrors)) ***REMOVED***
      this.props.submit();
***REMOVED***

    this.props.setFormErrors(formErrors);
***REMOVED***

  hasDisplayedRelations = () => ***REMOVED***
    return this.getDisplayedRelations().length > 0;
***REMOVED***

  hasDisplayedFields = () => ***REMOVED***
    return get(this.getModel(), ['editDisplay', 'fields'], []).length > 0;
***REMOVED***

  isCreating = () => this.props.match.params.id === 'create';

  isRelationComponentNull = () => (
    Object.keys(get(this.getSchema(), 'relations', ***REMOVED******REMOVED***)).filter(relation => (
      get(this.getSchema(), ['relations', relation, 'plugin']) !== 'upload' &&
      (!get(this.getSchema(), ['relations', relation, 'nature'], '').toLowerCase().includes('morph') || !get(this.getSchema(), ['relations', relation, relation]))
    )).length === 0
  )

  // NOTE: technical debt that needs to be redone
  generateFormFromRecord = () => (
    Object.keys(this.getModelAttributes()).reduce((acc, current) => ***REMOVED***
      acc[current] = get(this.props.editPage.record, current, '');

      return acc;
***REMOVED***, ***REMOVED******REMOVED***)
  )

  pluginHeaderActions =  () => (
    [
      ***REMOVED***
        label: 'content-manager.containers.Edit.reset',
        kind: 'secondary',
        onClick: this.toggle,
        type: 'button',
        disabled: this.showLoaders(),
***REMOVED***
      ***REMOVED***
        kind: 'primary',
        label: 'content-manager.containers.Edit.submit',
        onClick: this.handleSubmit,
        type: 'submit',
        loader: this.props.editPage.showLoader,
        style: this.props.editPage.showLoader ? ***REMOVED*** marginRight: '18px' ***REMOVED*** : ***REMOVED******REMOVED***,
        disabled: this.showLoaders(),
***REMOVED***
    ]
  );

  showLoaders = () => ***REMOVED***
    const ***REMOVED*** editPage: ***REMOVED*** isLoading ***REMOVED***, schema: ***REMOVED*** layout ***REMOVED*** ***REMOVED*** = this.props;

    return isLoading && !this.isCreating() || isLoading && get(layout, this.getModelName()) === undefined;
***REMOVED***

  toggle = () => this.setState(prevState => (***REMOVED*** showWarning: !prevState.showWarning ***REMOVED***));

  renderEdit = () => ***REMOVED***
    const ***REMOVED*** editPage, location: ***REMOVED*** search ***REMOVED*** ***REMOVED*** = this.props;
    const source = getQueryParameters(search, 'source');
    const basePath = '/plugins/content-manager/ctm-configurations';
    const pathname = source !== 'content-manager'
      ? `$***REMOVED***basePath***REMOVED***/plugins/$***REMOVED***source***REMOVED***/$***REMOVED***this.getModelName()***REMOVED***`
      : `$***REMOVED***basePath***REMOVED***/$***REMOVED***this.getModelName()***REMOVED***`;

    if (this.showLoaders()) ***REMOVED***
      return (
        <div className=***REMOVED***!this.hasDisplayedRelations() ? 'col-lg-12' : 'col-lg-9'***REMOVED***>
          <div className=***REMOVED***styles.main_wrapper***REMOVED***>
            <LoadingIndicator />
          </div>
        </div>
      );
***REMOVED***

    if (!this.hasDisplayedFields()) ***REMOVED***
      return (
        <div className=***REMOVED***!this.hasDisplayedRelations() ? 'col-lg-12' : 'col-lg-9'***REMOVED***>
          <EmptyAttributesBlock
            description="content-manager.components.EmptyAttributesBlock.description"
            label="content-manager.components.EmptyAttributesBlock.button"
            onClick=***REMOVED***() => this.props.history.push(pathname)***REMOVED***
          />
        </div>
      );
***REMOVED***

    return (
      <div className=***REMOVED***!this.hasDisplayedRelations() ? 'col-lg-12' : 'col-lg-9'***REMOVED***>
        <div className=***REMOVED***styles.main_wrapper***REMOVED***>
          <Edit
            attributes=***REMOVED***this.getModelAttributes()***REMOVED***
            didCheckErrors=***REMOVED***editPage.didCheckErrors***REMOVED***
            formValidations=***REMOVED***editPage.formValidations***REMOVED***
            formErrors=***REMOVED***editPage.formErrors***REMOVED***
            layout=***REMOVED***this.getLayout()***REMOVED***
            modelName=***REMOVED***this.getModelName()***REMOVED***
            onBlur=***REMOVED***this.handleBlur***REMOVED***
            onChange=***REMOVED***this.handleChange***REMOVED***
            record=***REMOVED***editPage.record***REMOVED***
            resetProps=***REMOVED***editPage.resetProps***REMOVED***
            schema=***REMOVED***this.getSchema()***REMOVED***
          />
        </div>
      </div>
    );
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** editPage, moveAttr, moveAttrEnd ***REMOVED*** = this.props;
    const ***REMOVED*** showWarning ***REMOVED*** = this.state;

    return (
      <div>
        <form onSubmit=***REMOVED***this.handleSubmit***REMOVED***>
          <BackHeader onClick=***REMOVED***this.handleGoBack***REMOVED*** />
          <CustomDragLayer />
          <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
            <PluginHeader
              actions=***REMOVED***this.pluginHeaderActions()***REMOVED***
              title=***REMOVED******REMOVED*** id: this.getPluginHeaderTitle() ***REMOVED******REMOVED***
            />
            <PopUpWarning
              isOpen=***REMOVED***showWarning***REMOVED***
              toggleModal=***REMOVED***this.toggle***REMOVED***
              content=***REMOVED******REMOVED***
                title: 'content-manager.popUpWarning.title',
                message: 'content-manager.popUpWarning.warning.cancelAllSettings',
                cancel: 'content-manager.popUpWarning.button.cancel',
                confirm: 'content-manager.popUpWarning.button.confirm',
        ***REMOVED******REMOVED***
              popUpWarningType="danger"
              onConfirm=***REMOVED***this.handleConfirm***REMOVED***
            />
            <div className="row">
              ***REMOVED***this.renderEdit()***REMOVED***
              ***REMOVED***this.hasDisplayedRelations() && (
                <div className=***REMOVED***cn('col-lg-3')***REMOVED***>
                  <div className=***REMOVED***styles.sub_wrapper***REMOVED***>
                    ***REMOVED***this.hasDisplayedRelations() && (
                      <EditRelations
                        changeData=***REMOVED***this.props.changeData***REMOVED***
                        currentModelName=***REMOVED***this.getModelName()***REMOVED***
                        displayedRelations=***REMOVED***this.getDisplayedRelations()***REMOVED***
                        isDraggingSibling=***REMOVED***editPage.isDraggingSibling***REMOVED***
                        location=***REMOVED***this.props.location***REMOVED***
                        moveAttr=***REMOVED***moveAttr***REMOVED***
                        moveAttrEnd=***REMOVED***moveAttrEnd***REMOVED***
                        onAddRelationalItem=***REMOVED***this.handleAddRelationItem***REMOVED***
                        onRedirect=***REMOVED***this.handleRedirect***REMOVED***
                        onRemoveRelationItem=***REMOVED***this.props.onRemoveRelationItem***REMOVED***
                        record=***REMOVED***editPage.record***REMOVED***
                        schema=***REMOVED***this.getSchema()***REMOVED***
                      />
                    )***REMOVED***
                  </div>
                </div>
              )***REMOVED***
            </div>
          </div>
        </form>
      </div>
    );
***REMOVED***
***REMOVED***

EditPage.contextTypes = ***REMOVED***
  plugins: PropTypes.object,
***REMOVED***;

EditPage.defaultProps = ***REMOVED***
  schema: ***REMOVED******REMOVED***,
***REMOVED***;

EditPage.propTypes = ***REMOVED***
  addRelationItem: PropTypes.func.isRequired,
  changeData: PropTypes.func.isRequired,
  editPage: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  initModelProps: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  moveAttr: PropTypes.func.isRequired,
  moveAttrEnd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemoveRelationItem: PropTypes.func.isRequired,
  resetProps: PropTypes.func.isRequired,
  schema: PropTypes.object,
  setFileRelations: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
***REMOVED***;

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      addRelationItem,
      changeData,
      getData,
      initModelProps,
      moveAttr,
      moveAttrEnd,
      onCancel,
      onRemoveRelationItem,
      resetProps,
      setFileRelations,
      setFormErrors,
      submit,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED***
  editPage: makeSelectEditPage(),
  schema: makeSelectSchema(),
***REMOVED***);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer(***REMOVED*** key: 'editPage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'editPage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DragDropContext(HTML5Backend)(EditPage));
