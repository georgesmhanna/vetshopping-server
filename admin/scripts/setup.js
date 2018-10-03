const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const _ = require('lodash');

const pwd = shell.pwd();

const silent = process.env.npm_config_debug !== 'true';
const isDevelopmentMode = path.resolve(pwd.stdout).indexOf('strapi-admin') !== -1;
const appPath = isDevelopmentMode ? path.resolve(process.env.PWD, '..') : path.resolve(pwd.stdout, '..');

shell.echo('🏗  Building the admin...');

const build = shell.exec(`cd "$***REMOVED***path.resolve(appPath, 'admin')***REMOVED***" && APP_PATH="$***REMOVED***appPath***REMOVED***" npm run build`, ***REMOVED***
  silent
***REMOVED***);

if (build.stderr && build.code !== 0) ***REMOVED***
  console.error(build.stderr);
  process.exit(1);
***REMOVED***

shell.echo('✅  Success');
shell.echo('');

if (process.env.npm_config_plugins === 'true') ***REMOVED***
  const plugins = path.resolve(appPath, 'plugins');

  // TODO: build plugins in async
  shell.ls('* -d', plugins)
    .filter(x => ***REMOVED***
      let hasAdminFolder;

      try ***REMOVED***
        fs.accessSync(path.resolve(appPath, 'plugins', x, 'admin', 'src', 'containers', 'App'));
        hasAdminFolder = true;
***REMOVED*** catch(err) ***REMOVED***
        hasAdminFolder = false;
***REMOVED***

      return hasAdminFolder;
***REMOVED***)
    .forEach(function (plugin) ***REMOVED***
      shell.echo(`🔸  Plugin - $***REMOVED***_.upperFirst(plugin)***REMOVED***`);
      shell.echo('📦  Installing packages...');
      shell.exec(`cd "$***REMOVED***path.resolve(plugins, plugin)***REMOVED***" && npm install`, ***REMOVED***
        silent
***REMOVED***);

      if (isDevelopmentMode) ***REMOVED***
        shell.exec(`cd "$***REMOVED***path.resolve(plugins, plugin)***REMOVED***" && npm link strapi-helper-plugin`, ***REMOVED***
          silent
  ***REMOVED***);
***REMOVED*** else ***REMOVED***
        shell.exec(`cd "$***REMOVED***path.resolve(plugins, plugin, 'node_modules', 'strapi-helper-plugin')***REMOVED***" && npm install`, ***REMOVED***
          silent
  ***REMOVED***);
***REMOVED***

      shell.echo('🏗  Building...');

      const build = shell.exec(`cd "$***REMOVED***path.resolve(plugins, plugin)***REMOVED***" && APP_PATH="$***REMOVED***appPath***REMOVED***" npm run build`, ***REMOVED***
        silent
***REMOVED***);

      if (build.stderr && build.code !== 0) ***REMOVED***
        console.error(build.stderr);
        process.exit(1);
***REMOVED***

      shell.echo('✅  Success');
      shell.echo('');
***REMOVED***);
***REMOVED***
