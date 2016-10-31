function Entities() {
    this.entityList = [];
}

Entities.prototype.initialize = function() {
}

Entities.prototype.update = function() {
    // Randomly generate an entity
    if (Math.random() < 0.005 && this.entityList.length < 5) { // Every 8 seconds en moyenne 
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

Entities.prototype.draw = function() {
    this.entityList.forEach(function(entity) {
        entity.draw();
    });
};

Entities.prototype.add = function(entity) {
    //console.log("Adding entity " + entity.name);
    this.entityList.push(entity);
};

Entities.prototype.remove = function(entity) {
    console.log("Removing entity " + entity.name);
    var entityIndex = entityList.indexOf(entity);
    this.entityList.splice(entityIndex, 1);
};
