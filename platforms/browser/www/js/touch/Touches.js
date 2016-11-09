function Touches() {
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.mouseClicked = false;
    this.tileClicked = undefined;
    this.entityClicked = undefined;
    this.windowClicked = undefined;

    // Player is considered in state "playerIsSelecting" after a time threshold even if he has selected nothing.
    this.playerIsSelecting = false;
    this.timerSelection = 0;

    // Player is considered in state "playerIsSliding" after he has moved his finger above a movement threshold.
    this.playerIsSliding = false;
    this.moveCumulX = 0;
    this.moveCumulY = 0;
    
}

Touches.THRESHOLD_BEFORE_SLIDING = 20;
Touches.THRESHOLD_BEFORE_SELECTING = 300;

/**
 * Initilize this
 */
Touches.prototype.initialize = function() {
    document.addEventListener("mousemove", this.onmousemove);
    document.addEventListener("mousedown", this.onmousedown);
    document.addEventListener("mouseup", this.onmouseup);
};

// To be able to use the keyword "this" in the submethods ...
Touches.prototype.onmousemove = function(event) {app.touches.mousemove(event);}
Touches.prototype.onmousedown = function(event) {app.touches.mousedown(event);}
Touches.prototype.onmouseup   = function(event) {app.touches.mouseup(event);}

/**
 * Update this
 */
Touches.prototype.update = function() {
    if (this.mouseClicked) {
        if (!this.playerIsSliding && !this.playerIsSelecting) {
            this.timerSelection += App.INTERVAL;
            if (this.timerSelection > Touches.THRESHOLD_BEFORE_SELECTING) {
                this.playerIsSelecting = true;
                app.userInterfaces.selectWindow(this.windowClicked);
                app.entities.selectEntity(this.entityClicked);
            }
        }
    }
}

/**
 * Draw this
 */
Touches.prototype.draw = function() {
}

/**
 * Called when mouse moved.
 */
Touches.prototype.mousemove = function(event) {
    // Obtain actual position of the mouse.
    if (event.x != undefined) { // Not Firefox
        var x = event.x;
        var y = event.y;
    } else { // Firefox method to get the position
        var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        var y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    //console.log("Mouse position : (" + x + ", "  + y + ").");

    // Handle movements of the mouse. Use a moveCumul to identify that the player is not simply clicking but sliding his finger.
    if (this.mouseClicked) {
        var deltaX = x - this.mouseX;
        var deltaY = y - this.mouseY;
        if (this.playerIsSliding) {
            this.slide(deltaX, deltaY);
        } else {
            this.updateMoveCumul(deltaX, deltaY);
            if (Math.abs(this.moveCumulX) + Math.abs(this.moveCumulY) > Touches.THRESHOLD_BEFORE_SLIDING) {
                // User has slided his finger above the threshold => he wants to slide.
                this.playerIsSliding = true;
                this.slide(this.moveCumulX, this.moveCumulY);
            }
        } 
    }

    // Always update the mouse known position with the actual position.
    this.mouseX = x;
    this.mouseY = y;
}

/**
 * Called when mouse clicked.
 */
Touches.prototype.mousedown = function(event) {
    console.log("Mouse has been clicked.");
    this.mouseClicked = true;
    this.windowClicked = app.userInterfaces.getSelectedWindow(this.mouseX, this.mouseY);
    if (Utils.isDefined(this.windowClicked)) {
        // The player has clicked on a window, find the element of the window
        this.elementClicked = this.windowClicked.getSelectedElement(this.mouseX, this.mouseY);
    } else {
        // Check for an entity only if the player is not clicking on a window.
        this.tileClicked = app.maps.getTile(this.mouseX, this.mouseY);
        this.entityClicked = app.entities.whoIsOnTile(this.tileClicked);
    }
}

/**
 * Called when mouse released.
 */
Touches.prototype.mouseup = function(event) {
    console.log("Mouse has been released.");

    if (this.playerIsSelecting) {
        if (this.playerIsSliding) {
            console.log("Player has moved the entity selected.");
            app.entities.updateTileOfSelected(app.maps.getTile(this.mouseX, this.mouseY));
        } else {
            console.log("Player has clicked on " + this.windowClicked);
            app.userInterfaces.executeAction(this.elementClicked);
            console.log("Player has clicked on " + this.entityClicked);
            app.userInterfaces.openEntityDetails(this.entityClicked);
        }
    } else {
        // Player has briefly clicked, he wants to select something.
        console.log("Player has briefly clicked on " + this.windowClicked);
        app.userInterfaces.executeAction(this.elementClicked);
        console.log("Player has briefly clicked on " + this.entityClicked);
        app.userInterfaces.openEntityDetails(this.entityClicked);
    }
    
    this.mouseClicked = false;
    this.windowClicked = undefined;
    this.tileClicked = undefined;
    this.elementClicked = undefined;
    this.entityClicked = undefined;
    app.entities.unselectEntity();
    
    this.playerIsSelecting = false;
    this.timerSelection = 0;

    this.playerIsSliding = false;
    this.moveCumulX = 0;
    this.moveCumulY = 0;
}

/**
 * Update the cumul of movements since screen was touched
 */
Touches.prototype.updateMoveCumul = function(deltaX, deltaY) {
    this.moveCumulX += deltaX;
    this.moveCumulY += deltaY;
    //console.log("Move cumul = " + this.moveCumulX.toString() + " " + this.moveCumulY.toString());
}

/**
 * Executed during a slide
 */
Touches.prototype.slide = function(deltaX, deltaY) {
    if (this.playerIsSelecting) {
        // An entity is selected, the player slides to move it
        app.entities.updatePositionOfSelected(deltaX, deltaY);
    } else {
        // Nothing selected, the player slides to move the map.
        app.maps.updatePosition(deltaX, deltaY);
    }
}

