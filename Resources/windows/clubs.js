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
  e.rowData.updateLayout(SELECTED);
  Data.subscribeToClub(e.rowData.title);
});

Ti.UI.currentWindow.add(table);
