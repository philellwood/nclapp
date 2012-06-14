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
					
					properties.setString("ti.ui.defaultunit", "system");
					appProperties.setString("ti.ui.defaultunit", "system");
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
		return "not specified";
	}
	
	public String getUrl() {
		return "not specified";
	}
	
	public String getCopyright() {
		return "not specified";
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
		return "None";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
