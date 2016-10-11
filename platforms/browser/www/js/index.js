var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");

var app = {
    position: 0,
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('keydown', this.onDeviceReady, false);
        //document.addEventListener('click', this.updateThenDraw, false);
        //document.addEventListener('touchstart', this.updateThenDraw, false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        canvas.style.visibility = "visible";
        canvas.setAttribute("width", document.body.clientWidth);
        canvas.setAttribute("height", document.body.clientHeight);
        setInterval(app.updateThenDraw, 40)
    },
    
    updateThenDraw: function() {
        app.update();
        app.draw();
    },
    
    update: function() {
        this.position += 10;
    },

    draw: function() {
        var text = document.body.clientWidth.toString() + '-' + document.body.clientHeight.toString();
        ctx.fillText(text, this.position, this.position);
    }
};
