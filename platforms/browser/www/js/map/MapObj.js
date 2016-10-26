function MapObj(name, content) {
    console.log("Create map " + name);

    this.image = app.images.get(name);
    this.width = this.image.width;
    this.height = this.image.height;
    this.content = [];
    this.entranceList = [];

    var myLine = [];
    var line = 0;
    var column = 0;
    for (var i = 1; i < content.size; i++) {    
        if (content.get(i) == this.caracEol) {
            this.content.push(myLine);
            myLine = [];
            line++;
            column = 0;
        } else {
            if (content.get(i) == this.caracEntrance) {
                this.entranceList.push(new Tile(line, column));
            }
            myLine.push(content.get(i));
            column++;
        }
    }    
}