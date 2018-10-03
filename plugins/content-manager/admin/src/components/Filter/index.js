/**
 *
 * Filter
 */


import React from 'react';
import moment from 'moment';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PropTypes from 'prop-types';
import ***REMOVED*** get, toString, upperFirst ***REMOVED*** from 'lodash';
import Flex from './Flex';
import Remove from './Remove';
import Separator from './Separator';


function Filter(***REMOVED*** filter, index, onClick, onClickOpen, schema ***REMOVED***) ***REMOVED***
  let value = filter.value;

  if (get(schema, [filter.attr, 'type']) === 'date') ***REMOVED***
    const date = moment(filter.value.slice(0, -1), moment.ISO_8601);
    const format = date.valueOf() === date.startOf('day').valueOf() ?
      'MMMM Do YYYY' :'MMMM Do YYYY, h:mm:ss a' ;
    value = date.format(format);
***REMOVED***

  return (
    <Flex
      onClick=***REMOVED***(e) => ***REMOVED***
        e.preventDefault();
        e.stopPropagation();
        onClickOpen(index);
***REMOVED******REMOVED***
    >
      <span>***REMOVED***upperFirst(filter.attr)***REMOVED***&nbsp;</span>
      <FormattedMessage id=***REMOVED***`content-manager.components.FilterOptions.FILTER_TYPES.$***REMOVED***filter.filter***REMOVED***`***REMOVED*** />
      <span>&nbsp;***REMOVED***toString(value)***REMOVED***</span>
      <Separator />
      <Remove
        onClick=***REMOVED***(e) => ***REMOVED***
          e.preventDefault();
          e.stopPropagation();
          onClick(index);
  ***REMOVED******REMOVED***
      />
    </Flex>
  );
***REMOVED***

Filter.defaultProps = ***REMOVED***
  filter: ***REMOVED******REMOVED***,
  index: 0,
  onClick: () => ***REMOVED******REMOVED***,
  onClickOpen: (e) => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
***REMOVED***,
  schema: ***REMOVED******REMOVED***,
***REMOVED***;

Filter.propTypes = ***REMOVED***
  filter: PropTypes.object,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onClickOpen: PropTypes.func,
  schema: PropTypes.object,
***REMOVED***;

export default Filter;
