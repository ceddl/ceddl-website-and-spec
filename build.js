'use strict';

global.__basedir = __dirname;
const chokidar = require('chokidar');
const clean = require(__basedir + '/conf/clean.js');
const copy = require(__basedir + '/conf/copy.js');
const docs = require(__basedir + '/conf/docs.js');
const blog = require(__basedir + '/conf/blog.js');
const less = require(__basedir + '/conf/less.js');

async function build() {

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

function dev() {
  const server = require(__basedir + '/server.js');

  try {

    chokidar.watch('./src/less/**', {ignoreInitial: true})
      .on('all',() => {
      less.render();
    });

    chokidar.watch('./docs/**', {ignoreInitial: true})
      .on('all',() => {
      docs();
      blog();
    });

    chokidar.watch('./src/tmpl/**', {ignoreInitial: true})
      .on('all',() => {
      docs();
      blog();
    });

    chokidar.watch('./src/**', {
      ignoreInitial: true,
      ignored: ['./src/less/**']
    }).on('all',async() => {
      await build();
      server.restart();
    });

  }
  catch(err) {
    console.log('BUILD: failed');
    console.log(err);
  }

}

switch(process.argv[2]) {
  case '--build':
    build();
    break;
  case '--watch':
    dev();
    break;
}





