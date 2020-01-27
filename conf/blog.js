/*
 * ceddl blog, rss, index pages
 * https://www.ceddlbyexample.com/
 *
 * Copyright (c) 2017 ceddl contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = async function () {
  console.log(`Running "blog" task`);

  const fs = require('fs-extra');
  const pug = require('pug');
  const highlighter = require('highlight.js');
  const marked = require('marked');
  const blog = require('./lib/blog').init();
  const bundleVersion = require('../package.json').version.replace(/\./g, '');
  const glob = require('globby');

  /**
   * Custom task to generate the ceddl blog
   */
  console.log('blog -- Generating blog...');

  // Set default marked options
  marked.setOptions({
    gfm: true,
    anchors: true,
    base: '/',
    pedantic: false,
    sanitize: false,
    // callback for code highlighter
    highlight: function (code) {
      return highlighter.highlight('javascript', code).value;
    }
  });

  var names;
  var shortList = [];
  var articleList = [];
  var base = 'docs/blog/';
  var files = await glob(['Blog-*.md'], {cwd: base});

  names = files.map(function (name) {
    return name.substring(5, name.length - 3);
  }).reverse();

  // REVERSE the list, generate short article list
  files.reverse().forEach(function (file, i) {
    var name = names[i];
    var postTitle = name.substring(10, name.length).replace(/-/g, ' ');
    var postDate = name.substring(0, 10);
    var destName = name.toLowerCase();

    articleList.push({
      url: destName,
      title: postTitle,
      postDate: blog.formatDate(postDate)
    });
  });

  files.forEach(function (file, i) {

    var name = names[i];
    var postTitle = name.substring(10, name.length).replace(/-/g, ' ');
    var postDate = name.substring(0, 10);
    var destName = name.toLowerCase();
    var src = base + file;
    var dest = 'build/blog/' + destName + '.html';

    function renderBlogTemplate(src) {
      var file = 'src/tmpl/blog.pug';
      var templateData = {
        page: 'news',
        singlePost: true,
        url: destName,
        title: postTitle,
        postDate: blog.formatDate(postDate),
        postRawDate: postDate,
        articleList: articleList,
        content: marked(fs.readFileSync(src, "utf8")),
        bundleVersion: bundleVersion,
        rawSrc: src
      };
      shortList.push(templateData);

      return pug.compile(fs.readFileSync(file), {filename: file})(templateData);
    }

    try {
      fs.outputFile(dest, renderBlogTemplate(src))
    } catch (e) {
      console.log(e);
      console.log('blog -- Pug failed to compile.');
    }
  });

  /**
   * Generate the blog page with a list of posts
   */
  console.log('blog -- Generating blog front page..');
  // remove anchors from blog.html page
  marked.setOptions({
    anchors: false
  });
  // generate blog.html with different 'marked' settings
  shortList.forEach(function (item) {
    item.content = marked(item.rawSrc);
  });
  var blogTpl = 'src/tmpl/blog.pug';
  var blogOut = pug.compile(fs.readFileSync(blogTpl), {filename: blogTpl})({
    page: 'blog',
    title: 'The ceddl Blog',
    content: shortList,
    articleList: articleList,
    bundleVersion: bundleVersion
  });

  fs.outputFile('build/blog.html', blogOut);

  /**
   * Generate the RSS feed
   */
  console.log('blog -- Generating rss feed...');
  // remove anchors from RSS setting
  marked.setOptions({
    anchors: false
  });
  // generate the feed items with different 'marked' settings
  shortList.forEach(function (item) {
    item.rssSrc = marked(item.rawSrc);
    item.atomId = blog.atomIDnTimeStampChurner(item.url, item.postRawDate);
  });
  var rssTpl = 'src/tmpl/rss.pug';
  var rssOut = pug.compile(fs.readFileSync(rssTpl), {filename: rssTpl})({
    page: 'rss',
    posts: shortList
  });
  fs.outputFile('build/atom.xml', rssOut);

  /**
   * Generate the front page
   */
  console.log('blog -- Generating the front page...');
  var indexTpl = 'src/tmpl/index.pug';
  var indexOut = pug.compile(fs.readFileSync(indexTpl), {filename: indexTpl})({
    page: 'index',
    news: shortList.splice(0, 5),
    bundleVersion: bundleVersion
  });
  fs.outputFile('build/index.html', indexOut)
};
