function UserInterfaces() {
    this.windowList = [];
    this.mainMenu;
}

/**
 * Initilize this
 */
UserInterfaces.prototype.initialize = function() {
    this.mainMenu = new MainMenu("mainMenu", "UI/background", 0, 0);
    this.mainMenu.addElement("UI/createElementButton", "", 10, 10);
    this.mainMenu.addElement("UI/createRoomButton", "", 10, 40);
}

/**
 * Update this
 */
UserInterfaces.prototype.update = function() {
    this.mainMenu.update();
    // Update all windows.
    this.windowList.forEach(function(menu) {
        menu.update();
    });
}

/**
 * Draw this
 */
UserInterfaces.prototype.draw = function() {
    this.mainMenu.draw();
    //console.log("drawing interface");
    this.windowList.forEach(function(menu) {
        menu.draw();
    });
}

/**
 * Add a new menu to the screen
 */
UserInterfaces.prototype.addWindow = function(window) {
    this.windowList.push(window);
}

/**
 * Return the window corresponding to the coordinate, undefined if no window was found
 */
UserInterfaces.prototype.getSelectedWindow = function(x, y) {
    if (this.mainMenu.isOverWindow()) {
        console.log("Found main menu " + this.mainMenu);
        return this.mainMenu;
    }
    var windowToReturn = _.findReverse(this.windowList, function(window){ return window.isOverWindow(); });
    console.log("Found window " + windowToReturn);
    return windowToReturn;
}

/**
 * Select the window that was previously clicked
 */
UserInterfaces.prototype.selectWindow = function(window) {
    // Nothing for now
}

/**
 * Open the details of the entity
 */
UserInterfaces.prototype.openEntityDetails = function(entity) {
    if (Utils.isDefined(entity)) {
        this.addWindow(new EntityDetailsWindow(entity));
    }
}

/**
 * Close all the windows but keep the main menu
 */
UserInterfaces.prototype.closeWindowss = function() {
    this.windowList.empty();
}
