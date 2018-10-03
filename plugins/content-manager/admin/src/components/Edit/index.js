/**
 *
 * Edit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED***
  findIndex,
  get,
  has,
  isEmpty,
  isFunction,
  upperFirst,
***REMOVED*** from 'lodash';
// You can find these components in either
// ./node_modules/strapi-helper-plugin/lib/src
// or strapi/packages/strapi-helper-plugin/lib/src
import Input from 'components/InputsIndex';
import InputJSONWithErrors from 'components/InputJSONWithErrors';
import WysiwygWithErrors from 'components/WysiwygWithErrors';
import styles from './styles.scss';

const getInputType = (type = '') => ***REMOVED***
  switch (type.toLowerCase()) ***REMOVED***
    case 'boolean':
      return 'toggle';
    case 'bigint':
    case 'decimal':
    case 'float':
    case 'integer':
      return 'number';
    case 'date':
    case 'datetime':
      return 'date';
    case 'email':
      return 'email';
    case 'enumeration':
      return 'select';
    case 'password':
      return 'password';
    case 'string':
      return 'text';
    case 'text':
      return 'textarea';
    case 'file':
    case 'files':
      return 'file';
    case 'json':
      return 'json';
    default:
      return 'text';
***REMOVED***
***REMOVED***;

class Edit extends React.PureComponent ***REMOVED***
  getInputErrors = (attr) => ***REMOVED***
    const index = findIndex(this.props.formErrors, ['name', attr]);
    return index !== -1 ? this.props.formErrors[index].errors : [];
***REMOVED***

  /**
   * Retrieve the Input layout
   * @param  ***REMOVED***String***REMOVED*** attr [description]
   * @return ***REMOVED***Object***REMOVED***      Object containing the Input's label customBootstrapClass, ...
   */
  getInputLayout = (attr) => ***REMOVED***
    const ***REMOVED*** layout ***REMOVED*** = this.props;

    return Object.keys(get(layout, ['attributes', attr], ***REMOVED******REMOVED***)).reduce((acc, current) => ***REMOVED***
      acc[current] = isFunction(layout.attributes[attr][current]) ?
        layout.attributes[attr][current](this) :
        layout.attributes[attr][current];

      return acc;
***REMOVED***, ***REMOVED******REMOVED***);
***REMOVED***;

  /**
   * Retrieve the input's validations
   * @param  ***REMOVED***String***REMOVED*** attr
   * @return ***REMOVED***Object***REMOVED***
   */
  getInputValidations = (attr) => ***REMOVED***
    const ***REMOVED*** formValidations ***REMOVED*** = this.props;
    const index = findIndex(formValidations, ['name', attr]);

    return get(formValidations, [index, 'validations'], ***REMOVED******REMOVED***);
***REMOVED***

  /**
   * Retrieve all relations made with the upload plugin
   * @param  ***REMOVED***Object***REMOVED*** props
   * @return ***REMOVED***Object***REMOVED***
   */
  getUploadRelations = (props) => (
    Object.keys(get(props.schema, 'relations', ***REMOVED******REMOVED***)).reduce((acc, current) => ***REMOVED***
      if (get(props.schema, ['relations', current, 'plugin']) === 'upload') ***REMOVED***
        acc[current] = ***REMOVED***
          description: '',
          label: upperFirst(current),
          type: 'file',
  ***REMOVED***;
***REMOVED***

      return acc;
***REMOVED***, ***REMOVED******REMOVED***)
  )

  fileRelationAllowMultipleUpload = (relationName) => has(this.props.schema, ['relations', relationName, 'collection']);

  orderAttributes = () => get(this.props.schema, ['editDisplay', 'fields'], []);

  renderAttr = (attr, key) => ***REMOVED***
    if (attr.includes('__col-md')) ***REMOVED***
      const className = attr.split('__')[1];
      
      return <div key=***REMOVED***key***REMOVED*** className=***REMOVED***className***REMOVED*** />;
***REMOVED***

    const details = get(this.props.schema, ['editDisplay', 'availableFields', attr]);
    // Retrieve the input's bootstrapClass from the layout
    const layout = this.getInputLayout(attr);
    const appearance = get(layout, 'appearance');
    const type = !isEmpty(appearance) ? appearance.toLowerCase() : get(layout, 'type', getInputType(details.type));
    const inputDescription = get(details, 'description', null);
    const inputStyle = type === 'textarea' ? ***REMOVED*** height: '196px' ***REMOVED*** : ***REMOVED******REMOVED***;
    let className = get(layout, 'className');

    if (type === 'toggle' && !className) ***REMOVED***
      className = 'col-md-4';
***REMOVED***

    return (  
      <Input
        autoFocus=***REMOVED***key === 0***REMOVED***
        customBootstrapClass=***REMOVED***className***REMOVED***
        customInputs=***REMOVED******REMOVED*** json: InputJSONWithErrors, wysiwyg: WysiwygWithErrors ***REMOVED******REMOVED***
        didCheckErrors=***REMOVED***this.props.didCheckErrors***REMOVED***
        disabled=***REMOVED***!get(details, 'editable', true)***REMOVED***
        errors=***REMOVED***this.getInputErrors(attr)***REMOVED***
        inputDescription=***REMOVED***inputDescription***REMOVED***
        inputStyle=***REMOVED***inputStyle***REMOVED***
        key=***REMOVED***attr***REMOVED***
        label=***REMOVED***get(layout, 'label') || details.label || ''***REMOVED***
        multiple=***REMOVED***this.fileRelationAllowMultipleUpload(attr)***REMOVED***
        name=***REMOVED***attr***REMOVED***
        onBlur=***REMOVED***this.props.onBlur***REMOVED***
        onChange=***REMOVED***this.props.onChange***REMOVED***
        placeholder=***REMOVED***get(layout, 'placeholder') || details.placeholder || ''***REMOVED***
        resetProps=***REMOVED***this.props.resetProps***REMOVED***
        selectOptions=***REMOVED***get(this.props.attributes, [attr, 'enum'])***REMOVED***
        type=***REMOVED***type***REMOVED***
        validations=***REMOVED***this.getInputValidations(attr)***REMOVED***
        value=***REMOVED***this.props.record[attr]***REMOVED***
      />
    );
***REMOVED***

  render()***REMOVED***
    return (
      <div className=***REMOVED***styles.form***REMOVED***>
        <div className="row">
          ***REMOVED***this.orderAttributes().map(this.renderAttr)***REMOVED***
        </div>
      </div>
    );
***REMOVED***
***REMOVED***

Edit.defaultProps = ***REMOVED***
  attributes: ***REMOVED******REMOVED***,
  formErrors: [],
  formValidations: [],
  layout: ***REMOVED******REMOVED***,
  onBlur: () => ***REMOVED******REMOVED***,
  onChange: () => ***REMOVED******REMOVED***,
  record: ***REMOVED******REMOVED***,
  resetProps: false,
  schema: ***REMOVED******REMOVED***,
***REMOVED***;

Edit.propTypes = ***REMOVED***
  attributes: PropTypes.object,
  didCheckErrors: PropTypes.bool.isRequired,
  formErrors: PropTypes.array,
  formValidations: PropTypes.array,
  layout: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  record: PropTypes.object,
  resetProps: PropTypes.bool,
  schema: PropTypes.object,
***REMOVED***;

export default Edit;
