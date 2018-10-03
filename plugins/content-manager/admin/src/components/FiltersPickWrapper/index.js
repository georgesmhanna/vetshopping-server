/**
 *
 * FiltersPickWrapper
 */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** isObject, size ***REMOVED*** from 'lodash';
import FilterOptions from 'components/FilterOptions/Loadable';

// You can find these components in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import PluginHeader from 'components/PluginHeader';

import Div from './Div';
import Flex from './Flex';
import SpanStyled from './SpanStyled';
import Wrapper from './Wrapper';
import styles from './wrapperStyles.scss';

class FiltersPickWrapper extends React.PureComponent ***REMOVED***
  state = ***REMOVED*** showInput: false ***REMOVED***;

  componentDidMount() ***REMOVED***
    // Display the first filter
    if (this.props.appliedFilters.length === 0) ***REMOVED***
      this.handleClickAdd();
***REMOVED***
***REMOVED***

  // Since the component is never unmounted we need this hook
  componentDidUpdate(prevProps) ***REMOVED***
    const ***REMOVED*** appliedFilters, show ***REMOVED*** = this.props;

    if (size(prevProps.appliedFilters) !== size(appliedFilters) && size(appliedFilters) === 0) ***REMOVED***
      this.handleClickAdd();
***REMOVED***

    if (prevProps.show !== show) ***REMOVED***
      if (show) ***REMOVED***
        this.mountInput();
***REMOVED*** else ***REMOVED***
        this.unmountInput();
***REMOVED***
***REMOVED***
***REMOVED***

  mountInput = () => this.setState(***REMOVED*** showInput: true ***REMOVED***);

  unmountInput = () => ***REMOVED***
    return new Promise(resolve => ***REMOVED***
      setTimeout(() => ***REMOVED***
        this.setState(***REMOVED*** showInput: false ***REMOVED***);
        resolve();
***REMOVED*** 300);
***REMOVED***);
***REMOVED***

  generateActions = () => ([
    ***REMOVED***
      label: 'content-manager.components.FiltersPickWrapper.PluginHeader.actions.clearAll',
      kind: 'secondary',
      onClick: () => ***REMOVED***
        this.props.close();
        this.props.removeAllFilters();
***REMOVED***
***REMOVED***,
    ***REMOVED***
      label: 'content-manager.components.FiltersPickWrapper.PluginHeader.actions.apply',
      kind: 'primary',
      type: 'submit',
      onClick: this.props.onSubmit,
***REMOVED***,
  ]);

  handleChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    const split = target.name.split('.');
    let value = target.value;

    // Reset the filter value when changing the field of the schema
    if (split[1] === 'attr') ***REMOVED***
      // Always set the filter to true when the field is a boolean
      const valueToChange = this.props.schema[target.value].type === 'boolean' ? 'true' : '';
      this.props.onChange(split[0], 'value', valueToChange);
***REMOVED***

    if (split[1] === 'value' && isObject(target.value) && target.value._isAMomentObject === true ) ***REMOVED***
      value = moment(target.value, 'YYYY-MM-DD HH:mm:ss').format();
***REMOVED***

    this.props.onChange(split[0], split[1], value);
***REMOVED***

  handleClickAdd = () => ***REMOVED***
    const ***REMOVED*** addFilter, schema ***REMOVED*** = this.props;
    const filter = ***REMOVED*** attr: Object.keys(schema)[0], filter: '=', value: '' ***REMOVED***;

    return addFilter(filter);
***REMOVED***

  handleClickClose = () => this.props.close();

  handleClickRemove = (index) => ***REMOVED***
    if (this.props.appliedFilters.length == 1) ***REMOVED***
      this.props.close();
      this.props.removeFilter(index);
      this.props.onSubmit();
***REMOVED***

    return this.props.removeFilter(index);
***REMOVED***

  shouldDisplayAddButton = (index) => ***REMOVED***
    const ***REMOVED*** appliedFilters ***REMOVED*** = this.props;

    return appliedFilters.length === 1 || index === appliedFilters.length - 1;
***REMOVED***

  renderTitle = () => (
    <FormattedMessage id="content-manager.components.FiltersPickWrapper.PluginHeader.title.filter">
      ***REMOVED***message => (
        <span>
          ***REMOVED***this.props.modelName***REMOVED***&nbsp;-&nbsp;
          <SpanStyled>
            ***REMOVED***message***REMOVED***
          </SpanStyled>
        </span>
      )***REMOVED***
    </FormattedMessage>
  );

  render() ***REMOVED***
    const ***REMOVED*** appliedFilters, filterToFocus, schema, show ***REMOVED*** = this.props;
    const ***REMOVED*** showInput ***REMOVED*** = this.state;
    const number = showInput ? (254 + ((size(appliedFilters) -1) * 44))   : 254;

    return (
      <Div show=***REMOVED***show***REMOVED*** number=***REMOVED***number***REMOVED*** anim=***REMOVED***showInput***REMOVED***>
        <form onSubmit=***REMOVED***this.handleSubmit***REMOVED*** autoComplete="off">
          <div>
            <PluginHeader
              actions=***REMOVED***this.generateActions()***REMOVED***
              description=***REMOVED******REMOVED***
                id: 'content-manager.components.FiltersPickWrapper.PluginHeader.description',
        ***REMOVED******REMOVED***
              title=***REMOVED***this.renderTitle()***REMOVED***
            />
            <Wrapper>
              ***REMOVED*** showInput && appliedFilters.map((filter, key) => (
                <FilterOptions
                  key=***REMOVED***key***REMOVED***
                  filter=***REMOVED***filter***REMOVED***
                  filterToFocus=***REMOVED***filterToFocus***REMOVED***
                  index=***REMOVED***key***REMOVED***
                  onChange=***REMOVED***this.handleChange***REMOVED***
                  onClickAdd=***REMOVED***this.handleClickAdd***REMOVED***
                  onClickRemove=***REMOVED***this.handleClickRemove***REMOVED***
                  schema=***REMOVED***schema***REMOVED***
                  show=***REMOVED***showInput***REMOVED***
                  showAddButton=***REMOVED***this.shouldDisplayAddButton(key)***REMOVED***
                />
              ))***REMOVED***
              ***REMOVED***!showInput && <div style=***REMOVED******REMOVED***height: '34px'***REMOVED******REMOVED*** />***REMOVED***
            </Wrapper>
          </div>
          <Flex>
            <span onClick=***REMOVED***this.handleClickClose***REMOVED*** className=***REMOVED***styles.spanStyled***REMOVED***>
              <FormattedMessage id="content-manager.components.FiltersPickWrapper.hide" />
              &nbsp;
            </span>
          </Flex>
        </form>
      </Div>
    );
***REMOVED***
***REMOVED***

FiltersPickWrapper.defaultProps = ***REMOVED***
  appliedFilters: [],
  filterToFocus: null,
  modelName: '',
  schema: ***REMOVED******REMOVED***,
***REMOVED***;

FiltersPickWrapper.propTypes = ***REMOVED***
  addFilter: PropTypes.func.isRequired,
  appliedFilters: PropTypes.array,
  close: PropTypes.func.isRequired,
  filterToFocus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  modelName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  schema: PropTypes.object,
  show: PropTypes.bool.isRequired,
***REMOVED***;

export default FiltersPickWrapper;
