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

exports.defineAutoTests = function () {
    describe('intel.xdk.base test suite',function () {
        it('hideSplashScreen should be defined',function () {
            expect(intel.xdk.device.hideSplashScreen).not.toBeUndefined();
        });
        
        it('showSplashScreen should be defined',function () {
            expect(intel.xdk.device.showSplashScreen).not.toBeUndefined();
        }); 
    });
};

exports.defineManualTests = function(contentEl, createActionButton) {
  var logMessage = function (message, color) {
        var log = document.getElementById('info');
        var logLine = document.createElement('div');
        if (color) {
            logLine.style.color = color;
        }
        logLine.innerHTML = message;
        log.appendChild(logLine);
    }

    var clearLog = function () {
        var log = document.getElementById('info');
        log.innerHTML = '';
    }

    var $test = '<h3>Show Splash Screen</h3>' +
        '<div id="buttonShowSplashScreen"></div>' +
        'Expected result: Should Show the splash screen for 5 seconds';

    contentEl.innerHTML = '<div id="info"></div>' + $test;

    createActionButton('Show Splash Screen', function() {
        console.log('execute::intel.xdk.device.showSplashScreen()');
        intel.xdk.device.showSplashScreen();
        setTimeout(function(){
            console.log('execute::intel.xdk.device.hideSplashScreen()');
            intel.xdk.device.hideSplashScreen();
        }, 5000);
    }, "buttonShowSplashScreen");
};