/**
*
* InputSearchLi
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function InputSearchLi(***REMOVED*** onClick, isAdding, item ***REMOVED***) ***REMOVED***
  const icon = isAdding ? 'fa-plus' : 'fa-minus-circle';
  const liStyle = isAdding ? ***REMOVED*** cursor: 'pointer' ***REMOVED*** : ***REMOVED******REMOVED***;
  const handleClick = isAdding ? () => onClick(item) : () => ***REMOVED******REMOVED***;
  const path = `/admin/plugins/content-manager/user/$***REMOVED***item.id***REMOVED***?redirectUrl=/plugins/content-manager/user/?page=1&limit=20&sort=id&source=users-permissions`;

  return (
    <li className=***REMOVED***styles.li***REMOVED*** style=***REMOVED***liStyle***REMOVED*** onClick=***REMOVED***handleClick***REMOVED***>
      <div>
        <div className=***REMOVED***styles.container***REMOVED***>
          ***REMOVED***item.username***REMOVED***
          <a href=***REMOVED***`$***REMOVED***path***REMOVED***`***REMOVED*** target="_blank">
            <i className="fa fa-external-link" />
          </a>
        </div>
        <div
          onClick=***REMOVED***(e) => ***REMOVED***
            e.stopPropagation();
            e.preventDefault();
            onClick(item);
    ***REMOVED******REMOVED***
        >
          <i className=***REMOVED***`fa $***REMOVED***icon***REMOVED***`***REMOVED*** />
        </div>
      </div>
    </li>
  );
***REMOVED***

InputSearchLi.defaultProps = ***REMOVED***
  item: ***REMOVED***
    name: '',
***REMOVED***,
***REMOVED***;

InputSearchLi.propTypes = ***REMOVED***
  isAdding: PropTypes.bool.isRequired,
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
***REMOVED***;

export default InputSearchLi;
