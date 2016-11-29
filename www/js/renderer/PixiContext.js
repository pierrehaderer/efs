define(["jquery"], function ($) {
    /**
     * This object is there to get the size of the display to make the renderer full screen
     * This object is position fixed full screen and behind everything
     */
    $("<div id='sizer' style='z-index:-10;position:fixed;top:0;bottom:0;left:0;right:0;'><div>").appendTo(document.body);

    /**
     * This object purpose is to initialize 
     * - the main PIXI container "stage" in which we will put all the graphic object
     * - the PIXI renderer that will rendrer the stage
     */
    function PixiContext() {
        this.stage = new PIXI.Container();
        this.renderer = undefined;
        this.stage.scale.x = 1;
        this.stage.scale.y = 1;
        /// list of object that need to update on each frame before the graphic render
        this.toUpdateList = [];
    }

    /**
     * This function will initialize or refresh the PIXI renderer in case of a resize
     * like this the rendrerer will always be full screen
     */    
    PixiContext.prototype.refreshRenderer = function () {
        // remove old renderer
        if (this.renderer) {
            document.body.removeChild(this.renderer.view);
        }
        // get size from sizer
        var width = $("#sizer").outerWidth();
        var height = $("#sizer").outerHeight();
        
        //Create the renderer
        this.renderer = PIXI.autoDetectRenderer(width, height);
        this.renderer.view.id = "pixi-renderer";
        
        //Add the canvas to the HTML document
        document.body.appendChild(this.renderer.view);
        this.renderer.backgroundColor = 0xADD8E6;
    };

    /**
     * This function will laucnh the loop function on all subscribe renderer
     * before launching the graphic render of the stage
     */  
    PixiContext.prototype.render = function () {
        _.forEach(this.toUpdateList, function(toUpdate) {
            toUpdate.update(this.stage);
        });
        this.renderer.render(this.stage);
        var _self = this;
        window.requestAnimationFrame(function () {
            _self.render();
        });
    };

    /// create the singleton
    PixiContext.instance = new PixiContext();
    /// initialize the PIXI renderer
    PixiContext.instance.refreshRenderer();

    /// Listen to resize event
    $(window).resize(function () {
        PixiContext.instance.refreshRenderer();
    });

    /// Listen to resize event
    PIXI.loader.load(function () {
        PixiContext.instance.render();
    });

    return PixiContext;
});
