'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();
var fs = require('fs');
var path = require('path');

// enable express strict routing, see http://expressjs.com/api.html#app-settings
// for more info
app.enable('strict routing');

/**
 * express app configuration
 */
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'src', 'tmpl'));
app.set('view engine', 'pug');



// strip slashes
app.use(function (req, res, next) {
  if (req.url.substr(-1) === '/' && req.url.length > 1) {
    res.redirect(301, req.url.slice(0, -1));
  } else {
    next();
  }
});

/**
 * Server configuration
 */
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Starting a server on port: ' + port);

/**
 * express app router
 */
app.get('/', function (req, res, next) {
  var filePath = 'build' + req.url + '.html';
  if (req.url === '/') {
    filePath = 'build/index.html';
  }

  fs.exists(filePath, function (exists) {
    if (exists) {
      res.sendFile(filePath, {root: __dirname});
    } else {
      next();
    }
  });
});

// api routes
app.get('/api*', function (req, res, next) {
  req.url = req.url.toLowerCase();
  var filePath = 'build' + req.url + '.html';

  // redirect to the main api page, fix slashes and folder issues
  if (req.url === '/api') {
    res.redirect(301, '/api/ceddl');
    return;
  }

  fs.exists(filePath, function (exists) {
    if (exists) {
      res.sendFile(filePath, {root: __dirname});
    } else {
      next();
    }
  });
});

// news route
app.get('/blog*', function (req, res, next) {
  var cleanUrl = req.url.split('?')[0];
  var filePath = 'build' + cleanUrl + '.html';

  if (cleanUrl === '/blog') {
    res.sendFile('build/blog.html', {root: __dirname});
  } else {

    fs.exists(filePath, function (exists) {
      if (exists) {
        res.sendFile(filePath, {root: __dirname});
      } else {
        next();
      }
    });
  }
});

// rss atom feed
app.get('/rss', function (req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Charset', 'utf-8');
  res.sendFile('build/atom.xml', {root: __dirname});
});

// final route, if nothing else matched, this will match docs
app.get('*', function (req, res, next) {
  req.url = req.url.toLowerCase();
  var filePath = 'build/docs/' + req.url + '.html';

  if (req.url.indexOf('/ceddl') === 0) {
    res.redirect(301, '/api' + req.url);
    return;
  }

  fs.exists(filePath, function (exists) {
    if (exists) {
      res.sendFile(filePath, {root: __dirname});
    } else {
      next();
    }
  });

});

/**
 * express app configuration after routes
 */
// use the static router
app.use(express.static('build'));
// if nothing matched, send 404
app.use(function (req, res) {
  res.status(404).render('404', {
    page: 'notfound',
    title: '404 Not Found'
  });
});
app.use(errorHandler({
  dumpExceptions: false,
  showStack: false
}));

function restart() {
   console.log("Clearing /app/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
    })
}


module.exports = {
  restart: restart
} 