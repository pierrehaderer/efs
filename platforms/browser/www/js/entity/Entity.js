function Entity(x, y, name) {
    console.log("Creation of Entity(" + x + ", " + y + ", " + name + ")");
    this.x = x;
    this.y = y;
    this.name = name;

    this.update = function() {
        this.x++;
        this.y--;
    };

    this.draw = function() {
        ctx.fillText(this.name, this.x, this.y)
    };
}
