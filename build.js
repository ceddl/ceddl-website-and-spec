'use strict';

global.__basedir = __dirname;
const clean = require(__basedir + '/conf/clean.js');
const copy = require(__basedir + '/conf/copy.js');
const docs = require(__basedir + '/conf/docs.js');
const blog = require(__basedir + '/conf/blog.js');
const less = require(__basedir + '/conf/less.js');

async function run() {

  try {
  	await clean.build();
  	await copy.assets();;	
  	await copy.node_modules();
  	await docs();
  	await blog();
  	await less.render();
  }
  catch(err) {
  	console.log('BUILD: failed');
  	console.log(err);
  }
}

run();


