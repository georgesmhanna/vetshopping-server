/**
 *
 * LeftMenuLinkContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import ***REMOVED*** findIndex, get, snakeCase, isEmpty, map, sortBy ***REMOVED*** from 'lodash';

import LeftMenuLink from 'components/LeftMenuLink';

import styles from './styles.scss';
import messages from './messages.json';

function LeftMenuLinkContainer(***REMOVED*** layout, plugins ***REMOVED***) ***REMOVED***
  const pluginsObject = plugins.toJS();
  
  // Generate the list of sections
  const pluginsSections = Object.keys(pluginsObject).reduce((acc, current) => ***REMOVED***
    pluginsObject[current].leftMenuSections.forEach((section = ***REMOVED******REMOVED***) => ***REMOVED***
      if (!isEmpty(section.links)) ***REMOVED***
        acc[snakeCase(section.name)] = ***REMOVED***
          name: section.name,
          links: get(acc[snakeCase(section.name)], 'links', []).concat(
            section.links.map(link => ***REMOVED***
              link.source = current;
              link.plugin = !isEmpty(pluginsObject[link.plugin])
                ? link.plugin
                : pluginsObject[current].id;

              return link;
      ***REMOVED***),
          ),
  ***REMOVED***;
***REMOVED***
***REMOVED***);

    return acc;
***REMOVED***, ***REMOVED******REMOVED***);
  
  const linkSections = Object.keys(pluginsSections).map((current, j) => ***REMOVED***
    const contentTypesToShow = get(layout, 'layout.contentTypesToShow');
    const contentTypes = contentTypesToShow
      ? pluginsSections[current].links.filter(
        obj => findIndex(contentTypesToShow, ['destination', obj.destination]) !== -1,
      )
      : pluginsSections[current].links;

    return (
      <div key=***REMOVED***j***REMOVED***>
        <p className=***REMOVED***styles.title***REMOVED***>***REMOVED***pluginsSections[current].name***REMOVED***</p>
        <ul className=***REMOVED***styles.list***REMOVED***>
          ***REMOVED***sortBy(contentTypes, 'label').map((link, i) => (
            <LeftMenuLink
              key=***REMOVED***`$***REMOVED***i***REMOVED***-$***REMOVED***link.label***REMOVED***`***REMOVED***
              icon=***REMOVED***link.icon || 'caret-right'***REMOVED***
              label=***REMOVED***link.label***REMOVED***
              destination=***REMOVED***`/plugins/$***REMOVED***link.plugin***REMOVED***/$***REMOVED***link.destination***REMOVED***`***REMOVED***
              source=***REMOVED***link.source***REMOVED***
            />
          ))***REMOVED***
        </ul>
      </div>
    );
***REMOVED***);

  // Check if the plugins list is empty or not and display plugins by name
  const pluginsLinks = !isEmpty(pluginsObject) ? (
    map(sortBy(pluginsObject, 'name'), plugin => ***REMOVED***
      if (plugin.id !== 'email' && plugin.id !== 'settings-manager') ***REMOVED***
        const basePath = `/plugins/$***REMOVED***get(plugin, 'id')***REMOVED***`;
        // NOTE: this should be dynamic
        const destination = plugin.id === 'content-manager' ? `$***REMOVED***basePath***REMOVED***/ctm-configurations` : basePath;

        return (
          <LeftMenuLink
            key=***REMOVED***get(plugin, 'id')***REMOVED***
            icon=***REMOVED***get(plugin, 'icon') || 'plug'***REMOVED***
            label=***REMOVED***get(plugin, 'name')***REMOVED***
            destination=***REMOVED***destination***REMOVED***
          />
        );
***REMOVED***
***REMOVED***)
  ) : (
    <li className=***REMOVED***styles.noPluginsInstalled***REMOVED***>
      <FormattedMessage ***REMOVED***...messages.noPluginsInstalled***REMOVED*** />.
    </li>
  );

  const hasSettingsManager = get(pluginsObject, 'settings-manager', null);

  return (
    <div className=***REMOVED***styles.leftMenuLinkContainer***REMOVED***>
      ***REMOVED***linkSections***REMOVED***
      <div>
        <p className=***REMOVED***styles.title***REMOVED***>
          <FormattedMessage ***REMOVED***...messages.plugins***REMOVED*** />
        </p>
        <ul className=***REMOVED***styles.list***REMOVED***>***REMOVED***pluginsLinks***REMOVED***</ul>
      </div>
      <div>
        <p className=***REMOVED***styles.title***REMOVED***>
          <FormattedMessage ***REMOVED***...messages.general***REMOVED*** />
        </p>
        <ul className=***REMOVED***styles.list***REMOVED***>
          <LeftMenuLink icon="list" label=***REMOVED***messages.listPlugins.id***REMOVED*** destination="/list-plugins" />
          <LeftMenuLink
            icon="shopping-basket"
            label=***REMOVED***messages.installNewPlugin.id***REMOVED***
            destination="/install-plugin"
          />
          ***REMOVED***hasSettingsManager && (
            <LeftMenuLink
              icon="gear"
              label=***REMOVED***messages.configuration.id***REMOVED***
              destination="/plugins/settings-manager"
            />
          )***REMOVED***
        </ul>
      </div>
    </div>
  );
***REMOVED***

LeftMenuLinkContainer.defaultProps = ***REMOVED***
  layout: ***REMOVED******REMOVED***,
***REMOVED***;

LeftMenuLinkContainer.propTypes = ***REMOVED***
  layout: PropTypes.object,
  plugins: PropTypes.object.isRequired,
***REMOVED***;

export default LeftMenuLinkContainer;
