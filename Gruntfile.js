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
  dest: './dist',
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
        src: [paths.tests[0]].concat(paths.scripts)
      },
      config: {
        src: ['Gruntfile.js', './tests/config/*.js']
      },
      options: {
        reporter: require('jshint-stylish')
      }
    },

    uglify: {
      options: {
        report: 'gzip',
      },
      minify: {
        files: [{
          expand: true,
          cwd: paths.source + '/scripts',
          src: ['**/*.js'],
          dest: paths.dest + '/js',
          ext: '.js'
        }]
      }
    },
    // concat

    less: {
      development: {
        files: [{
          expand: true,
          cwd: paths.source + '/styles',
          src: ['**/*.less'],
          dest: paths.dest + '/css',
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
          cwd: paths.dest + '/css',
          src: ['**/*.css', '!*.min.css'],
          dest: paths.dest + '/css',
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
        pretty: false, // Output indented HTML.
        data: settings.pug
      },
      all: {
        files: [{
          expand: true,
          cwd: './source/views',
          src: ['**/*.pug', '!layout.pug'],
          dest: paths.dest + '/html',
          ext: '.html'
        }]
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
            paths.dest + './css/**/*.css',
            paths.dest + './html/**/*.html',
            './source/scripts/**/*.js',
            paths.dest + './js/**/*.js'
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
        files: paths.viwes,
        tasks: ['puglint', 'pug'],
        options: {
          interrupt: true
        }
      },
      styles: {
        files: paths.styles,
        tasks: ['less'],
        options: {
          interrupt: true
        }
      },
      scripts: {
        files: '<%= jshint.all.src %>',
        tasks: ['jshint:all'],
        options: {
          spawn: false,
          interrupt: true,
        }
      },
      configFiles: {
        files: '<%= jshint.config.src %>',
        tasks: ['jshint:config'],
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

  grunt.registerTask('default', 'Start', ['jshint', 'puglint', 'pug:all', 'less', 'browserSync:dev', 'watch']);
  grunt.registerTask('tests', ['jshint', 'puglint', 'pug:all', 'less', 'karma']);
  grunt.registerTask('tests-server', ['browserSync:tests']);
  grunt.registerTask('tests-e2e', ['jshint', 'puglint', 'pug:all', 'less', 'mochaTest']);
  grunt.registerTask('build', ['jshint', 'uglify', 'puglint', 'pug:all', 'less', 'csso', 'docco']);

  grunt.event.on('watch', function(action, filepath, target) {
    // views : source/views/index.pug has changed
    //grunt.log.writeln('=> ' + target + ': ' + filepath + ' has ' + action);
    if (target === "scripts") {
      grunt.config(['jshint.all.src'], [filepath]);
    }
  });

};

