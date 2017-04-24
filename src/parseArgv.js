const isObject = require('../utils/isObject');

function parseArgv (folder, templates, argv, tplMap) {
	let reg = /^[^.:]+(\.[^.:]+)*:[^.:]+$/;

	for (let i = 0; i < argv.length; i++) {
		if (!reg.test(argv[i])) {
			throw new Error('Argv format error: ' + argv[i]);
			return;
		}

		let dirPath = argv[i].split(":")[0].split("."),
			newKey  = argv[i].split(":")[1].trim();

		// 逐步走dirPath
		for (let j = 0, obj = folder, len = dirPath.length; j < len; j++) {
			temp = obj[dirPath[j]];
			// 不是最后一步
			if (j != len - 1) {
				if (!temp || !isObject(temp)) {
					throw new Error('Procedure argv path error: ' + dirPath[j]);
					return;
				}
				obj = temp;
			} else {// 最后一步
				if (!temp) {
					throw new Error('Final argv target error: ' + dirPath[j]);
					return;
				}
				obj[newKey] = temp;
				delete obj[dirPath[j]];

				// 一旦更换文件夹名字成功，必须把接下来的含此已修改路径的alias的路径改写
				let dirPathStr = dirPath.join('.') + '.';
				for (let k = i + 1; k < argv.length; k++) {
					if (argv[k].indexOf(dirPathStr) >= 0) {
						argv[k] = argv[k].replace(dirPathStr, dirPathStr.replace(dirPath[j], newKey));
					}
				}
				// 同时含此路径的templates的路径也该改写
				dirPathStr = '/' + dirPath.join('/');
				for (let k = 0; k < templates.length; k++) {
					// 可能是路径被改写
					if (templates[k].indexOf(dirPathStr + '/') >= 0) {
						dirPathStr = dirPathStr + '/';
						templates[k] = templates[k].replace(dirPathStr, dirPathStr.replace(dirPath[j], newKey));
					} else if (templates[k].indexOf(dirPathStr + '.') >= 0) {// 也可能是文件名直接被改写
						dirPathStr = dirPathStr + '.';
						templates[k] = templates[k].replace(dirPathStr, dirPathStr.replace(dirPath[j], newKey));
						// 保留新旧文件名的映射，新名字文件还是使用旧名字命名的模版
						tplMap[newKey] = dirPath[j];
					}
				}
			}
		}

	}
}

module.exports = parseArgv;