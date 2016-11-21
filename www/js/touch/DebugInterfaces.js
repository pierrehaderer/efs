define(["util/Utils"], 
function(Utils) {

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
            var canvasWidth = app.canvas.getAttribute("width");
            app.ctx.save();
            app.ctx.fillStyle = 'black';
            app.ctx.fillRect(canvasWidth - 200, 0, 200, 80);
            app.ctx.fillStyle = 'white';
            app.ctx.font = '16px Arial';
            app.ctx.fillText("Map(x,y) = (" + app.maps.x.toString() + "," + app.maps.y.toString() + ")", canvasWidth - 195, 15);
            app.ctx.fillText("Mouse(x,y) = (" + app.touches.mouseX.toString() + "," + app.touches.mouseY.toString() + ")", canvasWidth - 195, 30);
            if (Utils.isDefined(entities.selectedEntity)) {
                app.ctx.fillText("Entity = " + app.entities.selectedEntity.name + "(" + app.entities.selectedEntity.x + "," + app.entities.selectedEntity.y + ")", canvasWidth - 195, 45);

            }
            app.ctx.restore();
        }
    }
    
    return DebugInterfaces;

});