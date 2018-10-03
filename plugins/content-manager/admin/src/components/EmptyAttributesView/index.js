/**
*
* EmptyAttributesView
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** FormattedMessage ***REMOVED*** from 'react-intl';
import Button from 'components/Button';
import PluginHeader from 'components/PluginHeader';
import styles from './styles.scss';

function EmptyAttributesView(***REMOVED*** currentModelName, history, modelEntries ***REMOVED***) ***REMOVED***
  return (
    <div className=***REMOVED***styles.container***REMOVED***>
      <PluginHeader
        title=***REMOVED******REMOVED***
          id: currentModelName,
  ***REMOVED******REMOVED***
        description=***REMOVED******REMOVED***
          id: 'content-manager.containers.List.pluginHeaderDescription',
          values: ***REMOVED***
            label: modelEntries,
    ***REMOVED***
  ***REMOVED******REMOVED***
        actions=***REMOVED***[]***REMOVED***
      />
      <div>
        <div className=***REMOVED***styles.emptyAttributesView***REMOVED***>
          <div>
            <FormattedMessage id="content-manager.emptyAttributes.title">
              ***REMOVED***(title) => <div className=***REMOVED***styles.title***REMOVED***>***REMOVED***title***REMOVED***</div>***REMOVED***
            </FormattedMessage>
            <FormattedMessage id="content-manager.emptyAttributes.description">
              ***REMOVED***(description) => <div className=***REMOVED***styles.description***REMOVED***>***REMOVED***description***REMOVED***</div>***REMOVED***
            </FormattedMessage>
            <div className=***REMOVED***styles.buttonContainer***REMOVED***>
              <Button
                onClick=***REMOVED***() => history.push(`/plugins/content-type-builder/models/$***REMOVED***currentModelName***REMOVED***#choose::attributes`)***REMOVED***
                primaryAddShape
                label="content-manager.emptyAttributes.button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
***REMOVED***

EmptyAttributesView.propTypes = ***REMOVED***
  currentModelName: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  modelEntries: PropTypes.number.isRequired,
***REMOVED***;

export default EmptyAttributesView;
