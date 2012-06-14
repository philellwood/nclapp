Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/club_data.js');

var table;

table = Util.createSimpleDataTable(clubData, {
  'table': {
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
  },
  'row': { }
});

table.addEventListener('click', function (e) {
  e.rowData.backgroundColor = '#0f0';
  Data.subscribeToClub(e.rowData.title);
});

Ti.UI.currentWindow.add(table);
