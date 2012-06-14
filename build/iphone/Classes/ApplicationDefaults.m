/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"WEjJCzHwUcHrTJ46NZ5dUl30xpabNRSg"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"5nvh7Lb6IkNnmD3hSIhbodFOecqAZJoP"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"dHYd1hODmELz40VmQ4amK0Mz0BeJENsr"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
