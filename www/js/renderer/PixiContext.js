define(["jquery"], function ($) {
    // this object is there to get the size of the display
    $("<div id='sizer' style='z-index:-10;position:fixed;top:0;bottom:0;left:0;right:0;'><div>").appendTo(document.body);

    function PixiContext() {
        //Create a container object called the `stage`
        this.stage = new PIXI.Container();
        this.renderer = undefined;
        this.context = undefined;
        this.stage.scale.x = 0.5;
        this.stage.scale.y = 0.5;
    }

    PixiContext.prototype.refreshRenderer = function () {
        // remove old renderer
        if (this.renderer) {
            document.body.removeChild(this.renderer.view);
        }
        //Create the renderer
        this.renderer = PIXI.autoDetectRenderer($("#sizer").outerWidth(), $("#sizer").outerHeight());

        this.renderer.view.id = "pixi-renderer";
        //Add the canvas to the HTML document
        document.body.appendChild(this.renderer.view);
        this.renderer.backgroundColor = 0xADD8E6;
    };

    PixiContext.prototype.render = function () {
        if (!this.renderer) {
            this.refreshRenderer();
        }
        this.renderer.render(this.stage);
        var _self = this;
        window.requestAnimationFrame(function () {
            _self.render();
        });
    };

    var pixiContext = new PixiContext();
    pixiContext.refreshRenderer();

    $(window).resize(function () {
        pixiContext.refreshRenderer();
    });

    PIXI.loader.load(function () {
        pixiContext.render();
    });

    return pixiContext;
});
