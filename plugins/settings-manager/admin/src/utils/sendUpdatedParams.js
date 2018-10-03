import ***REMOVED*** forEach, includes, replace, trimStart, split, unset ***REMOVED*** from 'lodash';

export default function sendUpdatedParams(isCreatingNewFields) ***REMOVED***
  const prevSettings = this.props.home.initialData;
  const body = ***REMOVED******REMOVED***;

  forEach(this.props.home.modifiedData, (value, key) => ***REMOVED***
    if (value !== prevSettings[key] && key !== 'security.xframe.value.nested') ***REMOVED***
      body[key] = value;
***REMOVED***

    if (isCreatingNewFields && value && key !== 'security.xframe.value.nested') ***REMOVED***
      body[key] = value;
***REMOVED***

    else if (key === 'security.xframe.value.nested' && prevSettings['security.xframe.value.nested'] !== this.props.home.modifiedData['security.xframe.value.nested'] && this.props.home.modifiedData['security.xframe.value'] === 'ALLOW-FROM') ***REMOVED***

      const xFrameValue = `ALLOW-FROM.ALLOW-FROM $***REMOVED***trimStart(replace(this.props.home.modifiedData['security.xframe.value.nested'], 'ALLOW-FROM', ''))***REMOVED***`;
      body['security.xframe.value'] = xFrameValue;
***REMOVED***
***REMOVED***);

  const disabledSections = [];

  // Check all sections that depends on a toggle
  forEach(body, (bodyValue, target) => ***REMOVED***
    if (includes(target, 'enabled') && !bodyValue) disabledSections.push(split(target, '.')[1]);
***REMOVED***);

  // Remove disabled values
  forEach(disabledSections, (sectionName) => ***REMOVED***
    forEach(body, (v, bodyKey) => ***REMOVED***
      if (!includes(bodyKey, 'enabled') && includes(bodyKey, sectionName)) ***REMOVED***
        unset(body, bodyKey);
***REMOVED***
***REMOVED***);
***REMOVED***);

  return body;
***REMOVED***
