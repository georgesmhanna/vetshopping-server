/**
*
* PluginCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ***REMOVED*** isEmpty, replace ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

// Temporary picture
import Button from 'components/Button';
import InstallPluginPopup from 'components/InstallPluginPopup';
import Official from 'components/Official';
// import StarsContainer from 'components/StarsContainer';

import logoTShirt from 'assets/images/logo-t-shirt.svg';
import styles from './styles.scss';
import Screenshot from './screenshot.png';

/* eslint-disable react/no-unused-state */
class PluginCard extends React.Component ***REMOVED***
  state = ***REMOVED*** isOpen: false, boostrapCol: 'col-lg-4' ***REMOVED***;

  componentDidMount() ***REMOVED***
    this.shouldOpenModal(this.props);
    window.addEventListener('resize', this.setBoostrapCol);
    this.setBoostrapCol();
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.history.location.hash !== this.props.history.location.hash) ***REMOVED***
      this.shouldOpenModal(nextProps);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    window.removeEventListener('resize', this.setBoostrapCol);
***REMOVED***

  setBoostrapCol = () => ***REMOVED***
    let boostrapCol = 'col-lg-4';

    if (window.innerWidth > 1680) ***REMOVED***
      boostrapCol = 'col-lg-3';
***REMOVED***

    if (window.innerWidth > 2300) ***REMOVED***
      boostrapCol = 'col-lg-2';
***REMOVED***

    this.setState(***REMOVED*** boostrapCol ***REMOVED***);
***REMOVED***

  handleClick = () => ***REMOVED***
    if (this.props.plugin.id !== 'support-us') ***REMOVED***
      this.props.history.push(***REMOVED***
        pathname: this.props.history.location.pathname,
        hash: `$***REMOVED***this.props.plugin.id***REMOVED***::description`,
***REMOVED***);
***REMOVED*** else ***REMOVED***
      this.aTag.click();
***REMOVED***
***REMOVED***

  handleDownloadPlugin = (e) => ***REMOVED***
    if (!this.props.isAlreadyInstalled && this.props.plugin.id !== 'support-us') ***REMOVED***
      this.props.downloadPlugin(e);
***REMOVED*** else if (this.props.plugin.id === 'support-us') ***REMOVED***
      this.aTag.click();
***REMOVED*** else ***REMOVED***
      this.props.history.push('/list-plugins');
***REMOVED***
***REMOVED***

  shouldOpenModal = (props) => ***REMOVED***
    this.setState(***REMOVED*** isOpen: !isEmpty(props.history.location.hash) ***REMOVED***);
***REMOVED***

  render() ***REMOVED***
    const buttonClass = !this.props.isAlreadyInstalled || this.props.showSupportUsButton ? styles.primary : styles.secondary;

    let buttonLabel = this.props.isAlreadyInstalled ? 'app.components.PluginCard.Button.label.install' : 'app.components.PluginCard.Button.label.download';

    if (this.props.showSupportUsButton) ***REMOVED***
      buttonLabel = 'app.components.PluginCard.Button.label.support';
***REMOVED***

    const pluginIcon = (
      <div className=***REMOVED***styles.frame***REMOVED***>
        <span className=***REMOVED***styles.helper***REMOVED*** />
        <img src=***REMOVED***`$***REMOVED***this.props.plugin.id === 'support-us' ? logoTShirt : this.props.plugin.logo***REMOVED***`***REMOVED*** alt="icon" />
      </div>
    );

    const descriptions = ***REMOVED***
      short: this.props.plugin.id === 'support-us' ? <FormattedMessage id=***REMOVED***this.props.plugin.description.short***REMOVED*** /> : this.props.plugin.description.short,
      long: this.props.plugin.id === 'support-us' ? <FormattedMessage id=***REMOVED***this.props.plugin.description.long || this.props.plugin.description.short***REMOVED*** /> : this.props.plugin.description.long || this.props.plugin.description.short,
***REMOVED***;

    return (
      <div className=***REMOVED***cn(this.state.boostrapCol, styles.pluginCard)***REMOVED*** onClick=***REMOVED***this.handleClick***REMOVED***>
        <div className=***REMOVED***styles.wrapper***REMOVED***>
          <div className=***REMOVED***styles.cardTitle***REMOVED***>
            ***REMOVED***pluginIcon***REMOVED***
            <div>***REMOVED***this.props.plugin.name***REMOVED***</div>
          </div>
          <div className=***REMOVED***styles.cardDescription***REMOVED***>
            ***REMOVED***descriptions.short***REMOVED***
            &nbsp;<FormattedMessage id="app.components.PluginCard.more-details" />
          </div>
          <div className=***REMOVED***styles.cardScreenshot***REMOVED*** style=***REMOVED******REMOVED*** backgroundImage: `url($***REMOVED***Screenshot***REMOVED***)` ***REMOVED******REMOVED***>

          </div>
          <div className=***REMOVED***styles.cardPrice***REMOVED***>
            <div>
              <i className=***REMOVED***`fa fa-$***REMOVED***this.props.plugin.isCompatible ? 'check' : 'times'***REMOVED***`***REMOVED*** />
              <FormattedMessage id=***REMOVED***`app.components.PluginCard.compatible$***REMOVED***this.props.plugin.id === 'support-us' ? 'Community' : ''***REMOVED***`***REMOVED*** />
            </div>
            <div>***REMOVED***this.props.plugin.price !== 0 ? `$***REMOVED***this.props.plugin.price***REMOVED***€` : ''***REMOVED***</div>
          </div>
          <div className=***REMOVED***styles.cardFooter***REMOVED*** onClick=***REMOVED***e => e.stopPropagation()***REMOVED***>
            <div className=***REMOVED***styles.ratings***REMOVED***>
              ***REMOVED***/*<StarsContainer ratings=***REMOVED***this.props.plugin.ratings***REMOVED*** />
              <div>
                <span style=***REMOVED******REMOVED*** fontWeight: '600', color: '#333740' ***REMOVED******REMOVED***>***REMOVED***this.props.plugin.ratings***REMOVED***</span>
                <span style=***REMOVED******REMOVED*** fontWeight: '500', color: '#666666' ***REMOVED******REMOVED***>/5</span>
              </div>
              */***REMOVED***
              <Official />
            </div>
            <div>
              <Button
                className=***REMOVED***cn(buttonClass, styles.button)***REMOVED***
                label=***REMOVED***buttonLabel***REMOVED***
                onClick=***REMOVED***this.handleDownloadPlugin***REMOVED***
              />
              <a
                href="https://strapi.io/shop"
                style=***REMOVED******REMOVED*** display: 'none' ***REMOVED******REMOVED***
                ref=***REMOVED***(a) => ***REMOVED*** this.aTag = a; ***REMOVED******REMOVED***
                target="_blank"
              >
                &nbsp;
              </a>
            </div>
          </div>
        </div>
        <InstallPluginPopup
          history=***REMOVED***this.props.history***REMOVED***
          isAlreadyInstalled=***REMOVED***this.props.isAlreadyInstalled***REMOVED***
          isOpen=***REMOVED***!isEmpty(this.props.history.location.hash) && replace(this.props.history.location.hash.split('::')[0], '#', '') === this.props.plugin.id***REMOVED***
          plugin=***REMOVED***this.props.plugin***REMOVED***
        />
      </div>
    );
***REMOVED***
***REMOVED***

PluginCard.defaultProps = ***REMOVED***
  isAlreadyInstalled: false,
  plugin: ***REMOVED***
    description: '',
    id: '',
    name: '',
    price: 0,
    ratings: 5,
***REMOVED***,
  showSupportUsButton: false,
***REMOVED***;

PluginCard.propTypes = ***REMOVED***
  downloadPlugin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAlreadyInstalled: PropTypes.bool,
  plugin: PropTypes.object,
  showSupportUsButton: PropTypes.bool,
***REMOVED***;

export default PluginCard;
