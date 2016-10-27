var global_tileSize = 10;

function Tile(x, y) {
    this.x = x;
    this.y = y;
    
    this.toString = function() {
        return "Tile : {x: " + this.x.toString() + ", y: " + this.y.toString() + "}";
    };
}