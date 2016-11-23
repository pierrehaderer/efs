define(["renderer/PixiContext", "renderer/SpriteLoader", "map/Maps"], function (context, spriteLoader, maps) {

    function IsometricRenderer() {
        this.map = new PIXI.Container();
        context.stage.addChild(this.map);
    }

    IsometricRenderer.prototype.drawMap = function () {
        var i, j;
        for (i = 0; i < maps.content.length; i++) {
            for (j = 0; j < maps.content[i].length; j++) {
                var tile = maps.content[i][j];
                var coord = this.coordinates(i, j);
                var c = tile.char;
                var sprite;
                if (c == 'o') {
                    sprite = spriteLoader.sprite("s1");
                } else {
                    sprite = spriteLoader.sprite("s69");
                }

                sprite.x = coord.x;
                sprite.y = coord.y;
                this.map.addChild(sprite);
            }
        }
        context.stage.addChild(this.map);

        var man = spriteLoader.people(spriteLoader.Names.Green, spriteLoader.Actions.Stand, spriteLoader.Direction.FrontLeft);
        var coord = this.coordinates(0, 50);
        man.x = coord.x;
        man.y = coord.y;
        man.scale.x = 4;
        man.scale.y = 4;
        context.stage.addChild(man);
        man = spriteLoader.people(spriteLoader.Names.Green, spriteLoader.Actions.Walk, spriteLoader.Direction.FrontLeft);
        var coord = this.coordinates(0, 60);
        man.x = coord.x;
        man.y = coord.y;
        man.scale.x = 4;
        man.scale.y = 4;
        context.stage.addChild(man);
    }

    IsometricRenderer.prototype.coordinates = function (i, j) {
        return {
            x: i * 32 + (maps.height - j) * 32,
            y: i * 16 + j * 16
        };
    }

    var renderer = new IsometricRenderer();
    spriteLoader.onSpriteLoaded(function () {
        renderer.drawMap();
    });
    return renderer;
});
