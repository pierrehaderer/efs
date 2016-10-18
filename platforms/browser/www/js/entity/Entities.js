function Entities() {
    this.entityList = [];

    this.add = function(entity) {
        console.log("Adding entity " + entity.name);
        this.entityList.push(entity);
    };

    this.remove = function(entity) {
        console.log("Removing entity " + entity.name);
        var entityIndex = entityList.indexOf(entity);
        this.entityList.splice(entityIndex, 1);
    };

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

}
