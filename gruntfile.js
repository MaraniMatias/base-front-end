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
      all: ['gruntfile.js', paths.tests[0]].concat(paths.scripts),
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
      check: {
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

    //pug_beautify: {
    //  all: {
    //    expand: true,
    //    cwd: './source',
    //    src: 'views/**/*.pug',
    //    dest: './dist',
    //    options: {
    //      omit_empty_lines: false,
    //      fill_tab: !true,
    //      omit_div: false,
    //      tab_size: 2
    //    }
    //  }
    //},

    pug: {
      compile: {
        options: {
          data: settings.pug
        },
        files: [{
          expand: true,
          cwd: './source/views',
          src: ['**/*.pug', '!layout.pug'],
          dest: './dist/html',
          ext: '.html'
        }]
      }
    },

    karma: {
      unit: {
        configFile: './tests/config/karma-unit.conf.js',
        options: {
          //files: ['./tests/unit/**/*.js'] // le este primero antes que los de configuración
        }
      }
    },

    mochaTest: {
      e2e: {
        options: {
          timeout: '10000',
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
        tasks: ['puglint', 'pug'],
        options: {
          interrupt: true,
          livereload: true
        },
      },
      styles: {
        files: './source/styles/**/*.less',
        tasks: ['less'],
        options: {
          interrupt: true
        },
      },
      scripts: {
        files: paths.tests[0].concat(paths.scripts),
        // files: ['./source/scripts/**/*.js', './tests/**/*.js'],
        tasks: ['jshint'],
        spawn: !false,
        options: {
          interrupt: true
        },
      },
      configFiles: {
        files: ['gruntfile.js', './tests/config/*.js'],
        tasks: ['jshint'],
        options: {
          reload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-puglint'); // https://github.com/gruntjs/grunt-contrib-pug/
  grunt.loadNpmTasks('grunt-contrib-pug'); // https://github.com/gruntjs/grunt-contrib-pug
  //grunt.loadNpmTasks('grunt-pug-beautify'); // https://github.com/pierrecholhot/grunt-pug-beautify
  grunt.loadNpmTasks('grunt-contrib-jshint'); // https://github.com/gruntjs/grunt-contrib-jshint
  grunt.loadNpmTasks('grunt-contrib-less'); // https://github.com/gruntjs/grunt-contrib-less
  grunt.loadNpmTasks('grunt-csso'); // https://github.com/t32k/grunt-csso
  grunt.loadNpmTasks('grunt-contrib-uglify'); // https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-karma'); // https://github.com/karma-runner/grunt-karma
  grunt.loadNpmTasks('grunt-mocha-test'); // https://github.com/pghalliday/grunt-mocha-test
  grunt.loadNpmTasks('grunt-browser-sync'); // https://www.browsersync.io/docs
  grunt.loadNpmTasks('grunt-contrib-watch'); // https://github.com/gruntjs/grunt-contrib-watch

  grunt.registerTask('default', ['jshint', 'puglint', 'pug', 'less', 'browserSync:dev', 'watch']);
  grunt.registerTask('tests', ['jshint', 'puglint', 'pug', 'less', 'karma']);
  grunt.registerTask('tests-server', ['browserSync:tests']);
  grunt.registerTask('tests-e2e', ['jshint', 'puglint', 'pug', 'less', 'mochaTest']);
  grunt.registerTask('build', ['jshint', 'uglify','puglint', 'pug', 'less', 'csso', 'docco']);
};

