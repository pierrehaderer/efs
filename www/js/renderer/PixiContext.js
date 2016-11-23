define([],function () {
    //Create the renderer
    var renderer = new PIXI.CanvasRenderer(4000,4000);

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();
    renderer.backgroundColor = 0xADD8E6;

    return {
        renderer : renderer,
        stage    : stage,
        render : function() {
            renderer.render(stage);
        }
    }
});