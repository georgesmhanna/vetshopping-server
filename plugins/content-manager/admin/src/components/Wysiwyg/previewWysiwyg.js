/**
 *
 * PreviewWysiwyg
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ***REMOVED***
  CompositeDecorator,
  ContentState,
  convertFromHTML,
  EditorState,
  ContentBlock,
  genKey,
  Entity,
  CharacterMetadata,
***REMOVED*** from 'draft-js';
import ***REMOVED*** List, OrderedSet, Repeat, fromJS ***REMOVED*** from 'immutable';
import cn from 'classnames';
import ***REMOVED*** isEmpty, toArray ***REMOVED*** from 'lodash';

import WysiwygEditor from 'components/WysiwygEditor';
import converter from './converter';
import ***REMOVED***
  findAtomicEntities,
  findLinkEntities,
  findImageEntities,
  findVideoEntities,
***REMOVED*** from './strategies';

import Image from './image';
import Link from './link';
import Video from './video';

import styles from './componentsStyles.scss';
/* eslint-disable react/no-unused-state */
function getBlockStyle(block) ***REMOVED***
  switch (block.getType()) ***REMOVED***
    case 'blockquote':
      return styles.editorBlockquote;
    case 'code-block':
      return styles.editorCodeBlock;
    case 'unstyled':
      return styles.editorParagraph;
    case 'unordered-list-item':
      return styles.unorderedList;
    case 'ordered-list-item':
    case 'header-one':
    case 'header-two':
    case 'header-three':
    case 'header-four':
    case 'header-five':
    case 'header-six':
    default:
      return null;
***REMOVED***
***REMOVED***

const decorator = new CompositeDecorator([
  ***REMOVED***
    strategy: findLinkEntities,
    component: Link,
***REMOVED***,
  ***REMOVED***
    strategy: findImageEntities,
    component: Image,
***REMOVED***,
  ***REMOVED***
    strategy: findVideoEntities,
    component: Video,
***REMOVED***,
  ***REMOVED***
    strategy: findAtomicEntities,
    component: Link,
***REMOVED***,
]);

const getBlockSpecForElement = aElement => (***REMOVED***
  contentType: 'link',
  aHref: aElement.href,
  aInnerHTML: aElement.innerHTML,
***REMOVED***);

const elementToBlockSpecElement = element => wrapBlockSpec(getBlockSpecForElement(element));

const wrapBlockSpec = blockSpec => ***REMOVED***
  if (blockSpec == null) ***REMOVED***
    return null;
***REMOVED***
  const tempEl = document.createElement('blockquote');
  // stringify meta data and insert it as text content of temp HTML element. We will later extract
  // and parse it.
  tempEl.innerText = JSON.stringify(blockSpec);
  return tempEl;
***REMOVED***;

const replaceElement = (oldEl, newEl) => ***REMOVED***
  if (!(newEl instanceof HTMLElement)) ***REMOVED***
    return;
***REMOVED***
  const parentNode = oldEl.parentNode;
  return parentNode.replaceChild(newEl, oldEl);
***REMOVED***;

const aReplacer = aElement => replaceElement(aElement, elementToBlockSpecElement(aElement));

const createContentBlock = (blockData = ***REMOVED******REMOVED***) => ***REMOVED***
  const ***REMOVED*** key, type, text, data, inlineStyles, entityData ***REMOVED*** = blockData;

  let blockSpec = ***REMOVED***
    type: type !== null && type !== undefined ? type : 'unstyled',
    text: text !== null && text !== undefined ? text : '',
    key: key !== null && key !== undefined ? key : genKey(),
***REMOVED***;

  if (data) ***REMOVED***
    blockSpec.data = fromJS(data);
***REMOVED***

  if (inlineStyles || entityData) ***REMOVED***
    let entityKey;
    if (entityData) ***REMOVED***
      const ***REMOVED*** type, mutability, data ***REMOVED*** = entityData;
      entityKey = Entity.create(type, mutability, data);
***REMOVED*** else ***REMOVED***
      entityKey = null;
***REMOVED***
    const style = OrderedSet(inlineStyles || []);
    const charData = CharacterMetadata.applyEntity(
      CharacterMetadata.create(***REMOVED*** style, entityKey ***REMOVED***),
      entityKey,
    );
    blockSpec.characterList = List(Repeat(charData, text.length));
***REMOVED***
  return new ContentBlock(blockSpec);
***REMOVED***;

class PreviewWysiwyg extends React.PureComponent ***REMOVED***
  state = ***REMOVED*** editorState: EditorState.createEmpty(), isMounted: false ***REMOVED***;

  componentDidMount() ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = this.props;
    this.setState(***REMOVED*** isMounted: true ***REMOVED***);

    if (!isEmpty(data)) ***REMOVED***
      this.previewHTML(data);
***REMOVED***
***REMOVED***

  // NOTE: This is not optimal and this lifecycle should be removed
  // I couldn't find a better way to decrease the fullscreen preview's data conversion time
  // Trying with componentDidUpdate didn't work
  UNSAFE_componentWillUpdate(nextProps, nextState) ***REMOVED***
    if (nextProps.data !== this.props.data) ***REMOVED***
      new Promise(resolve => ***REMOVED***
        setTimeout(() => ***REMOVED***
          if (nextProps.data === this.props.data && nextState.isMounted) ***REMOVED***
            // I use an handler here to update the state wich is fine since the condition above prevent
            // from entering into an infinite loop
            this.previewHTML(nextProps.data);
    ***REMOVED***
          resolve();
  ***REMOVED*** 300);
***REMOVED***);
***REMOVED***
***REMOVED***

  componentWillUnmount() ***REMOVED***
    this.setState(***REMOVED*** isMounted: false ***REMOVED***);
***REMOVED***

  getClassName = () => ***REMOVED***
    if (this.context.isFullscreen) ***REMOVED***
      return cn(styles.editor, styles.editorFullScreen, styles.fullscreenPreviewEditor);
***REMOVED***

    return styles.editor;
***REMOVED***;

  previewHTML = rawContent => ***REMOVED***
    const initHtml = isEmpty(rawContent) ? '<p></p>' : rawContent;
    const html = new DOMParser().parseFromString(converter.makeHtml(initHtml), 'text/html');
    toArray(html.getElementsByTagName('a')) // Retrieve all the links <a> tags
      .filter((value) => value.getElementsByTagName('img').length > 0) // Filter by checking if they have any <img> children
      .forEach(aReplacer); // Change those links into <blockquote> elements so we can set some metacharacters with the img content

    // TODO:
    // in the same way, retrieve all <pre> tags
    // create custom atomic block
    // create custom code block
    let blocksFromHTML = convertFromHTML(html.body.innerHTML);

    if (blocksFromHTML.contentBlocks) ***REMOVED***
      blocksFromHTML = blocksFromHTML.contentBlocks.reduce((acc, block) => ***REMOVED***
        if (block.getType() === 'blockquote') ***REMOVED***
          try ***REMOVED***
            const ***REMOVED*** aHref, aInnerHTML ***REMOVED*** = JSON.parse(block.getText());
            const entityData = ***REMOVED***
              type: 'LINK',
              mutability: 'IMMUTABLE',
              data: ***REMOVED***
                aHref,
                aInnerHTML,
        ***REMOVED***
      ***REMOVED***;

            const blockSpec = Object.assign(
              ***REMOVED*** type: 'atomic', text: ' ', key: block.getKey() ***REMOVED***,
              ***REMOVED*** entityData ***REMOVED***,
            );
            const atomicBlock = createContentBlock(blockSpec); // Create an atomic block so we can identify it easily

            return acc.concat([atomicBlock]);
    ***REMOVED*** catch (err) ***REMOVED***
            return acc.concat(block);
    ***REMOVED***
  ***REMOVED***

        return acc.concat(block);
***REMOVED*** []);

      const contentState = ContentState.createFromBlockArray(blocksFromHTML);

      return this.setState(***REMOVED*** editorState: EditorState.createWithContent(contentState, decorator) ***REMOVED***);
***REMOVED***

    return this.setState(***REMOVED*** editorState: EditorState.createEmpty() ***REMOVED***);
***REMOVED***;

  render() ***REMOVED***
    const ***REMOVED*** placeholder ***REMOVED*** = this.context;
    // this.previewHTML2(this.props.data);
    return (
      <div className=***REMOVED***this.getClassName()***REMOVED***>
        <WysiwygEditor
          blockStyleFn=***REMOVED***getBlockStyle***REMOVED***
          editorState=***REMOVED***this.state.editorState***REMOVED***
          onChange=***REMOVED***() => ***REMOVED******REMOVED******REMOVED***
          placeholder=***REMOVED***placeholder***REMOVED***
        />
        <input className=***REMOVED***styles.editorInput***REMOVED*** value="" tabIndex="-1" />
      </div>
    );
***REMOVED***
***REMOVED***

PreviewWysiwyg.contextTypes = ***REMOVED***
  isFullscreen: PropTypes.bool,
  placeholder: PropTypes.string,
***REMOVED***;

PreviewWysiwyg.defaultProps = ***REMOVED***
  data: '',
***REMOVED***;

PreviewWysiwyg.propTypes = ***REMOVED***
  data: PropTypes.string,
***REMOVED***;

export default PreviewWysiwyg;
