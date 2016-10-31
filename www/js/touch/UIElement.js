function UIElement(name, x, y) {
    this.name = name;
    this.image = app.images.get(name);
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = x;
    this.y = y;
}

UIElement.prototype.draw = function() {
    //console.log("drawing button");
    ctx.drawImage(this.image, this.x, this.y);
}