define(["touch/menu/UIElement"],
function ( UIElement) {

    function Window(name, imageName, x, y) {
        this.name = name;
        this.image = app.images.get(imageName);
        this.width = this.image.width;
        this.height = this.image.height;
        this.x = x;
        this.y = y;
        this.elementList = [];
        // Add the first element witch is the background of this menu
        this.addElement(imageName, "", 0, 0);
    }

    /**
     * Update this
     */
    Window.prototype.update = function () {};

    /**
     * Draw this
     */
    Window.prototype.draw = function () {
        // Draw All elements.
        this.elementList.forEach(function (element) {
            element.draw(this.x, this.y);
        });
    };

    /**
     * Add an element to this menu
     */
    Window.prototype.addElement = function (imageName, text, x, y) {
        this.elementList.push(new UIElement(this, imageName, text, x, y));
    };

    /**
     * Return true if the coordinate provided are over the window.
     */
    Window.prototype.isOverWindow = function (x, y) {
        return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width);
    };

    /**
     * Return the element of the window corresponding to the coordinate.
     * Should only be called after verifying the isOverWindow method. 
     */
    Window.prototype.getSelectedElement = function (x, y) {
        return this.elementList[_.findLastIndex(this.elementList, function (element) {
            return element.isOverElement(x, y);
        })];
    };

    Window.prototype.toString = function () {
        return "Window {name:'" + this.name + "',x:'" + this.x + "',y:'" + this.y + "',width:'" + this.width + "',height:'" + this.height + "'}";
    };

    return Window;

});
