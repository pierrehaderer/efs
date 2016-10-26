function Entities() {
    this.entityList = [];

    this.initialize = function() {
    }

    this.update = function() {
        // Randomly generate an entity
        if (Math.random() < 0.01) { // Every 4 seconds en moyenne 
            var entrance = app.maps.getEntrance();
            var myEntity = new Entity(entrance, "firstEntity");
            this.add(myEntity);
        }
        
        // Update all entities.
        this.entityList.forEach(function(entity) {
            entity.update();
        });
    };

    this.draw = function() {
        this.entityList.forEach(function(entity) {
            entity.draw();
        });
    };
    
    this.add = function(entity) {
        console.log("Adding entity " + entity.name);
        this.entityList.push(entity);
    };

    this.remove = function(entity) {
        console.log("Removing entity " + entity.name);
        var entityIndex = entityList.indexOf(entity);
        this.entityList.splice(entityIndex, 1);
    };
}
