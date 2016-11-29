# bundle
Easily bundle+cachebust+minify your assets for deployment from an index.html file. It takes an
html file with useref blocks and bundles+cachebusts+minifies those assets to a destination
foulder of your choosing.

## Installation
[Make sure you have Node.js & npm installed on your computer](https://www.joyent.com/blog/installing-node-and-npm/)

```bash
npm install bundle
```

## Usage

### cli
```bash
bundle index.html other.html -o=dist
```

### api
```js
const bundle = require('bundle')
bundle(['index.html', 'other'], 'dist')
```
