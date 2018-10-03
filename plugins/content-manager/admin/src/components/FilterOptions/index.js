/**
 *
 * FilterOptions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** get ***REMOVED*** from 'lodash';
import cn from 'classnames';

import InputSelect from 'components/InputSelect/Loadable';

import Add from './Add';
import Div from './Div';
import InputWithAutoFocus from './InputWithAutoFocus';
import Remove from './Remove';
import styles from './styles.scss';

import getFilters from './filterTypes';

const defaultInputStyle = ***REMOVED*** width: '210px', marginRight: '10px', paddingTop: '4px' ***REMOVED***;
const midSelectStyle = ***REMOVED*** minWidth: '130px', maxWidth: '200px', marginLeft: '10px', marginRight: '10px' ***REMOVED***;

function FilterOptions(***REMOVED*** filter, filterToFocus, index, onChange, onClickAdd, onClickRemove, schema, show, showAddButton ***REMOVED***) ***REMOVED***
  const selectStyle = ***REMOVED*** minWidth: '170px', maxWidth: '200px' ***REMOVED***;
  const attrType = get(schema, [filter.attr, 'type'], 'string');
  const inputStyle = attrType === 'boolean' ?
    Object.assign(selectStyle, ***REMOVED*** minWidth: '100px'***REMOVED***)
    : defaultInputStyle;

  // This component is needed in order to add the date icon inside the InputDate
  const isDate = get(schema, [filter.attr, 'type'], 'string') === 'date';
  const isBool = get(schema, [filter.attr, 'type']) === 'boolean';
  const selectOptionsSchema = Object
    .keys(schema)
    .filter(x => schema[x].type !== 'json');

  return (
    <Div borderLeft=***REMOVED***!showAddButton || get(filter, 'value', '') !== ''***REMOVED***>
      <div className=***REMOVED***styles.filterOptionsWrapper***REMOVED***>
        <Remove type="button" onClick=***REMOVED***() => onClickRemove(index)***REMOVED*** />
        <InputSelect
          onChange=***REMOVED***onChange***REMOVED***
          name=***REMOVED***`$***REMOVED***index***REMOVED***.attr`***REMOVED***
          value=***REMOVED***get(filter, 'attr', '')***REMOVED***
          selectOptions=***REMOVED***selectOptionsSchema***REMOVED***
          style=***REMOVED***selectStyle***REMOVED***
        />
        <InputSelect
          onChange=***REMOVED***onChange***REMOVED***
          name=***REMOVED***`$***REMOVED***index***REMOVED***.filter`***REMOVED***
          value=***REMOVED***get(filter, 'filter', '=')***REMOVED***
          selectOptions=***REMOVED***getFilters(attrType)***REMOVED***
          style=***REMOVED***midSelectStyle***REMOVED***
        />
        <div className=***REMOVED***cn(isDate ? styles.filterOptionsInputWrapper : '')***REMOVED***>
          ***REMOVED***show && (
            <InputWithAutoFocus
              filter=***REMOVED***filter***REMOVED***
              filterToFocus=***REMOVED***filterToFocus***REMOVED***
              index=***REMOVED***index***REMOVED***
              inputStyle=***REMOVED***inputStyle***REMOVED***
              name=***REMOVED***`$***REMOVED***index***REMOVED***.value`***REMOVED***
              onChange=***REMOVED***onChange***REMOVED***
              schema=***REMOVED***schema***REMOVED***
              style=***REMOVED***inputStyle***REMOVED***
              value=***REMOVED***get(filter, 'value')***REMOVED***
            />
          )***REMOVED***
        </div>
        ***REMOVED***showAddButton && (
          <Add
            onClick=***REMOVED***onClickAdd***REMOVED***
            style=***REMOVED******REMOVED*** marginLeft: isBool? '14px': '6px' ***REMOVED******REMOVED***
            type="button"
          />
        )***REMOVED***
      </div>
    </Div>
  );
***REMOVED***

FilterOptions.defaultProps = ***REMOVED***
  filter: ***REMOVED******REMOVED***,
  filterToFocus: null,
  index: 0,
  onChange: () => ***REMOVED******REMOVED***,
  onClickAdd: () => ***REMOVED******REMOVED***,
  onClickRemove: () => ***REMOVED******REMOVED***,
  schema: ***REMOVED******REMOVED***,
  show: false,
  showAddButton: false,
***REMOVED***;

FilterOptions.propTypes = ***REMOVED***
  filter: PropTypes.object,
  filterToFocus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  index: PropTypes.number,
  onChange: PropTypes.func,
  onClickAdd: PropTypes.func,
  onClickRemove: PropTypes.func,
  schema: PropTypes.object,
  show: PropTypes.bool,
  showAddButton: PropTypes.bool,
***REMOVED***;

export default FilterOptions;
