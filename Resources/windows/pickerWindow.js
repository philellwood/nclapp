Ti.include('/util.js');
(function (window) {
  var backdrop, view, close, save, scrollingDescription, description, picker;
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
    window.fireEvent('save', {
      data: picker.value
    });
  });
  
  window.addEventListener('data', function (event) {
    var data = event.data;
    view.add(picker = Ti.UI.createPicker({
  	  type: data.type,
  	  minDate: data.minDate,
  	  value: data.value
    }));
  });
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);

