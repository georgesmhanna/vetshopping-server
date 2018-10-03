/* eslint-disable no-unused-vars */

function findLinkEntities(contentBlock, callback, contentState) ***REMOVED***
  contentBlock.findEntityRanges(character => ***REMOVED***
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
***REMOVED***, callback);
***REMOVED***

function findAtomicEntities(contentBlock, callback, contentState) ***REMOVED***
  contentBlock.findEntityRanges(character => ***REMOVED***
    const entityKey = character.getEntity();
    return entityKey !== null && contentBlock.getType() === 'atomic';
***REMOVED***, callback);
***REMOVED***

function findImageEntities(contentBlock, callback, contentState) ***REMOVED***
  contentBlock.findEntityRanges(character => ***REMOVED***
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE' && !isVideoType(contentState.getEntity(entityKey).getData().src);
***REMOVED***, callback);
***REMOVED***

function findVideoEntities(contentBlock, cb, contentState) ***REMOVED***
  contentBlock.findEntityRanges(character => ***REMOVED***
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE' && isVideoType(contentState.getEntity(entityKey).getData().src);
***REMOVED***, cb);
***REMOVED***

const isVideoType = (fileName) => /\.(mp4|mpg|mpeg|mov|avi)$/i.test(fileName);

export ***REMOVED*** findAtomicEntities, findLinkEntities, findImageEntities, findVideoEntities ***REMOVED***;
