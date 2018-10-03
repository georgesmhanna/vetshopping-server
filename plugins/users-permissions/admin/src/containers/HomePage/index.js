/*
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** injectIntl ***REMOVED*** from 'react-intl';
import ***REMOVED*** bindActionCreators, compose ***REMOVED*** from 'redux';
import cn from 'classnames';
import ***REMOVED*** clone, get, includes, isEqual, isEmpty ***REMOVED*** from 'lodash';

// Design
import EditForm from 'components/EditForm';
import HeaderNav from 'components/HeaderNav';
import List from 'components/List';
import PluginHeader from 'components/PluginHeader';
import PopUpForm from 'components/PopUpForm';

// Utils
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// Selectors
import selectHomePage from './selectors';

// Styles
import styles from './styles.scss';

// Actions
import ***REMOVED***
  cancelChanges,
  deleteData,
  fetchData,
  onChange,
  resetProps,
  setDataToEdit,
  setFormErrors,
  submit,
  unsetDataToEdit,
***REMOVED*** from './actions';

import reducer from './reducer';
import saga from './saga';

import checkFormValidity from './checkFormValidity';

const keyBoardShortCuts = [18, 78];

export class HomePage extends React.Component ***REMOVED***
  state = ***REMOVED*** mapKey: ***REMOVED******REMOVED***, showModalEdit: false ***REMOVED***;

  getChildContext = () => (
    ***REMOVED***
      setDataToEdit: this.props.setDataToEdit,
      unsetDataToEdit: this.props.unsetDataToEdit,
***REMOVED***
  );

  componentDidMount() ***REMOVED***
    this.props.fetchData(this.props.match.params.settingType);
    document.addEventListener('keydown', this.handleKeyBoardShortCut);
    document.addEventListener('keyup', this.handleKeyBoardShortCut);
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.dataToEdit !== this.props.dataToEdit) ***REMOVED***
      this.setState(***REMOVED*** showModalEdit: !isEmpty(nextProps.dataToEdit) ***REMOVED***);
***REMOVED***
***REMOVED***

  componentWillUpdate(nextProps) ***REMOVED***
    const allowedPaths = ['roles', 'providers', 'email-templates', 'advanced'];
    const shouldRedirect = allowedPaths.filter(el => el === nextProps.match.params.settingType).length === 0;

    if (shouldRedirect) ***REMOVED***
      this.props.history.push('/404');
***REMOVED***

    if (nextProps.didDeleteData !== this.props.didDeleteData) ***REMOVED***
      this.props.fetchData(nextProps.match.params.settingType);
***REMOVED***
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (prevProps.match.params.settingType !== this.props.match.params.settingType) ***REMOVED***
      this.props.fetchData(this.props.match.params.settingType);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    document.removeEventListener('keydown', this.handleKeyBoardShortCut);
    document.removeEventListener('keyup', this.handleKeyBoardShortCut);
    this.props.resetProps();
***REMOVED***

  getEndPoint = () => this.props.match.params.settingType;

  handleKeyBoardShortCut = (e) => ***REMOVED***
    if (includes(keyBoardShortCuts, e.keyCode)) ***REMOVED***
      const mapKey = clone(this.state.mapKey);
      mapKey[e.keyCode] = e.type === 'keydown';
      this.setState(***REMOVED*** mapKey ***REMOVED***);

      // Check if user pressed option + n;
      if (mapKey[18] && mapKey[78]) ***REMOVED***
        this.setState(***REMOVED*** mapKey: ***REMOVED******REMOVED*** ***REMOVED***);
        this.handleButtonClick();
***REMOVED***
***REMOVED***

***REMOVED***

  handleButtonClick = () => ***REMOVED***
    // TODO change open modal URL
    if (this.props.match.params.settingType === 'roles') ***REMOVED***
      this.props.history.push(`$***REMOVED***this.props.location.pathname***REMOVED***/create`);
***REMOVED*** else if (this.props.match.params.settingType === 'providers') ***REMOVED***
      this.props.history.push(`$***REMOVED***this.props.location.pathname***REMOVED***#add::$***REMOVED***this.props.match.params.settingType***REMOVED***`);
***REMOVED***
***REMOVED***

  handleSubmit = (e) => ***REMOVED***
    e.preventDefault();
    const modifiedObject = get(this.props.modifiedData, [this.getEndPoint(), this.props.dataToEdit]);
    const initObject = get(this.props.initialData, [this.getEndPoint(), this.props.dataToEdit]);
    const formErrors = checkFormValidity(this.props.match.params.settingType, modifiedObject, this.props.dataToEdit);

    if (isEqual(initObject, modifiedObject)) ***REMOVED***
      return this.props.unsetDataToEdit();
***REMOVED***

    if (isEmpty(formErrors)) ***REMOVED***
      this.setState(***REMOVED*** showModalEdit: false ***REMOVED***);
      this.props.submit(this.props.match.params.settingType);
***REMOVED*** else ***REMOVED***
      this.props.setFormErrors(formErrors);
***REMOVED***
***REMOVED***

  pluginHeaderActions = [
    ***REMOVED***
      label: 'users-permissions.EditPage.cancel',
      kind: 'secondary',
      onClick: () => this.props.cancelChanges(),
      type: 'button',
***REMOVED***,
    ***REMOVED***
      kind: 'primary',
      label: 'users-permissions.EditPage.submit',
      onClick: () => this.props.submit(this.props.match.params.settingType),
      type: 'submit',
***REMOVED***,
  ];

  showLoaders = () => ***REMOVED***
    const ***REMOVED*** data, isLoading, modifiedData ***REMOVED*** = this.props;
    const isAdvanded = this.getEndPoint() === 'advanced';
    
    return isLoading && get(data, this.getEndPoint()) === undefined && !isAdvanded || isLoading && isAdvanded &&  get(modifiedData, this.getEndPoint()) === undefined;
***REMOVED***

  render() ***REMOVED***
    const ***REMOVED*** data, didCheckErrors, formErrors, modifiedData, initialData, match, dataToEdit ***REMOVED*** = this.props;
    const headerActions = match.params.settingType === 'advanced' && !isEqual(modifiedData, initialData) ?
      this.pluginHeaderActions : [];
    const noButtonList = match.params.settingType === 'email-templates' || match.params.settingType === 'providers';
    const component = match.params.settingType === 'advanced' ?
      <EditForm onChange=***REMOVED***this.props.onChange***REMOVED*** values=***REMOVED***get(modifiedData, this.getEndPoint(), ***REMOVED******REMOVED***)***REMOVED*** showLoaders=***REMOVED***this.showLoaders()***REMOVED*** /> : (
        <List
          data=***REMOVED***get(data, this.getEndPoint(), [])***REMOVED***
          deleteData=***REMOVED***this.props.deleteData***REMOVED***
          noButton=***REMOVED***noButtonList***REMOVED***
          onButtonClick=***REMOVED***this.handleButtonClick***REMOVED***
          settingType=***REMOVED***match.params.settingType***REMOVED***
          showLoaders=***REMOVED***this.showLoaders()***REMOVED***
          values=***REMOVED***get(modifiedData, this.getEndPoint(), ***REMOVED******REMOVED***)***REMOVED***
        />
      );
    
    return (
      <div>
        <form onSubmit=***REMOVED***(e) => e.preventDefault()***REMOVED***>
          <div className=***REMOVED***cn('container-fluid', styles.containerFluid)***REMOVED***>
            <PluginHeader
              title=***REMOVED******REMOVED*** id: 'users-permissions.HomePage.header.title' ***REMOVED******REMOVED***
              description=***REMOVED******REMOVED*** id: 'users-permissions.HomePage.header.description' ***REMOVED******REMOVED***
              actions=***REMOVED***headerActions***REMOVED***
            />
            <HeaderNav />
            ***REMOVED***component***REMOVED***
          </div>
          <PopUpForm
            actionType="edit"
            isOpen=***REMOVED***this.state.showModalEdit***REMOVED***
            dataToEdit=***REMOVED***dataToEdit***REMOVED***
            didCheckErrors=***REMOVED***didCheckErrors***REMOVED***
            formErrors=***REMOVED***formErrors***REMOVED***
            onChange=***REMOVED***this.props.onChange***REMOVED***
            onSubmit=***REMOVED***this.handleSubmit***REMOVED***
            settingType=***REMOVED***match.params.settingType***REMOVED***
            values=***REMOVED***get(modifiedData,[this.getEndPoint(), dataToEdit], ***REMOVED******REMOVED***)***REMOVED***
          />
        </form>
      </div>
    );
***REMOVED***
***REMOVED***

HomePage.childContextTypes = ***REMOVED***
  setDataToEdit: PropTypes.func,
  unsetDataToEdit: PropTypes.func,
***REMOVED***;

HomePage.defaultProps = ***REMOVED******REMOVED***;

HomePage.propTypes = ***REMOVED***
  cancelChanges: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  dataToEdit: PropTypes.string.isRequired,
  deleteData: PropTypes.func.isRequired,
  didCheckErrors: PropTypes.bool.isRequired,
  didDeleteData: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  formErrors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  initialData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  modifiedData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  resetProps: PropTypes.func.isRequired,
  setDataToEdit: PropTypes.func.isRequired,
  setFormErrors: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  unsetDataToEdit: PropTypes.func.isRequired,
***REMOVED***;


function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      cancelChanges,
      deleteData,
      fetchData,
      onChange,
      resetProps,
      setDataToEdit,
      setFormErrors,
      submit,
      unsetDataToEdit,
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
