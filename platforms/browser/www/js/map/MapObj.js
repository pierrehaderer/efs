var global_charEol = "|";
var global_charEntrance = "e";
var global_charFree = "o";
var global_charBlocked = "x";

function MapObj(name, content) {
    console.log("Create map " + name);

    this.name = name;
    this.image = app.images.get(name);
    this.width = this.image.width;
    this.height = this.image.height;
    this.content = [];
    this.entranceList = [];

    var myLine = [];
    var line = 0;
    var column = 0;
    for (var i = 0; i < content.length; i++) {    
        var currentChar = content.charAt(i);
        if (currentChar == global_charEol) {
            this.content.push(myLine);
            myLine = [];
            line++;
            column = 0;
        } else {
            if (currentChar == global_charEntrance) {
                this.entranceList.push(new Tile(column, line));
            }
            myLine.push(currentChar);
            column++;
        }
    }    
}