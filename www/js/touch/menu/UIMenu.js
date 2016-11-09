function UIMenu(parent, name, imageName, x, y) {
    this.parent = parent;
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
 * Update this
 */
UIMenu.prototype.update = function() {
}

/**
 * Draw this
 */
UIMenu.prototype.draw = function() {    
    // Draw All elements.
    this.elementList.forEach(function(element) {
        element.draw(this.x, this.y);
    });
}

/**
 * Add an element to this menu
 */
UIMenu.prototype.addElement = function(imageName, x, y) {
    this.elementList.push(new UIElement(this, imageName, x, y));
}

/**
 * Return the element of the menu corresponding to the coordinate
 */
UIMenu.prototype.overAMenuElement = function(x, y) {
    if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width) {
        return this.elementList[_.findLastIndex(this.elementList, function(element) { return element.isOverElement(x, y); })];
    }
    return undefined;
}