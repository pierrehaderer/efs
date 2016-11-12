define(["canvas/context", "touch/UserInterfaces", "map/Maps", "map/map1", "img/Images", "touch/DebugInterfaces",
       "touch/Touches", "entity/Entities", "Config"], 
       function (can, userInterfaces, maps, map1, images, debugInterfaces,
                 touches, entities, config) {
    var app;

    function App() {
        this.running = false;
        
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
                maps.initialize("map1", map1);
                entities.initialize();
                touches.initialize();
                userInterfaces.initialize();
                debugInterfaces.initialize();

                // Start the main loop
                console.log("Starting app main loop.");
                setInterval(app.updateThenDraw, config.INTERVAL);
            }
        };

        this.updateThenDraw = function() {
            app.update();
            app.draw();
        };

        this.update = function() {
            maps.update();
            entities.update();
            touches.update();
            userInterfaces.update();
            debugInterfaces.update();
        };

        this.draw = function() {
            can.ctx.clearRect(0, 0, can.ctx.width, can.ctx.height);
            maps.draw();
            entities.draw();
            touches.draw();
            userInterfaces.draw();
            debugInterfaces.draw();
        };
    };

    var app = new App();

    if (!window.cordova) {
        app.onDeviceReady();
    }

});