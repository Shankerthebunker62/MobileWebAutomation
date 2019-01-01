/*********************************************************************
 *                                        						     *
 * Author: Siddharth Shanker               						     *
 * Date: December, 2018.                            			     *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-GradleII *
 *                                        						     *
 *********************************************************************/

const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

const SuperCalculator = require(dirPath + '/test/e2e/scripts/Super-Calculator-Module.js');

let _SuperCalculator = new SuperCalculator();

describe('Protractor Demo App 03', function() {
	let value;
	let originalTimeout;
	
	beforeAll(async function(done) {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        
		_SuperCalculator.launchUrl();
	});
	
	beforeEach(async function(done) {
		setTimeout(function() {
		      value = 0;
		      done();
		 }, 1);
	});
	
	it('Divide Two Numbers',async function(done) {
		debugger;
		value++;
		
		_SuperCalculator.Divide('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Substract Two Numbers',async function(done) {
		debugger;
		value++;
		
		_SuperCalculator.Substract('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Module Two Numbers',async function(done) {
		debugger;
		value++;
		
		_SuperCalculator.Module('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Multiply Two Numbers',async function(done) {
		debugger;
		value++;
		
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Add Two Numbers',async function(done) {
		debugger;
		value++;
		
		_SuperCalculator.Add('_DefaultCompRowTwo');
		
		done();
	});
	
	afterEach(async function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	afterAll(async function() {
		_SuperCalculator.closeBrowser();
	});
});