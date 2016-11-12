define(["img/Images", "canvas/context"], function (images, can) {
    function UIElement(menu, imageName, text, x, y) {
        console.log("Create element " + imageName);
        this.menu = menu;
        this.imageName = imageName;
        this.text = text;
        this.image = images.get(imageName);
        this.width = this.image.width;
        this.height = this.image.height;
        // x = position in the menu, this.x = position on the canvas
        this.x = x + this.menu.x;
        // y = position in the menu, this.y = position on the canvas
        this.y = y + this.menu.y;
    }

    UIElement.PADDING = 4;

    /**
     * Draw this
     */
    UIElement.prototype.draw = function() {
        //console.log("drawing button");
        can.ctx.drawImage(this.image, this.x, this.y);
        can.ctx.fillText(this.text, this.x + UIElement.PADDING, this.y + UIElement.PADDING);
    }

    /**
     * Return the element corresponding to the coordinate
     */
    UIElement.prototype.isOverElement = function(x, y) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width;
    }

    UIElement.prototype.toString = function() {
        return "UIElement {name: '" +this.imageName + "'}";
    }
    
    return {
        create : function (menu, imageName, text, x, y) {
            return new UIElement(menu, imageName, text, x, y);
        }
    };
});