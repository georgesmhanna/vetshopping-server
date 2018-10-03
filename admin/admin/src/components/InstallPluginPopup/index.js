/*
*
* InstallPluginPopup
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** Modal, ModalHeader, ModalBody ***REMOVED*** from 'reactstrap';
import ***REMOVED*** map ***REMOVED*** from 'lodash';
import cn from 'classnames';

import Official from 'components/Official';
// import StarsContainer from 'components/StarsContainer';

import styles from './styles.scss';

class InstallPluginPopup extends React.Component ***REMOVED***
  handleClick = () => ***REMOVED***
    this.props.history.push(***REMOVED*** pathname: this.props.history.location.pathname ***REMOVED***);

    if (!this.props.isAlreadyInstalled) ***REMOVED***
      this.context.downloadPlugin(this.props.plugin.id);
***REMOVED***
***REMOVED***

  toggle = () => ***REMOVED***
    this.props.history.push(***REMOVED***
      pathname: this.props.history.location.pathname,
***REMOVED***);
***REMOVED***

  navLinks = [
    ***REMOVED***
      content: 'app.components.InstallPluginPopup.navLink.description',
      name: 'description',
***REMOVED***,
    ***REMOVED***
      content: 'app.components.InstallPluginPopup.navLink.screenshots',
      name: 'screenshots',
***REMOVED***,
    ***REMOVED***
      content: 'app.components.InstallPluginPopup.navLink.avis',
      name: 'avis',
***REMOVED***,
    ***REMOVED***
      content: 'app.components.InstallPluginPopup.navLink.faq',
      name: 'faq',
***REMOVED***,
    ***REMOVED***
      content: 'app.components.InstallPluginPopup.navLink.changelog',
      name: 'changelog',
***REMOVED***,
  ];

  render() ***REMOVED***
    const descriptions = ***REMOVED***
      short: this.props.plugin.id === 'support-us' ? <FormattedMessage id=***REMOVED***this.props.plugin.description.short***REMOVED*** /> : this.props.plugin.description.short,
      long: this.props.plugin.id === 'support-us' ? <FormattedMessage id=***REMOVED***this.props.plugin.description.long || this.props.plugin.description.short***REMOVED*** /> : this.props.plugin.description.long || this.props.plugin.description.short,
***REMOVED***;
    const buttonName = this.props.isAlreadyInstalled ? 'app.components.PluginCard.Button.label.install' : 'app.components.InstallPluginPopup.downloads';

    return (
      <Modal isOpen=***REMOVED***this.props.isOpen***REMOVED*** toggle=***REMOVED***this.toggle***REMOVED*** className=***REMOVED***styles.modalPosition***REMOVED***>
        <ModalHeader toggle=***REMOVED***this.toggle***REMOVED*** className=***REMOVED***styles.modalHeader***REMOVED*** />
        <ModalBody className=***REMOVED***styles.modalBody***REMOVED***>
          <div className=***REMOVED***styles.wrapper***REMOVED***>

            <div className=***REMOVED***styles.headerWrapper***REMOVED***>
              <div className=***REMOVED***styles.logo***REMOVED***><img src=***REMOVED***`$***REMOVED***this.props.plugin.logo***REMOVED***`***REMOVED*** alt="icon" /></div>
              <div className=***REMOVED***styles.headerInfo***REMOVED***>
                <div className=***REMOVED***styles.name***REMOVED***>***REMOVED***this.props.plugin.name***REMOVED***</div>
                <div className=***REMOVED***styles.ratings***REMOVED***>
                  ***REMOVED***/****REMOVED***
                  <StarsContainer ratings=***REMOVED***this.props.plugin.ratings***REMOVED*** />
                  <div>
                    <span style=***REMOVED******REMOVED*** fontWeight: '600', color: '#333740', fontSize: '12px'***REMOVED******REMOVED***>***REMOVED***this.props.plugin.ratings***REMOVED***</span>
                    <span style=***REMOVED******REMOVED*** fontWeight: '500', color: '#666666', fontSize: '11px' ***REMOVED******REMOVED***>/5</span>
                  </div>
                  */***REMOVED***
                  <Official style=***REMOVED******REMOVED*** marginTop: '0' ***REMOVED******REMOVED*** />
                </div>
                <div className=***REMOVED***styles.headerDescription***REMOVED***>
                  ***REMOVED***descriptions.short***REMOVED***
                </div>
                <div className=***REMOVED***styles.headerButtonContainer***REMOVED***>
                  <div>
                    <i className=***REMOVED***`fa fa-$***REMOVED***this.props.plugin.isCompatible ? 'check' : 'times'***REMOVED***`***REMOVED*** />
                    <FormattedMessage id=***REMOVED***`app.components.PluginCard.compatible$***REMOVED***this.props.plugin.id === 'support-us' ? 'Community' : ''***REMOVED***`***REMOVED*** />
                  </div>
                  <div>
                    <div>
                      ***REMOVED***/****REMOVED***
                      <span style=***REMOVED******REMOVED*** fontWeight: '600' ***REMOVED******REMOVED***>+***REMOVED***this.props.plugin.downloads_nb***REMOVED***k&nbsp;</span><FormattedMessage id="app.components.InstallPluginPopup.downloads" />
                      */***REMOVED***
                    </div>
                    <div className=***REMOVED***styles.buttonWrapper***REMOVED*** onClick=***REMOVED***this.handleClick***REMOVED***>
                      <div>
                        <FormattedMessage id=***REMOVED***buttonName***REMOVED*** />
                      </div>
                      ***REMOVED***/* Uncomment whebn prices are running***REMOVED***
                      <div>***REMOVED***this.props.plugin.price***REMOVED***&nbsp;€</div>
                    */***REMOVED***
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=***REMOVED***styles.navContainer***REMOVED***>
            ***REMOVED***map(this.navLinks, link => ***REMOVED***
              const isActive = this.props.history.location.hash.split('::')[1] === link.name;

              return (
                <div
                  key=***REMOVED***link.name***REMOVED***
                  className=***REMOVED***cn(isActive ? styles.navLink : '', link.name !== 'description' ? styles.notAllowed : '')***REMOVED***
                  onClick=***REMOVED***() => ***REMOVED***
                    if (link.name === 'description') ***REMOVED***
                      this.props.history.push(***REMOVED*** pathname: this.props.history.location.pathname, hash: `$***REMOVED***this.props.plugin.id***REMOVED***::$***REMOVED***link.name***REMOVED***` ***REMOVED***);
              ***REMOVED***
            ***REMOVED******REMOVED***
                  style=***REMOVED***isActive ? ***REMOVED*** paddingTop: '4px'***REMOVED*** : ***REMOVED*** paddingTop: '6px' ***REMOVED******REMOVED***
                >
                  <FormattedMessage id=***REMOVED***link.content***REMOVED*** />
                </div>
              );
      ***REMOVED***)***REMOVED***
          </div>
          <div className=***REMOVED***styles.pluginDescription***REMOVED***>
            ***REMOVED***descriptions.long***REMOVED***
          </div>
        </ModalBody>
      </Modal>
    );
***REMOVED***
***REMOVED***

InstallPluginPopup.contextTypes = ***REMOVED***
  downloadPlugin: PropTypes.func.isRequired,
***REMOVED***;

InstallPluginPopup.defaultProps = ***REMOVED***
  description: ***REMOVED***
    short: 'app.Components.InstallPluginPopup.noDescription',
***REMOVED***,
***REMOVED***;

InstallPluginPopup.propTypes = ***REMOVED***
  description: PropTypes.shape(***REMOVED***
    long: PropTypes.string,
    short: PropTypes.string,
***REMOVED***),
  history: PropTypes.object.isRequired,
  isAlreadyInstalled: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  plugin: PropTypes.object.isRequired,
***REMOVED***;

export default InstallPluginPopup;
