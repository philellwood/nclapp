Ti.include('/util.js');
Ti.include('/data.js');
(function (window) {
  var backdrop, view, close, save, scrollingDescription, description, picker, data;
  window.updateLayout({
    backgroundColor: 'transparent',
    title: 'View Event'
  });
  window.addEventListener('save', function () {
    window.close();
  });
  window.add(backdrop = Ti.UI.createView({
    backgroundColor: '#def',
    opacity: 0.8,
    zIndex: 0
  }));
  
  window.add(view = Ti.UI.createView({
    top: 43, right: 0, bottom: 50, left: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    layout: 'vertical'
  }));
  
  
  window.add(close = Ti.UI.createButton({
    title: 'Cancel', left: 10, bottom: 60, zIndex: 2
  }));
  window.add(save = Ti.UI.createButton({
    title: 'Save', right: 10, bottom: 60, zIndex: 2
  }));
  
  close.addEventListener('click', function () {
    window.close();
  });
  save.addEventListener('click', function () {
  	var saveData;
  	if(!(data.type==='club')){
  		saveData = {
  			data: picker.value
  		};
  	}else{
  		saveData = {
  			data: picker.getSelectedRow(0).getTitle()
  		};
  	}
    window.fireEvent('save', saveData);
  });
  
  window.addEventListener('data', function (event) {
    data = event.data;
    if(!(data.type==='club')){
    	view.add(picker = Ti.UI.createPicker(data));
    }else{
    	picker = Ti.UI.createPicker();
        picker.add(Util.foreach(Util.keys(Data.getUserClubs()), function (_, title) {
  	      return Ti.UI.createPickerRow({ title: title });
        }));
        picker.selectionIndicator = true;
        view.add(picker);
    }
    
  });
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);

