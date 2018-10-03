/**
 *
 * List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import cn from 'classnames';

import Li from 'components/Li';
import ListHeader from 'components/ListHeader';

import styles from './styles.scss';

const EmptyLi = () => (
  <li className=***REMOVED***styles.emptyLiWrapper***REMOVED***>
    <div>
      <FormattedMessage id="upload.EmptyLi.message" />
    </div>
  </li>
);

function List(props) ***REMOVED***
  return (
    <div className=***REMOVED***cn('container-fluid', styles.listWrapper)***REMOVED***>
      <div className="row">
        <ul className=***REMOVED***styles.ulList***REMOVED***>
          <ListHeader changeSort=***REMOVED***props.changeSort***REMOVED*** sort=***REMOVED***props.sort***REMOVED*** />
          ***REMOVED***props.data.map((item, key) => (
            <Li
              key=***REMOVED***item.hash || key***REMOVED***
              item=***REMOVED***item***REMOVED***
            />
          ))***REMOVED***
          ***REMOVED***props.data.length === 0 && <EmptyLi />***REMOVED***
        </ul>
      </div>
    </div>
  );
***REMOVED***

List.defaultProps = ***REMOVED***
  sort: 'id',
***REMOVED***;

List.propTypes = ***REMOVED***
  changeSort: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.string,
***REMOVED***;

export default List;
