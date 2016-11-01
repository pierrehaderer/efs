function UserInterfaces() {
    this.background;
    this.createElementButton;
    this.createRoomButton;
}

/**
 * Initilize this
 */
UserInterfaces.prototype.initialize = function() {
    this.background = new UIElement("UI/background", 0, 0);
    this.createElementButton = new UIElement("UI/createElementButton", 10, 50);
    this.createRoomButton = new UIElement("UI/createRoomButton", 10, 70);
}

/**
 * Update this
 */
UserInterfaces.prototype.update = function() {

}

/**
 * Draw this
 */
UserInterfaces.prototype.draw = function() {
    //console.log("drawing interface");
    this.background.draw();
    this.createElementButton.draw();
    this.createRoomButton.draw();
}

/**
 * Open the details of the entity
 */
UserInterfaces.prototype.openDetails = function(entity) {
    // TODO
    console.log("Opening details of entity " + entity);
}