/**
 *
 * WysiwygInlineControls
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.scss';

class StyleButton extends React.Component ***REMOVED***
  handleClick = (e) => ***REMOVED***
    e.preventDefault();

    if (!this.props.disabled) ***REMOVED***
      this.props.handlers[this.props.handler](this.props.text, this.props.style);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    return (
      <div
        className=***REMOVED***cn(
          this.props.active && styles.styleButtonActive,
          styles.styleButton,
          this.props.className && styles[this.props.className],
          this.props.disabled && styles.styleButtonDisabled,
        )***REMOVED***
        onMouseDown=***REMOVED***this.handleClick***REMOVED***
      >
        ***REMOVED***!this.props.hideLabel && this.props.label***REMOVED***
      </div>
    );
***REMOVED***
***REMOVED***

const  WysiwygInlineControls = (***REMOVED*** buttons, disabled, editorState, handlers, onToggle, onToggleBlock ***REMOVED***) => ***REMOVED***
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className=***REMOVED***cn(styles.wysiwygInlineControls)***REMOVED***>
      ***REMOVED***buttons.map(type => (
        <StyleButton
          key=***REMOVED***type.label***REMOVED***
          active=***REMOVED***type.style === blockType || currentStyle.has(type.style)***REMOVED***
          className=***REMOVED***type.className***REMOVED***
          disabled=***REMOVED***disabled***REMOVED***
          handler=***REMOVED***type.handler***REMOVED***
          handlers=***REMOVED***handlers***REMOVED***
          hideLabel=***REMOVED***type.hideLabel || false***REMOVED***
          label=***REMOVED***type.label***REMOVED***
          onToggle=***REMOVED***onToggle***REMOVED***
          onToggleBlock=***REMOVED***onToggleBlock***REMOVED***
          style=***REMOVED***type.style***REMOVED***
          text=***REMOVED***type.text***REMOVED***
        />
      ))***REMOVED***
    </div>
  );
***REMOVED***;

/* eslint-disable react/default-props-match-prop-types */
StyleButton.defaultProps = ***REMOVED***
  active: false,
  className: '',
  disabled: false,
  hideLabel: false,
  label: '',
  onToggle: () => ***REMOVED******REMOVED***,
  onToggleBlock: () => ***REMOVED******REMOVED***,
  style: '',
  text: '',
***REMOVED***;

StyleButton.propTypes = ***REMOVED***
  active: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handler: PropTypes.string.isRequired,
  handlers: PropTypes.object.isRequired,
  hideLabel: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.string,
  text: PropTypes.string,
***REMOVED***;

WysiwygInlineControls.defaultProps = ***REMOVED***
  buttons: [],
  disabled: false,
  onToggle: () => ***REMOVED******REMOVED***,
  onToggleBlock: () => ***REMOVED******REMOVED***,
***REMOVED***;

WysiwygInlineControls.propTypes = ***REMOVED***
  buttons: PropTypes.array,
  disabled: PropTypes.bool,
  editorState: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  onToggleBlock: PropTypes.func,
***REMOVED***;

export default WysiwygInlineControls;
