/**
 *
 * PopUpRelations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** findIndex, get, isEmpty, map, take, takeRight ***REMOVED*** from 'lodash';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import pluralize from 'pluralize';

import ***REMOVED*** Button, Modal, ModalHeader, ModalBody, ModalFooter ***REMOVED*** from 'reactstrap';
import Input from 'components/InputsIndex';
import PopUpHeaderNavLink from 'components/PopUpHeaderNavLink';
import RelationBox from 'components/RelationBox';
import RelationNaturePicker from 'components/RelationNaturePicker';
import styles from './styles.scss';

/* eslint-disable jsx-a11y/tabindex-no-positive */
class PopUpRelations extends React.Component ***REMOVED***
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) ***REMOVED***
    super(props);
    this.popUpHeaderNavLinks = [
      ***REMOVED***
        name: 'defineRelation',
        message: 'content-type-builder.popUpForm.navContainer.relation',
        nameToReplace: 'advancedSettings',
***REMOVED***
      ***REMOVED***
        name: 'advancedSettings',
        message: 'content-type-builder.popUpForm.navContainer.advanced',
        nameToReplace: 'defineRelation',
***REMOVED***
    ];
***REMOVED***

  componentDidMount() ***REMOVED***
    if (!isEmpty(this.props.dropDownItems) && !this.props.isEditting) ***REMOVED***
      this.init(this.props);
***REMOVED***
***REMOVED***

  componentWillReceiveProps(nextProps) ***REMOVED***
    if (
      isEmpty(this.props.dropDownItems) &&
      !isEmpty(nextProps.dropDownItems) &&
      !this.props.isEditting
    ) ***REMOVED***
      this.init(nextProps);
***REMOVED***
***REMOVED***

  setPlaceholders = (firstCTName, secondCTName, relationType, values = this.props.values) => ***REMOVED***
    switch (relationType) ***REMOVED***
      case 'oneToMany':
        firstCTName = pluralize(firstCTName);
        break;
      case 'manyToOne':
        secondCTName = pluralize(secondCTName);
        break;
      case 'manyToMany':
        firstCTName = pluralize(firstCTName);
        secondCTName = pluralize(secondCTName);
        break;
      default:
        // Do nothing
***REMOVED***

    if (get(this.props.contentType, 'name') !== get(values, 'params.target')) ***REMOVED***
      this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'name', value: firstCTName ***REMOVED*** ***REMOVED***);
      this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'params.key', value: secondCTName ***REMOVED*** ***REMOVED***);
      this.props.resetFormErrors();
***REMOVED*** else ***REMOVED***
      this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'name', value: '' ***REMOVED*** ***REMOVED***);
      this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'params.key', value: '' ***REMOVED*** ***REMOVED***);
***REMOVED***
***REMOVED***

  handleChange = e => ***REMOVED***
    this.props.onChange(e);
    const shouldResetKeyParams = e.target.value === 'oneWay';

    if (!this.props.isEditting && !shouldResetKeyParams) ***REMOVED***
      this.setPlaceholders(
        get(this.props.values, ['params', 'target']),
        get(this.props.contentType, 'name'),
        e.target.value,
      );
***REMOVED***

    if (shouldResetKeyParams) ***REMOVED***
      this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'params.key', value: '-' ***REMOVED*** ***REMOVED***);
***REMOVED***
***REMOVED***

  handleClick = e => ***REMOVED***
    const value = e.target.id.split('.');
    [
      ***REMOVED***
        target: ***REMOVED***
          type: 'string',
          value: value[0],
          name: 'params.target',
  ***REMOVED***
***REMOVED***
      ***REMOVED***
        target: ***REMOVED***
          type: 'string',
          value: value[1] !== 'undefined' ? value[1] : '',
          name: 'params.pluginValue',
  ***REMOVED***
***REMOVED***
    ].map(target => this.props.onChange(target));

    if (!this.props.isEditting) ***REMOVED***
      if (get(this.props.contentType, 'name') !== value[0]) ***REMOVED***
        this.setPlaceholders(
          value[0],
          get(this.props.contentType, 'name'),
          get(this.props.values, ['params', 'nature']),
          value[0],
        );
***REMOVED*** else ***REMOVED***
        const keyValue = get(this.props.values, 'params.nature') === 'oneWay' ? '-' : '';
        this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'name', value: '' ***REMOVED*** ***REMOVED***);
        this.props.onChange(***REMOVED*** target: ***REMOVED*** name: 'params.key', value: keyValue ***REMOVED*** ***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***;

  init = props => ***REMOVED***
    const target = ***REMOVED***
      name: 'params.target',
      type: 'string',
      value: get(props.dropDownItems[0], 'name'),
***REMOVED***;

    this.props.onChange(***REMOVED*** target ***REMOVED***);

    if (get(props.dropDownItems[0], 'source')) ***REMOVED***
      this.props.onChange(***REMOVED***
        target: ***REMOVED***
          type: 'string',
          name: 'params.pluginValue',
          value: get(props.dropDownItems[0], 'source'),
  ***REMOVED***
***REMOVED***);
***REMOVED***

    if (get(props.contentType, 'name') !== get(props.dropDownItems, ['0', 'name'])) ***REMOVED***
      [
        ***REMOVED*** target: ***REMOVED*** name: 'name', value: get(props.dropDownItems, ['0', 'name']) ***REMOVED*** ***REMOVED***,
        ***REMOVED*** target: ***REMOVED*** name: 'params.key', value: get(props.contentType, 'name') ***REMOVED*** ***REMOVED***,
      ].map(target => this.props.onChange(target));
***REMOVED***
***REMOVED***;

  renderNavContainer = () => (
    <div className=***REMOVED***styles.navContainer***REMOVED***>
      ***REMOVED***map(this.popUpHeaderNavLinks, (link, key) => (
        <PopUpHeaderNavLink
          key=***REMOVED***key***REMOVED***
          message=***REMOVED***link.message***REMOVED***
          name=***REMOVED***link.name***REMOVED***
          nameToReplace=***REMOVED***link.nameToReplace***REMOVED***
          routePath=***REMOVED***this.props.routePath***REMOVED***
        />
      ))***REMOVED***
    </div>
  );

  renderModalBodyAdvanced = () => (
    <ModalBody className=***REMOVED***`$***REMOVED***styles.modalBodyAdvanced***REMOVED***`***REMOVED***>
      <div className="container-fluid">
        <div className="row">
          ***REMOVED***map(take(this.props.form.items, 1), (input, key) => (
            <Input
              key=***REMOVED***key***REMOVED***
              customBootstrapClass="col-md-6 offset-md-6 mr-md-5"
              type=***REMOVED***input.type***REMOVED***
              value=***REMOVED***get(this.props.values, ['params', input.name.split('.')[1]])***REMOVED***
              name=***REMOVED***input.name***REMOVED***
              label=***REMOVED***input.label***REMOVED***
              title=***REMOVED***input.title***REMOVED***
              validations=***REMOVED***input.validations***REMOVED***
              inputDescription=***REMOVED***input.inputDescription***REMOVED***
              ***REMOVED***...this.props***REMOVED***
            />
          ))***REMOVED***
          <div className=***REMOVED***styles.divider***REMOVED*** />
        </div>
        <div className=***REMOVED***styles.inputContainer***REMOVED***>
          <div className="row">
            ***REMOVED***map(takeRight(this.props.form.items, 2), (value, index) => ***REMOVED***
              const addon =
                index === 0
                  ? get(this.props.values, 'name')
                  : get(this.props.values, ['params', 'key']);
              return (
                <Input
                  key=***REMOVED***index***REMOVED***
                  type=***REMOVED***value.type***REMOVED***
                  value=***REMOVED***get(this.props.values, ['params', value.name.split('.')[1]])***REMOVED***
                  name=***REMOVED***value.name***REMOVED***
                  label=***REMOVED***value.label***REMOVED***
                  title=***REMOVED***value.title***REMOVED***
                  validations=***REMOVED***value.validations***REMOVED***
                  inputDescription=***REMOVED***value.inputDescription***REMOVED***
                  ***REMOVED***...this.props***REMOVED***
                  addon=***REMOVED***addon***REMOVED***
                  placeholder=" "
                  disabled=***REMOVED***isEmpty(addon)***REMOVED***
                />
              );
      ***REMOVED***)***REMOVED***
          </div>
        </div>
      </div>
    </ModalBody>
  );

  renderModalBodyRelations = () => ***REMOVED***
    const header = get(this.props.values, ['params', 'pluginValue'])
      ? get(this.props.dropDownItems, [
        findIndex(this.props.dropDownItems, ***REMOVED***
          name: get(this.props.values, ['params', 'target']),
          source: get(this.props.values, ['params', 'pluginValue']),
  ***REMOVED***),
      ])
      : get(this.props.dropDownItems, [
        findIndex(this.props.dropDownItems, [
          'name',
          get(this.props.values, ['params', 'target']),
        ]),
      ]);

    const errs = findIndex(this.props.formErrors, ['name',get(this.props.form, ['items', '0', 'name'])]) !== -1 ? this.props.formErrors[findIndex(this.props.formErrors, ['name', get(this.props.form, ['items', '0', 'name'])])].errors: [];
    const errors = findIndex(this.props.formErrors, ['name', get(this.props.form, ['items', '1', 'name'])]) !== -1 ? this.props.formErrors[findIndex(this.props.formErrors, ['name', get(this.props.form, ['items', '1', 'name'])])].errors : [];
    const contentTypeTargetPlaceholder = get(this.props.values, 'params.nature', '') === 'oneWay' ? '-' : get(this.props.contentType, 'name');
    const contentTypeTargetValue = get(this.props.values, 'params.nature') === 'oneWay' ? '-' : get(this.props.values, ['params', 'key']);

    return (
      <ModalBody className=***REMOVED***`$***REMOVED***styles.modalBody***REMOVED*** $***REMOVED***styles.flex***REMOVED***`***REMOVED***>
        <RelationBox
          autoFocus
          tabIndex="1"
          relationType=***REMOVED***get(this.props.values, ['params', 'nature'])***REMOVED***
          contentTypeTargetPlaceholder=***REMOVED***get(this.props.values, ['params', 'target'])***REMOVED***
          isFirstContentType
          header=***REMOVED***this.props.contentType***REMOVED***
          input=***REMOVED***get(this.props.form, ['items', '0'])***REMOVED***
          value=***REMOVED***get(this.props.values, 'name')***REMOVED***
          onSubmit=***REMOVED***this.props.onSubmit***REMOVED***
          onChange=***REMOVED***this.props.onChange***REMOVED***
          didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
          errors=***REMOVED***errs***REMOVED***
        />
        <RelationNaturePicker
          selectedIco=***REMOVED***get(this.props.values, ['params', 'nature'])***REMOVED***
          onChange=***REMOVED***this.handleChange***REMOVED***
          contentTypeName=***REMOVED***get(this.props.contentType, 'name')***REMOVED***
          contentTypeTarget=***REMOVED***get(this.props.values, ['params', 'target'])***REMOVED***
        />
        <RelationBox
          tabIndex="2"
          contentTypeTargetPlaceholder=***REMOVED***contentTypeTargetPlaceholder***REMOVED***
          relationType=***REMOVED***get(this.props.values, ['params', 'nature'])***REMOVED***
          onSubmit=***REMOVED***this.props.onSubmit***REMOVED***
          header=***REMOVED***header***REMOVED***
          input=***REMOVED***get(this.props.form, ['items', '1'])***REMOVED***
          value=***REMOVED***contentTypeTargetValue***REMOVED***
          onChange=***REMOVED***this.props.onChange***REMOVED***
          didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
          errors=***REMOVED***errors***REMOVED***
          dropDownItems=***REMOVED***this.props.dropDownItems***REMOVED***
          onClick=***REMOVED***this.handleClick***REMOVED***
        />
      </ModalBody>
    );
***REMOVED***;

  render() ***REMOVED***
    const modalBody = this.props.showRelation
      ? this.renderModalBodyRelations()
      : this.renderModalBodyAdvanced();
    const handleToggle = this.props.toggle;

    return (
      <div className=***REMOVED***styles.popUpRelations***REMOVED***>
        <Modal
          isOpen=***REMOVED***this.props.isOpen***REMOVED***
          toggle=***REMOVED***this.props.toggle***REMOVED***
          className=***REMOVED***`$***REMOVED***styles.modalPosition***REMOVED***`***REMOVED***
        >
          <ModalHeader toggle=***REMOVED***this.props.toggle***REMOVED*** className=***REMOVED***styles.popUpFormHeader***REMOVED*** />
          <div className=***REMOVED***styles.headerContainer***REMOVED***>
            <div className=***REMOVED***styles.titleContainer***REMOVED***>
              <div>
                <FormattedMessage id=***REMOVED***this.props.popUpTitle***REMOVED*** />
                &nbsp;
                <FormattedMessage id="content-type-builder.popUpRelation.title" />
              </div>
            </div>

            ***REMOVED***this.renderNavContainer()***REMOVED***
          </div>

          ***REMOVED***modalBody***REMOVED***

          <ModalFooter className=***REMOVED***styles.modalFooter***REMOVED***>
            <Button onClick=***REMOVED***handleToggle***REMOVED*** className=***REMOVED***styles.secondary***REMOVED***>
              <FormattedMessage id="content-type-builder.form.button.cancel" />
            </Button>
            <Button type="submit" onClick=***REMOVED***this.props.onSubmit***REMOVED*** className=***REMOVED***styles.primaryAddShape***REMOVED***><FormattedMessage id="content-type-builder.button.attributes.add" /></Button>
            <Button type="button" onClick=***REMOVED***(e) => this.props.onSubmit(e, false)***REMOVED*** className=***REMOVED***styles.primary***REMOVED***>
              <FormattedMessage id="content-type-builder.form.button.continue" />
            </Button>***REMOVED***' '***REMOVED***
          </ModalFooter>
        </Modal>
      </div>
    );
***REMOVED***
***REMOVED***

PopUpRelations.propTypes = ***REMOVED***
  contentType: PropTypes.object,
  didCheckErrors: PropTypes.bool.isRequired,
  dropDownItems: PropTypes.array,
  form: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]).isRequired,
  formErrors: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isEditting: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  popUpTitle: PropTypes.string.isRequired,
  resetFormErrors: PropTypes.func.isRequired,
  routePath: PropTypes.string.isRequired,
  showLoader: PropTypes.bool,
  showRelation: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  values: PropTypes.object,
***REMOVED***;

PopUpRelations.defaultProps = ***REMOVED***
  contentType: ***REMOVED******REMOVED***,
  dropDownItems: [],
  isEditting: false,
  showLoader: false,
  values: ***REMOVED******REMOVED***,
***REMOVED***;

export default PopUpRelations;
