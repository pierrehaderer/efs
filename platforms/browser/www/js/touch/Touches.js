function Touches() {
    
    this.touchList = [];
    this.mouseClicked = false;
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.initialize = function() {
        document.addEventListener("mousemove", this.onmousemove);
        document.addEventListener("mousedown", this.onmousedown);
        document.addEventListener("mouseup", this.onmouseup);
    };
    
    this.onmousemove = function(event) {
        if (event.x != undefined) { // Not Firefox
            var x = event.x;
            var y = event.y;
        } else { // Firefox method to get the position
            var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            var y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        if (app.touches.mouseClicked) {
            app.maps.updatePosition(x - app.touches.mouseX, y - app.touches.mouseY);
        }

        app.touches.mouseX = x;
        app.touches.mouseY = y;
        //console.log("Mouse position : (" + app.touches.mouseX + ", "  + app.touches.mouseY + ").");
    }

    this.onmousedown = function(event) {
        app.touches.mouseClicked = true; 
        console.log("Mouse has been clicked." + app.touches.mouseClicked);
    }

    this.onmouseup = function(event) {
        app.touches.mouseClicked = false; 
        console.log("Mouse has been released." + app.touches.mouseClicked);
    }

}
