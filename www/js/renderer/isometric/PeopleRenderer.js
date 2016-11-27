define(["renderer/PixiContext", "renderer/SpriteLoader", "entity/Entities", "map/Maps", "renderer/isometric/MapRenderer"], function (context, spriteLoader, entities, maps, mapRenderer) {
    function PeopleRenderer() {
        this.container = new PIXI.Container();
        this.entities = {};
        context.stage.addChild(this.container);

        var _self = this;
        entities.modificationListeners.push(function () {
            _self.loop();
        });
    }

    PeopleRenderer.HUMAN_WIDTH = 32;
    PeopleRenderer.HUMAN_HEIGHT = 48;

    PeopleRenderer.FOOT_X = 32;
    PeopleRenderer.FOOT_Y = 20;

    PeopleRenderer.prototype.loop = function () {
        for (var i = 0; i < entities.entityList.length; i++) {
            entity = entities.entityList[i];
            if (!entity._id) {
                entity._id = Math.random()
            }
            if (!this.entities[entity._id]) {
                var sprite = spriteLoader.people("Green", spriteLoader.Actions.Stand, spriteLoader.Direction.FrontLeft);
                var renderedEntity = {
                    tile: entity.tile,
                    coord: this.coordinates(entity.tile.x, entity.tile.y),
                    sprite: sprite
                };
                sprite.x = renderedEntity.coord.x;
                sprite.y = renderedEntity.coord.y;
                this.entities[entity._id] = renderedEntity;
                this.container.addChild(this.entities[entity._id].sprite);
            } else {

            }
        }
    };


    PeopleRenderer.prototype.coordinates = function (i, j) {
        var c = mapRenderer.coordinates(i, j);
        return {
            x: c.x + mapRenderer.TILE_WIDTH / 2 - PeopleRenderer.HUMAN_WIDTH + PeopleRenderer.FOOT_X,
            y: c.y + mapRenderer.TILE_HEIGHT / 2 - PeopleRenderer.HUMAN_HEIGHT + PeopleRenderer.FOOT_Y
        };
    }

    var renderer = new PeopleRenderer();
    spriteLoader.onSpriteLoaded(function () {
        renderer.loop();
    });
    return renderer;
});
