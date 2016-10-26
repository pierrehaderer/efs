var caracEol = "\n";
var caracEntrance = "e";
var caracFree = "o";
var caracBlocked = "x";

function Maps() {
    
    this.x = 0;
    this.y = 0;
    this.mapList = new Map();
    this.currentMap = "";
    
    this.initialize = function() {
        this.mapList.add("map2", new MapObj("map2", map2)); // From map2.js
        this.currentMap = "map2";
    };
    
    this.update = function() {
    };
    
    this.draw = function() {
        ctx.drawImage(this.mapList(this.currentMap).image, this.x, this.y);
    };
    
    this.updatePosition = function(x, y) {
        var newX = this.x + x;
        var canvasWidth = canvas.getAttribute("width");
        var mapWidth = this.mapList(this.currentMap).width;
        if (newX < canvasWidth - mapWidth) {
            this.x = canvasWidth - mapWidth;
        } else if (newX > 0) {
            this.x = 0;
        } else {
            this.x = newX;
        }

        var newY = this.y + y;
        var canvasHeight = canvas.getAttribute("height");
        var mapHeight = this.mapList(this.currentMap).height;
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
