var global_tileSize = 10;

function Tile(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.nextTiles;
    
    this.setNextTiles = function(nextTiles) {
        this.nextTiles = nextTiles;
    }
    
    this.toString = function() {
        return "Tile : {x: " + this.x.toString() + ", y: " + this.y.toString() + ", char: '" + char + "'}";
    };
}