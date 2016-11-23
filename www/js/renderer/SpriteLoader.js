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
        people : function(name, action, direction) {
            return new PIXI.Sprite(PIXI.loader.resources[peopleJson].textures[name]);
        },
        Names : {
            Blue : "Blue",
            Green : "Green",
            Purple : "Purple",
            PurpleBlack : "PurpleBlack",
            Red : "Red",
            WomanPurple : "WomanPurple",
            WomanBrown : "WomanBrown",
            WomanGreen : "WomanGreen",
            WomanLilas : "WomanLilas",
            WomanYellow : "WomanYellow",
            WhiteDoctor : "WhiteDoctor",
            Doctor : "Doctor",
            DoctorWoman : "DoctorWoman",
            DoctorOld : "DoctorOld",
            DoctorWomanBlond : "DoctorWomanBlond",
            DoctorWomanBrown : "DoctorWomanBrown",
            PinkMan : "PinkMan",
            PinkLady : "PinkLady",
            PinkBlackLady : "PinkBlackLady",
            RedDress : "RedDress",
            Buttler : "Buttler",
            YellowDress : "YellowDress",
            HorseDriver : "HorseDriver",
            Smoking : "Smoking",
            SmokingBlue : "SmokingBlue"
        },
        Actions : {
            Stand   : "Stand",
            Walk    : "Walk",
            Sit     : "Sit",
            Lie     : "Lie"
        },
        Direction : {
            FrontLeft : "FrontLeft",
            FrontRight : "FrontRight",
            BackLeft : "BackLeft",
            BackRight : "BackRight"
        }
    };
});