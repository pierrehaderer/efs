define(["renderer/PixiContext", "renderer/SpriteLoader", "map/Maps"], function (context, spriteLoader, maps) {

    function MapRenderer() {
        this.map = new PIXI.Container();
        this.width = 0;
        this.height = 0;
        context.stage.addChild(this.map);

        this.TILE_WIDTH = 30;
        this.TILE_HEIGHT = 16;
    }

    MapRenderer.prototype.drawMap = function () {
        var i, j;
        for (i = 0; i < maps.content.length; i++) {
            for (j = 0; j < maps.content[i].length; j++) {
                var tile = maps.content[i][j];
                var coord = this.coordinates(i, j);
                var c = tile.char;
                var sprite;
                if (c == 'o') {
                    sprite = spriteLoader.sprite("s1");
                } else if (c == 'e') {
                    sprite = spriteLoader.sprite("s15");
                } else {
                    sprite = spriteLoader.sprite("s69");
                }

                sprite.x = coord.x;
                sprite.y = coord.y;
                this.map.addChild(sprite);

                this.width = Math.max(this.width, coord.x + this.TILE_WIDTH);
                this.height = Math.max(this.height, coord.y + this.TILE_HEIGHT);
            }
        }
        this.map.cacheAsBitmap = true;
        this.startListen();
    };

    MapRenderer.prototype.startListen = function () {
        this.map.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height);
        this.map.interactive = true;
        var drag;
        this.map.on("mousedown", function (mouseData) {
            drag = mouseData.data.global.clone();
        });

        this.map.on("mouseup", function (mouseData) {
            drag = undefined;
        });

        this.map.on("mousemove", function (mouseData) {
            if (drag) {
                var newPoint = mouseData.data.global.clone();
                var dx = newPoint.x - drag.x;
                var dy = newPoint.y - drag.y;
                context.stage.x = Math.max(context.renderer.width - this.width * context.stage.scale.x, Math.min(0, context.stage.x + dx));
                context.stage.y = Math.max(context.renderer.height - this.height * context.stage.scale.y, Math.min(0, context.stage.y + dy));
                drag = newPoint;
            }
        });
    };

    MapRenderer.prototype.coordinates = function (i, j) {
        return {
            x: (i + (maps.height - j - 1)) * this.TILE_WIDTH,
            y: (i + j) * this.TILE_HEIGHT
        };
    }

    var renderer = new MapRenderer();
    spriteLoader.onSpriteLoaded(function () {
        renderer.drawMap();
    });

    return renderer;
});
