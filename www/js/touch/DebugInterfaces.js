function DebugInterfaces() {
    this.displayed = true;
}

/**
 * Initilize this
 */
DebugInterfaces.prototype.initialize = function() {
}

/**
 * Update this
 */
DebugInterfaces.prototype.update = function() {
}

/**
 * Draw this
 */
DebugInterfaces.prototype.draw = function() {
    if (this.displayed) {
        var canvasWidth = canvas.getAttribute("width");
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(canvasWidth - 200, 0, 200, 80);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText("Map(x,y) = (" + app.maps.x.toString() + "," + app.maps.y.toString() + ")", canvasWidth - 195, 15);
        ctx.fillText("Mouse(x,y) = (" + app.touches.mouseX.toString() + "," + app.touches.mouseY.toString() + ")", canvasWidth - 195, 30);
        if (Utils.isDefined(app.entities.selectedEntity)) {
            ctx.fillText("Entity = " + app.entities.selectedEntity.name + "(" + app.entities.selectedEntity.x + "," + app.entities.selectedEntity.y + ")", canvasWidth - 195, 45);
            
        }
        ctx.restore();
    }
}
