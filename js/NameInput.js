

invadersApp.NameInput = function (game) {
    this.game = game;
};

invadersApp.NameInput.prototype = {
    create: function () {
        var playerNamePrompt = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 2, 'Enter your name:', 2);
        playerNamePrompt.img.visible = true;

        var playerNameText = invadersApp.utils.addText(this, this.game.width / 2, this.game.height / 2 + 30, '- - - -', 2);
        playerNameText.img.visible = true;

        var playerName = '';

        this.input.keyboard.addCallbacks(this, null, null, function (char) {
            if (/^[a-zA-Z0-9]$/.test(char)) {
                playerName += char;
                playerNameText.font.text = playerName;
            }
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