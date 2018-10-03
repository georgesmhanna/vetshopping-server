/*
 *
 * HomePage
 *
 */

import React from 'react';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import ***REMOVED*** createStructuredSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** size ***REMOVED*** from 'lodash';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import ***REMOVED*** router ***REMOVED*** from 'app';

import ***REMOVED*** makeSelectLoading, makeSelectMenu, makeSelectModels ***REMOVED*** from 'containers/App/selectors';
import ***REMOVED*** deleteContentType ***REMOVED*** from 'containers/App/actions';

import Form from 'containers/Form';

// Design
import ContentHeader from 'components/ContentHeader';
import EmptyContentTypeView from 'components/EmptyContentTypeView';
import TableList from 'components/TableList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ***REMOVED*** storeData ***REMOVED*** from '../../utils/storeData';

import selectHomePage from './selectors';
import styles from './styles.scss';
import saga from './sagas';
import reducer from './reducer';

export class HomePage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);

    this.popUpHeaderNavLinks = [
      ***REMOVED*** name: 'baseSettings', message: 'content-type-builder.popUpForm.navContainer.base', nameToReplace: 'advancedSettings' ***REMOVED***,
      ***REMOVED*** name: 'advancedSettings', message: 'content-type-builder.popUpForm.navContainer.advanced', nameToReplace: 'baseSettings' ***REMOVED***,
    ];
***REMOVED***

  handleButtonClick = () => ***REMOVED***
    if (storeData.getIsModelTemporary()) ***REMOVED***
      strapi.notification.info('content-type-builder.notification.info.contentType.creating.notSaved');
***REMOVED*** else ***REMOVED***
      this.toggleModal();
***REMOVED***
***REMOVED***

  handleDelete = (contentTypeName) => ***REMOVED***
    this.props.deleteContentType(contentTypeName, this.context);
***REMOVED***

  toggleModal = () => ***REMOVED***
    const locationHash = this.props.location.hash ? '' : '#create::contentType::baseSettings';
    router.push(`/plugins/content-type-builder/$***REMOVED***locationHash***REMOVED***`);
***REMOVED***

  renderTableListComponent = () => ***REMOVED***
    const availableNumber = size(this.props.models);
    const title = availableNumber > 1 ? 'content-type-builder.table.contentType.title.plural'
      : 'content-type-builder.table.contentType.title.singular';
    return (
      <TableList
        availableNumber=***REMOVED***availableNumber***REMOVED***
        title=***REMOVED***title***REMOVED***
        buttonLabel="content-type-builder.button.contentType.add"
        onButtonClick=***REMOVED***this.handleButtonClick***REMOVED***
        onHandleDelete=***REMOVED***this.handleDelete***REMOVED***
        rowItems=***REMOVED***this.props.models***REMOVED***
      />
    );
***REMOVED***

  render() ***REMOVED***
    const component = size(this.props.models) === 0 ?
      <EmptyContentTypeView handleButtonClick=***REMOVED***this.toggleModal***REMOVED*** />
      : this.renderTableListComponent();

    return (
      <div className=***REMOVED***styles.homePage***REMOVED***>
        <Helmet
          title="HomePage"
          meta=***REMOVED***[
            ***REMOVED*** name: 'description', content: 'Description of HomePage' ***REMOVED***,
          ]***REMOVED***
        />
        <ContentHeader
          name="content-type-builder.home.contentTypeBuilder.name"
          description="content-type-builder.home.contentTypeBuilder.description"
          styles=***REMOVED******REMOVED*** margin: '-1px 0 3rem 0'***REMOVED******REMOVED***
        />
        ***REMOVED***component***REMOVED***
        <Form
          hash=***REMOVED***this.props.location.hash***REMOVED***
          toggle=***REMOVED***this.toggleModal***REMOVED***
          routePath=***REMOVED***this.props.match.path***REMOVED***
          popUpHeaderNavLinks=***REMOVED***this.popUpHeaderNavLinks***REMOVED***
          menuData=***REMOVED***this.props.menu***REMOVED***
          redirectRoute=***REMOVED***`$***REMOVED***this.props.match.path***REMOVED***`***REMOVED***
        />
      </div>
    );
***REMOVED***
***REMOVED***

HomePage.contextTypes = ***REMOVED***
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func,
***REMOVED***;

HomePage.propTypes =  ***REMOVED***
  deleteContentType: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
  models: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
***REMOVED***;

const mapStateToProps = createStructuredSelector(***REMOVED***
  homePage: selectHomePage(),
  modelsLoading: makeSelectLoading(),
  models: makeSelectModels(),
  menu: makeSelectMenu(),
***REMOVED***);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      deleteContentType,
***REMOVED***,
    dispatch,
  );
***REMOVED***

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer(***REMOVED*** key: 'homePage', reducer ***REMOVED***);
const withSaga = injectSaga(***REMOVED*** key: 'homePage', saga ***REMOVED***);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
