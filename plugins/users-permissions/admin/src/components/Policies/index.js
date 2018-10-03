/**
*
* Policies
*
*/

import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** get, isEmpty, map, takeRight, toLower, without ***REMOVED*** from 'lodash';

import BoundRoute from 'components/BoundRoute';
import Input from 'components/InputsIndex';

import styles from './styles.scss';

class Policies extends React.Component ***REMOVED*** // eslint-disable-line react/prefer-stateless-function
  handleChange = (e) => this.context.onChange(e);

  render() ***REMOVED***
    const baseTitle = 'users-permissions.Policies.header';
    const title = this.props.shouldDisplayPoliciesHint ? 'hint' : 'title';
    const value = get(this.props.values, this.props.inputSelectName);
    const path = without(this.props.inputSelectName.split('.'), 'permissions', 'controllers', 'policy');
    const controllerRoutes = get(this.props.routes, without(this.props.inputSelectName.split('.'), 'permissions', 'controllers', 'policy')[0]);
    const routes = isEmpty(controllerRoutes) ? [] : controllerRoutes.filter(o => toLower(o.handler) === toLower(takeRight(path, 2).join('.')));

    return (
      <div className=***REMOVED***cn('col-md-5',styles.policies)***REMOVED***>
        <div className="container-fluid">
          <div className=***REMOVED***cn('row', styles.inputWrapper)***REMOVED***>
            <div className=***REMOVED***cn('col-md-12', styles.header)***REMOVED***>
              <FormattedMessage id=***REMOVED***`$***REMOVED***baseTitle***REMOVED***.$***REMOVED***title***REMOVED***`***REMOVED*** />
            </div>
            ***REMOVED***!this.props.shouldDisplayPoliciesHint ? (
              <Input
                customBootstrapClass="col-md-12"
                label=***REMOVED******REMOVED*** id: 'users-permissions.Policies.InputSelect.label' ***REMOVED******REMOVED***
                name=***REMOVED***this.props.inputSelectName***REMOVED***
                onChange=***REMOVED***this.handleChange***REMOVED***
                selectOptions=***REMOVED***this.props.selectOptions***REMOVED***
                type="select"
                validations=***REMOVED******REMOVED******REMOVED******REMOVED***
                value=***REMOVED***value***REMOVED***
              />
            ) : ''***REMOVED***
          </div>
          <div className="row">
            ***REMOVED***!this.props.shouldDisplayPoliciesHint ? (
              map(routes, (route, key) => <BoundRoute key=***REMOVED***key***REMOVED*** route=***REMOVED***route***REMOVED*** />)
            ) : ''***REMOVED***
          </div>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

Policies.contextTypes = ***REMOVED***
  onChange: PropTypes.func.isRequired,
***REMOVED***;

Policies.defaultProps = ***REMOVED***
  routes: ***REMOVED******REMOVED***,
***REMOVED***;

Policies.propTypes = ***REMOVED***
  inputSelectName: PropTypes.string.isRequired,
  routes: PropTypes.object,
  selectOptions: PropTypes.array.isRequired,
  shouldDisplayPoliciesHint: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
***REMOVED***;

export default Policies;
