/*********************************************************************
 *                                        						     *
 * Author: Siddharth Shanker               						     *
 * Date: December, 2018.                            			     *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-GradleII *
 *                                        						     *
 *********************************************************************/

const Path = require('path');

let HtmlReporter = require('protractor-beautiful-reporter');
let VideoReporter = require('protractor-video-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

let wd = require('wd');
let wdBridgeModule = require('wd-bridge');
let protractor = require('protractor');
let wdBridge = wdBridgeModule(protractor, wd);

exports.config = {
		
		seleniumAddress: 'http://localhost:4723/wd/hub',

		/**
		 * capabilities
		 */
		
		capabilities: {
			browserName : 'safari',
			showIOSLog : true,
			platformName : 'iOS',
			platformVersion : '12.1',
			deviceName : 'iPhone XR',
			automationName : 'XCUITest',
			showXcodeLog : true,
			autoWebview: 'true',
			autoWebviewTimeout: '10000',
			autoAcceptAlerts: 'true',
			// app: '[ABSOLUTE_PATH_TO_APK/ABSOLUTE_PATH_TO_APP]',
	        // bundleId: '[com..]',
			// udid: '[ONLY_FOR_iOS=THE_UDID_OF_DEVICE]',
		},
		
		/**
		 * multiCapabilities
		 */
		/*
		multiCapabilities : [ 
			{
			    // iOS Device
				browserName : 'safari',
				showIOSLog : true,
				platformName : 'iOS',
				platformVersion : '12.1',
				deviceName : 'iPhone XR',
				automationName : 'XCUITest',

			}, {
				// Android Device
				browserName: 'chrome',
			    platformName: 'Android',
			    platformVersion: '9',
			    deviceName: 'Pixel_2_XL_API_28',
			}
		],
		*/
		
		onPrepare: function () {
			VideoReporter.prototype.jasmineStarted = function() {
				var self = this;
				if (self.options.singleVideo) {
					var videoPath = Path.join(Path.normalize('./videos/'), 'protractor-specs-' + (new Date()) +'.mov');

					self._startScreencast(videoPath);

					if (self.options.createSubtitles) {
						self._subtitles = [];
						self._jasmineStartTime = new Date();
					}
				}
			};
				
			//ffmpegCmd: Path.normalize('./node_modules/ffmpeg-binaries/bin/ffmpeg.exe'),  // --> Windows OS
	        //ffmpegCmd: Path.normalize('/usr/local/bin/ffmpeg'), // --> Unix/Linux OS
    
			jasmine.getEnv().addReporter(new VideoReporter({
			    baseDirectory: Path.normalize('./videos/'),
			    
			    singleVideo: true,
			    createSubtitles: true,
			    saveSuccessVideos: true,
			    
			    ffmpegArgs: [
	            	  '-y',
	            	  '-r', '30',
	            	  '-f', 'avfoundation',
	            	  '-i', '1',
	            	  '-g', '300',
	            	  '-vcodec', 'mpeg4'
	              ]
	          }));
			
			jasmine.getEnv().addReporter(new HtmlReporter({
		         baseDirectory: './reports/HtmlReport_' + Date(),
		         
		         docTitle: 'Protractor Automation Report',
		         docName: 'Automation_Report.html',
					
		         gatherBrowserLogs: true,
		         preserveDirectory: false
		    }).getJasmine2Reporter());
			
			jasmine.getEnv().addReporter(new SpecReporter({
			      displayStacktrace: 'all', // display stack-trace for each failed assertion, values: (all|specs|summary|none)
			      displaySuccessesSummary: true,
			      displayFailuresSummary: true,
			      displayPendingSummary: true,
			      displaySuccessfulSpec: true,
			      displayFailedSpec: true,
			      displayPendingSpec: true,
			      displaySpecDuration: true, 
			      displaySuiteNumber: true, 
			      
			      colors: {
			        success: 'green',
			        failure: 'red',
			        pending: 'yellow'
			      },
			      
			      prefixes: {
			        success: '✓ ',
			        failure: '✗ ',
			        pending: '* '
			      },
			       
			      customProcessors: []
			    }));
			
			wdBridge.initFromProtractor(exports.config);
			
			browser.waitForAngularEnabled(true); //true for angular, false otherwise.
		},
		
		specs: ['test\e2e\specs\test01.js'],
		
		restartBrowserBetweenTests: false,
		
		SELENIUM_PROMISE_MANAGER: false,
		
		ignoreUncaughtExceptions: true,
		
		logLevel: 'ERROR'|'WARN'|'INFO'|'DEBUG',
		
		resultJsonOutputFile: 'console.json',
		
		//highlightDelay: 1000,
		
		framework: 'jasmine2',
		
		jasmineNodeOpts: {
			showColors: true,
			
			isVerbose: true,
			
			includeStackTrace: true,
			
			defaultTimeoutInterval: 20000,
			
			realtimeFailure: true,
			
			print: function () {
				console.log();
			}
		},
		
		baseUrl: 'http://localhost:8000' // iOS base URL
		// baseUrl: 'http://10.0.2.2:8000' // Android base URL
}
