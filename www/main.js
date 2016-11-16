require(["app"], function(app) {
    if (!window.cordova) {
        app.onDeviceReady();
    } 
});