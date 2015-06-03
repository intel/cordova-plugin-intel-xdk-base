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

#import "Cordova/CDV.h"
#import <UIKit/UIKit.h>

// "if(1)" turns OFF XDKog logging.
// "if(0)" turns ON XDKog logging.
#define XDKLog if(0); else NSLog


@interface XDKBase : CDVPlugin
{
    UIImageView* _splashScreen;;
}
@end

@implementation XDKBase

- (void) showSplashScreen:(CDVInvokedUrlCommand*)command
{
    if (_splashScreen) return;
    BOOL isIpad = [UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad;
    NSString* imageDir = @"www/intel.xdk.base/ios";
    NSString* imageFileName = isIpad ? @"splash_screen_tablet.jpg" : @"splash_screen.jpg";
    NSString* imagePath = [imageDir stringByAppendingPathComponent:imageFileName];
    UIImage* image = [UIImage imageNamed:imagePath];
    if (image == nil) return;
    _splashScreen = [[UIImageView alloc] initWithImage:image];
    _splashScreen.backgroundColor = [UIColor whiteColor];
    _splashScreen.frame = self.viewController.view.bounds;
    [self.viewController.view addSubview:_splashScreen];
}

- (void) hideSplashScreen:(CDVInvokedUrlCommand*)command
{
    if (!_splashScreen) return;
    [_splashScreen removeFromSuperview];
    _splashScreen = nil;
}

@end