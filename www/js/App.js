define(["touch/UserInterfaces"], function (userInterfaces) {
    var app;
    
    function App() {
        this.running = false;
        this.entities = new Entities();
        this.maps = new Maps();
        this.images = new Images();
        this.touches = new Touches();
        this.debugInterfaces = new DebugInterfaces();

        // Application Constructor
        this.start = function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            document.addEventListener('keydown', this.onDeviceReady, false);
        };

        // deviceready Event Handler
        this.onDeviceReady = function() {
            if (!app.running) {
                app.running = true;
                // Initialize managers
                app.images.initialize();
                app.maps.initialize();
                app.entities.initialize();
                app.touches.initialize();
                userInterfaces.initialize();
                app.debugInterfaces.initialize();

                // Start the main loop
                console.log("Starting app main loop.");
                setInterval(app.updateThenDraw, App.INTERVAL);
            }
        };

        this.updateThenDraw = function() {
            app.update();
            app.draw();
        };

        this.update = function() {
            app.maps.update();
            app.entities.update();
            app.touches.update();
            userInterfaces.update();
            app.debugInterfaces.update();
        };

        this.draw = function() {
            ctx.clearRect(0, 0, ctx.width, ctx.height);
            app.maps.draw();
            app.entities.draw();
            app.touches.draw();
            userInterfaces.draw();
            app.debugInterfaces.draw();
        };
    };

    App.INTERVAL = 40;
    
    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    var app = new App();

    if (!window.cordova) {
        app.onDeviceReady();
    }

});