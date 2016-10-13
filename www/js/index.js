var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");

var app = {
    position: 0,
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('keydown', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        canvas.style.visibility = "visible";
        canvas.setAttribute("width", document.body.clientWidth);
        canvas.setAttribute("height", document.body.clientHeight);
        ctx.fillText("Started", 2, 12);
        var Entity = require('./entity/entity')
        var firstEntity = new Entity(50, 100, "firstEntity");
        var entityManager = require('./entity/entityManager');
        entityManager.add(firstEntity);
        setInterval(app.updateThenDraw, 40);
    },
    
    updateThenDraw: function() {
        app.update();
        app.draw();
    },
    
    update: function() {
        this.position += 10;
        var entityManager = require('./entity/entityManager');
        entityManager.update();
    },

    draw: function() {
        var text = "Hello";
        ctx.fillText(text, this.position, this.position);
        var entityManager = require('./entity/entityManager');
        entityManager.draw();
    }
};
