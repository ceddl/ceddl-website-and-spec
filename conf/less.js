'use strict';

const less = require('less');
const fs = require('fs-extra');

const render = function () {
	console.log(`Running "less.render" task`);
	return less.render(fs.readFileSync(__basedir + '/src/less/main.less', "utf8"),  {
		filename:__basedir + '/src/less/main.less'
	})
 	.then(function(output) {
 		 fs.outputFile(__basedir + '/build/css/main.css', output.css)
 		return;
 	})
  };


module.exports = {
	render: render 
}