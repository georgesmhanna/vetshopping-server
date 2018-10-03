/**
*
* List
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** map, omitBy, size ***REMOVED*** from 'lodash';
import cn from 'classnames';

// Components from strapi-helper-plugin
import LoadingBar from 'components/LoadingBar';
import LoadingIndicator from 'components/LoadingIndicator';

// Design
import Button from 'components/Button';
import ListRow from 'components/ListRow';

import styles from './styles.scss';

const generateListTitle = (data, settingType) => ***REMOVED***
  switch (settingType) ***REMOVED***
    case 'roles': ***REMOVED***
      const title = size(data) < 2 ?
        <FormattedMessage id="users-permissions.List.title.roles.singular" values=***REMOVED******REMOVED*** number: size(data) ***REMOVED******REMOVED*** />
        : <FormattedMessage id="users-permissions.List.title.roles.plural" values=***REMOVED******REMOVED*** number: size(data) ***REMOVED******REMOVED*** />;

      return title;
***REMOVED***
    case 'providers': ***REMOVED***
      const enabledProvidersSize = data.filter(o => o.enabled).length;

      const enabledProviders = enabledProvidersSize > 1 ?
        <FormattedMessage id="users-permissions.List.title.providers.enabled.plural" values=***REMOVED******REMOVED*** number: enabledProvidersSize ***REMOVED******REMOVED*** />
        : <FormattedMessage id="users-permissions.List.title.providers.enabled.singular" values=***REMOVED******REMOVED*** number: enabledProvidersSize ***REMOVED******REMOVED*** />;

      const disabledProviders = size(data) - enabledProvidersSize > 1 ?
        <FormattedMessage id="users-permissions.List.title.providers.disabled.plural" values=***REMOVED******REMOVED*** number: size(data) - enabledProvidersSize ***REMOVED******REMOVED*** />
        : <FormattedMessage id="users-permissions.List.title.providers.disabled.plural" values=***REMOVED******REMOVED*** number: size(data) - enabledProvidersSize ***REMOVED******REMOVED*** />;

      return <div>***REMOVED***enabledProviders***REMOVED***&nbsp;***REMOVED***disabledProviders***REMOVED***</div>;

***REMOVED***
    case 'email-templates': ***REMOVED***
      return size(data) > 1 ?
        <FormattedMessage id="users-permissions.List.title.emailTemplates.plural" values=***REMOVED******REMOVED*** number: size(data) ***REMOVED******REMOVED*** />
        : <FormattedMessage id="users-permissions.List.title.emailTemplates.singular" values=***REMOVED******REMOVED*** number: size(data) ***REMOVED******REMOVED*** />;
***REMOVED***
    default:
      return '';
***REMOVED***
***REMOVED***;

function List(***REMOVED*** data, deleteData, noButton, onButtonClick, settingType, showLoaders, values ***REMOVED***) ***REMOVED***
  const object = omitBy(data, (v) => v.name === 'server'); // Remove the server key when displaying providers

  return (
    <div className=***REMOVED***styles.list***REMOVED***>
      <div className=***REMOVED***styles.flex***REMOVED***>
        <div className=***REMOVED***styles.titleContainer***REMOVED***>
          ***REMOVED***showLoaders ? <LoadingBar style=***REMOVED******REMOVED*** marginTop: '0' ***REMOVED******REMOVED*** /> : generateListTitle(data, settingType)***REMOVED***
        </div>
        <div className=***REMOVED***styles.buttonContainer***REMOVED***>
          ***REMOVED***noButton ? (
            ''
          ) : (
            <Button onClick=***REMOVED***onButtonClick***REMOVED*** secondaryHotlineAdd>
              <FormattedMessage id=***REMOVED***`users-permissions.List.button.$***REMOVED***settingType***REMOVED***`***REMOVED*** />
            </Button>
          )***REMOVED***
        </div>
      </div>
      <div className=***REMOVED***cn(styles.ulContainer, showLoaders && styles.loadingContainer, showLoaders && settingType === 'roles' && styles.loadingContainerRole )***REMOVED***>
        ***REMOVED***showLoaders ? <LoadingIndicator /> : (
          <ul className=***REMOVED***noButton ? styles.listPadded : ''***REMOVED***>
            ***REMOVED***map(object, item => (
              <ListRow
                deleteData=***REMOVED***deleteData***REMOVED***
                item=***REMOVED***item***REMOVED***
                key=***REMOVED***item.name***REMOVED***
                settingType=***REMOVED***settingType***REMOVED***
                values=***REMOVED***values***REMOVED***
              />
            ))***REMOVED***
          </ul>
        )***REMOVED***
      </div>
    </div>
  );
***REMOVED***

List.defaultProps = ***REMOVED***
  noButton: false,
  onButtonClick: () => ***REMOVED******REMOVED***,
  showLoaders: true,
***REMOVED***;

List.propTypes = ***REMOVED***
  data: PropTypes.array.isRequired,
  deleteData: PropTypes.func.isRequired,
  noButton: PropTypes.bool,
  onButtonClick: PropTypes.func,
  settingType: PropTypes.string.isRequired,
  showLoaders: PropTypes.bool,
  values: PropTypes.object.isRequired,
***REMOVED***;

export default List;
