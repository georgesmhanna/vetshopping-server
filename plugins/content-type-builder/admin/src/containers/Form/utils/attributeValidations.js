import ***REMOVED*** get, filter, isNumber, size, split, isEmpty, has, map, concat, includes ***REMOVED*** from 'lodash';

export default function checkAttributeValidations(errors) ***REMOVED***

  const attributeIndex = split(this.props.hash, '::')[3];
  const sameAttributes = filter(this.props.contentTypeData.attributes, (attr) => attr.name === this.props.modifiedDataAttribute.name);
  const sameParamsKey = filter(this.props.contentTypeData.attributes, (attr) =>
    attr.params.key !== '-' && attr.params.key === this.props.modifiedDataAttribute.params.key && attr.params.target === this.props.modifiedDataAttribute.params.target);
  const sameParamsKeyAndName = filter(this.props.contentTypeData.attributes, (attr) => attr.name === this.props.modifiedDataAttribute.params.key);
  const formErrors = concat(errors, hasNestedValue(this.props.modifiedDataAttribute));
  const isEditingParamsKey = this.props.modifiedDataAttribute.params.key !== get(this.props.contentTypeData.attributes, [attributeIndex, 'params', 'key']);

  // Check if params key is filled
  if (has(this.props.modifiedDataAttribute, ['params', 'key'])) ***REMOVED***
    if (isEmpty(this.props.modifiedDataAttribute.params.key)) ***REMOVED***
      formErrors.push(***REMOVED*** name: 'params.key', errors: [***REMOVED*** id: 'content-type-builder.error.validation.required' ***REMOVED***] ***REMOVED***);
***REMOVED***
***REMOVED***

  // Check attribute name uniqueness
  if (size(sameAttributes) > 0 && this.props.modifiedDataAttribute.name !== get(this.props.contentTypeData.attributes, [attributeIndex, 'name'])) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'name', errors: [***REMOVED*** id: 'content-type-builder.error.attribute.taken' ***REMOVED***]***REMOVED***);
***REMOVED***

  // Check key uniqueness
  if (size(sameParamsKey) > 0 && isEditingParamsKey) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'params.key', errors: [***REMOVED*** id: 'content-type-builder.error.attribute.key.taken' ***REMOVED***]***REMOVED***);
***REMOVED***

  if (size(sameParamsKeyAndName) > 0 && isEditingParamsKey) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'params.key', errors: [***REMOVED*** id: 'content-type-builder.error.attribute.key.taken' ***REMOVED***]***REMOVED***);
***REMOVED***


  if (get(this.props.modifiedDataAttribute, 'name') === get(this.props.modifiedDataAttribute.params, 'key') && this.props.modifiedDataAttribute.params.target === this.props.modelName) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'params.key', errors: [***REMOVED*** id: 'content-type-builder.error.attribute.sameKeyAndName' ***REMOVED***]***REMOVED***);
***REMOVED***

  const reserved = [
    'id',
    'set',
    'value',
    'emit',
    'on',
    'once',
    'listeners',
    'removeListener',
    'collection',
    'db',
    'isModified',
    'isNew',
    'get',
    'modelName',
    'save',
    'schema',
    'toObject',
    'validate',
    'remove',
    '_pres',
    '_posts',
  ];

  if (includes(reserved, get(this.props.modifiedDataAttribute, 'name'))) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'name', errors: [***REMOVED*** id: 'content-type-builder.error.attribute.forbidden' ***REMOVED***]***REMOVED***);
***REMOVED***

  return formErrors;
***REMOVED***


const hasNestedValue = (attributeData) => ***REMOVED***
  const formErrors = [];
  const keys = [
    'min',
    'minLength',
    'max',
    'maxLength',
  ];

  map(keys, (key) => ***REMOVED***
    if (get(attributeData, ['params', key])) ***REMOVED***
      if (!isNumber(get(attributeData, ['params', `$***REMOVED***key***REMOVED***Value`]))) ***REMOVED***
        formErrors.push(***REMOVED*** name: `params.$***REMOVED***key***REMOVED***Value`, errors: [***REMOVED*** id: 'content-type-builder.error.validation.required' ***REMOVED***] ***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***);

  if (isNumber(get(attributeData.params, 'maxValue')) && get(attributeData.params, ['minValue']) > get(attributeData.params, 'maxValue')) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'params.minValue', errors: [***REMOVED*** id: 'content-type-builder.error.validation.minSupMax' ***REMOVED*** ] ***REMOVED***);
***REMOVED***

  if (isNumber(get(attributeData.params, 'maxLengthValue')) && get(attributeData.params, ['minLengthValue']) > get(attributeData.params, 'maxLengthValue')) ***REMOVED***
    formErrors.push(***REMOVED*** name: 'params.minLengthValue', errors: [***REMOVED*** id: 'content-type-builder.error.validation.minSupMax' ***REMOVED*** ] ***REMOVED***);
***REMOVED***

  return formErrors;
***REMOVED***;
