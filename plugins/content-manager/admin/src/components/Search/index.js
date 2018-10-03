/*
*
* Search
*
*/

import React from 'react';
import ***REMOVED*** isEmpty, upperFirst ***REMOVED*** from 'lodash';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import Logo from 'assets/images/icon_filter_blue.svg';
import styles from './styles.scss';

const WAIT = 400;

class Search extends React.Component ***REMOVED***
  state = ***REMOVED*** value: this.props.initValue ***REMOVED***;

  componentDidUpdate(prevProps) ***REMOVED***
    const ***REMOVED*** model, value ***REMOVED*** = this.props;

    if (prevProps.model !== model || !isEmpty(prevProps.value) && isEmpty(value)) ***REMOVED***
      this.resetState();
***REMOVED***
***REMOVED***

  timer = null;

  resetState = () => this.setState(***REMOVED*** value: '' ***REMOVED***);

  handleChange = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    clearTimeout(this.timer);
    this.setState(***REMOVED*** value: target.value ***REMOVED***);
    this.timer = setTimeout(() => this.triggerChange(target.value), WAIT);
***REMOVED***

  handleClick = () => ***REMOVED***
    this.setState(***REMOVED*** value: '' ***REMOVED***);
    this.triggerChange('');
***REMOVED***

  triggerChange = (value) => (
    this.props.changeParams(***REMOVED***
      target: ***REMOVED***
        name: 'params._q',
        value,
***REMOVED***
***REMOVED***)
  );

  render() ***REMOVED***
    const ***REMOVED*** model ***REMOVED*** = this.props;
    const ***REMOVED*** value ***REMOVED*** = this.state;

    return (
      <div className=***REMOVED***styles.search***REMOVED***>
        <div>
          <FormattedMessage id="content-manager.components.Search.placeholder">
            ***REMOVED***(message) => (
              <input
                onChange=***REMOVED***this.handleChange***REMOVED***
                placeholder=***REMOVED***message***REMOVED***
                type="text"
                value=***REMOVED***value***REMOVED***
              />
            )***REMOVED***
          </FormattedMessage>
          ***REMOVED***value !== '' && <div className=***REMOVED***styles.clearable***REMOVED*** onClick=***REMOVED***this.handleClick***REMOVED*** />***REMOVED***
        </div>
        <div className=***REMOVED***styles.searchLabel***REMOVED***>
          <img src=***REMOVED***Logo***REMOVED*** alt="filter_logo" />
          ***REMOVED***upperFirst(model)***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

Search.defaultProps = ***REMOVED***
  changeParams: () => ***REMOVED******REMOVED***,
  model: '',
  value: '',
***REMOVED***;

Search.propTypes = ***REMOVED***
  changeParams: PropTypes.func,
  initValue: PropTypes.string.isRequired,
  model: PropTypes.string,
  value: PropTypes.string,
***REMOVED***;

export default Search;
