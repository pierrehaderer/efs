function UserInterfaces() {
    
    this.background;
    this.createElementButton;
    this.createRoomButton;
    
    this.initialize = function() {
        this.background = new UIElement("userInterfaceBackground", 0, 0);
        this.createElementButton = new UIElement("createElementButton", 10, 10);
        this.createRoomButton = new UIElement("createRoomButton", 10, 30);
    }
    
    this.update = function() {
        
    }
    
    this.draw = function() {
        //console.log("drawing interface");
        this.background.draw();
        this.createElementButton.draw();
        this.createRoomButton.draw();
    }
}