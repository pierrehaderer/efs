function App() {
    this.positionForTest = 0;
    this.entities = new Entities();
    this.maps = new Maps();
    this.images = new Images();
    
    // Application Constructor
    this.start = function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('keydown', this.onDeviceReady, false);
    };

    // deviceready Event Handler
    this.onDeviceReady = function() {
        canvas.setAttribute("width", document.body.clientWidth);
        canvas.setAttribute("height", document.body.clientHeight);
        canvas.style.visibility = "visible";
        app.images.initialize();
        ctx.fillText("Started", 2, 12);
        var firstEntity = new Entity(50, 100, "firstEntity");
        app.entities.add(firstEntity);
        setInterval(app.updateThenDraw, 40);
    };
    
    this.updateThenDraw = function() {
        app.update();
        app.draw();
    };
    
    this.update = function() {
        app.maps.update();
        this.positionForTest += 10;
        app.entities.update();
    };

    this.draw = function() {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        app.maps.draw();
        var text = "Text to test";
        ctx.fillText(text, this.positionForTest, this.positionForTest);
        app.entities.draw();
    };
};
