/* Jison generated parser */
/* eslint-disable */
var jsonlint = (function()***REMOVED***
  var parser = ***REMOVED***trace: function trace() ***REMOVED*** ***REMOVED***,
  yy: ***REMOVED******REMOVED***,
  symbols_: ***REMOVED***"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"***REMOVED***":17,"***REMOVED***":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1***REMOVED***,
  terminals_: ***REMOVED***2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"***REMOVED***",18:"***REMOVED***",21:":",22:",",23:"[",24:"]"***REMOVED***,
  productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) ***REMOVED***
  
  var $0 = $$.length - 1;
  switch (yystate) ***REMOVED***
  case 1: // replace escaped characters with actual character
            this.$ = yytext.replace(/\\(\\|")/g, "$"+"1")
                       .replace(/\\n/g,'\n')
                       .replace(/\\r/g,'\r')
                       .replace(/\\t/g,'\t')
                       .replace(/\\v/g,'\v')
                       .replace(/\\f/g,'\f')
                       .replace(/\\b/g,'\b');
          
  break;
  case 2:this.$ = Number(yytext);
  break;
  case 3:this.$ = null;
  break;
  case 4:this.$ = true;
  break;
  case 5:this.$ = false;
  break;
  case 6:return this.$ = $$[$0-1];
  break;
  case 13:this.$ = ***REMOVED******REMOVED***;
  break;
  case 14:this.$ = $$[$0-1];
  break;
  case 15:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 16:this.$ = ***REMOVED******REMOVED***; this.$[$$[$0][0]] = $$[$0][1];
  break;
  case 17:this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];
  break;
  case 18:this.$ = [];
  break;
  case 19:this.$ = $$[$0-1];
  break;
  case 20:this.$ = [$$[$0]];
  break;
  case 21:this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
  break;
***REMOVED***
***REMOVED***,
  table: [***REMOVED***3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],12:1,13:2,15:7,16:8,17:[1,14],23:[1,15]***REMOVED***,***REMOVED***1:[3]***REMOVED***,***REMOVED***14:[1,16]***REMOVED***,***REMOVED***14:[2,7],18:[2,7],22:[2,7],24:[2,7]***REMOVED***,***REMOVED***14:[2,8],18:[2,8],22:[2,8],24:[2,8]***REMOVED***,***REMOVED***14:[2,9],18:[2,9],22:[2,9],24:[2,9]***REMOVED***,***REMOVED***14:[2,10],18:[2,10],22:[2,10],24:[2,10]***REMOVED***,***REMOVED***14:[2,11],18:[2,11],22:[2,11],24:[2,11]***REMOVED***,***REMOVED***14:[2,12],18:[2,12],22:[2,12],24:[2,12]***REMOVED***,***REMOVED***14:[2,3],18:[2,3],22:[2,3],24:[2,3]***REMOVED***,***REMOVED***14:[2,4],18:[2,4],22:[2,4],24:[2,4]***REMOVED***,***REMOVED***14:[2,5],18:[2,5],22:[2,5],24:[2,5]***REMOVED***,***REMOVED***14:[2,1],18:[2,1],21:[2,1],22:[2,1],24:[2,1]***REMOVED***,***REMOVED***14:[2,2],18:[2,2],22:[2,2],24:[2,2]***REMOVED***,***REMOVED***3:20,4:[1,12],18:[1,17],19:18,20:19***REMOVED***,***REMOVED***3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:23,15:7,16:8,17:[1,14],23:[1,15],24:[1,21],25:22***REMOVED***,***REMOVED***1:[2,6]***REMOVED***,***REMOVED***14:[2,13],18:[2,13],22:[2,13],24:[2,13]***REMOVED***,***REMOVED***18:[1,24],22:[1,25]***REMOVED***,***REMOVED***18:[2,16],22:[2,16]***REMOVED***,***REMOVED***21:[1,26]***REMOVED***,***REMOVED***14:[2,18],18:[2,18],22:[2,18],24:[2,18]***REMOVED***,***REMOVED***22:[1,28],24:[1,27]***REMOVED***,***REMOVED***22:[2,20],24:[2,20]***REMOVED***,***REMOVED***14:[2,14],18:[2,14],22:[2,14],24:[2,14]***REMOVED***,***REMOVED***3:20,4:[1,12],20:29***REMOVED***,***REMOVED***3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:30,15:7,16:8,17:[1,14],23:[1,15]***REMOVED***,***REMOVED***14:[2,19],18:[2,19],22:[2,19],24:[2,19]***REMOVED***,***REMOVED***3:5,4:[1,12],5:6,6:[1,13],7:3,8:[1,9],9:4,10:[1,10],11:[1,11],13:31,15:7,16:8,17:[1,14],23:[1,15]***REMOVED***,***REMOVED***18:[2,17],22:[2,17]***REMOVED***,***REMOVED***18:[2,15],22:[2,15]***REMOVED***,***REMOVED***22:[2,21],24:[2,21]***REMOVED***],
  defaultActions: ***REMOVED***16:[2,6]***REMOVED***,
  parseError: function parseError(str, hash) ***REMOVED***
      throw new Error(str);
***REMOVED***,
  parse: function parse(input) ***REMOVED***
      var self = this,
          stack = [0],
          vstack = [null], // semantic value stack
          lstack = [], // location stack
          table = this.table,
          yytext = '',
          yylineno = 0,
          yyleng = 0,
          recovering = 0,
          TERROR = 2,
          EOF = 1;
  
      //this.reductionCount = this.shiftCount = 0;
  
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      if (typeof this.lexer.yylloc == 'undefined')
          this.lexer.yylloc = ***REMOVED******REMOVED***;
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
  
      if (typeof this.yy.parseError === 'function')
          this.parseError = this.yy.parseError;
  
      function popStack (n) ***REMOVED***
          stack.length = stack.length - 2*n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
***REMOVED***
  
      function lex() ***REMOVED***
          var token;
          token = self.lexer.lex() || 1; // $end = 1
          // if token isn't its numeric value, convert
          if (typeof token !== 'number') ***REMOVED***
              token = self.symbols_[token] || token;
    ***REMOVED***
          return token;
***REMOVED***
  
      var symbol, preErrorSymbol, state, action, a, r, yyval=***REMOVED******REMOVED***,p,len,newState, expected;
      while (true) ***REMOVED***
          // retreive state number from top of stack
          state = stack[stack.length-1];
  
          // use default actions if available
          if (this.defaultActions[state]) ***REMOVED***
              action = this.defaultActions[state];
    ***REMOVED*** else ***REMOVED***
              if (symbol == null)
                  symbol = lex();
              // read action for current state and first input
              action = table[state] && table[state][symbol];
    ***REMOVED***
  
          // handle parse error
          _handle_error:
          if (typeof action === 'undefined' || !action.length || !action[0]) ***REMOVED***
  
              if (!recovering) ***REMOVED***
                  // Report error
                  expected = [];
                  for (p in table[state]) if (this.terminals_[p] && p > 2) ***REMOVED***
                      expected.push("'"+this.terminals_[p]+"'");
            ***REMOVED***
                  var errStr = '';
                  if (this.lexer.showPosition) ***REMOVED***
                      errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
            ***REMOVED*** else ***REMOVED***
                      errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                    (symbol == 1 /*EOF*/ ? "end of input" :
                                                ("'"+(this.terminals_[symbol] || symbol)+"'"));
            ***REMOVED***
                  this.parseError(errStr,
                      ***REMOVED***text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected***REMOVED***);
        ***REMOVED***
  
              // just recovered from another error
              if (recovering == 3) ***REMOVED***
                  if (symbol == EOF) ***REMOVED***
                      throw new Error(errStr || 'Parsing halted.');
            ***REMOVED***
  
                  // discard current lookahead and grab another
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  symbol = lex();
        ***REMOVED***
  
              // try to recover from error
              while (1) ***REMOVED***
                  // check for error recovery rule in this state
                  if ((TERROR.toString()) in table[state]) ***REMOVED***
                      break;
            ***REMOVED***
                  if (state == 0) ***REMOVED***
                      throw new Error(errStr || 'Parsing halted.');
            ***REMOVED***
                  popStack(1);
                  state = stack[stack.length-1];
        ***REMOVED***
  
              preErrorSymbol = symbol; // save the lookahead token
              symbol = TERROR;         // insert generic error symbol as new lookahead
              state = stack[stack.length-1];
              action = table[state] && table[state][TERROR];
              recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
    ***REMOVED***
  
          // this shouldn't happen, unless resolve defaults are off
          if (action[0] instanceof Array && action.length > 1) ***REMOVED***
              throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
    ***REMOVED***
  
          switch (action[0]) ***REMOVED***
  
              case 1: // shift
                  //this.shiftCount++;
  
                  stack.push(symbol);
                  vstack.push(this.lexer.yytext);
                  lstack.push(this.lexer.yylloc);
                  stack.push(action[1]); // push state
                  symbol = null;
                  if (!preErrorSymbol) ***REMOVED*** // normal execution/no error
                      yyleng = this.lexer.yyleng;
                      yytext = this.lexer.yytext;
                      yylineno = this.lexer.yylineno;
                      yyloc = this.lexer.yylloc;
                      if (recovering > 0)
                          recovering--;
            ***REMOVED*** else ***REMOVED*** // error just occurred, resume old lookahead f/ before error
                      symbol = preErrorSymbol;
                      preErrorSymbol = null;
            ***REMOVED***
                  break;
  
              case 2: // reduce
                  //this.reductionCount++;
  
                  len = this.productions_[action[1]][1];
  
                  // perform semantic action
                  yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                  // default location, uses first token for firsts, last for lasts
                  yyval._$ = ***REMOVED***
                      first_line: lstack[lstack.length-(len||1)].first_line,
                      last_line: lstack[lstack.length-1].last_line,
                      first_column: lstack[lstack.length-(len||1)].first_column,
                      last_column: lstack[lstack.length-1].last_column
            ***REMOVED***;
                  r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
  
                  if (typeof r !== 'undefined') ***REMOVED***
                      return r;
            ***REMOVED***
  
                  // pop off stack
                  if (len) ***REMOVED***
                      stack = stack.slice(0,-1*len*2);
                      vstack = vstack.slice(0, -1*len);
                      lstack = lstack.slice(0, -1*len);
            ***REMOVED***
  
                  stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                  vstack.push(yyval.$);
                  lstack.push(yyval._$);
                  // goto new state = table[STATE][NONTERMINAL]
                  newState = table[stack[stack.length-2]][stack[stack.length-1]];
                  stack.push(newState);
                  break;
  
              case 3: // accept
                  return true;
    ***REMOVED***
  
***REMOVED***
  
      return true;
***REMOVED******REMOVED***;
  /* Jison generated lexer */
  var lexer = (function()***REMOVED***
  var lexer = (***REMOVED***EOF:1,
  parseError:function parseError(str, hash) ***REMOVED***
          if (this.yy.parseError) ***REMOVED***
              this.yy.parseError(str, hash);
    ***REMOVED*** else ***REMOVED***
              throw new Error(str);
    ***REMOVED***
***REMOVED***
  setInput:function (input) ***REMOVED***
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = ***REMOVED***first_line:1,first_column:0,last_line:1,last_column:0***REMOVED***;
          return this;
***REMOVED***
  input:function () ***REMOVED***
          var ch = this._input[0];
          this.yytext+=ch;
          this.yyleng++;
          this.match+=ch;
          this.matched+=ch;
          var lines = ch.match(/\n/);
          if (lines) this.yylineno++;
          this._input = this._input.slice(1);
          return ch;
***REMOVED***
  unput:function (ch) ***REMOVED***
          this._input = ch + this._input;
          return this;
***REMOVED***
  more:function () ***REMOVED***
          this._more = true;
          return this;
***REMOVED***
  less:function (n) ***REMOVED***
          this._input = this.match.slice(n) + this._input;
***REMOVED***
  pastInput:function () ***REMOVED***
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
***REMOVED***
  upcomingInput:function () ***REMOVED***
          var next = this.match;
          if (next.length < 20) ***REMOVED***
              next += this._input.substr(0, 20-next.length);
    ***REMOVED***
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
***REMOVED***
  showPosition:function () ***REMOVED***
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
***REMOVED***
  next:function () ***REMOVED***
          if (this.done) ***REMOVED***
              return this.EOF;
    ***REMOVED***
          if (!this._input) this.done = true;
  
          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) ***REMOVED***
              this.yytext = '';
              this.match = '';
    ***REMOVED***
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) ***REMOVED***
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) ***REMOVED***
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
        ***REMOVED***
    ***REMOVED***
          if (match) ***REMOVED***
              lines = match[0].match(/\n.*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = ***REMOVED***first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length***REMOVED***
              this.yytext += match[0];
              this.match += match[0];
              this.yyleng = this.yytext.length;
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
    ***REMOVED***
          if (this._input === "") ***REMOVED***
              return this.EOF;
    ***REMOVED*** else ***REMOVED***
              this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                      ***REMOVED***text: "", token: null, line: this.yylineno***REMOVED***);
    ***REMOVED***
***REMOVED***
  lex:function lex() ***REMOVED***
          var r = this.next();
          if (typeof r !== 'undefined') ***REMOVED***
              return r;
    ***REMOVED*** else ***REMOVED***
              return this.lex();
    ***REMOVED***
***REMOVED***
  begin:function begin(condition) ***REMOVED***
          this.conditionStack.push(condition);
***REMOVED***
  popState:function popState() ***REMOVED***
          return this.conditionStack.pop();
***REMOVED***
  _currentRules:function _currentRules() ***REMOVED***
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
***REMOVED***
  topState:function () ***REMOVED***
          return this.conditionStack[this.conditionStack.length-2];
***REMOVED***
  pushState:function begin(condition) ***REMOVED***
          this.begin(condition);
***REMOVED******REMOVED***);
  lexer.options = ***REMOVED******REMOVED***;
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) ***REMOVED***
  
  var YYSTATE=YY_START
  switch($avoiding_name_collisions) ***REMOVED***
  case 0:/* skip whitespace */
  break;
  case 1:return 6
  break;
  case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
  break;
  case 3:return 17
  break;
  case 4:return 18
  break;
  case 5:return 23
  break;
  case 6:return 24
  break;
  case 7:return 22
  break;
  case 8:return 21
  break;
  case 9:return 10
  break;
  case 10:return 11
  break;
  case 11:return 8
  break;
  case 12:return 14
  break;
  case 13:return 'INVALID'
  break;
***REMOVED***
***REMOVED***;
  lexer.rules = [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]***REMOVED***4***REMOVED***|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\***REMOVED***)/,/^(?:\***REMOVED***)/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/];
  lexer.conditions = ***REMOVED***"INITIAL":***REMOVED***"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true***REMOVED******REMOVED***;
  
  
  ;
  return lexer;***REMOVED***)()
  parser.lexer = lexer;
  return parser;
***REMOVED***)();
  if (typeof require !== 'undefined' && typeof exports !== 'undefined') ***REMOVED***
  exports.parser = jsonlint;
  exports.parse = function () ***REMOVED*** return jsonlint.parse.apply(jsonlint, arguments); ***REMOVED***
  exports.main = function commonjsMain(args) ***REMOVED***
      if (!args[1]) ***REMOVED***
        throw new Error('Usage: '+args[0]+' FILE');
***REMOVED***
***REMOVED***
***REMOVED***