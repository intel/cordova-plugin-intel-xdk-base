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

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.IsolatedStorage;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.Foundation;
using Windows.Storage;
using Windows.Storage.Search;
using Windows.Storage.Streams;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.CordovaLib;

namespace Cordova.Extension.Commands
{
    public class IntelXDKBase : BaseCommand
    {
        #region Private Members
        bool showingSplash = false;
        string splashImg = "splash_screen.jpg";
        #endregion

        #region Constructor
        /// <summary>
        /// IntelCache Constructor
        /// </summary>
        public IntelXDKBase()
        { }
        #endregion

        #region appmobi.js Handlers
        public void hideSplashScreen(string parameters)
        {
            showingSplash = false;
            var js = "(function() {" +
            "document.body.removeChild(splashContainer);" +
            "})();";
            InvokeCustomScript(new ScriptCallback("eval", new string[] { js }), true);
        }

        public async void showSplashScreen(string parameters)
        {
            if (!showingSplash)
            {
                try
                {
                    var file1 = await StorageFile.GetFileFromPathAsync(Windows.ApplicationModel.Package.Current.InstalledLocation.Path + @"\www\intel.xdk.base\wp8\" + splashImg);

                    if (file1 != null)
                    {
                        var js = "(function() {" +
                                 "window.splashContainer = document.createElement(\"div\");" +
                                 "splashContainer.style.textAlign = \"center\";" +
                                 "splashContainer.style.position = \"relative\";" +
                                 "splashContainer.style.margin = \"0 auto\";" +
                                 "splashContainer.style.top = \"0px\";" +
                                 "splashContainer.style.left = \"0px\";" +

                                 "var splash = document.createElement(\"img\");" +
                                 "splash.id = \"imgsplash\";" +
                                 "splash.style.height = \"570px\";" +
                                 "splash.style.width = \"320px\";" +
                                 //"splash.src = \"" + folder + "\\intel_repository\\" + splashImg + "\";" +
                                 "splash.src = \"/www/intel.xdk.base/wp8/" + splashImg + "\";" +
                                 "splashContainer.appendChild(splash);" +

                                 "document.body.appendChild(splashContainer);" +

                                 "})();";
                        InvokeCustomScript(new ScriptCallback("eval", new string[] {js}), true);
                        showingSplash = true;
                    }
                }
                catch (FileNotFoundException ex)
                {
                }
                catch (Exception ex)
                {
                }

            }
        }
        #endregion
   }
}
