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

package com.intel.xdk.base;

import java.io.IOException;
import java.io.InputStream;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Rect;
import android.os.Debug;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.ImageView;

/**
 * This class provides access to various notification features on the device.
 */
public class Base extends CordovaPlugin {

    private boolean isTablet = false;
    private View root;
    private View splashView;

    /**
     * Constructor.
     */
    public Base() {
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        
        //get a reference to the content view so that we can set it back after splash is hidden
        root = ((ViewGroup)(cordova.getActivity().getWindow().getDecorView())).getChildAt(0);
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArray of arguments for the plugin.
     * @param callbackContext   The callback context used when calling back into JavaScript.
     * @return                  True when the action was valid, false otherwise.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("hideSplashScreen")) {
            this.hideSplashScreen();
        } else if (action.equals("showSplashScreen")) {
            this.showSplashScreen();
        } else {
            return false;
        }

        // All actions are async.
        //callbackContext.success();
        return true;
    }

    //--------------------------------------------------------------------------
    // LOCAL METHODS
    //--------------------------------------------------------------------------

    private Bitmap getBitmapFromAsset(String strName) throws IOException
    {
        AssetManager assetManager = cordova.getActivity().getAssets();
        InputStream istr = assetManager.open(strName);
        Bitmap bitmap = BitmapFactory.decodeStream(istr);
        return bitmap;
    }
    
    public void hideSplashScreen() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                if(splashView!=null) {
                    ((ViewGroup)splashView.getParent()).removeView(splashView);
                    splashView = null;
                    root.bringToFront();
                }
            }
        });
    }

    public void showSplashScreen() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                //treat displays larger than 6" as tablets
                DisplayMetrics dm = new DisplayMetrics(); 
                cordova.getActivity().getWindowManager().getDefaultDisplay().getMetrics(dm);
                double x = Math.pow(dm.widthPixels/dm.xdpi,2);
                double y = Math.pow(dm.heightPixels/dm.ydpi,2);
                double screenInches = Math.sqrt(x+y);
                if( screenInches>6 ) {
                    isTablet = true;
                }

                //used for calculating status bar height
                int deviceWidth = dm.widthPixels;
                int deviceHeight = dm.heightPixels;
                if( deviceWidth > deviceHeight )
                {
                    deviceWidth = dm.heightPixels;
                    deviceHeight = dm.widthPixels;      
                }

                //get the splash screen image from asssets
                Bitmap bm = null;
                try {
                    if(isTablet){
                        bm = getBitmapFromAsset("www/intel.xdk.base/android/splash_screen_tablet.jpg");
                    } else {
                        bm = getBitmapFromAsset("www/intel.xdk.base/android/splash_screen.jpg");
                    }
                } catch (IOException ioe) {
                }
                
                //if the splash screen assets are missing, don't try to show the splash screen
                if(bm==null) {
                    return;
                }

                if(Debug.isDebuggerConnected()) Log.i("[intel.xdk]", "splash");
                
                ActivityInfo ai = null;
                int splashViewId = 0;
                try {
                    ai = cordova.getActivity().
                        getPackageManager().getActivityInfo( cordova.getActivity().getComponentName(), PackageManager.GET_ACTIVITIES|PackageManager.GET_META_DATA);
            
                    if(isTablet){
                        if(ai.screenOrientation == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE){
                            splashViewId = cordova.getActivity().getResources().getIdentifier("splash_tablet_ls", "layout", cordova.getActivity().getPackageName());
                        } else {
                            splashViewId = cordova.getActivity().getResources().getIdentifier("splash_tablet", "layout", cordova.getActivity().getPackageName());
                        }
                    } else {
                        if(ai.screenOrientation == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE){
                            splashViewId = cordova.getActivity().getResources().getIdentifier("splash_ls", "layout", cordova.getActivity().getPackageName());
                        } else {
                            splashViewId = cordova.getActivity().getResources().getIdentifier("splash", "layout", cordova.getActivity().getPackageName());
                        }
                    }
                    LayoutInflater inflater = LayoutInflater.from(cordova.getActivity());
                    splashView = inflater.inflate(splashViewId, null);
                    
                    //set the splash screen image
                    //http://stackoverflow.com/questions/7776445/in-android-can-i-use-image-from-assets-in-layout-xml
                    ImageView backgroundImage = (ImageView)splashView.findViewById(cordova.getActivity().getResources().getIdentifier("background", "id", cordova.getActivity().getPackageName()));
                    backgroundImage.setImageBitmap(bm);                    
                    ((ViewGroup)root.getParent()).addView(splashView);
                    splashView.bringToFront();
                    
                    
                    //hack to fix splash screen size when it is smaller than screen            
                    ImageView splashImage = (ImageView)cordova.getActivity().findViewById(cordova.getActivity().getResources().getIdentifier("background", "id", cordova.getActivity().getPackageName()));
                    LayoutParams params = splashImage.getLayoutParams();
                    Rect imgBounds = splashImage.getDrawable().getBounds();
                    int splashHeight = params.height;
                    int splashWidth = params.width;
                    
                    //make copies in case we have to switch for landscape - not sure if needed, this is a last minute hack
                    int deviceWidthCopy, deviceHeightCopy;
                    deviceWidthCopy = deviceWidth;
                    deviceHeightCopy = deviceHeight;
                    if(ai.screenOrientation == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
                        int temp = deviceWidthCopy;
                        deviceWidthCopy = deviceHeightCopy;
                        deviceHeightCopy = temp;
                    }
                    if(splashHeight<deviceHeightCopy || splashWidth<deviceWidthCopy) {
                        float scaleH = (float)deviceHeightCopy/splashHeight;
                        float scaleW = (float)deviceWidthCopy/splashWidth;
                        float scale = Math.max(scaleH, scaleW);
                        params.height *= scale;
                        params.width *= scale;
                        splashImage.setLayoutParams(params);
                    }
                    
                    cordova.getActivity().setProgressBarIndeterminateVisibility(true);   
                             
                } catch (Exception e) {
                    e.printStackTrace();
                }               
            }
        });

    }
 
}