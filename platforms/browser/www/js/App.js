function App() {
    this.entities = new Entities();
    this.maps = new Maps();
    this.images = new Images();
    this.touches = new Touches();
    
    // Application Constructor
    this.start = function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('keydown', this.onDeviceReady, false);
    };

    // deviceready Event Handler
    this.onDeviceReady = function() {
        // Initialize managers
        app.images.initialize();
        app.maps.initialize();
        app.entities.initialize();
        app.touches.initialize();
        
        // Start the main loop
        setInterval(app.updateThenDraw, 40);
    };
    
    this.updateThenDraw = function() {
        app.update();
        app.draw();
    };
    
    this.update = function() {
        app.maps.update();
        app.entities.update();
    };

    this.draw = function() {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        app.maps.draw();
        app.entities.draw();
    };
};
