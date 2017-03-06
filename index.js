const path      = require('path');
const argv      = require('yargs').argv;
const parseTree = require('./src/parseTree');
const parseArgv = require('./src/parseArgv');

const rootPath = process.cwd();
const conf     = require(path.join(rootPath, './ctree.config.js'))

let args = argv._ || [],
	tplMap = {};

if (conf.alias) {
	for (let alias in conf.alias) {
		if (argv[alias]) args.push(conf.alias[alias] + ":" + argv[alias]);
	}
}

try {
	parseArgv(conf.folder, conf.templates, args, tplMap);
	parseTree(conf.folder, conf.templates, rootPath, tplMap);
} catch(err) {
	console.log(err);
}