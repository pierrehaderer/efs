function Entity(name, type, tile) {
    console.log("Creation of Entity " + name + " on " + tile.toString() + "");
    this.name = name;
    this.type = type;
    this.image = app.images.get(type);
    this.tile = tile;
    this.x = tile.x * Tile.SIZE;
    this.y = tile.y * Tile.SIZE;
}

Entity.prototype.update = function() {
    // Randomly move an entity
    if (Math.random() < 0.04) { // 1 times every 1 seconds en moyenne 
        if (this.tile.nextTiles.length > 0) {
            this.updateTile(_.sample(this.tile.nextTiles));
            //console.log("Entity " + name + " has moved to " + this.tile);
        }
    }
};

Entity.prototype.draw = function() {
    //console.log("displaying entity " + this.name + " on " + this.tile.toString() + " => (" + (this.tile.x * Tile.SIZE).toString() + ", " + (this.tile.y * Tile.SIZE).toString() + ")");
    ctx.drawImage(this.image, this.x + app.maps.currentMap.x, this.y + app.maps.currentMap.y);
};

/**
 * Update the position according to the given coordinate
 */
Entity.prototype.updatePosition = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Update the tile and position according to the given tile
 */
Entity.prototype.updateTile = function(tile) {
    this.tile = tile;
    this.x = tile.x;
    this.y = tile.y;
};
