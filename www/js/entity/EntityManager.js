var entityList = [];


exports.add = function(entity) {
    console.log("Adding entity " + entity.name);
    entityList.push(entity);
};

exports.remove = function(entity) {
    console.log("Removing entity " + entity.name);
    var entityIndex = entityList.indexOf(entity);
    entityList.splice(entityIndex, 1);
};
    
exports.update = function() {
    entityList.forEach(function(entity) {
        entity.update();
    });
};
    
exports.draw = function() {
    entityList.forEach(function(entity) {
        entity.draw();
    });
};
