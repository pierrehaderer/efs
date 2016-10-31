function Touches() {
    this.touchList = [];
    this.mouseClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.moveCumulX = 0;
    this.moveCumulY = 0;
    this.playerIsSliding = false;
}

Touches.THRESHOLD_BEFORE_SLIDING = 20;

Touches.prototype.initialize = function() {
    document.addEventListener("mousemove", this.onmousemove);
    document.addEventListener("mousedown", this.onmousedown);
    document.addEventListener("mouseup", this.onmouseup);
};

Touches.prototype.onmousemove = function(event) {
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
    if (app.touches.mouseClicked) {
        var moveX = x - app.touches.mouseX;
        var moveY = y - app.touches.mouseY;
        if (app.touches.playerIsSliding) {
            app.touches.slide(moveX, moveY);
        } else {
            app.touches.updateMoveCumul(moveX, moveY);
            if (Math.abs(app.touches.moveCumulX) + Math.abs(app.touches.moveCumulY) > Touches.THRESHOLD_BEFORE_SLIDING) {
                // User has slided his finger above the threshold => he wants to slide.
                app.touches.playerIsSliding = true;
                app.touches.slide(app.touches.moveCumulX, app.touches.moveCumulY);
            }
        } 
    }

    // Always update the mouse known position with the actual position.
    app.touches.mouseX = x;
    app.touches.mouseY = y;
}

Touches.prototype.onmousedown = function(event) {
    console.log("Mouse has been clicked.");
    app.touches.mouseClicked = true; 
}

Touches.prototype.onmouseup = function(event) {
    console.log("Mouse has been released.");
    app.touches.mouseClicked = false; 
    if (!app.touches.playerIsSliding) {
        // Player is trying to select something.
        //TODO
    } else {
        // Player has stopped sliding.
        app.touches.playerIsSliding = false;
    }
    app.touches.moveCumulX = 0;
    app.touches.moveCumulY = 0;
}

/**
 * Update the cumul of movements since screen was touched
 */
Touches.prototype.updateMoveCumul = function(moveX, moveY) {
    app.touches.moveCumulX += moveX;
    app.touches.moveCumulY += moveY;
    //console.log("Move cumul = " + app.touches.moveCumulX.toString() + " " + app.touches.moveCumulY.toString());
}

/**
 * Executed during a slide
 */
Touches.prototype.slide = function(moveX, moveY) {
    app.maps.updatePosition(moveX, moveY);
}

