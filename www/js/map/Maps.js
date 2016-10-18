function Maps() {
    
    this.x = 0;
    this.y = 0;
    
    this.update = function() {
    };
    
    this.draw = function() {
        ctx.drawImage(app.images.get("map1"), this.x, this.y);
    };
}
