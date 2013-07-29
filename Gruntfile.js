module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                src: [
                    'src/intro.js',
                    'src/class.js',
                    'src/outro.js'
                ],
                dest: 'tmp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cafemocha: {
            tests: {
                    src: 'test/*_test.js',
                    options: {
                            ui: 'bdd',
                            require: [
                                    'should'
                            ],
                    },
            }
        },
        clean: {
            tests: ['tmp']
        },
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cafe-mocha');

    grunt.registerTask('test', ['concat', 'cafemocha']);

    grunt.registerTask('default', ['test', 'uglify', 'clean']);

};