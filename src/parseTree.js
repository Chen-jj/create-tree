const fs        = require('fs');
const path      = require('path');
const promisify = require('./promisify');
const isObject  = require('../utils/isObject');

const rootPath = process.cwd();

function parseTree(folder, templates, dir) {
	for (let item in folder) {

		// 如果是object, 存在则递归调用、不存在则创建目录然后递归调用
		if (isObject(folder[item])) {

			let _dir = path.join(dir, item);

			promisify.fsExists(_dir)
			.then(() => {
				parseTree(folder[item], templates, _dir);
			})
			.catch(() => {
				promisify.fsMkdir(_dir)
				.then(() => {
					console.log('create folder: ' + _dir);
					parseTree(folder[item], templates, _dir);
				})
				.catch((err) => {
					console.log(err);
				})
			})

		} else {// 如果是字符串，使用wx方式创建该文件

			if (typeof folder[item] != 'string') {
				console.log('ext must be string!');
				continue;
			}

			let file = path.join(dir, item + '.' + folder[item]);

			promisify.fsOpen(file, 'wx')
			.then(() => {
				console.log('create file: ' + file);

				for (let i = 0, len = templates.length; i < len; i++) {
					let tar  = path.join(rootPath, templates[i]);

					if (file == tar) {

						let basename = path.parse(tar).base;
						let tpl      = path.join(rootPath, '/ctree_tpl', basename);

						promisify.fsExists(tpl)
						.then(() => {
							console.log('start piping template: ' + templates[i]);
							fs.createReadStream(tpl)
							.pipe(fs.createWriteStream(tar));
						})
						.catch(() => {
							console.log('file: ' + basename + " no exists in folder: ctree_tpl!");
						})

						break;
					}
				}


			})
			.catch((err) => {
				console.log(err);
			})

		}

	}
}

module.exports = parseTree;