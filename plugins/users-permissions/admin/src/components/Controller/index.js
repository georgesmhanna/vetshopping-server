/**
*
* Controller
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** get, map, some ***REMOVED*** from 'lodash';
import cn from 'classnames';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import InputCheckbox from 'components/InputCheckboxPlugin';
import styles from './styles.scss';

class Controller extends React.Component ***REMOVED***
  state = ***REMOVED*** inputSelected: '', checked: false ***REMOVED***;

  setNewInputSelected = (name) => ***REMOVED***
    this.setState(***REMOVED*** inputSelected: name, checked: false ***REMOVED***);
***REMOVED***

  handleChange = () => ***REMOVED***
    this.setState(***REMOVED*** checked: !this.state.checked ***REMOVED***);
    this.context.selectAllActions(`$***REMOVED***this.props.inputNamePath***REMOVED***.controllers.$***REMOVED***this.props.name***REMOVED***`, !this.isAllActionsSelected());
***REMOVED***

  isAllActionsSelected = () => !some(this.props.actions, ['enabled', false]);

  render() ***REMOVED***
    return (
      <div className=***REMOVED***styles.controller***REMOVED***>
        <div className=***REMOVED***styles.controllerHeader***REMOVED***>
          <div>***REMOVED***this.props.name***REMOVED***</div>
          <div className=***REMOVED***styles.separator***REMOVED***></div>
          <div>
            <div className=***REMOVED***cn(styles.inputCheckbox)***REMOVED***>
              <div className="form-check">
                <label className=***REMOVED***cn('form-check-label', styles.label, this.state.checked ? styles.checked : '')***REMOVED*** htmlFor=***REMOVED***this.props.name***REMOVED***>
                  <input
                    className="form-check-input"
                    checked=***REMOVED***this.state.checked***REMOVED***
                    id=***REMOVED***this.props.name***REMOVED***
                    name=***REMOVED***this.props.name***REMOVED***
                    onChange=***REMOVED***this.handleChange***REMOVED***
                    type="checkbox"
                  />
                  <FormattedMessage id="users-permissions.Controller.selectAll" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          ***REMOVED***map(Object.keys(this.props.actions).sort(), (actionKey) => (
            <InputCheckbox
              inputSelected=***REMOVED***this.state.inputSelected***REMOVED***
              isOpen=***REMOVED***this.props.isOpen***REMOVED***
              key=***REMOVED***actionKey***REMOVED***
              label=***REMOVED***actionKey***REMOVED***
              name=***REMOVED***`$***REMOVED***this.props.inputNamePath***REMOVED***.controllers.$***REMOVED***this.props.name***REMOVED***.$***REMOVED***actionKey***REMOVED***.enabled`***REMOVED***
              setNewInputSelected=***REMOVED***this.setNewInputSelected***REMOVED***
              value=***REMOVED***get(this.props.actions[actionKey], 'enabled')***REMOVED***
            />
          ))***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

Controller.contextTypes = ***REMOVED***
  selectAllActions: PropTypes.func.isRequired,
***REMOVED***;

Controller.defaultProps = ***REMOVED***
  actions: ***REMOVED******REMOVED***,
  inputNamePath: 'permissions.application',
  name: '',
***REMOVED***;

Controller.propTypes = ***REMOVED***
  actions: PropTypes.object,
  inputNamePath: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string,
***REMOVED***;

export default Controller;
