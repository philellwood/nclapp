package com.philellwood.nclapp;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.kroll.common.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class NclappAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";
	
	public NclappAppInfo(TiApplication app) {
		TiProperties properties = app.getSystemProperties();
		TiProperties appProperties = app.getAppProperties();
					
					properties.setString("acs-api-key-production", "dHYd1hODmELz40VmQ4amK0Mz0BeJENsr");
					appProperties.setString("acs-api-key-production", "dHYd1hODmELz40VmQ4amK0Mz0BeJENsr");
					
					properties.setString("acs-api-key-development", "1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR");
					appProperties.setString("acs-api-key-development", "1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR");
					
					properties.setString("acs-oauth-secret-development", "GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k");
					appProperties.setString("acs-oauth-secret-development", "GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k");
					
					properties.setString("ti.deploytype", "test");
					appProperties.setString("ti.deploytype", "test");
					
					properties.setString("ti.ui.defaultunit", "system");
					appProperties.setString("ti.ui.defaultunit", "system");
					
					properties.setString("acs-oauth-secret-production", "WEjJCzHwUcHrTJ46NZ5dUl30xpabNRSg");
					appProperties.setString("acs-oauth-secret-production", "WEjJCzHwUcHrTJ46NZ5dUl30xpabNRSg");
					
					properties.setString("acs-oauth-key-development", "1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld");
					appProperties.setString("acs-oauth-key-development", "1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld");
					
					properties.setString("acs-oauth-key-production", "5nvh7Lb6IkNnmD3hSIhbodFOecqAZJoP");
					appProperties.setString("acs-oauth-key-production", "5nvh7Lb6IkNnmD3hSIhbodFOecqAZJoP");
	}
	
	public String getId() {
		return "com.philellwood.nclapp";
	}
	
	public String getName() {
		return "NclApp";
	}
	
	public String getVersion() {
		return "1.0";
	}
	
	public String getPublisher() {
		return "phil";
	}
	
	public String getUrl() {
		return "http://philellwood.com";
	}
	
	public String getCopyright() {
		return "2012 by phil";
	}
	
	public String getDescription() {
		return "not specified";
	}
	
	public String getIcon() {
		return "appicon.png";
	}
	
	public boolean isAnalyticsEnabled() {
		return true;
	}
	
	public String getGUID() {
		return "8a019fe1-e090-472c-a955-546746fffbb1";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
