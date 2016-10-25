function Images(x, y, name) {
    
    this.imageList = new Map();
    
    this.initialize = function() {
        console.log("Initializing images ...");
        this.imageList.set("map1", this.createImage("img/map1.png"));
        this.imageList.set("map2", this.createImage("img/map2.png"));
    }
    
    this.createImage = function(element) {
        console.log("Initializing image : '" +  element + "'");
        var myImage = new Image();
        myImage.src = element;
        return myImage;
    }
    
    this.get = function(imageName) {
        return this.imageList.get(imageName);
    }
}
