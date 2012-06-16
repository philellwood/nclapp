Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');

var table, SELECTED, UNSELECTED, selectedClubs;

SELECTED = {
  backgroundColor: '#0f0'
};
UNSELECTED = {
  
};

selectedClubs = Data.getUserClubs();

table = Util.createSimpleDataTable(clubsData, {
  'table': {
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
  },
  'row': {
    process: function (club, object) {
      object.updateLayout(club in selectedClubs ? SELECTED : UNSELECTED);
    }
  }
});

table.addEventListener('click', function (e) {
  Ti.API.log(e);
  Ti.API.log(e.rowData);
  var title = e.rowData.title;
  if (title in selectedClubs){
  	e.rowData.updateLayout(UNSELECTED);
  	Ti.API.log("in selected");
  	Ti.API.log(selectedClubs);
  	Data.unsubscribeToClub(e.rowData.title);
  }else{
  	e.rowData.updateLayout(SELECTED);
  	Data.subscribeToClub(e.rowData.title);
  }
  
  
});
var deleteButton = Ti.UI.createButton({
   title: 'Unsubscribe from all Clubs',
   width: 100,
   height: 50
});
deleteButton.addEventListener('click',function(e)
{
	Data.removeAllClubs();
	Titanium.API.info("Deleted clubs");
});
Ti.UI.currentWindow.add(table);
