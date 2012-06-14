Ti.include('/util.js');
Ti.include('/clubs.js');


Ti.UI.currentWindow.add(Util.createSimpleDataTable(clubs));

var table;

table = Util.createSimpleDataTable(clubs, {
  'table': { },
  'row': { }
});

table.addEventListener('click', function (e) {
  e.rowData.backgroundColor = '#0f0';
  Util.subscribeToClub(e.rowData.title);
});

Ti.UI.currentWindow.add(table);

