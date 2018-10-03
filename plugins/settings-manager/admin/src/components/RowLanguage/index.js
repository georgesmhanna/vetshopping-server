/**
*
* RowLanguage
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** find, get, join, isObject ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import PopUpWarning from 'components/PopUpWarning';
// utils
import getFlag, ***REMOVED*** formatLanguageLocale ***REMOVED*** from '../../utils/getFlag';

/* eslint-disable react/require-default-props  */
class RowLanguage extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      showWarning: false,
***REMOVED***;
***REMOVED***

  handleDeleteLanguage = () => ***REMOVED***
    this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);
    this.props.onDeleteLanguage(this.props.name);
***REMOVED***

  handleToggleWarning = () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);

  toggleWarning = () => this.setState(***REMOVED*** showWarning: !this.state.showWarning ***REMOVED***);

  render() ***REMOVED***
    // assign the target id the language name to prepare for delete
    const deleteIcon = this.props.active ? '' : <i className="fa fa-trash" style=***REMOVED******REMOVED*** fontSize: '1.1rem', color: 'rgba(14,22,34,0.75)'***REMOVED******REMOVED*** onClick=***REMOVED***this.handleToggleWarning***REMOVED*** id=***REMOVED***this.props.name***REMOVED*** />; // eslint-disable-line jsx-a11y/no-static-element-interactions
    // format the locale to
    const defaultLanguageArray = formatLanguageLocale(this.props.name);
    const flag = getFlag(defaultLanguageArray);
    // retrieve language name from i18n translation
    const languageObject = find(get(this.props.listLanguages, ['sections', '0', 'items', '0', 'items']), ['value', join(defaultLanguageArray, '_')]);
    // apply i18n
    const languageDisplay = isObject(languageObject) ? <FormattedMessage ***REMOVED***...***REMOVED*** id: `settings-manager.$***REMOVED***languageObject.name***REMOVED***` ***REMOVED******REMOVED*** /> : '';

    const languageLabel = this.props.active
      ? (
        <FormattedMessage id="settings-manager.list.languages.default.languages">
          ***REMOVED***(message) => (

            <div className=***REMOVED***this.props.liStyles.italicText***REMOVED*** >
              ***REMOVED***message***REMOVED***
            </div>
          )***REMOVED***
        </FormattedMessage>
      )
      : (
        // set the span's id with the language name to retrieve it
        <FormattedMessage id="settings-manager.list.languages.set.languages">
          ***REMOVED***(message) => (
            <button className=***REMOVED***this.props.liStyles.normal***REMOVED*** onClick=***REMOVED***this.props.onDefaultLanguageChange***REMOVED*** id=***REMOVED***this.props.name***REMOVED***>
              ***REMOVED***message***REMOVED***
            </button>
          )***REMOVED***
        </FormattedMessage>
      );

    return (
      <li style=***REMOVED******REMOVED***marginTop: '0'***REMOVED******REMOVED***>
        <div className=***REMOVED***this.props.liStyles.hoveredLanguage***REMOVED*** />
        <div className=***REMOVED***this.props.liStyles.language***REMOVED*** />
        <div className=***REMOVED***`$***REMOVED***this.props.liStyles.borderBottom***REMOVED*** $***REMOVED***this.props.liStyles.flexLiLanguage***REMOVED***`***REMOVED***>
          <div className=***REMOVED***`$***REMOVED***this.props.liStyles.flexed***REMOVED*** $***REMOVED***this.props.liStyles.flagContainer***REMOVED***`***REMOVED***>
            <div><span className=***REMOVED***`$***REMOVED***this.props.liStyles.flag***REMOVED*** flag-icon flag-icon-$***REMOVED***flag***REMOVED***`***REMOVED*** /></div>
            <div className=***REMOVED***`$***REMOVED***this.props.liStyles.label***REMOVED*** $***REMOVED***this.props.liStyles.capitalized***REMOVED***`***REMOVED***>***REMOVED***languageDisplay***REMOVED***</div>
          </div>
          <div className="text-center" style=***REMOVED******REMOVED*** width: '33%'***REMOVED******REMOVED***>***REMOVED***this.props.name***REMOVED***</div>
          <div style=***REMOVED******REMOVED***display:'flex', width: '33%'***REMOVED******REMOVED***>
            <div className=***REMOVED***this.props.liStyles.centered***REMOVED***>***REMOVED***languageLabel***REMOVED***</div>
            <div className=***REMOVED***this.props.liStyles.trashContainer***REMOVED***>***REMOVED***deleteIcon***REMOVED***</div>
          </div>
        </div>
        <div>
          <PopUpWarning
            isOpen=***REMOVED***this.state.showWarning***REMOVED***
            toggleModal=***REMOVED***this.toggleWarning***REMOVED***
            onConfirm=***REMOVED***this.handleDeleteLanguage***REMOVED***
            content=***REMOVED******REMOVED*** message: 'settings-manager.popUpWarning.languages.delete.message' ***REMOVED******REMOVED***
            popUpWarningType="danger"
          />
        </div>
      </li>
    );
***REMOVED***
***REMOVED***

RowLanguage.propTypes = ***REMOVED***
  active: PropTypes.bool,
  listLanguages: PropTypes.object,
  liStyles: PropTypes.object,
  name: PropTypes.string,
  onDefaultLanguageChange: PropTypes.func,
  onDeleteLanguage: PropTypes.func,
***REMOVED***;

export default RowLanguage;
