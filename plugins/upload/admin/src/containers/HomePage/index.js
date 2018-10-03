/*
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
// import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** injectIntl ***REMOVED*** from 'react-intl';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** isEmpty ***REMOVED*** from 'lodash';

// You can find these components in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import ContainerFluid from 'components/ContainerFluid';
import InputSearch from 'components/InputSearch';
// import InputSelect from 'components/InputSelect';
import PageFooter from 'components/PageFooter';
import PluginHeader from 'components/PluginHeader';

// Plugin's component
import EntriesNumber from 'components/EntriesNumber';
import List from 'components/List';
import PluginInputFile from 'components/PluginInputFile';

// Utils
import getQueryParameters from 'utils/getQueryParameters';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// Actions
import ***REMOVED***
  changeParams,
  deleteData,
  getData,
  onDrop,
  onSearch,
  setParams,
***REMOVED*** from './actions';

// Selectors
import selectHomePage from './selectors';

// Styles
import styles from './styles.scss';

import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.Component ***REMOVED***
  getChildContext = () => (
    ***REMOVED***
      deleteData: this.props.deleteData,
***REMOVED***
  );

  componentWillMount() ***REMOVED***
    if (!isEmpty(this.props.location.search)) ***REMOVED***
      const _page = parseInt(this.getURLParams('_page'), 10);
      const _limit = parseInt(this.getURLParams('_limit'), 10);
      const _sort = this.getURLParams('_sort');

      this.props.setParams(***REMOVED*** _limit, _page, _sort ***REMOVED***);
***REMOVED***
***REMOVED***
  componentDidMount() ***REMOVED***
    this.props.getData();
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.deleteSuccess !== this.props.deleteSuccess) ***REMOVED***
      this.props.getData();
***REMOVED***
    if (nextProps.location.search !== this.props.location.search) ***REMOVED***
      this.props.getData();
***REMOVED***
***REMOVED***

  getURLParams = (type) => getQueryParameters(this.props.location.search, type);

  changeSort = (name) => ***REMOVED***
    const ***REMOVED*** params: ***REMOVED*** _limit, _page ***REMOVED*** ***REMOVED*** = this.props;
    const target = ***REMOVED***
      name: 'params._sort',
      value: name,
***REMOVED***;
    const search = `_page=$***REMOVED***_page***REMOVED***&_limit=$***REMOVED***_limit***REMOVED***&_sort=$***REMOVED***name***REMOVED***`;

    this.props.changeParams(***REMOVED*** target ***REMOVED***);
    this.props.history.push(***REMOVED***
      pathname: this.props.history.pathname,
      search,
***REMOVED***);
***REMOVED***

  handleChangeParams = (e) => ***REMOVED***
    const ***REMOVED*** history, params ***REMOVED*** = this.props;
    const search = e.target.name === 'params._limit' ?
      `_page=$***REMOVED***params._page***REMOVED***&_limit=$***REMOVED***e.target.value***REMOVED***&_sort=$***REMOVED***params._sort***REMOVED***`
      : `_page=$***REMOVED***e.target.value***REMOVED***&_limit=$***REMOVED***params._limit***REMOVED***&_sort=$***REMOVED***params._sort***REMOVED***`;
    this.props.history.push(***REMOVED***
      pathname: history.pathname,
      search,
***REMOVED***);

    this.props.changeParams(e);
***REMOVED***

  renderInputSearch = () => (
    <InputSearch
      autoFocus
      name="search"
      onChange=***REMOVED***this.props.onSearch***REMOVED***
      placeholder="upload.HomePage.InputSearch.placeholder"
      style=***REMOVED******REMOVED*** marginTop: '-10px' ***REMOVED******REMOVED***
      value=***REMOVED***this.props.search***REMOVED***
    />
  )

  render() ***REMOVED***
    return (
      <ContainerFluid>
        <div className=***REMOVED***styles.homePageUpload***REMOVED***>
          <PluginHeader
            title=***REMOVED******REMOVED***
              id: 'upload.HomePage.title',
      ***REMOVED******REMOVED***
            description=***REMOVED******REMOVED***
              id: 'upload.HomePage.description',
      ***REMOVED******REMOVED***
            overrideRendering=***REMOVED***this.renderInputSearch***REMOVED***
          />
        </div>
        <PluginInputFile
          name="files"
          onDrop=***REMOVED***this.props.onDrop***REMOVED***
          showLoader=***REMOVED***this.props.uploadFilesLoading***REMOVED***
        />
        <div className=***REMOVED***styles.entriesWrapper***REMOVED***>
          <div>
            ***REMOVED***/* NOTE: Prepare for bulk actions***REMOVED***
              <InputSelect
              name="bulkAction"
              onChange=***REMOVED***() => console.log('change')***REMOVED***
              selectOptions=***REMOVED***[***REMOVED*** value: 'select all'***REMOVED***]***REMOVED***
              style=***REMOVED******REMOVED*** minWidth: '200px', height: '32px', marginTop: '-8px' ***REMOVED******REMOVED***
              />
            */***REMOVED***
          </div>
          <EntriesNumber number=***REMOVED***this.props.entriesNumber***REMOVED*** />
        </div>
        <List
          data=***REMOVED***this.props.uploadedFiles***REMOVED***
          changeSort=***REMOVED***this.changeSort***REMOVED***
          sort=***REMOVED***this.props.params._sort***REMOVED***
        />
        <div className="col-md-12">
          <PageFooter
            count=***REMOVED***this.props.entriesNumber***REMOVED***
            onChangeParams=***REMOVED***this.handleChangeParams***REMOVED***
            params=***REMOVED***this.props.params***REMOVED***
          />
        </div>
      </ContainerFluid>
    );
***REMOVED***
***REMOVED***

HomePage.childContextTypes = ***REMOVED***
  deleteData: PropTypes.func.isRequired,
***REMOVED***;

HomePage.contextTypes = ***REMOVED***
  router: PropTypes.object,
***REMOVED***;

HomePage.defaultProps = ***REMOVED***
  params: ***REMOVED***
    _limit: 10,
    _page: 1,
    _sort: 'updatedAt',
***REMOVED***,
  uploadedFiles: [],
***REMOVED***;

HomePage.propTypes = ***REMOVED***
  changeParams: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  entriesNumber: PropTypes.number.isRequired,
  getData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  params: PropTypes.object,
  search: PropTypes.string.isRequired,
  setParams: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.arrayOf(PropTypes.object),
  uploadFilesLoading: PropTypes.bool.isRequired,
***REMOVED***;

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      changeParams,
      deleteData,
      getData,
      onDrop,
      onSearch,
      setParams,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const mapStateToProps = selectHomePage();

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer(***REMOVED*** key: 'homePage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'homePage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(HomePage));
