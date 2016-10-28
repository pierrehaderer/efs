var global_charEol = "|";
var global_charEntrance = "e";
var global_charFree = "o";
var global_charBlocked = "x";

function MapObj(name, stringContent) {

    this.name;
    this.image;
    this.width = 0;
    this.height = 0;
    this.content = [];
    this.entranceList = [];
    this.x = 0; // Position of the map in the canvas
    this.y = 0; // Position of the map in the canvas

    /* ################################################################### */
    /*  Constructor                                                        */
    /* ################################################################### */

    console.log("Create map " + name);
    this.name = name;
    this.image = app.images.get(name);

    // Populate content with tiles according to charContent
    var myLine = [];
    var line = 0;
    var column = 0;
    for (var i = 0; i < stringContent.length; i++) {
        var currentChar = stringContent.charAt(i);
        if (currentChar == global_charEol) {
            this.width = myLine.length;
            this.content.push(myLine);
            myLine = [];
            line++;
            column = 0;
        } else {
            var tile = new Tile(column, line, currentChar);
            if (currentChar == global_charEntrance) {
                this.entranceList.push(tile);
            }
            myLine.push(tile);
            column++;
        }
    }
    this.height = this.content.length;
    this.content = app.utils.revertMatrix(this.content); // Revert content to use content[x][y] instead of content[y][x].

    // Pre calculate the nextTiles for all Tiles.
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
            var tile = this.content[x][y];
            //console.log(tile.toString());
            var nextTiles = [];
            if (tile.x > 0 && this.content[tile.x-1][tile.y].char == global_charFree) {
                nextTiles.push(this.content[tile.x-1][tile.y]);
            }
            if (tile.x < (this.width - 1) && this.content[tile.x+1][tile.y].char == global_charFree) {
                nextTiles.push(this.content[tile.x+1][tile.y]);
            }
            if (tile.y > 0 && this.content[tile.x][tile.y-1].char == global_charFree) {
                nextTiles.push(this.content[tile.x][tile.y-1]);
            }
            if (tile.y < (this.height - 1) && this.content[tile.x][tile.y+1].char == global_charFree) {
                nextTiles.push(this.content[tile.x][tile.y+1]);
            }
            tile.setNextTiles(nextTiles);
        }
    }

    /* ################################################################### */
    /*  End of constructor                                                 */
    /* ################################################################### */    
    
    this.draw = function() {
        ctx.drawImage(this.image, this.x, this.y);
    }
    /**
     * Obtain a random entrance of the current map.
     */
    this.getRandomEntrance = function() {
        return app.utils.pickRandom(this.entranceList);
    };

}