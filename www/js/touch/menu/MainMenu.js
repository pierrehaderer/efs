define(["touch/menu/Window"],
function(Window) {

    function MainMenu() {
        console.log("Create main menu.");
        Window.apply(this, ["mainMenu", "UI/background", 0, 0]);
        this.addElement("UI/createElementButton", "", 10, 10);
        this.addElement("UI/createRoomButton", "", 10, 40);
    }

    // For heritage
    MainMenu.prototype = Object.create(Window.prototype, {});
    
    return MainMenu;

});
