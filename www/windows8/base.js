
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
 * wp8 overrides
 */

module.exports = {
};

	//  Single test now for both platforms to determine which OS is currently running.
    function onDeviceReady() {
        if (navigator.appVersion.indexOf("Windows Phone 8.1;") !== -1) {
            // windows phone 8.1 + Mobile IE 11
            intel.xdk.iswin8 = false;
            intel.xdk.iswp8 = true;
        } else if (navigator.appVersion.indexOf("MSAppHost/2.0;") !== -1) {
            // windows 8.1 + IE 11
            intel.xdk.iswin8 = true;
            intel.xdk.iswp8 = false;
        } else {
            // windows 8.0 + IE 10
            intel.xdk.iswin8 = true;
            intel.xdk.iswp8 = false;
        }
    }
    var evt = "deviceReady";
    document.addEventListener(evt, onDeviceReady, false);


