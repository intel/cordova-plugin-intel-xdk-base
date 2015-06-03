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
 * Provides access to the various notification features on the device.
 */

module.exports = {

	hideSplashScreen: function() {
		if(intel.xdk.device._splashTimer != -1) {
			clearTimeout(intel.xdk.device._splashTimer);
			intel.xdk.device._splashTimer = -1;
		}
		exec(null, null, "IntelXDKBase", "hideSplashScreen", []);
	},

	showSplashScreen: function() {
		exec(null, null, "IntelXDKBase", "showSplashScreen", []);
	},

}
