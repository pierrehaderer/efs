define(["util/Utils", "map/Tile"],
function (Utils, Tile) {

    function Maps() {
        this.name = "";
        this.image = null;
        this.width = 0;
        this.height = 0;
        this.content = [];
        this.entranceList = [];
        this.x = 0; // Position of the map in the canvas
        this.y = 0; // Position of the map in the canvas
    }

    /**
     * Initilize this
     */
    Maps.prototype.initialize = function (imageName, map) {
        this.loadMap(imageName, map);
    };

    /**
     * Update this
     */
    Maps.prototype.update = function () {};

    /**
     * Draw this
     */
    Maps.prototype.draw = function () {
        app.ctx.drawImage(this.image, this.x, this.y);
    };

    /**
     * Load a map with the given name and given content.
     */
    Maps.prototype.loadMap = function (name, stringContent) {
        // Initialize map
        this.name = name;
        console.log("Create map " + this.name);
        this.image = app.images.get("map/" + this.name);

        // Populate content with tiles according to charContent
        var myLine = [];
        var line = 0;
        var column = 0;
        for (var i = 0; i < stringContent.length; i++) {
            var currentChar = stringContent.charAt(i);
            if (currentChar == Tile.CHAR_EOL) {
                this.width = myLine.length;
                this.content.push(myLine);
                myLine = [];
                line++;
                column = 0;
            } else {
                var tile = new Tile(column, line, currentChar);
                if (currentChar == Tile.CHAR_ENTRANCE) {
                    this.entranceList.push(tile);
                }
                myLine.push(tile);
                column++;
            }
        }
        this.height = this.content.length;
        this.content = Utils.revertMatrix(this.content); // Revert content to use content[x][y] instead of content[y][x].

        // Pre calculate the nextTiles for all Tiles.
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var tile = this.content[x][y];
                //console.log(tile);
                var nextTiles = [];
                if (tile.x > 0 && this.content[tile.x - 1][tile.y].char == Tile.CHAR_FREE) {
                    nextTiles.push(this.content[tile.x - 1][tile.y]);
                }
                if (tile.x < (this.width - 1) && this.content[tile.x + 1][tile.y].char == Tile.CHAR_FREE) {
                    nextTiles.push(this.content[tile.x + 1][tile.y]);
                }
                if (tile.y > 0 && this.content[tile.x][tile.y - 1].char == Tile.CHAR_FREE) {
                    nextTiles.push(this.content[tile.x][tile.y - 1]);
                }
                if (tile.y < (this.height - 1) && this.content[tile.x][tile.y + 1].char == Tile.CHAR_FREE) {
                    nextTiles.push(this.content[tile.x][tile.y + 1]);
                }
                tile.setNextTiles(nextTiles);
            }
        }

        // Size canvas according to min of map or screen
        app.canvas.setAttribute("width", Math.min(document.body.clientWidth, this.image.width));
        app.canvas.setAttribute("height", Math.min(document.body.clientHeight, this.image.height));
        app.canvas.style.visibility = "visible";
    };

    /**
     * Update the position of the map after a delta of (x, y).
     */
    Maps.prototype.updatePosition = function (deltaX, deltaY) {
        var newX = this.x + deltaX;
        var canvasWidth = app.canvas.getAttribute("width");
        var mapWidth = this.image.width;
        if (newX < canvasWidth - mapWidth) {
            this.x = canvasWidth - mapWidth;
        } else if (newX > 0) {
            this.x = 0;
        } else {
            this.x = newX;
        }

        var newY = this.y + deltaY;
        var canvasHeight = app.canvas.getAttribute("height");
        var mapHeight = this.image.height;
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
    Maps.prototype.getEntrance = function () {
        return _.sample(this.entranceList);
    };

    /**
     * Obtain the tile at the given coordinate
     */
    Maps.prototype.getTile = function (x, y) {
        return this.content[Math.floor((x - this.x) / Tile.SIZE)][Math.floor((y - this.y) / Tile.SIZE)];
    };

    return Maps;

});
