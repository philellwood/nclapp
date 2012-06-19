var Events = {};
/*
 *  <property name="acs-oauth-secret-development" type="string">GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k</property>
 *  <property name="acs-oauth-key-development" type="string">1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld</property>
 *  <property name="acs-api-key-development" type="string">1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR</property>
 */
var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');
Events.create = function(_data){
    
  _data.custom_fields = {club : _data.club};
  sdk.sendRequest('events/create.json', 'POST', _data, callback);
  
  function callback(data) {
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createEvent') {
      	  Ti.API.log(data.response);
          var events = data.response.events;
        }
      }
    }
  }
	
};

Events.queryClub = function(_club){
  var whereString = JSON.stringify({club : _club});
  var data = {
    where: whereString
  };
  sdk.sendRequest('events/query.json', 'GET', data, callback);	
};

Events.deleteEvent = function(_id){
  var data = {event_id : _id};
  sdk.sendRequest('events/delete.json', 'DELETE', data, callback);	
}

