/**
 *
 * ListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** capitalize, findIndex, get, isUndefined, toInteger, upperFirst ***REMOVED*** from 'lodash';
import ***REMOVED*** ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ***REMOVED*** from 'reactstrap';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import cn from 'classnames';
// App selectors
import ***REMOVED*** makeSelectSchema ***REMOVED*** from 'containers/App/selectors';
// You can find these components in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import PageFooter from 'components/PageFooter';
import PluginHeader from 'components/PluginHeader';
import PopUpWarning from 'components/PopUpWarning';
import InputCheckbox from 'components/InputCheckbox';
// Components from the plugin itself
import AddFilterCTA from 'components/AddFilterCTA';
import FiltersPickWrapper from 'components/FiltersPickWrapper/Loadable';
import Filter from 'components/Filter/Loadable';
import Search from 'components/Search';
import Table from 'components/Table';
// Utils located in `strapi/packages/strapi-helper-plugin/lib/src/utils`;
import getQueryParameters from 'utils/getQueryParameters';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import storeData from 'utils/storeData';
import Div from './Div';
import ***REMOVED***
  addAttr,
  addFilter,
  changeParams,
  deleteData,
  deleteSeveralData,
  getData,
  onChange,
  onClickRemove,
  onClickSelect,
  onClickSelectAll,
  onToggleDeleteAll,
  onToggleFilters,
  openFiltersWithSelections,
  removeAllFilters,
  removeAttr,
  removeFilter,
  resetDisplayedFields,
  setDisplayedFields,
  setParams,
  submit,
***REMOVED*** from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectListPage from './selectors';
import ***REMOVED***
  generateFiltersFromSearch,
  generateSearchFromFilters,
  generateSearchFromParams,
  generateRedirectURI,
***REMOVED*** from './utils';
import styles from './styles.scss';

export class ListPage extends React.Component ***REMOVED***
  state = ***REMOVED*** isOpen: false, showWarning: false, target: '' ***REMOVED***;

  componentDidMount() ***REMOVED***
    this.getData(this.props);
    this.setTableHeaders();
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    const ***REMOVED***
      location: ***REMOVED*** pathname, search ***REMOVED***,
***REMOVED*** = prevProps;
    const ***REMOVED***
      listPage: ***REMOVED*** didChangeDisplayedFields, filtersUpdated, displayedFields, params: ***REMOVED*** _sort ***REMOVED*** ***REMOVED***,
***REMOVED*** = this.props;

    if (pathname !== this.props.location.pathname) ***REMOVED***
      this.getData(this.props);
      this.shouldHideFilters();
      this.setTableHeaders();
***REMOVED***

    if (search !== this.props.location.search) ***REMOVED***
      this.getData(this.props, true);
***REMOVED***

    if (prevProps.listPage.filtersUpdated !== filtersUpdated) ***REMOVED***
      const updatedSearch = this.generateSearch();
      this.props.history.push(***REMOVED*** pathname, search: updatedSearch ***REMOVED***);
***REMOVED***

    if (prevProps.listPage.didChangeDisplayedFields !== didChangeDisplayedFields) ***REMOVED***
      const dataToStore = ***REMOVED***
        [this.getCurrentModelName()]: ***REMOVED***
          displayedFields,
          _sort,
  ***REMOVED***
***REMOVED***;
      storeData.set(this.getCurrentModelName(), dataToStore);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    if (this.props.listPage.showFilter) ***REMOVED***
      this.props.onToggleFilters();
***REMOVED***
***REMOVED***

  getAllModelFields = () => ***REMOVED***
    const attributes = this.getCurrentModelAttributes();

    return Object.keys(attributes)
      .filter(attr => ***REMOVED***
        return !attributes[attr].hasOwnProperty('collection') && !attributes[attr].hasOwnProperty('model');
***REMOVED***);
***REMOVED***

  /**
   * Helper to retrieve the current model data
   * @return ***REMOVED***Object***REMOVED*** the current model
   */
  getCurrentModel = () => (
    get(this.props.schema, ['models', this.getCurrentModelName()]) ||
    get(this.props.schema, ['models', 'plugins', this.getSource(), this.getCurrentModelName()])
  );

  getCurrentModelAttributes = () => ***REMOVED***
    const primaryKey = this.getModelPrimaryKey();
    const defaultAttr = ***REMOVED*** name: primaryKey, label: 'Id', type: 'string', searchable: true, sortable: true ***REMOVED***;
    const attributes = Object.assign(***REMOVED*** [primaryKey]: defaultAttr ***REMOVED***, get(this.getCurrentModel(), ['attributes'], ***REMOVED******REMOVED***));

    return attributes;
***REMOVED***

  getCurrentModelDefaultLimit = () => (
    get(this.getCurrentModel(), 'pageEntries', 10)
  );

  getCurrentModelDefaultSort = () => ***REMOVED***
    const sortAttr = get(this.getCurrentModel(), 'defaultSort', 'id');
    const order = get(this.getCurrentModel(), 'sort', 'ASC');

    return order === 'ASC' ? sortAttr : `-$***REMOVED***sortAttr***REMOVED***`;
***REMOVED***;

  /**
   * Helper to retrieve the current model name
   * @return ***REMOVED***String***REMOVED*** the current model's name
   */
  getCurrentModelName = () => this.props.match.params.slug;

  /**
   * Function to fetch data
   * @param  ***REMOVED***Object***REMOVED*** props
   */
  getData = (props, setUpdatingParams = false) => ***REMOVED***
    const source = getQueryParameters(props.location.search, 'source');
    const _limit = toInteger(getQueryParameters(props.location.search, '_limit')) || this.getCurrentModelDefaultLimit();
    const _page = toInteger(getQueryParameters(props.location.search, '_page')) || 1;
    const _sort = this.findPageSort(props); // TODO sort
    const _q = getQueryParameters(props.location.search, '_q') || '';
    const params = ***REMOVED*** _limit, _page, _sort, _q ***REMOVED***;
    const filters = generateFiltersFromSearch(props.location.search);

    this.props.setParams(params, filters);
    this.props.getData(props.match.params.slug, source, setUpdatingParams);
***REMOVED***;

  getDataFromStore = (key) => ***REMOVED***
    return get(storeData.get(this.getCurrentModelName()),[this.getCurrentModelName(), key]);
***REMOVED***

  /**
   * Helper to retrieve the model's source
   * @return ***REMOVED***String***REMOVED*** the model's source
   */
  getSource = () => getQueryParameters(this.props.location.search, 'source') || 'content-manager';

  /**
   * Retrieve the model's schema
   * @return ***REMOVED***Object***REMOVED*** Fields
   */
  getCurrentSchema = () => 
    get(this.props.schema, ['models', this.getCurrentModelName(), 'fields']) ||
    get(this.props.schema, ['models', 'plugins', this.getSource(), this.getCurrentModelName(), 'fields']);

  getPopUpDeleteAllMsg = () => (
    this.props.listPage.entriesToDelete.length > 1 ?
      'content-manager.popUpWarning.bodyMessage.contentType.delete.all'
      : 'content-manager.popUpWarning.bodyMessage.contentType.delete'
  );

  getModelPrimaryKey = () => (
    get(this.getCurrentModel(), ['primaryKey'], '_id')
  );

  getTableHeaders = () => (
    get(this.props.listPage, ['displayedFields'], [])
  );

  setTableHeaders = () => ***REMOVED***
    const defaultTableHeaders = this.getDataFromStore('displayedFields') || get(this.getCurrentModel(), ['listDisplay'], []);
    this.props.setDisplayedFields(defaultTableHeaders);
***REMOVED***

  /**
   * Generate the redirect URI when editing an entry
   * @type ***REMOVED***String***REMOVED***
   */
  generateRedirectURI = generateRedirectURI.bind(this);

  generateSearch = () => ***REMOVED***
    const ***REMOVED***
      listPage: ***REMOVED*** filters, params ***REMOVED***,
***REMOVED*** = this.props;

    return `?$***REMOVED***generateSearchFromParams(params)***REMOVED***&source=$***REMOVED***this.getSource()***REMOVED***$***REMOVED***generateSearchFromFilters(filters)***REMOVED***`;
***REMOVED***

  areAllEntriesSelected = () => ***REMOVED***
    const ***REMOVED*** listPage: ***REMOVED*** entriesToDelete, records ***REMOVED*** ***REMOVED*** = this.props;

    return entriesToDelete.length === get(records, this.getCurrentModelName(), []).length && get(records, this.getCurrentModelName(), []).length > 0;
***REMOVED***;

  findAttrIndex = attr => ***REMOVED***
    return findIndex(this.props.listPage.displayedFields, ['name', attr]);
***REMOVED***

  /**
   * [findPageSort description]
   * @param  ***REMOVED***Object***REMOVED*** props [description]
   * @return ***REMOVED***String***REMOVED***      the model's primaryKey
   */
  findPageSort = props => ***REMOVED***
    return (
      getQueryParameters(props.location.search, '_sort') ||
      this.getDataFromStore('_sort') ||
      this.getCurrentModelDefaultSort()
    );
***REMOVED***;

  handleChangeHeader = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    const defaultSettingsDisplay = get(this.getCurrentModel(), ['listDisplay']);
    const attrIndex = this.findAttrIndex(target.name);
    const defaultSettingsAttrIndex = findIndex(defaultSettingsDisplay, ['name', target.name]);

    if (attrIndex !== -1) ***REMOVED***
      if (get(this.props.listPage, 'displayedFields', []).length === 1) ***REMOVED***
        strapi.notification.error('content-manager.notification.error.displayedFields');
***REMOVED*** else ***REMOVED***
        const isRemovingDefaultSort = get(this.props.listPage, ['params', '_sort']) === target.name;
        let newDefaultSort;

        if (isRemovingDefaultSort) ***REMOVED***
          this.props.listPage.displayedFields
            .filter(attr => attr.name !== target.name)
            .forEach(attr => ***REMOVED***
              if (attr.sortable && !newDefaultSort) ***REMOVED***
                newDefaultSort = attr.name;
        ***REMOVED***
      ***REMOVED***);

          // TODO: store model default sort

          this.handleChangeSort(newDefaultSort || this.getModelPrimaryKey());
  ***REMOVED***
        this.props.removeAttr(attrIndex);
***REMOVED***
***REMOVED*** else ***REMOVED***
      const attributes = this.getCurrentModelAttributes();
      const searchable = attributes[target.name].type !== 'json' && attributes[target.name] !== 'array';
      const attrToAdd = defaultSettingsAttrIndex !== -1 
        ? get(defaultSettingsDisplay, [defaultSettingsAttrIndex], ***REMOVED******REMOVED***)
        : Object.assign(attributes[target.name], ***REMOVED*** name: target.name, label: upperFirst(target.name), searchable, sortable: searchable ***REMOVED***);
      
      this.props.addAttr(attrToAdd, defaultSettingsAttrIndex);
***REMOVED***
***REMOVED***

  handleChangeParams = e => ***REMOVED***
    const ***REMOVED***
      history,
      listPage: ***REMOVED*** filters, params ***REMOVED***,
***REMOVED*** = this.props;
    const _q = params._q !== '' ? `&_q=$***REMOVED***params._q***REMOVED***` : '';
    const searchEnd  = `&_sort=$***REMOVED***params._sort***REMOVED***$***REMOVED***_q***REMOVED***&source=$***REMOVED***this.getSource()***REMOVED***$***REMOVED***generateSearchFromFilters(filters)***REMOVED***`;
    const search =
      e.target.name === 'params._limit'
        ? `_page=$***REMOVED***params._page***REMOVED***&_limit=$***REMOVED***e.target.value***REMOVED***$***REMOVED***searchEnd***REMOVED***`
        : `_page=$***REMOVED***e.target.value***REMOVED***&_limit=$***REMOVED***params._limit***REMOVED***$***REMOVED***searchEnd***REMOVED***`;

    this.props.history.push(***REMOVED***
      pathname: history.pathname,
      search,
***REMOVED***);

    this.props.changeParams(e);
***REMOVED***;

  handleChangeSort = sort => ***REMOVED***
    const target = ***REMOVED***
      name: 'params._sort',
      value: sort,
***REMOVED***;
    const ***REMOVED***
      listPage: ***REMOVED*** filters, params ***REMOVED***,
***REMOVED*** = this.props;
    const _q = params._q !== '' ? `&_q=$***REMOVED***params._q***REMOVED***` : '';
    this.props.history.push(***REMOVED***
      pathname: this.props.location.pathname,
      search: `?_page=$***REMOVED***params._page***REMOVED***&_limit=$***REMOVED***
        params._limit
***REMOVED***&_sort=$***REMOVED***sort***REMOVED***$***REMOVED***_q***REMOVED***&source=$***REMOVED***this.getSource()***REMOVED***$***REMOVED***generateSearchFromFilters(filters)***REMOVED***`,
***REMOVED***);

    this.props.changeParams(***REMOVED*** target ***REMOVED***);
***REMOVED***;

  handleDelete = e => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteData(this.state.target, this.getCurrentModelName(), this.getSource());
    this.setState(***REMOVED*** showWarning: false ***REMOVED***);
***REMOVED***;

  handleResetDisplayedFields = () => ***REMOVED***
    storeData.clear(this.getCurrentModelName());
    this.props.resetDisplayedFields(get(this.getCurrentModel(), ['listDisplay'], []));
***REMOVED***

  handleSubmit = e => ***REMOVED***
    try ***REMOVED***
      e.preventDefault();
***REMOVED*** catch (err) ***REMOVED***
      // Silent
***REMOVED*** finally ***REMOVED***
      this.props.submit();
***REMOVED***
***REMOVED***;

  isAttrInitiallyDisplayed = attr => ***REMOVED***
    return this.findAttrIndex(attr) !== -1;
***REMOVED***

  shouldHideFilters = () => ***REMOVED***
    if (this.props.listPage.showFilter) ***REMOVED***
      this.props.onToggleFilters();
***REMOVED***
***REMOVED***;

  showLoaders = () => ***REMOVED***
    const ***REMOVED*** listPage: ***REMOVED*** isLoading, records, updatingParams ***REMOVED*** ***REMOVED*** = this.props;

    return updatingParams || isLoading && get(records, this.getCurrentModelName()) === undefined;
***REMOVED***

  showSearch = () => get(this.getCurrentModel(), ['search']);

  showFilters = () => get(this.getCurrentModel(), ['filters']);

  showBulkActions = () => get(this.getCurrentModel(), ['bulkActions']);

  toggle = () => this.setState(prevState => (***REMOVED*** isOpen: !prevState.isOpen ***REMOVED***));

  toggleModalWarning = e => ***REMOVED***
    if (!isUndefined(e)) ***REMOVED***
      e.preventDefault();
      e.stopPropagation();
      this.setState(***REMOVED***
        target: e.target.id,
***REMOVED***);
***REMOVED***

    if (this.props.listPage.entriesToDelete.length > 0) ***REMOVED***
      this.props.onClickSelectAll();
***REMOVED***
    this.setState(prevState => (***REMOVED*** showWarning: !prevState.showWarning ***REMOVED***));

***REMOVED***;

  renderDropdown = item => ***REMOVED***
    return (
      <DropdownItem key=***REMOVED***item***REMOVED***>
        <div>
          <InputCheckbox onChange=***REMOVED***this.handleChangeHeader***REMOVED*** name=***REMOVED***item***REMOVED*** value=***REMOVED***this.isAttrInitiallyDisplayed(item)***REMOVED*** />
        </div>
      </DropdownItem>
    );
***REMOVED***

  renderDropdownHeader = msg => ***REMOVED***
    return (
      <DropdownItem>
        <div style=***REMOVED******REMOVED*** display: 'flex', justifyContent: 'space-between' ***REMOVED******REMOVED***>
          <span>
            ***REMOVED***msg***REMOVED***
          </span>
          <FormattedMessage id="content-manager.containers.Edit.reset">
            ***REMOVED***m => (
              <span onClick=***REMOVED***this.handleResetDisplayedFields***REMOVED***>
                ***REMOVED***m***REMOVED***
              </span>
            )***REMOVED***
          </FormattedMessage>
        </div>
      </DropdownItem>
    );
***REMOVED***

  renderFilter = (filter, key) => ***REMOVED***
    return (
      <Filter
        key=***REMOVED***key***REMOVED***
        filter=***REMOVED***filter***REMOVED***
        index=***REMOVED***key***REMOVED***
        onClick=***REMOVED***this.props.onClickRemove***REMOVED***
        onClickOpen=***REMOVED***this.props.openFiltersWithSelections***REMOVED*** // eslint-disable-line react/jsx-handler-names
        schema=***REMOVED***this.getCurrentSchema()***REMOVED***
      />
    );
***REMOVED***

  renderPluginHeader = () => ***REMOVED***
    const pluginHeaderActions = [
      ***REMOVED***
        label: 'content-manager.containers.List.addAnEntry',
        labelValues: ***REMOVED***
          entity: capitalize(this.props.match.params.slug) || 'Content Manager',
  ***REMOVED***
        kind: 'primaryAddShape',
        onClick: () =>
          this.props.history.push(***REMOVED***
            pathname: `$***REMOVED***this.props.location.pathname***REMOVED***/create`,
            search: this.generateRedirectURI(),
    ***REMOVED***),
***REMOVED***
    ];
    const ***REMOVED*** listPage: ***REMOVED*** count ***REMOVED*** ***REMOVED*** = this.props;

    return (
      <PluginHeader
        actions=***REMOVED***pluginHeaderActions***REMOVED***
        description=***REMOVED******REMOVED***
          id:
          get(count, this.getCurrentModelName(), 0) > 1
            ? 'content-manager.containers.List.pluginHeaderDescription'
            : 'content-manager.containers.List.pluginHeaderDescription.singular',
          values: ***REMOVED***
            label: get(count, this.getCurrentModelName(), 0),
    ***REMOVED***
  ***REMOVED******REMOVED***
        title=***REMOVED******REMOVED***
          id: this.getCurrentModelName() || 'Content Manager',
  ***REMOVED******REMOVED***
        withDescriptionAnim=***REMOVED***this.showLoaders()***REMOVED***
      />
    );
***REMOVED***

  renderPopUpWarningDeleteAll = () => ***REMOVED***
    const ***REMOVED*** deleteSeveralData, listPage: ***REMOVED*** entriesToDelete, showWarningDeleteAll ***REMOVED***, onToggleDeleteAll ***REMOVED*** = this.props;

    return (
      <PopUpWarning
        isOpen=***REMOVED***showWarningDeleteAll***REMOVED***
        toggleModal=***REMOVED***onToggleDeleteAll***REMOVED***
        content=***REMOVED******REMOVED***
          title: 'content-manager.popUpWarning.title',
          message: this.getPopUpDeleteAllMsg(),
          cancel: 'content-manager.popUpWarning.button.cancel',
          confirm: 'content-manager.popUpWarning.button.confirm',
  ***REMOVED******REMOVED***
        popUpWarningType="danger"
        onConfirm=***REMOVED***() => ***REMOVED***
          deleteSeveralData(entriesToDelete, this.getCurrentModelName(), this.getSource());
  ***REMOVED******REMOVED***
      />
    );
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED***
      addFilter,
      listPage,
      listPage: ***REMOVED***
        appliedFilters,
        count,
        entriesToDelete,
        filters,
        filterToFocus,
        records,
        params,
        showFilter,
***REMOVED***
      onChange,
      onClickSelect,
      onClickSelectAll,
      onToggleDeleteAll,
      onToggleFilters,
      removeAllFilters,
      removeFilter,
***REMOVED*** = this.props;
    const ***REMOVED*** isOpen ***REMOVED*** = this.state;

    return (
      <div>
        <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
          ***REMOVED***this.showSearch() && (
            <Search
              changeParams=***REMOVED***this.props.changeParams***REMOVED***
              initValue=***REMOVED***getQueryParameters(this.props.location.search, '_q') || ''***REMOVED***
              model=***REMOVED***this.getCurrentModelName()***REMOVED***
              value=***REMOVED***params._q***REMOVED***
            />
          )***REMOVED***
          ***REMOVED***this.renderPluginHeader()***REMOVED***

          <div className=***REMOVED***cn(styles.wrapper)***REMOVED***>
            ***REMOVED***this.showFilters() && (
              <React.Fragment>
                <FiltersPickWrapper
                  addFilter=***REMOVED***addFilter***REMOVED***
                  appliedFilters=***REMOVED***appliedFilters***REMOVED***
                  close=***REMOVED***onToggleFilters***REMOVED***
                  filterToFocus=***REMOVED***filterToFocus***REMOVED***
                  modelName=***REMOVED***this.getCurrentModelName()***REMOVED***
                  onChange=***REMOVED***onChange***REMOVED***
                  onSubmit=***REMOVED***this.handleSubmit***REMOVED***
                  removeAllFilters=***REMOVED***removeAllFilters***REMOVED***
                  removeFilter=***REMOVED***removeFilter***REMOVED***
                  schema=***REMOVED***this.getCurrentSchema()***REMOVED***
                  show=***REMOVED***showFilter***REMOVED***
                />
                <div className=***REMOVED***cn('row', styles.row)***REMOVED***>
                  <div className="col-md-10">
                    <Div
                      decreaseMarginBottom=***REMOVED***filters.length > 0***REMOVED***
                    >
                      <div className="row">
                        <AddFilterCTA onClick=***REMOVED***onToggleFilters***REMOVED*** showHideText=***REMOVED***showFilter***REMOVED*** />
                        ***REMOVED***filters.map(this.renderFilter)***REMOVED***
                      </div>
                    </Div>
                  </div>
                  <div className="col-md-2">
                    <div className=***REMOVED***cn(isOpen ? styles.listPageDropdownWrapperOpen : styles.listPageDropdownWrapperClose, styles.listPageDropdownWrapper, )***REMOVED***>
                      <ButtonDropdown isOpen=***REMOVED***isOpen***REMOVED*** toggle=***REMOVED***this.toggle***REMOVED*** direction="left">
                        <DropdownToggle />
                        <DropdownMenu>
                          <FormattedMessage id="content-manager.containers.ListPage.displayedFields">
                            ***REMOVED***this.renderDropdownHeader***REMOVED***
                          </FormattedMessage>
                          ***REMOVED***this.getAllModelFields().map(this.renderDropdown)***REMOVED***
                        </DropdownMenu>
                      </ButtonDropdown>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )***REMOVED***
            <div className=***REMOVED***cn('row', styles.row)***REMOVED***>
              <div className="col-md-12">
                <Table
                  deleteAllValue=***REMOVED***this.areAllEntriesSelected()***REMOVED***
                  entriesToDelete=***REMOVED***entriesToDelete***REMOVED***
                  enableBulkActions=***REMOVED***this.showBulkActions()***REMOVED***
                  filters=***REMOVED***filters***REMOVED***
                  handleDelete=***REMOVED***this.toggleModalWarning***REMOVED***
                  headers=***REMOVED***this.getTableHeaders()***REMOVED***
                  history=***REMOVED***this.props.history***REMOVED***
                  onChangeSort=***REMOVED***this.handleChangeSort***REMOVED***
                  onClickSelectAll=***REMOVED***onClickSelectAll***REMOVED***
                  onClickSelect=***REMOVED***onClickSelect***REMOVED***
                  onToggleDeleteAll=***REMOVED***onToggleDeleteAll***REMOVED***
                  primaryKey=***REMOVED***this.getModelPrimaryKey()***REMOVED***
                  records=***REMOVED***get(records, this.getCurrentModelName(), [])***REMOVED***
                  redirectUrl=***REMOVED***this.generateRedirectURI()***REMOVED***
                  route=***REMOVED***this.props.match***REMOVED***
                  routeParams=***REMOVED***this.props.match.params***REMOVED***
                  search=***REMOVED***params._q***REMOVED***
                  showLoader=***REMOVED***this.showLoaders()***REMOVED***
                  sort=***REMOVED***params._sort***REMOVED***
                />
                <PopUpWarning
                  isOpen=***REMOVED***this.state.showWarning***REMOVED***
                  toggleModal=***REMOVED***this.toggleModalWarning***REMOVED***
                  content=***REMOVED******REMOVED***
                    title: 'content-manager.popUpWarning.title',
                    message: 'content-manager.popUpWarning.bodyMessage.contentType.delete',
                    cancel: 'content-manager.popUpWarning.button.cancel',
                    confirm: 'content-manager.popUpWarning.button.confirm',
            ***REMOVED******REMOVED***
                  popUpWarningType="danger"
                  onConfirm=***REMOVED***this.handleDelete***REMOVED***
                />
                ***REMOVED***this.renderPopUpWarningDeleteAll()***REMOVED***
                <PageFooter
                  count=***REMOVED***get(count, this.getCurrentModelName(), 0)***REMOVED***
                  onChangeParams=***REMOVED***this.handleChangeParams***REMOVED***
                  params=***REMOVED***listPage.params***REMOVED***
                  style=***REMOVED******REMOVED*** marginTop: '2.9rem', padding: '0 15px 0 15px' ***REMOVED******REMOVED***
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

ListPage.propTypes = ***REMOVED***
  addAttr: PropTypes.func.isRequired,
  addFilter: PropTypes.func.isRequired,
  changeParams: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  deleteSeveralData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  listPage: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  onClickSelectAll: PropTypes.func.isRequired,
  onToggleDeleteAll: PropTypes.func.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  openFiltersWithSelections: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  removeAttr: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  resetDisplayedFields: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  setDisplayedFields: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
***REMOVED***;

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      addAttr,
      addFilter,
      changeParams,
      deleteData,
      deleteSeveralData,
      getData,
      onChange,
      onClickRemove,
      onClickSelect,
      onClickSelectAll,
      onToggleDeleteAll,
      onToggleFilters,
      openFiltersWithSelections,
      removeAllFilters,
      removeAttr,
      removeFilter,
      resetDisplayedFields,
      setDisplayedFields,
      setParams,
      submit,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const mapStateToProps = createStructuredSelector(***REMOVED***
  listPage: makeSelectListPage(),
  schema: makeSelectSchema(),
***REMOVED***);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer(***REMOVED*** key: 'listPage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'listPage', saga ***REMOVED***);

export default compose(withReducer, withSaga, withConnect)(ListPage);
