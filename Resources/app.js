// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

 var url = "https://gateway.ncl.ac.uk/idp/Authn/UserPassword";
 var data = {
 	"j_username" : "a8005833",
 	"j_password": "jhgkhgvmhg",
 	"_eventId": "submit",
 	"lt": "_cB8BEF356-4A66-B43D-6984-5DB016986296_k7B1A2967-9FA6-8E2C-C9E2-2EFE1CA72027"
 };
 var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
         Ti.API.info("Received text: " + this.responseText);
         Ti.API.log("response headers: " + this.allResponseHeaders);
         alert('success');
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 5000  // in milliseconds
 });
 // Prepare the connection.
 client.open("POST", url);
 // Send the request.
 client.send(data); 



//
// create base UI tab and root window
//
var timetableWindow = Titanium.UI.createWindow({  
    title:'Timetable',
    backgroundColor:'#fff'
});
var timetableTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:timetableWindow
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Timetable',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

timetableWindow.add(label1);

//
// create controls tab and root window
//
var printWindow = Titanium.UI.createWindow({  
    title:'Print credits',
    backgroundColor:'#fff'
});
var printTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:printWindow
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Print Credits',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

printWindow.add(label2);



//
//  add tabs
//
tabGroup.addTab(timetableTab);  
tabGroup.addTab(printTab);  


// open tab group
tabGroup.open();
