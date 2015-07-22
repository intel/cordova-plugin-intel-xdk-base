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

    // This try/catch is temporary to maintain backwards compatibility. Will be removed and changed to just 
    // require('cordova/exec/proxy') at unknown date/time.
    var commandProxy;
    try {
        commandProxy = require('cordova/windows8/commandProxy');
    } catch (e) {
        commandProxy = require('cordova/exec/proxy');
    }

    module.exports = {
        splashImg: "splash_screen.jpg",
        splashTabletImg: "splash_screen_tablet.jpg",
        splashTabletLandImg: "splash_screen_landscape_tablet.jpg",
        splashContainer: null,

        hideSplashScreen: function(successCallback, errorCallback, params) {
            var me = module.exports;

            if (me.splashContainer != null) {
                me.splashContainer.style.display = "none";
            }
        },

        showSplashScreen: function(successCallback, errorCallback, params) {
            var me = module.exports;
            var imgPath = "/www/intel.xdk.base/windows8/";


            try {
                var installFolder = Windows.ApplicationModel.Package.current.installedLocation;

                if (this.innerHeight > this.innerWidth) 
                    imgPath += me.splashTabletImg;
                else
                    imgPath += me.splashTabletLandImg;

                installFolder.getFileAsync( imgPath).then(
                    function (file) {
                        // do nothing.  it will leave if file doesn't exist;
                    });
            }
            catch (ex) {
            }

            if (me.splashContainer == null) {
                me.splashContainer = document.createElement("div");
                me.splashContainer.style.textAlign = "center";
                me.splashContainer.style.position = "relative";
                me.splashContainer.style.margin = "0 auto";
                me.splashContainer.style.zIndex = 100001;
                //me.splashContainer.style.top = ((this.innerHeight / 2) - 12.5) + "px";

                var splash = document.createElement("img");
                splash.id = "imgsplash";

                splash.src = imgPath;
                splash.style.hieght = this.innerHeight + "px";
                splash.style.width = this.innerWidth + "px";

                me.splashContainer.appendChild(splash);

                document.body.appendChild(me.splashContainer);
            } else {
                var splash = document.getElementById("imgsplash");
                if (splash != null) {
                    splash.src = imgPath;
                    splash.style.hieght = this.innerHeight + "px";
                    splash.style.width = this.innerWidth + "px";
                }
                me.splashContainer.style.display = "block";
            }
        }
    };

    commandProxy.add('IntelXDKBase', module.exports);
