function Entity(name, type, tile) {
    console.log("Creation of Entity " + name + " on tile:" + tile);
    this.name = name;
    this.description = "TODO";
    this.type = type;
    this.image = app.images.get("entity/" + type);
    this.selectedImage = app.images.get("entity/selected_" + type);
    this.portrait = "TODO";
    this.competences = "TODO";
    this.tile = tile;
    this.selected = false;
    this.x = tile.x * Tile.SIZE;
    this.y = tile.y * Tile.SIZE;
}

/**
 * Update this
 */
Entity.prototype.update = function() {
    // Randomly move an entity
    if (!this.selected) {
        if (Math.random() < 0.01) { // 1 times every 1 seconds en moyenne 
            if (this.tile.nextTiles.length > 0) {
                this.updateTile(_.sample(this.tile.nextTiles));
                //console.log("Entity " + name + " has moved to " + this.tile);
            }
        }
    }
};

/**
 * Draw this
 */
Entity.prototype.draw = function() {
    //console.log("displaying entity " + this.name + " on " + this.tile + " => (" + (this.tile.x * Tile.SIZE).toString() + ", " + (this.tile.y * Tile.SIZE).toString() + ")");
    ctx.drawImage((this.selected ? this.selectedImage : this.image), this.x + app.maps.x, this.y + app.maps.y);
};

/**
 * Update the position according to the given coordinate
 */
Entity.prototype.updatePosition = function(deltaX, deltaY) {
    this.x += deltaX;
    this.y += deltaY;
};

/**
 * Update the tile and position according to the given tile
 */
Entity.prototype.updateTile = function(tile) {
    if (tile.isFree()) {
        this.tile = tile;
        this.x = tile.x * Tile.SIZE;
        this.y = tile.y * Tile.SIZE;
    } else {
        console.log("This tile is not free. Placing entity back to tile " + this.tile);
        this.x = tile.x * Tile.SIZE;
        this.y = tile.y * Tile.SIZE;
    }
};

Entity.prototype.select = function() {
    this.selected = true;
}

Entity.prototype.unselect = function() {
    this.selected = false;
}

Entity.prototype.toString = function() {
    return "Entity {name:'" + this.name + "',type:'" + this.type + "',tile:" + this.tile + "}";
};
