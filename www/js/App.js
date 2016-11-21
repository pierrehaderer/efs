define(["touch/UserInterfaces", "map/Maps", "map/Map1", "img/Images", "touch/DebugInterfaces", "touch/Touches", "entity/Entities", "Config"], 
function (UserInterfaces, Maps, Map1, Images, DebugInterfaces, Touches, Entities, Config) {

    function App() {
        this.running = false;
        this.canvas = document.getElementById("ctx");
        this.ctx = canvas.getContext("2d");
        this.entities = new Entities();
        this.maps = new Maps();
        this.map1 = new Map1();
        this.images = new Images();
        this.touches = new Touches();
        this.userInterfaces = new UserInterfaces();
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
                app.maps.initialize("map1", this.map1.content);
                app.entities.initialize();
                app.touches.initialize();
                app.userInterfaces.initialize();
                app.debugInterfaces.initialize();

                // Start the main loop
                console.log("Starting app main loop.");
                setInterval(app.updateThenDraw, Config.INTERVAL);
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
            app.userInterfaces.update();
            app.debugInterfaces.update();
        };

        this.draw = function() {
            app.ctx.clearRect(0, 0, app.ctx.width, app.ctx.height);
            app.maps.draw();
            app.entities.draw();
            app.touches.draw();
            app.userInterfaces.draw();
            app.debugInterfaces.draw();
        };
    };

    return App;
});