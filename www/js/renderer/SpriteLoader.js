define([], function () {
    // load map tile
    var i;
    for (i = 1; i <= 80; i++) {
        PIXI.loader.add("s"+i, "img/map/tileset/s"+i+".png");
    }
    
    //load perso
    var peopleJson = "img/entity/people.json";
    PIXI.loader.add(peopleJson);
    
    return {
        sprite : function(name) {
            return new PIXI.Sprite(PIXI.loader.resources[name].texture);
        },
        people : function(name) {
            return new PIXI.Sprite(PIXI.loader.resources[peopleJson].textures[name]);
        }
    };
});