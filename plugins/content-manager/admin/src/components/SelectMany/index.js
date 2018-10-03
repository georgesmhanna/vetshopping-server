/**
 *
 * SelectMany
 *
 */

import React from 'react';
import Select from 'react-select';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import ***REMOVED*** cloneDeep, isArray, isNull, isUndefined, get, findIndex, isEmpty ***REMOVED*** from 'lodash';

// Utils.
import request from 'utils/request';
import templateObject from 'utils/templateObject';

// CSS.
import 'react-select/dist/react-select.css';
// Component.
import SortableList from './SortableList';
// CSS.
import styles from './styles.scss';

class SelectMany extends React.PureComponent ***REMOVED***
  state = ***REMOVED***
    isLoading: true,
    options: [],
    toSkip: 0,
***REMOVED***;

  componentDidMount() ***REMOVED***
    this.getOptions('');
***REMOVED***

  componentDidUpdate(prevProps, prevState) ***REMOVED***
    if (isEmpty(prevProps.record) && !isEmpty(this.props.record)) ***REMOVED***
      const values = (get(this.props.record, this.props.relation.alias) || [])
        .map(el => (el.id || el._id));

      const options = this.state.options.filter(el => ***REMOVED***
        return !values.includes(el.value.id || el.value._id);
***REMOVED***);

      this.state.options = options;
***REMOVED***

    if (prevState.toSkip !== this.state.toSkip) ***REMOVED***
      this.getOptions('');
***REMOVED***
***REMOVED***

  getOptions = query => ***REMOVED***
    const params = ***REMOVED***
      _limit: 20,
      _start: this.state.toSkip,
      source: this.props.relation.plugin || 'content-manager',
***REMOVED***;

    // Set `query` parameter if necessary
    if (query) ***REMOVED***
      delete params._limit;
      delete params._skip;
      params[`$***REMOVED***this.props.relation.displayedAttribute***REMOVED***_contains`] = query;
***REMOVED***
    // Request URL
    const requestUrl = `/content-manager/explorer/$***REMOVED***this.props.relation.model ||
      this.props.relation.collection***REMOVED***`;

    // Call our request helper (see 'utils/request')
    return request(requestUrl, ***REMOVED***
      method: 'GET',
      params,
***REMOVED***)
      .then(response => ***REMOVED***
        const options = isArray(response)
          ? response.map(item => (***REMOVED***
            value: item,
            label: templateObject(***REMOVED*** mainField: this.props.relation.displayedAttribute ***REMOVED***, item)
              .mainField,
    ***REMOVED***))
          : [
            ***REMOVED***
              value: response,
              label: response[this.props.relation.displayedAttribute],
      ***REMOVED***
          ];

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
***REMOVED***;

  handleChange = value => ***REMOVED***
    // Remove new added value from available option;
    this.state.options = this.state.options.filter(el => 
      !((el.value._id || el.value.id) === (value.value.id || value.value._id))
    );

    this.props.onAddRelationalItem(***REMOVED***
      key: this.props.relation.alias,
      value: value.value,
***REMOVED***);
***REMOVED***;

  handleBottomScroll = () => ***REMOVED***
    this.setState(prevState => ***REMOVED***
      return ***REMOVED***
        toSkip: prevState.toSkip + 20,
***REMOVED***;
***REMOVED***);
***REMOVED***

  handleRemove = (index) => ***REMOVED***
    const values = get(this.props.record, this.props.relation.alias);

    // Add removed value from available option;
    const toAdd = ***REMOVED***
      value: values[index],
      label: templateObject(***REMOVED*** mainField: this.props.relation.displayedAttribute ***REMOVED***, values[index]).mainField,
***REMOVED***;

    this.setState(prevState => (***REMOVED***
      options: prevState.options.concat([toAdd]),
***REMOVED***));

    this.props.onRemoveRelationItem(***REMOVED***
      key: this.props.relation.alias,
      index,
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

  render() ***REMOVED***
    const description = this.props.relation.description ? (
      <p>***REMOVED***this.props.relation.description***REMOVED***</p>
    ) : (
      ''
    );
    const value = get(this.props.record, this.props.relation.alias) || [];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div className=***REMOVED***`form-group $***REMOVED***styles.selectMany***REMOVED*** $***REMOVED***value.length > 4 && styles.selectManyUpdate***REMOVED***`***REMOVED***>
        <label htmlFor=***REMOVED***this.props.relation.alias***REMOVED***>***REMOVED***this.props.relation.alias***REMOVED*** <span>(***REMOVED***value.length***REMOVED***)</span></label>
        ***REMOVED***description***REMOVED***
        <Select
          className=***REMOVED***`$***REMOVED***styles.select***REMOVED***`***REMOVED***
          id=***REMOVED***this.props.relation.alias***REMOVED***
          isLoading=***REMOVED***this.state.isLoading***REMOVED***
          onChange=***REMOVED***this.handleChange***REMOVED***
          onMenuScrollToBottom=***REMOVED***this.handleBottomScroll***REMOVED***
          options=***REMOVED***this.state.options***REMOVED***    
          placeholder=***REMOVED***<FormattedMessage id='content-manager.containers.Edit.addAnItem' />***REMOVED***
        />
        <SortableList
          items=***REMOVED***
            isNull(value) || isUndefined(value) || value.size === 0
              ? null
              : value.map(item => ***REMOVED***

                if (item) ***REMOVED***
                  return ***REMOVED***
                    value: get(item, 'value') || item,
                    label:
                        get(item, 'label') ||
                        templateObject(***REMOVED*** mainField: this.props.relation.displayedAttribute ***REMOVED***, item)
                          .mainField ||
                        item.id,
            ***REMOVED***;
          ***REMOVED***
        ***REMOVED***)
    ***REMOVED***
          isDraggingSibling=***REMOVED***this.props.isDraggingSibling***REMOVED***
          keys=***REMOVED***this.props.relation.alias***REMOVED***
          moveAttr=***REMOVED***this.props.moveAttr***REMOVED***
          moveAttrEnd=***REMOVED***this.props.moveAttrEnd***REMOVED***
          onRemove=***REMOVED***this.handleRemove***REMOVED***
          distance=***REMOVED***1***REMOVED***
          onClick=***REMOVED***this.handleClick***REMOVED***
        />
      </div>
    );
    /* eslint-disable jsx-a11y/label-has-for */
***REMOVED***
***REMOVED***

SelectMany.defaultProps = ***REMOVED***
  isDraggingSibling: false,
  moveAttr: () => ***REMOVED******REMOVED***,
  moveAttrEnd: () => ***REMOVED******REMOVED***,
***REMOVED***;

SelectMany.propTypes = ***REMOVED***
  isDraggingSibling: PropTypes.bool,
  moveAttr: PropTypes.func,
  moveAttrEnd: PropTypes.func,
  onAddRelationalItem: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
  onRemoveRelationItem: PropTypes.func.isRequired,
  record: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  relation: PropTypes.object.isRequired,
***REMOVED***;

export default SelectMany;
