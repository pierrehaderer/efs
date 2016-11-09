function MainMenu(entity) {
    console.log("Creating main menu.");
    this.base = Window;
    this.base = new Window("mainMenu", "UI/background", 0, 0);
    this.mainMenu.addElement("UI/createElementButton", "", 10, 10);
    this.mainMenu.addElement("UI/createRoomButton", "", 10, 40);
}

MainMenu.prototype = Window;