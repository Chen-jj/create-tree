let folder = {
	'page': {
		'module': {
			'mod': {},
			'utils': {},
			'preloadindex.inline': 'js',
			'firstscreenindex.inline': 'js',
			'index.async': 'js',
			'index': 'shtml'
		}
	}
}

/*template = {
}*/

module.exports = {
	folder: folder,
	alias: [{
		module: 'page.module'
	}]
}