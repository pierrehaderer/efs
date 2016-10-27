function Entity(name, tile) {
    console.log("Creation of Entity " + name + " on " + tile.toString() + "");
    this.name = name;
    this.tile = tile;

    this.update = function() {
        // Randomly move an entity
        if (Math.random() < 0.04) { // Every 1 seconds en moyenne 
            if (this.tile.nextTiles.length > 0) {
                this.tile = app.utils.pickRandom(this.tile.nextTiles);
                console.log("Entity " + name + " has moved to " + this.tile);
            }
        }
    };

    this.draw = function() {
        //console.log("displaying entity " + this.name + " on " + this.tile.toString() + " => (" + (this.tile.x * global_tileSize).toString() + ", " + (this.tile.y * global_tileSize).toString() + ")");
        ctx.fillText(this.name, this.tile.x * global_tileSize + app.maps.currentMap.x, this.tile.y * global_tileSize + 7 + app.maps.currentMap.y);
    };
}
