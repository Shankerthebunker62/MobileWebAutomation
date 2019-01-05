/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

const SuperCalculator = require(dirPath + '/test/e2e/scripts/Super-Calculator-Module.js');

const testCasePurpose = 'Protractor Demo App 02';

let _SuperCalculator = new SuperCalculator();

describe(testCasePurpose, function() {
	
	beforeAll(function() {
		_SuperCalculator.launchUrl('_DefaultCompRow', testCasePurpose);
	});
	
	beforeEach(function() {
		
	});
	
	it('Multiply Two Numbers', function() {
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
	});
	
	it('Add Two Numbers', function() {
		_SuperCalculator.Add('_DefaultCompRowOne');
	});
	
	it('Module Two Numbers', function() {
		_SuperCalculator.Module('_DefaultCompRowTwo');
	});
	
	it('Divide Two Numbers', function() {
		_SuperCalculator.Divide('_DefaultCompRowOne');
	});
	
	it('Substract Two Numbers', function() {
		_SuperCalculator.Substract('_DefaultCompRowTwo');
	});
	
	afterEach(function() {
	    
	});
	
	afterAll(function() {
		_SuperCalculator.closeBrowser();
	});
});