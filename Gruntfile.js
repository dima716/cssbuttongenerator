module.exports = function (grunt) {
//описываем конфигурацию 
grunt.initConfig({

    csscomb: {
        options: {
            config: 'csscomb.json'
        },
        main: {
           expand: true,
           cwd: 'dev/css/',
           src: ['base/*.less','project/*.less','cosmetic/*.less'],
           dest: 'dev/css/'
        }
    },

    less: {
          main: {
              files: {  
                  "dev/css/main.css": "dev/css/main.less"
              }
          }
      },
      
    cssmin: { //описываем работу плагина минификации и конкатенации css.
        main: {
            files: {
                'build/css/main.min.css' : 'dev/css/main.css'   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
            }
        }
    },

    jshint: {     // описываем как будет проверять наш код - jsHint
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          console: true
        }
      },
      main: {  //вставляем название проекта из package.json
        src: [ 'dev/js/main.js' ]  //какие файлы надо проверять
      }
    },

    concat: {  //описываем работу плагина конкатенации
        dist: {
            src: ['dev/js/SCF.ui.js','dev/js/scrollbox.js','dev/js/main.js'],  // какие файлы конкатенировать
            dest: 'dev/js/main.min.js'  // куда класть файл, который получится после процесса конкатенации 
        }
    },

    uglify: {  //описываем работу плагина минификации js - uglify.
        build: {
            src: 'dev/js/main.min.js',  // какой файл минифицировать
            dest: 'build/js/main.min.js' // куда класть файл, который получиться после процесса минификации
        }
    },

    watch: { //описываем работу плагина слежки за файлами.
        options: {
            livereload: true
        },
        html: {
            files: ['build/index.html']
        },
        css: {
            files: ['dev/css/**/*.less','dev/css/**/*.css'], //следить за всеми less файлами в папке src
            tasks: ['less','cssmin'] //при их изменении запускать следующую задачу
        },
        scripts: {
            files: ['dev/js/*.js'],  //следить за всеми js файлами в папке dev
            tasks: ['jshint','concat','uglify']  //при их изменении запускать следующие задачи
        },
    },

    removelogging: { //описываем работу плагина удаления логов
        dist: {
            src: "build/js/main.min.js", // файл который надо отчистить от console.log
            dest: "build/js/main.min.js" // выходной файл, который получим после очистки
        }
    },

    autoprefixer: {

        // prefix the specified file
        main: {
          options: {
            browsers: ['firefox >= 20','explorer >= 7','chrome >= 20','android >= 2.1','opera >= 16.0','safari >= 6.0']
          },
          src: 'dev/css/main.css',
          dest: 'dev/css/main.css'
        }
    },

    imagemin: {                                 // Task
        main: {                                 // Another target
            files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'img/',                   // Src matches are relative to this path
                src: ['*.{png,jpg}'],          // Actual patterns to match
                dest: 'img/'                  // Destination path prefix
            }]
        }
    }
});

//подгружаем необходимые плагины
grunt.loadNpmTasks('grunt-csscomb');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-cssmin');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');


grunt.loadNpmTasks('grunt-contrib-watch');

grunt.loadNpmTasks('grunt-remove-logging');

grunt.loadNpmTasks('grunt-autoprefixer');

grunt.loadNpmTasks('grunt-contrib-imagemin');

//регистрируем задачу 
grunt.registerTask('default', ['imagemin']);
grunt.registerTask('default', ['csscomb', 'less','autoprefixer','cssmin','jshint','concat','uglify', 'watch', 'removelogging']); //задача по умолчанию, просто grunt
};