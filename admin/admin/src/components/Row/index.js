/*
*
* Row
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** includes, isEmpty ***REMOVED*** from 'lodash';

// Design
import IcoContainer from 'components/IcoContainer';
import ListRow from 'components/ListRow';
import PopUpWarning from 'components/PopUpWarning';

import styles from './styles.scss';

const PLUGINS_WITH_CONFIG = ['content-manager', 'email', 'upload'];

class Row extends React.Component ***REMOVED***
  state = ***REMOVED*** showModal: false ***REMOVED***;

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.pluginActionSucceeded !== this.props.pluginActionSucceeded) ***REMOVED***
      this.setState(***REMOVED*** showModal: false ***REMOVED***);
***REMOVED***
***REMOVED***

  handleClick = (e) => ***REMOVED***
    this.setState(***REMOVED*** showModal: !this.state.showModal ***REMOVED***);
    this.props.onDeleteClick(e);
***REMOVED***

  render() ***REMOVED***
    // const uploadPath = `/plugins/upload/configurations/$***REMOVED***this.context.currentEnvironment***REMOVED***`;
    // Make sure to match the ctm config URI instead of content-type view URI
    const settingsPath = this.props.name === 'content-manager' ? '/plugins/content-manager/ctm-configurations' : `/plugins/$***REMOVED***this.props.name***REMOVED***/configurations/$***REMOVED***this.context.currentEnvironment***REMOVED***`; 
    // const icons = this.props.name === 'upload' || this.props.name === 'email' ? [
    const icons = includes(PLUGINS_WITH_CONFIG, this.props.name) ? [
      ***REMOVED***
        icoType: 'cog',
        onClick: (e) => ***REMOVED***
          e.preventDefault();
          e.stopPropagation();
          this.context.router.history.push(settingsPath);
  ***REMOVED***
***REMOVED***
      ***REMOVED***
        icoType: 'trash',
        id: this.props.name,
        onClick: this.handleClick,
***REMOVED***
    ] : [
      ***REMOVED***
        icoType: 'trash',
        id: this.props.name,
        onClick: this.handleClick,
***REMOVED***
    ];

    return (
      <ListRow>
        <div className=***REMOVED***cn("col-md-11", styles.nameWrapper)***REMOVED***>
          <div className=***REMOVED***styles.icoContainer***REMOVED*** style=***REMOVED******REMOVED*** marginRight: '14px' ***REMOVED******REMOVED***>
            ***REMOVED***!isEmpty(this.props.plugin.logo) && <img src=***REMOVED***`$***REMOVED***this.props.plugin.logo***REMOVED***`***REMOVED*** alt="icon" />***REMOVED***
            ***REMOVED*** isEmpty(this.props.plugin.logo) && (
              <div className=***REMOVED***styles.icoWrapper***REMOVED***>
                <i className=***REMOVED***`fa fa-$***REMOVED***this.props.plugin.icon***REMOVED***`***REMOVED*** />
              </div>
            )***REMOVED***
          </div>
          <div className=***REMOVED***styles.pluginContent***REMOVED***>
            <span>***REMOVED***this.props.plugin.name***REMOVED*** —&nbsp;</span>
            <FormattedMessage id=***REMOVED***`$***REMOVED***this.props.plugin.description***REMOVED***.short`***REMOVED*** defaultMessage=***REMOVED***this.props.plugin.description***REMOVED*** />
          </div>
        </div>
        <div className="col-md-1">
          <div className=***REMOVED***styles.actionContainer***REMOVED***>
            <IcoContainer icons=***REMOVED***icons***REMOVED*** />
          </div>
        </div>
        <PopUpWarning
          isOpen=***REMOVED***this.state.showModal***REMOVED***
          toggleModal=***REMOVED***() => this.setState(***REMOVED*** showModal: !this.state.showModal ***REMOVED***)***REMOVED***
          popUpWarningType="danger"
          onConfirm=***REMOVED***this.props.onDeleteConfirm***REMOVED***
        />
      </ListRow>
    );
***REMOVED***
***REMOVED***

Row.contextTypes = ***REMOVED***
  currentEnvironment: PropTypes.string,
  router: PropTypes.object,
***REMOVED***;

Row.propTypes = ***REMOVED***
  name: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
  plugin: PropTypes.object.isRequired,
  pluginActionSucceeded: PropTypes.bool.isRequired,
***REMOVED***;

export default Row;
