function Tile(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.nextTiles;
}

Tile.SIZE = 10;

Tile.prototype.setNextTiles = function(nextTiles) {
    this.nextTiles = nextTiles;
};

Tile.prototype.toString = function() {
    return "Tile : {x: " + this.x.toString() + ", y: " + this.y.toString() + ", char: '" + this.char + "'}";
};