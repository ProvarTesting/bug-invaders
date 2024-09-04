
invadersApp.MainMenu = function (game) {

    this.mainMusic = null;
    this.playButton = null;
};

invadersApp.MainMenu.prototype = {

    create: function () {

        this.mainMusic = this.add.audio('mainMusic');

        var textTop = invadersApp.utils.addText(this, this.game.width / 2, 50, 'PROVAR PROUDLY PRESENTS', 2);
        textTop.alpha = 0;


        var titleYPos = this.game.height / 3;
        var title = this.add.sprite(this.game.width / 2, -100, 'title');
        title.anchor.setTo(0.5, 0.5);


        var logo = this.add.sprite(this.game.width / 2, this.game.height - 60, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.6, 0.6);
        logo.visible = false;

        var bugs = this.add.sprite(-200, this.game.height - 150, 'bugs');
        bugs.anchor.setTo(0.5, 0.5);
        bugs.scale.setTo(0.6, 0.6);
        bugs.visible = false;

        var astro = this.add.sprite(this.game.width, this.game.height - 150, 'astro');
        astro.anchor.setTo(0.5, 0.5);
        astro.scale.setTo(0.6, 0.6);
        astro.visible = false;

        var textIES = invadersApp.utils.addText(this, this.game.width / 2, titleYPos + 80, 'DREAMFORCE 2024', 2);
        textIES.img.visible = false;

        var textPressStart = invadersApp.utils.addText(this, this.game.width / 2, titleYPos + 200, 'PRESS ENTER', 2);
        textPressStart.img.visible = false;

        var tweenPresents = this.game.add.tween(textTop).to({ alpha: 1 }, 800, Phaser.Easing.Linear.None, false, 200);
        var tweenTitle = this.game.add.tween(title).to({ y: this.game.height / 3 }, 1200, Phaser.Easing.Bounce.Out, true);
        tweenPresents.chain(tweenTitle);

        var tweenBugs = this.game.add.tween(bugs).to({ x: this.game.width / 4, alpha: 1 }, 1200, Phaser.Easing.Linear.None, false);
        tweenTitle.chain(tweenBugs);

        var tweenAstro = this.game.add.tween(astro).to({ x: this.game.width - 200, alpha: 1 }, 1200, Phaser.Easing.Linear.None, false);
        tweenBugs.chain(tweenAstro);

        tweenPresents.onComplete.add(function () {
            // Play mainMusic
            this.mainMusic.play('', 0, 1, true, true);
        }, this);

        tweenBugs.onComplete.add(function () {
            astro.visible = true;
        }, this);

        tweenTitle.onComplete.add(function () {
            // Show bottom info
            logo.visible = true;
            bugs.visible = true;
            textPressStart.img.visible = true;
            textIES.img.visible = true;

            // Start blinking event for 'PRESS START'
            this.game.time.events.loop(Phaser.Timer.HALF, function () {
                textPressStart.img.visible = !textPressStart.img.visible;
            }, this);

        }, this);

        // Start animated chain
        tweenPresents.start();

        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () {
            this.mainMusic.stop();
            this.state.start('Instructions');
        }, this);
        var f1Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F1);
        f1Key.onDown.add(function () {
            toggleLeaderboard();
        }, this);
        var f2Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F2);
        f2Key.onDown.add(function () {
            restart();
        }, this);
        var f3Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F3);
        f3Key.onDown.add(function () {
            toggleLeaderboard();
        }, this);
        var f4Key = this.game.input.keyboard.addKey(Phaser.Keyboard.F4);
        f4Key.onDown.add(function () {
            clearScores();
        }, this);
    },

    update: function () {

    },

};