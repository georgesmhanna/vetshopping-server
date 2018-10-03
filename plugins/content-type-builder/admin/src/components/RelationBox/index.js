/**
 *
 * RelationBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** get, isEmpty, map, startCase ***REMOVED*** from 'lodash';
import pluralize from 'pluralize';

import ***REMOVED*** ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ***REMOVED*** from 'reactstrap';
import Input from 'components/InputsIndex';
import styles from './styles.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
class RelationBox extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);

    this.state = ***REMOVED***
      showMenu: false,
***REMOVED***;
***REMOVED***

  getPlaceholder = () => ***REMOVED***
    switch (true) ***REMOVED***
      case this.props.relationType === 'oneToMany' && this.props.isFirstContentType:
        return pluralize(this.props.contentTypeTargetPlaceholder);
      case this.props.relationType === 'manyToOne' && !this.props.isFirstContentType:
        return pluralize(this.props.contentTypeTargetPlaceholder);
      case this.props.relationType === 'manyToMany':
        return pluralize(this.props.contentTypeTargetPlaceholder);
      default:
        return this.props.contentTypeTargetPlaceholder;
***REMOVED***
***REMOVED***

  toggle = () => this.setState(***REMOVED*** showMenu: !this.state.showMenu ***REMOVED***);

  renderDropdownMenu = () => (
    <div className=***REMOVED***styles.dropDown***REMOVED***>
      <ButtonDropdown
        isOpen=***REMOVED***this.state.showMenu***REMOVED***
        toggle=***REMOVED***this.toggle***REMOVED***
        style=***REMOVED******REMOVED*** backgroundColor: 'transparent' ***REMOVED******REMOVED***
      >
        <DropdownToggle caret />
        <DropdownMenu className=***REMOVED***styles.dropDownContent***REMOVED***>
          ***REMOVED***map(this.props.dropDownItems, (value, key) => ***REMOVED***
            const id = value.source ? `$***REMOVED***value.name***REMOVED***.$***REMOVED***value.source***REMOVED***` : `$***REMOVED***value.name***REMOVED***. `;
            let divStyle;

            if (
              get(this.props.header, 'name') === value.name &&
              !isEmpty(get(this.props.header, 'source')) &&
              value.source
            ) ***REMOVED***
              divStyle = ***REMOVED*** color: '#323740', fontWeight: 'bold' ***REMOVED***;
      ***REMOVED*** else if (
              value.source === get(this.props.header, 'source') &&
              value.name === get(this.props.header, 'name')
            ) ***REMOVED***
              divStyle = ***REMOVED*** color: '#323740', fontWeight: 'bold' ***REMOVED***;
      ***REMOVED*** else ***REMOVED***
              divStyle = ***REMOVED*** color: 'rgba(50,55,64,0.75)' ***REMOVED***;
      ***REMOVED***

            return (
              <div style=***REMOVED******REMOVED*** height: '3.6rem' ***REMOVED******REMOVED*** key=***REMOVED***key***REMOVED***>
                <DropdownItem onClick=***REMOVED***this.props.onClick***REMOVED*** id=***REMOVED***id***REMOVED***>
                  <div style=***REMOVED***divStyle***REMOVED*** id=***REMOVED***`$***REMOVED***value.name***REMOVED***.$***REMOVED***value.source***REMOVED***`***REMOVED***>
                    <i className=***REMOVED***`fa $***REMOVED***value.icon***REMOVED***`***REMOVED*** style=***REMOVED***divStyle***REMOVED*** id=***REMOVED***id***REMOVED*** />
                    ***REMOVED***value.name***REMOVED***&nbsp;
                    ***REMOVED***value.source && (
                      <FormattedMessage id="content-type-builder.from">
                        ***REMOVED***message => (
                          <span style=***REMOVED******REMOVED*** fontStyle: 'italic' ***REMOVED******REMOVED*** id=***REMOVED***id***REMOVED***>
                            (***REMOVED***message***REMOVED***: ***REMOVED***value.source***REMOVED***)
                          </span>
                        )***REMOVED***
                      </FormattedMessage>
                    )***REMOVED***
                  </div>
                </DropdownItem>
              </div>
            );
    ***REMOVED***)***REMOVED***
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );

  render() ***REMOVED***
    return (
      <div className=***REMOVED***styles.relationBox***REMOVED***>
        <div className=***REMOVED***styles.headerContainer***REMOVED***>
          <i className=***REMOVED***`fa $***REMOVED***get(this.props.header, 'icon')***REMOVED***`***REMOVED*** />
          ***REMOVED***startCase(get(this.props.header, 'name'))***REMOVED***&nbsp;
          <span style=***REMOVED******REMOVED*** fontStyle: 'italic', fontWeight: '500' ***REMOVED******REMOVED***>
            ***REMOVED***get(this.props.header, 'source') ? `($***REMOVED***get(this.props.header, 'source')***REMOVED***)` : ''***REMOVED***
          </span>
          ***REMOVED***!isEmpty(this.props.dropDownItems) && this.renderDropdownMenu()***REMOVED***
        </div>
        <div className=***REMOVED***styles.inputContainer***REMOVED***>
          <form onSubmit=***REMOVED***this.props.onSubmit***REMOVED***>
            <div className="container-fluid">
              <div className=***REMOVED***`row $***REMOVED***styles.input***REMOVED***`***REMOVED***>
                ***REMOVED***!isEmpty(this.props.input) && (
                  <Input
                    disabled=***REMOVED***this.props.relationType === 'oneWay' && this.props.tabIndex === '2'***REMOVED***
                    tabIndex=***REMOVED***this.props.tabIndex***REMOVED***
                    type=***REMOVED***get(this.props.input, 'type')***REMOVED***
                    onChange=***REMOVED***this.props.onChange***REMOVED***
                    label=***REMOVED***get(this.props.input, 'label')***REMOVED***
                    name=***REMOVED***get(this.props.input, 'name')***REMOVED***
                    value=***REMOVED***this.props.value***REMOVED***
                    placeholder=***REMOVED***this.getPlaceholder()***REMOVED***
                    customBootstrapClass="col-md-12"
                    validations=***REMOVED***get(this.props.input, 'validations')***REMOVED***
                    errors=***REMOVED***this.props.errors***REMOVED***
                    didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
                    pluginID="content-type-builder"
                    autoFocus=***REMOVED***this.props.autoFocus***REMOVED***
                  />
                )***REMOVED***
              </div>
            </div>
          </form>
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

RelationBox.propTypes = ***REMOVED***
  autoFocus: PropTypes.bool,
  contentTypeTargetPlaceholder: PropTypes.string,
  didCheckErrors: PropTypes.bool.isRequired,
  dropDownItems: PropTypes.array,
  errors: PropTypes.array,
  header: PropTypes.object,
  input: PropTypes.object,
  isFirstContentType: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  relationType: PropTypes.string,
  tabIndex: PropTypes.string.isRequired,
  value: PropTypes.string,
***REMOVED***;

RelationBox.defaultProps = ***REMOVED***
  autoFocus: false,
  contentTypeTargetPlaceholder: '',
  dropDownItems: [],
  errors: [],
  header: ***REMOVED******REMOVED***,
  input: ***REMOVED******REMOVED***,
  isFirstContentType: false,
  onClick: () => ***REMOVED******REMOVED***,
  relationType: 'oneToOne',
  value: '',
***REMOVED***;

export default RelationBox;
