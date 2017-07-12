/* jshint esversion : 6 */
const pkg = require('./package.json');
//const path = require('path');

const settings = {
  pug: {
    settings: require('./source/config'),
    title: pkg.name
  }
};
const paths = {
  dist: './dist',
  source: './source',
  documentation: './document',
  browserSync: {
    baseDir: './', // I use it for bowers_componet
    startPath: "./dist/html/index.html"
  },
  karma: './tests/config/karma-unit.conf.js',
  viwes: ['!./source/views/layout.pug', './source/views/**/*.pug'],
  scripts: ['./source/config/**/*.js', './source/scripts/**/*.js'],
  tests: ['./tests/**/*.js', './tests/e2e/protractor.js', './tests/e2e/nightmare.js'],
  styles: ['./source/styles/**/*.less']
};

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      all: {
        src: ['Gruntfile.js', paths.tests[0]].concat(paths.scripts)
      },
      options: {
        reporter: require('jshint-stylish')
      }
    },

    uglify: {
      minify: {
        files: [{
          expand: true,
          cwd: paths.source + '/scripts',
          src: ['**/*.js'],
          dest: paths.dist + '/js',
          ext: '.js'
        }]
      }
    },

    less: {
      development: {
        files: [{
          expand: true,
          cwd: paths.source + '/styles',
          src: ['**/*.less'],
          dest: paths.dist + '/css',
          ext: '.css'
        }]
      }
    },

    csso: {
      compress: {
        options: {
          //report: 'min'
          report: 'gzip'
        },
        files: [{
          expand: true,
          cwd: paths.dist + '/css',
          src: ['**/*.css', '!*.min.css'],
          dest: paths.dist + '/css',
          ext: '.min.css'
        }]
      }
    },

    puglint: {
      all: {
        src: paths.viwes
      },
      options: {
        config: {
          validateAttributeSeparator: {
            "separator": " ",
            "multiLineSeparator": "\n "
          },
          disallowHtmlText: true,
          validateIndentation: 2
        }
      },
    },

    pug_beautify: {
      all: {
        expand: true,
        cwd: './source',
        src: './**/*.pug',
        dest: './source',
        options: {
          fill_tab: false,
          omit_div: true,
          tab_size: 2,
          separator_space: true,
          omit_empty_lines: true
        }
      }
    },

    pug: {
      options: {
        data: settings.pug,
        client: true
      },
      all: {
        files: [{
          expand: true,
          cwd: './source/views',
          src: ['**/*.pug', '!layout.pug'],
          dest: './dist/html',
          ext: '.html'
        }]
      },
      one: {
        files: {
          src: '',
          dest: paths.dist
        }
      }
    },

    karma: {
      unit: {
        configFile: './tests/config/karma-unit.conf.js',
        options: {
          //files: ['./tests/unit/**/*.js'] // Este primero antes que los de configuración
        }
      }
    },

    mochaTest: {
      e2e: {
        options: {
          timeout: '11000',
          slow: '7000',
          reporter: 'spec' // spec progress
        },
        src: ['./tests/e2e/nightmare.js']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            './dist/css/**/*.css',
            './dist/html/**/*.html',
            //'./source/scripts/**/*.js',
            './dist/js/**/*.js'
          ]
        },
        options: {
          watchTask: true,
          ghostMode: true,
          startPath: paths.browserSync.startPath,
          server: {
            baseDir: paths.browserSync.baseDir
          }
        }
      },
      tests: {
        //bsFiles: {
        //  src: [
        //    './dist/**/*.*',
        //    './source/scripts/**/*.js'
        //  ]
        //},
        options: {
          ui: false,
          open: false,
          ghostMode: false,
          server: {
            baseDir: paths.browserSync.baseDir
          }
        }
      }
    },

    docco: {
      debug: {
        src: paths.scripts.concat(paths.tests),
        options: {
          output: paths.documentation
        }
      }
    },

    watch: {
      views: {
        files: './source/views/**/*.pug',
        tasks: ['pug.one'], //['puglint','pug'],
        options: {
          interrupt: true,
          //nospawn: true
          //spawn: false,
        }
      },
      styles: {
        files: './source/styles/**/*.less',
        tasks: ['less'],
        options: {
          interrupt: true,
          //spawn: false
        }
      },
      scripts: {
        //files: paths.tests[0].concat(paths.scripts),
        files: '<%= jshint.all.src %>',
        tasks: ['jshint'],
        options: {
          //spawn: false,
          interrupt: true,
          //nospawn: true
        }
      },
      configFiles: {
        files: ['Gruntfile.js', './tests/config/*.js'],
        tasks: ['jshint'],
        options: {
          reload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-puglint'); // https://github.com/gruntjs/grunt-contrib-pug/
  grunt.loadNpmTasks('grunt-contrib-pug'); // https://github.com/gruntjs/grunt-contrib-pug
  grunt.loadNpmTasks('grunt-pug-format'); // https://github.com/MaraniMatias/grunt-pug-format
  grunt.loadNpmTasks('grunt-contrib-jshint'); // https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-less'); // https://github.com/gruntjs/grunt-contrib-less
  grunt.loadNpmTasks('grunt-csso'); // https://github.com/t32k/grunt-csso
  grunt.loadNpmTasks('grunt-contrib-uglify'); // https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-karma'); // https://github.com/karma-runner/grunt-karma
  grunt.loadNpmTasks('grunt-mocha-test'); // https://github.com/pghalliday/grunt-mocha-test
  grunt.loadNpmTasks('grunt-browser-sync'); // https://www.browsersync.io/docs
  // https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md
  grunt.loadNpmTasks('grunt-contrib-watch'); // https://github.com/gruntjs/grunt-contrib-watch

  grunt.registerTask('default', ['jshint', 'puglint', 'pug', 'less', 'browserSync:dev', 'watch']);
  grunt.registerTask('tests', ['jshint', 'puglint', 'pug', 'less', 'karma']);
  grunt.registerTask('tests-server', ['browserSync:tests']);
  grunt.registerTask('tests-e2e', ['jshint', 'puglint', 'pug', 'less', 'mochaTest']);
  grunt.registerTask('build', ['jshint', 'uglify', 'puglint', 'pug', 'less', 'csso', 'docco']);

  grunt.event.on('watch', function(action, filepath, target) {
    // views : source/views/index.pug has changed
    grunt.log.writeln('=> ' + target + ': ' + filepath + ' has ' + action);
    if (target === "scripts") {
      grunt.config(['jshint.all.src'], [filepath]);
    }
    if (target === "views") {
      grunt.config(['pug.one.file'],{ dist:paths.dest,src: filepath});
    }
  });

};

