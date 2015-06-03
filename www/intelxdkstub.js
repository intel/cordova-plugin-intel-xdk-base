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

var channel = require('cordova/channel');

/**
    The first time intel.xdk is accessed after deviceready is fired, 
    we expand it's interface to include stubs for any missing objects.
 */

var originalXDK = intel.xdk
var runOnce = false;

Object.defineProperty(intel, 'xdk', {
    
    get :  function() {
        
        var deviceready = (channel.onDeviceReady.state == 2);

        if( deviceready && !runOnce ){
            
            runOnce = true;
            
            //expand the intel.xdk interface to complete coverage
            function expandInterface(prop, action) {
                if(!originalXDK.hasOwnProperty(prop)) {
                    Object.defineProperty( originalXDK, prop, {
                        get: action
                    });
                }
            }

            //intel.xdk must exist because the Intel XDK Base plugin has been loaded, so skip validation

            //create getter stubs for missing supported objects
            var supported = [
                'accelerometer',
                'audio',
                'cache',
                'camera',
                'contacts',
                'device',
                'display',
                'facebook',
                'file',
                'geolocation',
                'multitouch',
                'notification',
                'player'
            ];

            //create getter stubs for unsupported objects
            var unsupported = [
                'canvas',
                'debug',
                'oauth'
            ];

            for (var i = 0; i < supported.length; i++) {
            
                (function() {
                    var prop = supported[i];

                    var action = function() {
                        var propName = prop;
                        var prevOnError = window.onerror;
                        window.onerror = function (e) {
                            console.log('handling call to non-existent member of ' + prop);
                            window.onerror = prevOnError;
                            return true;
                        }
                        alert("intel.xdk." + prop + " is a valid Intel XDK feature, but you have to add a plugin to your project enable it.");
                        return {};
                    }

                    expandInterface(prop, action);
                })();
            }

            for (var i = 0; i < unsupported.length; i++) {
                
                (function() {
                    var prop = unsupported[i];

                    var action = function() {
                        var prevOnError = window.onerror;
                        window.onerror = function (e) {
                            console.log('handling call to non-existent member of ' + prop);
                            window.onerror = prevOnError;
                            return true;
                        }
                        alert("intel.xdk." + prop + " was deprecated and has now been removed.  Please remove references to it from your code.");
                        return {};
                    }

                    expandInterface(prop, action);
                })();
            }

            //after this is run once, replace the custom getter/setter xdk property with the simple object
            delete intel.xdk;
            intel.xdk = originalXDK;
            delete originalXDK;
            return intel.xdk;
        }

        return originalXDK;     
    }

});

module.exports = {};