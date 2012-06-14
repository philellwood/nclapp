Ti.include('clubs.js');

function createClubTable(){
	var tableData = [];
    for (var i = 0; i<clubs.length; i++){
    	tableData.push({title : clubs[i]});
    }
	var table = Ti.UI.createTableView({
 		 data: tableData
	});
	return table;
}
