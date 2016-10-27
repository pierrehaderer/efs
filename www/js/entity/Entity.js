function Entity(name, tile) {
    console.log("Creation of Entity(" + name + ", " + tile.toString() + ")");
    this.name = name;
    this.tile = tile;

    this.update = function() {
    };

    this.draw = function() {
        //console.log("displaying entity " + this.name + " on " + this.tile.toString() + " => (" + (this.tile.x * global_tileSize).toString() + ", " + (this.tile.y * global_tileSize).toString() + ")");
        ctx.fillText(this.name, this.tile.x * global_tileSize, this.tile.y * global_tileSize);
    };
}
