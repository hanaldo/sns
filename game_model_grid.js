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
    var leftSewLine = game.add.sprite(x + 65, y - 1, lineImage);
    leftSewLine.addChild(game.make.sprite(-3.5, -5, cornerImage));
    leftSewLine.addChild(game.make.sprite(-3.5, 88, cornerImage));
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
    var rightSewLine = game.add.sprite(x - 1, y + 1, lineImage);
    rightSewLine.addChild(game.make.sprite(-3.5, -5, cornerImage));
    rightSewLine.addChild(game.make.sprite(-3.5, 88, cornerImage));
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

    var topSewLine = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLine.addChild(game.make.sprite(-3.5, -5, cornerImage));
    topSewLine.addChild(game.make.sprite(-3.5, 61, cornerImage));
    topSewLine.angle = 90;
    topSewLine.exists = false;
    var topSewLineRight = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLineRight.addChild(game.make.sprite(-3.5, -5, cornerImage));
    topSewLineRight.angle = 90;
    topSewLineRight.exists = false;
    var topSewLineLeft = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLineLeft.addChild(game.make.sprite(-3.5, 61, cornerImage));
    topSewLineLeft.angle = 90;
    topSewLineLeft.exists = false;

    var highlighted = false;
    var leftOn = this.leftOn = false;
    grid.events.onInputDown.add(function () {
        if (LineToAdd >= 0) {//0-left, 1-top, 2-topRight, 3-topLeft, 4-leftTop, 5-leftBot, 6-right, 7-rightTop, 8-rightBot
            switch (LineToAdd) {
                case 0:
                    leftSewLine.exists = !leftSewLine.exists;
                    if (leftSewLine.exists) {
                        leftSewLineTop.exists = false;
                        leftSewLineBot.exists = false;
                    }
                    break;
                case 1:
                    topSewLine.exists = !topSewLine.exists;
                    if (topSewLine.exists) {
                        topSewLineRight.exists = false;
                        topSewLineLeft.exists = false;
                    }
                    break;
                case 2:
                    if (topSewLine.exists) {
                        break;
                    }
                    topSewLineRight.exists = !topSewLineRight.exists;
                    break;
                case 3:
                    if (topSewLine.exists) {
                        break;
                    }
                    topSewLineLeft.exists = !topSewLineLeft.exists;
                    break;
                case 4:
                    if (leftSewLine.exists) {
                        break;
                    }
                    leftSewLineTop.exists = !leftSewLineTop.exists;
                    break;
                case 5:
                    if (leftSewLine.exists) {
                        break;
                    }
                    leftSewLineBot.exists = !leftSewLineBot.exists;
                    break;
                case 6:
                    rightSewLine.exists = !rightSewLine.exists;
                    if (rightSewLine.exists) {
                        rightSewLineTop.exists = false;
                        rightSewLineBot.exists = false;
                    }
                    break;
                case 7:
                    if (rightSewLine.exists) {
                        break;
                    }
                    rightSewLineTop.exists = !rightSewLineTop.exists;
                    break;
                case 8:
                    if (rightSewLine.exists) {
                        break;
                    }
                    rightSewLineBot.exists = !rightSewLineBot.exists;
                    break;
                default:
                    break;
            }
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
        game.world.bringToTop(topSewLine);
        game.world.bringToTop(topSewLineRight);
        game.world.bringToTop(topSewLineLeft);
        game.world.bringToTop(leftSewLineTop);
        game.world.bringToTop(leftSewLineBot);
        game.world.bringToTop(rightSewLine);
        game.world.bringToTop(rightSewLineTop);
        game.world.bringToTop(rightSewLineBot);
    };

}