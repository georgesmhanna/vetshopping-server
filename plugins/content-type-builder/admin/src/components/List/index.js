/**
*
* List
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** map ***REMOVED*** from 'lodash';

import Button from 'components/Button';
import styles from './styles.scss';

class List extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  render() ***REMOVED***
    const title = this.props.renderCustomListTitle ?
      this.props.renderCustomListTitle(this.props, styles)
      : this.props.listContent.title;

    return (
      <div className=***REMOVED***styles.list***REMOVED***>
        <div className=***REMOVED***styles.flex***REMOVED***>
          ***REMOVED***title***REMOVED***
          <div className=***REMOVED***styles.buttonContainer***REMOVED***>
            <Button
              onClick=***REMOVED***this.props.onButtonClick***REMOVED***
              secondaryHotlineAdd
              label="content-type-builder.button.attributes.add"
            />
          </div>
        </div>
        <div className=***REMOVED***styles.ulContainer***REMOVED***>
          <ul>
            ***REMOVED***map(this.props.listContent[this.props.listContentMappingKey], (row, key) => ***REMOVED***
              if (this.props.renderCustomLi) return this.props.renderCustomLi(row, key);

              return (
                <li key=***REMOVED***key***REMOVED***>
                  ***REMOVED***row.name***REMOVED***
                </li>
              );
      ***REMOVED***)***REMOVED***
          </ul>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

List.propTypes = ***REMOVED***
  listContent: PropTypes.object,
  listContentMappingKey: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  renderCustomLi: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  renderCustomListTitle: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
***REMOVED***;

List.defaultProps = ***REMOVED***
  listContent: ***REMOVED******REMOVED***,
  onButtonClick: () => ***REMOVED******REMOVED***,
  renderCustomLi: false,
  renderCustomListTitle: false,
***REMOVED***;

export default List;
