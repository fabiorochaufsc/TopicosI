'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE = {};

exports.default = function (babel) {
  var t = babel.types;

  return {
    visitor: {
      Program: function Program(path, state) {
        var opts = Object.assign({
          commentLineStart: '* ',
          charRead: '?',
          charExec: '!',
          newLineChar: '\n',
          cache: '?'
        }, state.opts);

        opts.commentStart = opts.commentStart || '*' + opts.newLineChar;
        opts.commentEnd = opts.commentEnd || opts.newLineChar + '*';

        if (!opts.header && !opts.files) {
          throw new Error('Set `babel-plugin-add-header` options pass in an Array of files to read/execute through the `header` variable or pass in `files` which define `header`\n');
        }

        // traverse through header array and generate the comment content
        if (opts.header) {
          insertHeader(t, path, opts, opts.header);
        } else {
          var header = getOptsHeader(state.file.opts.filename, opts);

          if (header) {
            insertHeader(t, path, opts, header);
          }
        }
      }
    }
  };
};

function getOptsHeader(currentFile, opts) {
  var files = Object.keys(opts.files);

  return files.reduce(function (optsHeader, keyFile) {
    var newOptsHeader = void 0;

    if (currentFile.indexOf(keyFile) !== -1) {
      newOptsHeader = opts.files[keyFile].header;
    }

    return optsHeader || newOptsHeader;
  }, null);
}

function insertHeader(t, path, opts, header) {
  var comment = header.map(function (headerPart) {
    var charAction = headerPart.charAt(0);
    var lines = void 0;

    // check whether we should read in or exec or simply add in
    if (charAction === opts.charExec) {
      lines = getLinesFromExec(headerPart, opts);
    } else if (charAction === opts.charRead) {
      lines = getLinesFromFile(headerPart, opts);
    } else {
      lines = headerPart;
    }

    // split all the lines returned from the file/exec
    return lines.split(opts.newLineChar).map(function (line) {
      return '' + opts.commentLineStart + line;
    }).join(opts.newLineChar);
  }).join(opts.newLineChar);

  // this will add in the comment which was generated
  path.addComment('leading', '' + opts.commentStart + comment + opts.commentEnd);

  // the following two lines will add new lines below the comment which was injected
  path.unshiftContainer('body', t.noop());
  path.unshiftContainer('body', t.noop());
}

function getLinesFromFile(file, opts) {
  var doCache = opts.cache.indexOf('?') !== -1;

  if (doCache && CACHE[file]) {
    return CACHE[file];
  } else {
    // remove the read char
    var fileWithOutExecutionChar = file.substr(1);
    var result = _fs2.default.readFileSync(fileWithOutExecutionChar, 'utf8');

    if (doCache) {
      CACHE[file] = result;
    }

    return result;
  }
}

function getLinesFromExec(file, opts) {
  var doCache = opts.cache.indexOf('!') !== -1;

  if (doCache && CACHE[file]) {
    return CACHE[file];
  } else {
    // remove the exec char
    var fileWithOutExecutionChar = file.substr(1);
    var result = _child_process2.default.execSync(fileWithOutExecutionChar, { encoding: 'utf8' });

    if (doCache) {
      CACHE[file] = result;
    }

    return result;
  }
}