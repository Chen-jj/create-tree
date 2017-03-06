const isObject = require('../utils/isObject');

function parseArgv (folder, argv) {
	let reg = /^([^.:]+\.)+[^.:]+:[^.:]+$/;

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
				let dirPathStr = dirPath.join('.');
				for (let k = i + 1; k < argv.length; k++) {
					let index = argv[k].indexOf(dirPathStr);
					if (index >= 0 && argv[k][index + dirPathStr.length] == '.') {
						argv[k] = argv[k].replace(dirPathStr, dirPathStr.replace(dirPath[j], newKey));
					}
				}
			}
		}

	}
}

module.exports = parseArgv;