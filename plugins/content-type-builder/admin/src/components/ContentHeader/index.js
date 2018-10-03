/**
*
* ContentHeader
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, map, startCase ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** router ***REMOVED*** from 'app';

import Button from 'components/Button';
import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
class ContentHeader extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  handleEdit = () => ***REMOVED***
    router.push(this.props.editPath);
***REMOVED***

  renderButtonContainer = () => ***REMOVED***
    if (this.props.isLoading) ***REMOVED***
      return (
        <div className=***REMOVED***styles.buttonContainer***REMOVED***>
          <Button type="submit" primary loader />
        </div>
      );
***REMOVED***

    return (
      <div className=***REMOVED***styles.buttonContainer***REMOVED***>
        ***REMOVED***map(this.props.buttonsContent, (button, key) => (
          <Button key=***REMOVED***key***REMOVED*** type=***REMOVED***button.type***REMOVED*** label=***REMOVED***button.label***REMOVED*** kind=***REMOVED***button.kind***REMOVED*** onClick=***REMOVED***button.handleClick***REMOVED*** />
        ))***REMOVED***
      </div>
    );
***REMOVED***

  renderContentHeader = () => ***REMOVED***
    const description = isEmpty(this.props.description) ? '' : <FormattedMessage id=***REMOVED***this.props.description***REMOVED*** defaultMessage='***REMOVED***description***REMOVED***' values=***REMOVED******REMOVED*** description: this.props.description***REMOVED******REMOVED*** />;
    const buttons = this.props.addButtons ? this.renderButtonContainer() : '';
    return (
      <div className=***REMOVED***styles.contentHeader***REMOVED*** style=***REMOVED***this.props.styles***REMOVED***>
        <div>
          <div className=***REMOVED***`$***REMOVED***styles.title***REMOVED*** $***REMOVED***styles.flex***REMOVED***`***REMOVED***>
            <span>***REMOVED***startCase(this.props.name)***REMOVED***</span>
            <i className=***REMOVED***`fa fa-$***REMOVED***this.props.icoType***REMOVED***`***REMOVED*** onClick=***REMOVED***this.handleEdit***REMOVED*** role="button" />
          </div>
          <div className=***REMOVED***styles.subTitle***REMOVED***>***REMOVED***description***REMOVED***</div>
        </div>
        ***REMOVED***buttons***REMOVED***
      </div>
    );
***REMOVED***

  render() ***REMOVED***
    const description = isEmpty(this.props.description) ? '' : <FormattedMessage id=***REMOVED***this.props.description***REMOVED*** />;
    const buttons = this.props.addButtons ? this.renderButtonContainer() : '';

    if (this.props.editIcon) return this.renderContentHeader();
    return (
      <div className=***REMOVED***styles.contentHeader***REMOVED*** style=***REMOVED***this.props.styles***REMOVED***>
        <div>
          <div className=***REMOVED***styles.title***REMOVED***>
            <FormattedMessage id=***REMOVED***this.props.name***REMOVED*** />
          </div>
          <div className=***REMOVED***styles.subTitle***REMOVED***>***REMOVED***description***REMOVED***</div>
        </div>
        ***REMOVED***buttons***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

ContentHeader.propTypes = ***REMOVED***
  addButtons: PropTypes.bool,
  buttonsContent: PropTypes.array,
  description: PropTypes.string,
  editIcon: PropTypes.bool,
  editPath: PropTypes.string,
  icoType: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  styles: PropTypes.object,
***REMOVED***;

ContentHeader.defaultProps = ***REMOVED***
  addButtons: false,
  buttonsContent: [],
  description: '',
  editIcon: false,
  editPath: '',
  icoType: 'pencil',
  isLoading: false,
  name: '',
  styles: ***REMOVED******REMOVED***,
***REMOVED***;

export default ContentHeader;
