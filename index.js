const path      = require('path');
const argv      = require('yargs').argv;
const parseTree = require('./src/parseTree');
const parseArgv = require('./src/parseArgv');

const rootPath = process.cwd();
const conf     = require(path.join(rootPath, './ctree.config.js'))

try {
	parseArgv(conf.folder, argv._);
	parseTree(conf.folder, rootPath);
} catch(err) {
	console.log(err);
}