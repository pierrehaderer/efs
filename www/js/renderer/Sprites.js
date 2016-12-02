define([], function () {
    /**
     * This object will load all sprite and give convenient method to instantiate the sprite
     */ 
    function Sprites() {
        var i;
        //load tile spritesheet, all sprites are descibed in people.json
        this.tilesJson = "img/map/tileset/tileset.json";
        PIXI.loader.add(this.tilesJson);
        
        //load perso spritesheet, all sprites are descibed in people.json
        this.peopleJson = "img/entity/people.json";
        PIXI.loader.add(this.peopleJson);
    }

    /**
     * this will register a callback when all the sprites are loaded
     */ 
    Sprites.prototype.onSpriteLoaded = function (callback) {
        PIXI.loader.load(callback);
    };
    /**
     * this will instanciate a tile sprite based on its name ("s1" for a sprite of s1.png)
     */ 
    Sprites.prototype.tile = function (name) {
        return new PIXI.Sprite(PIXI.loader.resources[this.tilesJson].textures[name]);
    };
    /**
     * this will create a person with 
     * - the name: name of the person (Green, RedDress, DoctorWoman...)
     * - the action he is doing Stand, Walk, Sit or Lie
     * - the direction in which the action is done FrontLeft, FrontRight, BackLeft ot BackRight
     * - the speed (default 0.2) is in second per frame. A cycle of walking is 8 frame so by default a cycle is 1.6 s
     */ 
    Sprites.prototype.people = function (name, action, direction, speed) {
        if (action == "Walk") {
            var frames = [];

            for (var i = 0; i < 8; i++) {
                frames.push(PIXI.Texture.fromFrame(name + action + direction + "_" + i));
            }

            // create a MovieClip
            var sprite = new PIXI.extras.AnimatedSprite(frames);

            /*
             * A MovieClip inherits all the properties of a PIXI sprite
             * so you can change its position, its anchor, mask it, etc
             */
            if (speed) {
                sprite.animationSpeed = speed;
            } else {
                sprite.animationSpeed = 0.2;
            }
            sprite.play();
            return sprite;
        }
        return new PIXI.Sprite(PIXI.loader.resources[this.peopleJson].textures[name + action + direction]);
    };
    
    /// Instanciate the singleton
    Sprites.instance = new Sprites();
    
    /// Name enum
    Sprites.Names = {
        Blue: "Blue",
        Green: "Green",
        Purple: "Purple",
        PurpleBlack: "PurpleBlack",
        Red: "Red",
        WomanPurple: "WomanPurple",
        WomanBrown: "WomanBrown",
        WomanGreen: "WomanGreen",
        WomanLilas: "WomanLilas",
        WomanYellow: "WomanYellow",
        WhiteDoctor: "WhiteDoctor",
        Doctor: "Doctor",
        DoctorWoman: "DoctorWoman",
        DoctorOld: "DoctorOld",
        DoctorWomanBlond: "DoctorWomanBlond",
        DoctorWomanBrown: "DoctorWomanBrown",
        PinkMan: "PinkMan",
        PinkLady: "PinkLady",
        PinkBlackLady: "PinkBlackLady",
        RedDress: "RedDress",
        Buttler: "Buttler",
        YellowDress: "YellowDress",
        HorseDriver: "HorseDriver",
        Smoking: "Smoking",
        SmokingBlue: "SmokingBlue"
    };
    /// Action enum
    Sprites.Actions = {
        Stand: "Stand",
        Walk: "Walk",
        Sit: "Sit",
        Lie: "Lie"
    };
    /// Direction enum
    Sprites.Direction = {
        FrontLeft: "FrontLeft",
        FrontRight: "FrontRight",
        BackLeft: "BackLeft",
        BackRight: "BackRight"
    };
    return Sprites;
});
