DISCONTINUATION OF PROJECT.

This project will no longer be maintained by Intel.

Intel has ceased development and contributions including, but not limited to, maintenance, bug fixes, new releases, or updates, to this project. 

Intel no longer accepts patches to this project.

If you have an ongoing need to use this project, are interested in independently developing it, or would like to maintain patches for the open source software community, please create your own fork of this project. 
DISCONTINUATION OF PROJECT.  This project will no longer be maintained by Intel.  Intel will not provide or guarantee development of or support for this project, including but not limited to, maintenance, bug fixes, new releases or updates.  Patches to this project are no longer accepted by Intel.  In an effort to support the developer community, Intel has made this project available under the terms of the Apache License, Version 2. If you have an ongoing need to use this project, are interested in independently developing it, or would like to maintain patches for the community, please create your own fork of the project.

intel.xdk.base
====================

Provides compatibility with features and elements of the legacy Intel XDK container that do not fit into other Intel XDK API plugins including built-in splashscreen, xhr.js, intelxdk.js, the intel.xdk.device.ready event and some global properties.

_This Intel XDK Cordova plugin and API has been deprecated. See below for recommendations.

Description
-----------

1. Splash Screen - this feature was built into the legacy container and was always present.  In order to customize the images, replace www/intel.xdk.base/android/splash_screen.jpg and www/intel.xdk.base/android/splash_screen_tablet.jpg with your custom splash screen.  Recommendation: use the standard Cordova [splash screen](https://github.com/apache/cordova-plugin-splashscreen) plugin instead.

3. xhr.js - formerly a partial replacement for XMLHttpRequest, now a placeholder to prevent errors in applications that include this script tag.  Recommendation: remove the xhr.js script tag.

4. intelxdk.js - formerly the legacy container's main javascript file, now simply loads cordova.js if it is missing.  Recommendation: replace the intelxdk.js script tag with a cordova.js script tag.

5. intel.xdk.device.ready event - this was the legacy container's version of deviceready.  This plugin fires this event in order to provide backwards compatibility.  Recommendation: use Cordova's deviceready event instead.

6. intel.xdk.* properties - static placeholders provided to prevent errors in apps that are dependent on them (mostly applies to apps based on legacy container versions of demos and templates).  Recommendation: remove any dependencies on these properties and use equivalents provided by Cordova instead. 

### Methods

-   [hideSplashScreen](#hidesplashscreen) — hides the splash screen.
-   [showSplashScreen](#showsplashscreen) — shows the splash screen.

Methods
-------

### hideSplashScreen


```javascript
intel.xdk.device.hideSplashScreen();
```

#### Description


The built-in splash screen provided by this plugin is shown automatically when the app is started.  This method should be called from the deviceready listener to hide the splash screen.  Otherwise, the splash screen will be automatically hidden after 3 seconds.

#### Platforms

-   Apple iOS
-   Google Android

#### Example

```javascript
// hide the splash screen        
intel.xdk.device.hideSplashScreen();                     
```

### showSplashScreen


```javascript
intel.xdk.device.showSplashScreen();
```

#### Description


The built-in splash screen is shown automatically at app start.  This method can be used to display it at times other than app start.

#### Platforms

-   Apple iOS
-   Google Android
-   Windows 8
-   Windows Phone 8

#### Example

```javascript
// show the splash screen        
intel.xdk.device.showSplashScreen();                     
```
