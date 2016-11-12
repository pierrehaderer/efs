define([], function() {
    var canvas = document.getElementById("ctx");
    return {
        canvas : canvas,
        ctx : canvas.getContext("2d")
    };
});