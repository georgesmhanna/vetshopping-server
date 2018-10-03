/**
*
* Plugin
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** Collapse ***REMOVED*** from 'reactstrap';
import ***REMOVED*** capitalize, get, isEmpty, map ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';

import Controller from 'components/Controller';

import styles from './styles.scss';

class Plugin extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  state = ***REMOVED*** collapse: false ***REMOVED***;

  componentDidMount() ***REMOVED***
    // Open the application's permissions section if there are APIs
    if (this.props.name === 'application' && !isEmpty(get(this.props.plugin, 'controllers'))) ***REMOVED***
      this.props.changePluginSelected('application');
      this.setState(***REMOVED*** collapse: !this.state.collapse ***REMOVED***);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (nextProps.pluginSelected !== this.props.pluginSelected && nextProps.pluginSelected !== this.props.name) ***REMOVED***
      this.context.resetShouldDisplayPoliciesHint();
      this.setState(***REMOVED*** collapse: false ***REMOVED***);
***REMOVED***
***REMOVED***

  handleClick = () => ***REMOVED***
    this.props.changePluginSelected(this.props.name);

    if (!isEmpty(get(this.props.plugin, 'controllers'))) ***REMOVED***
      this.setState(***REMOVED*** collapse: !this.state.collapse ***REMOVED***);
***REMOVED***

    if (this.state.collapse) ***REMOVED***
      this.context.resetShouldDisplayPoliciesHint();
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    const divStyle = this.state.collapse ? ***REMOVED*** marginBottom: '.4rem' ***REMOVED*** : ***REMOVED******REMOVED***;
    const icon = get(this.props.plugin, ['information', 'logo']);
    const emptyApplication = !isEmpty(get(this.props.plugin, 'controllers'));

    if (!emptyApplication) ***REMOVED***
      return <div />;
***REMOVED***

    return (
      <div className=***REMOVED***styles.plugin***REMOVED*** style=***REMOVED***divStyle***REMOVED***>
        <div className=***REMOVED***styles.banner***REMOVED*** onClick=***REMOVED***this.handleClick***REMOVED***>
          <div>
            ***REMOVED***this.props.name !== 'application' && (
              <div className=***REMOVED***styles.iconContainer***REMOVED***>
                ***REMOVED***icon &&  <img src=***REMOVED***icon***REMOVED*** alt="icon" />***REMOVED***
              </div>
            )***REMOVED***
            <div className=***REMOVED***styles.name***REMOVED***>***REMOVED***this.props.name***REMOVED***</div>
            &nbsp;—&nbsp;
            <div className=***REMOVED***styles.description***REMOVED***>
              ***REMOVED***this.props.name === 'application' ? (
                <FormattedMessage
                  id="users-permissions.Plugin.permissions.application.description"
                />
              ) : (
                <FormattedMessage
                  id="users-permissions.Plugin.permissions.plugins.description"
                  values=***REMOVED******REMOVED*** name: capitalize(this.props.name) ***REMOVED******REMOVED***
                />
              )***REMOVED***
            </div>
          </div>
          ***REMOVED*** emptyApplication && <div className=***REMOVED***this.state.collapse ? styles.chevronUp : styles.chevronDown***REMOVED***></div> ***REMOVED***
        </div>
        <Collapse isOpen=***REMOVED***this.state.collapse***REMOVED***>
          <div />
          <div className=***REMOVED***styles.controllerContainer***REMOVED***>
            ***REMOVED***map(get(this.props.plugin, 'controllers'), (controllerActions, key) => (
              <Controller
                inputNamePath=***REMOVED***`permissions.$***REMOVED***this.props.name***REMOVED***`***REMOVED***
                isOpen=***REMOVED***this.state.collapse***REMOVED***
                key=***REMOVED***key***REMOVED***
                name=***REMOVED***key***REMOVED***
                actions=***REMOVED***controllerActions***REMOVED***
                resetInputBackground=***REMOVED***this.state.resetInputBackground***REMOVED***
              />
            ))***REMOVED***
          </div>
        </Collapse>
      </div>
    );
***REMOVED***
***REMOVED***

Plugin.contextTypes = ***REMOVED***
  plugins: PropTypes.object.isRequired,
  resetShouldDisplayPoliciesHint: PropTypes.func.isRequired,
***REMOVED***;

Plugin.defaultProps = ***REMOVED***
  name: '',
  plugin: ***REMOVED***
    description: 'users-permissions.Plugin.permissions.description.empty',
    controllers: ***REMOVED******REMOVED***,
    information: ***REMOVED******REMOVED***,
***REMOVED***,
***REMOVED***;

Plugin.propTypes = ***REMOVED***
  changePluginSelected: PropTypes.func.isRequired,
  name: PropTypes.string,
  plugin: PropTypes.shape(***REMOVED***
    description: PropTypes.string,
    information: PropTypes.shape(***REMOVED***
      logo: PropTypes.string,
***REMOVED***),
***REMOVED***),
  pluginSelected: PropTypes.string.isRequired,
***REMOVED***;

export default Plugin;
