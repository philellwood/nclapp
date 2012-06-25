var Events = {};
/*
 *  <property name="acs-oauth-secret-development" type="string">GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k</property>
 *  <property name="acs-oauth-key-development" type="string">1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld</property>
 *  <property name="acs-api-key-development" type="string">1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR</property>
 */
var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');
Events.create = function(_data){
    
  _data.custom_fields = '{'+_data.club+' : '+_data.club+'}';
  sdk.sendRequest('events/create.json', 'POST', _data, function(){
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createEvent') {
      	  Ti.API.log(data.response);
        }
      }
    }
  });
  
};

Events.queryClub = function(_club,_callback){
  var whereString = JSON.stringify({_club: _club});
  var data = {
    where: whereString
  };
  sdk.sendRequest('events/query.json', 'GET', data, function(){
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryEvents') {
          var events = data.response.events;
          Ti.API.log(events);
          _callback(events);
        }
      }
    }  	
  });	
  
};

Events.deleteEvent = function(_id){
  var data = {event_id : _id};
  sdk.sendRequest('events/delete.json', 'DELETE', data, function(){
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createEvent') {
      	  Ti.API.log(data.response);
        }
      }
    }
  });	
}

