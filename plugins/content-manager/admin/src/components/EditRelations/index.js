/**
 *
 * EditRelations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED*** get ***REMOVED*** from 'lodash';

// Components.
import SelectOne from 'components/SelectOne';
import SelectMany from 'components/SelectMany';

import styles from './styles.scss';

function EditRelations(props) ***REMOVED***
  return (
    <div className=***REMOVED***styles.editFormRelations***REMOVED***>
      ***REMOVED***props.displayedRelations.map(relationName => ***REMOVED***
        const relation = get(props.schema, ['relations', relationName], ***REMOVED******REMOVED***);

        if(['oneWay', 'oneToOne', 'manyToOne', 'oneToManyMorph', 'oneToOneMorph'].includes(relation.nature)) ***REMOVED***
          return (
            <SelectOne
              currentModelName=***REMOVED***props.currentModelName***REMOVED***
              key=***REMOVED***relationName***REMOVED***
              record=***REMOVED***props.record***REMOVED***
              relation=***REMOVED***relation***REMOVED***
              schema=***REMOVED***props.schema***REMOVED***
              setRecordAttribute=***REMOVED***props.changeData***REMOVED***
              location=***REMOVED***props.location***REMOVED***
              onRedirect=***REMOVED***props.onRedirect***REMOVED***
            />
          );
  ***REMOVED*** 
        
        return (
          <SelectMany
            currentModelName=***REMOVED***props.currentModelName***REMOVED***
            key=***REMOVED***relationName***REMOVED***
            isDraggingSibling=***REMOVED***props.isDraggingSibling***REMOVED***
            location=***REMOVED***props.location***REMOVED***
            moveAttr=***REMOVED***props.moveAttr***REMOVED***
            moveAttrEnd=***REMOVED***props.moveAttrEnd***REMOVED***
            onAddRelationalItem=***REMOVED***props.onAddRelationalItem***REMOVED***
            onRedirect=***REMOVED***props.onRedirect***REMOVED***
            onRemoveRelationItem=***REMOVED***props.onRemoveRelationItem***REMOVED***
            record=***REMOVED***props.record***REMOVED***
            relation=***REMOVED***relation***REMOVED***
            schema=***REMOVED***props.schema***REMOVED***
          />
        );
***REMOVED***)***REMOVED***
    </div>
  );
***REMOVED***

EditRelations.defaultProps = ***REMOVED***
  displayedRelations: [],
  isDraggingSibling: false,
  moveAttr: () => ***REMOVED******REMOVED***,
  moveAttrEnd: () => ***REMOVED******REMOVED***,
  record: ***REMOVED******REMOVED***,
  schema: ***REMOVED******REMOVED***,
***REMOVED***;

EditRelations.propTypes = ***REMOVED***
  changeData: PropTypes.func.isRequired,
  currentModelName: PropTypes.string.isRequired,
  displayedRelations: PropTypes.array,
  isDraggingSibling: PropTypes.bool,
  location: PropTypes.object.isRequired,
  moveAttr: PropTypes.func,
  moveAttrEnd: PropTypes.func,
  onAddRelationalItem: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
  onRemoveRelationItem: PropTypes.func.isRequired,
  record: PropTypes.object,
  schema: PropTypes.object,
***REMOVED***;

export default EditRelations;
