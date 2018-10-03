/**
*
* ListRow
*
*/

import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** capitalize, get, includes ***REMOVED*** from 'lodash';
import ***REMOVED*** router ***REMOVED*** from 'app';

// Design
import IcoContainer from 'components/IcoContainer';
import PopUpWarning from 'components/PopUpWarning';

import en from 'translations/en.json';
import styles from './styles.scss';

class ListRow extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** showModalDelete: false ***REMOVED***;

  // Roles that can't be deleted && modified
  // Don't delete this line
  protectedRoleIDs = ['root'];

  // Roles that can't be deleted;
  undeletableIDs = ['public', 'authenticated'];

  generateContent = () => ***REMOVED***
    let icons = [
      ***REMOVED***
        icoType: 'pencil',
        onClick: this.handleClick,
***REMOVED***
      ***REMOVED***
        icoType: 'trash',
        onClick: () => ***REMOVED*** this.setState(***REMOVED*** showModalDelete: true ***REMOVED***); ***REMOVED***,
***REMOVED***
    ];

    switch (this.props.settingType) ***REMOVED***
      case 'roles':
        if (includes(this.protectedRoleIDs, get(this.props.item, 'type', ''))) ***REMOVED***
          icons = [];
  ***REMOVED***

        if (includes(this.undeletableIDs, get(this.props.item, 'type', ''))) ***REMOVED***
          icons = [***REMOVED*** icoType: 'pencil', onClick: this.handleClick ***REMOVED***];
  ***REMOVED***

        return (
          <div className=***REMOVED***cn('row', styles.wrapper)***REMOVED*** style=***REMOVED******REMOVED*** paddingLeft: '20px'***REMOVED******REMOVED***>
            <div className="col-md-2">
              <b>***REMOVED***this.props.item.name***REMOVED***</b>
            </div>
            <div className="col-md-7">
              ***REMOVED***this.props.item.description***REMOVED***
            </div>
            <div className="col-md-1">
              <strong>***REMOVED***this.props.item.nb_users || 0***REMOVED***</strong>&nbsp;
              ***REMOVED***this.props.item.nb_users > 1 ? (
                'users'
              ) : (
                'user'
              )***REMOVED***
            </div>
            <div className="col-md-2">
              <IcoContainer icons=***REMOVED***icons***REMOVED*** />
            </div>
          </div>
        );
      case 'providers':
        icons.pop(); // Remove the icon-trash

        return (
          <div className=***REMOVED***cn('row', styles.wrapper)***REMOVED***>
            <div className="col-md-4">
              <div className=***REMOVED***styles.flex***REMOVED***>
                <div>
                  <i className=***REMOVED***`fa fa-$***REMOVED***this.props.item.icon***REMOVED***`***REMOVED*** />
                </div>
                <div>
                  ***REMOVED***capitalize(this.props.item.name)***REMOVED***
                </div>
              </div>
            </div>
            <div className="col-md-6" style=***REMOVED******REMOVED*** fontWeight: '500' ***REMOVED******REMOVED***>
              ***REMOVED***get(this.props.values, [get(this.props.item, 'name'), 'enabled']) ? (
                <span style=***REMOVED******REMOVED*** color: '#5A9E06' ***REMOVED******REMOVED***>Enabled</span>
              ) : (
                <span style=***REMOVED******REMOVED*** color: '#F64D0A' ***REMOVED******REMOVED***>Disabled</span>
              )***REMOVED***
            </div>
            <div className="col-md-2">
              <IcoContainer icons=***REMOVED***icons***REMOVED*** />
            </div>
          </div>
        );

      case 'email-templates':
        icons.pop();

        return (
          <div className=***REMOVED***cn('row', styles.wrapper)***REMOVED***>
            <div className="col-md-4">
              <div className=***REMOVED***styles.flex***REMOVED***>
                <div>
                  <i className=***REMOVED***`fa fa-$***REMOVED***this.props.item.icon***REMOVED***`***REMOVED*** />
                </div>
                <div>
                  ***REMOVED***this.props.item.display && en[this.props.item.display] ? (
                    <FormattedMessage id=***REMOVED***`users-permissions.$***REMOVED***this.props.item.display***REMOVED***`***REMOVED*** />
                  ): this.props.item.name***REMOVED***
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <IcoContainer icons=***REMOVED***icons***REMOVED*** />
            </div>
          </div>
        );

      default:
        return '';
***REMOVED***
***REMOVED***

  handleClick = () => ***REMOVED***
    switch (this.props.settingType) ***REMOVED***
      case 'roles': ***REMOVED***
        if (!includes(this.protectedRoleIDs, get(this.props.item, 'type', ''))) ***REMOVED***
          return router.push(`$***REMOVED***router.location.pathname***REMOVED***/edit/$***REMOVED***this.props.item.id***REMOVED***`);
  ***REMOVED***
        return;
***REMOVED***
      case 'providers':
      case 'email-templates':
        return this.context.setDataToEdit(this.props.item.name);
      default:
        return;
***REMOVED***
***REMOVED***

  handleDelete = () => ***REMOVED***
    this.props.deleteData(this.props.item, this.props.settingType);
    this.setState(***REMOVED*** showModalDelete: false ***REMOVED***);
***REMOVED***

  render() ***REMOVED***
    return (
      <li className=***REMOVED***styles.li***REMOVED*** onClick=***REMOVED***this.handleClick***REMOVED***>
        <div className=***REMOVED***styles.container***REMOVED***>
          ***REMOVED***this.generateContent()***REMOVED***
        </div>
        <PopUpWarning
          isOpen=***REMOVED***this.state.showModalDelete***REMOVED***
          onConfirm=***REMOVED***this.handleDelete***REMOVED***
          toggleModal=***REMOVED***() => this.setState(***REMOVED*** showModalDelete: false ***REMOVED***)***REMOVED***
        />
      </li>
    );
***REMOVED***
***REMOVED***

ListRow.contextTypes = ***REMOVED***
  setDataToEdit: PropTypes.func.isRequired,
***REMOVED***;

ListRow.defaultProps = ***REMOVED***
  item: ***REMOVED***
    name: 'Owner',
    description: 'Rule them all. This role can\'t be deleted',
    nb_users: 1,
    icon: 'envelope',
***REMOVED***,
  settingType: 'roles',
***REMOVED***;

ListRow.propTypes = ***REMOVED***
  deleteData: PropTypes.func.isRequired,
  item: PropTypes.object,
  settingType: PropTypes.string,
  values: PropTypes.object.isRequired,
***REMOVED***;

export default ListRow;
