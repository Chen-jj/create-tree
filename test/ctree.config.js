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

module.exports = {
	folder: folder,
	alias: {
		module: 'page.module'
	},
	templates: [
		"/page/module/index.shtml"
	]
}