/**
 *
 * Wysiwyg
 *
 */
import React from 'react';
import ***REMOVED***
  ContentState,
  EditorState,
  getDefaultKeyBinding,
  genKey,
  Modifier,
  RichUtils,
  SelectionState,
***REMOVED*** from 'draft-js';
import PropTypes from 'prop-types';
import ***REMOVED*** isEmpty, isNaN, replace, words ***REMOVED*** from 'lodash';
import cn from 'classnames';
import Controls from 'components/WysiwygInlineControls';
import Drop from 'components/WysiwygDropUpload';
import WysiwygBottomControls from 'components/WysiwygBottomControls';
import WysiwygEditor from 'components/WysiwygEditor';
import request from 'utils/request';
import CustomSelect from './customSelect';
import PreviewControl from './previewControl';
import PreviewWysiwyg from './previewWysiwyg';
import ToggleMode from './toggleMode';
import ***REMOVED*** CONTROLS ***REMOVED*** from './constants';
import ***REMOVED***
  getBlockContent,
  getBlockStyle,
  getDefaultSelectionOffsets,
  getKeyCommandData,
  getOffSets,
***REMOVED*** from './helpers';
import ***REMOVED***
  createNewBlock,
  getNextBlocksList,
  getSelectedBlocksList,
  onTab,
  updateSelection,
***REMOVED*** from './utils';
import styles from './styles.scss';

/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/sort-comp */
class Wysiwyg extends React.Component ***REMOVED***
  constructor(props) ***REMOVED***
    super(props);
    this.state = ***REMOVED***
      editorState: EditorState.createEmpty(),
      isDraging: false,
      isFocused: false,
      isFullscreen: false,
      isPreviewMode: false,
      headerValue: '',
***REMOVED***;
    this.focus = () => ***REMOVED***
      this.setState(***REMOVED*** isFocused: true ***REMOVED***);
      return this.domEditor.focus();
***REMOVED***;
    this.blur = () => ***REMOVED***
      this.setState(***REMOVED*** isFocused: false ***REMOVED***);
      return this.domEditor.blur();
***REMOVED***;
***REMOVED***

  getChildContext = () => (***REMOVED***
    handleChangeSelect: this.handleChangeSelect,
    headerValue: this.state.headerValue,
    html: this.props.value,
    isPreviewMode: this.state.isPreviewMode,
    isFullscreen: this.state.isFullscreen,
    placeholder: this.props.placeholder,
***REMOVED***);

  componentDidMount() ***REMOVED***
    if (this.props.autoFocus) ***REMOVED***
      this.focus();
***REMOVED***

    if (!isEmpty(this.props.value)) ***REMOVED***
      this.setInitialValue(this.props);
***REMOVED***
***REMOVED***

  shouldComponentUpdate(nextProps, nextState) ***REMOVED***
    if (nextState.editorState !== this.state.editorState) ***REMOVED***
      return true;
***REMOVED***

    if (nextProps.resetProps !== this.props.resetProps) ***REMOVED***
      return true;
***REMOVED***

    if (nextState.isDraging !== this.state.isDraging) ***REMOVED***
      return true;
***REMOVED***

    if (nextState.isFocused !== this.state.isFocused) ***REMOVED***
      return true;
***REMOVED***

    if (nextState.isFullscreen !== this.state.isFullscreen) ***REMOVED***
      return true;
***REMOVED***

    if (nextState.isPreviewMode !== this.state.isPreviewMode) ***REMOVED***
      return true;
***REMOVED***

    if (nextState.headerValue !== this.state.headerValue) ***REMOVED***
      return true;
***REMOVED***

    return false;
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    // Handle resetProps
    if (prevProps.resetProps !== this.props.resetProps) ***REMOVED***
      this.setInitialValue(this.props);
***REMOVED***
***REMOVED***

  /**
   * Init the editor with data from
   * @param ***REMOVED***[type]***REMOVED*** props [description]
   */
  setInitialValue = props => ***REMOVED***
    const contentState = ContentState.createFromText(props.value);
    const newEditorState = EditorState.createWithContent(contentState);
    const editorState = this.state.isFocused
      ? EditorState.moveFocusToEnd(newEditorState)
      : newEditorState;
    return this.setState(***REMOVED*** editorState ***REMOVED***);
***REMOVED***;

  /**
   * Handler to add B, I, Strike, U, link
   * @param ***REMOVED***String***REMOVED*** content usually something like **textToReplace**
   * @param ***REMOVED***String***REMOVED*** style
   */
  addContent = (content, style) => ***REMOVED***
    const selectedText = this.getSelectedText();
    // Retrieve the associated data for the type to add
    const ***REMOVED*** innerContent, endReplacer, startReplacer ***REMOVED*** = getBlockContent(style);
    // Replace the selected text by the markdown command or insert default text
    const defaultContent =
      selectedText === ''
        ? replace(content, 'textToReplace', innerContent)
        : replace(content, 'textToReplace', selectedText);
    // Get the current cursor position
    const cursorPosition = getOffSets(this.getSelection()).start;
    const textWithEntity = this.modifyBlockContent(defaultContent);
    // Highlight the text
    const ***REMOVED*** anchorOffset, focusOffset ***REMOVED*** = getDefaultSelectionOffsets(
      defaultContent,
      startReplacer,
      endReplacer,
      cursorPosition,
    );
    // Merge the current selection with the new one
    const updatedSelection = this.getSelection().merge(***REMOVED*** anchorOffset, focusOffset ***REMOVED***);
    const newEditorState = EditorState.push(
      this.getEditorState(),
      textWithEntity,
      'insert-character',
    );
    // Update the parent reducer
    this.sendData(newEditorState);
    // Don't handle selection : the user has selected some text to be changed with the appropriate markdown
    if (selectedText !== '') ***REMOVED***
      return this.setState(
        ***REMOVED***
          editorState: newEditorState,
  ***REMOVED***
        () => ***REMOVED***
          this.focus();
  ***REMOVED***
      );
***REMOVED***

    return this.setState(***REMOVED***
      // Highlight the text if the selection wad empty
      editorState: EditorState.forceSelection(newEditorState, updatedSelection),
***REMOVED***);
***REMOVED***;

  /**
   * Create an ordered list block
   * @return ContentBlock
   */
  addOlBlock = () => ***REMOVED***
    // Get all the selected blocks
    const selectedBlocksList = getSelectedBlocksList(this.getEditorState());
    let newEditorState = this.getEditorState();

    // Check if the cursor is NOT at the beginning of a new line
    // So we need to move all the next blocks
    if (getOffSets(this.getSelection()).start !== 0) ***REMOVED***
      // Retrieve all the blocks after the current position
      const nextBlocks = getNextBlocksList(newEditorState, this.getSelection().getStartKey());
      let liNumber = 1;

      // Loop to update each block after the inserted li
      nextBlocks.map((block, index) => ***REMOVED***
        const previousContent =
          index === 0
            ? this.getEditorState()
              .getCurrentContent()
              .getBlockForKey(this.getCurrentAnchorKey())
            : newEditorState.getCurrentContent().getBlockBefore(block.getKey());
        // Check if there was an li before the position so we update the entire list bullets
        const number = previousContent ? parseInt(previousContent.getText().split('.')[0], 10) : 0;
        liNumber = isNaN(number) ? 1 : number + 1;
        const nextBlockText = index === 0 ? `$***REMOVED***liNumber***REMOVED***. ` : nextBlocks.get(index - 1).getText();
        // Update the current block
        const newBlock = createNewBlock(nextBlockText, 'block-list', block.getKey());
        // Update the contentState
        const newContentState = this.createNewContentStateFromBlock(
          newBlock,
          newEditorState.getCurrentContent(),
        );
        newEditorState = EditorState.push(newEditorState, newContentState);
***REMOVED***);

      // Move the cursor to the correct position and add a space after '.'
      // 2 for the dot and the space after, we add the number length (10 = offset of 2)
      const offset = 2 + liNumber.toString().length;
      const updatedSelection = updateSelection(this.getSelection(), nextBlocks, offset);

      return this.setState(***REMOVED***
        editorState: EditorState.acceptSelection(newEditorState, updatedSelection),
***REMOVED***);
***REMOVED***

    // If the cursor is at the beginning we need to move all the content after the cursor so we don't loose the data
    selectedBlocksList.map((block, i) => ***REMOVED***
      const selectedText = block.getText();
      const li = selectedText === '' ? `$***REMOVED***i + 1***REMOVED***. ` : `$***REMOVED***i + 1***REMOVED***. $***REMOVED***selectedText***REMOVED***`;
      const newBlock = createNewBlock(li, 'block-list', block.getKey());
      const newContentState = this.createNewContentStateFromBlock(
        newBlock,
        newEditorState.getCurrentContent(),
      );
      newEditorState = EditorState.push(newEditorState, newContentState);
***REMOVED***);

    // Update the parent reducer
    this.sendData(newEditorState);

    return this.setState(***REMOVED*** editorState: EditorState.moveFocusToEnd(newEditorState) ***REMOVED***);
***REMOVED***;

  /**
   * Create an unordered list
   * @return ContentBlock
   */
  // NOTE: it's pretty much the same dynamic as above
  // We don't use the same handler because it needs less logic than a ordered list
  // so it's easier to maintain the code
  addUlBlock = () => ***REMOVED***
    const selectedBlocksList = getSelectedBlocksList(this.getEditorState());
    let newEditorState = this.getEditorState();

    if (getOffSets(this.getSelection()).start !== 0) ***REMOVED***
      const nextBlocks = getNextBlocksList(newEditorState, this.getSelection().getStartKey());

      nextBlocks.map((block, index) => ***REMOVED***
        const nextBlockText = index === 0 ? '- ' : nextBlocks.get(index - 1).getText();
        const newBlock = createNewBlock(nextBlockText, 'block-list', block.getKey());
        const newContentState = this.createNewContentStateFromBlock(
          newBlock,
          newEditorState.getCurrentContent(),
        );
        newEditorState = EditorState.push(newEditorState, newContentState);
***REMOVED***);
      const updatedSelection = updateSelection(this.getSelection(), nextBlocks, 2);

      return this.setState(***REMOVED***
        editorState: EditorState.acceptSelection(newEditorState, updatedSelection),
***REMOVED***);
***REMOVED***

    selectedBlocksList.map(block => ***REMOVED***
      const selectedText = block.getText();
      const li = selectedText === '' ? '- ' : `- $***REMOVED***selectedText***REMOVED***`;
      const newBlock = createNewBlock(li, 'block-list', block.getKey());
      const newContentState = this.createNewContentStateFromBlock(
        newBlock,
        newEditorState.getCurrentContent(),
      );
      newEditorState = EditorState.push(newEditorState, newContentState);
***REMOVED***);
    this.sendData(newEditorState);
    return this.setState(***REMOVED*** editorState: EditorState.moveFocusToEnd(newEditorState) ***REMOVED***);
***REMOVED***;

  /**
   * Handler to create header
   * @param ***REMOVED***String***REMOVED*** text header content
   */
  addBlock = text => ***REMOVED***
    const nextBlockKey = this.getNextBlockKey(this.getCurrentAnchorKey()) || genKey();
    const newBlock = createNewBlock(text, 'header', nextBlockKey);
    const newContentState = this.createNewContentStateFromBlock(newBlock);
    const newEditorState = this.createNewEditorState(newContentState, text);

    return this.setState(
      ***REMOVED***
        editorState: newEditorState,
***REMOVED***
      () => ***REMOVED***
        this.focus();
***REMOVED***
    );
***REMOVED***;

  /**
   * Handler used for code block and Img controls
   * @param ***REMOVED***String***REMOVED*** content the text that will be added
   * @param ***REMOVED***String***REMOVED*** style   the type
   */
  addSimpleBlockWithSelection = (content, style) => ***REMOVED***
    const selectedText = this.getSelectedText();
    const ***REMOVED*** innerContent, endReplacer, startReplacer ***REMOVED*** = getBlockContent(style);
    const defaultContent =
      selectedText === ''
        ? replace(content, 'textToReplace', innerContent)
        : replace(content, 'textToReplace', selectedText);
    const newBlock = createNewBlock(defaultContent);
    const newContentState = this.createNewContentStateFromBlock(newBlock);
    const ***REMOVED*** anchorOffset, focusOffset ***REMOVED*** = getDefaultSelectionOffsets(
      defaultContent,
      startReplacer,
      endReplacer,
    );
    let newEditorState = this.createNewEditorState(newContentState, defaultContent);
    const updatedSelection =
      getOffSets(this.getSelection()).start === 0
        ? this.getSelection().merge(***REMOVED*** anchorOffset, focusOffset ***REMOVED***)
        : new SelectionState(***REMOVED***
          anchorKey: newBlock.getKey(),
          anchorOffset,
          focusOffset,
          focusKey: newBlock.getKey(),
          isBackward: false,
  ***REMOVED***);

    newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);

    return this.setState(***REMOVED***
      editorState: EditorState.forceSelection(newEditorState, newEditorState.getSelection()),
***REMOVED***);
***REMOVED***;

  /**
   * Update the current editorState
   * @param  ***REMOVED***Map***REMOVED*** newContentState
   * @param  ***REMOVED***String***REMOVED*** text            The text to add
   * @return ***REMOVED***Map***REMOVED***                 EditorState
   */
  createNewEditorState = (newContentState, text) => ***REMOVED***
    let newEditorState;

    if (getOffSets(this.getSelection()).start !== 0) ***REMOVED***
      newEditorState = EditorState.push(this.getEditorState(), newContentState);
***REMOVED*** else ***REMOVED***
      const textWithEntity = this.modifyBlockContent(text);
      newEditorState = EditorState.push(this.getEditorState(), textWithEntity, 'insert-characters');
***REMOVED***
    return newEditorState;
***REMOVED***;

  /**
   * Update the content of a block
   * @param  ***REMOVED***Map***REMOVED*** newBlock     The new block
   * @param  ***REMOVED***Map***REMOVED*** contentState The ContentState
   * @return ***REMOVED***Map***REMOVED***              The updated block
   */
  createNewBlockMap = (newBlock, contentState) =>
    contentState.getBlockMap().set(newBlock.key, newBlock);

  createNewContentStateFromBlock = (
    newBlock,
    contentState = this.getEditorState().getCurrentContent(),
  ) =>
    ContentState.createFromBlockArray(this.createNewBlockMap(newBlock, contentState).toArray())
      .set('selectionBefore', contentState.getSelectionBefore())
      .set('selectionAfter', contentState.getSelectionAfter());

  getCharactersNumber = (editorState = this.getEditorState()) => ***REMOVED***
    const plainText = editorState.getCurrentContent().getPlainText();
    const spacesNumber = plainText.split(' ').length;

    return words(plainText).join('').length + spacesNumber - 1;
***REMOVED***;

  getEditorState = () => this.state.editorState;

  /**
   * Retrieve the selected text
   * @return ***REMOVED***Map***REMOVED***
   */
  getSelection = () => this.getEditorState().getSelection();

  /**
   * Retrieve the cursor anchor key
   * @return ***REMOVED***String***REMOVED***
   */
  getCurrentAnchorKey = () => this.getSelection().getAnchorKey();

  /**
   * Retrieve the current content block
   * @return ***REMOVED***Map***REMOVED*** ContentBlock
   */
  getCurrentContentBlock = () =>
    this.getEditorState()
      .getCurrentContent()
      .getBlockForKey(this.getSelection().getAnchorKey());

  /**
   * Retrieve the block key after a specific one
   * @param  ***REMOVED***String***REMOVED*** currentBlockKey
   * @param  ***REMOVED***Map***REMOVED*** [editorState=this.getEditorState()]  The current EditorState or the updated one
   * @return ***REMOVED***String***REMOVED***                                    The next block key
   */
  getNextBlockKey = (currentBlockKey, editorState = this.getEditorState()) =>
    editorState.getCurrentContent().getKeyAfter(currentBlockKey);

  getSelectedText = (***REMOVED*** start, end ***REMOVED*** = getOffSets(this.getSelection())) =>
    this.getCurrentContentBlock()
      .getText()
      .slice(start, end);

  handleBlur = () => ***REMOVED***
    const target = ***REMOVED***
      name: this.props.name,
      type: 'textarea',
      value: this.getEditorState()
        .getCurrentContent()
        .getPlainText(),
***REMOVED***;
    this.props.onBlur(***REMOVED*** target ***REMOVED***);
    this.blur();
***REMOVED***;

  handleChangeSelect = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    this.setState(***REMOVED*** headerValue: target.value ***REMOVED***);
    const selectedText = this.getSelectedText();
    const title = selectedText === '' ? `$***REMOVED***target.value***REMOVED*** ` : `$***REMOVED***target.value***REMOVED*** $***REMOVED***selectedText***REMOVED***`;
    this.addBlock(title);

    return this.setState(***REMOVED*** headerValue: '' ***REMOVED***);
***REMOVED***;

  handleClickPreview = () => this.setState(***REMOVED*** isPreviewMode: !this.state.isPreviewMode ***REMOVED***);

  handleDragEnter = e => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.isDraging) ***REMOVED***
      this.setState(***REMOVED*** isDraging: true ***REMOVED***);
***REMOVED***
***REMOVED***;

  handleDragLeave = () => this.setState(***REMOVED*** isDraging: false ***REMOVED***);

  handleDragOver = e => ***REMOVED***
    e.preventDefault();
    e.stopPropagation();
***REMOVED***;

  handleDrop = e => ***REMOVED***
    e.preventDefault();

    if (this.state.isPreviewMode) ***REMOVED***
      return this.setState(***REMOVED*** isDraging: false ***REMOVED***);
***REMOVED***

    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    return this.uploadFile(files);
***REMOVED***;

  /**
   * Handler that listens for specific key commands
   * @param  ***REMOVED***String***REMOVED*** command
   * @param  ***REMOVED***Map***REMOVED*** editorState
   * @return ***REMOVED***Bool***REMOVED***
   */
  handleKeyCommand = (command, editorState) => ***REMOVED***
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (command === 'bold' || command === 'italic' || command === 'underline') ***REMOVED***
      const ***REMOVED*** content, style ***REMOVED*** = getKeyCommandData(command);
      this.addContent(content, style);
      return false;
***REMOVED***

    if (newState && command !== 'backspace') ***REMOVED***
      this.onChange(newState);
      return true;
***REMOVED***

    return false;
***REMOVED***;

  /**
   * Handler to upload files on paste
   * @param  ***REMOVED***Array<Blob>***REMOVED*** files [description]
   * @return ***REMOVED******REMOVED***                  DraftHandleValue
   */
  handlePastedFiles = files => this.uploadFile(files);

  handleReturn = (e, editorState) => ***REMOVED***
    const selection = editorState.getSelection();
    const currentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());

    if (currentBlock.getText().split('')[0] === '-') ***REMOVED***
      this.addUlBlock();
      return true;
***REMOVED***

    if (
      currentBlock.getText().split('.').length > 1 &&
      !isNaN(parseInt(currentBlock.getText().split('.')[0], 10))
    ) ***REMOVED***
      this.addOlBlock();
      return true;
***REMOVED***

    return false;
***REMOVED***;

  mapKeyToEditorCommand = e => ***REMOVED***
    if (e.keyCode === 9 /* TAB */) ***REMOVED***
      const newEditorState = RichUtils.onTab(e, this.state.editorState, 4 /* maxDepth */);
      if (newEditorState !== this.state.editorState) ***REMOVED***
        this.onChange(newEditorState);
***REMOVED***
      return;
***REMOVED***

    return getDefaultKeyBinding(e);
***REMOVED***;

  /**
   * Change the content of a block
   * @param  ***REMOVED***String]***REMOVED*** text
   * @param  ***REMOVED***Map***REMOVED*** [contentState=this.getEditorState().getCurrentContent()]
   * @return ***REMOVED***Map***REMOVED***
   */
  modifyBlockContent = (text, contentState = this.getEditorState().getCurrentContent()) =>
    Modifier.replaceText(contentState, this.getSelection(), text);

  onChange = editorState => ***REMOVED***
    this.setState(***REMOVED*** editorState ***REMOVED***);
    this.sendData(editorState);
***REMOVED***;

  handleTab = e => ***REMOVED***
    e.preventDefault();
    const newEditorState = onTab(this.getEditorState());

    return this.onChange(newEditorState);
***REMOVED***;

  /**
   * Update the parent reducer
   * @param  ***REMOVED***Map***REMOVED*** editorState [description]
   */
  sendData = editorState => ***REMOVED***
    if (this.getEditorState().getCurrentContent() === editorState.getCurrentContent())
      return;

    this.props.onChange(***REMOVED***
      target: ***REMOVED***
        value: editorState.getCurrentContent().getPlainText(),
        name: this.props.name,
        type: 'textarea',
***REMOVED***
***REMOVED***);
***REMOVED***

  toggleFullScreen = e => ***REMOVED***
    e.preventDefault();
    this.setState(***REMOVED***
      isFullscreen: !this.state.isFullscreen,
      isPreviewMode: false,
***REMOVED***);
***REMOVED***;

  uploadFile = files => ***REMOVED***
    const formData = new FormData();
    formData.append('files', files[0]);
    const headers = ***REMOVED***
      'X-Forwarded-Host': 'strapi',
***REMOVED***;

    let newEditorState = this.getEditorState();

    const nextBlocks = getNextBlocksList(newEditorState, this.getSelection().getStartKey());
    // Loop to update each block after the inserted li
    nextBlocks.map((block, index) => ***REMOVED***
      // Update the current block
      const nextBlockText = index === 0 ? `![Uploading $***REMOVED***files[0].name***REMOVED***]()` : nextBlocks.get(index - 1).getText();
      const newBlock = createNewBlock(nextBlockText, 'unstyled', block.getKey());
      // Update the contentState
      const newContentState = this.createNewContentStateFromBlock(
        newBlock,
        newEditorState.getCurrentContent(),
      );
      newEditorState = EditorState.push(newEditorState, newContentState);
***REMOVED***);

    const offset = `![Uploading $***REMOVED***files[0].name***REMOVED***]()`.length;
    const updatedSelection = updateSelection(this.getSelection(), nextBlocks, offset);
    this.setState(***REMOVED*** editorState: EditorState.acceptSelection(newEditorState, updatedSelection) ***REMOVED***);

    return request('/upload', ***REMOVED*** method: 'POST', headers, body: formData ***REMOVED***, false, false)
      .then(response => ***REMOVED***
        const nextBlockKey = newEditorState
          .getCurrentContent()
          .getKeyAfter(newEditorState.getSelection().getStartKey());
        const content = `![text]($***REMOVED***response[0].url***REMOVED***)`;
        const newContentState = this.createNewContentStateFromBlock(
          createNewBlock(content, 'unstyled', nextBlockKey),
        );

        newEditorState = EditorState.push(newEditorState, newContentState);
        const updatedSelection = updateSelection(this.getSelection(), nextBlocks, 2);

        this.setState(***REMOVED*** editorState: EditorState.acceptSelection(newEditorState, updatedSelection) ***REMOVED***);
        this.sendData(newEditorState);
***REMOVED***)
      .catch(() => ***REMOVED***
        this.setState(***REMOVED*** editorState: EditorState.undo(this.getEditorState()) ***REMOVED***);
***REMOVED***)
      .finally(() => ***REMOVED***
        this.setState(***REMOVED*** isDraging: false ***REMOVED***);
***REMOVED***);
***REMOVED***;

  renderDrop = () => (
    <Drop
      onDrop=***REMOVED***this.handleDrop***REMOVED***
      onDragOver=***REMOVED***this.handleDragOver***REMOVED***
      onDragLeave=***REMOVED***this.handleDragLeave***REMOVED***
    />
  );

  render() ***REMOVED***
    const ***REMOVED*** editorState, isPreviewMode, isFullscreen ***REMOVED*** = this.state;
    const editorStyle = isFullscreen ? ***REMOVED*** marginTop: '0' ***REMOVED*** : this.props.style;

    return (
      <div className=***REMOVED***cn(isFullscreen && styles.fullscreenOverlay)***REMOVED***>
        ***REMOVED***/* FIRST EDITOR WITH CONTROLS***REMOVED*** */***REMOVED***
        <div
          className=***REMOVED***cn(
            styles.editorWrapper,
            !this.props.deactivateErrorHighlight && this.props.error && styles.editorError,
            !isEmpty(this.props.className) && this.props.className,
          )***REMOVED***
          onClick=***REMOVED***e => ***REMOVED***
            if (isFullscreen) ***REMOVED***
              e.preventDefault();
              e.stopPropagation();
      ***REMOVED***
    ***REMOVED******REMOVED***
          onDragEnter=***REMOVED***this.handleDragEnter***REMOVED***
          onDragOver=***REMOVED***this.handleDragOver***REMOVED***
          style=***REMOVED***editorStyle***REMOVED***
        >
          ***REMOVED***this.state.isDraging && this.renderDrop()***REMOVED***
          <div className=***REMOVED***styles.controlsContainer***REMOVED***>
            <CustomSelect />
            ***REMOVED***CONTROLS.map((value, key) => (
              <Controls
                key=***REMOVED***key***REMOVED***
                buttons=***REMOVED***value***REMOVED***
                disabled=***REMOVED***isPreviewMode***REMOVED***
                editorState=***REMOVED***editorState***REMOVED***
                handlers=***REMOVED******REMOVED***
                  addContent: this.addContent,
                  addOlBlock: this.addOlBlock,
                  addSimpleBlockWithSelection: this.addSimpleBlockWithSelection,
                  addUlBlock: this.addUlBlock,
          ***REMOVED******REMOVED***
                onToggle=***REMOVED***this.toggleInlineStyle***REMOVED***
                onToggleBlock=***REMOVED***this.toggleBlockType***REMOVED***
              />
            ))***REMOVED***
            ***REMOVED***!isFullscreen ? (
              <ToggleMode isPreviewMode=***REMOVED***isPreviewMode***REMOVED*** onClick=***REMOVED***this.handleClickPreview***REMOVED*** />
            ) : (
              <div style=***REMOVED******REMOVED*** marginRight: '10px' ***REMOVED******REMOVED*** />
            )***REMOVED***
          </div>
          ***REMOVED***/* WYSIWYG PREVIEW NOT FULLSCREEN */***REMOVED***
          ***REMOVED***isPreviewMode ? (
            <PreviewWysiwyg data=***REMOVED***this.props.value***REMOVED*** />
          ) : (
            <div
              className=***REMOVED***cn(styles.editor, isFullscreen && styles.editorFullScreen)***REMOVED***
              onClick=***REMOVED***this.focus***REMOVED***
            >
              <WysiwygEditor
                blockStyleFn=***REMOVED***getBlockStyle***REMOVED***
                editorState=***REMOVED***editorState***REMOVED***
                handleKeyCommand=***REMOVED***this.handleKeyCommand***REMOVED***
                handlePastedFiles=***REMOVED***this.handlePastedFiles***REMOVED***
                handleReturn=***REMOVED***this.handleReturn***REMOVED***
                keyBindingFn=***REMOVED***this.mapKeyToEditorCommand***REMOVED***
                onBlur=***REMOVED***this.handleBlur***REMOVED***
                onChange=***REMOVED***this.onChange***REMOVED***
                onTab=***REMOVED***this.handleTab***REMOVED***
                placeholder=***REMOVED***this.props.placeholder***REMOVED***
                setRef=***REMOVED***editor => (this.domEditor = editor)***REMOVED***
                stripPastedStyles
                tabIndex=***REMOVED***this.props.tabIndex***REMOVED***
              />
              <input className=***REMOVED***styles.editorInput***REMOVED*** value="" tabIndex="-1" />
            </div>
          )***REMOVED***
          ***REMOVED***!isFullscreen && (
            <WysiwygBottomControls
              isPreviewMode=***REMOVED***isPreviewMode***REMOVED***
              onClick=***REMOVED***this.toggleFullScreen***REMOVED***
              onChange=***REMOVED***this.handleDrop***REMOVED***
            />
          )***REMOVED***
        </div>
        ***REMOVED***/* PREVIEW WYSIWYG FULLSCREEN */***REMOVED***
        ***REMOVED***isFullscreen && (
          <div
            className=***REMOVED***cn(styles.editorWrapper)***REMOVED***
            onClick=***REMOVED***e => ***REMOVED***
              e.preventDefault();
              e.stopPropagation();
      ***REMOVED******REMOVED***
            style=***REMOVED******REMOVED*** marginTop: '0' ***REMOVED******REMOVED***
          >
            <PreviewControl
              onClick=***REMOVED***this.toggleFullScreen***REMOVED***
              characters=***REMOVED***this.getCharactersNumber()***REMOVED***
            />
            <PreviewWysiwyg data=***REMOVED***this.props.value***REMOVED*** />
          </div>
        )***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

Wysiwyg.childContextTypes = ***REMOVED***
  handleChangeSelect: PropTypes.func,
  headerValue: PropTypes.string,
  html: PropTypes.string,
  isFullscreen: PropTypes.bool,
  isPreviewMode: PropTypes.bool,
  placeholder: PropTypes.string,
  previewHTML: PropTypes.func,
***REMOVED***;

Wysiwyg.defaultProps = ***REMOVED***
  autoFocus: false,
  className: '',
  deactivateErrorHighlight: false,
  error: false,
  onBlur: () => ***REMOVED******REMOVED***,
  onChange: () => ***REMOVED******REMOVED***,
  placeholder: '',
  resetProps: false,
  style: ***REMOVED******REMOVED***,
  tabIndex: '0',
  value: '',
***REMOVED***;

Wysiwyg.propTypes = ***REMOVED***
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  resetProps: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  value: PropTypes.string,
***REMOVED***;

export default Wysiwyg;
