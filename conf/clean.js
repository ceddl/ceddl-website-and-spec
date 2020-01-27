'use strict';

const fs = require('fs-extra')

const build = function () {
	console.log(`Running "clean.build" task`);

	return fs.emptyDir(__basedir + '/build');
}

module.exports = {
	build: build 
}