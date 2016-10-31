function Entity(name, type, tile) {
    console.log("Creation of Entity " + name + " on " + tile.toString() + "");
    this.name = name;
    this.type = type;
    this.image = app.images.get(type);
    this.tile = tile;
}

Entity.prototype.update = function() {
    // Randomly move an entity
    if (Math.random() < 0.4) { // 10 times every 1 seconds en moyenne 
        if (this.tile.nextTiles.length > 0) {
            this.tile = _.sample(this.tile.nextTiles);
            //console.log("Entity " + name + " has moved to " + this.tile);
        }
    }
};

Entity.prototype.draw = function() {
    //console.log("displaying entity " + this.name + " on " + this.tile.toString() + " => (" + (this.tile.x * Tile.SIZE).toString() + ", " + (this.tile.y * Tile.SIZE).toString() + ")");
    ctx.drawImage(this.image, this.tile.x * Tile.SIZE + app.maps.currentMap.x, this.tile.y * Tile.SIZE + app.maps.currentMap.y);
};
