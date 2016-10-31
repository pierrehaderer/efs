function Maps() {
    this.mapList = new Map();
    this.currentMap;
}

Maps.prototype.initialize = function() {
    // Initialize map pool
    this.mapList.set("map2", new MapObj("map2", map2)); // From map2.js
    this.currentMap = this.mapList.get("map2");

    // Size canvas according to min of map or screen
    canvas.setAttribute("width", Math.min(document.body.clientWidth, this.currentMap.image.width));
    canvas.setAttribute("height", Math.min(document.body.clientHeight, this.currentMap.image.height));
    canvas.style.visibility = "visible";
};

Maps.prototype.update = function() {
};

Maps.prototype.draw = function() {
    this.currentMap.draw();
};

/**
 * Update the position of the map after a delta of (x, y).
 */
Maps.prototype.updatePosition = function(x, y) {
    var newX = this.currentMap.x + x;
    var canvasWidth = canvas.getAttribute("width");
    var mapWidth = this.currentMap.image.width;
    if (newX < canvasWidth - mapWidth) {
        this.currentMap.x = canvasWidth - mapWidth;
    } else if (newX > 0) {
        this.currentMap.x = 0;
    } else {
        this.currentMap.x = newX;
    }

    var newY = this.currentMap.y + y;
    var canvasHeight = canvas.getAttribute("height");
    var mapHeight = this.currentMap.image.height;
    if (newY < canvasHeight - mapHeight) {
        this.currentMap.y = canvasHeight - mapHeight;
    } else if (newY > 0) {
        this.currentMap.y = 0;
    } else {
        this.currentMap.y = newY;
    }
    //console.log("Map position : (" + this.currentMap.x + ", "  + this.currentMap.y + ").");
};

/**
 * Obtain an entrance of the current map.
 */
Maps.prototype.getEntrance = function() {
    return this.currentMap.getRandomEntrance();
};

/**
 * Obtain the tile at the given coordinate
 */
Maps.prototype.getTile = function(x, y) {
    return this.currentMap.getTile(x, y);
};
