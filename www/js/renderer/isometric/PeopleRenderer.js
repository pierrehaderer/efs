define(["renderer/PixiContext", "renderer/Sprites", "entity/Entities", "map/Maps", "renderer/isometric/MapRenderer"], function (PixiContext, Sprites, entities, maps, MapRenderer) {
    /// recupération des singletons
    var context = PixiContext.instance;
    var sprites = Sprites.instance;
    var mapRenderer = MapRenderer.instance;
    /**
     * This will take care of the rendering of people
     * - container : a PIXI container where we will put all the entities
     * - entities : a map of all currently displayed entities
     */
    function PeopleRenderer() {
        this.container = new PIXI.Container();
        this.entities = {};
        context.stage.addChild(this.container);

        context.toUpdateList.push(this);
    }

    /// People dimension
    PeopleRenderer.HUMAN_WIDTH = 32;
    PeopleRenderer.HUMAN_HEIGHT = 48;

    /// Offset to display well in the tile
    PeopleRenderer.FOOT_X = 32;
    PeopleRenderer.FOOT_Y = 20;

    /**
     * Main loop that will update the display of all entities in the maps
     */
    PeopleRenderer.prototype.update = function () {
        for (var i = 0; i < entities.entityList.length; i++) {
            entity = entities.entityList[i];
            if (!entity._id) {
                /// we give a random id the the entity so we can see if we already display it
                entity._id = Math.random();
            }
            if (!this.entities[entity._id]) {
                var renderedEntity = {
                    tile: entity.tile,
                    name: _.sample(_.values(Sprites.Names)), 
                    action: Sprites.Actions.Stand,
                    direction: Sprites.Direction.FrontLeft
                };
                
                var coord = PeopleRenderer.coordinates(entity.tile);
                renderedEntity.sprite = sprites.people(renderedEntity.name, renderedEntity.action, renderedEntity.direction);
                renderedEntity.sprite.x = coord.x;
                renderedEntity.sprite.y = coord.y;
                this.entities[entity._id] = renderedEntity;
                this.container.addChild(this.entities[entity._id].sprite);
            } else {
                var renderedEntity = this.entities[entity._id];
                if (renderedEntity.tile != entity.tile) {
                    /// it started moving 
                    renderedEntity.action = Sprites.Actions.Walk;
                    /// find direction
                    renderedEntity.direction = 
                        renderedEntity.tile.x < entity.tile.x ? Sprites.Direction.FrontRight :
                        (renderedEntity.tile.y < entity.tile.y ? Sprites.Direction.FrontLeft :
                        (renderedEntity.tile.x > entity.tile.x ? Sprites.Direction.BackLeft :
                        Sprites.Direction.BackRight));
                    /// set the start time end arrival time of the person
                    /// TODO this should be done by the intelligent engine not by the renderer
                    renderedEntity.start = new Date().getTime();
                    renderedEntity.arrival = renderedEntity.start + 1000; // one second later
                    
                    /// Remove the current sprite
                    this.container.removeChild(renderedEntity.sprite);
                    
                    /// find walking sprite and place it
                    renderedEntity.sprite = sprites.people(renderedEntity.name, renderedEntity.action, renderedEntity.direction);
                    var coord = PeopleRenderer.walkCoordinates(renderedEntity.tile, entity.tile, (new Date().getTime() - renderedEntity.start)/parseFloat(renderedEntity.arrival - renderedEntity.start));
                    
                    renderedEntity.fromTile = renderedEntity.tile;
                    renderedEntity.tile = entity.tile;
                    
                    renderedEntity.sprite.x = coord.x;
                    renderedEntity.sprite.y = coord.y;
                    this.container.addChild(this.entities[entity._id].sprite);
                } else if (renderedEntity.action == Sprites.Actions.Walk) {
                    if (new Date().getTime() > renderedEntity.arrival) {
                        // the person arrived
                        renderedEntity.action = Sprites.Actions.Stand;
                        /// Remove the current sprite
                        this.container.removeChild(renderedEntity.sprite);
                        /// it stops
                        var coord = PeopleRenderer.coordinates(entity.tile);
                        renderedEntity.sprite = sprites.people(renderedEntity.name, renderedEntity.action, renderedEntity.direction);
                        renderedEntity.sprite.x = coord.x;
                        renderedEntity.sprite.y = coord.y;
                        this.container.addChild(this.entities[entity._id].sprite);
                    } else {
                        // he is moving
                        var coord = PeopleRenderer.walkCoordinates(renderedEntity.fromTile, renderedEntity.tile, (new Date().getTime() - renderedEntity.start)/parseFloat(renderedEntity.arrival - renderedEntity.start));
                        renderedEntity.sprite.x = coord.x;
                        renderedEntity.sprite.y = coord.y;
                    }
                }
            }
        }
    };


    /**
     * Give the coordinates in which to draw a person sprite given the tile it is on
     */
    PeopleRenderer.coordinates = function (tile) {
        var c = MapRenderer.coordinates(tile.x, tile.y);
        return {
            x: c.x + MapRenderer.TILE_WIDTH / 2 - PeopleRenderer.HUMAN_WIDTH + PeopleRenderer.FOOT_X,
            y: c.y + MapRenderer.TILE_HEIGHT / 2 - PeopleRenderer.HUMAN_HEIGHT + PeopleRenderer.FOOT_Y
        };
    }

    /**
     * Give the coordinates in which to draw the sprite of a walking person 
     * given he is moving from and to and the percentage of completion of the walk
     */
    PeopleRenderer.walkCoordinates = function (from, to, percent) {
        var fromCoord = PeopleRenderer.coordinates(from);
        var toCoord = PeopleRenderer.coordinates(to);
        return {
            x: fromCoord.x * (1-percent) + toCoord.x * percent,
            y: fromCoord.y * (1-percent) + toCoord.y * percent
        };
    }

    // Singleton creation
    PeopleRenderer.instance = new PeopleRenderer();
    sprites.onSpriteLoaded(function () {
        PeopleRenderer.instance.update();
    });
    return PeopleRenderer;
});
