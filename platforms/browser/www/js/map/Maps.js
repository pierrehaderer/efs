function Maps() {
    
    this.x = 0;
    this.y = 0;
    this.mapList = new Map();
    this.currentMap;
    
    this.initialize = function() {

        // Initialize map pool
        this.mapList.set("map2", new MapObj("map2", map2)); // From map2.js
        this.currentMap = this.mapList.get("map2");

        // Size canvas according to min of map or screen
        canvas.setAttribute("width", Math.min(document.body.clientWidth, this.currentMap.width));
        canvas.setAttribute("height", Math.min(document.body.clientHeight, this.currentMap.height));
        canvas.style.visibility = "visible";
    };
    
    this.update = function() {
    };
    
    this.draw = function() {
        ctx.drawImage(this.mapList.get(this.currentMap).image, this.x, this.y);
    };
        
    /**
     * Update the position of the map after a delta of (x, y).
     */
    this.updatePosition = function(x, y) {
        var newX = this.x + x;
        var canvasWidth = canvas.getAttribute("width");
        var mapWidth = this.currentMap.width;
        if (newX < canvasWidth - mapWidth) {
            this.x = canvasWidth - mapWidth;
        } else if (newX > 0) {
            this.x = 0;
        } else {
            this.x = newX;
        }

        var newY = this.y + y;
        var canvasHeight = canvas.getAttribute("height");
        var mapHeight = this.currentMap.height;
        if (newY < canvasHeight - mapHeight) {
            this.y = canvasHeight - mapHeight;
        } else if (newY > 0) {
            this.y = 0;
        } else {
            this.y = newY;
        }
        //console.log("Map position : (" + this.x + ", "  + this.y + ").");
    };

    /**
     * Obtain a random entrance of the current map.
     */
    this.getEntrance = function() {
        return app.utils.pickRandom(this.currentMap.entranceList);
    };
    
    /**
     *
     */
    this.getAvailableNextTiles = function(tile) {
        var nextTile = this.currentMap.content[tile.x][tile.y-1];
    }
}
