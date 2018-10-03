/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** connect ***REMOVED*** from 'react-redux';
import ***REMOVED*** createSelector ***REMOVED*** from 'reselect';
import ***REMOVED*** bindActionCreators ***REMOVED*** from 'redux';
import cn from 'classnames';

import ***REMOVED*** ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle ***REMOVED*** from 'reactstrap';

import ***REMOVED*** selectLocale ***REMOVED*** from 'containers/LanguageProvider/selectors';
import ***REMOVED*** changeLocale ***REMOVED*** from 'containers/LanguageProvider/actions';
import ***REMOVED*** languages ***REMOVED*** from 'i18n';

import styles from './styles.scss';

export class LocaleToggle extends React.Component ***REMOVED*** // eslint-disable-line
  state = ***REMOVED*** isOpen: false ***REMOVED***;

  getFlagUrl = (locale) => ***REMOVED***
    switch (locale) ***REMOVED***
      case 'en':
        return 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/us.svg';
      case 'pt-BR':
        return 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/br.svg';
      case 'zh':
      case 'zh-Hans':
        return 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/cn.svg';
      case 'ar':
        return 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/sa.svg';
      case 'ko':
        return 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/kr.svg';
      default:
        return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/$***REMOVED***locale***REMOVED***.svg`;
***REMOVED***
***REMOVED***

  toggle = () => this.setState(prevState => (***REMOVED*** isOpen: !prevState.isOpen ***REMOVED***));

  render() ***REMOVED***
    const ***REMOVED*** locale ***REMOVED*** = this.props;

    return (
      <div className=***REMOVED***styles.localeToggle***REMOVED***>
        <ButtonDropdown isOpen=***REMOVED***this.state.isOpen***REMOVED*** toggle=***REMOVED***this.toggle***REMOVED***>
          <DropdownToggle className=***REMOVED***styles.localeDropdownContent***REMOVED***>
            <span>***REMOVED***locale***REMOVED***</span>
            <img src=***REMOVED***this.getFlagUrl(locale)***REMOVED*** alt=***REMOVED***locale***REMOVED*** />
          </DropdownToggle>
          <DropdownMenu className=***REMOVED***cn(styles.localeDropdownMenu, this.props.isLogged ? '' : styles.localeDropdownMenuNotLogged)***REMOVED***>
            ***REMOVED***languages.map(language => (
              <DropdownItem key=***REMOVED***language***REMOVED*** onClick=***REMOVED***() => this.props.changeLocale(language)***REMOVED*** className=***REMOVED***cn(styles.localeToggleItem, locale === language ? styles.localeToggleItemActive : '')***REMOVED***>
                ***REMOVED***language.toUpperCase()***REMOVED***
              </DropdownItem>
            ))***REMOVED***
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
***REMOVED***
***REMOVED***



LocaleToggle.propTypes = ***REMOVED***
  changeLocale: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
***REMOVED***;

const mapStateToProps = createSelector(
  selectLocale(),
  (locale) => (***REMOVED*** locale ***REMOVED***)
);

function mapDispatchToProps(dispatch) ***REMOVED***
  return bindActionCreators(
    ***REMOVED***
      changeLocale,
***REMOVED***,
    dispatch,
  );
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
