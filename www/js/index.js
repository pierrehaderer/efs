var ctx = document.getElementById("ctx").getContext("2d");

var app = {
    position: 0,
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('click', this.onDeviceReady, false);
        document.addEventListener('touchstart', this.updateThenDraw, false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        alert("device is ready");
    },
    
    updateThenDraw: function() {
        app.update();
        app.draw();
    },
    
    update: function() {
        this.position += 1;
    },
        
    draw: function() {
        ctx.fillText('Pierre', this.position, this.position);
    }
};
