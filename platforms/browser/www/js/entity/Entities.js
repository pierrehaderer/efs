function Entities() {
    this.entityList = [];

    this.initialize = function() {
        var firstEntity = new Entity(50, 100, "firstEntity");
        this.add(firstEntity);
    }

    this.update = function() {
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
