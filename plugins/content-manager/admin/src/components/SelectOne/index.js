/**
 *
 * SelectOne
 *
 */

import React from 'react';
import Select from 'react-select';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';
import ***REMOVED*** cloneDeep, map, includes, isArray, isNull, isUndefined, isFunction, get, findIndex ***REMOVED*** from 'lodash';

import request from 'utils/request';
import templateObject from 'utils/templateObject';

import styles from './styles.scss';

class SelectOne extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);

    this.state = ***REMOVED***
      isLoading: true,
      options: [],
      toSkip: 0,
***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    this.getOptions('');
***REMOVED***

  componentDidUpdate(prevProps, prevState) ***REMOVED***
    if (prevState.toSkip !== this.state.toSkip) ***REMOVED***
      this.getOptions('');
***REMOVED***
***REMOVED***

  getOptions = (query) => ***REMOVED***
    const params = ***REMOVED***
      _limit: 20,
      _start: this.state.toSkip,
      source: this.props.relation.plugin || 'content-manager',
***REMOVED***;

    // Set `query` parameter if necessary
    if (query) ***REMOVED***
      delete params._limit;
      delete params._start;
      params[`$***REMOVED***this.props.relation.displayedAttribute***REMOVED***_contains`] = query;
***REMOVED***

    // Request URL
    const requestUrlSuffix = query && get(this.props.record, [this.props.relation.alias]) ? get(this.props.record, [this.props.relation.alias]) : '';
    const requestUrl = `/content-manager/explorer/$***REMOVED***this.props.relation.model || this.props.relation.collection***REMOVED***/$***REMOVED***requestUrlSuffix***REMOVED***`;

    // Call our request helper (see 'utils/request')
    return request(requestUrl, ***REMOVED***
      method: 'GET',
      params,
***REMOVED***)
      .then(response => ***REMOVED***
        const options = isArray(response) ?
          map(response, item => (***REMOVED***
            value: item,
            label: templateObject(***REMOVED*** mainField: this.props.relation.displayedAttribute ***REMOVED***, item).mainField,
    ***REMOVED***)) :
          [***REMOVED***
            value: response,
            label: templateObject(***REMOVED*** mainField: this.props.relation.displayedAttribute ***REMOVED***, response).mainField,
    ***REMOVED***];

        const newOptions = cloneDeep(this.state.options);
        options.map(option => ***REMOVED***
          // Don't add the values when searching
          if (findIndex(newOptions, o => o.value.id === option.value.id) === -1) ***REMOVED***
            return newOptions.push(option);
    ***REMOVED***
  ***REMOVED***);

        return this.setState(***REMOVED***
          options: newOptions,
          isLoading: false,
  ***REMOVED***);
***REMOVED***)
      .catch(() => ***REMOVED***
        strapi.notification.error('content-manager.notification.error.relationship.fetch');
***REMOVED***);
***REMOVED***

  handleChange = (value) => ***REMOVED***
    const target = ***REMOVED***
      name: `record.$***REMOVED***this.props.relation.alias***REMOVED***`,
      value,
      type: 'select',
***REMOVED***;

    this.props.setRecordAttribute(***REMOVED*** target ***REMOVED***);
***REMOVED***

  handleBottomScroll = () => ***REMOVED***
    this.setState(prevState => ***REMOVED***
      return ***REMOVED***
        toSkip: prevState.toSkip + 20,
***REMOVED***;
***REMOVED***);
***REMOVED***

  // Redirect to the edit page
  handleClick = (item = ***REMOVED******REMOVED***) => ***REMOVED***
    this.props.onRedirect(***REMOVED***
      model: this.props.relation.collection || this.props.relation.model,
      id: item.value.id || item.value._id,
      source: this.props.relation.plugin,
***REMOVED***);
***REMOVED***

  handleInputChange = (value) => ***REMOVED***
    const clonedOptions = this.state.options;
    const filteredValues = clonedOptions.filter(data => includes(data.label, value));

    if (filteredValues.length === 0) ***REMOVED***
      return this.getOptions(value);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    const description = this.props.relation.description
      ? <p>***REMOVED***this.props.relation.description***REMOVED***</p>
      : '';

    const value = get(this.props.record, this.props.relation.alias);
    const excludeModel = ['role', 'permission', 'file'].includes(this.props.relation.model || this.props.relation.collection); // Temporary.
    const entryLink = (isNull(value) || isUndefined(value) || excludeModel ? 
      '' : 
      (
        <FormattedMessage id='content-manager.containers.Edit.clickToJump'>
          ***REMOVED***title => (
            <a onClick=***REMOVED***() => this.handleClick(***REMOVED***value***REMOVED***)***REMOVED*** title=***REMOVED***title***REMOVED***><FormattedMessage id='content-manager.containers.Edit.seeDetails' /></a>
          )***REMOVED***
        </FormattedMessage>
      )
    );

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div className=***REMOVED***`form-group $***REMOVED***styles.selectOne***REMOVED***`***REMOVED***>
        <nav className=***REMOVED***styles.headline***REMOVED***>
          <label htmlFor=***REMOVED***this.props.relation.alias***REMOVED***>***REMOVED***this.props.relation.alias***REMOVED***</label>
          ***REMOVED***entryLink***REMOVED***
        </nav>
        ***REMOVED***description***REMOVED***
        <Select
          onChange=***REMOVED***this.handleChange***REMOVED***
          options=***REMOVED***this.state.options***REMOVED***
          isLoading=***REMOVED***this.state.isLoading***REMOVED***
          onMenuScrollToBottom=***REMOVED***this.handleBottomScroll***REMOVED***
          onInputChange=***REMOVED***this.handleInputChange***REMOVED***
          onSelectResetsInput=***REMOVED***false***REMOVED***
          simpleValue
          value=***REMOVED***isNull(value) || isUndefined(value) ? null : ***REMOVED***
            value: isFunction(value.toJS) ? value.toJS() : value,
            label: templateObject(***REMOVED*** mainField: this.props.relation.displayedAttribute ***REMOVED***, isFunction(value.toJS) ? value.toJS() : value).mainField || (isFunction(value.toJS) ? get(value.toJS(), 'id') : get(value, 'id')),
    ***REMOVED******REMOVED***
        />
      </div>
    );
    /* eslint-disable jsx-a11y/label-has-for */
***REMOVED***
***REMOVED***

SelectOne.propTypes = ***REMOVED***
  onRedirect: PropTypes.func.isRequired,
  record: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  relation: PropTypes.object.isRequired,
  setRecordAttribute: PropTypes.func.isRequired,
***REMOVED***;

export default SelectOne;
