define(["renderer/PixiContext","renderer/SpriteLoader", "map/Maps"], function (context, spriteLoader, maps) {
    'use strict';
    
    function IsometricRenderer() {
        this.map = new PIXI.Container();
        this.map.scale.x = 0.5;
        this.map.scale.y = 0.5;
        var _self = this;
        PIXI.loader.load(function() {
            _self.drawMap();
            _self.render();
        });
    }
    
    IsometricRenderer.prototype.render = function() {
        context.render();
        var _self = this;
        setTimeout(function() {_self.render();}, 1000/60);
    }
    
    IsometricRenderer.prototype.drawMap = function() {
        var i,j;
        for (i=0 ; i < maps.content.length ; i++) {
            for (j=0 ; j < maps.content[i].length ; j++) {
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
    }
    
    IsometricRenderer.prototype.coordinates = function(i, j) {
        return {
            x : i * 32 + (maps.height - j) * 32,
            y : i * 16 + j * 16
        };
    }
    
    return new IsometricRenderer();
});