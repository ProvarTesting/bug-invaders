

invadersApp.NameInput = function(game) {
    this.game = game;
};

invadersApp.NameInput.prototype = {
    create: function() {
        var playerNamePrompt = this.add.text(this.game.width / 2, this.game.height / 2, 'Enter your name:', { align: 'center', fill: '#fff' });
        playerNamePrompt.anchor.setTo(0.5, 0.5);

        var playerNameText = this.add.text(this.game.width / 2, this.game.height / 2 + 30, '', { align: 'center', fill: '#fff' });
        playerNameText.anchor.setTo(0.5, 0.5);

        var playerName = '';

        this.input.keyboard.addCallbacks(this, null, null, function(char) {
            if (/^[a-zA-Z0-9]$/.test(char)) {
                playerName += char;
                playerNameText.text = playerName;
            }
        });

        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(function() {
            localStorage.setItem('playerName', playerName);
            this.state.start('MainMenu');
        }, this);
        
    },

};