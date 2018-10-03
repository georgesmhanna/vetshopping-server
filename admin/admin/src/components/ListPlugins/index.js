/*
*
*
* ListPlugins
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** map, size ***REMOVED*** from 'lodash';

// Design
import Button from 'components/Button';
import Row from 'components/Row';

import styles from './styles.scss';

class ListPlugins extends React.PureComponent ***REMOVED***
  render() ***REMOVED***
    const listSize = size(this.props.plugins);
    let titleType = listSize === 1 ? 'singular' : 'plural';

    if (listSize === 0) ***REMOVED***
      titleType = 'none';
***REMOVED***

    return (
      <div className=***REMOVED***styles.container***REMOVED***>
        <div className=***REMOVED***styles.titleContainer***REMOVED***>
          <div>
            <FormattedMessage id=***REMOVED***`app.components.listPlugins.title.$***REMOVED***titleType***REMOVED***`***REMOVED*** values=***REMOVED******REMOVED*** number: listSize***REMOVED******REMOVED*** />
          </div>
          <div>
            <Button
              label="app.components.listPlugins.button"
              onClick=***REMOVED***() => this.props.history.push('/install-plugin')***REMOVED***
              secondaryHotlineAdd
              style=***REMOVED******REMOVED*** display: 'none'***REMOVED******REMOVED***
            />
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className=***REMOVED***styles.ulContainer***REMOVED***>
              <ul>
                ***REMOVED***map(this.props.plugins, (plugin, key) => (
                  <Row
                    name=***REMOVED***key***REMOVED***
                    key=***REMOVED***plugin.name***REMOVED***
                    plugin=***REMOVED***plugin***REMOVED***
                    onDeleteClick=***REMOVED***this.props.onDeleteClick***REMOVED***
                    pluginActionSucceeded=***REMOVED***this.props.pluginActionSucceeded***REMOVED***
                    onDeleteConfirm=***REMOVED***this.props.onDeleteConfirm***REMOVED***
                  />
                ))***REMOVED***
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

ListPlugins.propTypes = ***REMOVED***
  history: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
  pluginActionSucceeded: PropTypes.bool.isRequired,
  plugins: PropTypes.object.isRequired,
***REMOVED***;

export default ListPlugins;
