// get canvas element.
var elem = document.getElementById('myCanvas');

var W = 16;//horizontal tile count
var H = 10; // vertical tile count
var D = 40;//tile pixel width
var D2 = D / 2;

var rand = function (upper) {
    return Math.floor(Math.random() * upper);
};

var isModelFilled = function (model) {
    for (var i = 0; i < W; i++)
        for (var o = 0; o < H; o++) {
            if (!model[i][o].visited)
                return false;
        }
    return true;
};

var walkAway = function (model, origins, point) {    
    model[point.x][point.y].visited = true;
    switch (rand(4)) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
};

var getModel = function () {
    var model = [];
    for (var i = 0; i < W; i++) {
        var array = [];
        for (var o = 0; o < H; o++)
            array.push({ visited: false, source: false, x: i * D, y: o * D, origin: false, l: true, r: true, t: true, d: true });
        model.push(array);
    }
    var ox = rand(W);
    var oy = rand(H);
    model[ox][oy]['origin'] = true;
    model.ox = ox;
    model.oy = oy;

    var origins = [{ x: ox, y: oy }];

    while (!isModelFilled(model)) {
        var start = origins[rand(origins.length)];
        walkAway(model, origins, start);
        return model;
    }

    return model;
};

var drawModel = function (context, model) {

    context.fillStyle = "black";
    for (var i = 0; i < W; i++)
        for (var o = 0; o < H; o++) {
            if (!model[i][o].origin)
                context.fillRect(model[i][o].x, model[i][o].y, D, D);
        }
    context.fillStyle = "orange";

    for (var i = 0; i < W; i++)
        for (var o = 0; o < H; o++) {
            var m = model[i][o];
            if (model.l) {
                context.fillRect(m.x+1, m.y + D2,D2-1,1);
            }
        }
};

// check if context exist
if (elem && elem.getContext) {

    var model = getModel();
    // get context
    var context = elem.getContext('2d');

    // listener, using W3C style for example    
    elem.addEventListener('click', function (e) {
        console.log('click: ' + e.offsetX + '/' + e.offsetY);

    }, false);
    drawModel(context,model);
}