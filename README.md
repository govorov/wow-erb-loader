# wow-erb-loader
Another `.erb` loader for webpack. May be useful for passing something from rails to js environment.

Inspired by [uh-erb-loader](https://www.npmjs.com/package/uh-erb-loader).

Key difference is possibility to provide path to rails binary.
Files are piped through the `ERB` via a `rails runner` call on commandline (see source for more info).

## Installation

Install from npm

```bash
$ npm install wow-erb-loader --save-dev
```

## Example Webpack configuration

```js
// webpack.config.js

module.exports = {
  preLoaders: [
  	//assumes rails binary is ./bin/rails
    { test: /\.erb$/, loader: 'wow-erb-loader' },
    //provide custom rails binary path
    { test: /\.erb$/, loader: 'wow-erb-loader?rails=../bin/rails' },
  ]
};
```
