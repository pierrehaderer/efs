function MainMenu(name, imageName, x, y) {
    this.name = name;
    this.image = app.images.get(imageName);
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = x;
    this.y = y;
    this.elementList = [];
    // Add the first element witch is the background of this menu
    this.addElement(this, imageName, 0, 0);
}

/**
 * Draw this
 */
MainMenu.prototype.draw = function() {    
    // Draw All elements.
    this.elementList.forEach(function(element) {
        element.draw(this.x, this.y);
    });
}

/**
 * Add an element to this menu
 */
MainMenu.prototype.addElement = function(imageName, x, y) {
    this.elementList.push(new UIElement(this, imageName, x, y));
}


/**
 * Return true if the coordinate provided are over the window.
 */
Window.prototype.isOverWindow = function(x, y) {
    return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width);
}

/**
 * Return the element of the window corresponding to the coordinate.
 * Should only be called after verifying the isOverWindow method. 
 */
Window.prototype.getSelectedElement = function(x, y) {
    return _.findReverse(this.elementList, function(element) { return element.isOverElement(x, y); });
}