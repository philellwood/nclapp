Ti.include('/util.js');
<<<<<<< HEAD

var table = createClubTable();
table.addEventListener('click',function(e){
	e.rowData.backgroundColor = '#00FF00';
});
Ti.UI.currentWindow.add(table);
=======
Ti.include('/clubs.js');

Ti.UI.currentWindow.add(Util.createSimpleDataTable(clubs));
>>>>>>> cd001ced34b80d07a8a419ea076f903fced495cd
