function UIElement(menu, name, x, y) {
    this.menu = menu;
    this.name = name;
    this.image = app.images.get(name);
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = x + this.menu.x;
    this.y = y + this.menu.y;
}

/**
 * Draw this
 */
UIElement.prototype.draw = function() {
    //console.log("drawing button");
    ctx.drawImage(this.image, this.x, this.y);
}

/**
 * Return the element corresponding to the coordinate
 */
UIElement.prototype.isOverElement = function(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width;
