function MyGrid(game, gm, x, y) {
    var gridImage = game.add.bitmapData(65, 65);
    gridImage.ctx.beginPath();
    gridImage.ctx.rect(0, 0, 65, 65);
    gridImage.ctx.fillStyle = "#68b3c2";
    gridImage.ctx.fill();

    var gridHighlightImage = game.add.bitmapData(65, 65);
    gridHighlightImage.ctx.beginPath();
    gridHighlightImage.ctx.rect(0, 0, 65, 65);
    gridHighlightImage.ctx.fillStyle = "#82e0f3";
    gridHighlightImage.ctx.fill();

    var grid = game.add.sprite(x, y, gridImage);
    grid.inputEnabled = true;

    var cornerImage = game.add.bitmapData(10, 10);
    cornerImage.ctx.beginPath();
    cornerImage.ctx.arc(5, 5, 5, 0, 2 * Math.PI, false);
    cornerImage.ctx.fillStyle = "#ff0000";
    cornerImage.ctx.fill();

    var lineImage = game.add.bitmapData(3, 94);
    lineImage.ctx.beginPath();
    lineImage.ctx.rect(0, 0, 3, 94);
    lineImage.ctx.fillStyle = "#ff0000";
    lineImage.ctx.fill();
    var leftSewLineAll = game.add.sprite(x + 65, y - 1, lineImage);
    leftSewLineAll.addChild(game.make.sprite(-3.5, -5, cornerImage));
    leftSewLineAll.addChild(game.make.sprite(-3.5, 88, cornerImage));
    leftSewLineAll.angle = 45;
    leftSewLineAll.exists = false;
    var leftSewLine = game.add.sprite(x + 65, y - 1, lineImage);
    leftSewLine.angle = 45;
    leftSewLine.exists = false;
    var leftSewLineTop = game.add.sprite(x + 65, y - 1, lineImage);
    leftSewLineTop.addChild(game.make.sprite(-3.5, -5, cornerImage));
    leftSewLineTop.angle = 45;
    leftSewLineTop.exists = false;
    var leftSewLineBot = game.add.sprite(x + 65, y - 1, lineImage);
    leftSewLineBot.addChild(game.make.sprite(-3.5, 88, cornerImage));
    leftSewLineBot.angle = 45;
    leftSewLineBot.exists = false;
    var rightSewLineAll = game.add.sprite(x - 1, y + 1, lineImage);
    rightSewLineAll.addChild(game.make.sprite(-3.5, -5, cornerImage));
    rightSewLineAll.addChild(game.make.sprite(-3.5, 88, cornerImage));
    rightSewLineAll.angle = -45;
    rightSewLineAll.exists = false;
    var rightSewLine = game.add.sprite(x - 1, y + 1, lineImage);
    rightSewLine.angle = -45;
    rightSewLine.exists = false;
    var rightSewLineTop = game.add.sprite(x - 1, y + 1, lineImage);
    rightSewLineTop.addChild(game.make.sprite(-3.5, -5, cornerImage));
    rightSewLineTop.angle = -45;
    rightSewLineTop.exists = false;
    var rightSewLineBot = game.add.sprite(x - 1, y + 1, lineImage);
    rightSewLineBot.addChild(game.make.sprite(-3.5, 88, cornerImage));
    rightSewLineBot.angle = -45;
    rightSewLineBot.exists = false;

    var lineShortImage = game.add.bitmapData(3, 66);
    lineShortImage.ctx.beginPath();
    lineShortImage.ctx.rect(0, 0, 3, 66);
    lineShortImage.ctx.fillStyle = "#ff0000";
    lineShortImage.ctx.fill();

    var topSewLineAll = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLineAll.addChild(game.make.sprite(-3.5, -5, cornerImage));
    topSewLineAll.addChild(game.make.sprite(-3.5, 61, cornerImage));
    topSewLineAll.angle = 90;
    topSewLineAll.exists = false;
    var topSewLineRight = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLineRight.addChild(game.make.sprite(-3.5, -5, cornerImage));
    topSewLineRight.angle = 90;
    topSewLineRight.exists = false;
    var topSewLineLeft = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLineLeft.addChild(game.make.sprite(-3.5, 61, cornerImage));
    topSewLineLeft.angle = 90;
    topSewLineLeft.exists = false;
    var topSewLine = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLine.angle = 90;
    topSewLine.exists = false;

    // 1-topAll, 2-topRight, 3-topLeft, 9-top
    // 0-leftAll, 4-leftTop, 5-leftBot, 10-left
    // 6-rightAll, 7-rightTop, 8-rightBot, 11-right
    var lines = new Array(12);
    lines[0] = leftSewLineAll;
    lines[1] = topSewLineAll;
    lines[2] = topSewLineRight;
    lines[3] = topSewLineLeft;
    lines[4] = leftSewLineTop;
    lines[5] = leftSewLineBot;
    lines[6] = rightSewLineAll;
    lines[7] = rightSewLineTop;
    lines[8] = rightSewLineBot;
    lines[9] = topSewLine;
    lines[10] = leftSewLine;
    lines[11] = rightSewLine;

    var highlighted = false;
    grid.events.onInputDown.add(function () {
        if (ActionNow === "remove") {
            lines.forEach(function (model) {
                model.exists = false;
            });
            return;
        }
        if (LineToAdd >= 0) {
            lines[LineToAdd].exists = !leftSewLineAll.exists;
        }
    }, game);

    this.remove = function () {
    };

    this.deHighlight = function () {
        grid.loadTexture(gridImage);
    };

    this.update = function () {
        if (grid.input.pointerOver()) {
            if (!highlighted) {
                grid.loadTexture(gridHighlightImage);
            }
            highlighted = true;
        } else {
            if (highlighted) {
                grid.loadTexture(gridImage);
            }
            highlighted = false;
        }
    };

    this.showAtTop = function () {
        game.world.bringToTop(leftSewLine);
        game.world.bringToTop(leftSewLineAll);
        game.world.bringToTop(leftSewLineTop);
        game.world.bringToTop(leftSewLineBot);

        game.world.bringToTop(topSewLine);
        game.world.bringToTop(topSewLineAll);
        game.world.bringToTop(topSewLineRight);
        game.world.bringToTop(topSewLineLeft);

        game.world.bringToTop(rightSewLine);
        game.world.bringToTop(rightSewLineAll);
        game.world.bringToTop(rightSewLineTop);
        game.world.bringToTop(rightSewLineBot);
    };

}