const path      = require('path');
const argv      = require('yargs').argv;
const parseTree = require('./src/parseTree');
const parseArgv = require('./src/parseArgv');

const rootPath = process.cwd();
const conf     = require(path.join(rootPath, './ctree.config.js'))

let args = argv._ || [];

if (conf.alias.length) {
	for (let i = 0; i < conf.alias.length; i++) {
		for (alias in conf.alias[i]) {
			if (argv[alias]) {
				args.push(conf.alias[i][alias] + ":" + argv[alias]);
			}
		}
	}
}

try {
	parseArgv(conf.folder, args);
	parseTree(conf.folder, rootPath);
} catch(err) {
	console.log(err);
}