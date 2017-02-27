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

		for (let j = 0, obj = folder; j < dirPath.length; j++) {
			temp = obj[dirPath[j]];
			if (j != dirPath.length - 1) {
				if (!temp || !isObject(temp)) {
					throw new Error('Argv path error: ' + temp);
					return;
				}
				obj = temp;
			} else {
				if (!temp) {
					throw new Error('Argv target error: ' + temp);
					return;
				}
				obj[newKey] = temp;
				delete obj[dirPath[j]];
			}
		}

	}
}

module.exports = parseArgv;