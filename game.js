var GameWidth = 800;
var GameHeight = 600;
var game = new Phaser.Game(GameWidth, GameHeight, Phaser.CANVAS, "phaser-example",
        {preload: preload, create: create, update: update, render: render},
        true, true);

var mousePointerImages = [];
var GameModels = [];
var MouseOut = true;
var PointerRemove;

function preload() {
    game.stage.disableVisibilityChange = true;
    game.time.advancedTiming = true;
    game.scale.maxWidth = GameWidth;
    game.scale.maxHeight = GameHeight;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.load.image("remove", "images/icon_remove.png");
}

function create() {
    game.stage.backgroundColor = "#eeeeee";
    game.canvas.onmouseout = function () {
        MouseOut = true;
        mousePointerImages.forEach(function (item) {
            item.model.exists = false;
        });
        GameModels.forEach(function (model) {
            model.deHighlight();
        });
    };
    game.canvas.onmouseenter = function () {
        MouseOut = false;
    };

    var lineV = game.add.bitmapData(1, 600);
    lineV.ctx.beginPath();
    lineV.ctx.rect(0, 0, 1, 600);
    lineV.ctx.fillStyle = "#00ff00";
    lineV.ctx.fill();
    for (var i = 0; i < 13; i++) {
        game.add.sprite(i * 66, 0, lineV);
    }

    var lineH = game.add.bitmapData(800, 1);
    lineH.ctx.beginPath();
    lineH.ctx.rect(0, 0, 800, 1);
    lineH.ctx.fillStyle = "#00ff00";
    lineH.ctx.fill();
    for (var i = 0; i < 10; i++) {
        game.add.sprite(0, i * 66, lineH);
    }

    for (var rows = 0; rows < 9; rows++) {
        for (var cols = 0; cols < 12; cols++) {
            GameModels.push(new MyGrid(game, null, 1 + cols * 66, 1 + rows * 66));
        }
    }
    GameModels.forEach(function (model) {
        model.showAtTop();
    });
    PointerRemove = game.add.sprite(-100, -100, "remove");
    PointerRemove.scale.setTo(0.5);

    var line1 = game.add.bitmapData(3, 92);
    line1.ctx.beginPath();
    line1.ctx.rect(0, 0, 3, 92);
    line1.ctx.fillStyle = "#ff0000";
    line1.ctx.fill();
    mousePointerImages.push({model: game.add.sprite(-50, -50, line1), xoff: 30, yoff: -30});
    mousePointerImages[0].model.angle = 45;
    mousePointerImages[0].model.exist = false;

    var line2 = game.add.bitmapData(3, 65);
    line2.ctx.beginPath();
    line2.ctx.rect(0, 0, 3, 92);
    line2.ctx.fillStyle = "#ff0000";
    line2.ctx.fill();
    mousePointerImages.push({model: game.add.sprite(-50, -50, line2), xoff: 30, yoff: -20});
    mousePointerImages[1].model.angle = 90;
    mousePointerImages[1].model.exist = false;

    var line3 = game.add.bitmapData(3, 92);
    line3.ctx.beginPath();
    line3.ctx.rect(0, 0, 3, 92);
    line3.ctx.fillStyle = "#ff0000";
    line3.ctx.fill();
    mousePointerImages.push({model: game.add.sprite(-50, -50, line3), xoff: -30, yoff: -30});
    mousePointerImages[2].model.angle = -45;
    mousePointerImages[2].model.exist = false;
}

const lineIndexGroup = [
    [0, 4, 5, 10], //0
    [1, 2, 3, 9], //1
    [6, 7, 8, 11]//2
];

function getLineGroup(lineIndex) {
    for (var i = 0; i < lineIndexGroup.length; i++) {
        for (var j = 0; j < lineIndexGroup[i].length; j++) {
            if (lineIndexGroup[i][j] === lineIndex) {
                return i;
            }
        }
    }
    return -1;
}

function update() {
    GameModels.forEach(function (model) {
        model.update();
    });

    if (!MouseOut && LineToAdd >= 0) {
        var lineGroup = getLineGroup(LineToAdd);
        if (lineGroup >= 0) {
            mousePointerImages.forEach(function (item, index) {
                if (index === lineGroup && !MouseOut) {
                    item.model.x = game.input.mousePointer.x + item.xoff;
                    item.model.y = game.input.mousePointer.y + item.yoff;
                    item.model.exists = true;
                    return;
                }
                item.model.exists = false;
            });
        }
    } else if (!MouseOut && ActionNow === "remove") {
        PointerRemove.x = game.input.mousePointer.x;
        PointerRemove.y = game.input.mousePointer.y;
    }
}

function render() {
    //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}