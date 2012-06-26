Ti.include('/util.js');
(function (window) {
  var backdrop, view, scrollingDescription, description, closeWindow;
  window.updateLayout({
    backgroundColor: 'transparent',
    title: 'View Message'
  });
  window.addEventListener('open', function () {
    window.animate(Ti.UI.createAnimation({
      opacity: 1,
      duration: 200,
    }));
  });
  closeWindow = function () {
    var animation = Ti.UI.createAnimation({
      opacity: 0,
      duration: 200,
    });
    animation.addEventListener('complete', function () {
      window.close();
    });
    window.animate(animation);
  };
  
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
  
  view.add(Ti.UI.createLabel({
    text: 'View Message',
    top: 0, left: 0, right: 0, height: 35,
    textAlign: 'center',
    backgroundColor: '#000', color: '#fff',
    font: { fontWeight: 'bold', fontSize: 24 }
  }));
  
  window.addEventListener('data', function (msg) {
    var data = msg.data;
    view.add(Util.createDataView([
      { title: "Subject:", value: data.subject,    labelWidth: 100, height: 30  },
      { title: "Body:",    value: data.body,       labelWidth: 100, height: 100 },
      { title: "Sent:",    value: data.start_time, labelWidth: 100, height: 30  },
    ], {
      left: 10, top: 5, right: 10, height: 275
    }));
    view.add(close = Ti.UI.createButton({
      title: 'Close', top: 10
    }));
    close.addEventListener('click', function () {
      closeWindow();
    });
  });
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);
