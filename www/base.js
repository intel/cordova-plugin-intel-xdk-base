/*
Copyright 2015 Intel Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file 
except in compliance with the License. You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the 
License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
either express or implied. See the License for the specific language governing permissions 
and limitations under the License
*/


var exec = require('cordova/exec');

/**
 * Provides access to legacy properties
 */

module.exports = {

	isnative: true,			//hardcoded
	isxdk: false,			//hardcoded
	istest: false,			//hardcoded
	ischrome: false,		//set by web build
	isfacebook: false,		//set by web build
	isweb: false,			//set by web build
	isphone: false,			//set programatically?
	istablet: false,		//set programatically?
	isamazon: false,		//set by web build
	isgoogle: false,		//set by web build
	isintel: false,			//set by web build
	ismozilla: false,		//set by web build
	isnook: false,			//set by web build
	iswp8: false,			//hardcoded (per platform)
	iswin8: false,			//hardcoded (per platform)
	app: "",				//set programatically
	release: "",			//set programatically
	package: "",			//set programatically
	webRoot: "",			//set programatically

}

//fire intel.xdk.device.ready event after receiving cordova 'deviceready' event
//should piggyback on cordova channels, but for now just use standard DOM approach
document.addEventListener('deviceready', function(e) {

	intel.xdk.device.showSplashScreen();

	var splashScreenTimeout = 3;
	intel.xdk.device._splashTimer = setTimeout(function(){
		intel.xdk.device._splashTimer = -1;
		intel.xdk.device.hideSplashScreen();
	}, splashScreenTimeout*1000);

	var ixdr = document.createEvent('Events');
	ixdr.initEvent("intel.xdk.device.ready", true, true);
	document.dispatchEvent(ixdr);
}, false);
