function UserInterfaces() {
    this.menuList = [];
    this.mainMenu;
}

/**
 * Initilize this
 */
UserInterfaces.prototype.initialize = function() {
    this.mainMenu = new UIMenu(undefined, "mainMenu", "UI/background", 0, 0);
    this.menuList.push(this.mainMenu);
    this.mainMenu.addElement("UI/createElementButton", 10, 10);
    this.mainMenu.addElement("UI/createRoomButton", 10, 40);
}

/**
 * Update this
 */
UserInterfaces.prototype.update = function() {
    // Update all menus.
    this.menuList.forEach(function(menu) {
        menu.update();
    });
}

/**
 * Draw this
 */
UserInterfaces.prototype.draw = function() {
    //console.log("drawing interface");
    // Draw all menus.
    this.menuList.forEach(function(menu) {
        menu.draw();
    });
}

/**
 * Add a new menu to the screen
 */
UserInterfaces.prototype.addMenu = function(parent, name, imageName, x, y) {
    this.menuList.push(new UIMenu(parent, name, imageName, x, y));
}

/**
 * Return the element of the menu corresponding to the coordinate
 */
UserInterfaces.prototype.overAMenuElement = function(x, y) {
    for (var i = this.menuList.length - 1; i >= 0; i--) {
        var element = this.menuList[i].overAMenuElement(x, y);
        if (Utils.isDefined(element)) {
            return element;
        }
    }
    return undefined;
}

/**
 * Open the details of the entity
 */
UserInterfaces.prototype.openDetails = function(entity) {
    // TODO
    console.log("Opening details of entity " + entity);
    this.addMenu(this.mainMenu, "entityDetails", "UI/entityDetails", 50, 10));
}