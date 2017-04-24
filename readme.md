# create-tree

Create-tree is a tool that helps us to create a working directory.

## examples

Once you install create-tree through npm, you can use the `create-tree` command in npm script.

Add create-tree to you npm script command.

package.json:
	
```json
{
  "scripts": {
    "ctree": "create-tree",
  }
}
```

Also, you need to provide a **ctree.config.js** in root path.

ctree.config.js:

```js
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

module.exports = {folder}
```

Then, just run `npm run ctree`, you will create a directory structure in root path like this:

![example directory](https://misc.aotu.io/Chen-jj/ctree.png)

***update***

* 2017-4-24: you can now provide a list of ext, create-tree can generate all files of this ext's list.

```js
let folder = {
	'index': ['html', 'css', 'js']
}

module.exports = {folder}
```

## configuration

All configurations of create-tree are written in ctree.config.js.This config file should put in where you want to create this directory structure and run create-tree npm script command.

### Config you own directory structure

Every ctree.config.js should exports the **folder object** to specify the directory structure that you want to create.

In folder object:

* create a foder: key stand for foder's name and value must be a Object.
* create a file: key stand for file's name and value must be a String which stand for this file's ext.

#### example

ctree.config.js:

```js
let folder = {
	'modules': {},
	'index': 'js'
}

module.exports = {folder}
```

With the configuration above, we can create a folder named 'modules' and index.js in current path.

Also, if the folder or file already exists, create-tree will skip them.

### Dynamically replace folder's  or file's name

You can replace some folders or files's name when running the npm script, the only thing you need to do is to provide the replacement arguments.

#### example

ctree.config.js:

```js
let folder = {
	'src': {
		'pages': {
			'modules': {}
		}
	}
}

module.exports = {folder}
```

If you want to replace folder's name from 'module' to 'index' dynamically, you just need to provide an arguments to npm script like this:

```
npm run ctree -- "src.pages.modules:index"
```

#### alias

Like the example above, sometimes the item we want to replace is very deep. It's very boring to tap a long string like "src.pages.modules:index" everytime.

Create-tree has a alias function to avoid that by exports an alias Object.

ctree.config.js:

```js
let folder = {
	'src': {
		'pages': {
			'modules': {}
		}
	}
}

module.exports = {
	folder: folder,
	alias: {
		module: 'src.page.module'
	}
}
```

Then, we can replace 'module' to 'index' like this:

```
npm run ctree -- --module index
```

Actually, you can let this command shorter using the npm script.

### generate file's default content with templates

You can provide some file's templates in folder: **ctree_tpl**, then specify which file need this template to generate its' content.

Notice that the file and its' template must has a same name and ext.

#### examples

ctree.config.js:

```js
let folder = {
	'page': {
		'module': {
			'index': 'shtml'
		}
	}
}

module.exports = {
	folder: folder,
	templates: [
		"/page/module/index.shtml"
	]
}
```




## installation

<mark>Notice:</mark> the nodejs version must >= 6.0.0

With [npm](https://github.com/npm/npm):

```
npm install create-tree
```