define(["renderer/PixiContext", "renderer/Sprites", "map/Maps"], function (PixiContext, Sprites, maps) {
    /// recupération des singletons
    var context = PixiContext.instance;
    var sprites = Sprites.instance;

    /**
     *  This object is in charge of displaying the map
     *  - width : width of the complete map in pixel
     *  - height : height of the complete map in pixel
     *  - map the container in which we will draw all the tile sprite
     */
    function MapRenderer() {
        this.map = new PIXI.Container();
        this.width = 0;
        this.height = 0;
        
        /// adding the map to the main container
        context.stage.addChild(this.map);
    }

    /// static tile width and height in pixel
    MapRenderer.TILE_WIDTH = 30;
    MapRenderer.TILE_HEIGHT = 16;

     /**
     *  Main function, draw the map, is called only once now as the map doesn't change
     * We needed to cut the map into pieces, as opengl can only afford a certain size for texture
     * If not cuted, cacheAsBitmap would have failed
     */
    MapRenderer.prototype.drawMap = function () {
        var subMaps = {};
        
        var i, j;
        for (i = 0; i < maps.content.length; i++) {
            for (j = 0; j < maps.content[i].length; j++) {
                var tile = maps.content[i][j];
                var coord = MapRenderer.coordinates(i, j);
                var c = tile.char;
                var sprite;
                if (c == 'o') {
                    sprite = sprites.tile("s1");
                } else if (c == 'e') {
                    sprite = sprites.tile("s15");
                } else {
                    sprite = sprites.tile("s69");
                }

                sprite.x = coord.x;
                sprite.y = coord.y;
                
                var submapCoord = {
                    i : Math.floor(sprite.x/context.maxTextureSize),
                    j : Math.floor(sprite.y/context.maxTextureSize)
                };
                if (!subMaps[submapCoord.i]) {subMaps[submapCoord.i] = {};}
                if (!subMaps[submapCoord.i][submapCoord.j]) {
                    subMaps[submapCoord.i][submapCoord.j] = new PIXI.Container();
                    /// this create a cached map to display faster the complete map
                    subMaps[submapCoord.i][submapCoord.j].cacheAsBitmap = true;
                    this.map.addChild(subMaps[submapCoord.i][submapCoord.j]);
                    subMaps[submapCoord.i][submapCoord.j].x = submapCoord.i * context.maxTextureSize;
                    subMaps[submapCoord.i][submapCoord.j].y = submapCoord.j * context.maxTextureSize;
                }
                
                sprite.x = sprite.x - submapCoord.i * context.maxTextureSize;
                sprite.y = sprite.y - submapCoord.j * context.maxTextureSize;
                
                subMaps[submapCoord.i][submapCoord.j].addChild(sprite);

                this.width = Math.max(this.width, coord.x + MapRenderer.TILE_WIDTH);
                this.height = Math.max(this.height, coord.y + MapRenderer.TILE_HEIGHT);
            }
        }
        
        var entrance = maps.getEntrance();
        var coord = MapRenderer.coordinates(entrance.x, entrance.y);
        context.stage.x = -coord.x + context.width / 2;
        context.stage.y = -coord.y + context.height - 2*MapRenderer.TILE_HEIGHT;

        /// start listening to mouseevents
        this.startListen();
    };

    /**
     * This initialize the listening of mouse event
     * You can drag the map anywhere to change the place you display
     */
    MapRenderer.prototype.startListen = function () {
        /// you can click anywhere, not only on tile sprite
        this.map.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height);
        /// this means the container listen for mouse event
        this.map.interactive = true;

        /// to store the position where you start dragging
        var drag;
        this.map.on("mousedown", function (mouseData) {
            drag = mouseData.data.global.clone();
        });
        this.map.on("touchstart", function (touchData) {
            drag = touchData.data.global.clone();
        });

        /// to stop dragging
        this.map.on("mouseup", function (mouseData) {
            drag = undefined;
        });
        this.map.on("touchend", function (touchData) {
            drag = undefined;
        });

        
        /// to move the displayed area by changin the main stage x and y properties that are the offset
        var move = function (mouseData) {
            if (drag) {
                var newPoint = mouseData.data.global.clone();
                var dx = newPoint.x - drag.x;
                var dy = newPoint.y - drag.y;
                context.stage.x = Math.max(context.renderer.width - this.width * context.stage.scale.x, Math.min(0, context.stage.x + dx));
                context.stage.y = Math.max(context.renderer.height - this.height * context.stage.scale.y, Math.min(0, context.stage.y + dy));
                drag = newPoint;
            }
        };
        this.map.on("mousemove", move);
        this.map.on("touchmove", move);
    };

    /**
     * Fonction to get the x and y pixel coordinate in which to display the tile
     * depending on the i and j of the tile
     */
    MapRenderer.coordinates = function (i, j) {
        return {
            x: (i + (maps.height - j - 1)) * MapRenderer.TILE_WIDTH,
            y: (i + j) * MapRenderer.TILE_HEIGHT
        };
    }

    /// Instanciate singleton
    MapRenderer.instance = new MapRenderer();
    
    /// Draw the map when the sprite are available
    sprites.onSpriteLoaded(function () {
        MapRenderer.instance.drawMap();
    });

    return MapRenderer;
});
