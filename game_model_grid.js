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

    var lineImage = game.add.bitmapData(3, 92);
    lineImage.ctx.beginPath();
    lineImage.ctx.rect(0, 0, 3, 92);
    lineImage.ctx.fillStyle = "#ff0000";
    lineImage.ctx.fill();
    var leftSewLine = game.add.sprite(x + 65, y - 1, lineImage);
    leftSewLine.addChild(game.make.sprite(-3.5, -5, cornerImage));
    leftSewLine.addChild(game.make.sprite(-3.5, 88, cornerImage));
    leftSewLine.angle = 45;
    leftSewLine.exists = false;

    var lineShortImage = game.add.bitmapData(3, 65);
    lineShortImage.ctx.beginPath();
    lineShortImage.ctx.rect(0, 0, 3, 92);
    lineShortImage.ctx.fillStyle = "#ff0000";
    lineShortImage.ctx.fill();
    var topSewLine = game.add.sprite(x + 66, y - 1, lineShortImage);
    topSewLine.addChild(game.make.sprite(-3.5, -5, cornerImage));
    topSewLine.addChild(game.make.sprite(-3.5, 61, cornerImage));
    topSewLine.angle = 90;
    topSewLine.exists = false;

    var highlighted = false;
    var leftOn = this.leftOn = false;
    grid.events.onInputDown.add(function () {
        if (LineToAdd >= 0) {//0-left, 1-top, 2-right...
            switch (LineToAdd) {
                case 0:
                    leftSewLine.exists = !leftSewLine.exists;
                    break;
                case 1:
                    topSewLine.exists = !topSewLine.exists;
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
    };

}