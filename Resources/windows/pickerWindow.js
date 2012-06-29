Ti.include('/util.js');
Ti.include('/data.js');
(function (window) {
  var backdrop, toolbar, close, save, scrollingDescription, description, picker, data;
  window.updateLayout({
    backgroundColor: 'transparent',
    title: 'View Event'
  });
  window.add(backdrop = Ti.UI.createView({
    backgroundColor: Util.theme.darkColor,
    opacity: 0.5,
    zIndex: 0
  }));
  
  (function () {
    var space = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
    
    close = Ti.UI.createButton({
      title: 'Cancel',
      style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    });
    save = Ti.UI.createButton({
      title: 'Select',
      style: Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    
    window.add(toolbar = Ti.UI.iOS.createToolbar({
      items: [close, space, save],
      bottom: 0, barColor: Util.theme.darkColor
    }));
  })();
  
  close.addEventListener('click', function () {
    window.fireEvent('close');
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
    window.fireEvent('close');
  });
  
  window.addEventListener('data', function (event) {
    data = event.data;
    var transform = { transform: Ti.UI.create2DMatrix().scale(0.8), width: 400, bottom: 20 };
    if (!(data.type === 'club')) {
      picker = Ti.UI.createPicker(Util.merge(transform, data||{}));
    } else {
      picker = Ti.UI.createPicker(transform);
      picker.add(data.add);
      	/*Util.foreach(Util.keys(Data.getUserClubs()), function (_, title) {
        return Ti.UI.createPickerRow({ title: title });
      }));*/
      picker.selectionIndicator = true;
    }  
    window.add(picker);
  });
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);

