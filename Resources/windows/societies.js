Ti.include('/util.js');

var table = createClubTable();
table.addEventListener('click',function(e){
	e.rowData.backgroundColor = '#00FF00';
});
Ti.UI.currentWindow.add(table);
