function Entities() {
    this.entityList = [];
    this.selectedEntity = undefined;
}

/**
 * Initilize this
 */
Entities.prototype.initialize = function() {
}

/**
 * Update this
 */
Entities.prototype.update = function() {
    // Randomly generate an entity
    if (Math.random() < 0.01 && this.entityList.length < 10) { // Every 4 seconds en moyenne 
        var name = "entity" + this.entityList.length.toString();
        var entrance = app.maps.getEntrance();
        var myEntity = new Entity(name, "donor", entrance);
        this.add(myEntity);
    }

    // Update all entities.
    this.entityList.forEach(function(entity) {
        entity.update();
    });
};

/**
 * Draw this
 */
Entities.prototype.draw = function() {
    this.entityList.forEach(function(entity) {
        entity.draw();
    });
};

/**
 * Add an entity to the list
 */
Entities.prototype.add = function(entity) {
    //console.log("Adding entity " + entity.name);
    this.entityList.push(entity);
};

/**
 * Remove an entity from the list
 */
Entities.prototype.remove = function(entity) {
    console.log("Removing entity " + entity.name);
    var entityIndex = entityList.indexOf(entity);
    this.entityList.splice(entityIndex, 1);
};

/**
 * Find an entity on the given tile
 */
Entities.prototype.whoIsOnTile = function(tile) {
    var entityToReturn = _.find(this.entityList, function(entity){ return entity.tile == tile; });
    console.log("Found entity " + entityToReturn);
    return entityToReturn;
};

/**
 * Select the given entity
 */
Entities.prototype.selectEntity = function(selectedEntity) {
    console.log("Select entity " + selectedEntity);
    if (Utils.isDefined(selectedEntity)) {
        this.selectedEntity = selectedEntity;
        this.selectedEntity.select();
    }
};

/**
 * Unselect the selected entity
 */
Entities.prototype.unselectEntity = function() {
    console.log("Unselect entity " + this.selectedEntity);
    if (Utils.isDefined(this.selectedEntity)) {
        this.selectedEntity.unselect();
        this.selectedEntity = undefined;
    }
};

/**
 * Update the position of the selected entity
 */
Entities.prototype.updatePositionOfSelected = function(x, y) {
    if (Utils.isDefined(this.selectedEntity)) {
        this.selectedEntity.updatePosition(x, y);
    }
};

/**
 * Update the tile of the selected entity
 */
Entities.prototype.updateTileOfSelected = function(tile) {
    if (Utils.isDefined(this.selectedEntity)) {
        console.log("Moving entity " + this.selectedEntity + " to tile " + tile);
        this.selectedEntity.updateTile(tile);
    }
};
