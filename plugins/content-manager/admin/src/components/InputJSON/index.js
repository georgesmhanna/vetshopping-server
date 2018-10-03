/**
 * 
 * InputJSON
 * 
 */


import React from 'react';
import PropTypes from 'prop-types';
import cm from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/cobalt.css';

import ***REMOVED*** isEmpty, isObject, trimStart ***REMOVED*** from 'lodash';
import jsonlint from './jsonlint';
import styles from './styles.scss';

const WAIT = 600;
const stringify = JSON.stringify;
const parse = JSON.parse;
const DEFAULT_THEME = 'monokai';
const THEMES = ['blackboard', 'cobalt', 'monokai', '3024-day', '3024-night', 'liquibyte', 'xq-dark'];

class InputJSON extends React.Component ***REMOVED***
  constructor(props) ***REMOVED***
    super(props);
    this.editor = React.createRef();
    this.state = ***REMOVED*** error: false, markedText: null ***REMOVED***;
***REMOVED***

  componentDidMount() ***REMOVED***
    // Init codemirror component
    this.codeMirror = cm.fromTextArea(this.editor.current, ***REMOVED***
      autoCloseBrackets: true,
      lineNumbers: true,
      matchBrackets: true,
      mode: 'application/json',
      smartIndent: true,
      styleSelectedText: true,
      tabSize: 2,
      theme: DEFAULT_THEME,
***REMOVED***);
    this.codeMirror.on('change', this.handleChange);
    this.codeMirror.on('blur', this.handleBlur);

    this.setSize();
    this.setInitValue();
***REMOVED***

  componentDidUpdate(prevProps) ***REMOVED***
    if (isEmpty(prevProps.value) && !isEmpty(this.props.value) && !this.state.hasInitValue) ***REMOVED***
      this.setInitValue();
***REMOVED***
***REMOVED***

  setInitValue = () => ***REMOVED***
    const ***REMOVED*** value ***REMOVED*** = this.props;

    if (isObject(value) && value !== null) ***REMOVED***
      try ***REMOVED***
        parse(stringify(value));
        this.setState(***REMOVED*** hasInitValue: true ***REMOVED***);

        return this.codeMirror.setValue(stringify(value, null, 2));
***REMOVED*** catch(err) ***REMOVED***

        return this.setState(***REMOVED*** error: true ***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***

  setSize = () => this.codeMirror.setSize('100%', 'auto');

  setTheme = (theme) => this.codeMirror.setOption('theme', theme);

  getContentAtLine = (line) => this.codeMirror.getLine(line);

  getEditorOption = (opt) => this.codeMirror.getOption(opt);

  getValue = () => this.codeMirror.getValue();

  markSelection = (***REMOVED*** message ***REMOVED***) => ***REMOVED***
    let line = parseInt(
      message
        .split(':')[0]
        .split('line ')[1],
      10,
    ) - 1;

    let content = this.getContentAtLine(line);

    if (content === '***REMOVED***') ***REMOVED***
      line = line + 1;
      content = this.getContentAtLine(line);
***REMOVED***
    const chEnd = content.length;
    const chStart = chEnd - trimStart(content, ' ').length;
    const markedText = this.codeMirror.markText(***REMOVED*** line, ch: chStart ***REMOVED***, ***REMOVED*** line, ch: chEnd ***REMOVED***, ***REMOVED*** className: styles.colored ***REMOVED***);
    this.setState(***REMOVED*** markedText ***REMOVED***);
***REMOVED***

  timer = null;

  handleBlur = (***REMOVED*** target ***REMOVED***) => ***REMOVED***
    const ***REMOVED*** name, onBlur ***REMOVED*** = this.props;
  
    if (target === undefined) ***REMOVED*** // codemirror catches multiple events
      onBlur(***REMOVED***
        target: ***REMOVED***
          name,
          type: 'json',
          value: this.getValue(),
  ***REMOVED***
***REMOVED***);

***REMOVED***
***REMOVED***

  handleChange = () => ***REMOVED***
    const ***REMOVED*** hasInitValue ***REMOVED*** = this.state;
    const ***REMOVED*** name, onChange ***REMOVED*** = this.props;
    let value = this.codeMirror.getValue();

    try ***REMOVED***
      value = parse(value);
***REMOVED*** catch(err) ***REMOVED***
      // Silent
***REMOVED***

    // Update the parent
    onChange(***REMOVED***
      target: ***REMOVED***
        name,
        value,
        type: 'json',
***REMOVED***
***REMOVED***);

    if (!hasInitValue) ***REMOVED***
      this.setState(***REMOVED*** hasInitValue: true ***REMOVED***);
***REMOVED***

    // Remove higlight error
    if (this.state.markedText) ***REMOVED***
      this.state.markedText.clear();
      this.setState(***REMOVED*** markedText: null, error: null ***REMOVED***);
***REMOVED***
    
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.testJSON(this.codeMirror.getValue()), WAIT);
***REMOVED***

  testJSON = (value) => ***REMOVED***
    try ***REMOVED***
      jsonlint.parse(value);
***REMOVED*** catch(err) ***REMOVED***
      this.markSelection(err);
***REMOVED***
***REMOVED***

  render() ***REMOVED***
    if (this.state.error) ***REMOVED***
      return <div>error json</div>;
***REMOVED***

    return (
      <div className=***REMOVED***styles.jsonWrapper***REMOVED***>
        <textarea ref=***REMOVED***this.editor***REMOVED*** autoComplete='off' defaultValue="" />
        <select className=***REMOVED***styles.select***REMOVED*** onChange=***REMOVED***(***REMOVED*** target ***REMOVED***) => this.setTheme(target.value)***REMOVED*** defaultValue=***REMOVED***DEFAULT_THEME***REMOVED***>
          ***REMOVED***THEMES.sort().map(theme => <option key=***REMOVED***theme***REMOVED*** value=***REMOVED***theme***REMOVED***>***REMOVED***theme***REMOVED***</option>)***REMOVED***
        </select>
      </div>
    );
***REMOVED***
***REMOVED***

InputJSON.defaultProps = ***REMOVED***
  onBlur: () => ***REMOVED******REMOVED***,
  onChange: () => ***REMOVED******REMOVED***,
  value: null,
***REMOVED***;

InputJSON.propTypes = ***REMOVED***
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.object,
***REMOVED***;

export default InputJSON;