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

//query the DOM for presence of cordova.js
//if it's missing, add it
function cordovaJSCheck() {
	var hasCordovaDotJS = (document.querySelector("script[src*='cordova.js']")!=null);
	if(!hasCordovaDotJS){
		var scr=document.createElement('script');
		scr.src='cordova.js';
		document.head.appendChild(scr);
	}
}

document.addEventListener('DOMContentLoaded', function(e) {
	cordovaJSCheck();
}, false); 
