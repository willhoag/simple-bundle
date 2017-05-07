# simple-bundle
Bundle assets without a task manager. HTML -> BUNDLE

[![npm version](https://badge.fury.io/js/simple-bundle.svg)](https://badge.fury.io/js/simple-bundle)

If you use any of my packages, please star them on github. It’s a great way of getting feedback and gives me the kick to put more time into their development. If you encounter any bugs or have feature requests, just open an issue report on Github.

Follow me on Twitter [@devhoag](http://twitter.com/devhoag)

## Description
**html -> dest / pre-processed, minified & cache-busted**

Input html and output pre-processed, minified and cache-busted asset
bundle without a task manager.

Use **.babelrc** and **postcss.config.js** to configure processing your javascript
and styles.


## Example
```bash
bundle index.html -o dist

tree dist
# dist
# ├── index-43fd1cd487.js
# ├── style-be04798bc0.css
# └── index.html
```

## Usage

### Make **.babelrc** and **postcss.config.js** files in your project to customize processing assets
#### .babelrc
```json
{
  "plugins": ["transform-runtime"],
  "presets": ["es2015"]
}
```

#### postcss.config.js
```js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')
  ]
}
```

### Install used dependencies
```bash
yarn add --save-dev \
  babel-plugin-transform-runtime \
  babel-preset-es2015 \
  postcss-import \
  postcss-cssnext
```


### npm run / CLI
```bash
bundle index.html other.html -o dist

tree dist
# dist
# ├── combined-43fd1cd487.js
# ├── css/combined-be04798bc0.css
# ├── other.html
# └── index.html
```

## CLI
```
Usage: bundle [html] {OPTIONS}

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -o, --output [folder]  output directory for assets
```

### JS API
```js
const bundle = require('simple-bundle')
bundle({
  src: ['index.html', 'other.html'],
  dist: 'dist'
})
```

## Installation
Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.


```bash
npm install simple-bundle --save
```

## License
ISC
