function Maps() {
    
    this.x = 0;
    this.y = 0;
    
    this.initialize = function() {
    };
    
    this.update = function() {
    };
    
    this.draw = function() {
        ctx.drawImage(app.images.get("map1"), this.x, this.y);
    };
    
    this.updatePosition = function(x, y) {
        var newX = this.x + x;
        var canvasWidth = canvas.getAttribute("width");
        var mapWidth = app.images.get("map1").width;
        if (newX < canvasWidth - mapWidth) {
            this.x = canvasWidth - mapWidth;
        } else if (newX > 0) {
            this.x = 0;
        } else {
            this.x = newX;
        }

        var newY = this.y + y;
        var canvasHeight = canvas.getAttribute("height");
        var mapHeight = app.images.get("map1").height;
        if (newY < canvasHeight - mapHeight) {
            this.y = canvasHeight - mapHeight;
        } else if (newY > 0) {
            this.y = 0;
        } else {
            this.y = newY;
        }
        //console.log("Map position : (" + this.x + ", "  + this.y + ").");
    }


}
