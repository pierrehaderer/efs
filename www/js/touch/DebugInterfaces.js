define(["canvas/context", "touch/Touches", "map/Maps", "entity/Entities", "util/Utils"], 
       function(can, touches, maps, entities, utils) {

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
            var canvasWidth = can.canvas.getAttribute("width");
            can.ctx.save();
            can.ctx.fillStyle = 'black';
            can.ctx.fillRect(canvasWidth - 200, 0, 200, 80);
            can.ctx.fillStyle = 'white';
            can.ctx.font = '16px Arial';
            can.ctx.fillText("Map(x,y) = (" + maps.x.toString() + "," + maps.y.toString() + ")", canvasWidth - 195, 15);
            can.ctx.fillText("Mouse(x,y) = (" + touches.mouseX.toString() + "," + touches.mouseY.toString() + ")", canvasWidth - 195, 30);
            if (utils.isDefined(entities.selectedEntity)) {
                can.ctx.fillText("Entity = " + entities.selectedEntity.name + "(" + entities.selectedEntity.x + "," + entities.selectedEntity.y + ")", canvasWidth - 195, 45);

            }
            can.ctx.restore();
        }
    }
    
    return new DebugInterfaces();
});