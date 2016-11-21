define(["util/Utils", "touch/menu/MainMenu", "touch/menu/EntityDetailsWindow"],
function (Utils, MainMenu, EntityDetailsWindow) {

    function UserInterfaces() {
        this.windowList = [];
    }

    /**
     * Initilize this
     */
    UserInterfaces.prototype.initialize = function () {
        this.addWindow(mainMenu);
    }

    /**
     * Update this
     */
    UserInterfaces.prototype.update = function () {
        // Update all windows.
        this.windowList.forEach(function (myWindow) {
            console.log("Update" + myWindow);
            //myWindow.update();
        });
    }

    /**
     * Draw this
     */
    UserInterfaces.prototype.draw = function () {
        //console.log("drawing interface");
        this.windowList.forEach(function (myWindow) {
            myWindow.draw();
        });
    }

    /**
     * Add a new window to the screen
     */
    UserInterfaces.prototype.addWindow = function (myWindow) {
        this.windowList.push(myWindow);
    }

    /**
     * Return the window corresponding to the coordinate, undefined if no window was found
     */
    UserInterfaces.prototype.getSelectedWindow = function (x, y) {
        var windowToReturn = undefined;
        for (var i = this.windowList.length - 1; i >= 0; i--) {
            if (this.windowList[i].isOverWindow()) {
                windowToReturn = this.windowList[i];
            }
        }
        console.log("Found window " + windowToReturn);
        return windowToReturn;
    }

    /**
     * Select the window that was previously clicked
     */
    UserInterfaces.prototype.selectWindow = function (myWindow) {
        // Nothing for now
    }

    /**
     * Open the details of the entity
     */
    UserInterfaces.prototype.openEntityDetails = function (entity) {
        if (utils.isDefined(entity)) {
            this.addWindow(new EntityDetailsWindow(entity));
        }
    }

    /**
     * Execute the action linked to the element provided
     */
    UserInterfaces.prototype.executeAction = function (element) {
        // TODO do more...
        if (utils.isDefined(element)) {
            console.log("Executing action linked to " + element);
        }
    }

    /**
     * Close all the windows but keep the main menu
     */
    UserInterfaces.prototype.closeWindows = function () {
        this.windowList.splice(1, this.windowList.length);
    }

    return UserInterfaces;
});
