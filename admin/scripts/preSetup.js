const shell = require('shelljs');
const path = require('path');
const _ = require('lodash');

shell.echo('');
shell.echo('🕓  The setup process can take few minutes.');
shell.echo('');
shell.echo('🔸  Administration Panel');
shell.echo('📦  Installing packages...');

const pwd = shell.pwd();

const silent = process.env.npm_config_debug !== 'true';
const isDevelopmentMode = path.resolve(pwd.stdout).indexOf('strapi-admin') !== -1;
const appPath = isDevelopmentMode ? path.resolve(process.env.PWD, '..') : path.resolve(pwd.stdout, '..');

// We just install the admin's dependencies here

// Remove package-lock.json.
shell.rm('-rf', path.resolve(appPath, 'package-lock.json'));
shell.rm('-rf', path.resolve(appPath, 'admin', 'package-lock.json'));

// Install the project dependencies.
shell.exec(`cd "$***REMOVED***appPath***REMOVED***" && npm install --ignore-scripts`, ***REMOVED***
  silent
***REMOVED***);

// Install the administration dependencies.
shell.exec(`cd "$***REMOVED***path.resolve(appPath, 'admin')***REMOVED***" && npm install`, ***REMOVED***
  silent
***REMOVED***);

if (isDevelopmentMode) ***REMOVED***
  shell.exec(`cd "$***REMOVED***path.resolve(appPath, 'admin')***REMOVED***" && npm link strapi-helper-plugin && npm link strapi-utils`, ***REMOVED***
    silent
***REMOVED***);
***REMOVED*** else ***REMOVED***
  shell.exec(`cd "$***REMOVED***path.resolve(appPath, 'admin', 'node_modules', 'strapi-helper-plugin')***REMOVED***" && npm install`, ***REMOVED***
    silent
***REMOVED***);
***REMOVED***

shell.echo('Packaged installed successfully');
