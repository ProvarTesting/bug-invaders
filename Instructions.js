

invadersApp.Instructions = function (game) {
    this.game = game;
};

invadersApp.Instructions.prototype = {
    create: function () {
        var howToPlay = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 8, 'How to play', 3);
        howToPlay.img.visible = true;

        var instruction1 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 30, 'Just use left/right arrow to move the player', 2);
        instruction1.img.visible = true;

        var instruction2 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 60, 'Use space to shoot', 2);
        instruction2.img.visible = true;

        var instruction3 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 90, 'Keep the number of invaders below 50', 2);
        instruction3.img.visible = true;

        var instruction4 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 120, 'There are always at least 4 invaders', 2);
        instruction4.img.visible = true;

        var instruction5 = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 150, 'The player earns 1 point for each evolution time', 2);
        instruction5.img.visible = true;

        var playerNamePrompt = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 250, 'Enter your name:', 3);
        playerNamePrompt.img.visible = true;

        var playerNameText = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 6 + 300, '- - - -', 2);
        playerNameText.img.visible = true;

        var playerName = '';

        this.input.keyboard.addCallbacks(this, null, null, function (char) {
            if (/^[a-zA-Z0-9]$/.test(char)) {
                playerName += char;
                playerNameText.font.text = playerName;
            }
        });

        var backspaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        backspaceKey.onDown.add(function () {
            playerName = playerName.slice(0, -1);
            playerNameText.font.text = playerName;
        });

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(function () {
            localStorage.setItem('playerName', playerName.toUpperCase());
            this.startGame();
        }, this);

    },

    startGame: function (pointer) {
        this.state.start('Game');
    }

};