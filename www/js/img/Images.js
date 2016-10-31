function Images(x, y, name) {
    this.imageList = new Map();
}

Images.prototype.initialize = function() {
    console.log("Initializing images ...");
    this.default = this.createImage("img/default.bmp");
    this.imageList.set("map1", this.createImage("img/map1.png"));
    this.imageList.set("map2", this.createImage("img/map2.png"));
    this.imageList.set("userInterfaceBackground", this.createImage("img/userInterface/background.bmp"));
}

Images.prototype.createImage = function(element) {
    console.log("Initializing image : '" +  element + "'");
    var myImage = new Image();
    myImage.src = element;
    return myImage;
}

Images.prototype.get = function(imageName) {
    if (this.imageList.has(imageName)) {
        return this.imageList.get(imageName);
    } else {
        console.log("WARN | image '" + imageName + "' not found.");
        return this.default;
    }
}