var ngrok = require('ngrok');

module.exports = function (grunt) {

  grunt.initConfig({

    /* Clear out the images directory if it exists */
    clean: {
      dist: {
        src: ['dist'],
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dist: {
        options: {
          create: ['dist']
        },
      },
    },

    /* Copy the files to dist folder */
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            'img/*.{gif,jpg,png,svg}',
            'views/images/*.{gif,jpg,png,svg}'],
          dest: 'dist'
        }]
      }
    },

    /* Minify JS files */
    uglify: {
      dist: {
        files: {
          'dist/js/perfmatters.js': ['src/js/perfmatters.js'],
          'dist/views/js/main.js': ['src/views/js/main.js']
        }
      }
    },

    /* Minify CSS files */
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css'],
          dest: 'dist/css',
          ext: '.css'
        },
        {
          expand: true,
          cwd: 'src/views/css',
          src: ['*.css'],
          dest: 'dist/views/css',
          ext: '.css'
        }]
      }
    },

    /* Minify HTML files */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html',
          'dist/project-2048.html': 'src/project-2048.html',
          'dist/project-mobile.html': 'src/project-mobile.html',
          'dist/project-webperf.html': 'src/project-webperf.html',
          'dist/views/pizza.html': 'src/views/pizza.html'
        }
      }
    },

    /* inline resources */
    inline: {
      dist: {
        options: {
          tag: ''
        },
        src: 'dist/index.html'
      }
    },

    /* Project server */
    connect: {
      dist: {
        options: {
          port: '8000',
          hostname: 'localhost',
          keepalive: true,
          base: 'dist'
        }
      }
    },

    /* Get pagespeed scores */
    pagespeed: {
      options: {
        paths: ['/index.html'],
        nokey: true,
        locale: 'en_US',
        threshold: 90
      },
      local: {
        options: {
          strategy: 'desktop'
        }
      },
      mobile: {
        options: {
          strategy: 'mobile'
        }
      }
    }
  });

  /* Prepare the dist folder for serve */
  grunt.registerTask('prepare',[
    'clean',
    'mkdir',
    'copy',
    'uglify',
    'cssmin',
    'htmlmin',
    'inline'
  ]);

  /* Create the `serve` task */
  grunt.registerTask('serve',[
    'connect'
  ]);

  /* ngrok task to get pagespeed test scores */
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8000;
    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-pagespeed');
};
