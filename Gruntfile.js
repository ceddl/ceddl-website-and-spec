'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      build: ['build/'],
      tmp: ['tmp/']
    },

    less: {
      options: {
        sourceMap: true,
        outputSourceFiles: true
      },
      development: {
        options: {
          paths: ['src/less']
        },
        files: {
          'build/css/main.css': 'src/less/main.less'
        }
      },
      production: {
        options: {
          paths: ['src/less'],
          plugins: [
            new (require('less-plugin-clean-css'))({
              compatibility: 'ie9',
              keepSpecialComments: 0
            })
          ]
        },
        files: {
          'build/css/main.css': 'src/less/main.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'last 2 version',
          '> 1%',
          'Edge >= 12',
          'Explorer >= 9',
          'Firefox ESR',
          'Opera 12.1'
        ]
      },
      main: {
        src: 'build/css/main.css',
        dest: 'build/css/main.css'
      }
    },

    watch: {
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less:development', 'autoprefixer']
      },
      demo: {
        files: 'src/demo/**',
        tasks: ['default']
      },
      tmpl: {
        files: 'src/tmpl/**/*.pug',
        tasks: ['default']
      },
      js: {
        files: 'src/js/**',
        tasks: ['uglify']
      },
      other: {
        files: 'src/img/**',
        tasks: ['default']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['default']
      },
      docs: {
        files: 'docs/**',
        tasks: ['default']
      }
    },

    uglify: {
      options: {
        compress: true,
        mangle: true,
        output: {
          comments: false
        },
        sourceMap: {
          includeSources: true
        }
      },
      bundle: {
        src: [
          'node_modules/@ceddl/ceddl-polyfill/dist/index.js',
          'node_modules/@ceddl/ceddl-aditional-inputs/dist/page-metadata.js',
          'node_modules/@ceddl/ceddl-aditional-inputs/dist/performance-timing.js',
          'src/js/*.js'
        ],
        dest: 'build/js/bundle.js'
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'grunt-plugins.js',
        'server.js',
        'src/js/*.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            'img/**',
            'cdn/**',
            'fonts/**',
            'demo/**'
          ],
          dest: 'build/'
        }]
      },
      root: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*'],
          dest: 'build/',
          filter: 'isFile'
        }]
      },
      nodeModules: {
        files: [{
          expand: true,
          cwd: 'node_modules/@ceddl/ceddl-polyfill/dist/',
          src: ['*.js'],
          dest: 'build/demo/js/node-modules-files/',
          filter: 'isFile'
        },{
          expand: true,
          cwd: 'node_modules/@ceddl/ceddl-aditional-inputs/dist/',
          src: ['*.js'],
          dest: 'build/demo/js/node-modules-files/',
          filter: 'isFile'
        }]
      }
    },

    sitemap: {
      dist: {
        extension: {
          required: false,
          trailingSlash: false
        },
        homepage: 'https://www.ceddlbyexample.com/',
        pattern: ['build/**/*.html'],
        siteRoot: './build'
      }
    },


    "regex-replace": {
      dist: { //specify a target with any name
          src: ['build/sitemap.xml'],
          actions: [
              {
                  name: 'bar',
                  search: '&',
                  replace: '&amp;',
                  flags: 'g'
              }
          ]
      }
    },

    open: {
      dev: {
        path: 'http://localhost:8090/'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      server: ['nodemon', 'watch', 'open'],
      options: {
        logConcurrentOutput: true
      }
    },

    puglint: {
      all: {
        options: {
          extends: '.pug-lintrc.json'
        },
        src: 'src/tmpl/**/*.pug'
      }
    },

    htmllint: {
      src: 'build/**/*.html'
    }

  });

  grunt.loadTasks('tasks'); // getWiki, docs tasks
  require('matchdep')
    .filterAll(['grunt-*', '!grunt-docs'])
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', 'Build the site', [
    'copy',
    'docs',
    'blog',
    'uglify',
    'sitemap',
    'regex-replace'
  ]);
  grunt.registerTask('default', 'Build the site, download plugins, production ready', [
    'build',
    'less:production',
    'autoprefixer'
  ]);
  grunt.registerTask('test', [
    'build',
    'jshint',
    'puglint',
    'htmllint'
  ]);
  grunt.registerTask('dev', 'Development Mode', [
    'build',
    'less:development',
    'autoprefixer',
    'jshint',
    'concurrent'
  ]);
};
