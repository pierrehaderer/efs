function Touches() {
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.mouseClicked = false;
    this.tileClicked = null;
    this.entityClicked = null;

    // Player is considered in state "playerIsSelecting" after the threshold even if he has selected nothing.
    this.playerIsSelecting = false;
    this.timerSelection = 0;
    this.selection = null;

    // Player is considered in state "playerIsSliding" after he has moved his finger above a threshold.
    this.playerIsSliding = false;
    this.moveCumulX = 0;
    this.moveCumulY = 0;

}

Touches.THRESHOLD_BEFORE_SLIDING = 20;
Touches.THRESHOLD_BEFORE_SELECTING = 500;

Touches.prototype.initialize = function() {
    document.addEventListener("mousemove", this.onmousemove);
    document.addEventListener("mousedown", this.onmousedown);
    document.addEventListener("mouseup", this.onmouseup);
};

// To be able to use the keyword "this" in the submethods ...
Touches.prototype.onmousemove = function(event) {app.touches.mousemove(event);}
Touches.prototype.onmousedown = function(event) {app.touches.mousedown(event);}
Touches.prototype.onmouseup   = function(event) {app.touches.mouseup(event);}

Touches.prototype.update() {
    if (this.mouseClicked) {
        if (!this.playerIsSliding && !this.playerIsSelecting) {
            this.timerSelection += App.INTERVAL;
            if (this.timerSelection > Touches.THRESHOLD_BEFORE_SELECTING) {
                this.playerIsSelecting = true;
                if (this.entityClicked != null) {
                    this.selection = this.entityClicked;
                    app.entities.selectEntity(this.entityClicked, this.tileClicked);
                    this.selection = this.entityClicked;
                }
            }
        }
    }
}

Touches.prototype.draw() {
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
        var moveX = x - this.mouseX;
        var moveY = y - this.mouseY;
        if (this.playerIsSliding) {
            this.slide(moveX, moveY);
        } else {
            this.updateMoveCumul(moveX, moveY);
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
    this.tileClicked = app.maps.getTile(this.mouseX, this.mouseY);
    this.entityClicked = app.entities.whoIsOnTile(this.tileClicked);
}

/**
 * Called when mouse released.
 */
Touches.prototype.mouseup = function(event) {
    console.log("Mouse has been released.");

    if (this.playerIsSelecting) {
        if (this.playerIsSliding) {
            if (this.selection != null) {
                console.log("Player has moved the selection.");
                this.selection.updateTile(app.maps.getTile(this.mouseX, this.mouseY));
            }
        } else {
            console.log("Player has clicked on something.");
            app.userInterfaces.openDetails(this.selection);
        }
    } else {
        // Player has briefly clicked, he wants to select something.
        console.log("Player has briefly clicked on something.");
        app.userInterfaces.openDetails(this.entityClicked);
    }
    
    this.mouseClicked = false;
    this.tileClicked = null;
    this.entityClicked = null;
    
    this.playerIsSelecting = false;
    this.timerSelection = 0;
    this.selection = null;

    this.playerIsSliding = false;
    this.moveCumulX = 0;
    this.moveCumulY = 0;
}

/**
 * Update the cumul of movements since screen was touched
 */
Touches.prototype.updateMoveCumul = function(moveX, moveY) {
    this.moveCumulX += moveX;
    this.moveCumulY += moveY;
    //console.log("Move cumul = " + this.moveCumulX.toString() + " " + this.moveCumulY.toString());
}

/**
 * Executed during a slide
 */
Touches.prototype.slide = function(moveX, moveY) {
    if (this.playerIsSelecting && this.selection != null) {
        // Something selected, the player wants to move something :)
        this.selection.updatePosition(moveX, moveY);
    } else {
        // Nothing selected, the player slide to move the map.
        app.maps.updatePosition(moveX, moveY);
    }
}

