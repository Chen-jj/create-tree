const fs        = require('fs');
const path      = require('path');
const promisify = require('./promisify');
const isObject  = require('../utils/isObject');

const rootPath = process.cwd();

function parseTree(folder, templates, dir, tplMap) {
	for (let item in folder) {

		// 如果是object, 存在则递归调用、不存在则创建目录然后递归调用
		if (isObject(folder[item])) {

			let _dir = path.join(dir, item);

			promisify.fsExists(_dir)
			.then(() => {
				parseTree(folder[item], templates, _dir, tplMap);
			})
			.catch(() => {
				promisify.fsMkdir(_dir)
				.then(() => {
					console.log('create folder: ' + _dir);
					parseTree(folder[item], templates, _dir, tplMap);
				})
				.catch((err) => {
					console.log(err);
				})
			})

		} else {// 如果是字符串，使用wx方式创建该文件  // 增加数组方式 2017-4-24

			if (Array.isArray(folder[item]) || typeof folder[item] == 'string') {

				if (typeof folder[item] == 'string') {
					folder[item] = [folder[item]];
				}

				for (let j = 0; j < folder[item].length; j++) {
					let file = path.join(dir, item + '.' + folder[item][j]);

					promisify.fsOpen(file, 'wx')
					.then(() => {
						console.log('create file: ' + file);

						for (let i = 0, len = templates.length; i < len; i++) {
							let tar  = path.join(rootPath, templates[i]);

							if (file == tar) {

								let tarParse = path.parse(tar), tplFile;

								// 如果template文件名在运行时被修改了，根据映射表，采用config中配置的template
								if (tplMap[tarParse.name]) {
									tplFile = tplMap[tarParse.name] + tarParse.ext;
								} else {
									tplFile = tarParse.base;
								}

								let tpl = path.join(rootPath, '/ctree_tpl', tplFile);

								promisify.fsExists(tpl)
								.then(() => {
									console.log('start piping template: ' + templates[i]);
									fs.createReadStream(tpl)
									.pipe(fs.createWriteStream(tar));
								})
								.catch(() => {
									console.log('file: ' + tplFile + " no exists in folder: ctree_tpl!");
								})

								break;
							}
						}


					})
					.catch((err) => {
						console.log(err);
					})
				}
			} else {
				console.log('ext must be String or Array!');
				continue;
			}

		}

	}
}

module.exports = parseTree;