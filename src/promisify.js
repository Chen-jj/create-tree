const fs   = require('fs');
const path = require('path');

function fsExists(tar) {
	return new Promise((resolve, reject) => {
		fs.exists(tar, (flag) => {
			flag ? resolve() : reject();
		})
	});
}

function fsMkdir(dir) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dir, function(err) {
			!err ? resolve() : reject(err);
		})
	});
}

function fsOpen(file, flag) {
	return new Promise((resolve, reject) => {
		fs.open(file, flag, function(err) {
			!err ? resolve() : reject(err);
		})
	});
}

module.exports = {fsExists, fsMkdir, fsOpen}