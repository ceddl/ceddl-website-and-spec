'use strict';

const fs = require('fs-extra')

const assets = function () {
	console.log(`Running "copy.assets" task`);
	let copyPromises = [];
		copyPromises.push(fs.copy(__basedir + '/src/img', __basedir + '/build/img'));
        copyPromises.push(fs.copy(__basedir + '/src/fonts', __basedir + '/build/fonts'));
        copyPromises.push(fs.copy(__basedir + '/src/demo', __basedir + '/build/demo'));
        copyPromises.push(fs.copy(__basedir + '/src/js', __basedir + '/build/js'));
		copyPromises.push(fs.copy(__basedir + '/src/robots.txt', __basedir + '/build/robots.txt'));
	return Promise.all(copyPromises);
}

const node_modules = function () {
	console.log(`Running "copy.node_modules" task`);
	let copyPromises = [];
	copyPromises.push(fs.copy(__basedir + '/node_modules/@ceddl/ceddl-polyfill/dist/', __basedir + '/build/demo/js/node-modules-files/'));
    copyPromises.push(fs.copy(__basedir + '/node_modules/@ceddl/ceddl-aditional-inputs/dist/', __basedir + '/build/demo/js/node-modules-files/'));
	copyPromises.push(fs.copy(__basedir + '/node_modules/@ceddl/ceddl-polyfill/dist/', __basedir + '/build/js/@ceddl/ceddl-polyfill'));
    copyPromises.push(fs.copy(__basedir + '/node_modules/@ceddl/ceddl-aditional-inputs/dist/', __basedir + '/build/js/@ceddl/ceddl-aditional-inputs'));
    return Promise.all(copyPromises);
}

module.exports = {
	assets: assets,
	node_modules: node_modules
}