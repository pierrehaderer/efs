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
     */
    MapRenderer.prototype.drawMap = function () {
        var i, j;
        for (i = 0; i < maps.content.length; i++) {
            for (j = 0; j < maps.content[i].length; j++) {
                var tile = maps.content[i][j];
                var coord = MapRenderer.coordinates(i, j);
                var c = tile.char;
                var sprite;
                if (c == 'o') {
                    sprite = sprites.sprite("s1");
                } else if (c == 'e') {
                    sprite = sprites.sprite("s15");
                } else {
                    sprite = sprites.sprite("s69");
                }

                sprite.x = coord.x;
                sprite.y = coord.y;
                this.map.addChild(sprite);

                this.width = Math.max(this.width, coord.x + MapRenderer.TILE_WIDTH);
                this.height = Math.max(this.height, coord.y + MapRenderer.TILE_HEIGHT);
            }
        }
        /// this create a cached map to display faster the complete map
        this.map.cacheAsBitmap = true;
        
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

        /// to stop dragging
        this.map.on("mouseup", function (mouseData) {
            drag = undefined;
        });

        /// to move the displayed area by changin the main stage x and y properties that are the offset
        this.map.on("mousemove", function (mouseData) {
            if (drag) {
                var newPoint = mouseData.data.global.clone();
                var dx = newPoint.x - drag.x;
                var dy = newPoint.y - drag.y;
                context.stage.x = Math.max(context.renderer.width - this.width * context.stage.scale.x, Math.min(0, context.stage.x + dx));
                context.stage.y = Math.max(context.renderer.height - this.height * context.stage.scale.y, Math.min(0, context.stage.y + dy));
                context.stage.y = Math.max(context.renderer.height - this.height * context.stage.scale.y, Math.min(0, context.stage.y + dy));
                drag = newPoint;
            }
        });
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
