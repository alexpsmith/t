
drawing = {
    canvasElement: null,
    canvasContext: null,
    canvasRectangle: null,

    drawingSpeed: 100/6,
    drawingFuntions: [],
    drawingIndex: 0,
    
    updateSpeed: 100 / 6,
    updateFunctions: [],
    updateIndex: 0,

    alphaChar: "abcdefghijklmnopqrstuvwxyz",
    keys: [],

    bind: function (id) {
        drawing.SetUpKeys();
        drawing.TrackKeys();
        try
        {
            drawing.canvasElement = document.getElementById(id);
            drawing.canvasContext = drawing.canvasElement.getContext("2d");
        }
        catch(e)
        {

            console.log("FATAL: Unable to bind drawing to canvas element");
            console.log("Error: ")
            console.log(e);
            console.log("Id: " + id);
            console.log("Element: ");
            console.log(drawing.canvasElement);
            console.log("Context: ");
            console.log(drawing.canvasContext);
            return false;
        }
        drawing.canvasRectangle = new Rectangle(0, 0, drawing.canvasElement.width, drawing.canvasElement.height);
        drawing.canvasElement.addEventListener('mousemove', function (evt) {
            var mousePos = getMousePos(drawing.canvasElement, evt);
            drawing.mouse.x = mousePos.x;
            drawing.mouse.y = mousePos.y;
        }, false);
        drawing.canvasElement.addEventListener('mousedown', function (evt) {
            drawing.mouse.down = true;
        }, false);
        drawing.canvasElement.addEventListener('mouseup', function (evt) {
            drawing.mouse.down = false;
        }, false);
        
    },
    bindDraw: function (draw) {
        drawing.drawingFuntions[drawing.drawingIndex++] = draw;
    },
    bindUpdate: function (update){
        drawing.updateFunctions[drawing.updateIndex++] = update;
    },
    draw: function () {
        if (drawing.drawingFuntions.length == 0) {
            console.log("WARNING: No draw functions have been bound [37:gg.js]");
        }
        setInterval(function () {
            drawing.canvasContext.clearRect(drawing.canvasRectangle.x, drawing.canvasRectangle.y, drawing.canvasRectangle.width, drawing.canvasRectangle.height);
            for (var i = 0; i < drawing.drawingFuntions.length; i++) {
                drawing.drawingFuntions[i]();
            }
        }, drawing.drawingSpeed);
    },
    update: function () {
        if (drawing.updateFunctions.length == 0) {
            console.log("WARNING: No update functions have been bound [37:gg.js]");
        }
        setInterval(function () {
            for (var i = 0; i < drawing.updateFunctions.length; i++) {
                drawing.updateFunctions[i]();
            }
        }, drawing.updateSpeed);
    },

    mouse: {
        x: 0,
        y: 0,
        down: false
    },

    LoadImage: function(src){
        image = new Image();
        image.src = src;
        return image;
    },

    DrawSampleCircle: function (x, y, radius) {
        var c = drawing.canvasContext;
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2);
        c.fill();
    },
    DrawImage: function (image, x, y){
        var c = drawing.canvasContext;
        c.drawImage(image, x, y);
    },
    ExactDraw: function (image, x, y, rotation, alpha, rArg) {
        var rotArg = 2
        if (rArg){
            rotArg = rArg;
        }
        if (!alpha && !rotaion) {
            console.log("NO DRAW, USE DRAWIMAGE INSTEAD");
            return false;
        }
        var c = drawing.canvasContext;
        if (!rotation) {
            var rest = c.globalAlpha;
            c.globalAlpha = alpha;
            drawing.DrawImage(image, x, y);
            c.globalAlpha = rest;
            return {};
        }
        if (!alpha) {
            c.save();
            c.translate(x, y);
            c.rotate(rotation * 0.0174532925);
            c.drawImage(image, -(image.width / 2), -(image.height / 2)); 
            c.restore();
            return {};
        }

        c.globalAlpha = alpha;
        c.save();
        c.translate(x, y); 
        c.rotate(rotation); 
        c.drawImage(image, -(image.width / rotArg), -(image.height / 2));
        c.restore();
        c.globalAlpha = 1.0;
    },
    TrackKeys: function(){
        document.onkeydown = function(e){
            drawing.keys[drawing.alphaChar[e.keyCode - 65]] = {
                up: false,
                down: true
            }
        }
        document.onkeyup = function(e){
                        drawing.keys[drawing.alphaChar[e.keyCode - 65]] = {
                up: true,
                down: false
            }
        }
    },
    SetUpKeys: function(){
        for (var i = 0; i < 26; i++){
            drawing.keys[drawing.alphaChar[i]] = {
                up: true,
                down: false
            }
        }
    }


}
function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.Intersects = function (a, b) {
        if (a.x < (b.x + b.width) && (a.x + a.width) > b.x && a.y < (b.y + b.height) && (a.y + a.height) > b.y) {
            return true;
        }
        else return false;
    }
}
function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
drawing.bind("canvas");
