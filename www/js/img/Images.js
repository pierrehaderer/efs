define([], function () {

    function Images(x, y, name) {
        this.imageList = {};
    }

    /**
     * Initilize this
     */
    Images.prototype.initialize = function() {
        console.log("Initializing images ...");
        this.default = this.createImage("img/default.bmp");

        // Maps
        this.imageList["map/map1"] = this.createImage("img/map/map1.png");

        // User interface
        this.imageList["UI/background"] = this.createImage("img/UI/background.png");

        // Entities
        this.imageList["entity/donor"] = this.createImage("img/entity/person/donor.png");
        this.imageList["entity/selected_donor"] = this.createImage("img/entity/person/selected_donor.png");
    }

    /**
     * Create an image with the givent path.
     */
    Images.prototype.createImage = function(path) {
        console.log("Initializing image : '" +  path + "'");
        var myImage = new Image();
        myImage.src = path;
        return myImage;
    }

    /**
     * Get the image with the given name.
     */
    Images.prototype.get = function(imageName) {
        if (this.imageList[imageName] != undefined) {
            return this.imageList[imageName];
        } else {
            console.log("WARN | image '" + imageName + "' not found.");
            return this.default;
        }
    }
    
    var images = new Images();
    images.initialize();
    return images;
});