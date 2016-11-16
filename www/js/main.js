require(["App"], function(app) {
    if (!window.cordova) {
        app.onDeviceReady();
    } 
});