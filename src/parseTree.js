const fs        = require('fs');
const path      = require('path');
const isObject  = require('../utils/isObject');

function parseTree(folder, dir) {
	for (let item in folder) {

		if (isObject(folder[item])) {

			let _dir = dir + '/' + item;

			fs.exists(_dir, function(exists) {
				if (exists) {
					parseTree(folder[item], _dir);
				} else {
					fs.mkdir(_dir, function() {
						console.log('create folder: ' + _dir);
						parseTree(folder[item], _dir);
					})
				}
			})

		} else {

			if (typeof folder[item] != 'string') {
				console.log('ext must be string!');
				continue;
			}

			let file = dir + '/' + item + '.' + folder[item];

			fs.open(file, 'wx', function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log('create file: ' + file);
				}
			})

		}

	}
}

module.exports = parseTree;