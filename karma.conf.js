// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path')
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    formatError: (msg) => {
      return msg.replace(/src\/app\//g, 'app/src/app/')
      // return msg
    },
    coverageReporter: {
      // specify a common output directory
      dir: path.join(__dirname, './coverage/licenseApp'),
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: '.' },
        { type: 'lcov', subdir: '.' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        // { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
        { type: 'cobertura' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    junitReporter: {
      outputDir: 'tests' // results will be saved as $outputDir/$browserName.xml
      // outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      // suite: '' // suite will become the package name attribute in xml testsuite element
    },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromiumHeadless'],
    singleRun: false,
    restartOnFileChange: true,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 100000,
    customLaunchers: {
      HeadlessChromium: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox',
          '--disable-gpu',
          '--enable-logging',
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate',
          '--single-process',
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
          '--disable-device-discovery-notifications',
          '--disable-web-security'
        ]
      }
    }
  })
}
