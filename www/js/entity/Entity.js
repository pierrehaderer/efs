function Entity(tile, name) {
    console.log("Creation of Entity(" + tile.toString() + ", " + name + ")");
    this.tile = tile;
    this.name = name;

    this.update = function() {
    };

    this.draw = function() {
        ctx.fillText(this.name, this.tile.getX(), this.tile.getY());
    };
}
