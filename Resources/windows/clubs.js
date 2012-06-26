Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');

var table, SELECTED, UNSELECTED, selectedClubs;

SELECTED = {
  backgroundColor: '#0f0'
};
UNSELECTED = {
  backgroundColor: '#fff'};

selectedClubs = Data.getUserClubs();

table = Util.createSimpleDataTable(clubsData, {
  'table': {
    //style: Ti.UI.iPhone.TableViewStyle.GROUPED
  },
  'row': {
  	
  	height: 40,
    process: function (club, object) {
      object.updateLayout(club in selectedClubs ? SELECTED : UNSELECTED);
    }
  }
});

table.addEventListener('click', function (e) {
  Ti.API.log(e);
  Ti.API.log(e.rowData.title);
  var title = e.rowData.title;
  if (title in Data.getUserClubs()){
  	e.rowData.updateLayout(UNSELECTED);
  	Ti.API.log("in selected");
  	Data.unsubscribeToClub(e.rowData.title);
  	Ti.API.log(Data.getUserClubs());
  }else{
  	e.rowData.updateLayout(SELECTED);
  	Ti.API.log("not in selected");
  	Data.subscribeToClub(e.rowData.title);
  	Ti.API.log(Data.getUserClubs());
  }
  
  
});

Ti.UI.currentWindow.add(table);
