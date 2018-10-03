/**
 *
 * Li
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** CopyToClipboard ***REMOVED*** from 'react-copy-to-clipboard';
import cn from 'classnames';
import moment from 'moment';

import FileIcon from 'components/FileIcon';
import IcoContainer from 'components/IcoContainer';
import PopUpWarning from 'components/PopUpWarning';

import styles from './styles.scss';

/* eslint-disable react/no-string-refs */
class Li extends React.Component ***REMOVED***
  state = ***REMOVED*** isOpen: false, copied: false ***REMOVED***;

  componentDidUpdate(prevProps, prevState) ***REMOVED***
    if (prevState.copied !== this.state.copied && this.state.copied) ***REMOVED***
      setTimeout(() => ***REMOVED***
        this.setState(***REMOVED*** copied: false ***REMOVED***);
***REMOVED*** 3000);
***REMOVED***
***REMOVED***

  getUnit = (value) => ***REMOVED***
    let unit;
    let divider;
    
    switch (true) ***REMOVED***
      case value > 1000000:
        unit = 'GB';
        divider = 1000000;
        break;
      case value < 1:
        unit = 'B';
        divider = .001;
        break;
      case value > 1000:
        unit = 'MB';
        divider = 1000;
        break;
      default:
        unit = 'KB';
        divider = 1;
***REMOVED***

    return ***REMOVED*** divider, unit ***REMOVED***;
***REMOVED***

  handleClick = (e) => ***REMOVED***
    e.preventDefault();
    const aTag = document.getElementById('aTag');
    aTag.click();
***REMOVED***

  handleDelete = (e) => ***REMOVED***
    e.preventDefault();
    this.context.deleteData(this.props.item);
***REMOVED***

  renderLiCopied = () => (
    <li className=***REMOVED***cn(styles.liWrapper, styles.copied)***REMOVED***>
      <div>
        <div className=***REMOVED***styles.checked***REMOVED***>
          <div />
        </div>
        <div>
          <FormattedMessage id="upload.Li.linkCopied" />
        </div>
      </div>
    </li>
  );

  render() ***REMOVED***
    const ***REMOVED*** item ***REMOVED*** = this.props;

    if (this.state.copied) ***REMOVED***
      return this.renderLiCopied();
***REMOVED***

    const icons = [
      // ***REMOVED***
      //   icoType: item.private ? 'lock' : 'unlock',
      //   onClick: () => ***REMOVED******REMOVED***,
      // ***REMOVED***,
      ***REMOVED***
        icoType: 'eye',
        onClick: this.handleClick,
***REMOVED***
      ***REMOVED***
        icoType: 'trash',
        onClick: () => this.setState(***REMOVED*** isOpen: true ***REMOVED***),
***REMOVED***
    ];

    return (
      <CopyToClipboard text=***REMOVED***item.url***REMOVED*** onCopy=***REMOVED***() => this.setState(***REMOVED***copied: true***REMOVED***)***REMOVED***>
        <li className=***REMOVED***styles.liWrapper***REMOVED***>
          <a href=***REMOVED***item.url***REMOVED*** target="_blank" style=***REMOVED******REMOVED*** display: 'none' ***REMOVED******REMOVED*** id="aTag">nothing</a>
          <div className=***REMOVED***styles.liContainer***REMOVED***>
            <div>
              <div />
              <FileIcon fileType=***REMOVED***item.ext***REMOVED*** />
            </div>
            ***REMOVED***['hash', 'name', 'updatedAt', 'size', 'relatedTo', ''].map((value, key) => ***REMOVED***
              if (value === 'updatedAt') ***REMOVED***
                return (
                  <div key=***REMOVED***key***REMOVED*** className=***REMOVED***styles.truncate***REMOVED***>***REMOVED***moment(item[value]).format('YYYY/MM/DD - HH:mm')***REMOVED***</div>
                );
        ***REMOVED***

              if (value === 'size') ***REMOVED***
                const ***REMOVED*** divider, unit ***REMOVED*** = this.getUnit(item[value]);
                const size = item[value]/divider;

                return (
                  <div key=***REMOVED***key***REMOVED*** className=***REMOVED***styles.truncate***REMOVED***>***REMOVED***Math.round(size * 100) / 100 ***REMOVED***&nbsp;***REMOVED***unit***REMOVED***</div>
                );
        ***REMOVED***

              if (value !== '') ***REMOVED***
                return (
                  <div key=***REMOVED***key***REMOVED*** className=***REMOVED***styles.truncate***REMOVED***>***REMOVED***item[value]***REMOVED***</div>
                );
        ***REMOVED***

              return <IcoContainer key=***REMOVED***key***REMOVED*** icons=***REMOVED***icons***REMOVED*** />;
      ***REMOVED***)***REMOVED***
          </div>
          <PopUpWarning
            isOpen=***REMOVED***this.state.isOpen***REMOVED***
            onConfirm=***REMOVED***this.handleDelete***REMOVED***
            toggleModal=***REMOVED***() => this.setState(***REMOVED*** isOpen: false ***REMOVED***)***REMOVED***
          />
        </li>
      </CopyToClipboard>
    );
***REMOVED***
***REMOVED***

Li.contextTypes = ***REMOVED***
  deleteData: PropTypes.func.isRequired,
***REMOVED***;

Li.defaultProps = ***REMOVED***
  item: ***REMOVED***
    type: 'pdf',
    hash: '1234',
    name: 'avatar.pdf',
    updated: '20/11/2017 19:29:54',
    size: '24 B',
    relatedTo: 'John Doe',
***REMOVED***,
***REMOVED***;

Li.propTypes = ***REMOVED***
  item: PropTypes.object,
***REMOVED***;

export default Li;
