define(["touch/menu/Window"],
function (Window) {

    function BuildRoomWindow() {
        console.log("Opening menu to build room.");
        Window.apply(this, ["build_room_background", "UI/menu/build_room/background", 50, 10]);
        this.addElement("room_selector", "UI/menu/build_room/room_selector_background", 10, 10);
        this.addElement("rest_room", "UI/menu/build_room/rest_room", 15, 15);
        this.addElement("blood_room", "UI/menu/build_room/blood_room", 15, 45);
        this.addElement("descrentityDetailsWindowFactoryiption_background", "UI/menu/build_room/description_background", 60, 10);
    }

    // For heritage
    BuildRoomWindow.prototype = Object.create(Window.prototype, {});
    
    return BuildRoomWindow;

});