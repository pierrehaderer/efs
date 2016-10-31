function MapObj(name, stringContent) {
    this.name;
    this.image;
    this.width = 0;
    this.height = 0;
    this.content = [];
    this.entranceList = [];
    this.x = 0; // Position of the map in the canvas
    this.y = 0; // Position of the map in the canvas

    console.log("Create map " + name);
    this.name = name;
    this.image = app.images.get(name);

    // Populate content with tiles according to charContent
    var myLine = [];
    var line = 0;
    var column = 0;
    for (var i = 0; i < stringContent.length; i++) {
        var currentChar = stringContent.charAt(i);
        if (currentChar == MapObj.CHAR_EOL) {
            this.width = myLine.length;
            this.content.push(myLine);
            myLine = [];
            line++;
            column = 0;
        } else {
            var tile = new Tile(column, line, currentChar);
            if (currentChar == MapObj.CHAR_ENTRANCE) {
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
            //console.log(tile.toString());
            var nextTiles = [];
            if (tile.x > 0 && this.content[tile.x-1][tile.y].char == MapObj.CHAR_FREE) {
                nextTiles.push(this.content[tile.x-1][tile.y]);
            }
            if (tile.x < (this.width - 1) && this.content[tile.x+1][tile.y].char == MapObj.CHAR_FREE) {
                nextTiles.push(this.content[tile.x+1][tile.y]);
            }
            if (tile.y > 0 && this.content[tile.x][tile.y-1].char == MapObj.CHAR_FREE) {
                nextTiles.push(this.content[tile.x][tile.y-1]);
            }
            if (tile.y < (this.height - 1) && this.content[tile.x][tile.y+1].char == MapObj.CHAR_FREE) {
                nextTiles.push(this.content[tile.x][tile.y+1]);
            }
            tile.setNextTiles(nextTiles);
        }
    }
}

MapObj.CHAR_EOL = "|";
MapObj.CHAR_ENTRANCE = "e";
MapObj.CHAR_FREE = "o";
MapObj.CHAR_FORBIDDEN = "x";

/**
 * Draw the map
 */
MapObj.prototype.draw = function() {
    ctx.drawImage(this.image, this.x, this.y);
}

/**
 * Obtain a random entrance of the current map.
 */
MapObj.prototype.getRandomEntrance = function() {
    return _.sample(this.entranceList);
};

/**
 * Obtain the tile at the given coordinate
 */
MapObj.prototype.getTile = function(x, y) {
    return this.content[Math.floor(x/Tile.SIZE)][Math.floor(y/Tile.SIZE)];
};
